import type { Metadata } from "next";
import { AdminNav } from "./_components/AdminNav";
import { TickerOrEmpty } from "./_components/TickerOrEmpty";
import { ScrollProgress } from "./_components/ScrollProgress";
import { BackToTop } from "./_components/BackToTop";

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
      {children}
      <BackToTop />
    </div>
  );
}
