-- Berk Growth Co. — Client Portal Schema
-- Run this in the Supabase SQL Editor

CREATE TABLE IF NOT EXISTS clients (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                  TEXT UNIQUE NOT NULL,
  name                  TEXT NOT NULL,
  business_name         TEXT NOT NULL,
  email                 TEXT NOT NULL,
  package               TEXT NOT NULL CHECK (package IN ('starter', 'growth', 'dominate')),
  custom_scope          TEXT,
  stripe_customer_id    TEXT,
  stripe_subscription_id TEXT,
  subscription_status   TEXT NOT NULL DEFAULT 'pending'
                          CHECK (subscription_status IN ('pending', 'active', 'past_due', 'canceled')),
  signed_at             TIMESTAMPTZ,
  signer_name           TEXT,
  signer_date           TEXT,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS monthly_metrics (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id         UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  month_year        TEXT NOT NULL,  -- format: YYYY-MM
  leads_generated   INTEGER NOT NULL DEFAULT 0,
  cost_per_lead     NUMERIC(10, 2) NOT NULL DEFAULT 0,
  ranking_movement  INTEGER NOT NULL DEFAULT 0,
  new_reviews       INTEGER NOT NULL DEFAULT 0,
  ad_spend          NUMERIC(10, 2) NOT NULL DEFAULT 0,
  ad_budget         NUMERIC(10, 2) NOT NULL DEFAULT 0,
  next_steps        TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (client_id, month_year)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_clients_slug ON clients (slug);
CREATE INDEX IF NOT EXISTS idx_metrics_client_month ON monthly_metrics (client_id, month_year DESC);

-- Row Level Security
-- All data access is via the service role key (admin client) which bypasses RLS.
-- Enable RLS to deny direct anon/authenticated key access.
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE monthly_metrics ENABLE ROW LEVEL SECURITY;

-- No anon policies — service role bypasses RLS automatically.
-- Add client-facing policies here when Supabase Auth is wired up:
--
-- Example (read own data by auth.uid):
-- CREATE POLICY "clients_own_read" ON clients
--   FOR SELECT USING (auth.uid()::text = id::text);
