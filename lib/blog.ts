import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogFrontmatter {
  title: string;
  date: string; // ISO string, e.g. "2026-05-14"
  category: string;
  excerpt: string;
  readingTime?: string;
}

export interface BlogPost extends BlogFrontmatter {
  slug: string;
  content: string;
}

export interface BlogListItem extends BlogFrontmatter {
  slug: string;
}

function ensureDir(): boolean {
  return fs.existsSync(BLOG_DIR);
}

/** Rough reading-time estimate from raw markdown (~200 wpm). */
function estimateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

/** Returns every post's slug for `generateStaticParams`. */
export function getAllSlugs(): string[] {
  if (!ensureDir()) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

/** Loads a single post (frontmatter + raw MDX body) by slug. */
export function getPostBySlug(slug: string): BlogPost | null {
  if (!ensureDir()) return null;
  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);
  const mdPath = path.join(BLOG_DIR, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as BlogFrontmatter;

  return {
    slug,
    content,
    title: fm.title ?? slug,
    date: fm.date ?? new Date().toISOString().slice(0, 10),
    category: fm.category ?? "General",
    excerpt: fm.excerpt ?? "",
    readingTime: fm.readingTime ?? estimateReadingTime(content),
  };
}

/** All posts, newest first — for the blog index. */
export function getAllPosts(): BlogListItem[] {
  return getAllSlugs()
    .map((slug) => {
      const post = getPostBySlug(slug);
      if (!post) return null;
      const { content, ...meta } = post;
      void content;
      return meta;
    })
    .filter((p): p is BlogListItem => p !== null)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}
