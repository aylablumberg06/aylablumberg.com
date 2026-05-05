import { cookies } from "next/headers";
import { timingSafeEqual } from "crypto";

const COOKIE_NAME = "ayla_admin";
const MAX_AGE = 60 * 60 * 24 * 30;

function requireSecret(): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) throw new Error("ADMIN_SECRET is not set");
  return secret;
}

function requirePassword(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error("ADMIN_PASSWORD is not set");
  return password;
}

function makeToken(password: string): string {
  return Buffer.from(`${password}:${requireSecret()}`).toString("base64");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export async function checkAuth(): Promise<boolean> {
  const store = await cookies();
  const tok = store.get(COOKIE_NAME)?.value;
  if (!tok) return false;
  try {
    return safeEqual(tok, makeToken(requirePassword()));
  } catch {
    return false;
  }
}

export async function setAuthCookie(password: string): Promise<boolean> {
  let expected: string;
  try {
    expected = requirePassword();
  } catch {
    return false;
  }
  if (!safeEqual(password, expected)) return false;
  const store = await cookies();
  store.set(COOKIE_NAME, makeToken(password), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/",
  });
  return true;
}

export async function clearAuthCookie() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
