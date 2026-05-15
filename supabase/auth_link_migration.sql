-- Delko — Auth Link Migration
-- Links auth.users to public.clients via customer_user_id.
-- Safe to re-run: all statements use IF NOT EXISTS guards.

-- ─────────────────────────────────────────────────────────────────
-- 1. Add customer_user_id to clients
--    Nullable FK → allows existing rows without auth accounts.
-- ─────────────────────────────────────────────────────────────────
ALTER TABLE clients
  ADD COLUMN IF NOT EXISTS customer_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_clients_customer_user_id
  ON clients (customer_user_id)
  WHERE customer_user_id IS NOT NULL;

-- ─────────────────────────────────────────────────────────────────
-- 2. RLS — allow authenticated users to read their own row by
--    customer_user_id in addition to the email-based policy.
--    (The sync-client route uses service role and bypasses RLS,
--     so this only affects direct client queries.)
-- ─────────────────────────────────────────────────────────────────
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'clients' AND policyname = 'portal_client_read_by_uid'
  ) THEN
    CREATE POLICY "portal_client_read_by_uid" ON clients
      FOR SELECT
      TO authenticated
      USING (customer_user_id = auth.uid());
  END IF;
END $$;

-- ─────────────────────────────────────────────────────────────────
-- 3. RLS — allow same metrics read via customer_user_id
-- ─────────────────────────────────────────────────────────────────
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'monthly_metrics' AND policyname = 'portal_metrics_read_by_uid'
  ) THEN
    CREATE POLICY "portal_metrics_read_by_uid" ON monthly_metrics
      FOR SELECT
      TO authenticated
      USING (
        client_id IN (
          SELECT id FROM clients WHERE customer_user_id = auth.uid()
        )
      );
  END IF;
END $$;

-- ─────────────────────────────────────────────────────────────────
-- 4. RLS — client_messages read/insert via customer_user_id
-- ─────────────────────────────────────────────────────────────────
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'client_messages' AND policyname = 'portal_messages_read_by_uid'
  ) THEN
    CREATE POLICY "portal_messages_read_by_uid" ON client_messages
      FOR SELECT
      TO authenticated
      USING (
        client_id IN (
          SELECT id FROM clients WHERE customer_user_id = auth.uid()
        )
      );
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'client_messages' AND policyname = 'portal_messages_insert_by_uid'
  ) THEN
    CREATE POLICY "portal_messages_insert_by_uid" ON client_messages
      FOR INSERT
      TO authenticated
      WITH CHECK (
        client_id IN (
          SELECT id FROM clients WHERE customer_user_id = auth.uid()
        )
        AND sender_role = 'client'
      );
  END IF;
END $$;

-- ─────────────────────────────────────────────────────────────────
-- Post-migration: backfill existing customer_user_id values
-- For any clients whose auth account already exists, run:
--
--   UPDATE clients c
--   SET customer_user_id = u.id
--   FROM auth.users u
--   WHERE lower(u.email) = lower(c.email)
--     AND c.customer_user_id IS NULL;
--
-- This is safe to run manually. The sync-client route handles
-- future logins automatically.
-- ─────────────────────────────────────────────────────────────────
