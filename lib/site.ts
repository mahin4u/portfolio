/**
 * Central site configuration. Update these values to personalize the portfolio
 * without touching any component code.
 */
export const site = {
  name: "Mohim Mahdi Hassan",
  shortName: "Mahdi",
  age: 22,
  role: "Everything-Holic · Problem Solver",
  tagline:
    "Together is better — making the world bigger, beautiful, and ensuring everyone has a right to smile.",
  description:
    "The portfolio of Mohim Mahdi Hassan — a curiosity-driven navigator working across Global Supply Chain and Stock Trading, with roots in arts, photography and technology.",
  url: "https://mahdi.example.com", // TODO: replace with the custom domain once mapped in Netlify.
  location: "Mechelen, Belgium",
  email: "asakashthereble@gmail.com",
  // WhatsApp Click-to-Chat — international format, digits only (no +, spaces or dashes).
  whatsapp: {
    number: "32000000000", // TODO: replace with Mahdi's real WhatsApp number.
    presetMessage: "Hi Mahdi! I found your portfolio and would love to connect.",
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
      accent: "electric" as const,
      icon: "route",
    },
    {
      title: "Stock Trading",
      description:
        "Full-time trading with a system-level lens: reading markets like machines, disciplined by data and probability.",
      accent: "horizon" as const,
      icon: "chart",
    },
  ],
} as const;

export type SiteConfig = typeof site;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/story", label: "The Story" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Connect" },
] as const;

/** Builds the wa.me deep link from the configured number + preset message. */
export function whatsappLink() {
  const { number, presetMessage } = site.whatsapp;
  return `https://wa.me/${number}?text=${encodeURIComponent(presetMessage)}`;
}
