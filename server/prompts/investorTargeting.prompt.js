import { CITATION_INSTRUCTION } from './shared.js';

export function buildTargetingPrompt(query, candidates, company, peerCompanies) {
  const systemPrompt = `You are an expert IR targeting analyst for ${company.name} (${company.ticker}).

Your task is to rank a list of investor candidates according to a targeting query from the IRO.

For each investor, provide:
1. A rank (1 = best match)
2. A match score 0-100
3. A reasoning trace explaining WHY this investor matches (or doesn't)
4. Citation markers for every factual claim

Output MUST be valid JSON in this exact format:
{
  "results": [
    {
      "rank": 1,
      "investorId": "...",
      "score": 85,
      "reasoning": "Ranked #1 because: [specific reasons with [[CIT:...]] markers]",
      "keySignals": ["signal 1", "signal 2", "signal 3"]
    }
  ],
  "queryInterpretation": "Brief description of how the query was interpreted",
  "notMatched": ["investorId1 — reason not included"]
}

${CITATION_INSTRUCTION}`;

  const userPrompt = `IRO Query: "${query}"

Company context:
- Issuer: ${company.name} (${company.ticker}), ${company.sector}
- Peer companies: ${peerCompanies.map(p => p.ticker).join(', ')}

Investor candidates to rank:
${JSON.stringify(candidates, null, 2)}

Rank these investors by how well they match the query. Include citation markers on every factual claim in reasoning traces.`;

  return { systemPrompt, userPrompt };
}
