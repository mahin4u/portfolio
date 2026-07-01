import type { Metadata } from "next";
import { getGallery } from "@/lib/gallery";
import { GalleryGrid } from "@/components/GalleryGrid";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Travel and portrait photography by Mohim Mahdi Hassan — captured across Bangladesh and Belgium.",
};

export default function GalleryPage() {
  const items = getGallery();

  return (
    <div className="container-page py-16 sm:py-24">
      <Reveal>
        <p className="eyebrow mb-3">Through the lens</p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          The Gallery
        </h1>
        <p className="mt-4 max-w-2xl text-midnight/70">
          A visual travelogue — from the rooftops of Old Dhaka to the canals of
          Bruges. Portraits, streets and horizons collected along the way. Hover
          any frame for its location.
        </p>
      </Reveal>

      <div className="mt-12">
        <GalleryGrid items={items} />
      </div>
    </div>
  );
}
