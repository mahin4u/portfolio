import { getStore } from "@netlify/blobs";

export const runtime = "nodejs";

/** Serves an image previously stored in Netlify Blobs by the upload route. */
export async function GET(
  _req: Request,
  { params }: { params: { key: string } }
) {
  let store;
  try {
    store = getStore("media");
  } catch {
    return new Response("Blob storage unavailable", { status: 501 });
  }

  const result = await store.getWithMetadata(params.key, {
    type: "arrayBuffer",
  });

  if (!result) {
    return new Response("Not found", { status: 404 });
  }

  const contentType =
    (result.metadata?.contentType as string) ?? "application/octet-stream";

  return new Response(result.data, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
