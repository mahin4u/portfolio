"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/site";

function Icon({ name }: { name: string }) {
  if (name === "chart") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path
          d="M4 20V10M10 20V4M16 20v-6M22 20H2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  // route
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
      <path
        d="M6 19a3 3 0 1 0 0-6h9a3 3 0 1 0 0-6H6M6 5H4m2 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm12 16a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FocusCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {site.focuses.map((focus, i) => {
        const isElectric = focus.accent === "electric";
        return (
          <motion.div
            key={focus.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="card group relative overflow-hidden"
          >
            <div
              className={`absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl transition-opacity duration-300 ${
                isElectric ? "bg-electric/15" : "bg-horizon/20"
              } opacity-60 group-hover:opacity-100`}
            />
            <div
              className={`relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${
                isElectric
                  ? "bg-electric/10 text-electric"
                  : "bg-horizon/10 text-horizon-600"
              }`}
            >
              <Icon name={focus.icon} />
            </div>
            <h3 className="relative text-xl font-bold">{focus.title}</h3>
            <p className="relative mt-2 text-sm leading-relaxed text-midnight/70">
              {focus.description}
            </p>
            <span
              className={`relative mt-5 inline-block h-1 w-12 rounded-full ${
                isElectric ? "bg-electric" : "bg-horizon"
              }`}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
