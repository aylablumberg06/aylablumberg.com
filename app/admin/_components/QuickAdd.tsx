"use client";

import { useState, useEffect } from "react";

type DraftItem = { id: string; text: string; createdAt: number };

const KEY_PREFIX = "ayla-admin-drafts:";

export function QuickAdd({
  storageKey,
  placeholder,
  label,
}: {
  storageKey: string;
  placeholder: string;
  label: string;
}) {
  const [text, setText] = useState("");
  const [drafts, setDrafts] = useState<DraftItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY_PREFIX + storageKey);
      setDrafts(raw ? JSON.parse(raw) : []);
    } catch {}
  }, [storageKey]);

  function persist(next: DraftItem[]) {
    setDrafts(next);
    try { localStorage.setItem(KEY_PREFIX + storageKey, JSON.stringify(next)); } catch {}
  }

  function add(e: React.FormEvent) {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    persist([{ id: String(Date.now()), text: t, createdAt: Date.now() }, ...drafts]);
    setText("");
  }

  function remove(id: string) {
    persist(drafts.filter(d => d.id !== id));
  }

  return (
    <div className="bg-white border border-pink-100 rounded-3xl shadow-sm overflow-hidden">
      <div className="bg-pink-50 px-5 py-2.5 flex items-center justify-between">
        <span className="text-[10px] tracking-[0.25em] uppercase text-pink-500 font-bold">
          ✨ Quick add — {label}
        </span>
        <span className="text-[9px] tracking-widest uppercase text-pink-300">
          stays in this browser
        </span>
      </div>
      <form onSubmit={add} className="flex gap-2 p-4">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-4 py-2.5 text-sm bg-pink-50/50 border border-pink-100 rounded-full focus:outline-none focus:border-pink-300 focus:bg-white transition-colors"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="bg-pink-400 text-white px-5 py-2.5 rounded-full text-[10px] tracking-[0.25em] uppercase font-semibold hover:bg-black transition-colors disabled:opacity-40"
        >
          + Add
        </button>
      </form>
      {drafts.length > 0 && (
        <ul className="px-4 pb-4 space-y-2">
          {drafts.map(d => (
            <li key={d.id} className="flex items-start justify-between gap-3 bg-pink-50/40 border border-pink-100 rounded-2xl px-4 py-2.5">
              <span className="text-sm text-gray-700 leading-snug">{d.text}</span>
              <button
                onClick={() => remove(d.id)}
                aria-label="Remove draft"
                className="text-xs text-gray-300 hover:text-pink-500 transition-colors shrink-0"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
