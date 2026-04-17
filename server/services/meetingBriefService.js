import { anthropic, MODEL, parseCitations } from './anthropic.js';
import { buildMeetingBriefPrompt } from '../prompts/meetingBrief.prompt.js';
import { buildInvestorContext } from '../data/index.js';

const STEPS = [
  'Loading investor profile',
  'Fetching holdings history',
  'Analyzing peer holdings',
  'Retrieving meeting history',
  'Loading CRM contacts',
  'Generating brief with AI',
];

export async function runMeetingBrief(payload, onProgress, onChunk, onCitation, onDone, onError) {
  try {
    const { investorId, meetingDate } = payload;

    // Emit progress steps
    for (let i = 0; i < STEPS.length - 1; i++) {
      onProgress({ step: STEPS[i], stepIndex: i, totalSteps: STEPS.length });
      await new Promise(r => setTimeout(r, 150));
    }

    const context = buildInvestorContext(investorId);
    if (!context) {
      onError({ message: `Investor not found: ${investorId}` });
      return;
    }

    const { systemPrompt, userPrompt } = buildMeetingBriefPrompt(context);
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

        // Emit new citations as they appear
        const newCitations = parseCitations(fullText).filter(c => !emittedCitationIds.has(c.id));
        for (const cit of newCitations) {
          emittedCitationIds.add(cit.id);
          onCitation(cit);
        }
      }
    }

    const allCitations = parseCitations(fullText);
    const artifactId = `art_${Date.now()}_meeting_${investorId}`;

    onDone({
      artifactId,
      artifact: {
        id: artifactId,
        type: 'meeting-brief',
        title: `Meeting Brief — ${context.investor.name}, ${meetingDate || 'Upcoming'}`,
        status: 'complete',
        createdAt: new Date().toISOString(),
        investorId,
        meetingDate,
        rawText: fullText,
        citations: allCitations,
        previewText: fullText.slice(0, 200).replace(/\[\[CIT:[^\]]+\]\]/g, '').trim() + '...',
      },
    });
  } catch (err) {
    onError({ message: err.message });
  }
}
