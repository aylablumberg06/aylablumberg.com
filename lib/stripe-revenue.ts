type Charge = {
  id: string;
  paid: boolean;
  status: string;
  amount: number;
  amount_refunded: number;
  created: number;
  balance_transaction?: { fee?: number } | string | null;
};

type ChargeList = {
  data: Charge[];
  has_more: boolean;
};

export type DailyPoint = { date: string; cents: number };

export type CourseRevenue =
  | { source: "live"; netCents: number; grossCents: number; feesCents: number; customers: number; daily: DailyPoint[] }
  | { source: "fallback"; reason: string };

let cache: { at: number; value: CourseRevenue } | null = null;
const TTL_MS = 5 * 60 * 1000;

export async function getCourseRevenue(): Promise<CourseRevenue> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.value;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return { source: "fallback", reason: "STRIPE_SECRET_KEY not set" };
  }

  let gross = 0;
  let fees = 0;
  let customers = 0;
  let starting_after: string | undefined;
  const dailyMap = new Map<string, number>();
  const today = new Date();
  // Seed last 30 days with zeros so sparkline always has shape
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setUTCDate(d.getUTCDate() - i);
    dailyMap.set(d.toISOString().slice(0, 10), 0);
  }

  try {
    for (let page = 0; page < 3; page++) {
      const params = new URLSearchParams();
      params.set("limit", "100");
      params.append("expand[]", "data.balance_transaction");
      if (starting_after) params.set("starting_after", starting_after);

      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 8000);
      const res = await fetch(`https://api.stripe.com/v1/charges?${params}`, {
        headers: { Authorization: `Bearer ${key}` },
        cache: "no-store",
        signal: ctrl.signal,
      });
      clearTimeout(timer);

      if (!res.ok) {
        return { source: "fallback", reason: `Stripe API ${res.status}` };
      }

      const list = (await res.json()) as ChargeList;
      for (const c of list.data) {
        if (!c.paid || c.status !== "succeeded") continue;
        const net = (c.amount || 0) - (c.amount_refunded || 0);
        gross += net;
        if (net > 0) customers += 1;
        const bt = c.balance_transaction;
        if (bt && typeof bt === "object" && "fee" in bt) {
          fees += bt.fee || 0;
        }
        if (c.created) {
          const day = new Date(c.created * 1000).toISOString().slice(0, 10);
          if (dailyMap.has(day)) dailyMap.set(day, (dailyMap.get(day) || 0) + net);
        }
      }

      if (!list.has_more) break;
      starting_after = list.data[list.data.length - 1]?.id;
      if (!starting_after) break;
    }

    const daily: DailyPoint[] = Array.from(dailyMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, cents]) => ({ date, cents }));

    const value: CourseRevenue = {
      source: "live",
      netCents: gross - fees,
      grossCents: gross,
      feesCents: fees,
      customers,
      daily,
    };
    cache = { at: Date.now(), value };
    return value;
  } catch (err) {
    return { source: "fallback", reason: err instanceof Error ? err.message : "fetch failed" };
  }
}
