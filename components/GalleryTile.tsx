"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { GalleryItem } from "@/lib/gallery";

const ratioClass: Record<GalleryItem["ratio"], string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
};

const accentGradient: Record<GalleryItem["accent"], string> = {
  electric: "from-electric/80 via-midnight to-midnight-700",
  horizon: "from-horizon/70 via-electric/40 to-midnight",
  midnight: "from-midnight-600 via-midnight to-black",
};

/**
 * A single masonry tile. Renders an optimized next/image when `src` is set,
 * otherwise a branded gradient placeholder so the layout is never broken.
 */
export function GalleryTile({
  item,
  compact = false,
}: {
  item: GalleryItem;
  compact?: boolean;
}) {
  return (
    <motion.figure
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={`group relative overflow-hidden rounded-2xl ${
        compact ? "aspect-square" : ratioClass[item.ratio]
      }`}
    >
      {item.src ? (
        <Image
          src={item.src}
          alt={`${item.title} — ${item.location}, ${item.country}`}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div
          className={`h-full w-full bg-gradient-to-br ${accentGradient[item.accent]}`}
          role="img"
          aria-label={`${item.title} — ${item.location}, ${item.country}`}
        >
          <div className="flex h-full items-center justify-center opacity-30">
            <svg viewBox="0 0 24 24" className="h-10 w-10 fill-white" aria-hidden>
              <path d="M4 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H4Zm0 12 4.5-6 3.5 4.5 2.5-3L20 17H4Zm4-7.5A1.5 1.5 0 1 1 8 6.5a1.5 1.5 0 0 1 0 3Z" />
            </svg>
          </div>
        </div>
      )}

      {/* Hover overlay with metadata */}
      <figcaption className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="text-sm font-semibold text-white">{item.title}</p>
        <p className="text-xs text-horizon">
          {item.location}, {item.country}
        </p>
        {!compact && (
          <p className="mt-1 text-[11px] text-white/60">
            {new Date(item.captureDate).toLocaleDateString("en-GB", {
              month: "short",
              year: "numeric",
            })}
          </p>
        )}
      </figcaption>
    </motion.figure>
  );
}
