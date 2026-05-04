import type { DailyPoint } from "@/lib/stripe-revenue";

export function RevenueSparkline({ daily }: { daily: DailyPoint[] }) {
  if (daily.length === 0) return null;
  const W = 220;
  const H = 60;
  const pad = 4;
  const max = Math.max(1, ...daily.map(d => d.cents));
  const stepX = (W - pad * 2) / Math.max(1, daily.length - 1);
  const points = daily.map((d, i) => {
    const x = pad + i * stepX;
    const y = H - pad - ((d.cents / max) * (H - pad * 2));
    return [x, y] as const;
  });
  const path = points.map(([x, y], i) => (i === 0 ? `M${x},${y}` : `L${x},${y}`)).join(" ");
  const fill = `${path} L${points[points.length - 1][0]},${H} L${points[0][0]},${H} Z`;
  const total = daily.reduce((s, d) => s + d.cents, 0);
  const peakDay = daily.reduce((best, d) => (d.cents > best.cents ? d : best), daily[0]);

  return (
    <div className="bg-white rounded-3xl border border-pink-100 shadow-sm overflow-hidden">
      <div className="bg-pink-50 px-5 py-2.5 flex justify-between items-center">
        <span className="text-[11px] tracking-[0.25em] uppercase text-pink-500 font-bold">
          ● Course revenue · 30d
        </span>
        <span className="text-[10px] tracking-widest uppercase text-pink-400 font-mono">
          live · stripe
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-baseline justify-between mb-3">
          <p
            className="text-3xl font-bold text-black leading-none"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            ${(total / 100).toLocaleString("en-US", { maximumFractionDigits: 0 })}
          </p>
          <p className="text-xs text-gray-400">last 30 days</p>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" aria-hidden="true">
          <defs>
            <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f9a8d4" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#f9a8d4" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={fill} fill="url(#spark-fill)" />
          <path d={path} fill="none" stroke="#ec4899" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {peakDay.cents > 0 && (
          <p className="text-[10px] tracking-widest uppercase text-gray-400 mt-3">
            Peak day · {peakDay.date} · ${(peakDay.cents / 100).toLocaleString("en-US", { maximumFractionDigits: 0 })}
          </p>
        )}
      </div>
    </div>
  );
}
