import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, 'dist');
const app = express();

const port = Number(process.env.PORT) || 8080;
const apiTarget = process.env.API_TARGET || 'https://showroom.aparatstyle.com';

app.use(
  '/api',
  createProxyMiddleware({
    target: apiTarget,
    changeOrigin: true,
    xfwd: true,
  }),
);

app.use(express.static(distDir, { index: false }));

app.use((_req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`ai-stylist listening on :${port}, proxying /api → ${apiTarget}/api`);
});
