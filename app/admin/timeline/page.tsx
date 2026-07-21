import { getMilestoneRecords, getMilestones, type MilestoneRecord } from "@/lib/content";
import { hasDb } from "@/lib/db";
import { saveMilestoneAction, deleteMilestoneAction } from "@/app/admin/actions";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { SavedBanner } from "@/components/admin/SavedBanner";

export const dynamic = "force-dynamic";

const inputCls =
  "w-full rounded-lg border border-midnight/15 bg-white px-3 py-2 text-sm outline-none focus:border-electric";

function MilestoneForm({ m }: { m?: MilestoneRecord }) {
  const isNew = !m;
  return (
    <form action={saveMilestoneAction} className="card grid gap-3 sm:grid-cols-2">
      {m && <input type="hidden" name="id" value={m.id} />}
      <div>
        <label className="mb-1.5 block text-sm font-medium">Year / label</label>
        <input name="year" defaultValue={m?.year} placeholder="2022 or Now" className={inputCls} />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Sort order</label>
        <input name="sortOrder" type="number" defaultValue={m?.sortOrder ?? 0} className={inputCls} />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Title</label>
        <input name="title" defaultValue={m?.title} className={inputCls} />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Place</label>
        <input name="place" defaultValue={m?.place} className={inputCls} />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Flag / emoji</label>
        <input name="flag" defaultValue={m?.flag} placeholder="🇧🇩" className={inputCls} />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Accent</label>
        <select name="accent" defaultValue={m?.accent ?? "electric"} className={inputCls}>
          <option value="electric">electric</option>
          <option value="horizon">horizon</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1.5 block text-sm font-medium">Body</label>
        <textarea name="body" defaultValue={m?.body} rows={3} className={inputCls} />
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1.5 block text-sm font-medium">Tags (comma separated)</label>
        <input name="tags" defaultValue={m?.tags.join(", ")} className={inputCls} />
      </div>
      <div className="sm:col-span-2">
        <SubmitButton disabled={!hasDb()}>
          {isNew ? "Add milestone" : "Save"}
        </SubmitButton>
      </div>
    </form>
  );
}

export default async function AdminTimelinePage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  let records = await getMilestoneRecords();
  if (records.length === 0) {
    const defaults = await getMilestones();
    records = defaults.map((m, i) => ({ ...m, id: `milestone-${i}`, sortOrder: i }));
  }

  return (
    <div className="space-y-8">
      <SavedBanner searchParams={searchParams} />
      <div>
        <h1 className="text-2xl font-bold">Story timeline</h1>
        <p className="mt-1 text-sm text-midnight/55">
          The milestones shown on the <code>/story</code> page, ordered by sort order.
        </p>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-electric">
          Add a milestone
        </h2>
        <MilestoneForm />
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-electric">
          Milestones ({records.length})
        </h2>
        {records.map((m) => (
          <div key={m.id} className="space-y-2">
            <MilestoneForm m={m} />
            <form action={deleteMilestoneAction}>
              <input type="hidden" name="id" value={m.id} />
              <SubmitButton variant="danger" disabled={!hasDb()}>
                Delete “{m.title}”
              </SubmitButton>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
