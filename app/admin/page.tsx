import {
  getFlagships,
  getRevenue,
  getJobs,
  getProjects,
  getDashboards,
  getQuickLinks,
} from "@/lib/admin-data";
import { getCourseRevenue } from "@/lib/stripe-revenue";
import { RevenueWidget } from "./_components/RevenueWidget";
import { NotesScratchpad } from "./_components/NotesScratchpad";
import { DomainHealth } from "./_components/DomainHealth";
import { Reveal } from "./_components/Reveal";
import { Sparkles } from "./_components/Sparkles";
import { CardTilt } from "./_components/CardTilt";
import { ConfettiOnMount } from "./_components/ConfettiOnMount";
import { ElleBriefing } from "./_components/ElleBriefing";
import { RevenueSparkline } from "./_components/RevenueSparkline";
import { CommitsFeed } from "./_components/CommitsFeed";
import { QuickAdd } from "./_components/QuickAdd";
import { StarToggle } from "./_components/StarToggle";
import Link from "next/link";

const STATUS_STYLES: Record<string, string> = {
  ACTIVE: "bg-pink-400 text-white",
  ONGOING: "bg-pink-200 text-pink-700",
  PLANNED: "bg-pink-50 text-pink-500 border border-pink-200",
};

const PROJECT_STATUS_STYLES: Record<string, string> = {
  shipped: "text-green-600 bg-green-50",
  live: "text-green-600 bg-green-50",
  running: "text-green-600 bg-green-50",
  "in progress": "text-pink-500 bg-pink-50",
  "handed off": "text-gray-400 bg-gray-50",
  dormant: "text-gray-400 bg-gray-50",
};

