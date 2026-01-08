import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const app = express();
const port = process.env.PORT || 8787;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing.');
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

app.get('/api/schedule', async (_req, res) => {
  const { data, error } = await supabase
    .from('schedule')
    .select('*')
    .order('position', { ascending: true });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.json({ items: data ?? [] });
});

// Get single schedule item
app.get('/api/schedule/:id', async (req, res) => {
  const { id } = req.params;
  
  const { data, error } = await supabase
    .from('schedule')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return res.status(404).json({ error: 'Event not found' });
  }

  return res.json({ item: data });
});

// Create single schedule item
app.post('/api/schedule', requireTeacher, async (req, res) => {
  const { title, slot, focus, status = 'upcoming' } = req.body;

  if (!title || !slot || !focus) {
    return res.status(400).json({ error: 'title, slot, and focus are required' });
  }

  // Get max position
  const { data: maxData } = await supabase
    .from('schedule')
    .select('position')
    .order('position', { ascending: false })
    .limit(1);

  const nextPosition = (maxData?.[0]?.position ?? -1) + 1;

  const { data, error } = await supabase
    .from('schedule')
    .insert({ title: title.trim(), slot: slot.trim(), focus: focus.trim(), status, position: nextPosition })
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(201).json({ item: data });
});

// Delete single schedule item
app.delete('/api/schedule/:id', requireTeacher, async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('schedule')
    .delete()
    .eq('id', id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.json({ success: true });
});

async function requireTeacher(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.slice('Bearer '.length)
    : null;

  if (!token) {
    return res.status(401).json({ error: 'Missing bearer token' });
  }

  // DEV MODE: Allow bypass token during development
  if (token === 'dev-bypass-token') {
    req.teacher = { id: 'dev', email: 'dev@localhost', role: 'teacher' };
    console.log('⚠️  DEV MODE: Authentication bypassed');
    return next();
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data?.user) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  const isTeacher = data.user.app_metadata?.role === 'teacher';
  if (!isTeacher) {
    return res.status(403).json({ error: 'Not authorized' });
  }

  req.teacher = data.user;
  return next();
}

app.put('/api/schedule', requireTeacher, async (req, res) => {
  const items = Array.isArray(req.body?.items) ? req.body.items : null;
  if (!items) {
    return res.status(400).json({ error: 'Expected items array' });
  }

  const normalized = items.map((item, index) => ({
    id: item.id ?? undefined,
    title: typeof item.title === 'string' ? item.title.trim() : '',
    slot: typeof item.slot === 'string' ? item.slot.trim() : '',
    focus: typeof item.focus === 'string' ? item.focus.trim() : '',
    status: item.status || 'upcoming',
    position: index,
  }));

  const invalid = normalized.find(entry => !entry.title || !entry.slot || !entry.focus);
  if (invalid) {
    return res.status(400).json({ error: 'Each entry needs title, slot, and focus.' });
  }

  const { data: existing, error: existingError } = await supabase
    .from('schedule')
    .select('id');

  if (existingError) {
    return res.status(500).json({ error: existingError.message });
  }

  const incomingIds = normalized.filter(r => r.id).map(r => r.id);
  const idsToDelete = (existing ?? [])
    .filter(row => !incomingIds.includes(row.id))
    .map(row => row.id);

  if (idsToDelete.length) {
    const { error: deleteError } = await supabase.from('schedule').delete().in('id', idsToDelete);
    if (deleteError) {
      return res.status(500).json({ error: deleteError.message });
    }
  }

  const { data, error } = await supabase
    .from('schedule')
    .upsert(normalized, { onConflict: 'id' })
    .select()
    .order('position', { ascending: true });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.json({ items: data });
});

// Teacher login endpoint
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if user has teacher role
    const isTeacher = data.user?.app_metadata?.role === 'teacher';
    if (!isTeacher) {
      return res.status(403).json({ error: 'Access denied. Teacher credentials required.' });
    }

    return res.json({
      token: data.session.access_token,
      user: {
        id: data.user.id,
        email: data.user.email,
        role: 'teacher',
      },
    });
  } catch (err) {
    return res.status(500).json({ error: 'Authentication service unavailable' });
  }
});

app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});
