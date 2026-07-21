"use client";

/**
 * Last-resort boundary for errors thrown in the root layout itself.
 * Must render its own <html>/<body> because the layout did not mount.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#F4F7FC",
          color: "#0B132B",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <p style={{ fontSize: "3rem", margin: 0 }}>🧭</p>
        <h1 style={{ fontSize: "1.5rem", margin: "1rem 0 0.5rem" }}>
          Something went off course.
        </h1>
        <p style={{ maxWidth: 420, opacity: 0.65, margin: 0 }}>
          A temporary server hiccup. Try again in a moment.
        </p>
        {error?.digest && (
          <p style={{ fontSize: "0.75rem", opacity: 0.4, marginTop: "0.5rem" }}>
            Error digest: {error.digest}
          </p>
        )}
        <button
          onClick={reset}
          style={{
            marginTop: "1.5rem",
            padding: "0.75rem 1.5rem",
            borderRadius: 9999,
            border: "none",
            background: "#3A86FF",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
