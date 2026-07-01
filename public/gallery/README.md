# Gallery images

Drop optimized photos here and reference them from `lib/gallery.ts` via the
`src` field (e.g. `src: "/gallery/bruges-canal.webp"`).

## Before committing — optimize!

Source photography is often 10MB+ per file. That will tank mobile performance.
Compress every image before committing:

1. **Resize** to a max width of **1920px**.
2. **Convert** to `.webp` or `.avif`.
3. **Compress** with [TinyPNG](https://tinypng.com/) or the `sharp` CLI.

Quick batch example with sharp (run once, locally):

```bash
npx @squoosh/cli --resize '{"width":1920}' --webp '{"quality":80}' -d ./optimized ./raw/*.jpg
```

Any gallery item without a `src` renders a branded gradient placeholder, so the
layout never breaks while you're still adding real photos.
