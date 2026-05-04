"use client";

import { useState, useEffect } from "react";

const DOMAINS = [
  { label: "aylablumberg.com", url: "https://aylablumberg.com" },
  { label: "ai.aylablumberg.com", url: "https://ai.aylablumberg.com" },
  { label: "unlocked.aylablumberg.com", url: "https://unlocked.aylablumberg.com" },
  { label: "sites.aylablumberg.com", url: "https://sites.aylablumberg.com" },
  { label: "no1courier.com", url: "https://no1courier.com" },
  { label: "designlistcollective.com", url: "https://designlistcollective.com" },
];

type Status = "checking" | "up" | "down";

export function DomainHealth() {
  const [statuses, setStatuses] = useState<Record<string, Status>>(
    Object.fromEntries(DOMAINS.map(d => [d.label, "checking"])) as Record<string, Status>
  );

  useEffect(() => {
    DOMAINS.forEach(async d => {
      try {
        const r = await fetch(`/api/admin/domain-health?url=${encodeURIComponent(d.url)}`, {
          cache: "no-store",
        });
        const data = await r.json();
        setStatuses(s => ({ ...s, [d.label]: data.ok ? "up" : "down" }));
      } catch {
        setStatuses(s => ({ ...s, [d.label]: "down" }));
      }
    });
  }, []);

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-black px-6 py-3 flex justify-between items-center">
        <span className="text-pink-300 text-[10px] font-bold tracking-[0.25em] uppercase">● Domain Health</span>
        <span className="text-white/50 text-[9px] tracking-widest uppercase">live check</span>
      </div>
      <div className="p-6 space-y-3">
        {DOMAINS.map(d => {
          const s = statuses[d.label];
          const dot =
            s === "up" ? "bg-green-400"
            : s === "down" ? "bg-red-400"
            : "bg-gray-200 animate-pulse";
          return (
            <a
              key={d.label}
              href={d.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 hover:bg-pink-50/50 rounded-lg px-3 py-2 -mx-3 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className={`w-2 h-2 rounded-full ${dot} shrink-0`} />
                <span className="text-sm text-black font-medium truncate">{d.label}</span>
              </div>
              <span className="text-[10px] text-gray-400 tracking-widest uppercase shrink-0">
                {s === "up" ? "live" : s === "down" ? "down" : "..."}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
