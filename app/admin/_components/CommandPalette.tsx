"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export type PaletteItem = {
  id: string;
  label: string;
  group: string;
  href: string;
  external?: boolean;
  hint?: string;
};

export function CommandPalette() {
  const pathname = usePathname();
  const [items, setItems] = useState<PaletteItem[]>([]);

  useEffect(() => {
    if (pathname === "/admin/login") return;
    fetch("/api/admin/palette", { cache: "no-store" })
      .then(r => r.json())
      .then(d => setItems(d.items || []))
      .catch(() => {});
  }, [pathname]);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(o => !o);
        return;
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(i =>
      i.label.toLowerCase().includes(q) ||
      i.group.toLowerCase().includes(q) ||
      (i.hint?.toLowerCase().includes(q) ?? false)
    );
  }, [query, items]);

  const grouped = useMemo(() => {
    const out = new Map<string, PaletteItem[]>();
    filtered.forEach(i => {
      const arr = out.get(i.group) ?? [];
      arr.push(i);
      out.set(i.group, arr);
    });
    return Array.from(out.entries());
  }, [filtered]);

  function go(item: PaletteItem) {
    setOpen(false);
    if (item.external) window.open(item.href, "_blank", "noopener");
    else window.location.href = item.href;
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive(a => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive(a => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filtered[active];
      if (item) go(item);
    }
  }

  if (pathname === "/admin/login") return null;

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-30 hidden md:flex items-center gap-2 bg-white border border-pink-200 text-pink-500 px-4 py-2 rounded-full text-[10px] tracking-[0.25em] uppercase font-semibold shadow-sm hover:shadow-md hover:border-pink-400 transition-all"
        aria-label="Open command palette"
      >
        <span>Search</span>
        <span className="bg-pink-50 text-pink-400 px-2 py-0.5 rounded font-mono normal-case tracking-normal text-[10px]">⌘K</span>
      </button>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh]"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-pink-100">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-pink-50">
          <span className="text-pink-400 text-lg">⌘</span>
          <input
            ref={inputRef}
            value={query}
            onChange={e => { setQuery(e.target.value); setActive(0); }}
            onKeyDown={onKeyDown}
            placeholder="Jump to a project, dashboard, agent, idea…"
            className="flex-1 text-base text-black focus:outline-none placeholder-gray-300 bg-transparent"
          />
          <kbd className="text-[10px] tracking-widest uppercase bg-pink-50 text-pink-400 px-2 py-1 rounded font-mono">esc</kbd>
        </div>
        <div ref={listRef} className="max-h-[60vh] overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-gray-400 italic"
              style={{ fontFamily: "var(--font-playfair)" }}>
              Nothing matches “{query}”
            </p>
          ) : (
            grouped.map(([group, list]) => (
              <div key={group} className="py-2">
                <p className="px-5 py-1.5 text-[10px] tracking-[0.3em] uppercase text-pink-400 font-bold">
                  {group}
                </p>
                {list.map(item => {
                  const i = filtered.indexOf(item);
                  const on = i === active;
                  const Inner = (
                    <div
                      onMouseEnter={() => setActive(i)}
                      onClick={() => go(item)}
                      className={`flex items-center justify-between gap-3 px-5 py-2.5 cursor-pointer transition-colors ${
                        on ? "bg-pink-50" : "hover:bg-pink-50/40"
                      }`}
                    >
                      <span className="text-sm text-black truncate">{item.label}</span>
                      <span className="text-[10px] text-gray-400 tracking-widest uppercase shrink-0">
                        {item.hint || (item.external ? "↗" : "→")}
                      </span>
                    </div>
                  );
                  return item.external ? (
                    <div key={item.id}>{Inner}</div>
                  ) : (
                    <Link key={item.id} href={item.href} prefetch={false}>{Inner}</Link>
                  );
                })}
              </div>
            ))
          )}
        </div>
        <div className="px-5 py-2 border-t border-pink-50 flex justify-between text-[10px] tracking-widest uppercase text-pink-300">
          <span>↑↓ navigate · ↵ open</span>
          <span>{filtered.length} matches</span>
        </div>
      </div>
    </div>
  );
}
