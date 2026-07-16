"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/**
 * Scroll-driven 3D reveal: sections swing up from a slight perspective tilt
 * as they enter the viewport, tied directly to scroll position (not a
 * one-shot trigger), which gives the page its "3D scrollable" feel.
 * Transform/opacity only — no layout work per frame.
 */
export function ScrollScene({
  children,
  className = "",
  tilt = 14,
}: {
  children: ReactNode;
  className?: string;
  /** Entry tilt in degrees. */
  tilt?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.98", "start 0.5"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [tilt, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [64, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.965, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.25, 1]);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        y,
        scale,
        opacity,
        transformPerspective: 1200,
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
