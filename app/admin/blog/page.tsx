import { getPosts, getPost } from "@/lib/content";
import { hasDb } from "@/lib/db";
import { savePostAction, deletePostAction } from "@/app/admin/actions";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { SavedBanner } from "@/components/admin/SavedBanner";
import type { BlogPost } from "@/lib/blog";

export const dynamic = "force-dynamic";

const inputCls =
  "w-full rounded-lg border border-midnight/15 bg-white px-3 py-2 text-sm outline-none focus:border-electric";

function PostForm({ post }: { post?: BlogPost & { published?: boolean } }) {
  const isNew = !post;
  return (
    <form action={savePostAction} className="card space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Title</label>
          <input name="title" defaultValue={post?.title} placeholder="Post title" className={inputCls} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">
            Slug {isNew && <span className="text-midnight/40">(auto from title if blank)</span>}
          </label>
          <input
            name="slug"
            defaultValue={post?.slug}
            readOnly={!isNew}
            placeholder="my-post"
            className={`${inputCls} ${!isNew ? "bg-midnight/5" : ""}`}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Date</label>
          <input name="date" type="date" defaultValue={post?.date} className={inputCls} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Category</label>
          <input name="category" defaultValue={post?.category ?? "General"} className={inputCls} />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Excerpt</label>
        <textarea name="excerpt" defaultValue={post?.excerpt} rows={2} className={inputCls} />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Content (Markdown / MDX)</label>
        <textarea
          name="content"
          defaultValue={post?.content}
          rows={12}
          placeholder="## Heading&#10;&#10;Write your post in Markdown…"
          className={`${inputCls} font-mono`}
        />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={post?.published ?? true} />
        Published
      </label>
      <div>
        <SubmitButton disabled={!hasDb()}>
          {isNew ? "Create post" : "Save post"}
        </SubmitButton>
      </div>
    </form>
  );
}

export default async function AdminBlogPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const metas = await getPosts(true);
  const posts = (await Promise.all(metas.map((m) => getPost(m.slug)))).filter(
    (p): p is BlogPost => p !== null
  );

  return (
    <div className="space-y-8">
      <SavedBanner searchParams={searchParams} />
      <div>
        <h1 className="text-2xl font-bold">Blog</h1>
        <p className="mt-1 text-sm text-midnight/55">
          Write posts in Markdown. They render at <code>/blog/&lt;slug&gt;</code>.
        </p>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-electric">
          New post
        </h2>
        <PostForm />
      </div>

      <div className="space-y-6">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-electric">
          Existing posts ({posts.length})
        </h2>
        {posts.map((post) => (
          <div key={post.slug} className="space-y-2">
            <PostForm post={post} />
            <form action={deletePostAction}>
              <input type="hidden" name="slug" value={post.slug} />
              <SubmitButton variant="danger" disabled={!hasDb()}>
                Delete “{post.title}”
              </SubmitButton>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
