"use client";

import { useState } from "react";

/**
 * Dual image input: paste a hosted URL OR upload a file (stored in Netlify
 * Blobs via /api/media/upload). The resolved URL is written to a hidden input
 * named `src` so it submits with the surrounding form.
 */
export function ImageField({
  name = "src",
  defaultValue = "",
}: {
  name?: string;
  defaultValue?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/media/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      setValue(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-2">
      <input type="hidden" name={name} value={value} />
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="url"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Paste an image URL, or upload →"
          className="flex-1 rounded-lg border border-midnight/15 bg-white px-3 py-2 text-sm outline-none focus:border-electric"
        />
        <label className="btn-ghost cursor-pointer !py-2 text-sm">
          {busy ? "Uploading…" : "Upload file"}
          <input
            type="file"
            accept="image/*"
            onChange={onFile}
            disabled={busy}
            className="hidden"
          />
        </label>
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt="Preview"
          className="h-28 w-auto rounded-lg border border-midnight/10 object-cover"
        />
      )}
    </div>
  );
}
