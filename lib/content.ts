import { getSql, hasDb, ensureSchema } from "@/lib/db";
import { defaultSite, type SiteConfig } from "@/lib/site";
import { gallery as defaultGallery, type GalleryItem } from "@/lib/gallery";
import { milestones as defaultMilestones, type Milestone } from "@/lib/story";
import {
  getAllPosts as getMdxPosts,
  getPostBySlug as getMdxPost,
  getAllSlugs as getMdxSlugs,
  type BlogListItem,
  type BlogPost,
} from "@/lib/blog";

/* -------------------------------------------------------------------------- */
/*  Site configuration                                                        */
/* -------------------------------------------------------------------------- */

export async function getSiteConfig(): Promise<SiteConfig> {
  if (!hasDb()) return defaultSite;
  try {
    await ensureSchema();
    const rows = await getSql()`SELECT data FROM settings WHERE id = 'site' LIMIT 1`;
    if (!rows.length) return defaultSite;
    const data = rows[0].data as Partial<SiteConfig>;
    // Merge over defaults so a partial/older record never breaks the UI.
    return {
      ...defaultSite,
      ...data,
      whatsapp: { ...defaultSite.whatsapp, ...data.whatsapp },
      socials: { ...defaultSite.socials, ...data.socials },
      focuses:
        Array.isArray(data.focuses) && data.focuses.length
          ? data.focuses
          : defaultSite.focuses,
    };
  } catch (err) {
    console.error("getSiteConfig fell back to defaults:", err);
    return defaultSite;
  }
}

export async function saveSiteConfig(config: SiteConfig): Promise<void> {
  await ensureSchema();
  await getSql()`
    INSERT INTO settings (id, data)
    VALUES ('site', ${JSON.stringify(config)}::jsonb)
    ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = now()`;
}

/* -------------------------------------------------------------------------- */
/*  Gallery                                                                    */
/* -------------------------------------------------------------------------- */

function rowToGallery(r: Record<string, unknown>): GalleryItem {
  return {
    id: String(r.id),
    title: String(r.title),
    location: String(r.location ?? ""),
    country: String(r.country ?? ""),
    captureDate: String(r.capture_date ?? ""),
    src: (r.src as string) || undefined,
    ratio: (r.ratio as GalleryItem["ratio"]) ?? "landscape",
    accent: (r.accent as GalleryItem["accent"]) ?? "electric",
    sortOrder: Number(r.sort_order ?? 0),
  };
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  if (!hasDb()) return defaultGallery;
  try {
    await ensureSchema();
    const rows = await getSql()`
      SELECT * FROM gallery ORDER BY sort_order ASC, created_at ASC`;
    return rows.length ? rows.map(rowToGallery) : defaultGallery;
  } catch (err) {
    console.error("getGalleryItems fell back to defaults:", err);
    return defaultGallery;
  }
}

export async function upsertGalleryItem(
  item: GalleryItem & { sortOrder?: number }
): Promise<void> {
  await ensureSchema();
  await getSql()`
    INSERT INTO gallery (id, title, location, country, capture_date, src, ratio, accent, sort_order)
    VALUES (${item.id}, ${item.title}, ${item.location}, ${item.country},
            ${item.captureDate}, ${item.src ?? null}, ${item.ratio}, ${item.accent},
            ${item.sortOrder ?? 0})
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title, location = EXCLUDED.location, country = EXCLUDED.country,
      capture_date = EXCLUDED.capture_date, src = EXCLUDED.src, ratio = EXCLUDED.ratio,
      accent = EXCLUDED.accent, sort_order = EXCLUDED.sort_order`;
}

export async function deleteGalleryItem(id: string): Promise<void> {
  await ensureSchema();
  await getSql()`DELETE FROM gallery WHERE id = ${id}`;
}

/* -------------------------------------------------------------------------- */
/*  Story timeline                                                             */
/* -------------------------------------------------------------------------- */

function rowToMilestone(r: Record<string, unknown>): Milestone {
  return {
    year: String(r.year ?? ""),
    title: String(r.title),
    place: String(r.place ?? ""),
    flag: String(r.flag ?? ""),
    body: String(r.body ?? ""),
    tags: (r.tags as string[]) ?? [],
    accent: (r.accent as Milestone["accent"]) ?? "electric",
  };
}

export async function getMilestones(): Promise<Milestone[]> {
  if (!hasDb()) return defaultMilestones;
  try {
    await ensureSchema();
    const rows = await getSql()`
      SELECT * FROM milestones ORDER BY sort_order ASC`;
    return rows.length ? rows.map(rowToMilestone) : defaultMilestones;
  } catch (err) {
    console.error("getMilestones fell back to defaults:", err);
    return defaultMilestones;
  }
}

export interface MilestoneRecord extends Milestone {
  id: string;
  sortOrder?: number;
}

export async function getMilestoneRecords(): Promise<MilestoneRecord[]> {
  if (!hasDb()) return [];
  await ensureSchema();
  const rows = await getSql()`SELECT * FROM milestones ORDER BY sort_order ASC`;
  return rows.map((r) => ({
    ...rowToMilestone(r),
    id: String(r.id),
    sortOrder: Number(r.sort_order ?? 0),
  }));
}

