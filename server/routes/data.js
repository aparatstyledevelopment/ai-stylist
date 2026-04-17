import { Router } from 'express';
import { investors, holdings, peerHoldings, meetings, crmContacts, peerCompanies, resolveCitationRecord } from '../data/index.js';

const router = Router();

router.get('/investors', (req, res) => {
  const { region, style, search } = req.query;
  let result = investors;
  if (region) result = result.filter(i => i.country === region || (region === 'Nordic' && ['Sweden', 'Norway', 'Denmark', 'Finland'].includes(i.country)));
  if (style) result = result.filter(i => i.style?.toLowerCase().includes(style.toLowerCase()));
  if (search) result = result.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
  res.json(result);
});

router.get('/holdings', (req, res) => {
  const { investorId, quarter } = req.query;
  let result = holdings;
  if (investorId) result = result.filter(h => h.investorId === investorId);
  if (quarter) result = result.filter(h => h.quarter === quarter);
  // Enrich with investor name
  result = result.map(h => {
    const inv = investors.find(i => i.id === h.investorId);
    return { ...h, investorName: inv?.name || h.investorId };
  });
  res.json(result);
});

router.get('/peers', (req, res) => {
  const { investorId, peerId } = req.query;
  let result = peerHoldings;
  if (investorId) result = result.filter(ph => ph.investorId === investorId);
  if (peerId) result = result.filter(ph => ph.peerId === peerId);
  result = result.map(ph => {
    const inv = investors.find(i => i.id === ph.investorId);
    const peer = peerCompanies.find(p => p.ticker === ph.peerId);
    return { ...ph, investorName: inv?.name || ph.investorId, peerName: peer?.name || ph.peerId };
  });
  res.json(result);
});

router.get('/meetings', (req, res) => {
  const { investorId, from, to } = req.query;
  let result = meetings;
  if (investorId) result = result.filter(m => m.investorId === investorId);
  if (from) result = result.filter(m => m.date >= from);
  if (to) result = result.filter(m => m.date <= to);
  result = result.map(m => {
    const inv = investors.find(i => i.id === m.investorId);
    return { ...m, investorName: inv?.name || m.investorId };
  });
  res.json(result.sort((a, b) => new Date(b.date) - new Date(a.date)));
});

router.get('/crm', (req, res) => {
  const { investorId, search } = req.query;
  let result = crmContacts;
  if (investorId) result = result.filter(c => c.investorId === investorId);
  if (search) result = result.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.title.toLowerCase().includes(search.toLowerCase())
  );
  result = result.map(c => {
    const inv = investors.find(i => i.id === c.investorId);
    return { ...c, investorName: inv?.name || c.investorId };
  });
  res.json(result);
});

router.get('/citation/:citationId', (req, res) => {
  const result = resolveCitationRecord(decodeURIComponent(req.params.citationId));
  if (!result) return res.status(404).json({ message: 'Citation not found' });
  res.json(result);
});

export default router;
