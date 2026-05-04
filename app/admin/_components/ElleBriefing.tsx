import { getElleBriefing } from "@/lib/elle-briefing";
import { AgentAvatar } from "./AgentAvatar";

const ELLE_IMG = "https://upload.wikimedia.org/wikipedia/en/0/00/Elle_Woods.jpg";

function splitIntoBubbles(text: string): string[] {
  const cleaned = text
    .replace(/[\r\n]+(Elle\s*[.!]?\s*)$/i, "")
    .replace(/[,\s]+$/, "")
    .trim();

  const parts = cleaned
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .map((s) => s.trim())
    .filter(Boolean);

  return parts.length ? parts : [cleaned];
}

export async function ElleBriefing() {
  const brief = await getElleBriefing();
  const bubbles = splitIntoBubbles(brief.text);

  return (
    <section className="bg-white border-y border-pink-100">
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Thread header */}
        <div className="flex flex-col items-center mb-5 pb-4 border-b border-gray-100">
          <div className="relative">
            <AgentAvatar
              name="Elle"
              src={ELLE_IMG}
              size={48}
              ringColor="border-pink-200"
              bg="bg-gradient-to-br from-pink-300 to-pink-500 text-white"
            />
            <span
              className="absolute -top-1 -right-2 text-pink-300 text-sm pointer-events-none"
              style={{ animation: "sparkle 3.5s ease-in-out 0.4s infinite" }}
            >
              ✦
            </span>
            <span
              className="absolute -bottom-1 -left-2 text-yellow-300 text-xs pointer-events-none"
              style={{ animation: "sparkle 3.5s ease-in-out 1.2s infinite" }}
            >
              ✦
            </span>
          </div>
          <p
            className="text-base font-bold text-black mt-2 leading-none"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Elle
          </p>
          <p className="text-[9px] tracking-[0.3em] uppercase text-pink-400 font-bold mt-1">
            Morning brief · {brief.source === "live" ? "fresh" : "offline"}
          </p>
        </div>

        {/* Chat bubbles */}
        <div className="space-y-1.5">
          {bubbles.map((line, i) => (
            <div key={i} className="flex items-end gap-2">
              {i === 0 ? (
                <AgentAvatar
                  name="Elle"
                  src={ELLE_IMG}
                  size={22}
                  ringColor="border-pink-200"
                  bg="bg-gradient-to-br from-pink-300 to-pink-500 text-white"
                />
              ) : (
                <div className="w-[22px] shrink-0" />
              )}
              <div
                className={`bg-pink-100 text-pink-900 text-[12px] leading-snug px-3 py-1.5 rounded-2xl ${
                  i === 0 ? "rounded-bl-md" : ""
                } inline-block max-w-md`}
              >
                {line}
              </div>
            </div>
          ))}
          {/* Sign-off bubble */}
          <div className="flex items-end gap-2 pl-7 pt-1">
            <div className="text-[10px] text-pink-400 italic" style={{ fontFamily: "var(--font-playfair)" }}>
              — Elle 💕
            </div>
          </div>
        </div>

        {brief.source === "fallback" && (
          <p
            className="text-[10px] text-gray-400 italic mt-4 text-center"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {brief.reason}
          </p>
        )}
      </div>
    </section>
  );
}
