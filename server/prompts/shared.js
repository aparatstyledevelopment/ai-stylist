export const CITATION_INSTRUCTION = `
CITATION RULES (NON-NEGOTIABLE):
Every factual claim must include a citation marker using this exact format:
  [[CIT:source:entityId:period:field]]

Available sources and their entityId conventions:
  holdings   — entityId=investorId, period=quarter (e.g. 2024-Q3), field=shares|pct|value|changeType
  investors  — entityId=investorId, period=current, field=aum|type|style|country|lastMeeting
  peers      — entityId=investorId, period=peerId (e.g. MEDI), field=shares|pct|changeType
  meetings   — entityId=meetingId, period=date (e.g. 2024-09-03), field=sentiment|questions|topics
  crm        — entityId=crmId, period=current, field=lastTouchDate|nextStep|coverageStatus

Examples:
  "Nordea holds 18.4M shares [[CIT:holdings:nordea-am:2024-Q3:shares]]"
  "Fidelity is classified as GARP [[CIT:investors:fidelity-intl:current:style]]"
  "In the September meeting, sentiment was Positive [[CIT:meetings:mtg-001:2024-09-03:sentiment]]"

If requested data is absent from the context provided, write exactly:
  [DATA NOT AVAILABLE: <description of missing data>]

Do NOT infer, estimate, or use general knowledge about real companies. Use only the provided context.
`;