export async function upsertMilestone(m: MilestoneRecord): Promise<void> {
  await ensureSchema();
  await getSql()`
    INSERT INTO milestones (id, year, title, place, flag, body, tags, accent, sort_order)
    VALUES (${m.id}, ${m.year}, ${m.title}, ${m.place}, ${m.flag}, ${m.body},
            ${m.tags}, ${m.accent}, ${m.sortOrder ?? 0})
    ON CONFLICT (id) DO UPDATE SET
      year = EXCLUDED.year, title = EXCLUDED.title, place = EXCLUDED.place,
      flag = EXCLUDED.flag, body = EXCLUDED.body, tags = EXCLUDED.tags,
      accent = EXCLUDED.accent, sort_order = EXCLUDED.sort_order`;
}

export async function deleteMilestone(id: string): Promise<void> {
  await ensureSchema();
  await getSql()`DELETE FROM milestones WHERE id = ${id}`;
}

/* -------------------------------------------------------------------------- */
/*  Blog posts                                                                 */
/* -------------------------------------------------------------------------- */

function rowToPostMeta(r: Record<string, unknown>): BlogListItem {
  return {
    slug: String(r.slug),
    title: String(r.title),
    date: String(r.date),
    category: String(r.category ?? "General"),
    excerpt: String(r.excerpt ?? ""),
    readingTime: estimateReadingTime(String(r.content ?? "")),
  };
}

function estimateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

export async function getPosts(includeDrafts = false): Promise<BlogListItem[]> {
  if (!hasDb()) return getMdxPosts();
  try {
    await ensureSchema();
    const rows = includeDrafts
      ? await getSql()`SELECT * FROM posts ORDER BY date DESC`
      : await getSql()`SELECT * FROM posts WHERE published = true ORDER BY date DESC`;
    return rows.length ? rows.map(rowToPostMeta) : getMdxPosts();
  } catch (err) {
    console.error("getPosts fell back to MDX:", err);
    return getMdxPosts();
  }
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  if (hasDb()) {
    try {
      await ensureSchema();
      const rows = await getSql()`SELECT * FROM posts WHERE slug = ${slug} LIMIT 1`;
      if (rows.length) {
        const r = rows[0];
        return {
          slug: String(r.slug),
          title: String(r.title),
          date: String(r.date),
          category: String(r.category ?? "General"),
          excerpt: String(r.excerpt ?? ""),
          content: String(r.content ?? ""),
          readingTime: estimateReadingTime(String(r.content ?? "")),
        };
      }
    } catch (err) {
      console.error("getPost DB lookup failed, trying MDX:", err);
    }
  }
  return getMdxPost(slug);
}

export async function getPostSlugs(): Promise<string[]> {
  if (hasDb()) {
    try {
      await ensureSchema();
      const rows = await getSql()`SELECT slug FROM posts WHERE published = true`;
      if (rows.length) return rows.map((r) => String(r.slug));
    } catch {
      /* fall through to MDX */
    }
  }
  return getMdxSlugs();
}

export interface PostInput extends BlogPost {
  published?: boolean;
}

export async function upsertPost(p: PostInput): Promise<void> {
  await ensureSchema();
  await getSql()`
    INSERT INTO posts (slug, title, date, category, excerpt, content, published, updated_at)
    VALUES (${p.slug}, ${p.title}, ${p.date}, ${p.category}, ${p.excerpt},
            ${p.content}, ${p.published ?? true}, now())
    ON CONFLICT (slug) DO UPDATE SET
      title = EXCLUDED.title, date = EXCLUDED.date, category = EXCLUDED.category,
      excerpt = EXCLUDED.excerpt, content = EXCLUDED.content,
      published = EXCLUDED.published, updated_at = now()`;
}

export async function deletePost(slug: string): Promise<void> {
  await ensureSchema();
  await getSql()`DELETE FROM posts WHERE slug = ${slug}`;
}

/* -------------------------------------------------------------------------- */
/*  Seeding                                                                    */
/* -------------------------------------------------------------------------- */

/** Populates empty tables with the current static content so editing can start. */
export async function seedFromDefaults(): Promise<void> {
  await ensureSchema();
  const sql = getSql();

  const settings = await sql`SELECT id FROM settings WHERE id = 'site'`;
  if (!settings.length) await saveSiteConfig(defaultSite);

  const g = await sql`SELECT id FROM gallery LIMIT 1`;
  if (!g.length) {
    await Promise.all(
      defaultGallery.map((item, i) =>
        upsertGalleryItem({ ...item, sortOrder: i })
      )
    );
  }

  const m = await sql`SELECT id FROM milestones LIMIT 1`;
  if (!m.length) {
    await Promise.all(
      defaultMilestones.map((ms, i) =>
        upsertMilestone({ ...ms, id: `milestone-${i}`, sortOrder: i })
      )
    );
  }

  const p = await sql`SELECT slug FROM posts LIMIT 1`;
  if (!p.length) {
    for (const meta of getMdxPosts()) {
      const full = getMdxPost(meta.slug);
      if (full) await upsertPost({ ...full, published: true });
    }
  }
}
