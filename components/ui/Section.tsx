import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Adds the dark midnight background variant. */
  dark?: boolean;
}

export function Section({ children, id, className = "", dark }: SectionProps) {
  return (
    <section
      id={id}
      className={`${dark ? "bg-midnight text-slate-canvas" : ""} py-20 sm:py-28 ${className}`}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed opacity-70">{subtitle}</p>
      )}
    </div>
  );
}
