import { Router } from 'express';
import { artifactStore } from '../data/index.js';

const router = Router();

// Seed with sample artifacts
const seedArtifacts = [
  {
    id: 'art_seed_001',
    type: 'meeting-brief',
    title: 'Meeting Brief — Handelsbanken Fonder, 2024-09-03',
    status: 'complete',
    createdAt: '2024-09-02T14:30:00Z',
    investorId: 'handelsbanken-fm',
    previewText: 'Handelsbanken Fonder holds 27.6M shares (3.00%) of NXTK as of 2024-Q3, making them the third-largest institutional holder. Position has been consistently building since Q1 2023. Sentiment from last meeting (Sep 3) was Positive...',
    citations: [],
    rawText: '',
  },
  {
    id: 'art_seed_002',
    type: 'investor-targeting',
    title: 'Investor Targeting: "Nordic institutional investors holding peer companies..."',
    status: 'complete',
    createdAt: '2024-09-28T10:15:00Z',
    previewText: '3 investors ranked — top match: Swedbank Robur (score: 92) — holds all 5 peers, net buyer of Swedish healthcare, no current NXTK position...',
    citations: [],
    rawText: '',
  },
  {
    id: 'art_seed_003',
    type: 'board-pack',
    title: 'Board IR Pack — September 2024',
    status: 'complete',
    createdAt: '2024-10-01T08:00:00Z',
    previewText: 'Monthly board pack covering ownership changes, peer movements, analyst consensus, and CRM activity for September 2024...',
    citations: [],
    rawText: '',
  },
];

for (const art of seedArtifacts) {
  artifactStore.set(art.id, art);
}

router.get('/', (req, res) => {
  const { limit = 20, offset = 0, type } = req.query;
  let artifacts = Array.from(artifactStore.values())
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (type) artifacts = artifacts.filter(a => a.type === type);

  res.json({
    artifacts: artifacts.slice(Number(offset), Number(offset) + Number(limit)),
    total: artifacts.length,
  });
});

router.get('/:id', (req, res) => {
  const artifact = artifactStore.get(req.params.id);
  if (!artifact) return res.status(404).json({ message: 'Not found' });
  res.json(artifact);
});

router.delete('/:id', (req, res) => {
  artifactStore.delete(req.params.id);
  res.json({ success: true });
});

router.post('/', (req, res) => {
  const artifact = { ...req.body, id: req.body.id || `art_${Date.now()}` };
  artifactStore.set(artifact.id, artifact);
  res.json({ id: artifact.id });
});

export default router;
