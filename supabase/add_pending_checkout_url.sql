-- Run in Supabase SQL Editor
ALTER TABLE clients ADD COLUMN IF NOT EXISTS pending_checkout_url TEXT;
