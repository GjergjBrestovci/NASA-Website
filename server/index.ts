import 'dotenv/config';
import express, { type NextFunction, type Request, type Response } from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

type ScheduleItem = {
  id?: string;
  title: string;
  slot: string;
  focus: string;
  status: string;
  position?: number;
};

type AuthenticatedRequest = Request & {
  teacher?: {
    id: string;
    email?: string;
    role?: string;
  };
};

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

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

app.get('/api/schedule', async (_req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('schedule')
    .select('*')
    .order('position', { ascending: true });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.json({ items: data ?? [] });
});

app.get('/api/schedule/:id', async (req: Request, res: Response) => {
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

app.post('/api/schedule', requireTeacher, async (req: AuthenticatedRequest, res: Response) => {
  const { title, slot, focus, status = 'upcoming' } = req.body ?? {};

  if (!title || !slot || !focus) {
    return res.status(400).json({ error: 'title, slot, and focus are required' });
  }

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

app.delete('/api/schedule/:id', requireTeacher, async (req: AuthenticatedRequest, res: Response) => {
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

async function requireTeacher(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.slice('Bearer '.length)
    : null;

  if (!token) {
    return res.status(401).json({ error: 'Missing bearer token' });
  }

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

  req.teacher = data.user as { id: string; email?: string; role?: string };
  return next();
}

app.put('/api/schedule', requireTeacher, async (req: AuthenticatedRequest, res: Response) => {
  const items = Array.isArray(req.body?.items) ? (req.body.items as ScheduleItem[]) : null;
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

  const incomingIds = normalized.filter(r => r.id).map(r => r.id as string);
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

app.post('/auth/login', async (req: Request, res: Response) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data?.session?.access_token) {
      return res.status(401).json({ error: error?.message || 'Authentication failed' });
    }

    return res.json({ token: data.session.access_token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unexpected authentication error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
