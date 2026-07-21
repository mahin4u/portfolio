import { getSiteConfig } from "@/lib/content";
import { hasDb } from "@/lib/db";
import { saveSiteAction, seedAction } from "@/app/admin/actions";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { SavedBanner } from "@/components/admin/SavedBanner";

export const dynamic = "force-dynamic";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1.5 block text-sm font-medium text-midnight/80">
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-lg border border-midnight/15 bg-white px-3 py-2 text-sm outline-none focus:border-electric";

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const site = await getSiteConfig();

  return (
    <div className="space-y-10">
      <SavedBanner searchParams={searchParams} />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Site settings</h1>
          <p className="mt-1 text-sm text-midnight/55">
            Core identity, philosophy, contact details and focus cards.
          </p>
        </div>
        {hasDb() && (
          <form action={seedAction}>
            <button
              type="submit"
              className="btn-ghost text-sm"
              title="Copy the current built-in content into the database so you can edit it."
            >
              Seed from defaults
            </button>
          </form>
        )}
      </div>

      <form action={saveSiteAction} className="space-y-8">
        {/* Identity */}
        <section className="card space-y-4">
          <h2 className="font-semibold">Identity</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Full name</Label>
              <input name="name" defaultValue={site.name} className={inputCls} />
            </div>
            <div>
              <Label>Short name (logo / nav)</Label>
              <input name="shortName" defaultValue={site.shortName} className={inputCls} />
            </div>
            <div>
              <Label>Age</Label>
              <input name="age" type="number" defaultValue={site.age} className={inputCls} />
            </div>
            <div>
              <Label>Role / headline</Label>
              <input name="role" defaultValue={site.role} className={inputCls} />
            </div>
          </div>
          <div>
            <Label>Tagline / philosophy</Label>
            <textarea name="tagline" defaultValue={site.tagline} rows={2} className={inputCls} />
          </div>
          <div>
            <Label>SEO description</Label>
            <textarea name="description" defaultValue={site.description} rows={3} className={inputCls} />
          </div>
        </section>

        {/* Contact */}
        <section className="card space-y-4">
          <h2 className="font-semibold">Contact & location</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Email</Label>
              <input name="email" type="email" defaultValue={site.email} className={inputCls} />
            </div>
            <div>
              <Label>Location</Label>
              <input name="location" defaultValue={site.location} className={inputCls} />
            </div>
            <div>
              <Label>Production URL</Label>
              <input name="url" defaultValue={site.url} className={inputCls} />
            </div>
            <div>
              <Label>WhatsApp number (digits only)</Label>
              <input name="whatsappNumber" defaultValue={site.whatsapp.number} className={inputCls} />
            </div>
          </div>
          <div>
            <Label>WhatsApp preset message</Label>
            <input name="whatsappMessage" defaultValue={site.whatsapp.presetMessage} className={inputCls} />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label>LinkedIn URL</Label>
              <input name="linkedin" defaultValue={site.socials.linkedin} className={inputCls} />
            </div>
            <div>
              <Label>Instagram URL</Label>
              <input name="instagram" defaultValue={site.socials.instagram} className={inputCls} />
            </div>
            <div>
              <Label>GitHub URL</Label>
              <input name="github" defaultValue={site.socials.github} className={inputCls} />
            </div>
          </div>
        </section>

        {/* Focus cards */}
        <section className="card space-y-4">
          <h2 className="font-semibold">Focus cards (home page)</h2>
          {[0, 1].map((i) => (
            <div key={i} className="grid gap-4 rounded-xl border border-midnight/10 p-4 sm:grid-cols-2">
              <div className="sm:col-span-2 text-xs font-semibold uppercase tracking-widest text-electric">
                Card {i + 1}
              </div>
              <div>
                <Label>Title</Label>
                <input name={`focus${i}Title`} defaultValue={site.focuses[i]?.title ?? ""} className={inputCls} />
              </div>
              <div>
                <Label>Icon</Label>
                <select name={`focus${i}Icon`} defaultValue={site.focuses[i]?.icon ?? "route"} className={inputCls}>
                  <option value="route">route</option>
                  <option value="chart">chart</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <Label>Description</Label>
                <textarea name={`focus${i}Desc`} defaultValue={site.focuses[i]?.description ?? ""} rows={2} className={inputCls} />
              </div>
              <div>
                <Label>Accent</Label>
                <select name={`focus${i}Accent`} defaultValue={site.focuses[i]?.accent ?? "electric"} className={inputCls}>
                  <option value="electric">electric (blue)</option>
                  <option value="horizon">horizon (cyan)</option>
                </select>
              </div>
            </div>
          ))}
        </section>

        <div className="flex items-center gap-3">
          <SubmitButton disabled={!hasDb()}>Save changes</SubmitButton>
          {!hasDb() && (
            <span className="text-sm text-midnight/50">
              Connect a database to enable saving.
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
