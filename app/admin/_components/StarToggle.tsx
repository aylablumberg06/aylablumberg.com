"use client";

import { useEffect, useState } from "react";

const KEY = "ayla-admin-stars";

function read(): Record<string, true> {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function write(stars: Record<string, true>) {
  try { localStorage.setItem(KEY, JSON.stringify(stars)); } catch {}
}

export function StarToggle({ id, className = "" }: { id: string; className?: string }) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    setOn(Boolean(read()[id]));
  }, [id]);

  function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const stars = read();
    if (stars[id]) delete stars[id];
    else stars[id] = true;
    write(stars);
    setOn(Boolean(stars[id]));
  }

  return (
    <button
      onClick={toggle}
      aria-label={on ? "Unstar" : "Star"}
      className={`text-base leading-none transition-all hover:scale-125 ${className}`}
      style={{ color: on ? "#fbbf24" : "#e5e7eb" }}
    >
      {on ? "★" : "☆"}
    </button>
  );
}
