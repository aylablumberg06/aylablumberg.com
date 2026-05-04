import { getAgents } from "@/lib/admin-data";
import { AgentAvatar } from "../_components/AgentAvatar";

type TeamAccent = {
  bg: string;
  text: string;
  border: string;
  chip: string;
  ring: string;
  avatarBg: string;
  selfHoverBg: string;
  selfHoverShadow: string;
  selfHoverBorder: string;
  hoverDivider: string;
  glow: string;
};

const TEAM_ACCENTS: Record<string, TeamAccent> = {
  "High School Musical": {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    chip: "bg-amber-100 text-amber-700",
    ring: "border-amber-200",
    avatarBg: "bg-gradient-to-br from-amber-200 to-amber-400 text-white",
    selfHoverBg: "hover:bg-amber-50/70",
    selfHoverShadow: "hover:shadow-[0_20px_60px_-15px_rgba(245,158,11,0.25)]",
    selfHoverBorder: "hover:border-amber-300",
    hoverDivider: "group-hover:border-amber-400",
    glow: "from-amber-200/0 via-amber-200/40 to-amber-200/0",
  },
  "Phineas & Ferb": {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
    chip: "bg-orange-100 text-orange-700",
    ring: "border-orange-200",
    avatarBg: "bg-gradient-to-br from-orange-300 to-orange-500 text-white",
    selfHoverBg: "hover:bg-orange-50/70",
    selfHoverShadow: "hover:shadow-[0_20px_60px_-15px_rgba(249,115,22,0.25)]",
    selfHoverBorder: "hover:border-orange-300",
    hoverDivider: "group-hover:border-orange-400",
    glow: "from-orange-200/0 via-orange-200/40 to-orange-200/0",
  },
  "Emily in Paris": {
    bg: "bg-pink-50",
    text: "text-pink-600",
    border: "border-pink-200",
    chip: "bg-pink-100 text-pink-600",
    ring: "border-pink-200",
    avatarBg: "bg-gradient-to-br from-pink-300 to-pink-500 text-white",
    selfHoverBg: "hover:bg-pink-50/70",
    selfHoverShadow: "hover:shadow-[0_20px_60px_-15px_rgba(236,72,153,0.25)]",
    selfHoverBorder: "hover:border-pink-300",
    hoverDivider: "group-hover:border-pink-400",
    glow: "from-pink-200/0 via-pink-200/40 to-pink-200/0",
  },
};

// Pink iMessage-style bubble — Elle is the narrator
function ElleBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-pink-100 text-pink-900 text-[11px] leading-snug px-3 py-1.5 rounded-2xl rounded-bl-md inline-block max-w-md">
      {children}
    </div>
  );
}

// Gray bubble — agent's own description
function AgentBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-100 text-gray-600 text-[11px] leading-snug px-3 py-1.5 rounded-2xl rounded-tl-md inline-block max-w-md">
      {children}
    </div>
  );
}

