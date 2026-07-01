import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";

interface Params {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export default function BlogPostPage({ params }: Params) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article className="container-page py-16 sm:py-24">
      <Link
        href="/blog"
        className="text-sm font-medium text-electric hover:underline"
      >
        ← Back to blog
      </Link>

      <header className="mt-6 max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-electric">
          {post.category}
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-sm text-midnight/50">
          {new Date(post.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}{" "}
          · {post.readingTime}
        </p>
      </header>

      <div className="prose prose-slate mt-10 max-w-3xl prose-headings:font-bold prose-a:text-electric prose-a:no-underline hover:prose-a:underline prose-strong:text-midnight">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
