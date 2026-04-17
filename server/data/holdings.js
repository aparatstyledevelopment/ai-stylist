// Holdings of NXTK by quarter across investors
// changeType: 'New' | 'Increase' | 'Decrease' | 'Unchanged' | 'Exited'

function holdingRecord(investorId, quarter, shares, pct, changeType = 'Unchanged') {
  return { investorId, ticker: 'NXTK', quarter, shares, value: Math.round(shares * 20), pct, changeType };
}

export const holdings = [
  // Nordea Asset Management — steady builder
  holdingRecord('nordea-am', '2023-Q1', 12000000, 0.013, 'New'),
  holdingRecord('nordea-am', '2023-Q2', 14500000, 0.0158, 'Increase'),
  holdingRecord('nordea-am', '2023-Q3', 16000000, 0.0174, 'Increase'),
  holdingRecord('nordea-am', '2023-Q4', 17200000, 0.0187, 'Increase'),
  holdingRecord('nordea-am', '2024-Q1', 17800000, 0.0193, 'Increase'),
  holdingRecord('nordea-am', '2024-Q2', 18000000, 0.0196, 'Increase'),
  holdingRecord('nordea-am', '2024-Q3', 18400000, 0.0200, 'Increase'),

  // Fidelity — slow trimmer
  holdingRecord('fidelity-intl', '2023-Q1', 11000000, 0.0120, 'New'),
  holdingRecord('fidelity-intl', '2023-Q2', 10500000, 0.0114, 'Decrease'),
  holdingRecord('fidelity-intl', '2023-Q3', 9800000, 0.0107, 'Decrease'),
  holdingRecord('fidelity-intl', '2023-Q4', 9500000, 0.0103, 'Decrease'),
  holdingRecord('fidelity-intl', '2024-Q1', 9300000, 0.0101, 'Decrease'),
  holdingRecord('fidelity-intl', '2024-Q2', 9200000, 0.0100, 'Unchanged'),
  holdingRecord('fidelity-intl', '2024-Q3', 9200000, 0.0100, 'Unchanged'),

  // Handelsbanken Fonder — anchor, slow build
  holdingRecord('handelsbanken-fm', '2023-Q1', 25000000, 0.0272, 'Unchanged'),
  holdingRecord('handelsbanken-fm', '2023-Q2', 25800000, 0.0280, 'Increase'),
  holdingRecord('handelsbanken-fm', '2023-Q3', 26500000, 0.0288, 'Increase'),
  holdingRecord('handelsbanken-fm', '2023-Q4', 27000000, 0.0293, 'Increase'),
  holdingRecord('handelsbanken-fm', '2024-Q1', 27200000, 0.0296, 'Increase'),
  holdingRecord('handelsbanken-fm', '2024-Q2', 27500000, 0.0299, 'Increase'),
  holdingRecord('handelsbanken-fm', '2024-Q3', 27600000, 0.0300, 'Increase'),

  // BlackRock — reducing
  holdingRecord('blackrock-em', '2023-Q3', 6200000, 0.0067, 'New'),
  holdingRecord('blackrock-em', '2023-Q4', 5800000, 0.0063, 'Decrease'),
  holdingRecord('blackrock-em', '2024-Q1', 5200000, 0.0057, 'Decrease'),
  holdingRecord('blackrock-em', '2024-Q2', 4800000, 0.0052, 'Decrease'),
  holdingRecord('blackrock-em', '2024-Q3', 4600000, 0.0050, 'Decrease'),

  // AP3 — stable anchor
  holdingRecord('ap3', '2023-Q1', 36000000, 0.0391, 'Unchanged'),
  holdingRecord('ap3', '2023-Q2', 36200000, 0.0393, 'Increase'),
  holdingRecord('ap3', '2023-Q3', 36500000, 0.0397, 'Increase'),
  holdingRecord('ap3', '2023-Q4', 36700000, 0.0399, 'Increase'),
  holdingRecord('ap3', '2024-Q1', 36800000, 0.0400, 'Unchanged'),
  holdingRecord('ap3', '2024-Q2', 36800000, 0.0400, 'Unchanged'),
  holdingRecord('ap3', '2024-Q3', 36800000, 0.0400, 'Unchanged'),
];
