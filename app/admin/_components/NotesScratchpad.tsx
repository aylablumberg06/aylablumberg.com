"use client";

import { useState, useEffect, useRef } from "react";

const KEY = "ayla-admin-notes";

export function NotesScratchpad() {
  const [value, setValue] = useState("");
  const [saved, setSaved] = useState<"idle" | "saving" | "saved">("idle");
  const timer = useRef<number | null>(null);

  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      if (v) setValue(v);
    } catch {}
  }, []);

  function onChange(v: string) {
    setValue(v);
    setSaved("saving");
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      try {
        localStorage.setItem(KEY, v);
        setSaved("saved");
      } catch {}
    }, 400);
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-pink-400 px-6 py-3 flex justify-between items-center">
        <span className="text-white text-[10px] font-bold tracking-[0.25em] uppercase">● Scratchpad</span>
        <span className="text-white/80 text-[9px] tracking-widest uppercase">
          {saved === "saving" ? "saving…" : saved === "saved" ? "saved locally" : "autosave on"}
        </span>
      </div>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Brain dump. Anything. This stays in your browser only."
        rows={8}
        className="w-full p-6 text-sm text-gray-700 leading-relaxed focus:outline-none resize-none placeholder-gray-300"
        style={{ fontFamily: "var(--font-playfair)" }}
      />
    </div>
  );
}
