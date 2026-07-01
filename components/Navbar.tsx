"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { nav, site } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-midnight/10 bg-slate-canvas/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2 font-bold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-midnight text-sm text-horizon transition-transform group-hover:scale-105">
            M
          </span>
          <span className="tracking-tight">{site.shortName}</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "text-electric"
                      : "text-midnight/70 hover:text-midnight"
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-electric/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link href="/contact" className="btn-primary hidden md:inline-flex">
          Let&apos;s talk
        </Link>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-midnight/10 md:hidden"
        >
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-5 bg-midnight transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-midnight transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-midnight transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-midnight/10 bg-slate-canvas md:hidden"
          >
            <ul className="container-page flex flex-col gap-1 py-4">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-lg px-4 py-3 text-base font-medium text-midnight/80 hover:bg-electric/10 hover:text-electric"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/contact" className="btn-primary w-full">
                  Let&apos;s talk
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
