"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/auth").then(r => r.json()).then(d => {
      if (d.authed) router.replace("/admin");
    }).catch(() => {});
  }, [router]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.ok) router.replace("/admin");
    else setError(data.error || "Wrong password");
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{
        background: "#fdf2f8",
        backgroundImage: "radial-gradient(circle, #f9a8d4 1.5px, transparent 1.5px)",
        backgroundSize: "22px 22px",
      }}
    >
      <div className="w-full max-w-sm flex flex-col items-center">
        {/* Lanyard strap */}
        <div className="w-10 h-24 rounded-b-lg shadow-lg"
          style={{ background: "linear-gradient(180deg, #9f1239 0%, #be123c 50%, #9f1239 100%)" }} />
        <div className="w-8 h-4 rounded-full border-[3px] border-gray-400 bg-gray-300 shadow -mt-0.5" />

        {/* Badge */}
        <div className="w-full bg-white rounded-3xl shadow-2xl overflow-hidden -mt-0.5 border border-gray-100">
          <div className="bg-pink-400 px-8 py-7 text-center">
            <p className="text-white/70 text-[9px] tracking-[0.35em] uppercase mb-3">Restricted · For Ayla Only</p>
            <h1
              className="text-white text-4xl font-bold leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Master<br />Dashboard
            </h1>
            <p className="text-white/80 text-[9px] tracking-[0.25em] uppercase mt-3">
              aylablumberg.com / admin
            </p>
          </div>

          <div className="flex justify-center relative z-10 -mt-3.5 mb-3">
            <div className="w-7 h-7 rounded-full bg-pink-50 border-2 border-pink-200 shadow-inner" />
          </div>

          <form onSubmit={submit} className="px-8 pb-8 space-y-4">
            <div className="border-b border-gray-200 pb-2">
              <label className="block text-[9px] tracking-[0.3em] uppercase text-gray-400 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoFocus
                className="w-full bg-transparent text-sm text-black focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-pink-400 text-white py-3 rounded-full text-[10px] tracking-[0.25em] uppercase font-semibold hover:bg-black transition-colors disabled:opacity-50"
            >
              {loading ? "Checking…" : "Enter"}
            </button>
            {error && (
              <p className="text-pink-500 text-xs text-center italic"
                style={{ fontFamily: "var(--font-playfair)" }}>
                {error}
              </p>
            )}
          </form>
        </div>

        <p className="text-xs text-gray-500 mt-6 italic" style={{ fontFamily: "var(--font-playfair)" }}>
          Hi Ayla — only you can see what&apos;s past this screen.
        </p>
      </div>
    </div>
  );
}
