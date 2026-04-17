import { Router } from 'express';
import { runMeetingBrief } from '../services/meetingBriefService.js';
import { runInvestorTargeting } from '../services/investorTargetingService.js';
import { artifactStore } from '../data/index.js';

const router = Router();

const WORKFLOW_TEMPLATES = [
  { id: 'meeting-brief', type: 'meeting-brief', name: 'Meeting Brief', description: 'Generate a structured brief for an upcoming investor meeting — profile, position, likely questions, talking points.', icon: 'briefcase', estimatedCredits: 100 },
  { id: 'investor-targeting', type: 'investor-targeting', name: 'Investor Targeting', description: 'Find investors matching your criteria using natural language — peer overlap, AUM thresholds, engagement gaps.', icon: 'target', estimatedCredits: 300 },
  { id: 'board-pack', type: 'board-pack', name: 'Board IR Pack', description: 'Generate the monthly board IR pack — ownership changes, peer movements, analyst consensus, CRM activity.', icon: 'file-text', estimatedCredits: 500 },
  { id: 'post-meeting', type: 'post-meeting', name: 'Post-Meeting Synthesis', description: 'Synthesize roadshow feedback — sentiment trends, topic clusters, ownership correlation.', icon: 'bar-chart', estimatedCredits: 200 },
  { id: 'regulatory-monitor', type: 'regulatory-monitor', name: 'Regulatory Monitor', description: 'Monitor short positions, insider transactions, and activist filings with contextual AI summaries.', icon: 'shield', estimatedCredits: 150 },
];

router.get('/templates', (req, res) => {
  res.json(WORKFLOW_TEMPLATES);
});

router.get('/scheduled', (req, res) => {
  res.json([
    { id: 'sched-1', type: 'board-pack', label: 'Monthly Board IR Pack', scheduledFor: '2024-11-01', recurrence: 'monthly', lastRun: '2024-10-01' },
    { id: 'sched-2', type: 'regulatory-monitor', label: 'Weekly Short Position Digest', scheduledFor: '2024-10-21', recurrence: 'weekly', lastRun: '2024-10-14' },
  ]);
});

router.get('/active', (req, res) => {
  res.json([]);
});

function sseSetup(res) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();
}

function sseWrite(res, event, data) {
  res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
}

router.post('/run', async (req, res) => {
  const { type, payload } = req.body;
  sseSetup(res);

  const onProgress = (data) => sseWrite(res, 'progress', data);
  const onChunk = (data) => sseWrite(res, 'chunk', data);
  const onCitation = (data) => sseWrite(res, 'citation', data);
  const onError = (data) => { sseWrite(res, 'error', data); res.end(); };
  const onDone = (data) => {
    // Persist artifact
    if (data.artifact) artifactStore.set(data.artifactId, data.artifact);
    sseWrite(res, 'done', { artifactId: data.artifactId });
    res.end();
  };

  switch (type) {
    case 'meeting-brief':
      await runMeetingBrief(payload, onProgress, onChunk, onCitation, onDone, onError);
      break;
    case 'investor-targeting':
      await runInvestorTargeting(payload, onProgress, onChunk, onCitation, onDone, onError);
      break;
    case 'board-pack':
      await simulateWorkflow(res, onProgress, onChunk, onDone, 'board-pack', payload, 'Board IR Pack — October 2024');
      break;
    case 'post-meeting':
      await simulateWorkflow(res, onProgress, onChunk, onDone, 'post-meeting', payload, 'Post-Meeting Synthesis');
      break;
    case 'regulatory-monitor':
      await simulateWorkflow(res, onProgress, onChunk, onDone, 'regulatory-monitor', payload, 'Regulatory Monitor Digest');
      break;
    default:
      onError({ message: `Unknown workflow type: ${type}` });
  }
});

async function simulateWorkflow(res, onProgress, onChunk, onDone, type, payload, title) {
  const steps = ['Initializing', 'Fetching data', 'Generating document'];
  for (let i = 0; i < steps.length; i++) {
    onProgress({ step: steps[i], stepIndex: i, totalSteps: steps.length });
    await new Promise(r => setTimeout(r, 400));
  }
  const stub = `## ${title}\n\n*This workflow is in development. Full implementation coming in the next release.*\n\n[DATA NOT AVAILABLE: This stub workflow does not yet connect to live AI generation.]`;
  for (const chunk of stub.split(' ')) {
    onChunk({ text: chunk + ' ' });
    await new Promise(r => setTimeout(r, 20));
  }
  const artifactId = `art_${Date.now()}_${type}`;
  const artifact = { id: artifactId, type, title, status: 'complete', createdAt: new Date().toISOString(), rawText: stub, citations: [], previewText: stub.slice(0, 150) };
  artifactStore.set(artifactId, artifact);
  onDone({ artifactId, artifact });
}

export default router;
