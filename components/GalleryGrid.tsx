import type { GalleryItem } from "@/lib/gallery";
import { GalleryTile } from "@/components/GalleryTile";
import { Reveal } from "@/components/ui/Reveal";

/**
 * True masonry via CSS columns — tiles keep their natural aspect ratio and
 * flow to balance column heights, mimicking a mini social-media feed.
 */
export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  return (
    <div className="columns-2 gap-4 md:columns-3 [&>*]:mb-4">
      {items.map((item, i) => (
        <div key={item.id} className="break-inside-avoid">
          <Reveal delay={(i % 3) * 0.08} y={16}>
            <GalleryTile item={item} />
          </Reveal>
        </div>
      ))}
    </div>
  );
}
