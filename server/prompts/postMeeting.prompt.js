import { CITATION_INSTRUCTION } from './shared.js';

export function buildPostMeetingPrompt({ meetings, investors, holdings, period }) {
  const systemPrompt = `You are an expert IR analyst synthesizing investor feedback from a recent roadshow or earnings period.

Your job is to identify patterns, sentiment trends, and ownership correlations from meeting notes.

The synthesis must include:
## Executive Summary
## Sentiment Analysis
## Recurring Themes & Concerns
## Bullish Signals
## Ownership Action Correlation
## Recommended Follow-Up Actions

${CITATION_INSTRUCTION}

Be analytical — look for patterns across multiple meetings, not just individual data points. Identify which concerns are systemic vs one-off.`;

  const userPrompt = `Synthesize investor feedback from the period: ${period}

=== MEETINGS TO SYNTHESIZE ===
${JSON.stringify(meetings.map(m => {
  const inv = investors.find(i => i.id === m.investorId);
  const latestHolding = holdings.filter(h => h.investorId === m.investorId).sort((a, b) => b.quarter.localeCompare(a.quarter))[0];
  return {
    date: m.date,
    investor: inv?.name,
    investorType: inv?.type,
    investorCountry: inv?.country,
    sentiment: m.sentiment,
    topicsDiscussed: m.topicsDiscussed,
    investorQuestions: m.investorQuestions,
    keyTakeaways: m.keyTakeaways,
    actionItems: m.actionItems,
    currentHoldingPct: latestHolding?.pct,
    holdingTrend: latestHolding?.changeType,
  };
}), null, 2)}

Identify:
1. Which topics came up in 2+ meetings (systemic concerns)
2. Which investors asked the most probing questions
3. Whether sentiment correlates with recent holding changes
4. Which action items are overdue or highest priority

Every factual claim must cite the meeting record.`;

  return { systemPrompt, userPrompt };
}
