// One-off: apply db/schema.sql + db/seed.sql to the Neon DB from .env.local,
// then seed the two starter blog posts from content/blog/*.mdx.
import { neon } from "@neondatabase/serverless";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = "D:/mahdi/portfolio";

// Parse DATABASE_URL out of .env.local (values may be quoted or bare).
const env = readFileSync(path.join(root, ".env.local"), "utf8");
const m = env.match(/DATABASE_URL\s*=\s*"?([^"\r\n]+)"?/);
if (!m) throw new Error("DATABASE_URL not found in .env.local");
const sql = neon(m[1]);

function statements(file) {
  return readFileSync(path.join(root, "db", file), "utf8")
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.replace(/--[^\n]*/g, "").trim().length > 0);
}

for (const file of ["schema.sql", "seed.sql"]) {
  for (const stmt of statements(file)) {
    await sql(stmt);
  }
  console.log(`applied ${file}`);
}

// Blog posts from MDX (idempotent).
const blogDir = path.join(root, "content", "blog");
for (const f of readdirSync(blogDir).filter((f) => f.endsWith(".mdx"))) {
  const slug = f.replace(/\.mdx$/, "");
  const { data, content } = matter(readFileSync(path.join(blogDir, f), "utf8"));
  await sql(
    `INSERT INTO posts (slug, title, date, category, excerpt, content, published)
     VALUES ($1, $2, $3, $4, $5, $6, true)
     ON CONFLICT (slug) DO NOTHING`,
    [slug, data.title, data.date, data.category ?? "General", data.excerpt ?? "", content]
  );
  console.log(`post seeded: ${slug}`);
}

for (const t of ["settings", "gallery", "milestones", "posts"]) {
  const r = await sql(`SELECT count(*)::int AS n FROM ${t}`);
  console.log(`${t}: ${r[0].n} rows`);
}
