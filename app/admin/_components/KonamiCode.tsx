"use client";

import { useEffect, useState } from "react";

const SEQUENCE = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
];

type Heart = { id: number; left: number; delay: number; duration: number; size: number };

export function KonamiCode() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    let buffer: string[] = [];
    function onKey(e: KeyboardEvent) {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      buffer = [...buffer.slice(-(SEQUENCE.length - 1)), k];
      if (buffer.length === SEQUENCE.length && buffer.every((v, i) => v === SEQUENCE[i])) {
        const next: Heart[] = Array.from({ length: 30 }, (_, i) => ({
          id: Date.now() + i,
          left: Math.random() * 100,
          delay: Math.random() * 800,
          duration: 2400 + Math.random() * 1600,
          size: 18 + Math.random() * 26,
        }));
        setHearts(h => [...h, ...next]);
        buffer = [];
        window.setTimeout(() => setHearts([]), 5000);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (hearts.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      {hearts.map(h => (
        <span
          key={h.id}
          className="absolute -top-10 select-none"
          style={{
            left: `${h.left}%`,
            fontSize: h.size,
            animation: `konami-fall ${h.duration}ms ease-in ${h.delay}ms forwards`,
          }}
        >
          ♥
        </span>
      ))}
      <style>{`
        @keyframes konami-fall {
          0%   { transform: translateY(-40px) rotate(0deg); opacity: 0; color: #f9a8d4; }
          10%  { opacity: 1; }
          50%  { color: #f472b6; }
          100% { transform: translateY(110vh) rotate(540deg); opacity: 0; color: #ec4899; }
        }
      `}</style>
    </div>
  );
}
