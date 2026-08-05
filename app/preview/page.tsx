"use client";

import { useEffect, useRef, useState } from "react";

/* smoothstep easing */
function ss(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export default function Preview() {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [p, setP] = useState(0); // hero scroll progress 0..1
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      const onLoaded = () => setReady(true);
      v.addEventListener("loadeddata", onLoaded);
      if (v.readyState >= 2) setReady(true);
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const track = trackRef.current;
      const vid = videoRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const total = track.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, total)));
      setP(progress);
      if (vid && vid.duration) {
        const t = progress * (vid.duration - 0.06);
        if (Math.abs(vid.currentTime - t) > 0.01) vid.currentTime = t;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (v) v.removeEventListener("loadeddata", () => setReady(true));
    };
  }, []);

  const head1 = 1 - ss(0.0, 0.42, p);
  const head2 = ss(0.5, 0.92, p);

  return (
    <main className="ayla-preview">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap"
      />

      {/* ── FIXED HEADER ─────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4"
        style={{
          color: p > 0.55 ? "#3a1220" : "#fff",
          transition: "color .5s ease",
          textShadow: p > 0.55 ? "none" : "0 1px 12px rgba(0,0,0,.35)",
        }}
      >
        <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, fontSize: 24, letterSpacing: ".02em" }}>
          Ayla<span style={{ color: "#e8295c" }}>.</span>
        </span>
        <nav className="hidden sm:flex gap-7 text-[13px] tracking-[.12em] uppercase" style={{ fontFamily: "Inter,sans-serif", fontWeight: 500 }}>
          <a href="#work" className="opacity-80 hover:opacity-100 transition">Work</a>
          <a href="#built" className="opacity-80 hover:opacity-100 transition">Built</a>
          <a href="#about" className="opacity-80 hover:opacity-100 transition">About</a>
          <a href="#connect" className="opacity-80 hover:opacity-100 transition">Connect</a>
        </nav>
      </header>

      {/* ── SCROLL-SCRUB HERO ────────────────────────── */}
      <div ref={trackRef} style={{ height: "320vh", position: "relative" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
          <video
            ref={videoRef}
            src="/hero/hero-orbit.mp4"
            poster="/hero/hero-orbit-poster.jpg"
            muted
            playsInline
            preload="auto"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          {/* legibility + brand wash, deepens as she turns to camera */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(to bottom, rgba(20,8,14,${0.28 + 0.12 * p}) 0%, rgba(20,8,14,0) 32%, rgba(20,8,14,0) 55%, rgba(58,18,32,${0.35 * p}) 100%)`,
            }}
          />
          {/* bottom fade that melts the mountain into the next section */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "34vh",
              background: `linear-gradient(to bottom, rgba(255,241,245,0) 0%, rgba(255,241,245,${0.85 * ss(0.6, 1, p)}) 100%)`,
              pointerEvents: "none",
            }}
          />

          {/* Headline 1 */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "0 8vw",
              opacity: head1,
              transform: `translateY(${(-18 * (1 - head1)).toFixed(1)}px)`,
              pointerEvents: "none",
            }}
          >
            <p style={{ fontFamily: "Inter,sans-serif", color: "#fff", letterSpacing: ".28em", textTransform: "uppercase", fontSize: 12, marginBottom: 22, opacity: 0.85 }}>
              Dallas, TX
            </p>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", color: "#fff", fontWeight: 500, lineHeight: 1.02, fontSize: "clamp(40px,8vw,104px)", textShadow: "0 2px 30px rgba(0,0,0,.4)" }}>
              I'm building<br />something of my own.
            </h1>
          </div>

          {/* Headline 2 */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "0 8vw",
              opacity: head2,
              transform: `translateY(${(18 * (1 - head2)).toFixed(1)}px)`,
              pointerEvents: "none",
            }}
          >
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", color: "#3a1220", fontWeight: 500, lineHeight: 1.05, fontSize: "clamp(36px,7vw,92px)" }}>
              Ayla Blumberg
            </h1>
            <p style={{ fontFamily: "Inter,sans-serif", color: "#e8295c", fontWeight: 500, letterSpacing: ".02em", fontSize: "clamp(15px,2.2vw,20px)", marginTop: 18 }}>
              Creative. Author. The next great real estate agent.
            </p>
          </div>

          {/* scroll hint */}
          <div
            style={{
              position: "absolute",
              bottom: 26,
              left: "50%",
              transform: "translateX(-50%)",
              opacity: (1 - ss(0, 0.12, p)) * (ready ? 1 : 0.4),
              color: "#fff",
              fontFamily: "Inter,sans-serif",
              fontSize: 11,
              letterSpacing: ".2em",
              textTransform: "uppercase",
              pointerEvents: "none",
            }}
          >
            scroll ↓
          </div>
        </div>
      </div>

      {/* ── SECTION 1 — floats up out of the mountain ── */}
      <section
        id="work"
        style={{
          background: "linear-gradient(to bottom,#fff1f5 0%,#fff 60%)",
          padding: "clamp(90px,14vh,180px) 8vw 140px",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "Inter,sans-serif", color: "#e8295c", letterSpacing: ".3em", textTransform: "uppercase", fontSize: 12, marginBottom: 28 }}>
            In the works
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", color: "#2a0f18", fontWeight: 500, fontSize: "clamp(32px,5.5vw,64px)", lineHeight: 1.08 }}>
            A creative building real businesses — <span style={{ fontStyle: "italic", color: "#e8295c" }}>in public</span>.
          </h2>
          <p style={{ fontFamily: "Inter,sans-serif", color: "#7a5563", fontSize: 18, lineHeight: 1.7, maxWidth: 620, margin: "34px auto 0" }}>
            Personal branding, real estate, and AI products — everything I make is built to be felt.
            This is the start of the flow; the full story scrolls on from here.
          </p>
        </div>
      </section>
    </main>
  );
}
