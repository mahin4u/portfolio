import Link from "next/link";
import { Hero } from "@/components/Hero";
import { FocusCards } from "@/components/FocusCards";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { getSiteConfig, getGalleryItems, getPosts } from "@/lib/content";
import { GalleryTile } from "@/components/GalleryTile";

// Revalidate periodically so admin edits appear (ISR); admin saves also
// trigger on-demand revalidation via revalidatePath.
export const revalidate = 60;

export default async function HomePage() {
  const [site, gallery, posts] = await Promise.all([
    getSiteConfig(),
    getGalleryItems(),
    getPosts(),
  ]);
  const latestPosts = posts.slice(0, 2);
  const previewShots = gallery.slice(0, 4);

  return (
    <>
      <Hero site={site} />

      {/* Current focuses */}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Where my energy goes"
            title="Two engines, one system"
            subtitle="Everything I build connects — the same curiosity that took apart transistors now reads markets and moves goods across the globe."
          />
        </Reveal>
        <div className="mt-12">
          <FocusCards focuses={site.focuses} />
        </div>
      </Section>

      {/* Story teaser */}
      <Section dark className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-electric/10 blur-3xl" />
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <p className="eyebrow mb-3 text-horizon">The Story</p>
              <h2 className="text-3xl font-bold sm:text-4xl">
                From transistors in Bangladesh to trading floors in Belgium.
              </h2>
              <p className="mt-4 text-slate-canvas/70">
                A journey powered by three words — Why? What? How? Follow the
                milestones that shaped an Everything-Holic.
              </p>
              <Link href="/story" className="btn-cyan mt-8">
                Explore the timeline →
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="space-y-4">
              {[
                ["🇧🇩", "Curiosity, arts & the camera"],
                ["🇧🇪", "Supply chain & Blink Media"],
                ["📈", "Full-time stock trading"],
              ].map(([flag, label]) => (
                <li
                  key={label}
                  className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-5 py-4"
                >
                  <span className="text-2xl">{flag}</span>
                  <span className="font-medium text-slate-canvas/90">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Gallery preview */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <SectionHeading
              eyebrow="Through the lens"
              title="Travel & portrait photography"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/gallery" className="btn-ghost">
              See full gallery →
            </Link>
          </Reveal>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {previewShots.map((shot, i) => (
            <Reveal key={shot.id} delay={i * 0.08}>
              <GalleryTile item={shot} compact />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Blog preview */}
      {latestPosts.length > 0 && (
        <Section dark>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Reveal>
              <SectionHeading eyebrow="Latest thinking" title="From the blog" />
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                href="/blog"
                className="btn-ghost !border-white/20 !bg-white/5 !text-slate-canvas hover:!text-horizon"
              >
                Read all posts →
              </Link>
            </Reveal>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {latestPosts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.1}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block h-full rounded-2xl border border-white/10 bg-white/5 p-7 transition-all hover:border-horizon/40 hover:bg-white/10"
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-horizon">
                    {post.category}
                  </span>
                  <h3 className="mt-3 text-xl font-bold transition-colors group-hover:text-horizon">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-canvas/70">
                    {post.excerpt}
                  </p>
                  <p className="mt-5 text-xs text-slate-canvas/50">
                    {new Date(post.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    · {post.readingTime}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* CTA */}
      <Section>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-electric to-electric-600 px-8 py-16 text-center text-white sm:px-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-horizon/30 blur-3xl" />
            <h2 className="relative mx-auto max-w-2xl text-3xl font-bold sm:text-4xl">
              Let&apos;s make the world a little bigger — together.
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-white/85">
              Whether it&apos;s supply chain, markets, a photo project or a
              conversation about curiosity — I&apos;m one message away.
            </p>
            <Link
              href="/contact"
              className="btn mt-8 bg-white text-electric hover:bg-slate-canvas"
            >
              Start a conversation
            </Link>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