export default async function AgentsPage() {
  const data = await getAgents();
  const elle = data.topLevel;

  return (
    <main>
      {/* HEADER */}
      <section
        className="px-6 pt-16 pb-12 relative overflow-hidden"
        style={{
          background: "#fdf2f8",
          backgroundImage: "radial-gradient(circle, #f9a8d4 1.5px, transparent 1.5px)",
          backgroundSize: "22px 22px",
        }}
      >
        <div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-40 pointer-events-none"
          style={{ background: "radial-gradient(circle, #fbcfe8 0%, transparent 70%)" }}
        />
        <div className="max-w-3xl mx-auto relative">
          <p className="text-[10px] tracking-[0.3em] uppercase text-pink-400 font-medium mb-3 text-center">
            The Cast
          </p>
          <h1
            className="text-center text-5xl md:text-6xl font-bold text-black leading-[0.95] mb-3"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Your <span className="italic text-pink-400">agents.</span>
          </h1>
          <p
            className="text-center text-gray-500 text-sm italic max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Elle's introducing the team. Three crews, one chief of staff.
          </p>
        </div>
      </section>

      {/* CHAT THREAD */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Elle thread header */}
          <div className="flex flex-col items-center mb-8 pb-6 border-b border-gray-100">
            <AgentAvatar
              name={elle.name}
              src={elle.image}
              size={64}
              ringColor="border-pink-200"
              bg="bg-pink-100 text-pink-600"
            />
            <p
              className="text-2xl font-bold text-black mt-3"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {elle.name}
            </p>
            <p className="text-[10px] tracking-[0.25em] uppercase text-pink-400 font-medium mt-1">
              Chief of Staff · Active now
            </p>
          </div>

          {/* Elle introduces herself */}
          <div className="space-y-2 mb-3">
            <div className="flex items-end gap-2">
              <AgentAvatar
                name={elle.name}
                src={elle.image}
                size={24}
                ringColor="border-pink-200"
                bg="bg-pink-100 text-pink-600"
              />
              <ElleBubble>hi! 💕 let me walk you through your team.</ElleBubble>
            </div>
            <div className="flex items-end gap-2 pl-8">
              <ElleBubble>{elle.role.toLowerCase()}.</ElleBubble>
            </div>
            <div className="pl-8 flex flex-wrap gap-2 pt-1">
              {elle.telegram && (
                <a
                  href={elle.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white px-3 py-1 rounded-full text-[9px] tracking-[0.2em] uppercase font-semibold hover:bg-pink-400 transition-colors"
                >
                  Telegram ↗
                </a>
              )}
              {elle.docs.map((d) => (
                <a
                  key={d.url}
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-pink-200 text-pink-500 px-3 py-1 rounded-full text-[9px] tracking-[0.2em] uppercase font-semibold hover:border-pink-400 hover:bg-pink-50 transition-colors"
                >
                  {d.label} ↗
                </a>
              ))}
            </div>
          </div>

          {/* Each team as a thread chunk */}
          {data.teams.map((team) => {
            const accent = TEAM_ACCENTS[team.name] || TEAM_ACCENTS["Emily in Paris"];
            return (
              <div
                key={team.name}
                className={`group mt-6 px-5 py-6 -mx-5 rounded-3xl border border-transparent transition-all duration-500 ease-out hover:-translate-y-0.5 ${accent.selfHoverBg} ${accent.selfHoverShadow} ${accent.selfHoverBorder} relative overflow-hidden`}
              >
                {/* Animated shimmer that sweeps on hover */}
                <span
                  className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r ${accent.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                {/* Team divider — arch */}
                <div className="flex items-center justify-center gap-3 mb-5">
                  <span
                    className={`h-px flex-1 ${accent.border} ${accent.hoverDivider} border-t transition-colors duration-500`}
                  />
                  <div className="text-center transition-transform duration-500 group-hover:scale-105">
                    <p
                      className={`text-[9px] tracking-[0.3em] uppercase font-bold ${accent.text} transition-all duration-500 group-hover:tracking-[0.4em]`}
                    >
                      Team
                    </p>
                    <h3
                      className="text-xl font-bold text-black leading-none mt-0.5"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {team.name}
                    </h3>
                  </div>
                  <span
                    className={`h-px flex-1 ${accent.border} ${accent.hoverDivider} border-t transition-colors duration-500`}
                  />
                </div>

                {/* Elle's intro to the team */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-end gap-2">
                    <AgentAvatar
                      name={elle.name}
                      src={elle.image}
                      size={24}
                      ringColor="border-pink-200"
                      bg="bg-pink-100 text-pink-600"
                    />
                    <ElleBubble>{team.tagline.toLowerCase()}.</ElleBubble>
                  </div>
                  <div className="flex items-end gap-2 pl-8">
                    <ElleBubble>
                      <span className="font-semibold">{team.orchestrator.name}</span> is your
                      orchestrator ⭐
                    </ElleBubble>
                  </div>
                </div>

                {/* Orchestrator card */}
                <div className="ml-8 mb-4 flex items-start gap-2.5 group/row transition-transform duration-300 hover:translate-x-1">
                  <div className="transition-transform duration-300 group-hover/row:scale-110">
                    <AgentAvatar
                      name={team.orchestrator.name}
                      src={team.orchestrator.image}
                      size={32}
                      ringColor={accent.ring}
                      bg={accent.avatarBg}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-xs font-bold text-black leading-none mb-1"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {team.orchestrator.name}
                    </p>
                    <AgentBubble>{team.orchestrator.role}</AgentBubble>
                    {team.orchestrator.telegram && (
                      <div className="mt-1.5">
                        <a
                          href={team.orchestrator.telegram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-black text-white px-2.5 py-0.5 rounded-full text-[8px] tracking-[0.2em] uppercase font-semibold hover:bg-pink-400 transition-colors"
                        >
                          Telegram ↗
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Crew intro bubble */}
                <div className="flex items-end gap-2 mb-3">
                  <AgentAvatar
                    name={elle.name}
                    src={elle.image}
                    size={24}
                    ringColor="border-pink-200"
                    bg="bg-pink-100 text-pink-600"
                  />
                  <ElleBubble>
                    and the crew · {team.members.length} {team.members.length === 1 ? "agent" : "agents"}
                  </ElleBubble>
                </div>

                {/* Members as chat rows */}
                <div className="ml-8 space-y-2.5">
                  {team.members.map((m) => (
                    <div
                      key={m.name}
                      className="flex items-start gap-2.5 group/row rounded-xl px-2 py-1.5 -mx-2 transition-all duration-300 hover:translate-x-1 hover:bg-white/60"
                    >
                      <div className="transition-transform duration-300 group-hover/row:scale-110 group-hover/row:rotate-[-3deg]">
                        <AgentAvatar
                          name={m.name}
                          src={m.image}
                          size={28}
                          ringColor={accent.ring}
                          bg={accent.avatarBg}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-[11px] font-bold text-black leading-none mb-1"
                          style={{ fontFamily: "var(--font-playfair)" }}
                        >
                          {m.name}
                        </p>
                        <AgentBubble>{m.role}</AgentBubble>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Team docs */}
                {team.docs.length > 0 && (
                  <div className="ml-8 mt-4 flex flex-wrap gap-1.5">
                    {team.docs.map((d) =>
                      d.url === "#" ? (
                        <span
                          key={d.label}
                          className={`text-[8px] tracking-[0.2em] uppercase font-semibold px-2.5 py-0.5 rounded-full border ${accent.border} ${accent.text} opacity-50 italic`}
                        >
                          {d.label}
                        </span>
                      ) : (
                        <a
                          key={d.label}
                          href={d.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-[8px] tracking-[0.2em] uppercase font-semibold px-2.5 py-0.5 rounded-full border ${accent.border} ${accent.text} hover:bg-white transition-colors`}
                        >
                          {d.label} ↗
                        </a>
                      )
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Footer note */}
          <p
            className="text-center text-[10px] text-gray-400 italic mt-10"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Edit the cast in <span className="text-pink-400">data/admin/agents.json</span>
          </p>
        </div>
      </section>
    </main>
  );
}
