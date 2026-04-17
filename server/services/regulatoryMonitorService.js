import { anthropic, MODEL, parseCitations } from './anthropic.js';
import { buildRegulatoryMonitorPrompt } from '../prompts/regulatoryMonitor.prompt.js';
import { company } from '../data/index.js';
import { shortPositions, totalShortInterest, insiderTransactions, activistAlerts } from '../data/marketData.js';

const STEPS = [
  'Scanning short position register',
  'Pulling insider transaction log',
  'Checking activist filings',
  'Cross-referencing ownership disclosures',
  'Generating monitor report with AI',
];

export async function runRegulatoryMonitor(payload, onProgress, onChunk, onCitation, onDone, onError) {
  try {
    for (let i = 0; i < STEPS.length - 1; i++) {
      onProgress({ step: STEPS[i], stepIndex: i, totalSteps: STEPS.length });
      await new Promise(r => setTimeout(r, 160));
    }

    const { systemPrompt, userPrompt } = buildRegulatoryMonitorPrompt({
      shortPositions,
      totalShortInterest,
      insiderTx: insiderTransactions,
      activistAlerts,
      company,
    });

    onProgress({ step: STEPS[STEPS.length - 1], stepIndex: STEPS.length - 1, totalSteps: STEPS.length });

    let fullText = '';
    const emittedIds = new Set();

    const stream = anthropic.messages.stream({
      model: MODEL,
      max_tokens: 2500,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    });

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta?.type === 'text_delta') {
        const chunk = event.delta.text;
        fullText += chunk;
        onChunk({ text: chunk });
        const newCits = parseCitations(fullText).filter(c => !emittedIds.has(c.id));
        for (const cit of newCits) { emittedIds.add(cit.id); onCitation(cit); }
      }
    }

    const allCitations = parseCitations(fullText);
    const artifactId = `art_${Date.now()}_regulatory-monitor`;
    const criticalCount = fullText.split('🔴').length - 1;
    const warnCount = fullText.split('🟡').length - 1;
    onDone({
      artifactId,
      artifact: {
        id: artifactId,
        type: 'regulatory-monitor',
        title: `Regulatory Monitor — ${new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}`,
        status: 'complete',
        createdAt: new Date().toISOString(),
        rawText: fullText,
        citations: allCitations,
        previewText: `${criticalCount} critical · ${warnCount} warnings · Short interest ${(totalShortInterest.pct * 100).toFixed(2)}% (${totalShortInterest.trend})`,
      },
    });
  } catch (err) {
    onError({ message: err.message });
  }
}
