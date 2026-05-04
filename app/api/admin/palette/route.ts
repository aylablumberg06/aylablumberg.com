import { NextResponse } from "next/server";
import {
  getFlagships,
  getDashboards,
  getProjects,
  getQuickLinks,
  getIdeas,
  getAgents,
} from "@/lib/admin-data";

export async function GET() {
  const [flagships, dashboards, projects, quicklinks, ideas, agents] = await Promise.all([
    getFlagships(),
    getDashboards(),
    getProjects(),
    getQuickLinks(),
    getIdeas(),
    getAgents(),
  ]);

  type Item = { id: string; label: string; group: string; href: string; external?: boolean; hint?: string };
  const items: Item[] = [];

  items.push(
    { id: "page-overview", label: "Overview", group: "Pages", href: "/admin", hint: "page" },
    { id: "page-ideas", label: "Ideas", group: "Pages", href: "/admin/ideas", hint: "page" },
    { id: "page-agents", label: "Agents", group: "Pages", href: "/admin/agents", hint: "page" }
  );

  for (const f of flagships) {
    items.push({ id: `flag-${f.key}-site`, label: `${f.name} — visit site`, group: "Flagships", href: f.live, external: true });
    items.push({ id: `flag-${f.key}-dash`, label: `${f.name} — dashboard`, group: "Flagships", href: f.dashboard, external: !f.dashboard.startsWith("/") });
  }

  for (const d of dashboards) {
    items.push({ id: `dash-${d.name}`, label: d.name, group: "Sub-dashboards", href: d.url, external: true, hint: d.purpose });
  }

  for (const p of projects) {
    if (p.live) items.push({ id: `proj-${p.id}-live`, label: `${p.name} — live site`, group: "Projects", href: p.live, external: true });
    if (p.github) items.push({ id: `proj-${p.id}-gh`, label: `${p.name} — GitHub`, group: "Projects", href: p.github, external: true });
    if (p.vercel) items.push({ id: `proj-${p.id}-vc`, label: `${p.name} — Vercel`, group: "Projects", href: p.vercel, external: true });
  }

  for (const q of quicklinks) {
    items.push({ id: `ql-${q.name}`, label: q.name, group: "Quick links", href: q.url, external: true });
  }

  for (const i of ideas) {
    items.push({ id: `idea-${i.title}`, label: i.title, group: "Ideas", href: "/admin/ideas", hint: i.buildsOn });
  }

  items.push({
    id: `agent-elle`,
    label: `Elle — ${agents.topLevel.role.split("—")[0].trim()}`,
    group: "Agents",
    href: agents.topLevel.telegram || "/admin/agents",
    external: Boolean(agents.topLevel.telegram),
    hint: "chief of staff",
  });
  for (const team of agents.teams) {
    items.push({
      id: `agent-orch-${team.name}`,
      label: `${team.orchestrator.name} — orchestrator (${team.name})`,
      group: "Agents",
      href: team.orchestrator.telegram || "/admin/agents",
      external: Boolean(team.orchestrator.telegram),
      hint: team.name,
    });
    for (const m of team.members) {
      items.push({
        id: `agent-${team.name}-${m.name}`,
        label: `${m.name} — ${team.name}`,
        group: "Agents",
        href: "/admin/agents",
        hint: m.role,
      });
    }
  }

  return NextResponse.json({ items });
}
