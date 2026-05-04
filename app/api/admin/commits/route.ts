import { NextResponse } from "next/server";

type GhEvent = {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
  payload: {
    commits?: { message: string; sha: string; author?: { name: string } }[];
    ref?: string;
  };
};

let cache: { at: number; data: unknown } | null = null;
const TTL = 5 * 60 * 1000;

export async function GET() {
  if (cache && Date.now() - cache.at < TTL) {
    return NextResponse.json(cache.data);
  }
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": "ayla-admin",
    };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch("https://api.github.com/users/aylablumberg06/events/public?per_page=30", {
      headers,
      signal: ctrl.signal,
      cache: "no-store",
    });
    clearTimeout(timer);
    if (!res.ok) {
      return NextResponse.json({ commits: [], error: `gh ${res.status}` });
    }
    const events = (await res.json()) as GhEvent[];
    const commits: { repo: string; sha: string; message: string; ts: string }[] = [];
    for (const e of events) {
      if (e.type !== "PushEvent" || !e.payload.commits) continue;
      for (const c of e.payload.commits) {
        commits.push({
          repo: e.repo.name,
          sha: c.sha.slice(0, 7),
          message: c.message.split("\n")[0].slice(0, 100),
          ts: e.created_at,
        });
      }
      if (commits.length >= 12) break;
    }
    const data = { commits: commits.slice(0, 12) };
    cache = { at: Date.now(), data };
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({
      commits: [],
      error: err instanceof Error ? err.message : "fetch failed",
    });
  }
}
