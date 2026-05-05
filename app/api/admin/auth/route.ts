import { NextResponse } from "next/server";
import { checkAuth, setAuthCookie, clearAuthCookie } from "@/lib/admin-auth";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_FAILS = 5;
const attempts = new Map<string, { count: number; resetAt: number }>();

function rateLimit(key: string): { ok: true } | { ok: false; retryIn: number } {
  const now = Date.now();
  const entry = attempts.get(key);
  if (!entry || now > entry.resetAt) {
    attempts.set(key, { count: 0, resetAt: now + WINDOW_MS });
    return { ok: true };
  }
  if (entry.count >= MAX_FAILS) {
    return { ok: false, retryIn: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { ok: true };
}

function recordFail(key: string) {
  const entry = attempts.get(key);
  if (entry) entry.count += 1;
}

function clearFails(key: string) {
  attempts.delete(key);
}

function clientKey(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd?.split(",")[0].trim() || req.headers.get("x-real-ip") || "anon").toLowerCase();
}

export async function POST(req: Request) {
  const key = clientKey(req);
  const gate = rateLimit(key);
  if (!gate.ok) {
    return NextResponse.json(
      { ok: false, error: `Too many attempts. Try again in ${gate.retryIn}s.` },
      { status: 429, headers: { "Retry-After": String(gate.retryIn) } }
    );
  }
  try {
    const { password } = await req.json();
    if (typeof password !== "string") {
      return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
    }
    const ok = await setAuthCookie(password);
    if (!ok) {
      recordFail(key);
      return NextResponse.json({ ok: false, error: "Wrong password" }, { status: 401 });
    }
    clearFails(key);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Login failed" }, { status: 500 });
  }
}

export async function GET() {
  const ok = await checkAuth();
  return NextResponse.json({ authed: ok });
}

export async function DELETE() {
  await clearAuthCookie();
  return NextResponse.json({ ok: true });
}
