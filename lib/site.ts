/**
 * Static site configuration — used as the seed + fallback for the CMS.
 * When the database is configured, values here are overridden by the
 * `settings` row (see lib/content.ts → getSiteConfig).
 */

export type Accent = "electric" | "horizon";

export interface Focus {
  title: string;
  description: string;
  accent: Accent;
  icon: string; // "route" | "chart"
}

export interface SiteConfig {
  name: string;
  shortName: string;
  age: number;
  role: string;
  tagline: string;
  description: string;
  url: string;
  location: string;
  email: string;
  whatsapp: {
    number: string; // international format, digits only
    presetMessage: string;
  };
  socials: {
    linkedin: string;
    instagram: string;
    github: string;
  };
  focuses: Focus[];
}

export const defaultSite: SiteConfig = {
  name: "Mahin Mahadi Hassan",
  shortName: "Mahin",
  age: 22,
  role: "Everything-Holic · Problem Solver",
  tagline:
    "Together is better — making the world bigger, beautiful, and ensuring everyone has a right to smile.",
  description:
    "The portfolio of Mahin Mahadi Hassan — a curiosity-driven navigator working across Global Supply Chain and Stock Trading, with roots in arts, photography and technology.",
  url: "https://mahinmahdi.com", // TODO: replace with the custom domain once mapped in Netlify.
  location: "Mechelen, Belgium",
  email: "mahination.be@gmail.com",
  whatsapp: {
    number: "32000000000", // TODO: replace with Mahin's real WhatsApp number.
    presetMessage: "Hi Mahin! I found your portfolio and would love to connect.",
  },
  socials: {
    linkedin: "https://www.linkedin.com/",
    instagram: "https://www.instagram.com/",
    github: "https://github.com/mahin4u",
  },
  focuses: [
    {
      title: "Global Supply Chain",
      description:
        "Mapping the movement of goods across borders — systems thinking applied to logistics, operations and trade.",
      accent: "electric",
      icon: "route",
    },
    {
      title: "Stock Trading",
      description:
        "Full-time trading with a system-level lens: reading markets like machines, disciplined by data and probability.",
      accent: "horizon",
      icon: "chart",
    },
  ],
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/story", label: "The Story" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Connect" },
] as const;

/** Builds a wa.me deep link from a site config's WhatsApp settings. */
export function whatsappLink(config: Pick<SiteConfig, "whatsapp">): string {
  const { number, presetMessage } = config.whatsapp;
  return `https://wa.me/${number}?text=${encodeURIComponent(presetMessage)}`;
}
