import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

/**
 * Server-only session helpers (they read request cookies via next/headers,
 * which is not available in the edge/middleware runtime — keep these out of
 * middleware.ts).
 */

/** Is the current request an authenticated admin? */
export async function isAuthenticated(): Promise<boolean> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}

/**
 * Sends unauthenticated callers to the login page instead of crashing the
 * request with an unhandled error (which surfaces to visitors as
 * "Application error: a server-side exception has occurred").
 */
export async function requireAdmin(): Promise<void> {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }
}
