# NASA Freifach - Teacher Portal Setup Guide

## Overview

The teacher portal is a separate application running on port 3001 that allows teachers to manage the schedule displayed on the public NASA Freifach website.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Public Website (Vite)                     │
│                    http://localhost:5173                     │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Fetches schedule from /api/schedule                 │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    API Server (Express)                      │
│                    http://localhost:8787                     │
│                                                             │
│  • GET  /api/schedule      - Public read                    │
│  • POST /api/schedule      - Add event (auth required)      │
│  • PUT  /api/schedule      - Update all (auth required)     │
│  • DELETE /api/schedule/:id - Delete event (auth required)  │
│  • POST /auth/login        - Teacher authentication         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Supabase                                │
│                                                             │
│  • schedule table (events data)                             │
│  • auth.users (teacher accounts)                            │
└─────────────────────────────────────────────────────────────┘
                              ▲
                              │
┌─────────────────────────────────────────────────────────────┐
│                 Teacher Portal (Express)                     │
│                    http://localhost:3001                     │
│                                                             │
│  • Login page (index.html)                                  │
│  • Dashboard (dashboard.html) - CRUD for schedule           │
└─────────────────────────────────────────────────────────────┘
```

## Setup Instructions

### 1. Supabase Setup

1. Create a Supabase project at https://supabase.com

2. Run the SQL setup script in the Supabase SQL Editor:
   - Open `supabase-setup.sql` in this project
   - Copy and paste into Supabase SQL Editor
   - Click "Run"

3. Create a teacher user:
   - Go to Authentication > Users
   - Click "Add user" > "Create new user"
   - Enter email and password
   - After creation, run this SQL to grant teacher role:
   ```sql
   UPDATE auth.users 
   SET raw_app_meta_data = raw_app_meta_data || '{"role": "teacher"}'::jsonb 
   WHERE email = 'your-teacher-email@example.com';
   ```

4. Get your API keys:
   - Go to Settings > API
   - Copy the "Project URL" → `SUPABASE_URL`
   - Copy the "service_role" key → `SUPABASE_SERVICE_ROLE_KEY`
   - Copy the "anon" key → `SUPABASE_ANON_KEY`

### 2. Environment Configuration

Update the `.env` file with your Supabase credentials:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_ANON_KEY=your_anon_key
PORT=8787
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
TEACHER_PORTAL_PORT=3001
```

### 3. Running the Application

Open three terminal windows:

**Terminal 1 - Main API Server:**
```bash
npm run server
```
Runs on http://localhost:8787

**Terminal 2 - Teacher Portal:**
```bash
npm run teacher-portal
```
Runs on http://localhost:3001

**Terminal 3 - Public Website (Vite):**
```bash
npm run dev
```
Runs on http://localhost:5173

### 4. Using the Teacher Portal

1. Go to http://localhost:3001
2. Log in with teacher credentials
3. Use the dashboard to:
   - **Add events** - Click "Add Event" button
   - **Edit events** - Click the edit icon on any event
   - **Delete events** - Click the delete icon on any event
   - **Reorder events** - Drag and drop (coming soon)

4. Changes appear immediately on the public website

## Schedule Item Fields

| Field  | Description                                      | Example                          |
|--------|--------------------------------------------------|----------------------------------|
| title  | Event name                                       | "Launch Briefing"                |
| slot   | When the event occurs                            | "Mondays · 16:00 – 17:00"        |
| focus  | What students will do                            | "Mission overview and planning"  |
| status | Event state: live, upcoming, milestone, completed | "upcoming"                       |

## Troubleshooting

### "Missing bearer token" error
- Make sure you're logged in to the teacher portal
- Check that localStorage has `teacher_token`

### "Invalid or expired token" error  
- Log out and log back in
- Token may have expired

### "Not authorized" error
- User doesn't have teacher role
- Run the SQL command to add teacher role to user

### Schedule not updating on public site
- Check browser console for errors
- Make sure API server is running on port 8787
- Verify Supabase credentials in .env

## Security Notes

- The `service_role` key should **never** be exposed to the frontend
- Teacher portal uses short-lived JWT tokens
- All write operations require valid teacher authentication
- Row Level Security (RLS) is enabled on the schedule table
