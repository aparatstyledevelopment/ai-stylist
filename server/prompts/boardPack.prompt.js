import { CITATION_INSTRUCTION } from './shared.js';

export function buildBoardPackPrompt({ company, holdings, investors, peerHoldings, peerCompanies, meetings, consensus, shortPositions, insiderTx, period }) {
  const systemPrompt = `You are an expert IR analyst producing the monthly board IR pack for ${company.name} (${company.ticker}).

This document will be presented to the board of directors. It must be factual, well-structured, and cite every data point. It replaces a document that would typically take an IR analyst 1-3 days to produce.

The pack must include these sections in order:
## Executive Summary
## 1. Ownership Snapshot
## 2. Ownership Changes This Period
## 3. Free Float & Liquidity
## 4. Peer Ownership Comparison
## 5. Analyst Consensus
## 6. Short Interest
## 7. Insider Activity
## 8. CRM & Investor Engagement
## 9. Key Risks & Opportunities
## 10. Recommended Actions

${CITATION_INSTRUCTION}

Tone: Board-ready. Concise. Data-led. Flag risks explicitly with [RISK:] prefix. Flag opportunities with [OPP:].`;

  const topHolders = [...investors]
    .filter(inv => inv.holdingNXTK?.shares > 0)
    .sort((a, b) => (b.holdingNXTK?.shares || 0) - (a.holdingNXTK?.shares || 0))
    .slice(0, 10);

  const userPrompt = `Generate the Board IR Pack for ${period}.

=== COMPANY ===
${JSON.stringify({ name: company.name, ticker: company.ticker, sector: company.sector, marketCap: company.marketCap, sharesOutstanding: company.sharesOutstanding, freefloat: company.freefloat }, null, 2)}

=== TOP 10 SHAREHOLDERS ===
${JSON.stringify(topHolders.map(inv => ({ name: inv.name, shares: inv.holdingNXTK?.shares, pct: inv.holdingNXTK?.pct, history: inv.holdingNXTK?.history?.slice(-3), type: inv.type, country: inv.country, sentiment: inv.sentiment })), null, 2)}

=== RECENT OWNERSHIP CHANGES (last 2 quarters) ===
${JSON.stringify(investors.map(inv => {
  const hist = inv.holdingNXTK?.history || [];
  const latest = hist[hist.length - 1];
  const prior = hist[hist.length - 2];
  if (!latest || !prior) return null;
  const delta = latest.shares - prior.shares;
  if (delta === 0) return null;
  return { investor: inv.name, from: prior.shares, to: latest.shares, delta, pct: latest.pct, quarter: latest.quarter };
}).filter(Boolean), null, 2)}

=== PEER HOLDINGS ===
${JSON.stringify(peerCompanies.map(peer => ({
  peer: peer.name,
  ticker: peer.ticker,
  holders: peerHoldings.filter(ph => ph.peerId === peer.ticker).length,
  topHolder: investors.find(inv => peerHoldings.find(ph => ph.peerId === peer.ticker && ph.investorId === inv.id))?.name,
})), null, 2)}

=== ANALYST CONSENSUS ===
${JSON.stringify(consensus, null, 2)}

=== SHORT INTEREST ===
${JSON.stringify({ shortPositions, totalShortInterest: shortPositions.reduce((s, p) => s + p.pct, 0).toFixed(4) }, null, 2)}

=== INSIDER TRANSACTIONS (last 90 days) ===
${JSON.stringify(insiderTx, null, 2)}

=== CRM / ENGAGEMENT ACTIVITY ===
Recent meetings: ${meetings.slice(0, 5).map(m => `${m.date}: ${m.investorId} (${m.sentiment})`).join(', ')}

Generate the complete Board IR Pack now. Every number must have a citation marker. Flag risks and opportunities explicitly.`;

  return { systemPrompt, userPrompt };
}
