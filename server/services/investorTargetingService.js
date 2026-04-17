import { anthropic, MODEL, parseCitations } from './anthropic.js';
import { buildTargetingPrompt } from '../prompts/investorTargeting.prompt.js';
import { investors, company, peerCompanies, holdings, peerHoldings, meetings, crmContacts } from '../data/index.js';

const STEPS = [
  'Parsing query criteria',
  'Filtering investor universe',
  'Scoring peer holdings overlap',
  'Checking meeting history gaps',
  'Ranking with AI',
];

function buildCandidateContext(investor) {
  const latestHolding = holdings
    .filter(h => h.investorId === investor.id)
    .sort((a, b) => b.quarter.localeCompare(a.quarter))[0] || null;

  const investorPeerHoldings = peerHoldings.filter(ph => ph.investorId === investor.id);
  const investorMeetings = meetings.filter(m => m.investorId === investor.id);
  const crm = crmContacts.filter(c => c.investorId === investor.id);

  return {
    ...investor,
    latestHolding,
    peerHoldings: investorPeerHoldings,
    meetings: investorMeetings,
    crm,
  };
}

export async function runInvestorTargeting(payload, onProgress, onChunk, onCitation, onDone, onError) {
  try {
    const { query } = payload;

    for (let i = 0; i < STEPS.length - 1; i++) {
      onProgress({ step: STEPS[i], stepIndex: i, totalSteps: STEPS.length });
      await new Promise(r => setTimeout(r, 120));
    }

    // Build full context for all investors
    const candidates = investors.map(buildCandidateContext);

    const { systemPrompt, userPrompt } = buildTargetingPrompt(query, candidates, company, peerCompanies);
    onProgress({ step: STEPS[STEPS.length - 1], stepIndex: STEPS.length - 1, totalSteps: STEPS.length });

    let fullText = '';
    const emittedCitationIds = new Set();

    const stream = anthropic.messages.stream({
      model: MODEL,
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    });

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta?.type === 'text_delta') {
        const chunk = event.delta.text;
        fullText += chunk;
        onChunk({ text: chunk });

        const newCitations = parseCitations(fullText).filter(c => !emittedCitationIds.has(c.id));
        for (const cit of newCitations) {
          emittedCitationIds.add(cit.id);
          onCitation(cit);
        }
      }
    }

    // Parse JSON result
    let parsed = null;
    try {
      const jsonMatch = fullText.match(/\{[\s\S]*\}/);
      if (jsonMatch) parsed = JSON.parse(jsonMatch[0]);
    } catch {
      // fallback: keep raw text
    }

    const allCitations = parseCitations(fullText);
    const artifactId = `art_${Date.now()}_targeting`;

    onDone({
      artifactId,
      artifact: {
        id: artifactId,
        type: 'investor-targeting',
        title: `Investor Targeting: "${query.slice(0, 60)}${query.length > 60 ? '...' : ''}"`,
        status: 'complete',
        createdAt: new Date().toISOString(),
        query,
        rawText: fullText,
        parsedResult: parsed,
        citations: allCitations,
        previewText: parsed
          ? `${parsed.results?.length || 0} investors ranked — top match: ${parsed.results?.[0]?.investorId || 'N/A'}`
          : fullText.slice(0, 200).trim(),
      },
    });
  } catch (err) {
    onError({ message: err.message });
  }
}
