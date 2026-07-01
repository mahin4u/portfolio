import { NextResponse } from "next/server";
import { getStore } from "@netlify/blobs";

export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];

/**
 * Accepts a single image file and stores it in Netlify Blobs.
 * Returns a same-origin URL (`/api/media/<key>`) usable by next/image.
 *
 * Netlify Blobs is only available in the Netlify runtime (prod / `netlify dev`).
 * In plain `next dev` this returns a clear 501 — paste a hosted URL instead.
 */
export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const file = form?.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json(
      { error: `Unsupported type: ${file.type || "unknown"}` },
      { status: 415 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "File too large (max 8 MB). Compress it first." },
      { status: 413 }
    );
  }

  let store;
  try {
    store = getStore("media");
  } catch {
    return NextResponse.json(
      {
        error:
          "File uploads require the Netlify runtime. Run `netlify dev` or deploy, or paste an image URL instead.",
      },
      { status: 501 }
    );
  }

  const ext = file.type.split("/")[1]?.replace("jpeg", "jpg") ?? "bin";
  const key = `${crypto.randomUUID()}.${ext}`;
  const buffer = await file.arrayBuffer();

  await store.set(key, buffer, {
    metadata: { contentType: file.type },
  });

  return NextResponse.json({ url: `/api/media/${key}`, key });
}
