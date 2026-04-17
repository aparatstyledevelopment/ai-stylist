import { anthropic, MODEL, parseCitations } from './anthropic.js';
import { buildPostMeetingPrompt } from '../prompts/postMeeting.prompt.js';
import { investors, meetings, holdings } from '../data/index.js';

const STEPS = [
  'Loading meeting records',
  'Pulling investor profiles',
  'Correlating holding changes',
  'Identifying recurring themes',
  'Generating synthesis with AI',
];

export async function runPostMeeting(payload, onProgress, onChunk, onCitation, onDone, onError) {
  try {
    const period = payload.period || 'Q3 2024 Roadshow';

    for (let i = 0; i < STEPS.length - 1; i++) {
      onProgress({ step: STEPS[i], stepIndex: i, totalSteps: STEPS.length });
      await new Promise(r => setTimeout(r, 180));
    }

    const { systemPrompt, userPrompt } = buildPostMeetingPrompt({
      meetings,
      investors,
      holdings,
      period,
    });

    onProgress({ step: STEPS[STEPS.length - 1], stepIndex: STEPS.length - 1, totalSteps: STEPS.length });

    let fullText = '';
    const emittedIds = new Set();

    const stream = anthropic.messages.stream({
      model: MODEL,
      max_tokens: 3000,
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
    const artifactId = `art_${Date.now()}_post-meeting`;
    onDone({
      artifactId,
      artifact: {
        id: artifactId,
        type: 'post-meeting',
        title: `Post-Meeting Synthesis — ${period}`,
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
