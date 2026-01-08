import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.TEACHER_PORTAL_PORT || 3001;

// Serve static files from the teacher-portal directory
app.use(express.static(__dirname));

// Serve index.html for the root route (login page)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve dashboard
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.get('/dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', portal: 'teacher', timestamp: Date.now() });
});

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🚀 Teacher Portal Server Running                         ║
║                                                            ║
║   Local:   http://localhost:${PORT}                          ║
║   Status:  Awaiting authentication                         ║
║                                                            ║
║   Connected to main API: http://localhost:8787             ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);
});
