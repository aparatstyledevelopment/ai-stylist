import { anthropic, MODEL, parseCitations } from './anthropic.js';
import { buildBoardPackPrompt } from '../prompts/boardPack.prompt.js';
import { investors, company, peerCompanies, peerHoldings, meetings } from '../data/index.js';
import { analystConsensus, shortPositions, insiderTransactions } from '../data/marketData.js';

const STEPS = [
  'Loading ownership data',
  'Fetching analyst consensus',
  'Checking short position register',
  'Pulling insider transaction log',
  'Aggregating peer holdings',
  'Generating board pack with AI',
];

export async function runBoardPack(payload, onProgress, onChunk, onCitation, onDone, onError) {
  try {
    const period = payload.period || 'October 2024';

    for (let i = 0; i < STEPS.length - 1; i++) {
      onProgress({ step: STEPS[i], stepIndex: i, totalSteps: STEPS.length });
      await new Promise(r => setTimeout(r, 200));
    }

    const { systemPrompt, userPrompt } = buildBoardPackPrompt({
      company,
      holdings: [],
      investors,
      peerHoldings,
      peerCompanies,
      meetings,
      consensus: analystConsensus,
      shortPositions,
      insiderTx: insiderTransactions,
      period,
    });

    onProgress({ step: STEPS[STEPS.length - 1], stepIndex: STEPS.length - 1, totalSteps: STEPS.length });

    let fullText = '';
    const emittedIds = new Set();

    const stream = anthropic.messages.stream({
      model: MODEL,
      max_tokens: 6000,
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
    const artifactId = `art_${Date.now()}_board-pack`;
    onDone({
      artifactId,
      artifact: {
        id: artifactId,
        type: 'board-pack',
        title: `Board IR Pack — ${period}`,
        status: 'complete',
        createdAt: new Date().toISOString(),
        period,
        rawText: fullText,
        citations: allCitations,
        previewText: fullText.slice(0, 200).replace(/\[\[CIT:[^\]]+\]\]/g, '').trim() + '...',
      },
    });
  } catch (err) {
    onError({ message: err.message });
  }
}
