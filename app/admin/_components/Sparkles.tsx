"use client";

const SPARKS = [
  { x: "8%",  y: "12%", color: "#f9a8d4", delay: "0.3s", size: 22 },
  { x: "20%", y: "78%", color: "#fef08a", delay: "1.2s", size: 18 },
  { x: "38%", y: "5%",  color: "#fbbf24", delay: "0.6s", size: 16 },
  { x: "52%", y: "92%", color: "#f9a8d4", delay: "1.7s", size: 20 },
  { x: "68%", y: "10%", color: "#fef08a", delay: "0.9s", size: 24 },
  { x: "82%", y: "82%", color: "#f472b6", delay: "0.4s", size: 18 },
  { x: "92%", y: "30%", color: "#f9a8d4", delay: "1.5s", size: 22 },
  { x: "5%",  y: "55%", color: "#fbbf24", delay: "1.0s", size: 14 },
];

export function Sparkles() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {SPARKS.map((s, i) => (
        <span
          key={i}
          className="absolute select-none"
          style={{
            left: s.x,
            top: s.y,
            color: s.color,
            fontSize: s.size,
            animation: `sparkle 3.5s ease-in-out ${s.delay} infinite`,
            lineHeight: 1,
          }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}
