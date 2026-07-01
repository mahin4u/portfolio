# Mohim Mahdi Hassan — "The Navigator's Blue" Portfolio

A production-grade personal portfolio built with **Next.js (App Router)**,
**TypeScript**, **Tailwind CSS** and **Framer Motion**, optimized for deployment
on **Netlify**.

## ✨ Features

- **Home** — animated hero, philosophy, and current focus cards (Supply Chain & Trading).
- **The Story** — interactive, scroll-animated vertical timeline (Bangladesh → Belgium).
- **Gallery** — CSS-masonry photography grid with hover metadata, ready for `next/image`.
- **Blog** — local MDX articles rendered with `next-mdx-remote`, statically generated.
- **Connect** — contact form (mailto by default) + global floating WhatsApp button.
- SEO: metadata, Open Graph, `sitemap.xml`, `robots.txt`, and an app icon.
- Fully responsive, accessible, reduced-motion aware.

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
