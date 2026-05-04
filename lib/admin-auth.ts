import { cookies } from "next/headers";

const COOKIE_NAME = "ayla_admin";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function makeToken(password: string): string {
  const secret = process.env.ADMIN_SECRET || "ayla-master-salt-v1";
  return Buffer.from(`${password}:${secret}`).toString("base64");
}

export async function checkAuth(): Promise<boolean> {
  const store = await cookies();
  const tok = store.get(COOKIE_NAME)?.value;
  if (!tok) return false;
  const expected = makeToken(process.env.ADMIN_PASSWORD || "");
  return tok === expected;
}

export async function setAuthCookie(password: string): Promise<boolean> {
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return false;
  }
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
