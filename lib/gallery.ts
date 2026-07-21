/**
 * Gallery data schema. Each item can either point at a real optimized image
 * (`src`, placed in /public/gallery) or fall back to a generated gradient tile
 * so the layout never breaks before real photos are added.
 *
 * ASSET TIP: compress source photos to <=1920px wide and export .webp/.avif
 * (TinyPNG or `sharp`) before dropping them in /public/gallery.
 */
export type GalleryAccent = "electric" | "horizon" | "midnight";

export interface GalleryItem {
  id: string;
  title: string;
  location: string;
  country: string;
  captureDate: string; // ISO date
  /** Optional real image path, e.g. "/gallery/bruges-canal.webp". */
  src?: string;
  /** Aspect ratio used for the masonry tile placeholder. */
  ratio: "portrait" | "landscape" | "square";
  accent: GalleryAccent;
  /** Position in the grid; populated from the DB for admin editing. */
  sortOrder?: number;
}

export const gallery: GalleryItem[] = [
  {
    id: "dhaka-rooftop",
    title: "Rooftop Transistors",
    location: "Old Dhaka",
    country: "Bangladesh",
    captureDate: "2019-08-12",
    ratio: "portrait",
    accent: "electric",
  },
  {
    id: "grand-place",
    title: "Grand Place at Dusk",
    location: "Brussels",
    country: "Belgium",
    captureDate: "2023-11-03",
    ratio: "landscape",
    accent: "horizon",
  },
  {
    id: "mechelen-market",
    title: "Market Portraits",
    location: "Mechelen",
    country: "Belgium",
    captureDate: "2024-04-21",
    ratio: "square",
    accent: "midnight",
  },
  {
    id: "bruges-canal",
    title: "Canal Reflections",
    location: "Bruges",
    country: "Belgium",
    captureDate: "2024-06-09",
    ratio: "portrait",
    accent: "horizon",
  },
  {
    id: "cox-bazar",
    title: "The Longest Beach",
    location: "Cox's Bazar",
    country: "Bangladesh",
    captureDate: "2021-01-17",
    ratio: "landscape",
    accent: "electric",
  },
  {
    id: "antwerp-station",
    title: "Cathedral of Rails",
    location: "Antwerp",
    country: "Belgium",
    captureDate: "2024-02-14",
    ratio: "portrait",
    accent: "midnight",
  },
  {
    id: "sundarbans",
    title: "Into the Mangroves",
    location: "Sundarbans",
    country: "Bangladesh",
    captureDate: "2020-12-05",
    ratio: "square",
    accent: "horizon",
  },
  {
    id: "ghent-lights",
    title: "River Lights",
    location: "Ghent",
    country: "Belgium",
    captureDate: "2024-09-28",
    ratio: "landscape",
    accent: "electric",
  },
];

export function getGallery(): GalleryItem[] {
  return gallery;
}
