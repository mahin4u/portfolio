import { getGalleryItems } from "@/lib/content";
import { hasDb } from "@/lib/db";
import { ImageField } from "@/components/admin/ImageField";
import { saveGalleryAction, deleteGalleryAction } from "@/app/admin/actions";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { SavedBanner } from "@/components/admin/SavedBanner";
import type { GalleryItem } from "@/lib/gallery";

export const dynamic = "force-dynamic";

const inputCls =
  "w-full rounded-lg border border-midnight/15 bg-white px-3 py-2 text-sm outline-none focus:border-electric";

function ItemForm({ item }: { item?: GalleryItem }) {
  const isNew = !item;
  return (
    <form
      action={saveGalleryAction}
      className="card grid gap-3 sm:grid-cols-2"
    >
      {item && <input type="hidden" name="id" value={item.id} />}
      <div className="sm:col-span-2">
        <label className="mb-1.5 block text-sm font-medium">Title</label>
        <input name="title" defaultValue={item?.title} placeholder="Photo title" className={inputCls} />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Location</label>
        <input name="location" defaultValue={item?.location} className={inputCls} />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Country</label>
        <input name="country" defaultValue={item?.country} className={inputCls} />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Capture date</label>
        <input name="captureDate" type="date" defaultValue={item?.captureDate} className={inputCls} />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Sort order</label>
        <input
          name="sortOrder"
          type="number"
          defaultValue={item?.sortOrder ?? 0}
          className={inputCls}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Shape</label>
        <select name="ratio" defaultValue={item?.ratio ?? "landscape"} className={inputCls}>
          <option value="landscape">landscape</option>
          <option value="portrait">portrait</option>
          <option value="square">square</option>
        </select>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Placeholder accent</label>
        <select name="accent" defaultValue={item?.accent ?? "electric"} className={inputCls}>
          <option value="electric">electric</option>
          <option value="horizon">horizon</option>
          <option value="midnight">midnight</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1.5 block text-sm font-medium">Image</label>
        <ImageField defaultValue={item?.src ?? ""} />
      </div>
      <div className="sm:col-span-2 flex items-center gap-3">
        <SubmitButton disabled={!hasDb()}>
          {isNew ? "Add photo" : "Save"}
        </SubmitButton>
      </div>
    </form>
  );
}

export default async function AdminGalleryPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const items = await getGalleryItems();

  return (
    <div className="space-y-8">
      <SavedBanner searchParams={searchParams} />
      <div>
        <h1 className="text-2xl font-bold">Gallery</h1>
        <p className="mt-1 text-sm text-midnight/55">
          Add, edit or remove photos. Upload a file or paste a hosted image URL.
        </p>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-electric">
          Add a photo
        </h2>
        <ItemForm />
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-electric">
          Existing photos ({items.length})
        </h2>
        {items.map((item) => (
          <div key={item.id} className="space-y-2">
            <ItemForm item={item} />
            <form action={deleteGalleryAction}>
              <input type="hidden" name="id" value={item.id} />
              <SubmitButton variant="danger" disabled={!hasDb()}>
                Delete “{item.title}”
              </SubmitButton>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
