"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/session";
import { defaultSite, type SiteConfig, type Accent } from "@/lib/site";
import type { GalleryItem } from "@/lib/gallery";
import {
  saveSiteConfig,
  upsertGalleryItem,
  deleteGalleryItem,
  upsertPost,
  deletePost,
  upsertMilestone,
  deleteMilestone,
  getSiteConfig,
  seedFromDefaults,
} from "@/lib/content";

/** Refresh every public route that renders CMS content. */
function revalidateAll() {
  for (const p of ["/", "/story", "/gallery", "/blog", "/contact"]) {
    revalidatePath(p);
  }
  revalidatePath("/", "layout");
}

function str(fd: FormData, key: string, fallback = ""): string {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim() : fallback;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

/* ----------------------------- Site settings ----------------------------- */

export async function saveSiteAction(fd: FormData) {
  await requireAdmin();
  const current = await getSiteConfig();

  const accent = (v: string): Accent => (v === "horizon" ? "horizon" : "electric");

  const config: SiteConfig = {
    ...current,
    name: str(fd, "name", current.name),
    shortName: str(fd, "shortName", current.shortName),
    age: Number(str(fd, "age", String(current.age))) || current.age,
    role: str(fd, "role", current.role),
    tagline: str(fd, "tagline", current.tagline),
    description: str(fd, "description", current.description),
    url: str(fd, "url", current.url),
    location: str(fd, "location", current.location),
    email: str(fd, "email", current.email),
    whatsapp: {
      number: str(fd, "whatsappNumber", current.whatsapp.number).replace(/\D/g, ""),
      presetMessage: str(fd, "whatsappMessage", current.whatsapp.presetMessage),
    },
    socials: {
      linkedin: str(fd, "linkedin", current.socials.linkedin),
      instagram: str(fd, "instagram", current.socials.instagram),
      github: str(fd, "github", current.socials.github),
    },
    focuses: [0, 1].map((i) => ({
      title: str(fd, `focus${i}Title`, defaultSite.focuses[i]?.title ?? ""),
      description: str(fd, `focus${i}Desc`, defaultSite.focuses[i]?.description ?? ""),
      accent: accent(str(fd, `focus${i}Accent`)),
      icon: str(fd, `focus${i}Icon`, defaultSite.focuses[i]?.icon ?? "route"),
    })),
  };

  await saveSiteConfig(config);
  revalidateAll();
}

export async function seedAction() {
  await requireAdmin();
  await seedFromDefaults();
  revalidateAll();
}

/* -------------------------------- Gallery -------------------------------- */

export async function saveGalleryAction(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id") || crypto.randomUUID();
  const item: GalleryItem & { sortOrder?: number } = {
    id,
    title: str(fd, "title", "Untitled"),
    location: str(fd, "location"),
    country: str(fd, "country"),
    captureDate: str(fd, "captureDate"),
    src: str(fd, "src") || undefined,
    ratio: (str(fd, "ratio", "landscape") as GalleryItem["ratio"]),
    accent: (str(fd, "accent", "electric") as GalleryItem["accent"]),
    sortOrder: Number(str(fd, "sortOrder", "0")) || 0,
  };
  await upsertGalleryItem(item);
  revalidatePath("/gallery");
  revalidatePath("/");
}

export async function deleteGalleryAction(fd: FormData) {
  await requireAdmin();
  await deleteGalleryItem(str(fd, "id"));
  revalidatePath("/gallery");
  revalidatePath("/");
}

/* --------------------------------- Blog ---------------------------------- */

export async function savePostAction(fd: FormData) {
  await requireAdmin();
  const title = str(fd, "title", "Untitled");
  const slug = str(fd, "slug") || slugify(title);
  await upsertPost({
    slug,
    title,
    date: str(fd, "date") || new Date().toISOString().slice(0, 10),
    category: str(fd, "category", "General"),
    excerpt: str(fd, "excerpt"),
    content: str(fd, "content"),
    published: str(fd, "published") === "on" || str(fd, "published") === "true",
  });
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/");
}

export async function deletePostAction(fd: FormData) {
  await requireAdmin();
  const slug = str(fd, "slug");
  await deletePost(slug);
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/");
}

/* ------------------------------- Timeline -------------------------------- */

export async function saveMilestoneAction(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id") || crypto.randomUUID();
  await upsertMilestone({
    id,
    year: str(fd, "year"),
    title: str(fd, "title", "Untitled"),
    place: str(fd, "place"),
    flag: str(fd, "flag"),
    body: str(fd, "body"),
    tags: str(fd, "tags")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    accent: str(fd, "accent") === "horizon" ? "horizon" : "electric",
    sortOrder: Number(str(fd, "sortOrder", "0")) || 0,
  });
  revalidatePath("/story");
}

export async function deleteMilestoneAction(fd: FormData) {
  await requireAdmin();
  await deleteMilestone(str(fd, "id"));
  revalidatePath("/story");
}
