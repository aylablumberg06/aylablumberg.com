import { NextResponse } from "next/server";
import { checkAuth, setAuthCookie, clearAuthCookie } from "@/lib/admin-auth";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    if (typeof password !== "string") {
      return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
    }
    const ok = await setAuthCookie(password);
    if (!ok) return NextResponse.json({ ok: false, error: "Wrong password" }, { status: 401 });
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
