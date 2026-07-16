"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/**
 * Artistic scroll interlude: the three questions that drive Mahin drift in
 * opposite directions on scroll, on a slightly tilted 3D plane. Pure
 * transform parallax — cheap and smooth.
 */
export function WhyWhatHow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [-120, 120]);
  const x2 = useTransform(scrollYProgress, [0, 1], [140, -140]);
  const x3 = useTransform(scrollYProgress, [0, 1], [-100, 160]);
  const planeRotate = useTransform(scrollYProgress, [0, 0.5, 1], [7, 0, -7]);

  const rows = [
    { word: "WHY?", x: x1, cls: "text-outline-cyan" },
    { word: "WHAT?", x: x2, cls: "text-slate-canvas" },
    { word: "HOW?", x: x3, cls: "text-outline-blue" },
  ];

  return (
    <div
      ref={ref}
      className="relative overflow-hidden bg-midnight py-20 sm:py-28"
      style={{ perspective: 1000 }}
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/10 blur-3xl" />

      <motion.div
        style={reduce ? undefined : { rotateX: planeRotate, transformStyle: "preserve-3d" }}
        className="will-change-transform"
      >
        {rows.map((row) => (
          <motion.p
            key={row.word}
            style={reduce ? undefined : { x: row.x }}
            className={`select-none whitespace-nowrap text-center text-6xl font-extrabold leading-[1.08] tracking-tight will-change-transform sm:text-8xl lg:text-9xl ${row.cls}`}
            aria-hidden
          >
            {row.word}
          </motion.p>
        ))}
      </motion.div>

      <p className="container-page relative mt-10 text-center text-sm text-slate-canvas/60">
        The three questions behind every pivot — from transistors to trading floors.
      </p>
    </div>
  );
}
