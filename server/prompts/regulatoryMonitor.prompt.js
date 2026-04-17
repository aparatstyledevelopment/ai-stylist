import { CITATION_INSTRUCTION } from './shared.js';

export function buildRegulatoryMonitorPrompt({ shortPositions, totalShortInterest, insiderTx, activistAlerts, company }) {
  const systemPrompt = `You are an expert IR analyst monitoring regulatory filings and market intelligence for ${company.name} (${company.ticker}).

Your job is to summarize recent regulatory activity and flag anything the IR team and board should be aware of.

The monitor report must include:
## Alert Summary (traffic light: 🔴 Critical / 🟡 Warning / 🟢 Informational)
## Short Position Register
## Insider Transaction Log
## Activist & Notable Holder Activity
## Recommended Response Actions

${CITATION_INSTRUCTION}

Prioritize by materiality. Flag anything that may require public disclosure with [DISCLOSURE REQUIRED]. Flag anything that could indicate activist interest with [ACTIVIST SIGNAL].`;

  const userPrompt = `Generate a Regulatory Monitor report.

=== SHORT POSITIONS (Finansinspektionen / FCA equivalent) ===
${JSON.stringify(shortPositions, null, 2)}
Total short interest: ${(totalShortInterest.pct * 100).toFixed(2)}% (trend: ${totalShortInterest.trend}, change vs prior: ${(totalShortInterest.trendVsPrior * 100).toFixed(2)}pp)

=== INSIDER TRANSACTIONS (last 90 days) ===
${JSON.stringify(insiderTx, null, 2)}

=== NOTABLE EVENTS ===
${JSON.stringify(activistAlerts, null, 2)}

=== COMPANY ===
${JSON.stringify({ name: company.name, ticker: company.ticker, sharesOutstanding: company.sharesOutstanding }, null, 2)}

Classify each item by severity and provide recommended actions. Cite every data point.`;

  return { systemPrompt, userPrompt };
}
