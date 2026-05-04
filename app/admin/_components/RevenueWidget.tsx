"use client";

import { useState } from "react";
import type { Revenue } from "@/lib/admin-data";

function fmt(n: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(n);
}

export function RevenueWidget({ revenue }: { revenue: Revenue }) {
  const [open, setOpen] = useState(false);
  const paidTotal = revenue.paid.reduce((s, x) => s + x.amount, 0);
  const upcomingTotal = revenue.upcoming.reduce((s, x) => s + x.amount, 0);
  const projectedTotal = revenue.projected.reduce((s, x) => s + x.amount, 0);

  return (
    <div className="bg-white rounded-3xl border border-pink-100 shadow-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left group"
      >
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-pink-100">
          {[
            { label: "Paid", amount: paidTotal, sub: "money in the bank", accent: "bg-pink-400 text-white" },
            { label: "Upcoming", amount: upcomingTotal, sub: "invoices due next", accent: "bg-pink-200 text-pink-700" },
            { label: "Projected", amount: projectedTotal, sub: "forecast / TBD", accent: "bg-pink-50 text-pink-500 border border-pink-200" },
          ].map(b => (
            <div key={b.label} className="p-8 md:p-10">
              <div className={`inline-block ${b.accent} text-[10px] font-bold tracking-[0.25em] uppercase px-3 py-1 rounded-full mb-4`}>
                {b.label}
              </div>
              <p
                className="text-5xl md:text-6xl font-bold text-black leading-none mb-2 group-hover:text-pink-400 transition-colors"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {fmt(b.amount, revenue.currency)}
              </p>
              <p className="text-xs text-gray-400 tracking-widest uppercase">{b.sub}</p>
            </div>
          ))}
        </div>
        <div className="bg-pink-50 px-8 py-3 text-center border-t border-pink-100">
          <span className="text-[10px] tracking-[0.3em] uppercase text-pink-500 font-semibold">
            {open ? "− Hide breakdown" : "+ Tap for breakdown"}
          </span>
        </div>
      </button>

      {open && (
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-pink-100 bg-white">
          {[
            { label: "Paid", items: revenue.paid, dateField: "date" as const },
            { label: "Upcoming", items: revenue.upcoming, dateField: "expectedDate" as const },
            { label: "Projected", items: revenue.projected, dateField: "date" as const },
          ].map(col => (
            <div key={col.label} className="p-6 md:p-8">
              <p className="text-[10px] tracking-[0.3em] uppercase text-pink-400 font-semibold mb-5">
                {col.label} · breakdown
              </p>
              <div className="space-y-4">
                {col.items.length === 0 && (
                  <p className="text-xs text-gray-300 italic">Nothing here yet.</p>
                )}
                {col.items.map((item, i) => (
                  <div key={i} className="border-b border-pink-50 pb-4 last:border-0">
                    <div className="flex justify-between items-baseline gap-3 mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <p className="text-sm font-semibold text-black truncate">{item.source}</p>
                        {item.live && (
                          <span className="text-[8px] font-bold tracking-[0.2em] uppercase bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full shrink-0">
                            ● Live · Stripe
                          </span>
                        )}
                      </div>
                      <p
                        className="text-base font-bold text-pink-400 shrink-0"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {fmt(item.amount, revenue.currency)}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] tracking-widest uppercase text-gray-400">
                      <span>{item.kind}</span>
                      {item[col.dateField] && <span>· {item[col.dateField]}</span>}
                      {item.invoice && <span>· {item.invoice}</span>}
                    </div>
                    {item.note && (
                      <p className="text-xs text-gray-500 italic mt-2"
                        style={{ fontFamily: "var(--font-playfair)" }}>
                        {item.note}
                      </p>
                    )}
                    {item.kind === "course" && (
                      <a
                        href="https://unlocked.aylablumberg.com/admin"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-[10px] tracking-[0.25em] uppercase text-pink-500 font-semibold hover:text-pink-700 transition-colors"
                      >
                        Open Unlocked admin ↗
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
