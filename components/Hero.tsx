"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { SiteConfig } from "@/lib/site";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero({ site }: { site: SiteConfig }) {
  return (
    <section className="relative overflow-hidden bg-midnight text-slate-canvas">
      {/* Ambient glow + grid */}
      <div className="pointer-events-none absolute inset-0 bg-grid-fade" />
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-electric/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-horizon/20 blur-3xl" />

      <div className="container-page relative flex min-h-[88vh] flex-col justify-center py-24">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-horizon"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-horizon" />
            {site.role} · Age {site.age}
          </motion.p>

          <motion.h1
            variants={item}
            className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-electric via-horizon to-electric bg-clip-text text-transparent">
              {site.name}
            </span>
            <span className="text-horizon">.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-canvas/75 sm:text-xl"
          >
            An <span className="font-semibold text-white">Everything-Holic</span>{" "}
            problem solver. My philosophy is simple:{" "}
            <span className="italic text-horizon">
              &ldquo;{site.tagline}&rdquo;
            </span>
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
            <Link href="/story" className="btn-primary">
              Follow the journey
              <span aria-hidden>→</span>
            </Link>
            <Link href="/gallery" className="btn-ghost !border-white/20 !bg-white/5 !text-slate-canvas hover:!text-horizon">
              View the gallery
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
