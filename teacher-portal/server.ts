import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const app = express();
const PORT = process.env.TEACHER_PORTAL_PORT || 3001;

app.use(express.static(rootDir));

app.get('/', (_req, res) => {
  res.sendFile(path.join(rootDir, 'index.html'));
});

app.get('/dashboard', (_req, res) => {
  res.sendFile(path.join(rootDir, 'dashboard.html'));
});

app.get('/dashboard.html', (_req, res) => {
  res.sendFile(path.join(rootDir, 'dashboard.html'));
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', portal: 'teacher', timestamp: Date.now() });
});

app.listen(PORT, () => {
  console.log(`\n╔════════════════════════════════════════════════════════════╗\n║                                                            ║\n║   🚀 Teacher Portal Server Running                         ║\n║                                                            ║\n║   Local:   http://localhost:${PORT}                          ║\n║   Status:  Awaiting authentication                         ║\n║                                                            ║\n║   Connected to main API: http://localhost:8787             ║\n║                                                            ║\n╚════════════════════════════════════════════════════════════╝\n  `);
});
