"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function ScrollProgress() {
  const pathname = usePathname();
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (pathname === "/admin/login") return;
    const calc = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setPct(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    calc();
    window.addEventListener("scroll", calc, { passive: true });
    window.addEventListener("resize", calc);
    return () => {
      window.removeEventListener("scroll", calc);
      window.removeEventListener("resize", calc);
    };
  }, [pathname]);

  if (pathname === "/admin/login") return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-[60] pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-pink-300 via-pink-400 to-pink-500 transition-[width] duration-100"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
