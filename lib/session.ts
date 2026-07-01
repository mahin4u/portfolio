import "server-only";
import { cookies } from "next/headers";
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

/** Throws if the caller is not an authenticated admin. */
export async function requireAdmin(): Promise<void> {
  if (!(await isAuthenticated())) {
    throw new Error("Unauthorized");
  }
}
