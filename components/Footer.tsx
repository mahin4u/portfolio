import Link from "next/link";
import { nav, type SiteConfig } from "@/lib/site";

export function Footer({ site }: { site: SiteConfig }) {
  return (
    <footer className="bg-midnight text-slate-canvas">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="text-lg font-bold">{site.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-canvas/70">
            {site.tagline}
          </p>
          <p className="mt-4 text-sm text-horizon">{site.location}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-canvas/50">
            Explore
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-slate-canvas/80 transition-colors hover:text-horizon"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-canvas/50">
            Connect
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="text-slate-canvas/80 transition-colors hover:text-horizon"
              >
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-canvas/80 transition-colors hover:text-horizon"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-canvas/80 transition-colors hover:text-horizon"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-canvas/80 transition-colors hover:text-horizon"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-slate-canvas/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Built with Next.js · Deployed on Netlify</p>
        </div>
      </div>
    </footer>
  );
}
