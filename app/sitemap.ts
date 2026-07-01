import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getAllSlugs } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const routes = ["", "/story", "/gallery", "/blog", "/contact"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const posts = getAllSlugs().map((slug) => ({
    url: `${base}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...routes, ...posts];
}
