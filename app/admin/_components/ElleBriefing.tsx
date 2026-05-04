import { getElleBriefing } from "@/lib/elle-briefing";

export async function ElleBriefing() {
  const brief = await getElleBriefing();

  return (
    <section className="bg-white border-y border-pink-100">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-[180px_1fr] gap-8 items-start">
        <div className="shrink-0">
          <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-pink-300 to-pink-500 flex items-center justify-center shadow-lg">
            <span
              className="text-white font-bold text-5xl leading-none"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              E
            </span>
            <span className="absolute -top-2 -right-2 text-2xl"
              style={{ animation: "sparkle 3.5s ease-in-out 0.4s infinite" }}>✦</span>
            <span className="absolute -bottom-1 -left-3 text-pink-300 text-xl"
              style={{ animation: "sparkle 3.5s ease-in-out 1.2s infinite" }}>✦</span>
          </div>
          <div className="mt-3 text-center">
            <p
              className="text-2xl font-bold text-black leading-none"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Elle
            </p>
            <p className="text-[10px] tracking-[0.25em] uppercase text-pink-400 font-bold mt-1.5">
              Chief of staff
            </p>
          </div>
        </div>
        <div className="pt-2">
          <p className="text-[11px] tracking-[0.25em] uppercase text-pink-400 font-bold mb-3">
            Morning brief · {brief.source === "live" ? "fresh" : "offline"}
          </p>
          <blockquote
            className="text-2xl md:text-3xl text-black leading-snug whitespace-pre-line"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {brief.text}
          </blockquote>
          {brief.source === "fallback" && (
            <p className="text-xs text-gray-400 italic mt-4"
              style={{ fontFamily: "var(--font-playfair)" }}>
              {brief.reason}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
