"use client";

import { usePathname } from "next/navigation";

export function TickerOrEmpty({ text }: { text: string }) {
  const pathname = usePathname();
  if (pathname === "/admin/login") return null;
  return (
    <div className="bg-black overflow-hidden py-2.5 border-b border-zinc-800 whitespace-nowrap">
      <div className="animate-ticker whitespace-nowrap">
        <span className="text-pink-300 text-[10px] font-semibold tracking-[0.25em] uppercase">
          {text}
        </span>
      </div>
    </div>
  );
}
