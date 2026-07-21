"use client";

import { useEffect } from "react";

/**
 * Route-level error boundary. Replaces Next's opaque
 * "Application error: a server-side exception has occurred" page with a
 * branded, recoverable one, and logs the digest for correlation with the
 * server logs.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="text-6xl">🧭</p>
      <h1 className="mt-6 text-2xl font-bold">Something went off course.</h1>
      <p className="mt-2 max-w-md text-midnight/60">
        A temporary server hiccup — usually the database connection. Try again
        in a moment.
      </p>
      {error.digest && (
        <p className="mt-2 text-xs text-midnight/40">Error digest: {error.digest}</p>
      )}
      <div className="mt-8 flex gap-3">
        <button onClick={reset} className="btn-primary">
          Try again
        </button>
        <a href="/" className="btn-ghost">
          Back to home
        </a>
      </div>
    </div>
  );
}