export default async function AdminHome() {
  const [flagships, revenue, jobs, projects, dashboards, quicklinks, courseRevenue] = await Promise.all([
    getFlagships(),
    getRevenue(),
    getJobs(),
    getProjects(),
    getDashboards(),
    getQuickLinks(),
    getCourseRevenue(),
  ]);

  // Merge live Stripe revenue into the course line so totals reflect reality.
  if (courseRevenue.source === "live") {
    const idx = revenue.paid.findIndex(p => p.kind === "course");
    const liveLine = {
      source: "Ayla Unlocked — course",
      kind: "course",
      amount: Math.max(0, Math.round(courseRevenue.netCents / 100)),
      date: new Date().toISOString().slice(0, 10),
      note: `${courseRevenue.customers} paying customer${courseRevenue.customers === 1 ? "" : "s"} · live from Stripe (net of fees + refunds)`,
      live: true,
    };
    if (idx >= 0) revenue.paid[idx] = { ...revenue.paid[idx], ...liveLine };
    else revenue.paid.push(liveLine);
  }

  const now = new Date().toLocaleString("en-US", {
    weekday: "long", month: "long", day: "numeric",
  });

  const paidTotal = revenue.paid.reduce((s, p) => s + p.amount, 0);

  return (
    <main>
      <ConfettiOnMount totalPaid={paidTotal} />
      {/* ── HERO ARCH ────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative overflow-hidden px-6 pt-16 pb-24"
        style={{
          background: "#fdf2f8",
          backgroundImage: "radial-gradient(circle, #f9a8d4 1.5px, transparent 1.5px)",
          backgroundSize: "22px 22px",
        }}
      >
        <Sparkles />
        {/* Decorative blobs */}
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-40 pointer-events-none"
          style={{ background: "radial-gradient(circle, #f9a8d4 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-40 pointer-events-none"
          style={{ background: "radial-gradient(circle, #fbcfe8 0%, transparent 70%)" }}
        />

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-2">
            <p className="text-xs tracking-[0.35em] uppercase text-pink-400 font-medium">
              {now} · Hi Ayla
            </p>
          </div>
          <h1
            className="text-center text-6xl md:text-7xl font-bold text-black leading-[0.95] mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Master <span className="italic text-pink-400">Dashboard.</span>
          </h1>
          <p
            className="text-center text-gray-500 text-lg italic mb-16 max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Everything you&apos;ve built. Everything in flight. One door each.
          </p>

          {/* The arch — three doorways */}
          <div className="grid md:grid-cols-3 gap-6 items-end">
            {flagships.map((f, i) => {
              const middle = i === 1;
              return (
                <div
                  key={f.key}
                  className="relative"
                  style={{
                    marginTop: middle ? -32 : 0,
                  }}
                >
                  {/* Sparkles around the middle arch */}
                  {middle && (
                    <>
                      <span className="absolute -top-8 left-4 text-pink-300 text-2xl pointer-events-none z-10"
                        style={{ animation: "sparkle 3.5s ease-in-out 0.4s infinite" }}>✦</span>
                      <span className="absolute -top-12 right-8 text-yellow-300 text-xl pointer-events-none z-10"
                        style={{ animation: "sparkle 3.5s ease-in-out 0.9s infinite" }}>✦</span>
                      <span className="absolute -top-4 right-2 text-pink-400 text-lg pointer-events-none z-10"
                        style={{ animation: "sparkle 3.5s ease-in-out 1.4s infinite" }}>✦</span>
                    </>
                  )}

                  <CardTilt
                    max={14}
                    className="bg-white border border-pink-100 shadow-2xl overflow-hidden h-full"
                    style={{
                      borderTopLeftRadius: "200px",
                      borderTopRightRadius: "200px",
                      borderBottomLeftRadius: "24px",
                      borderBottomRightRadius: "24px",
                    }}
                  >
                    {/* Pink header band on top of arch */}
                    <div
                      className={`px-8 pt-16 pb-8 text-center ${
                        middle ? "bg-pink-400 text-white" : "bg-pink-50 text-pink-500"
                      }`}
                    >
                      <p className={`text-[10px] tracking-[0.3em] uppercase font-bold mb-3 ${middle ? "text-white/80" : "text-pink-400"}`}>
                        ● {f.stat.label}: {f.stat.value}
                      </p>
                      <h2
                        className={`text-3xl md:text-4xl font-bold leading-tight mb-2 ${middle ? "text-white" : "text-black"}`}
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {f.name}
                      </h2>
                      <p
                        className={`italic text-sm ${middle ? "text-white/90" : "text-pink-400"}`}
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        {f.tagline}
                      </p>
                    </div>

                    {/* Body */}
                    <div className="p-7">
                      <p className="text-xs text-gray-400 tracking-widest uppercase text-center mb-6 leading-relaxed">
                        {f.subtitle}
                      </p>

                      <div className="space-y-2.5">
                        <a
                          href={f.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between bg-black text-white px-5 py-3 rounded-full text-xs font-semibold tracking-widest uppercase hover:bg-pink-400 transition-colors"
                        >
                          <span>Visit Site</span>
                          <span className="text-pink-300 group-hover:text-white">↗</span>
                        </a>
                        {f.dashboard.startsWith("/") ? (
                          <Link
                            href={f.dashboard}
                            className="group flex items-center justify-between bg-pink-50 text-pink-500 px-5 py-3 rounded-full text-xs font-semibold tracking-widest uppercase hover:bg-pink-400 hover:text-white transition-colors border border-pink-200"
                          >
                            <span>Dashboard</span>
                            <span>→</span>
                          </Link>
                        ) : (
                          <a
                            href={f.dashboard}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between bg-pink-50 text-pink-500 px-5 py-3 rounded-full text-xs font-semibold tracking-widest uppercase hover:bg-pink-400 hover:text-white transition-colors border border-pink-200"
                          >
                            <span>Dashboard</span>
                            <span>↗</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </CardTilt>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ELLE BRIEFING ───────────────────────────────────── */}
      <ElleBriefing />

      {/* ── QUICK LAUNCH BAR ────────────────────────────────── */}
      <section className="bg-black px-6 py-6 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3 justify-center">
          <span className="text-pink-300 text-[10px] font-semibold tracking-[0.3em] uppercase mr-3">
            ⚡ Quick Launch
          </span>
          {quicklinks.map(q => (
            <a
              key={q.name}
              href={q.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-zinc-700 text-gray-300 px-4 py-2 rounded-full text-[11px] tracking-[0.18em] uppercase hover:border-pink-400 hover:text-pink-400 transition-colors"
            >
              {q.name} ↗
            </a>
          ))}
        </div>
      </section>

      {/* ── REVENUE ─────────────────────────────────────────── */}
      <section id="money" className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-pink-400 font-medium mb-4">Money</p>
          <h2
            className="text-5xl md:text-6xl font-bold text-black leading-[1.05] mb-12 max-w-3xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Total <span className="italic text-pink-400">revenue.</span>
          </h2>
          <RevenueWidget revenue={revenue} />
        </div>
      </section>

      {/* ── ACTIVE JOBS ─────────────────────────────────────── */}
      <section id="jobs" className="bg-pink-50 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-pink-400 font-medium mb-4">In Flight</p>
          <h2
            className="text-5xl md:text-6xl font-bold text-black leading-[1.05] mb-12 max-w-3xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Active <span className="italic text-pink-400">jobs.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {jobs.map(j => (
              <div
                key={j.title}
                className="bg-white rounded-3xl overflow-hidden border border-pink-100 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-pink-200 transition-all duration-300 flex flex-col"
              >
                <div className={`px-5 py-2.5 flex justify-between items-center text-[10px] font-bold tracking-[0.25em] uppercase ${STATUS_STYLES[j.status] || "bg-gray-100 text-gray-500"}`}>
                  <span>● {j.status}</span>
                  <span className="opacity-80">{j.priority}</span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-gray-500 tracking-widest uppercase">{j.client} · {j.team}</p>
                    <StarToggle id={`job-${j.title}`} />
                  </div>
                  <h3
                    className="text-xl font-bold text-black mb-4 leading-tight"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {j.title}
                  </h3>
                  <div className="border-t border-pink-50 pt-4 mt-auto">
                    <p className="text-[11px] tracking-[0.18em] uppercase text-pink-400 font-semibold mb-1">Next</p>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">{j.next}</p>
                    <p className="text-[11px] tracking-[0.18em] uppercase text-gray-500">Due · {j.due}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick add a job draft */}
          <div className="mt-8 max-w-2xl mx-auto">
            <QuickAdd
              storageKey="jobs"
              label="Job"
              placeholder="New thing to ship — describe it…"
            />
          </div>
        </div>
      </section>

      {/* ── OTHER DASHBOARDS ────────────────────────────────── */}
      <section id="subdash" className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-pink-400 font-medium mb-4">Sub-Dashboards</p>
          <h2
            className="text-5xl md:text-6xl font-bold text-black leading-[1.05] mb-4 max-w-3xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            All your <span className="italic text-pink-400">dashboards.</span>
          </h2>
          <p className="text-gray-500 text-base italic mb-12 max-w-xl"
            style={{ fontFamily: "var(--font-playfair)" }}>
            Doors into every other admin you&apos;ve built — pull contracts, proposals, members, spend from here.
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {dashboards.map(d => (
              <a
                key={d.name}
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white border border-pink-100 rounded-3xl p-7 hover:shadow-xl hover:border-pink-300 transition-all flex flex-col"
              >
                <div className="flex justify-between items-start gap-4 mb-3">
                  <h3
                    className="text-2xl font-bold text-black group-hover:text-pink-400 transition-colors leading-tight"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {d.name}
                  </h3>
                  <span className="text-pink-400 text-xl">↗</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">{d.purpose}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {d.owns.map(tag => (
                    <span
                      key={tag}
                      className="text-[11px] tracking-[0.18em] uppercase text-pink-500 border border-pink-200 px-3 py-1 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALL OTHER PROJECTS ──────────────────────────────── */}
      <section id="projects" className="bg-pink-50 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-pink-400 font-medium mb-4">Everything Else</p>
          <h2
            className="text-5xl md:text-6xl font-bold text-black leading-[1.05] mb-12 max-w-3xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            All other <span className="italic text-pink-400">projects.</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map(p => (
              <div
                key={p.id}
                className="bg-white rounded-3xl border border-pink-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-pink-200 transition-all duration-300 flex flex-col"
              >
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-[11px] tracking-[0.18em] uppercase text-gray-300 font-mono">{p.id}</span>
                  <span className={`text-[11px] tracking-[0.18em] uppercase font-semibold px-2.5 py-1 rounded-full ${PROJECT_STATUS_STYLES[p.status] || "text-gray-400 bg-gray-50"}`}>
                    {p.status}
                  </span>
                </div>
                <h3
                  className="text-xl font-bold text-black mb-2 leading-tight"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {p.name}
                </h3>
                <p className="text-sm text-gray-500 mb-5 flex-1">{p.purpose}</p>
                <div className="flex flex-wrap gap-2">
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer"
                      className="text-[11px] tracking-[0.18em] uppercase border border-pink-300 text-pink-500 px-3 py-1.5 rounded-full hover:bg-pink-400 hover:text-white hover:border-pink-400 transition-colors">
                      Live ↗
                    </a>
                  )}
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer"
                      className="text-[11px] tracking-[0.18em] uppercase border border-gray-200 text-gray-500 px-3 py-1.5 rounded-full hover:border-black hover:text-black transition-colors">
                      GitHub ↗
                    </a>
                  )}
                  {p.vercel && (
                    <a href={p.vercel} target="_blank" rel="noopener noreferrer"
                      className="text-[11px] tracking-[0.18em] uppercase border border-gray-200 text-gray-500 px-3 py-1.5 rounded-full hover:border-black hover:text-black transition-colors">
                      Vercel ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXTRAS GRID ─────────────────────────────────────── */}
      <section id="pulse" className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-pink-400 font-medium mb-4">Pulse</p>
          <h2
            className="text-5xl md:text-6xl font-bold text-black leading-[1.05] mb-12 max-w-3xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            What&apos;s <span className="italic text-pink-400">happening.</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Course revenue sparkline */}
            {courseRevenue.source === "live" && (
              <RevenueSparkline daily={courseRevenue.daily} />
            )}

            {/* Recent commits */}
            <CommitsFeed />

            {/* TikTok metrics */}
            <a
              href="https://tiktok.com/@aylablumberg.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden"
            >
              <div className="bg-gradient-to-br from-pink-400 to-pink-500 px-6 py-3 flex justify-between items-center">
                <span className="text-white text-[10px] font-bold tracking-[0.25em] uppercase">● TikTok</span>
                <span className="text-white/80 text-[9px] tracking-widest uppercase">@aylablumberg.ai ↗</span>
              </div>
              <div className="p-6 grid grid-cols-2 gap-4">
                <div>
                  <p
                    className="text-4xl font-bold text-black leading-none mb-1 group-hover:text-pink-400 transition-colors"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    7K+
                  </p>
                  <p className="text-[11px] tracking-[0.18em] uppercase text-gray-400">Followers</p>
                </div>
                <div>
                  <p
                    className="text-4xl font-bold text-black leading-none mb-1 group-hover:text-pink-400 transition-colors"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    6M+
                  </p>
                  <p className="text-[11px] tracking-[0.18em] uppercase text-gray-400">Total Views</p>
                </div>
                <div className="col-span-2 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500 italic"
                    style={{ fontFamily: "var(--font-playfair)" }}>
                    Tap to open TikTok analytics. Update these in the page when you check.
                  </p>
                </div>
              </div>
            </a>

            {/* Cost dashboard */}
            <a
              href="https://ayla-cost-dashboard.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden"
            >
              <div className="bg-black px-6 py-3 flex justify-between items-center">
                <span className="text-pink-300 text-[10px] font-bold tracking-[0.25em] uppercase">● Spend</span>
                <span className="text-white/50 text-[9px] tracking-widest uppercase">cost dashboard ↗</span>
              </div>
              <div className="p-6">
                <p
                  className="text-2xl font-bold text-black leading-tight mb-3 group-hover:text-pink-400 transition-colors"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Anthropic + infra
                </p>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  Live API + infra spend across every project. Keep an eye on Elle and the HSM pipeline — they burn the most.
                </p>
                <span className="text-[11px] tracking-[0.18em] uppercase text-pink-400 font-semibold">
                  Open dashboard →
                </span>
              </div>
            </a>

            {/* Domain health */}
            <DomainHealth />
          </div>
        </div>
      </section>

      {/* ── NOTES ───────────────────────────────────────────── */}
      <section id="notes" className="bg-pink-50 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-pink-400 font-medium mb-4">For Your Eyes Only</p>
          <h2
            className="text-5xl md:text-6xl font-bold text-black leading-[1.05] mb-4 max-w-3xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Brain <span className="italic text-pink-400">dump.</span>
          </h2>
          <p className="text-gray-500 italic mb-10 max-w-xl"
            style={{ fontFamily: "var(--font-playfair)" }}>
            Saves to your browser only. Never leaves this machine.
          </p>
          <NotesScratchpad />
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="bg-black px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-zinc-600 tracking-widest uppercase">© 2026 Ayla Blumberg · Master Dashboard</span>
        <span className="text-pink-400 text-sm italic"
          style={{ fontFamily: "var(--font-playfair)" }}>
          Investing in people. Building in real estate.
        </span>
        <Link
          href="/"
          className="text-xs text-zinc-600 tracking-widest uppercase hover:text-pink-400 transition-colors"
        >
          ← Public Site
        </Link>
      </footer>
    </main>
  );
}
