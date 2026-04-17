import { Router } from 'express';
import { anthropic, MODEL, parseCitations } from '../services/anthropic.js';
import { CITATION_INSTRUCTION } from '../prompts/shared.js';
import { company, investors, holdings } from '../data/index.js';

const router = Router();

const CHAT_SYSTEM = `You are an expert IR analyst assistant for ${company.name} (${company.ticker}).

You answer questions using only the data context provided. You have access to:
- Investor holdings data (current and historical)
- CRM contacts and meeting history
- Peer company holdings
- Company profile

${CITATION_INSTRUCTION}

Be concise and analytical. If the question cannot be answered from the provided context, say so explicitly with [DATA NOT AVAILABLE: ...].`;

router.post('/', async (req, res) => {
  const { messages, context = {} } = req.body;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const write = (event, data) => res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);

  try {
    // Build a compact data context for the chat
    const dataContext = `
Current ownership summary (2024-Q3):
${holdings.filter(h => h.quarter === '2024-Q3').map(h => {
  const inv = investors.find(i => i.id === h.investorId);
  return `- ${inv?.name}: ${(h.shares / 1e6).toFixed(1)}M shares (${(h.pct * 100).toFixed(2)}%), trend: ${h.changeType}`;
}).join('\n')}
`;

    const systemWithContext = CHAT_SYSTEM + '\n\nDATA CONTEXT:\n' + dataContext;

    const stream = anthropic.messages.stream({
      model: MODEL,
      max_tokens: 1024,
      system: systemWithContext,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
    });

    let fullText = '';
    const emittedIds = new Set();

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta?.type === 'text_delta') {
        const chunk = event.delta.text;
        fullText += chunk;
        write('chunk', { text: chunk });

        const newCits = parseCitations(fullText).filter(c => !emittedIds.has(c.id));
        for (const cit of newCits) {
          emittedIds.add(cit.id);
          write('citation', cit);
        }
      }
    }

    write('done', {});
    res.end();
  } catch (err) {
    write('error', { message: err.message });
    res.end();
  }
});

export default router;
