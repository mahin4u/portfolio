import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

/**
 * Neon Postgres access layer.
 *
 * The entire CMS is optional: when `DATABASE_URL` is not configured the site
 * transparently falls back to the static content in `lib/*.ts` and the MDX
 * files, so it always builds and deploys.
 */

const connectionString =
  process.env.DATABASE_URL ??
  process.env.NETLIFY_DATABASE_URL ?? // Neon's Netlify integration uses this name
  process.env.POSTGRES_URL ??
  "";

export function hasDb(): boolean {
  return connectionString.length > 0;
}

let client: NeonQueryFunction<false, false> | null = null;

export function getSql(): NeonQueryFunction<false, false> {
  if (!hasDb()) {
    throw new Error(
      "Database is not configured. Set DATABASE_URL to enable the admin CMS."
    );
  }
  if (!client) client = neon(connectionString);
  return client;
}

// Run schema creation at most once per server instance.
let schemaPromise: Promise<void> | null = null;

export function ensureSchema(): Promise<void> {
  if (!hasDb()) return Promise.resolve();
  if (!schemaPromise) schemaPromise = createSchema();
  return schemaPromise;
}

async function createSchema(): Promise<void> {
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS settings (
      id         TEXT PRIMARY KEY,
      data       JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
  await sql`
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
    )`;
  await sql`
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
    )`;
  await sql`
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
    )`;
}
