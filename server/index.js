import express from 'express';
import cors from 'cors';
import workflowsRouter from './routes/workflows.js';
import artifactsRouter from './routes/artifacts.js';
import dataRouter from './routes/data.js';
import chatRouter from './routes/chat.js';

const app = express();
const PORT = 3001;

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173'] }));
app.use(express.json());

app.use('/api/workflows', workflowsRouter);
app.use('/api/artifacts', artifactsRouter);
app.use('/api/data', dataRouter);
app.use('/api/chat', chatRouter);

app.listen(PORT, () => {
  console.log(`Monitor IQ server running on http://localhost:${PORT}`);
});
