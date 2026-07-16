"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import type { SiteConfig } from "@/lib/site";
import { Starfield } from "@/components/fx/Starfield";

/* ------------------------------------------------------------------ */
/*  Floating "facets" — the sides of an Everything-Holic, placed in    */
/*  3D space around the name and parallaxed against the mouse.        */
/* ------------------------------------------------------------------ */

interface Facet {
  icon: string;
  label: string;
  x: string; // left offset
  y: string; // top offset
  depth: number; // 0..1 — how close to the viewer (more = moves more)
  delay: number;
  mobile?: boolean; // shown on small screens too
}

// Mobile-visible chips live in the empty band above the headline so they
// never collide with text on narrow screens; the rest are desktop-only.
const FACETS: Facet[] = [
  { icon: "📈", label: "Trading", x: "64%", y: "13%", depth: 0.9, delay: 0.9, mobile: true },
  { icon: "📷", label: "Photography", x: "6%", y: "18%", depth: 0.7, delay: 1.05, mobile: true },
  { icon: "🧭", label: "Supply Chain", x: "28%", y: "7%", depth: 0.55, delay: 1.2, mobile: true },
  { icon: "🎨", label: "Arts", x: "12%", y: "72%", depth: 0.8, delay: 1.35 },
  { icon: "⚡", label: "Why? What? How?", x: "70%", y: "64%", depth: 0.45, delay: 1.5 },
  { icon: "🌍", label: "Travel", x: "34%", y: "84%", depth: 0.6, delay: 1.65 },
];

function FacetChip({
  facet,
  mx,
  my,
}: {
  facet: Facet;
  mx: MotionValue<number>;
  my: MotionValue<number>;
}) {
  // Deeper (closer) chips drift further against the cursor → parallax depth.
  const x = useTransform(mx, [-0.5, 0.5], [28 * facet.depth, -28 * facet.depth]);
  const y = useTransform(my, [-0.5, 0.5], [20 * facet.depth, -20 * facet.depth]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: facet.delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        left: facet.x,
        top: facet.y,
        x,
        y,
        z: 60 * facet.depth,
      }}
      className={`absolute ${facet.mobile ? "flex" : "hidden md:flex"}`}
    >
      <div
        className="animate-float flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-xs font-medium text-slate-canvas/85 shadow-[0_0_24px_rgba(58,134,255,0.12)] backdrop-blur-md"
        style={{ animationDelay: `${facet.delay}s` }}
      >
        <span className="text-base leading-none">{facet.icon}</span>
        {facet.label}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                              */
/* ------------------------------------------------------------------ */

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero({ site }: { site: SiteConfig }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse parallax (springed; inert on touch / reduced motion).
  const mxRaw = useMotionValue(0);
  const myRaw = useMotionValue(0);
  const mx = useSpring(mxRaw, { stiffness: 60, damping: 18 });
  const my = useSpring(myRaw, { stiffness: 60, damping: 18 });
  const rotateY = useTransform(mx, [-0.5, 0.5], [-5, 5]);
  const rotateX = useTransform(my, [-0.5, 0.5], [4, -4]);

  // Scroll exit — the whole stage recedes into depth as you scroll away.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const exitScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const exitY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const exitOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const exitRotateX = useTransform(scrollYProgress, [0, 1], [0, 9]);
  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -110]);

  function onPointerMove(e: React.PointerEvent<HTMLElement>) {
    if (reduce || e.pointerType === "touch") return;
    const rect = e.currentTarget.getBoundingClientRect();
    mxRaw.set((e.clientX - rect.left) / rect.width - 0.5);
    myRaw.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onPointerLeave() {
    mxRaw.set(0);
    myRaw.set(0);
  }

  return (
    <section
      ref={sectionRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative overflow-hidden bg-midnight text-slate-canvas"
    >
      {/* Sky */}
      <Starfield />

      {/* Aurora orbs — parallax at different scroll speeds for depth. */}
      <motion.div
        style={reduce ? undefined : { y: orbY1 }}
        className="pointer-events-none absolute -left-44 top-8 h-[28rem] w-[28rem] rounded-full bg-electric/20 blur-3xl"
      />
      <motion.div
        style={reduce ? undefined : { y: orbY2 }}
        className="pointer-events-none absolute -right-44 bottom-0 h-[26rem] w-[26rem] rounded-full bg-horizon/15 blur-3xl"
      />

      {/* Perspective grid floor */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 overflow-hidden opacity-70">
        <div className="grid-floor absolute inset-0" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-grid-fade" />

      {/* 3D stage */}
      <motion.div
        style={
          reduce
            ? undefined
            : {
                scale: exitScale,
                y: exitY,
                opacity: exitOpacity,
                rotateX: exitRotateX,
                transformPerspective: 1400,
              }
        }
        className="relative will-change-transform"
      >
        <div style={{ perspective: 1200 }}>
          <motion.div
            style={
              reduce
                ? undefined
                : { rotateX, rotateY, transformStyle: "preserve-3d" }
            }
            className="container-page relative flex min-h-[100svh] flex-col justify-center py-24"
          >
            {/* Floating facets live in the same 3D context. */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{ transformStyle: "preserve-3d" }}
            >
              {FACETS.map((f) => (
                <FacetChip key={f.label} facet={f} mx={mx} my={my} />
              ))}
            </div>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.p
                variants={item}
                style={{ transform: "translateZ(30px)" }}
                className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-horizon backdrop-blur-sm"
              >
                <span className="h-2 w-2 animate-pulse rounded-full bg-horizon" />
                {site.role} · Age {site.age}
              </motion.p>

              <motion.h1
                variants={item}
                style={{ transform: "translateZ(55px)" }}
                className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight drop-shadow-[0_8px_40px_rgba(58,134,255,0.25)] sm:text-6xl lg:text-7xl"
              >
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-electric via-horizon to-electric bg-clip-text text-transparent">
                  {site.name}
                </span>
                <span className="text-horizon">.</span>
              </motion.h1>

              <motion.p
                variants={item}
                style={{ transform: "translateZ(40px)" }}
                className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-canvas/75 sm:text-xl"
              >
                An <span className="font-semibold text-white">Everything-Holic</span>{" "}
                problem solver. My philosophy is simple:{" "}
                <span className="italic text-horizon">
                  &ldquo;{site.tagline}&rdquo;
                </span>
              </motion.p>

              <motion.div
                variants={item}
                style={{ transform: "translateZ(45px)" }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <Link href="/story" className="btn-primary">
                  Follow the journey
                  <span aria-hidden>→</span>
                </Link>
                <Link
                  href="/gallery"
                  className="btn-ghost !border-white/20 !bg-white/5 !text-slate-canvas hover:!text-horizon"
                >
                  View the gallery
                </Link>
              </motion.div>
            </motion.div>

            {/* Scroll cue */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <div className="flex h-9 w-6 items-start justify-center rounded-full border border-white/25 p-1.5">
                <motion.span
                  animate={reduce ? undefined : { y: [0, 10, 0], opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="h-1.5 w-1.5 rounded-full bg-horizon"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
