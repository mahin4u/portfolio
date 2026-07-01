import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts and market musings from Mohim Mahdi Hassan on supply chain, trading, systems and curiosity.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container-page py-16 sm:py-24">
      <Reveal>
        <p className="eyebrow mb-3">Thoughts & market musings</p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Blog</h1>
        <p className="mt-4 max-w-2xl text-midnight/70">
          Notes on systems thinking, the markets, supply chains and the art of
          staying curious.
        </p>
      </Reveal>

      {posts.length === 0 ? (
        <p className="mt-16 text-midnight/50">
          No posts yet — add a <code>.mdx</code> file in{" "}
          <code>content/blog</code> to get started.
        </p>
      ) : (
        <div className="mt-12 space-y-4">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.06}>
              <Link
                href={`/blog/${post.slug}`}
                className="card group flex flex-col gap-3 hover:-translate-y-1 hover:shadow-glow sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-electric">
                    {post.category}
                  </span>
                  <h2 className="mt-2 text-xl font-bold transition-colors group-hover:text-electric">
                    {post.title}
                  </h2>
                  <p className="mt-1 text-sm text-midnight/60">{post.excerpt}</p>
                </div>
                <div className="shrink-0 text-left text-xs text-midnight/50 sm:text-right">
                  <p>
                    {new Date(post.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p className="mt-1">{post.readingTime}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
