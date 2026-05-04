"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/ideas", label: "Ideas" },
  { href: "/admin/agents", label: "Agents" },
];

export function AdminNav() {
  const pathname = usePathname();
  if (pathname === "/admin/login") return null;

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    window.location.href = "/admin/login";
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-y-3 gap-x-6">
        <Link href="/admin" className="flex items-center gap-2.5 shrink-0">
          <div
            className="w-8 h-8 rounded-full bg-pink-400 flex items-center justify-center shadow-sm"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            <span className="text-white text-sm font-bold tracking-tight">AB</span>
          </div>
          <span
            className="text-sm font-semibold tracking-[0.15em] uppercase text-pink-400"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Admin
          </span>
        </Link>

        <div className="flex items-center gap-5 sm:gap-7 text-xs tracking-widest uppercase font-medium">
          {TABS.map(t => {
            const active = pathname === t.href;
            return (
              <Link
                key={t.href}
                href={t.href}
                className={
                  active
                    ? "text-pink-400 border-b-2 border-pink-400 pb-1"
                    : "text-gray-400 hover:text-pink-400 transition-colors"
                }
              >
                {t.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden sm:inline text-xs tracking-widest uppercase text-gray-400 hover:text-pink-400 transition-colors"
          >
            ← Public Site
          </Link>
          <button
            onClick={logout}
            className="text-[10px] tracking-[0.25em] uppercase border border-gray-200 text-gray-500 px-4 py-2 rounded-full hover:border-pink-400 hover:text-pink-400 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
