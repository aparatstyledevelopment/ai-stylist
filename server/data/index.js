import { investors } from './investors.js';
import { company, peerCompanies } from './company.js';
import { holdings } from './holdings.js';
import { peerHoldings } from './peers.js';
import { meetings } from './meetings.js';
import { crmContacts } from './crm.js';

// In-memory artifact store
export const artifactStore = new Map();

export { investors, company, peerCompanies, holdings, peerHoldings, meetings, crmContacts };

export function getInvestorById(id) {
  return investors.find(inv => inv.id === id) || null;
}

export function getHoldingsForInvestor(investorId) {
  return holdings.filter(h => h.investorId === investorId);
}

export function getPeerHoldingsForInvestor(investorId) {
  return peerHoldings.filter(ph => ph.investorId === investorId);
}

export function getMeetingsForInvestor(investorId) {
  return meetings
    .filter(m => m.investorId === investorId)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getCRMForInvestor(investorId) {
  return crmContacts.filter(c => c.investorId === investorId);
}

export function buildInvestorContext(investorId) {
  const investor = getInvestorById(investorId);
  if (!investor) return null;

  const investorHoldings = getHoldingsForInvestor(investorId);
  const latestHolding = investorHoldings.sort((a, b) =>
    b.quarter.localeCompare(a.quarter))[0] || null;

  const investorPeerHoldings = getPeerHoldingsForInvestor(investorId);
  const investorMeetings = getMeetingsForInvestor(investorId);
  const crm = getCRMForInvestor(investorId);

  return {
    investor,
    holdings: investorHoldings,
    latestHolding,
    peerHoldings: investorPeerHoldings,
    meetings: investorMeetings,
    crm,
    company,
    peerCompanies,
  };
}

export function resolveCitationRecord(citationId) {
  // citationId format: "source:entityId:period:field"
  // e.g. "holdings:nordea-am:2024-Q3:shares"
  const parts = citationId.split(':');
  if (parts.length < 2) return null;
  const [source, entityId, period, field] = parts;

  switch (source) {
    case 'holdings': {
      const rec = holdings.find(h => h.investorId === entityId && h.quarter === period);
      return rec ? { source, record: rec, tableTab: 'holdings' } : null;
    }
    case 'investors': {
      const rec = getInvestorById(entityId);
      return rec ? { source, record: rec, tableTab: 'investors' } : null;
    }
    case 'peers': {
      const rec = peerHoldings.find(ph => ph.investorId === entityId && ph.peerId === period);
      return rec ? { source, record: rec, tableTab: 'peers' } : null;
    }
    case 'meetings': {
      const rec = meetings.find(m => m.id === entityId);
      return rec ? { source, record: rec, tableTab: 'meetings' } : null;
    }
    case 'crm': {
      const rec = crmContacts.find(c => c.id === entityId);
      return rec ? { source, record: rec, tableTab: 'crm' } : null;
    }
    default:
      return null;
  }
}
