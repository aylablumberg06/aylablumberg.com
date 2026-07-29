import Link from "next/link";

/* Shared layout for the OpenAI Student Collective application video pages.
   Clean, on-brand (white / Playfair + DM Sans / pink + gold sparkle) so the
   link Ayla submits reads as part of aylablumberg.com, not a throwaway upload. */

const SPARKS = [
  { x: "6%", y: "8%", color: "#f9a8d4", size: 22, delay: "0.4s" },
  { x: "92%", y: "6%", color: "#fbbf24", size: 24, delay: "1.1s" },
  { x: "88%", y: "84%", color: "#f9a8d4", size: 20, delay: "0.7s" },
  { x: "8%", y: "80%", color: "#fef08a", size: 26, delay: "1.4s" },
];

export default function OpenAIVideoPage({
  eyebrow,
  prompt,
  videoSrc,
  tiktokUrl,
  tiktokNote,
}: {
  eyebrow: string;
  prompt: string;
  videoSrc: string | null;
  tiktokUrl: string | null;
  tiktokNote: string;
}) {
  return (
    <main className="min-h-screen bg-white text-[#111111] flex flex-col items-center px-5 py-14 sm:py-20">
      <div className="relative w-full max-w-[480px]">
        {SPARKS.map((s, i) => (
          <span
            key={i}
            aria-hidden
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

        <header className="text-center">
          <p className="uppercase tracking-[0.28em] text-[11px] text-[#be123c] font-medium">
            {eyebrow}
          </p>
          <h1
            className="mt-4 font-serif text-[34px] sm:text-[42px] leading-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Hi Student Collective reviewers
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-[#4a2a4a]">
            I&apos;m Ayla Blumberg, an incoming student who builds and teaches with
            AI every day. Thanks for watching, my 60-second answer is below.
          </p>
          <p className="mt-5 text-[13px] italic text-[#6b6b6b] max-w-[380px] mx-auto">
            In response to: &ldquo;{prompt}&rdquo;
          </p>
        </header>

        {/* Video */}
        <div className="mt-9 mx-auto w-full max-w-[360px]">
          {videoSrc ? (
            <video
              controls
              playsInline
              preload="metadata"
              className="w-full rounded-2xl shadow-[0_18px_50px_-12px_rgba(190,18,60,0.35)] bg-black"
              style={{ aspectRatio: "9 / 16" }}
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser cannot play this video.{" "}
              <a href={videoSrc} className="underline">
                Download it here
              </a>
              .
            </video>
          ) : (
            <div
              className="w-full rounded-2xl border border-dashed border-[#f9a8d4] bg-[#fdf2f8] flex items-center justify-center text-center text-[#be123c] text-sm px-6"
              style={{ aspectRatio: "9 / 16" }}
            >
              Video uploading &mdash; check back in a moment.
            </div>
          )}
        </div>

        {/* Links */}
        <div className="mt-10 flex flex-col gap-3">
          <a
            href="https://aylablumberg.com"
            className="block text-center rounded-full bg-[#111111] text-white py-3.5 text-[14px] font-medium tracking-wide transition hover:bg-[#be123c]"
          >
            Explore my site &middot; aylablumberg.com
          </a>
          {tiktokUrl ? (
            <a
              href={tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center rounded-full border border-[#111111] py-3.5 text-[14px] font-medium tracking-wide transition hover:bg-[#fdf2f8] hover:border-[#be123c] hover:text-[#be123c]"
            >
              {tiktokNote}
            </a>
          ) : null}
        </div>

        <footer className="mt-12 text-center text-[12px] text-[#9a9a9a]">
          Ayla Blumberg &middot; Dallas, TX &middot; aylablumberg06@gmail.com
        </footer>
      </div>
    </main>
  );
}
