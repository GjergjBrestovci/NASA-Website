import React, { FormEvent, useEffect, useMemo, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase, supabaseConfigured } from '../supabaseClient';
import './TeachersPortal.css';

type ScheduleItem = {
  id?: string;
  title: string;
  slot: string;
  focus: string;
  status: string;
};

const emptyRow: ScheduleItem = {
  title: '',
  slot: '',
  focus: '',
  status: 'upcoming',
};

const TeachersPortal: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [items, setItems] = useState<ScheduleItem[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isAuthed = useMemo(() => Boolean(session?.access_token), [session]);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const loadSchedule = async () => {
      try {
        const res = await fetch('/api/schedule');
        if (!res.ok) {
          throw new Error('Failed to load schedule');
        }
        const payload = await res.json();
        if (Array.isArray(payload.items)) {
          setItems(payload.items);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadSchedule();
  }, []);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    if (!supabase) {
      setLoading(false);
      setError('Teacher console is not configured yet.');
      return;
    }

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    setSession(data.session);
    setMessage('Logged in as teacher.');
  };

  const handleLogout = async () => {
    if (!supabase) {
      setSession(null);
      return;
    }
    await supabase.auth.signOut();
    setSession(null);
    setItems([]);
    setMessage('Signed out.');
  };

  const updateRow = (index: number, key: keyof ScheduleItem, value: string) => {
    setItems(prev => prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
  };

  const addRow = () => setItems(prev => [...prev, { ...emptyRow }]);

  const removeRow = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const saveSchedule = async () => {
    if (!supabase) {
      setError('Teacher console is not configured yet.');
      return;
    }
    if (!session?.access_token) {
      setError('Log in to save changes.');
      return;
    }

    setSaving(true);
    setMessage(null);
    setError(null);

    const res = await fetch('/api/schedule', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ items }),
    });

    const payload = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(payload?.error || 'Unable to save schedule');
      return;
    }

    setItems(payload.items ?? []);
    setMessage('Schedule updated.');
  };

  return (
    <section className="section block" id="teachers">
      <div className="section__heading">
        <p className="eyebrow">Teachers Only</p>
        <h2 className="section__title">Crew Console</h2>
        <p className="section__subtitle">Log in to edit the shared schedule stored in Supabase. Only teachers can save changes.</p>
      </div>

      {!supabaseConfigured && (
        <div className="card glass">
          <p className="teacher-empty">Teacher console is disabled until Supabase is configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.</p>
        </div>
      )}

      {supabaseConfigured && !isAuthed && (
        <form className="teacher-form card glass" onSubmit={handleLogin}>
          <div className="form-grid">
            <label>
              <span>Email</span>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </label>
            <label>
              <span>Password</span>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </label>
          </div>
          <button className="cta-button" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          {error && <p className="form-error">{error}</p>}
        </form>
      )}

      {supabaseConfigured && isAuthed && (
        <div className="teacher-panel">
          <div className="teacher-panel__bar">
            <div>
              <p className="teacher-meta">Signed in</p>
              {message && <p className="form-success">{message}</p>}
              {error && <p className="form-error">{error}</p>}
            </div>
            <div className="teacher-actions">
              <button className="ghost" type="button" onClick={addRow}>
                Add row
              </button>
              <button className="ghost" type="button" onClick={handleLogout}>
                Sign out
              </button>
              <button className="cta-button" type="button" onClick={saveSchedule} disabled={saving}>
                {saving ? 'Saving...' : 'Save schedule'}
              </button>
            </div>
          </div>

          <div className="teacher-table">
            <div className="teacher-table__head">
              <span>Title</span>
              <span>Slot</span>
              <span>Focus</span>
              <span>Status</span>
              <span>Actions</span>
            </div>
            {items.map((item, index) => (
              <div key={item.id ?? index} className="teacher-table__row">
                <input
                  value={item.title}
                  onChange={e => updateRow(index, 'title', e.target.value)}
                  placeholder="Session title"
                />
                <input
                  value={item.slot}
                  onChange={e => updateRow(index, 'slot', e.target.value)}
                  placeholder="Day · Time"
                />
                <input
                  value={item.focus}
                  onChange={e => updateRow(index, 'focus', e.target.value)}
                  placeholder="What happens"
                />
                <select value={item.status} onChange={e => updateRow(index, 'status', e.target.value)}>
                  <option value="live">live</option>
                  <option value="upcoming">upcoming</option>
                  <option value="milestone">milestone</option>
                </select>
                <button className="ghost" type="button" onClick={() => removeRow(index)}>
                  Remove
                </button>
              </div>
            ))}
            {!items.length && <p className="teacher-empty">No schedule rows yet.</p>}
          </div>
        </div>
      )}
    </section>
  );
};

export default TeachersPortal;
