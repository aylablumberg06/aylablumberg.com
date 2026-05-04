"use client";

import { useEffect, useState } from "react";

type Commit = { repo: string; sha: string; message: string; ts: string };

function timeAgo(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const m = Math.floor(ms / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export function CommitsFeed() {
  const [commits, setCommits] = useState<Commit[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/commits", { cache: "no-store" })
      .then(r => r.json())
      .then(d => {
        if (d.error) setError(d.error);
        setCommits(d.commits || []);
      })
      .catch(e => setError(e.message));
  }, []);

  return (
    <div className="bg-white rounded-3xl border border-pink-100 shadow-sm overflow-hidden flex flex-col">
      <div className="bg-black px-5 py-2.5 flex justify-between items-center">
        <span className="text-pink-300 text-[11px] tracking-[0.25em] uppercase font-bold">
          ● What you shipped
        </span>
        <span className="text-white/50 text-[10px] tracking-widest uppercase">
          github · live
        </span>
      </div>
      <div className="p-5 flex-1">
        {!commits && <p className="text-xs text-gray-300 italic">Loading…</p>}
        {commits && commits.length === 0 && (
          <p className="text-xs text-gray-400 italic">
            {error ? `Couldn't reach GitHub: ${error}` : "No recent public commits."}
          </p>
        )}
        {commits && commits.length > 0 && (
          <ul className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {commits.map((c, i) => (
              <li key={c.sha + i} className="border-b border-pink-50 pb-2.5 last:border-0">
                <p className="text-sm text-black leading-snug font-medium mb-1">{c.message}</p>
                <div className="flex justify-between items-baseline gap-3 text-[10px] tracking-widest uppercase">
                  <span className="text-pink-500 truncate font-mono">{c.repo}</span>
                  <span className="text-gray-400 shrink-0">{timeAgo(c.ts)} · {c.sha}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
