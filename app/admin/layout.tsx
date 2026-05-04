import type { Metadata } from "next";
import { AdminNav } from "./_components/AdminNav";
import { TickerOrEmpty } from "./_components/TickerOrEmpty";
import { ScrollProgress } from "./_components/ScrollProgress";
import { BackToTop } from "./_components/BackToTop";
import { KonamiCode } from "./_components/KonamiCode";
import { StickyTOC } from "./_components/StickyTOC";
import { CommandPalette } from "./_components/CommandPalette";

export const metadata: Metadata = {
  title: "Master Dashboard · Ayla Blumberg",
  robots: { index: false, follow: false },
};

const TICKER =
  "MASTER DASHBOARD · AYLA BLUMBERG · DALLAS → AUSTIN · BUILDING IN AI · INVESTING IN PEOPLE · ";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-sans bg-white min-h-screen">
      <ScrollProgress />
      <TickerOrEmpty text={TICKER.repeat(8)} />
      <AdminNav />
      <StickyTOC />
      {children}
      <BackToTop />
      <CommandPalette />
      <KonamiCode />
    </div>
  );
}
