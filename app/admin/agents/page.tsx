import { getAgents } from "@/lib/admin-data";

const TEAM_ACCENTS: Record<string, { bg: string; text: string; border: string; chip: string }> = {
  "High School Musical": {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    chip: "bg-amber-100 text-amber-700",
  },
  "Phineas & Ferb": {
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
    chip: "bg-orange-100 text-orange-700",
  },
  "Emily in Paris": {
    bg: "bg-pink-50",
    text: "text-pink-600",
    border: "border-pink-200",
    chip: "bg-pink-100 text-pink-600",
  },
};

export default async function AgentsPage() {
  const data = await getAgents();
  const elle = data.topLevel;

  return (
    <main>
      {/* HEADER */}
      <section
        className="px-6 pt-20 pb-16 relative overflow-hidden"
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
        <div className="max-w-7xl mx-auto relative">
          <p className="text-xs tracking-[0.3em] uppercase text-pink-400 font-medium mb-4 text-center">
            The Cast
          </p>
          <h1
            className="text-center text-6xl md:text-7xl font-bold text-black leading-[0.95] mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Your <span className="italic text-pink-400">agents.</span>
          </h1>
          <p
            className="text-center text-gray-500 text-lg italic max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Three teams, one chief of staff. Everyone knows their lane.
          </p>
        </div>
      </section>

      {/* ELLE — TOP LEVEL */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-pink-400 font-medium mb-3">
              Chief of Staff
            </p>
            <p className="text-gray-500 italic"
              style={{ fontFamily: "var(--font-playfair)" }}>
              The one above everything. Reports up to you.
            </p>
          </div>

          <div className="bg-white border-2 border-pink-300 rounded-3xl shadow-2xl overflow-hidden relative">
            {/* Sparkles */}
            <span className="absolute top-4 left-6 text-pink-300 text-xl pointer-events-none"
              style={{ animation: "sparkle 3.5s ease-in-out 0.3s infinite" }}>✦</span>
            <span className="absolute top-6 right-8 text-yellow-300 text-lg pointer-events-none"
              style={{ animation: "sparkle 3.5s ease-in-out 0.9s infinite" }}>✦</span>

            <div className="bg-gradient-to-br from-pink-400 to-pink-500 px-8 py-10 text-center text-white">
              <p className="text-[10px] tracking-[0.3em] uppercase font-bold opacity-80 mb-3">● Always on</p>
              <h2
                className="text-5xl md:text-6xl font-bold leading-none mb-2"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {elle.name}
              </h2>
              <p className="italic text-base mt-3 max-w-md mx-auto"
                style={{ fontFamily: "var(--font-playfair)" }}>
                {elle.role}
              </p>
            </div>
            <div className="p-7 flex flex-wrap gap-3 justify-center">
              {elle.telegram && (
                <a href={elle.telegram} target="_blank" rel="noopener noreferrer"
                  className="bg-black text-white px-5 py-2.5 rounded-full text-[10px] tracking-[0.25em] uppercase font-semibold hover:bg-pink-400 transition-colors">
                  Telegram ↗
                </a>
              )}
              {elle.docs.map(d => (
                <a key={d.url} href={d.url} target="_blank" rel="noopener noreferrer"
                  className="border border-pink-200 text-pink-500 px-5 py-2.5 rounded-full text-[10px] tracking-[0.25em] uppercase font-semibold hover:border-pink-400 hover:bg-pink-50 transition-colors">
                  {d.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TEAMS */}
      <section className="bg-pink-50 py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-pink-400 font-medium mb-3">
              The Teams
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold text-black"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Each team has{" "}
              <span className="italic text-pink-400">one orchestrator.</span>
            </h2>
          </div>

          {data.teams.map(team => {
            const accent = TEAM_ACCENTS[team.name] || TEAM_ACCENTS["Emily in Paris"];
            return (
              <div
                key={team.name}
                className={`bg-white rounded-3xl overflow-hidden shadow-lg border ${accent.border}`}
              >
                {/* Team header */}
                <div className={`${accent.bg} px-8 py-6 border-b ${accent.border}`}>
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
                    <div>
                      <p className={`text-[10px] tracking-[0.3em] uppercase font-bold ${accent.text} mb-2`}>
                        ● Team
                      </p>
                      <h3
                        className="text-3xl md:text-4xl font-bold text-black leading-none"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {team.name}
                      </h3>
                      <p className="text-gray-600 italic mt-2 text-sm md:text-base"
                        style={{ fontFamily: "var(--font-playfair)" }}>
                        {team.tagline}
                      </p>
                    </div>
                    {team.docs.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {team.docs.map(d => (
                          d.url === "#" ? (
                            <span
                              key={d.label}
                              className={`text-[10px] tracking-widest uppercase font-semibold px-3 py-1.5 rounded-full border ${accent.border} ${accent.text} opacity-50 italic`}
                            >
                              {d.label}
                            </span>
                          ) : (
                            <a key={d.label} href={d.url} target="_blank"
                              rel="noopener noreferrer"
                              className={`text-[10px] tracking-widest uppercase font-semibold px-3 py-1.5 rounded-full border ${accent.border} ${accent.text} hover:bg-white transition-colors`}>
                              {d.label} ↗
                            </a>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Orchestrator highlighted */}
                <div className="p-7 border-b border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-center gap-5">
                    <div className={`${accent.chip} rounded-2xl px-6 py-5 md:w-64 shrink-0`}>
                      <p className="text-[9px] tracking-[0.3em] uppercase font-bold mb-2">★ Orchestrator</p>
                      <p
                        className="text-3xl font-bold leading-none mb-1"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {team.orchestrator.name}
                      </p>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 leading-relaxed mb-3">
                        {team.orchestrator.role}
                      </p>
                      {team.orchestrator.telegram && (
                        <a href={team.orchestrator.telegram} target="_blank" rel="noopener noreferrer"
                          className="inline-block bg-black text-white px-4 py-2 rounded-full text-[10px] tracking-[0.25em] uppercase font-semibold hover:bg-pink-400 transition-colors">
                          Telegram ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Members grid */}
                <div className="p-7">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 font-bold mb-5">
                    Crew · {team.members.length}
                  </p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {team.members.map(m => (
                      <div
                        key={m.name}
                        className="border border-gray-100 rounded-2xl p-5 hover:border-pink-200 hover:bg-pink-50/30 transition-colors"
                      >
                        <p
                          className="text-xl font-bold text-black mb-1 leading-none"
                          style={{ fontFamily: "var(--font-playfair)" }}
                        >
                          {m.name}
                        </p>
                        <p className="text-sm text-gray-500 leading-snug">{m.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          <p className="text-center text-xs text-gray-400 italic"
            style={{ fontFamily: "var(--font-playfair)" }}>
            Edit the cast in <span className="text-pink-400">data/admin/agents.json</span>
          </p>
        </div>
      </section>
    </main>
  );
}
