# Mahin Mahadi Hassan — "The Navigator's Blue" Portfolio

A production-grade personal portfolio built with **Next.js (App Router)**,
**TypeScript**, **Tailwind CSS** and **Framer Motion**, optimized for deployment
on **Netlify**.

## ✨ Features

- **Home** — animated hero, philosophy, and current focus cards (Supply Chain & Trading).
- **The Story** — interactive, scroll-animated vertical timeline (Bangladesh → Belgium).
- **Gallery** — CSS-masonry photography grid with hover metadata, ready for `next/image`.
- **Blog** — local MDX articles rendered with `next-mdx-remote`, statically generated.
- **Connect** — contact form (mailto by default) + global floating WhatsApp button.
- **Admin CMS (`/admin`)** — password-protected dashboard to edit site texts, gallery, blog posts and the timeline, backed by **Neon Postgres**. Image **upload** (Netlify Blobs) *or* paste a hosted URL.
- SEO: metadata, Open Graph, `sitemap.xml`, `robots.txt`, and an app icon.
- Fully responsive, accessible, reduced-motion aware.

## 🔐 Admin CMS

The site works fully **without** a database — it serves the built-in content in
`lib/*.ts` and `content/blog/*.mdx`. Connecting Neon turns on live editing.

1. **Create a Neon database** at [neon.tech](https://neon.tech) (free tier) and
   copy the connection string.
2. **Set environment variables** (locally in `.env.local`, and in Netlify under
   *Site settings → Environment variables*) — see [`.env.example`](.env.example):
   - `DATABASE_URL` — Neon connection string.
   - `ADMIN_PASSWORD` — the password for `/admin`.
   - `SESSION_SECRET` — long random string for signing session cookies.
3. Deploy (or `npm run dev`), visit **`/admin`**, sign in.
4. Click **“Seed from defaults”** on the settings page to copy the current
   content into the database, then edit anything.

Content edits trigger on-demand revalidation, so the public pages update within
seconds. Image uploads require the Netlify runtime (prod or `netlify dev`); in
plain `next dev`, paste an image URL instead.

## 🎨 Brand — "The Navigator's Blue"

| Role | Hex | Tailwind token |
| --- | --- | --- |
| Primary Base (Dark) | `#0B132B` | `midnight` |
| Secondary Base (Light) | `#F4F7FC` | `slate-canvas` |
| Primary Accent | `#3A86FF` | `electric` |
| Secondary Accent | `#4CC9F0` | `horizon` |

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## 🧩 Personalize

- **Identity, socials, WhatsApp number** → `lib/site.ts`
- **Timeline milestones** → `lib/story.ts`
- **Gallery items** → `lib/gallery.ts` (drop photos in `public/gallery`)
- **Blog posts** → add `.mdx` files in `content/blog/` with frontmatter
  (`title`, `date`, `category`, `excerpt`).

> ⚠️ Update the WhatsApp number in `lib/site.ts` (`whatsapp.number`) and the
> production `url` before going live.

## ☁️ Deploy to Netlify

1. Push this repo to GitHub (already wired to `mahin4u/portfolio`).
2. In Netlify: **Add new site → Import from GitHub** → pick the repo.
3. Build settings are auto-detected from `netlify.toml`:
   - Build command: `next build`
   - Publish directory: `.next`
   - Plugin: `@netlify/plugin-nextjs` (handles SSR/SSG + image optimization)
4. Deploy, then map your custom domain and enable the free SSL certificate.

Every push to `main` triggers an automatic production deploy.

## 🖼️ Asset management

Compress source photos to a **max width of 1920px** and export **`.webp`/`.avif`**
(TinyPNG or `sharp`) before committing — see `public/gallery/README.md`.

---

Built with curiosity. _Together is better._
