import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const target = searchParams.get("url");
  if (!target) {
    return NextResponse.json({ ok: false, error: "missing url" }, { status: 400 });
  }
  try {
    const u = new URL(target);
    if (u.protocol !== "https:" && u.protocol !== "http:") {
      return NextResponse.json({ ok: false, error: "bad protocol" }, { status: 400 });
    }
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 6000);
    const res = await fetch(u.toString(), {
      method: "HEAD",
      signal: ctrl.signal,
      cache: "no-store",
      redirect: "follow",
    });
    clearTimeout(timer);
    return NextResponse.json({ ok: res.status < 500, status: res.status });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
