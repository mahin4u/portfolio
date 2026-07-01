import type { Metadata } from "next";
import { Timeline } from "@/components/Timeline";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "The Story",
  description:
    "The journey of Mohim Mahdi Hassan — from transistors in Bangladesh to stock trading in Belgium.",
};

export default function StoryPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-midnight text-slate-canvas">
        <div className="pointer-events-none absolute inset-0 bg-grid-fade" />
        <div className="container-page relative py-20 sm:py-28">
          <Reveal>
            <p className="eyebrow mb-3 text-horizon">The Story</p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
              A journey powered by three words: Why? What? How?
            </h1>
            <p className="mt-5 max-w-2xl text-slate-canvas/70">
              Scroll to trace the milestones — a seamless transition from
              curiosity in Bangladesh to systems thinking in Belgium.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="container-page py-20 sm:py-28">
        <Timeline />
      </div>
    </>
  );
}
