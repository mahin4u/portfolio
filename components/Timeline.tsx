"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import type { Milestone } from "@/lib/story";

export function Timeline({ milestones }: { milestones: Milestone[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 30%", "end 70%"],
  });
  // Smooth the progress that drives the vertical fill line.
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={ref} className="relative mx-auto max-w-3xl">
      {/* Track */}
      <div className="absolute left-4 top-0 h-full w-px bg-midnight/10 md:left-1/2 md:-translate-x-1/2" />
      {/* Animated fill */}
      <motion.div
        style={{ scaleY }}
        className="absolute left-4 top-0 h-full w-px origin-top bg-gradient-to-b from-electric via-horizon to-electric md:left-1/2 md:-translate-x-1/2"
      />

      <ul className="space-y-12">
        {milestones.map((m, i) => {
          const left = i % 2 === 0;
          return (
            <li key={m.title} className="relative">
              {/* Node */}
              <span
                className={`absolute left-4 top-2 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full ring-4 ring-slate-canvas md:left-1/2 ${
                  m.accent === "electric" ? "bg-electric" : "bg-horizon"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>

              <motion.div
                initial={{ opacity: 0, x: left ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`ml-10 md:ml-0 md:w-[calc(50%-2.5rem)] ${
                  left ? "md:mr-auto md:pr-10 md:text-right" : "md:ml-auto md:pl-10"
                }`}
              >
                <div className="card hover:shadow-glow">
                  <div
                    className={`flex items-center gap-2 ${left ? "md:justify-end" : ""}`}
                  >
                    <span className="text-lg">{m.flag}</span>
                    <span
                      className={`text-sm font-bold ${
                        m.accent === "electric" ? "text-electric" : "text-horizon-600"
                      }`}
                    >
                      {m.year}
                    </span>
                    <span className="text-xs text-midnight/40">· {m.place}</span>
                  </div>
                  <h3 className="mt-2 text-xl font-bold">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-midnight/70">
                    {m.body}
                  </p>
                  <div
                    className={`mt-4 flex flex-wrap gap-2 ${left ? "md:justify-end" : ""}`}
                  >
                    {m.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-midnight/5 px-3 py-1 text-xs font-medium text-midnight/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
