"use client";

import { useEffect, useState } from "react";

const KEY = "ayla-admin-milestones-seen";
const MILESTONES = [1000, 2500, 5000, 10000, 25000, 50000, 100000];

type Confetto = { id: number; left: number; color: string; delay: number; duration: number; size: number };

const COLORS = ["#f472b6", "#f9a8d4", "#fbbf24", "#fde68a", "#ec4899", "#fbcfe8"];

export function ConfettiOnMount({ totalPaid }: { totalPaid: number }) {
  const [pieces, setPieces] = useState<Confetto[]>([]);

  useEffect(() => {
    let seen: number[] = [];
    try { seen = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch {}
    const milestone = [...MILESTONES].reverse().find(m => totalPaid >= m && !seen.includes(m));
    if (!milestone) return;

    const next: Confetto[] = Array.from({ length: 90 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: Math.random() * 600,
      duration: 2200 + Math.random() * 1600,
      size: 6 + Math.random() * 10,
    }));
    setPieces(next);
    try { localStorage.setItem(KEY, JSON.stringify([...seen, milestone])); } catch {}
    const t = window.setTimeout(() => setPieces([]), 4500);
    return () => window.clearTimeout(t);
  }, [totalPaid]);

  if (pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[90] pointer-events-none overflow-hidden">
      {pieces.map(p => (
        <span
          key={p.id}
          className="absolute -top-6 rounded-sm"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.6,
            background: p.color,
            animation: `confetti-fall ${p.duration}ms cubic-bezier(0.4, 0.1, 0.6, 1) ${p.delay}ms forwards`,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti-fall {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
