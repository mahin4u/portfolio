import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

/**
 * Neon Postgres access layer.
 *
 * The entire CMS is optional: when `DATABASE_URL` is not configured the site
 * transparently falls back to the static content in `lib/*.ts` and the MDX
 * files, so it always builds and deploys.
 */

// NETLIFY_DATABASE_URL is the name Neon's Netlify integration uses.
const envVar = ["DATABASE_URL", "NETLIFY_DATABASE_URL", "POSTGRES_URL"].find(
  (name) => process.env[name] !== undefined
);
const rawConnectionString = envVar ? process.env[envVar] ?? "" : "";

// Neon's dashboard offers the value wrapped as `psql '...'`, and dashboards
// keep pasted quotes, so pull out just the URL when there is one.
const connectionString =
  /postgres(?:ql)?:\/\/[^\s'"]+/i.exec(rawConnectionString)?.[0] ??
  rawConnectionString;

export function hasDb(): boolean {
  return connectionString.length > 0;
}

/**
 * Admin-facing explanation of a failed query: the driver's message plus which
 * env var and host were used, with the connection string (password) removed.
 */
export function describeDbError(err: unknown): string {
  let message = err instanceof Error ? err.message : String(err);
  if (connectionString) {
    message = message.split(connectionString).join("<connection string>");
  }
  message = message
    .replace(/postgres(?:ql)?:\/\/\S*/gi, "<connection string>")
    .slice(0, 300);

  let host = "invalid URL";
  try {
    host = new URL(connectionString).hostname;
  } catch {
    /* keep the placeholder */
  }
  return `${message} (env var: ${envVar ?? "none"}, host: ${host})`;
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
  if (!schemaPromise) {
    schemaPromise = createSchema().catch((err) => {
      // Don't memoize a failure, or one blip breaks this instance for good.
      schemaPromise = null;
      throw err;
    });
  }
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
