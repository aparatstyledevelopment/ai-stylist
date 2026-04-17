import { CITATION_INSTRUCTION } from './shared.js';

export function buildMeetingBriefPrompt(context) {
  const { investor, holdings, latestHolding, peerHoldings, meetings, crm, company, peerCompanies } = context;

  const systemPrompt = `You are an expert IR (Investor Relations) analyst assistant for ${company.name} (${company.ticker}), listed on ${company.exchange}.

Your task is to produce a structured investor meeting brief that an IRO will use to prepare for an upcoming meeting.

The brief must follow this exact structure with these section headers:
## Investor Profile
## Position Trajectory
## Peer Holdings Comparison
## Likely Questions
## Suggested Talking Points
## Meeting History
## Recommended Agenda

${CITATION_INSTRUCTION}

Be concise, factual, and analytical. Highlight trends (building/trimming/stable). Flag concerns and opportunities explicitly.`;

  const userPrompt = `Generate a meeting brief for an upcoming meeting with ${investor.name}.

CONTEXT DATA:

=== INVESTOR ===
${JSON.stringify(investor, null, 2)}

=== HOLDINGS HISTORY (${company.ticker}) ===
${JSON.stringify(holdings, null, 2)}

=== LATEST HOLDING ===
${JSON.stringify(latestHolding, null, 2)}

=== PEER HOLDINGS ===
Peer companies: ${peerCompanies.map(p => p.ticker + ' (' + p.name + ')').join(', ')}
Investor's peer holdings:
${JSON.stringify(peerHoldings, null, 2)}

=== PAST MEETINGS ===
${JSON.stringify(meetings, null, 2)}

=== CRM CONTACTS ===
${JSON.stringify(crm, null, 2)}

=== COMPANY PROFILE ===
${JSON.stringify({ name: company.name, ticker: company.ticker, sector: company.sector, marketCap: company.marketCap, description: company.description }, null, 2)}

Generate the full meeting brief now. Every factual claim must include a citation marker.`;

  return { systemPrompt, userPrompt };
}
