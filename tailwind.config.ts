import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // "The Navigator's Blue" — tailored monochromatic-analogous blue palette.
        midnight: {
          DEFAULT: "#0B132B", // Primary Base (Dark) — deep tech roots
          800: "#111a3a",
          700: "#1a2547",
          600: "#243156",
        },
        slate: {
          canvas: "#F4F7FC", // Secondary Base (Light) — clean readable canvas
        },
        electric: {
          DEFAULT: "#3A86FF", // Primary Accent — curiosity, CTAs, active states
          600: "#2f6fe0",
          400: "#5c9bff",
        },
        horizon: {
          DEFAULT: "#4CC9F0", // Secondary Accent — travel/creative cyan
          600: "#33b6e0",
          400: "#7dd8f5",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(58,134,255,0.25), 0 8px 30px rgba(58,134,255,0.15)",
        "glow-cyan": "0 0 0 1px rgba(76,201,240,0.25), 0 8px 30px rgba(76,201,240,0.15)",
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(circle at 50% 0%, rgba(58,134,255,0.12), transparent 55%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease forwards",
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
