"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Section = { id: string; label: string };

const SECTIONS_BY_PATH: Record<string, Section[]> = {
  "/admin": [
    { id: "hero", label: "Top" },
    { id: "money", label: "Money" },
    { id: "jobs", label: "Jobs" },
    { id: "subdash", label: "Dashboards" },
    { id: "projects", label: "Projects" },
    { id: "pulse", label: "Pulse" },
    { id: "notes", label: "Notes" },
  ],
};

export function StickyTOC() {
  const pathname = usePathname();
  const sections = SECTIONS_BY_PATH[pathname] || [];
  const [active, setActive] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    if (sections.length === 0) return;
    const obs = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.5, 1] }
    );
    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [sections]);

  if (sections.length === 0) return null;

  return (
    <nav
      aria-label="Section navigation"
      className="fixed top-1/2 right-5 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-3"
    >
      {sections.map(s => {
        const on = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group flex items-center gap-3 justify-end"
            aria-label={`Jump to ${s.label}`}
          >
            <span
              className={`text-[10px] tracking-[0.25em] uppercase font-semibold transition-all ${
                on ? "text-pink-500 opacity-100" : "text-gray-400 opacity-0 group-hover:opacity-100"
              }`}
            >
              {s.label}
            </span>
            <span
              className={`block rounded-full transition-all ${
                on
                  ? "w-3 h-3 bg-pink-400 ring-4 ring-pink-100"
                  : "w-2 h-2 bg-gray-300 group-hover:bg-pink-300"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
}
