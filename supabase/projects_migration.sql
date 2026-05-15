-- Delko — Projects Table Migration (idempotent)
-- Run in: Supabase Dashboard → SQL Editor → New query
-- Safe to re-run: all statements use IF NOT EXISTS / DO $$ guards.

-- ─────────────────────────────────────────────────────────────────
-- 1. Create public.projects if it does not exist
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.projects (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id     UUID        REFERENCES public.clients(id) ON DELETE SET NULL,
  project_name  TEXT        NOT NULL,
  package_type  TEXT,
  start_date    DATE,
  due_date      DATE,
  project_value NUMERIC,
  notes         TEXT,
  status        TEXT        NOT NULL DEFAULT 'Not started',
  progress      INTEGER     NOT NULL DEFAULT 0,
  current_phase TEXT,
  timeline      TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────
-- 2. Add missing columns if table already exists without them
-- ─────────────────────────────────────────────────────────────────
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS client_id     UUID        REFERENCES public.clients(id) ON DELETE SET NULL;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS project_name  TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS package_type  TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS start_date    DATE;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS due_date      DATE;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS project_value NUMERIC;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS notes         TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS status        TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS progress      INTEGER     NOT NULL DEFAULT 0;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS current_phase TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS timeline      TEXT;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW();
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW();

-- ─────────────────────────────────────────────────────────────────
-- 3. If column named 'package' exists but 'package_type' does not,
--    rename it. Safe: checks both conditions before renaming.
-- ─────────────────────────────────────────────────────────────────
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'projects' AND column_name = 'package'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'projects' AND column_name = 'package_type'
  ) THEN
    ALTER TABLE public.projects RENAME COLUMN package TO package_type;
  END IF;
END $$;

-- ─────────────────────────────────────────────────────────────────
-- 4. Ensure status has a default if somehow missing
-- ─────────────────────────────────────────────────────────────────
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'projects' AND column_name = 'status'
  ) THEN
    ALTER TABLE public.projects ALTER COLUMN status SET DEFAULT 'Not started';
  END IF;
END $$;

-- ─────────────────────────────────────────────────────────────────
-- 5. Index
-- ─────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_projects_client_id ON public.projects (client_id);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON public.projects (created_at DESC);

-- ─────────────────────────────────────────────────────────────────
-- 6. Enable RLS
-- ─────────────────────────────────────────────────────────────────
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- ─────────────────────────────────────────────────────────────────
-- 7. RLS policies
-- ─────────────────────────────────────────────────────────────────

-- Admin: full access (user_roles.role = 'admin')
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'projects' AND policyname = 'admin_projects_all'
  ) THEN
    CREATE POLICY "admin_projects_all" ON public.projects
      FOR ALL
      USING (
        EXISTS (
          SELECT 1 FROM user_roles
          WHERE user_id = auth.uid() AND role = 'admin'
        )
      )
      WITH CHECK (
        EXISTS (
          SELECT 1 FROM user_roles
          WHERE user_id = auth.uid() AND role = 'admin'
        )
      );
  END IF;
END $$;

-- Portal clients: read own projects
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'projects' AND policyname = 'portal_projects_read'
  ) THEN
    CREATE POLICY "portal_projects_read" ON public.projects
      FOR SELECT
      USING (
        client_id IN (
          SELECT id FROM public.clients WHERE email = auth.jwt() ->> 'email'
        )
      );
  END IF;
END $$;

-- ─────────────────────────────────────────────────────────────────
-- 8. Reload PostgREST schema cache
-- ─────────────────────────────────────────────────────────────────
NOTIFY pgrst, 'reload schema';
