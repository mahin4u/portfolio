import { SignJWT, jwtVerify } from "jose";

/**
 * Minimal single-admin auth. The admin proves identity with one shared
 * password (env `ADMIN_PASSWORD`); on success we issue a signed, httpOnly
 * session cookie (JWT). No user table required.
 */

export const SESSION_COOKIE = "admin_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSecret(): Uint8Array {
  const secret =
    process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
  if (!secret) {
    throw new Error(
      "Auth is not configured. Set ADMIN_PASSWORD (and ideally SESSION_SECRET)."
    );
  }
  return new TextEncoder().encode(secret);
}

/** True when an admin password has been configured. */
export function authConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

/** Constant-time-ish comparison to avoid trivial timing leaks. */
export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected) return false;
  if (input.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) {
    mismatch |= input.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function createSessionToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(getSecret());
}

/** Edge/runtime-agnostic token verification (used by middleware too). */
export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  };
}
