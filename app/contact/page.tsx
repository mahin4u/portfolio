import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Connect",
  description:
    "Get in touch with Mohim Mahdi Hassan — supply chain, trading, photography or a conversation about curiosity.",
};

const projects = [
  {
    name: "Full-time Stock Trading",
    status: "Active",
    note: "Systems-driven discretionary trading.",
  },
  {
    name: "Global Supply Chain",
    status: "Studying · Building",
    note: "Cross-border logistics & operations.",
  },
  {
    name: "Blink Media",
    status: "Founder",
    note: "Branding & ops for local restaurants, Mechelen.",
  },
];

export default function ContactPage() {
  return (
    <div className="container-page py-16 sm:py-24">
      <Reveal>
        <p className="eyebrow mb-3">Let&apos;s connect</p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Connection terminal
        </h1>
        <p className="mt-4 max-w-2xl text-midnight/70">
          Whether it&apos;s a collaboration, a photo project, a market
          conversation, or simply saying hello — the fastest way to reach me is
          the WhatsApp button, or the form below.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-10 lg:grid-cols-5">
        {/* Form */}
        <Reveal className="lg:col-span-3">
          <div className="card">
            <h2 className="text-xl font-bold">Send a message</h2>
            <p className="mt-1 text-sm text-midnight/60">
              I read everything and reply personally.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </Reveal>

        {/* Sidebar */}
        <Reveal delay={0.12} className="lg:col-span-2">
          <div className="space-y-6">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="card group flex items-center justify-between hover:shadow-glow-cyan"
            >
              <div>
                <p className="font-semibold">Chat on WhatsApp</p>
                <p className="text-sm text-midnight/60">Fastest response</p>
              </div>
              <span className="text-2xl transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>

            <a
              href={`mailto:${site.email}`}
              className="card group flex items-center justify-between hover:shadow-glow"
            >
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-sm text-midnight/60">{site.email}</p>
              </div>
              <span className="text-2xl transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>

            <div className="card">
              <p className="text-xs font-semibold uppercase tracking-widest text-electric">
                Current projects
              </p>
              <ul className="mt-4 space-y-4">
                {projects.map((p) => (
                  <li key={p.name} className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">{p.name}</p>
                      <p className="text-xs text-midnight/55">{p.note}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-horizon/15 px-2.5 py-1 text-[11px] font-medium text-horizon-600">
                      {p.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="px-1 text-sm text-midnight/50">📍 {site.location}</p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
