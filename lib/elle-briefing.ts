import { getJobs, getRevenue, getIdeas } from "@/lib/admin-data";
import { getCourseRevenue } from "@/lib/stripe-revenue";

export type Briefing =
  | { source: "live"; text: string; generatedAt: string }
  | { source: "fallback"; text: string; reason: string };

let cache: { at: number; value: Briefing } | null = null;
const TTL_MS = 60 * 60 * 1000; // 1 hour

const SYSTEM_PROMPT = `You are Elle — Ayla Blumberg's chief of staff AI. You write Ayla's morning brief.
Tone: warm, focused, direct. A close friend who runs ops. No filler, no fake enthusiasm.
Format: 3-5 short sentences total. Plain prose, no bullet points, no markdown.
Cover: (1) the single most urgent thing today, (2) one quick celebration, (3) one heads-up if relevant.
Refer to Ayla as "you". Sign off with a comma and your name on a new line: "\nElle"
Never invent facts. If something is unclear, just leave it out.`;

export async function getElleBriefing(): Promise<Briefing> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.value;

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return { source: "fallback", text: "Elle's voice needs ANTHROPIC_API_KEY in env. Ping it in and I'll start your day.", reason: "no key" };
  }

  try {
    const [jobs, revenue, ideas, courseRevenue] = await Promise.all([
      getJobs(),
      getRevenue(),
      getIdeas(),
      getCourseRevenue(),
    ]);

    const today = new Date().toISOString().slice(0, 10);
    const paidTotal = revenue.paid.reduce((s, p) => s + p.amount, 0);
    const courseLine = courseRevenue.source === "live"
      ? `Live course revenue (last 30d Stripe): $${Math.round(courseRevenue.netCents / 100)} from ${courseRevenue.customers} customers`
      : "Course revenue not connected";

    const context = `Today: ${today}
Paid this period: $${paidTotal}
${courseLine}

Active jobs:
${jobs.map(j => `- [${j.status}/${j.priority}] ${j.title} — client: ${j.client}, due: ${j.due}, next: ${j.next}`).join("\n")}

Open ideas (pick something that builds on a recent win if relevant):
${ideas.slice(0, 3).map(i => `- ${i.title} (builds on ${i.buildsOn})`).join("\n")}`;

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 12000);

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      signal: ctrl.signal,
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 320,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: `Brief me on today.\n\n${context}` }],
      }),
    });
    clearTimeout(timer);

    if (!res.ok) {
      return { source: "fallback", text: "Elle's offline this morning — try again in a sec.", reason: `api ${res.status}` };
    }

    const data = await res.json();
    const text = (data?.content?.[0]?.text ?? "").trim();
    if (!text) {
      return { source: "fallback", text: "Elle's offline this morning — try again in a sec.", reason: "empty response" };
    }

    const value: Briefing = { source: "live", text, generatedAt: new Date().toISOString() };
    cache = { at: Date.now(), value };
    return value;
  } catch (err) {
    return { source: "fallback", text: "Elle's offline this morning — try again in a sec.", reason: err instanceof Error ? err.message : "fetch failed" };
  }
}
