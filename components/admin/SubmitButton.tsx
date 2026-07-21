"use client";

import { useFormStatus } from "react-dom";
import type { ReactNode } from "react";

/**
 * Submit button that shows a pending state while its parent form's server
 * action runs — so saving is never a silent, invisible operation.
 */
export function SubmitButton({
  children,
  disabled = false,
  variant = "primary",
}: {
  children: ReactNode;
  disabled?: boolean;
  variant?: "primary" | "danger";
}) {
  const { pending } = useFormStatus();

  if (variant === "danger") {
    return (
      <button
        type="submit"
        disabled={disabled || pending}
        className="text-sm font-medium text-red-600 hover:underline disabled:opacity-50"
      >
        {pending ? "Deleting…" : children}
      </button>
    );
  }

  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          Saving…
        </>
      ) : (
        children
      )}
    </button>
  );
}
