"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number; // 0..1 depth — controls size, speed and brightness
  r: number;
  tw: number; // twinkle phase
  vx: number;
  vy: number;
}

/**
 * "The Navigator's sky" — a lightweight 2D-canvas starfield with faint
 * constellation lines. Performance guardrails:
 *  - particle count scales with area (capped),
 *  - devicePixelRatio capped at 2,
 *  - rAF loop pauses when the tab is hidden or the canvas leaves the viewport,
 *  - prefers-reduced-motion renders a single static frame.
 */
export function Starfield({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    let stars: Star[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let inView = true;

    const seed = () => {
      const count = Math.min(130, Math.max(40, Math.floor((w * h) / 16000)));
      stars = Array.from({ length: count }, () => {
        const z = Math.random();
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          r: 0.5 + z * 1.4,
          tw: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * (0.06 + z * 0.1),
          vy: (Math.random() - 0.5) * (0.06 + z * 0.1),
        };
      });
    };

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * DPR);
      canvas.height = Math.floor(h * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      seed();
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      // Constellation lines between nearby bright stars.
      const LINK = 110;
      ctx.lineWidth = 0.6;
      for (let i = 0; i < stars.length; i++) {
        const a = stars[i];
        if (a.z < 0.45) continue;
        for (let j = i + 1; j < stars.length; j++) {
          const b = stars[j];
          if (b.z < 0.45) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const alpha = (1 - Math.sqrt(d2) / LINK) * 0.14;
            ctx.strokeStyle = `rgba(76, 201, 240, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Stars with gentle twinkle + drift.
      for (const s of stars) {
        const twinkle = 0.55 + 0.45 * Math.sin(t * 0.0012 + s.tw);
        const alpha = (0.25 + s.z * 0.65) * twinkle;
        ctx.fillStyle =
          s.z > 0.8
            ? `rgba(76, 201, 240, ${alpha})`
            : `rgba(244, 247, 252, ${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        s.x += s.vx;
        s.y += s.vy;
        if (s.x < -4) s.x = w + 4;
        if (s.x > w + 4) s.x = -4;
        if (s.y < -4) s.y = h + 4;
        if (s.y > h + 4) s.y = -4;
      }
    };

    const loop = (t: number) => {
      if (visible && inView) draw(t);
      raf = requestAnimationFrame(loop);
    };

    resize();

    if (reduce) {
      // Static sky — no animation loop at all.
      draw(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const onVis = () => {
      visible = document.visibilityState === "visible";
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(0);
    });
    ro.observe(canvas);

    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    />
  );
}
