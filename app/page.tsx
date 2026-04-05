"use client";

import { useState, useEffect, useRef } from "react";

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── SPARKLES ──────────────────────────────────────────── */
const SPARKS = [
  { x: "55%", y: "-10%", color: "#f9a8d4", delay: "0.6s",  size: 26 },
  { x: "88%", y: "-6%",  color: "#fef08a", delay: "1.1s",  size: 28 },
  { x: "-2%", y: "38%",  color: "#fef08a", delay: "0.3s",  size: 24 },
  { x: "96%", y: "32%",  color: "#f9a8d4", delay: "0.9s",  size: 22 },
  { x: "10%", y: "108%", color: "#fef08a", delay: "0.5s",  size: 26 },
  { x: "70%", y: "105%", color: "#f9a8d4", delay: "1.4s",  size: 20 },
  { x: "94%", y: "85%",  color: "#fef08a", delay: "0.2s",  size: 30 },
  { x: "-3%", y: "75%",  color: "#f9a8d4", delay: "1.7s",  size: 22 },
  { x: "78%", y: "-14%", color: "#fbbf24", delay: "1.2s",  size: 20 },
];

function NameSparkles({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {SPARKS.map((s, i) => (
        <span
          key={i}
          className="absolute pointer-events-none select-none"
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
      {children}
    </div>
  );
}

/* ─── BARCODE ───────────────────────────────────────────── */
function Barcode() {
  const bars = [2,1,3,1,2,2,1,3,1,1,2,1,3,2,1,2,2,1,3,1,1,2,3,1,2,1,1,3,2,1,2,1,3,1,2];
  return (
    <div className="flex items-end gap-[1.5px] h-8 justify-center">
      {bars.map((w, i) => (
        <div
          key={i}
          className="bg-gray-700"
          style={{ width: `${w * 2}px`, height: i % 4 === 0 ? "100%" : i % 2 === 0 ? "80%" : "65%" }}
        />
      ))}
    </div>
  );
}

/* ─── DATA ─────────────────────────────────────────────── */

const TICKER =
  "TEXAS REAL ESTATE LICENSE · IN PROGRESS · UNIVERSITY OF TEXAS · FALL 2026 · PUBLISHED AUTHOR · CONTENT CREATOR · DALLAS → AUSTIN · SALUTATORIAN · 200-HR YOGA CERTIFIED · ";

const skills = [
  {
    title: "Real Estate",
    desc: "Passed my Texas real estate exam in April 2026. I'm building a career in real estate with a deep focus on client relationships, market knowledge, and long-term investment strategy.",
  },
  {
    title: "Brand & Web Design",
    desc: "Built websites and visual identities from scratch — including a full site for Design List Collective. I translate a founder's vision into a platform people actually feel.",
    link: { label: "designlistcollective.com", href: "https://designlistcollective.com/" },
  },
  {
    title: "Content Creation & Editing",
    desc: "TikTok editing, storytelling, and content strategy. I understand how to make content that connects with a Gen Z audience and builds a brand online.",
  },
  {
    title: "Writing & Storytelling",
    desc: "Published YA novel author. Words are my medium — whether it's a mystery novel, a caption, a pitch deck, or a brand narrative.",
  },
  {
    title: "Graphic Design",
    desc: "Designed for school clubs, events, and merchandise. STEM Honor Society member and go-to designer for anything visual.",
  },
  {
    title: "Client Experience & Leadership",
    desc: "5+ years in front-facing client roles across boutique fitness, luxury retail, and youth leadership. I know how to hold a room.",
  },
];

const pipeline = [
  {
    status: "ACTIVE",
    statusColor: "bg-pink-400 text-white",
    title: "Ayla Blumberg — Brand",
    sub: "Dallas, TX",
    desc: "Creative professional, content creator, and graphic designer. Available for opportunities.",
    detail: "Content · Branding · Design",
  },
  {
    status: "ACTIVE",
    statusColor: "bg-pink-400 text-white",
    title: "Texas Real Estate License",
    sub: "Dallas, TX",
    desc: "Licensed Texas real estate agent as of April 2026.",
    detail: "Residential · Investment · Luxury",
  },
  {
    status: "COMING SOON",
    statusColor: "bg-pink-100 text-pink-500",
    title: "University of Texas",
    sub: "Austin, TX",
    desc: "Enrolled and heading to UT Austin — Fall 2026.",
    detail: "Business · Real Estate · Networking",
  },
];

const experience = [
  { company: "Club Studio", role: "Front Desk & Cryotherapy Technician", period: "Jan 2026 – Present", location: "Dallas, TX" },
  { company: "Fortifying U", role: "Branding & Communications Intern", period: "Summer 2025", location: "Dallas, TX" },
  { company: "Strong Fitness", role: "Front Desk Manager & Party Host", period: "2022 – 2024", location: "Dallas, TX" },
  { company: "Camp Young Judea", role: "Counselor Leadership Training", period: "Summer 2024", location: "Wimberley, TX" },
  { company: "Favor the Kind", role: "Retail & Operations Intern", period: "Summer 2022", location: "Crested Butte, CO" },
];

/* ─── COMPONENTS ────────────────────────────────────────── */

function AnnouncementTicker() {
  const text = TICKER.repeat(6);
  return (
    <div className="bg-black overflow-hidden py-2.5 border-b border-zinc-800 whitespace-nowrap">
      <div className="animate-ticker whitespace-nowrap">
        <span className="text-pink-300 text-[10px] font-semibold tracking-[0.25em] uppercase">
          {text}
        </span>
      </div>
    </div>
  );
}

function Accordion() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-gray-100">
      {skills.map((s, i) => (
        <div key={s.title}>
          <button
            className="w-full flex justify-between items-center py-6 text-left group"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <div className="flex items-center gap-5">
              <span className="text-xs text-pink-400 font-semibold tracking-widest w-6">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="text-xl md:text-2xl font-bold text-black group-hover:text-pink-400 transition-colors"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {s.title}
              </span>
            </div>
            <span className="text-2xl text-gray-300 group-hover:text-pink-400 transition-colors font-light shrink-0 ml-4">
              {open === i ? "−" : "+"}
            </span>
          </button>
          {open === i && (
            <div className="pb-6 pl-11 max-w-2xl">
              <p className="text-gray-500 text-base leading-relaxed">{s.desc}</p>
              {"link" in s && s.link && (
                <a
                  href={(s.link as {label: string; href: string}).href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-sm text-pink-400 font-medium hover:text-pink-600 transition-colors"
                >
                  ↗ {(s.link as {label: string; href: string}).label}
                </a>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── PAGE ──────────────────────────────────────────────── */

export default function Home() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    await fetch("https://formspree.io/f/xzdjayyl", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });
    setSending(false);
    setSubmitted(true);
    form.reset();
  }

  return (
    <div className="font-sans">

      {/* ── ANNOUNCEMENT TICKER ── */}
      <AnnouncementTicker />

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-2.5"
          >
            <div
              className="w-8 h-8 rounded-full bg-pink-400 flex items-center justify-center shrink-0 shadow-sm"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              <span className="text-white text-sm font-bold tracking-tight">AB</span>
            </div>
            <span
              className="text-sm font-semibold tracking-[0.15em] uppercase text-pink-400"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Ayla Blumberg
            </span>
          </a>
          <div className="hidden sm:flex items-center gap-8 text-xs tracking-widest uppercase text-gray-400 font-medium">
            <a href="#about" className="hover:text-pink-400 transition-colors">About</a>
            <a href="#services" className="hover:text-pink-400 transition-colors">Services</a>
            <a href="#portfolio" className="hover:text-pink-400 transition-colors">Portfolio</a>
            <a
              href="#contact"
              className="bg-pink-400 text-white px-5 py-2 rounded-full hover:bg-pink-500 transition-colors"
            >
              Connect
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="bg-white min-h-screen flex items-start px-6 pt-6 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-[1fr_360px] gap-12 items-center">

          {/* Left: text */}
          <Reveal>
            <p className="text-xs tracking-[0.35em] uppercase text-gray-400 font-medium mb-8">
              Dallas, TX &nbsp;·&nbsp; Future Real Estate Agent
            </p>
            <NameSparkles>
              <h1
                className="font-bold leading-[0.88] tracking-tight text-black mb-6"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(5rem, 16vw, 13rem)",
                  opacity: 0,
                  animation: "name-appear 1s ease 0.1s forwards",
                }}
              >
                Ayla
              </h1>
              <h1
                className="font-bold leading-[0.88] tracking-tight mb-10"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(5rem, 16vw, 13rem)",
                  WebkitTextStroke: "2px black",
                  color: "transparent",
                  opacity: 0,
                  animation: "name-appear 1s ease 0.35s forwards",
                }}
              >
                Blumberg.
              </h1>
            </NameSparkles>
            <p
              className="text-lg text-gray-400 mb-10 italic max-w-md"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Creative. Author. The next great real estate agent.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#pipeline"
                className="bg-black text-white px-8 py-3.5 rounded-full text-sm font-medium tracking-wide hover:bg-pink-400 transition-colors"
              >
                What&apos;s in the Works
              </a>
              <a
                href="#portfolio"
                className="border border-gray-200 text-black px-8 py-3.5 rounded-full text-sm font-medium tracking-wide hover:border-pink-400 hover:text-pink-400 transition-colors"
              >
                View My Work
              </a>
            </div>
          </Reveal>

          {/* Right: MLS-style listing card */}
          <Reveal delay={150}>
          <div className="border border-black rounded-3xl overflow-hidden shadow-lg">
            <div className="bg-pink-400 px-6 py-4 flex justify-between items-center">
              <span className="text-white text-xs font-bold tracking-widest uppercase">● Active Listing</span>
              <span className="text-white/70 text-xs tracking-widest">MLS #2026</span>
            </div>
            <div className="bg-white px-6 py-6">
              <p className="text-xs text-gray-400 tracking-widest uppercase mb-1">Dallas → Austin, TX</p>
              <h3
                className="text-2xl font-bold text-black mb-1 leading-tight"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Ayla Blumberg
              </h3>
              <p className="text-pink-400 text-sm font-medium mb-5">Creative · Real Estate Professional</p>

              <div className="grid grid-cols-2 gap-3 border-t border-b border-gray-100 py-5 mb-5">
                {[
                  { label: "License", val: "Spring '26" },
                  { label: "Degree", val: "UT '30" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">{s.label}</p>
                    <p className="font-bold text-black text-sm">{s.val}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-6">
                {[
                  "Published YA Author",
                  "200-hr Yoga Certified",
                  "Brand & Web Designer",
                  "AP Scholar w/ Distinction",
                ].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400 shrink-0" />
                    {f}
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className="block w-full bg-black text-white text-center py-3 rounded-full text-sm font-medium tracking-wide hover:bg-pink-400 transition-colors"
              >
                Inquire
              </a>
            </div>
          </div>
          </Reveal>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <div className="bg-black py-14 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-3 md:grid-cols-5 gap-8 text-center">
          {[
            { num: "5+", label: "Years Experience" },
            { num: "200", label: "Hour Yoga Certified" },
            { num: "2026", label: "Real Estate License" },
            { num: "7K+", label: "Combined Followers" },
            { num: "6M+", label: "Total Views" },
          ].map((s) => (
            <div key={s.label}>
              <p
                className="text-4xl md:text-5xl font-bold text-white mb-1"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {s.num}
              </p>
              <p className="text-xs text-pink-400 tracking-widest uppercase font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section id="about" className="bg-white py-28 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div className="md:sticky md:top-28">
            <p className="text-xs tracking-[0.3em] uppercase text-pink-400 font-medium mb-6">About</p>
            <h2
              className="text-5xl md:text-6xl font-bold text-black leading-[1.05]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              I don&apos;t just create.<br />
              <span className="italic text-pink-400">I invest.</span>
            </h2>
          </div>
          <Reveal delay={100}>
          <div className="pt-2">
            <p className="text-gray-600 text-lg leading-relaxed mb-5">
              I&apos;m a Dallas-based creative who graduated as salutatorian of my class and I&apos;m heading to the University of Texas in Fall 2026.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-5">
              Real estate is where I&apos;m building my career — and I&apos;m approaching it the same way I approach
              everything: with creativity, strategy, and a relentless drive to connect with people.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              I&apos;m also a published YA author, 200-hour certified yoga instructor, and the designer behind
              every event, club, and campaign at my school. The common thread? I make things look and feel exactly right.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Published Author", "Salutatorian", "Yoga Instructor", "Graphic Designer", "AP Scholar", "Real Estate (in progress)"].map((tag) => (
                <span
                  key={tag}
                  className="border border-pink-200 text-pink-500 text-xs font-medium px-4 py-2 rounded-full tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          </Reveal>
        </div>
      </section>

      {/* ── PIPELINE ── */}
      <section id="pipeline" className="bg-pink-50 py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-pink-400 font-medium mb-6">In the Works</p>
          <h2
            className="text-5xl font-bold text-black mb-16 leading-tight max-w-xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            What&apos;s{" "}
            <span className="italic text-pink-400">in the works.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {pipeline.map((p, i) => (
              <Reveal key={p.title} delay={i * 400}>
              <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full">
                <div className={`px-6 py-3 flex justify-between items-center ${p.statusColor}`}>
                  <span className="text-xs font-bold tracking-widest uppercase">● {p.status}</span>
                </div>
                <div className="p-6">
                  <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">{p.sub}</p>
                  <h3
                    className="text-xl font-bold text-black mb-3 leading-tight"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5">{p.desc}</p>
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-xs text-pink-400 font-medium tracking-widest uppercase">{p.detail}</p>
                  </div>
                </div>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDITORIAL PULL QUOTE ── */}
      <div className="bg-black px-6 py-20 text-center overflow-hidden">
        <Reveal>
        <p
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-5xl mx-auto"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Investing in people.<br />
          <span className="italic text-pink-400">Building in real estate.</span>
        </p>
        </Reveal>
      </div>

      {/* ── SERVICES / SKILLS (ACCORDION) ── */}
      <section id="services" className="bg-white py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
            <div className="md:sticky md:top-28">
              <p className="text-xs tracking-[0.3em] uppercase text-pink-400 font-medium mb-6">What I Offer</p>
              <h2
                className="text-4xl md:text-5xl font-bold text-black leading-tight"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Where I{" "}
                <span className="italic text-pink-400">show up.</span>
              </h2>
            </div>
            <Reveal className="w-full"><Accordion /></Reveal>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="bg-black overflow-hidden py-4 border-y border-zinc-800">
        <div className="animate-ticker">
          <span className="text-pink-300 text-xs font-semibold tracking-[0.25em] uppercase">
            {TICKER.repeat(8)}
          </span>
        </div>
      </div>

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" className="bg-black py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-pink-400 font-medium mb-6">Portfolio</p>
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <h2
              className="text-5xl font-bold text-white leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The work{" "}
              <span className="italic text-pink-400">speaks.</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Content creation and editing — building a personal brand in real estate and creative work from the ground up.
            </p>
          </div>
          {/* Social stats + links */}
          <Reveal>
          <div className="flex flex-wrap justify-center gap-10 mb-16">
            <div className="text-center">
              <p className="text-5xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-playfair)" }}>7K+</p>
              <p className="text-xs text-pink-400 tracking-widest uppercase">Combined Followers</p>
            </div>
            <div className="w-px bg-zinc-800 hidden md:block" />
            <div className="text-center">
              <p className="text-5xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-playfair)" }}>6M+</p>
              <p className="text-xs text-pink-400 tracking-widest uppercase">Total Views</p>
            </div>
            <div className="w-px bg-zinc-800 hidden md:block" />
            <div className="flex flex-col justify-center gap-3">
              <a href="https://instagram.com/aylablumberg" target="_blank" rel="noopener noreferrer"
                className="border border-zinc-700 text-gray-300 px-5 py-2 rounded-full text-xs tracking-widest uppercase hover:border-pink-400 hover:text-pink-400 transition-colors">
                Instagram · @aylablumberg ↗
              </a>
              <a href="https://tiktok.com/@aylablumberg.realestate" target="_blank" rel="noopener noreferrer"
                className="border border-zinc-700 text-gray-300 px-5 py-2 rounded-full text-xs tracking-widest uppercase hover:border-pink-400 hover:text-pink-400 transition-colors">
                TikTok · @aylablumberg.realestate ↗
              </a>
            </div>
          </div>
          </Reveal>

          {/* TikToks in sheet-protector / document style */}
          <div className="relative">
            {/* Top-left camera */}
            <div className="absolute -top-10 -left-4 text-8xl pointer-events-none select-none z-10"
              style={{ transform: "rotate(15deg)", filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.5))" }}>
              📷
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
            {[
              { id: "7613482868961987870", rotate: "-4deg", star: false },
              { id: "7615308084134694174", rotate: "3deg", star: false },
              { id: "7617710380449615134", rotate: "-2deg", star: false },
              { id: "7619396369727458591", rotate: "4deg", star: false },
              { id: "7621974460031143199", rotate: "-3deg", star: true },
              { id: "7625016045681577247", rotate: "3deg", star: false },
            ].map(({ id, rotate, star }, i) => (
              <Reveal key={id} delay={i * 150}>
                <div style={{ transform: `rotate(${rotate})` }}>
                  {/* Plastic sleeve outer */}
                  <div className="relative bg-gray-100/80 border border-gray-300/60 p-2.5 shadow-2xl"
                    style={{ borderRadius: "3px", backdropFilter: "blur(2px)" }}>
                    {/* Star badge */}
                    {star && (
                      <div className="absolute -top-3 -right-3 z-20 text-2xl pointer-events-none select-none"
                        style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}>
                        ⭐
                      </div>
                    )}
                    {/* Hole punches left edge */}
                    <div className="absolute left-1 top-[22%] w-3.5 h-3.5 rounded-full bg-black/80 shadow-inner" />
                    <div className="absolute left-1 top-[50%] w-3.5 h-3.5 rounded-full bg-black/80 shadow-inner" />
                    <div className="absolute left-1 top-[78%] w-3.5 h-3.5 rounded-full bg-black/80 shadow-inner" />
                    {/* Plastic glare strip */}
                    <div className="absolute top-0 left-0 right-0 h-5 bg-white/30 rounded-t-sm" />
                    {/* Paper inside */}
                    <div className="bg-white ml-3.5 shadow-sm">
                      <iframe
                        src={`https://www.tiktok.com/embed/v2/${id}`}
                        className="border-0 block"
                        width="230"
                        height="410"
                        allowFullScreen
                        allow="encrypted-media"
                        title="TikTok — Ayla Blumberg"
                      />
                    </div>
                  </div>
                  {/* Camera decoration on second video */}
                  {i === 1 && (
                    <div className="absolute -bottom-8 -left-10 text-8xl pointer-events-none select-none"
                      style={{ transform: "rotate(-15deg)", filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.5))" }}>
                      📷
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section className="bg-white py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-pink-400 font-medium mb-6">Background</p>
          <h2
            className="text-4xl font-bold text-black mb-16"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Experience &amp;{" "}
            <span className="italic text-pink-400">Education</span>
          </h2>
          <Reveal>
          <div className="grid md:grid-cols-2 gap-16">
            {/* Work */}
            <div>
              <p className="text-xs tracking-widest uppercase text-gray-300 font-medium pb-4 border-b border-gray-100 mb-6">Work History</p>
              <div className="space-y-6">
                {experience.map((job) => (
                  <div key={job.company} className="flex justify-between items-start gap-4 pb-5 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="font-semibold text-black text-sm">{job.company}</p>
                      <p className="text-pink-400 text-xs mt-0.5 font-medium">{job.role}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-gray-400">{job.period}</p>
                      <p className="text-xs text-gray-300">{job.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education + Certs */}
            <div>
              <p className="text-xs tracking-widest uppercase text-gray-300 font-medium pb-4 border-b border-gray-100 mb-6">Education</p>
              <div className="space-y-5 mb-12">
                {[
                  { name: "University of Texas", detail: "Civic Honors · Attending Fall 2026 · Austin, TX" },
                  { name: "Texas Real Estate License", detail: "In Progress · Expected Spring 2026" },
                  { name: "Akiba Yavneh Academy", detail: "Salutatorian · AP Scholar with Distinction · May 2025" },
                ].map((e) => (
                  <div key={e.name} className="pb-5 border-b border-gray-50 last:border-0">
                    <p className="font-semibold text-black text-sm">{e.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{e.detail}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs tracking-widest uppercase text-gray-300 font-medium pb-4 border-b border-gray-100 mb-5">Certifications</p>
              <div className="space-y-4">
                <div className="pb-4 border-b border-gray-50">
                  <p className="font-semibold text-black text-sm">200-Hour Yoga Instructor</p>
                  <p className="text-xs text-gray-400 mt-0.5">Dallas Yoga Center · 2023</p>
                </div>
                <div>
                  <p className="font-semibold text-black text-sm">CPR Certification</p>
                  <p className="text-xs text-gray-400 mt-0.5">ACEP · June 2024</p>
                </div>
              </div>
            </div>
          </div>
          </Reveal>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section
        id="contact"
        className="py-28 px-6"
        style={{
          background: "#fdf2f8",
          backgroundImage: "radial-gradient(circle, #f9a8d4 1.5px, transparent 1.5px)",
          backgroundSize: "22px 22px",
        }}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">

          {/* Left: copy + socials */}
          <Reveal>
          <div className="md:sticky md:top-28">
            <p className="text-xs tracking-[0.3em] uppercase text-pink-400 font-medium mb-6">Contact</p>
            <h2
              className="text-5xl md:text-6xl font-bold text-black leading-tight mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Let&apos;s{" "}
              <span className="italic text-pink-400">connect.</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-sm">
              Whether you have an opportunity, a collab, or you want to talk real estate — I&apos;d love to hear from you.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://linkedin.com/in/ayla-blumberg-95a719337" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 border border-black text-black px-5 py-2.5 rounded-full text-xs font-medium tracking-widest uppercase hover:border-pink-400 hover:text-pink-400 transition-colors">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn ↗
              </a>
              <a href="https://instagram.com/aylablumberg" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 border border-black text-black px-5 py-2.5 rounded-full text-xs font-medium tracking-widest uppercase hover:border-pink-400 hover:text-pink-400 transition-colors">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                Instagram ↗
              </a>
              <a href="https://tiktok.com/@aylablumberg.realestate" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 border border-black text-black px-5 py-2.5 rounded-full text-xs font-medium tracking-widest uppercase hover:border-pink-400 hover:text-pink-400 transition-colors">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.37 6.37 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z"/></svg>
                TikTok ↗
              </a>
            </div>
            <p className="text-sm text-gray-600 mt-4 italic px-4 py-2 bg-white/80 rounded-full inline-block shadow-sm" style={{ fontFamily: "var(--font-playfair)" }}>
              7K+ combined followers · 6M+ views across platforms
            </p>
          </div>
          </Reveal>

          {/* Right: badge / lanyard card */}
          <Reveal delay={150}>
          <div className="flex flex-col items-center">
            {/* Lanyard strap */}
            <div className="w-10 h-24 rounded-b-lg shadow-lg"
              style={{ background: "linear-gradient(180deg, #9f1239 0%, #be123c 50%, #9f1239 100%)" }} />
            {/* Metal clip ring */}
            <div className="w-8 h-4 rounded-full border-[3px] border-gray-400 bg-gray-300 shadow -mt-0.5" />

            {/* Badge card */}
            <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden -mt-0.5 border border-gray-100">

              {/* Pink header */}
              <div className="bg-pink-400 px-8 py-7 text-center">
                <p className="text-white/70 text-[9px] tracking-[0.35em] uppercase mb-3">Dallas, TX · 2026</p>
                <h3
                  className="text-white text-4xl font-bold leading-tight"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Ayla<br />Blumberg
                </h3>
                <p className="text-white/80 text-[9px] tracking-[0.25em] uppercase mt-3">
                  Creative · Future Real Estate Agent
                </p>
              </div>

              {/* Hole punch */}
              <div className="flex justify-center relative z-10 -mt-3.5 mb-3">
                <div className="w-7 h-7 rounded-full bg-pink-50 border-2 border-pink-200 shadow-inner" />
              </div>

              {/* Form or success */}
              {submitted ? (
                <div className="px-8 py-8 text-center">
                  <p className="text-3xl font-bold text-black mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                    Received.
                  </p>
                  <p className="text-gray-400 text-sm">I&apos;ll be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="px-8 pb-4 space-y-4">
                  {[
                    { label: "NAME", name: "name", type: "text", placeholder: "Your name" },
                    { label: "EMAIL", name: "email", type: "email", placeholder: "your@email.com" },
                  ].map((f) => (
                    <div key={f.name} className="border-b border-gray-200 pb-2">
                      <label className="block text-[9px] tracking-[0.3em] uppercase text-gray-400 mb-1">{f.label}</label>
                      <input
                        type={f.type}
                        name={f.name}
                        required
                        placeholder={f.placeholder}
                        className="w-full bg-transparent text-sm text-black focus:outline-none placeholder-gray-300"
                      />
                    </div>
                  ))}
                  <div className="border-b border-gray-200 pb-2">
                    <label className="block text-[9px] tracking-[0.3em] uppercase text-gray-400 mb-1">MESSAGE</label>
                    <textarea
                      name="message"
                      required
                      rows={3}
                      placeholder="What's on your mind?"
                      className="w-full bg-transparent text-sm text-black focus:outline-none resize-none placeholder-gray-300"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-pink-400 text-white py-3 rounded-full text-[10px] tracking-[0.25em] uppercase font-semibold hover:bg-black transition-colors disabled:opacity-50 mt-1"
                  >
                    {sending ? "Sending…" : "Send Message"}
                  </button>
                </form>
              )}

              {/* Barcode */}
              <div className="px-8 py-5 text-center border-t border-gray-100 mt-2">
                <Barcode />
                <p className="text-[9px] text-gray-400 tracking-[0.2em] uppercase mt-2">AYLABLUMBERG.COM</p>
              </div>
            </div>
          </div>
          </Reveal>

        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-black px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-zinc-600 tracking-widest uppercase">© 2026 Ayla Blumberg</span>
        <span
          className="text-pink-400 text-sm italic"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Investing in people. Building in real estate.
        </span>
        <a
          href="https://linkedin.com/in/ayla-blumberg-95a719337"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-zinc-600 tracking-widest uppercase hover:text-pink-400 transition-colors"
        >
          LinkedIn ↗
        </a>
      </footer>

    </div>
  );
}
