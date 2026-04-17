import Anthropic from '@anthropic-ai/sdk';

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const MODEL = 'claude-sonnet-4-6';

// Parse [[CIT:source:entityId:period:field]] markers from text
export function parseCitations(text) {
  const regex = /\[\[CIT:([^\]]+)\]\]/g;
  const citations = [];
  let match;
  let idx = 0;
  while ((match = regex.exec(text)) !== null) {
    const parts = match[1].split(':');
    citations.push({
      id: `cit_${idx++}_${parts.join('_')}`,
      raw: match[0],
      source: parts[0],
      entityId: parts[1],
      period: parts[2],
      field: parts[3],
      displayLabel: `${parts[0].charAt(0).toUpperCase() + parts[0].slice(1)} data, ${parts[2]}`,
    });
  }
  return citations;
}

// Replace citation markers with display labels for clean text
export function stripCitations(text) {
  return text.replace(/\[\[CIT:[^\]]+\]\]/g, '');
}
