import type { Metadata } from "next";
import Link from "next/link";
import { isAuthenticated } from "@/lib/session";
import { hasDb } from "@/lib/db";
import { LogoutButton } from "@/components/admin/LogoutButton";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const links = [
  { href: "/admin", label: "Site settings" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/timeline", label: "Timeline" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAuthenticated();

  // Login page (unauthenticated) renders without the admin shell.
  if (!authed) {
    return <div className="min-h-screen bg-slate-canvas">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-canvas">
      <header className="border-b border-midnight/10 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-bold">
              Admin<span className="text-electric">.</span>
            </Link>
            <nav className="hidden gap-1 sm:flex">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-midnight/70 transition-colors hover:bg-electric/10 hover:text-electric"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-sm text-midnight/60 hover:text-electric"
              target="_blank"
            >
              View site ↗
            </Link>
            <LogoutButton />
          </div>
        </div>
        {/* Mobile nav */}
        <nav className="flex gap-1 overflow-x-auto px-5 pb-3 sm:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium text-midnight/70 hover:bg-electric/10 hover:text-electric"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </header>

      {!hasDb() && (
        <div className="border-b border-amber-300 bg-amber-50 px-5 py-3 text-center text-sm text-amber-800">
          ⚠️ No database connected. Set <code>DATABASE_URL</code> (Neon) to save
          changes — edits won&apos;t persist until then.
        </div>
      )}

      <main className="mx-auto max-w-6xl px-5 py-10">{children}</main>
    </div>
  );
}
