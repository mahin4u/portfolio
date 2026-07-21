/**
 * Green/amber confirmation strip shown after a server action redirects back
 * with ?saved=1 / ?deleted=1 / ?seeded=1. Server component — no JS needed.
 */
export function SavedBanner({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  if (!searchParams) return null;

  let message: string | null = null;
  if (searchParams.saved) message = "✓ Changes saved. The public site updates within a few seconds.";
  if (searchParams.deleted) message = "✓ Deleted.";
  if (searchParams.seeded) message = "✓ Default content copied into the database.";
  if (!message) return null;

  return (
    <div className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
      {message}
    </div>
  );
}
