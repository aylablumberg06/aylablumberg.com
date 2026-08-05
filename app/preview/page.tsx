"use client";

import { useEffect, useRef, useState } from "react";

/* smoothstep */
function ss(a: number, b: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

const SERIF = "'Cormorant Garamond',serif";
const SANS = "Inter,sans-serif";
const PINK = "#e8295c";
const INK = "#2a0f18";

/* Reveal-on-scroll */
function Reveal({ children, delay = 0, y = 30 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setV(true), { threshold: 0.18 });
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? "none" : `translateY(${y}px)`,
        transition: `opacity .9s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform .9s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const PIPELINE = [
  { status: "ACTIVE", title: "Ayla Blumberg — Brand", sub: "Dallas, TX", desc: "Creative professional, content creator, and graphic designer. Available for opportunities.", detail: "Content · Branding · Design" },
  { status: "ACTIVE", title: "Texas Real Estate License", sub: "Dallas, TX", desc: "Licensed Texas real estate agent as of April 2026.", detail: "Residential · Investment · Luxury" },
  { status: "COMING SOON", title: "University of Texas", sub: "Austin, TX", desc: "Heading to UT Austin on a full-ride scholarship as a Rosenthal Levy Scholar — Fall 2026.", detail: "Rosenthal Levy Scholar · Full Ride · Fall 2026" },
];

const SKILLS = [
  { t: "Real Estate", d: "Passed my Texas real estate exam in April 2026. I'm building a career with a deep focus on client relationships, market knowledge, and long-term investment strategy." },
  { t: "Brand & Web Design", d: "Websites and visual identities built from scratch — including a full site for Design List Collective. I translate a founder's vision into a platform people actually feel.", link: { label: "designlistcollective.com", href: "https://designlistcollective.com/" } },
  { t: "Content Creation & Editing", d: "TikTok editing, storytelling, and content strategy. I know how to make content that connects with a Gen Z audience and builds a brand online." },
  { t: "Writing & Storytelling", d: "Published YA novel author. Words are my medium — whether it's a mystery novel, a caption, a pitch deck, or a brand narrative." },
  { t: "Graphic Design", d: "Designed for school clubs, events, and merchandise. STEM Honor Society member and the go-to designer for anything visual." },
  { t: "Client Experience & Leadership", d: "5+ years in front-facing client roles across boutique fitness, luxury retail, and youth leadership. I know how to hold a room." },
];

const CREDS = ["Published Author", "Salutatorian", "Rosenthal Levy Scholar", "Yoga Instructor", "Graphic Designer", "AP Scholar", "Licensed Real Estate Agent"];
const STATS = [{ n: "2026", l: "Real Estate License" }, { n: "7K+", l: "Combined Followers" }, { n: "6M+", l: "Total Views" }];

export default function Preview() {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [p, setP] = useState(0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const track = trackRef.current;
      const vid = videoRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const total = track.offsetHeight - window.innerHeight;
      const prog = Math.min(1, Math.max(0, -rect.top / Math.max(1, total)));
      setP(prog);
      if (vid && vid.duration) {
        const t = prog * (vid.duration - 0.06);
        if (Math.abs(vid.currentTime - t) > 0.01) vid.currentTime = t;
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    const v = videoRef.current;
    if (v) v.pause();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  const head1 = 1 - ss(0.0, 0.4, p);
  const head2 = ss(0.5, 0.9, p);
  const darkHeader = p > 0.55;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    try {
      await fetch("https://formspree.io/f/xzdjayyl", { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
    } catch {}
    setSent(true);
    form.reset();
  }

  return (
    <main style={{ fontFamily: SANS, color: INK, background: "#fff" }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Inter:wght@300;400;500;600&display=swap" />

      {/* scroll progress bar */}
      <div style={{ position: "fixed", top: 0, left: 0, height: 3, width: `${p * 100}%`, background: PINK, zIndex: 60, transition: "width .1s linear" }} />

      {/* FIXED HEADER */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 55, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px clamp(20px,5vw,44px)", color: darkHeader ? INK : "#fff", transition: "color .5s ease", textShadow: darkHeader ? "none" : "0 1px 14px rgba(0,0,0,.4)" }}>
        <span style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 24 }}>Ayla<span style={{ color: PINK }}>.</span></span>
        <nav style={{ display: "flex", gap: "clamp(14px,3vw,30px)", fontSize: 12.5, letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 500 }}>
          {["Work", "Built", "About", "Connect"].map((n) => (
            <a key={n} href={`#${n.toLowerCase()}`} style={{ opacity: 0.85 }}>{n}</a>
          ))}
        </nav>
      </header>

      {/* ─────────── SCROLL-SCRUB HERO ─────────── */}
      <div ref={trackRef} style={{ height: "330vh", position: "relative" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
          <video ref={videoRef} src="/hero/hero-orbit.mp4" poster="/hero/hero-orbit-poster.jpg" muted playsInline preload="auto" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, rgba(20,8,14,${0.3 + 0.12 * p}) 0%, rgba(20,8,14,0) 30%, rgba(20,8,14,0) 52%, rgba(42,15,24,${0.28 * p}) 100%)` }} />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "36vh", background: `linear-gradient(to bottom, rgba(255,241,245,0) 0%, rgba(255,241,245,${0.9 * ss(0.62, 1, p)}) 100%)`, pointerEvents: "none" }} />

          {/* Headline 1 */}
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 8vw", opacity: head1, transform: `translateY(${-16 * (1 - head1)}px)`, pointerEvents: "none" }}>
            <p style={{ fontFamily: SANS, color: "#fff", letterSpacing: ".3em", textTransform: "uppercase", fontSize: 12, marginBottom: 22, opacity: 0.85 }}>Dallas, TX</p>
            <h1 style={{ fontFamily: SERIF, color: "#fff", fontWeight: 500, lineHeight: 1.02, fontSize: "clamp(40px,8vw,104px)", textShadow: "0 2px 30px rgba(0,0,0,.45)" }}>I'm building<br />something of my own.</h1>
          </div>

          {/* Headline 2 — legibility panel so it stays crisp over the bright scene */}
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 8vw", opacity: head2, transform: `translateY(${16 * (1 - head2)}px)`, pointerEvents: "none" }}>
            <div style={{ padding: "36px 48px", borderRadius: 26, background: "rgba(255,241,245,0.55)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", boxShadow: "0 20px 60px rgba(42,15,24,.12)" }}>
              <p style={{ fontFamily: SANS, color: PINK, letterSpacing: ".26em", textTransform: "uppercase", fontSize: 11, marginBottom: 14, fontWeight: 600 }}>Creative · Author · Real Estate</p>
              <h1 style={{ fontFamily: SERIF, color: INK, fontWeight: 600, lineHeight: 1.04, fontSize: "clamp(38px,7vw,90px)" }}>Ayla Blumberg</h1>
              <p style={{ fontFamily: SERIF, fontStyle: "italic", color: "#7a5563", fontSize: "clamp(16px,2.4vw,24px)", marginTop: 14 }}>The next great real estate agent.</p>
            </div>
          </div>

          {/* scroll hint */}
          <div style={{ position: "absolute", bottom: 26, left: "50%", transform: "translateX(-50%)", opacity: 1 - ss(0, 0.1, p), color: "#fff", fontFamily: SANS, fontSize: 11, letterSpacing: ".22em", textTransform: "uppercase", pointerEvents: "none" }}>scroll ↓</div>
        </div>
      </div>

      {/* ─────────── IN THE WORKS ─────────── */}
      <section id="work" style={{ background: "linear-gradient(to bottom,#fff1f5 0%,#fff 55%)", padding: "clamp(80px,12vh,150px) clamp(22px,8vw,120px) 120px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <Reveal>
            <p style={{ color: PINK, letterSpacing: ".32em", textTransform: "uppercase", fontSize: 12, textAlign: "center", marginBottom: 22 }}>In the works</p>
            <h2 style={{ fontFamily: SERIF, textAlign: "center", fontWeight: 500, fontSize: "clamp(30px,5vw,58px)", lineHeight: 1.08, maxWidth: 780, margin: "0 auto 60px" }}>
              A creative building real businesses — <span style={{ fontStyle: "italic", color: PINK }}>in public</span>.
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 22 }}>
            {PIPELINE.map((c, i) => (
              <Reveal key={c.title} delay={i * 90}>
                <div style={{ background: "#fff", border: "1px solid #ffd9e5", borderRadius: 22, padding: 30, height: "100%", boxShadow: "0 18px 50px rgba(232,41,92,.06)" }}>
                  <span style={{ display: "inline-block", fontSize: 10.5, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: c.status === "ACTIVE" ? "#fff" : PINK, background: c.status === "ACTIVE" ? PINK : "#ffe0ea", padding: "5px 12px", borderRadius: 999 }}>● {c.status}</span>
                  <h3 style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 26, marginTop: 18, lineHeight: 1.1 }}>{c.title}</h3>
                  <p style={{ color: PINK, fontSize: 12.5, marginTop: 4, marginBottom: 14 }}>{c.sub}</p>
                  <p style={{ color: "#7a5563", fontSize: 15, lineHeight: 1.6, marginBottom: 16 }}>{c.desc}</p>
                  <p style={{ color: "#b58aa0", fontSize: 12, letterSpacing: ".04em", textTransform: "uppercase" }}>{c.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── ABOUT + STATS ─────────── */}
      <section id="about" style={{ background: "#fff", padding: "clamp(70px,10vh,130px) clamp(22px,8vw,120px)" }}>
        <div style={{ maxWidth: 940, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <p style={{ color: PINK, letterSpacing: ".32em", textTransform: "uppercase", fontSize: 12, marginBottom: 22 }}>About</p>
            <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(28px,4.6vw,52px)", lineHeight: 1.14 }}>
              I approach real estate the way I approach everything — <span style={{ fontStyle: "italic", color: PINK }}>all in</span>.
            </h2>
            <p style={{ color: "#7a5563", fontSize: 18, lineHeight: 1.75, maxWidth: 640, margin: "26px auto 0" }}>
              Published author. Salutatorian. Full-ride Rosenthal Levy Scholar headed to UT Austin. Licensed Texas real estate agent. I build brands, write stories, ship AI products, and I'm just getting started.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", margin: "36px auto 0", maxWidth: 720 }}>
              {CREDS.map((t) => (
                <span key={t} style={{ fontSize: 12.5, color: "#8a5f70", border: "1px solid #ffd9e5", borderRadius: 999, padding: "8px 16px" }}>{t}</span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginTop: 60, maxWidth: 620, marginInline: "auto" }}>
              {STATS.map((s) => (
                <div key={s.l}>
                  <p style={{ fontFamily: SERIF, fontWeight: 600, fontSize: "clamp(34px,6vw,60px)", color: INK, lineHeight: 1 }}>{s.n}</p>
                  <p style={{ fontSize: 12, color: "#b58aa0", letterSpacing: ".08em", textTransform: "uppercase", marginTop: 8 }}>{s.l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────── WHAT I DO ─────────── */}
      <section style={{ background: "linear-gradient(to bottom,#fff 0%,#fff5f8 100%)", padding: "clamp(70px,10vh,130px) clamp(22px,8vw,120px)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <Reveal>
            <p style={{ color: PINK, letterSpacing: ".32em", textTransform: "uppercase", fontSize: 12, textAlign: "center", marginBottom: 22 }}>What I do</p>
            <h2 style={{ fontFamily: SERIF, textAlign: "center", fontWeight: 500, fontSize: "clamp(28px,4.6vw,52px)", marginBottom: 48 }}>A little bit of everything, done well.</h2>
          </Reveal>
          <div style={{ borderTop: "1px solid #ffdbe6" }}>
            {SKILLS.map((s, i) => (
              <Reveal key={s.t} delay={i * 60}>
                <div style={{ borderBottom: "1px solid #ffdbe6", padding: "26px 4px", display: "grid", gridTemplateColumns: "44px 1fr", gap: 8 }}>
                  <span style={{ color: PINK, fontFamily: SANS, fontSize: 13, fontWeight: 600, letterSpacing: ".1em", paddingTop: 8 }}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 style={{ fontFamily: SERIF, fontWeight: 600, fontSize: "clamp(22px,3vw,30px)", lineHeight: 1.15 }}>{s.t}</h3>
                    <p style={{ color: "#7a5563", fontSize: 15.5, lineHeight: 1.65, marginTop: 8, maxWidth: 640 }}>{s.d}</p>
                    {s.link && <a href={s.link.href} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 10, color: PINK, fontSize: 14, fontWeight: 500 }}>↗ {s.link.label}</a>}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── BUILT (cinematic depth returns) ─────────── */}
      <section id="built" style={{ background: "linear-gradient(to bottom,#fff5f8 0%,#2a0f18 18%,#2a0f18 82%,#1a0910 100%)", padding: "clamp(80px,12vh,150px) clamp(22px,8vw,120px)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Reveal>
            <p style={{ color: "#ff8fb0", letterSpacing: ".32em", textTransform: "uppercase", fontSize: 12, textAlign: "center", marginBottom: 22 }}>Built</p>
            <h2 style={{ fontFamily: SERIF, textAlign: "center", color: "#fff", fontWeight: 500, fontSize: "clamp(30px,5vw,58px)", lineHeight: 1.06 }}>
              I don't just use AI. <span style={{ fontStyle: "italic", color: "#ff8fb0" }}>I build with it.</span>
            </h2>
            <p style={{ textAlign: "center", color: "#e8c4d2", fontSize: 17, lineHeight: 1.7, maxWidth: 600, margin: "22px auto 60px" }}>
              Two live, in-production AI products — designed, coded, and shipped by me.
            </p>
          </Reveal>
          {[
            { tag: "Live · Product 01", name: "Ayla Intelligence", italic: "Your business, but with a team of AI agents.", href: "https://ai.aylablumberg.com", url: "ai.aylablumberg.com", body: "A platform for small businesses to spin up named, custom AI agents that actually do the work — cold outreach, brand design, content, and operations on autopilot. The difference between \"using ChatGPT\" and \"hiring a team.\"", tags: ["AI Agents", "Next.js", "Claude API", "Automation", "B2B"] },
            { tag: "Live · Product 02", name: "Ayla Unlocked", italic: "The course on building with AI — taught by someone actually doing it.", href: "https://unlocked.aylablumberg.com", url: "unlocked.aylablumberg.com", body: "A paid course teaching exactly how I build, ship, and sell AI products as a solo creator. Auth, payments, members area, magic-link login — the whole platform built from scratch with Next.js, Supabase, Stripe, and Resend.", tags: ["Course", "AI Education", "Next.js", "Supabase", "Stripe"] },
          ].map((prod, i) => (
            <Reveal key={prod.name} delay={i * 100}>
              <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,143,176,0.25)", borderRadius: 26, padding: "clamp(26px,4vw,46px)", marginBottom: 22, backdropFilter: "blur(4px)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
                  <span style={{ color: "#ff8fb0", fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase" }}>● {prod.tag}</span>
                  <span style={{ color: "#b98aa0", fontSize: 12, fontFamily: "monospace" }}>{prod.url}</span>
                </div>
                <h3 style={{ fontFamily: SERIF, color: "#fff", fontWeight: 600, fontSize: "clamp(30px,4.4vw,50px)", lineHeight: 1.02 }}>{prod.name}</h3>
                <p style={{ fontFamily: SERIF, fontStyle: "italic", color: "#ff8fb0", fontSize: "clamp(16px,2.2vw,21px)", marginTop: 8, marginBottom: 18 }}>{prod.italic}</p>
                <p style={{ color: "#e8c4d2", fontSize: 16, lineHeight: 1.7, maxWidth: 680, marginBottom: 22 }}>{prod.body}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 26 }}>
                  {prod.tags.map((t) => (
                    <span key={t} style={{ fontSize: 10.5, letterSpacing: ".1em", textTransform: "uppercase", color: "#ffb3ca", border: "1px solid rgba(255,143,176,0.35)", padding: "6px 13px", borderRadius: 999 }}>{t}</span>
                  ))}
                </div>
                <a href={prod.href} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 14, background: "#fff", color: INK, padding: "14px 26px", borderRadius: 999, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
                  Visit {prod.name} <span style={{ color: PINK }}>↗</span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─────────── PORTFOLIO ─────────── */}
      <section id="portfolio" style={{ background: "linear-gradient(to bottom,#1a0910 0%,#2a0f18 40%,#fff1f5 100%)", padding: "clamp(80px,12vh,150px) clamp(22px,8vw,120px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <p style={{ color: "#ff8fb0", letterSpacing: ".32em", textTransform: "uppercase", fontSize: 12, marginBottom: 22 }}>Portfolio</p>
            <h2 style={{ fontFamily: SERIF, color: "#fff", fontWeight: 500, fontSize: "clamp(28px,4.6vw,52px)", lineHeight: 1.12 }}>Building a brand from the ground up.</h2>
            <p style={{ color: "#e8c4d2", fontSize: 17, lineHeight: 1.7, maxWidth: 560, margin: "20px auto 44px" }}>Content creation and editing across real estate and creative work — storytelling that connects.</p>
          </Reveal>
          <Reveal delay={120}>
            <div style={{ display: "flex", gap: "clamp(24px,6vw,80px)", justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
              <div><p style={{ fontFamily: SERIF, color: "#fff", fontWeight: 600, fontSize: "clamp(40px,7vw,68px)", lineHeight: 1 }}>7K+</p><p style={{ color: "#c99aad", fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", marginTop: 8 }}>Combined Followers</p></div>
              <div><p style={{ fontFamily: SERIF, color: "#fff", fontWeight: 600, fontSize: "clamp(40px,7vw,68px)", lineHeight: 1 }}>6M+</p><p style={{ color: "#c99aad", fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", marginTop: 8 }}>Total Views</p></div>
            </div>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="https://instagram.com/aylablumberg" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", border: "1px solid rgba(255,255,255,.4)", borderRadius: 999, padding: "12px 24px", fontSize: 14, textDecoration: "none" }}>Instagram · @aylablumberg ↗</a>
              <a href="https://tiktok.com/@aylablumberg.ai" target="_blank" rel="noopener noreferrer" style={{ color: "#fff", border: "1px solid rgba(255,255,255,.4)", borderRadius: 999, padding: "12px 24px", fontSize: 14, textDecoration: "none" }}>TikTok · @aylablumberg.ai ↗</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────── CONNECT ─────────── */}
      <section id="connect" style={{ background: "#fff1f5", padding: "clamp(80px,12vh,150px) clamp(22px,8vw,120px) 90px" }}>
        <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <p style={{ color: PINK, letterSpacing: ".32em", textTransform: "uppercase", fontSize: 12, marginBottom: 22 }}>Connect</p>
            <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(30px,5vw,56px)", lineHeight: 1.08, marginBottom: 14 }}>Let's build something.</h2>
            <p style={{ color: "#7a5563", fontSize: 17, lineHeight: 1.7, marginBottom: 36 }}>Real estate, a brand, a website, or an AI product — if you're making something real, I want to hear about it.</p>
          </Reveal>
          {sent ? (
            <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 22, color: PINK }}>Thank you — I'll be in touch soon. ✦</p>
          ) : (
            <Reveal delay={100}>
              <form onSubmit={submit} style={{ display: "grid", gap: 12, textAlign: "left" }}>
                <input name="name" required placeholder="Your name" style={inp} />
                <input name="email" type="email" required placeholder="Your email" style={inp} />
                <textarea name="message" required placeholder="What are you building?" rows={4} style={{ ...inp, resize: "vertical" }} />
                <button type="submit" style={{ background: INK, color: "#fff", border: "none", borderRadius: 999, padding: "16px 22px", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: SANS }}>Send it →</button>
              </form>
            </Reveal>
          )}
        </div>
        <footer style={{ textAlign: "center", marginTop: 80, color: "#b58aa0", fontSize: 13 }}>
          <p style={{ fontFamily: SERIF, fontSize: 22, color: INK, fontWeight: 600 }}>Ayla<span style={{ color: PINK }}>.</span></p>
          <p style={{ marginTop: 10 }}>Ayla Blumberg · Dallas, TX · <a href="mailto:aylablumberg06@gmail.com" style={{ color: PINK }}>aylablumberg06@gmail.com</a></p>
        </footer>
      </section>
    </main>
  );
}

const inp: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #ffd9e5",
  borderRadius: 14,
  padding: "15px 18px",
  fontSize: 15,
  fontFamily: "Inter,sans-serif",
  color: "#2a0f18",
  outline: "none",
  width: "100%",
};
