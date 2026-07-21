-- ---------------------------------------------------------------------------
-- Navigator's Blue portfolio — Neon Postgres schema
-- Matches lib/db.ts exactly (the app also runs these CREATEs automatically
-- on first request, so running this file manually is optional but harmless).
-- Paste into: Neon Console → your project → SQL Editor → Run.
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS settings (
  id         TEXT PRIMARY KEY,
  data       JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS gallery (
  id           TEXT PRIMARY KEY,
  title        TEXT NOT NULL,
  location     TEXT NOT NULL DEFAULT '',
  country      TEXT NOT NULL DEFAULT '',
  capture_date TEXT NOT NULL DEFAULT '',
  src          TEXT,
  ratio        TEXT NOT NULL DEFAULT 'landscape',
  accent       TEXT NOT NULL DEFAULT 'electric',
  sort_order   INTEGER NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS posts (
  slug       TEXT PRIMARY KEY,
  title      TEXT NOT NULL,
  date       TEXT NOT NULL,
  category   TEXT NOT NULL DEFAULT 'General',
  excerpt    TEXT NOT NULL DEFAULT '',
  content    TEXT NOT NULL DEFAULT '',
  published  BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS milestones (
  id         TEXT PRIMARY KEY,
  year       TEXT NOT NULL DEFAULT '',
  title      TEXT NOT NULL,
  place      TEXT NOT NULL DEFAULT '',
  flag       TEXT NOT NULL DEFAULT '',
  body       TEXT NOT NULL DEFAULT '',
  tags       TEXT[] NOT NULL DEFAULT '{}',
  accent     TEXT NOT NULL DEFAULT 'electric',
  sort_order INTEGER NOT NULL DEFAULT 0
);
