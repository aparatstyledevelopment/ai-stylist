// Analyst consensus data — broker estimates and target prices
export const analystConsensus = {
  current: {
    ticker: 'NXTK',
    date: '2024-Q3',
    numAnalysts: 14,
    buy: 9,
    hold: 4,
    sell: 1,
    consensusRating: 'Buy',
    meanTargetPrice: 23.40,
    highTargetPrice: 28.00,
    lowTargetPrice: 16.50,
    currentPrice: 20.00,
    impliedUpside: 0.17,
  },
  history: [
    { quarter: '2023-Q1', buy: 6, hold: 5, sell: 2, meanTarget: 18.20, currentPrice: 15.80 },
    { quarter: '2023-Q2', buy: 7, hold: 5, sell: 1, meanTarget: 19.50, currentPrice: 17.20 },
    { quarter: '2023-Q3', buy: 8, hold: 4, sell: 1, meanTarget: 21.00, currentPrice: 18.50 },
    { quarter: '2023-Q4', buy: 8, hold: 5, sell: 1, meanTarget: 22.10, currentPrice: 19.10 },
    { quarter: '2024-Q1', buy: 9, hold: 4, sell: 1, meanTarget: 22.80, currentPrice: 19.40 },
    { quarter: '2024-Q2', buy: 9, hold: 4, sell: 1, meanTarget: 23.10, currentPrice: 19.80 },
    { quarter: '2024-Q3', buy: 9, hold: 4, sell: 1, meanTarget: 23.40, currentPrice: 20.00 },
  ],
  brokerEstimates: [
    { broker: 'Carnegie', rating: 'Buy', target: 26.00, analyst: 'Johan Lindqvist', date: '2024-09-15' },
    { broker: 'Berenberg', rating: 'Buy', target: 25.50, analyst: 'Michael Braun', date: '2024-09-12' },
    { broker: 'Nordea Markets', rating: 'Buy', target: 24.00, analyst: 'Sara Nilsson', date: '2024-09-10' },
    { broker: 'SEB', rating: 'Hold', target: 21.00, analyst: 'Anders Holm', date: '2024-09-08' },
    { broker: 'Handelsbanken Capital', rating: 'Buy', target: 28.00, analyst: 'Emma Persson', date: '2024-09-05' },
    { broker: 'DNB', rating: 'Buy', target: 24.50, analyst: 'Petter Hansen', date: '2024-08-30' },
    { broker: 'Barclays', rating: 'Hold', target: 20.50, analyst: 'James Whitfield', date: '2024-08-28' },
    { broker: 'UBS', rating: 'Buy', target: 23.00, analyst: 'Klaus Weber', date: '2024-08-25' },
    { broker: 'Goldman Sachs', rating: 'Hold', target: 19.50, analyst: 'Charlotte Moore', date: '2024-08-20' },
    { broker: 'JP Morgan', rating: 'Sell', target: 16.50, analyst: 'Robert Chen', date: '2024-08-15' },
  ],
};

// Short position register (Finansinspektionen / FCA equivalent)
export const shortPositions = [
  { holder: 'Citadel Advisors LLC', pct: 0.0082, reportDate: '2024-10-10', change: +0.0012, changeType: 'Increase' },
  { holder: 'Marshall Wace LLP', pct: 0.0054, reportDate: '2024-10-08', change: -0.0003, changeType: 'Decrease' },
  { holder: 'Millennium Capital Partners', pct: 0.0031, reportDate: '2024-09-30', change: 0, changeType: 'Unchanged' },
  { holder: 'Point72 Asset Management', pct: 0.0029, reportDate: '2024-10-05', change: +0.0029, changeType: 'New' },
];

export const totalShortInterest = {
  pct: 0.0196,
  trend: 'Increasing',
  trendVsPrior: +0.0038,
  date: '2024-10-10',
};

// Insider transactions (Insynsregistret)
export const insiderTransactions = [
  { person: 'Magnus Eriksson (CEO)', type: 'Buy', shares: 50000, value: 1000000, date: '2024-09-20', method: 'Open market' },
  { person: 'Cecilia Berg (CFO)', type: 'Buy', shares: 25000, value: 500000, date: '2024-09-18', method: 'Open market' },
  { person: 'Board Member (Per Lindström)', type: 'Buy', shares: 10000, value: 200000, date: '2024-08-15', method: 'Open market' },
  { person: 'Magnus Eriksson (CEO)', type: 'Sell', shares: 100000, value: 1900000, date: '2024-06-01', method: 'Options exercise' },
];

// Activist / notable shareholder events
export const activistAlerts = [
  { date: '2024-09-15', type: 'New Position', description: 'Point72 disclosed new short position of 0.29% via FCA filing', severity: 'warn' },
  { date: '2024-08-20', type: 'Insider Buy', description: 'CEO Magnus Eriksson bought 50,000 shares at SEK 20.00 — first open-market purchase in 18 months', severity: 'info' },
  { date: '2024-07-01', type: 'Ownership Threshold', description: 'Handelsbanken Fonder crossed 3.0% threshold — disclosure filed', severity: 'info' },
];
