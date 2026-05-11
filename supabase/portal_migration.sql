-- Delko Client Portal — Migration (corrected, idempotent)
-- Run once in: Supabase Dashboard → SQL Editor → New query
-- Safe to re-run: all statements use IF NOT EXISTS / DO $$ guards.


-- ─────────────────────────────────────────────────────────────────
-- 1. user_roles
--    Referenced in AdminAuth.tsx. Distinguishes admin vs customer.
--    After creating your admin Supabase Auth account, run:
--    INSERT INTO user_roles (user_id, role) VALUES ('<YOUR_UUID>', 'admin');
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_roles (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role       TEXT NOT NULL CHECK (role IN ('admin', 'client')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, role)
);

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'user_roles' AND policyname = 'users_read_own_role'
  ) THEN
    CREATE POLICY "users_read_own_role" ON user_roles
      FOR SELECT USING (auth.uid() = user_id);
  END IF;
END $$;


-- ─────────────────────────────────────────────────────────────────
-- 2. clients — add every column referenced across the codebase
--
--    Columns already expected in original schema (no ADD needed):
--      id, slug, name, business_name, email, package, custom_scope,
--      stripe_customer_id, stripe_subscription_id, subscription_status,
--      signed_at, signer_name, signer_date, created_at, updated_at
--
--    Added below: admin CRM fields + portal onboarding field
-- ─────────────────────────────────────────────────────────────────

-- Admin CRM columns (app/admin/clients/page.tsx, components/admin/LeadDrawer.tsx)
ALTER TABLE clients ADD COLUMN IF NOT EXISTS contact_name           TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS phone                  TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS town                   TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS business_type          TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS website                TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS instagram              TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS package_purchased      TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS project_value          NUMERIC;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS monthly_retainer_value NUMERIC;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS start_date             DATE;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS client_status          TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS payment_status         TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS project_status         TEXT;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS notes                  TEXT;

-- Portal onboarding checklist (app/portal/onboarding/page.tsx)
ALTER TABLE clients ADD COLUMN IF NOT EXISTS onboarding_completed TEXT[] NOT NULL DEFAULT '{}';


-- ─────────────────────────────────────────────────────────────────
-- 3. client_messages
--
--    Correct schema (matches app/admin/messages/page.tsx exactly):
--      sender_id   UUID       — auth.users.id of the sender
--      sender_role TEXT       — 'client' | 'admin'
--      body        TEXT       — message content
--      read_at     TIMESTAMPTZ — NULL = unread; set when recipient opens it
--
--    PREVIOUS WRONG SCHEMA had: sender TEXT, read BOOLEAN
--    If you already ran the old migration, the CREATE below is skipped
--    (IF NOT EXISTS), but the ALTER statements will add the missing columns.
-- ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS client_messages (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id   UUID        NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  sender_id   UUID,
  sender_role TEXT        NOT NULL CHECK (sender_role IN ('client', 'admin')),
  body        TEXT        NOT NULL,
  read_at     TIMESTAMPTZ,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Safe to run even on a fresh table — ADD COLUMN IF NOT EXISTS is a no-op
-- when the column already exists. This handles the case where the table was
-- created by the old migration with wrong column names.
ALTER TABLE client_messages ADD COLUMN IF NOT EXISTS sender_id   UUID;
ALTER TABLE client_messages ADD COLUMN IF NOT EXISTS sender_role TEXT;
ALTER TABLE client_messages ADD COLUMN IF NOT EXISTS read_at     TIMESTAMPTZ;

-- If the old wrong `sender` column exists with NOT NULL, relax it so new
-- inserts (which use sender_role, not sender) don't fail.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'client_messages' AND column_name = 'sender'
  ) THEN
    ALTER TABLE client_messages ALTER COLUMN sender DROP NOT NULL;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_messages_client
  ON client_messages (client_id, created_at DESC);

ALTER TABLE client_messages ENABLE ROW LEVEL SECURITY;


-- ─────────────────────────────────────────────────────────────────
-- 4. RLS — client_messages
--    Policies reference sender_role (not sender) — column is created above.
-- ─────────────────────────────────────────────────────────────────

-- Portal clients: read messages for their own client record
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'client_messages' AND policyname = 'portal_messages_read'
  ) THEN
    CREATE POLICY "portal_messages_read" ON client_messages
      FOR SELECT USING (
        client_id IN (
          SELECT id FROM clients WHERE email = auth.jwt() ->> 'email'
        )
      );
  END IF;
END $$;

-- Portal clients: insert only their own messages (sender_role must be 'client')
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'client_messages' AND policyname = 'portal_messages_insert'
  ) THEN
    CREATE POLICY "portal_messages_insert" ON client_messages
      FOR INSERT WITH CHECK (
        client_id IN (
          SELECT id FROM clients WHERE email = auth.jwt() ->> 'email'
        )
        AND sender_role = 'client'
      );
  END IF;
END $$;

-- Admins (user_roles.role = 'admin'): full access to all messages
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'client_messages' AND policyname = 'admin_messages_all'
  ) THEN
    CREATE POLICY "admin_messages_all" ON client_messages
      FOR ALL USING (
        EXISTS (
          SELECT 1 FROM user_roles
          WHERE user_id = auth.uid() AND role = 'admin'
        )
      );
  END IF;
END $$;


-- ─────────────────────────────────────────────────────────────────
-- 5. RLS — clients (portal customer reads own row by email)
-- ─────────────────────────────────────────────────────────────────
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'clients' AND policyname = 'portal_client_read'
  ) THEN
    CREATE POLICY "portal_client_read" ON clients
      FOR SELECT USING (email = auth.jwt() ->> 'email');
  END IF;
END $$;


-- ─────────────────────────────────────────────────────────────────
-- 6. RLS — monthly_metrics (portal customer reads own metrics)
-- ─────────────────────────────────────────────────────────────────
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'monthly_metrics' AND policyname = 'portal_metrics_read'
  ) THEN
    CREATE POLICY "portal_metrics_read" ON monthly_metrics
      FOR SELECT USING (
        client_id IN (
          SELECT id FROM clients WHERE email = auth.jwt() ->> 'email'
        )
      );
  END IF;
END $$;


-- ─────────────────────────────────────────────────────────────────
-- Post-migration checklist
-- ─────────────────────────────────────────────────────────────────
--
-- 1. Grant admin access to your account:
--    INSERT INTO user_roles (user_id, role)
--    VALUES ('<YOUR_AUTH_USER_UUID>', 'admin')
--    ON CONFLICT DO NOTHING;
--
-- 2. Ensure RLS is enabled on clients and monthly_metrics tables
--    (they should already be enabled if the admin portal was working):
--    ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
--    ALTER TABLE monthly_metrics ENABLE ROW LEVEL SECURITY;
--
-- 3. The SUPABASE_SERVICE_ROLE_KEY bypasses all RLS — it is only used
--    in server-side admin API routes (createAdminClient()). Customer
--    portal pages use the anon key + session cookie (createClient()).
--
-- Active policies after this migration:
--   user_roles:      users_read_own_role
--   clients:         portal_client_read (+ existing admin policies)
--   monthly_metrics: portal_metrics_read (+ existing admin policies)
--   client_messages: portal_messages_read, portal_messages_insert,
--                    admin_messages_all
-- ─────────────────────────────────────────────────────────────────
