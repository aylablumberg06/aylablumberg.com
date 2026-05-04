import { readFile } from "node:fs/promises";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data", "admin");

// Env override: lets us keep sensitive files (revenue, jobs) out of the public repo
// by stuffing the JSON into a Vercel env var. Falls back to the on-disk file in dev.
const ENV_OVERRIDES: Record<string, string | undefined> = {
  "revenue.json": "ADMIN_REVENUE_JSON",
  "jobs.json": "ADMIN_JOBS_JSON",
};

async function load<T>(file: string): Promise<T> {
  const envKey = ENV_OVERRIDES[file];
  if (envKey) {
    const fromEnv = process.env[envKey];
    if (fromEnv) {
      try {
        return JSON.parse(fromEnv) as T;
      } catch {
        // fall through to file read
      }
    }
  }
  try {
    const raw = await readFile(path.join(DATA_DIR, file), "utf8");
    return JSON.parse(raw) as T;
  } catch (err) {
    if (envKey) {
      // No env, no file — return an empty shape so the page still renders.
      return (file === "revenue.json"
        ? { currency: "USD", paid: [], upcoming: [], projected: [] }
        : []) as T;
    }
    throw err;
  }
}

export type Flagship = {
  key: string;
  name: string;
  tagline: string;
  subtitle: string;
  live: string;
  dashboard: string;
  stat: { label: string; value: string };
  accent: string;
};

export type RevenueItem = {
  source: string;
  kind: string;
  amount: number;
  date?: string;
  expectedDate?: string;
  invoice?: string;
  note?: string;
  live?: boolean;
};

export type Revenue = {
  currency: string;
  paid: RevenueItem[];
  upcoming: RevenueItem[];
  projected: RevenueItem[];
};

export type Job = {
  title: string;
  client: string;
  status: string;
  priority: string;
  team: string;
  next: string;
  due: string;
};

export type Project = {
  id: string;
  name: string;
  purpose: string;
  live: string | null;
  github: string | null;
  vercel: string | null;
  status: string;
};

export type Dashboard = {
  name: string;
  purpose: string;
  url: string;
  owns: string[];
  live: boolean;
};

export type QuickLink = { name: string; url: string; color: string };

export type Idea = {
  title: string;
  buildsOn: string;
  why: string;
  next: string;
};

export type Agent = { name: string; role: string; telegram?: string };

export type Team = {
  name: string;
  tagline: string;
  orchestrator: Agent;
  members: Agent[];
  docs: { label: string; url: string }[];
};

export type Agents = {
  topLevel: Agent & { docs: { label: string; url: string }[] };
  teams: Team[];
};

export const getFlagships = () => load<Flagship[]>("flagships.json");
export const getRevenue = () => load<Revenue>("revenue.json");
export const getJobs = () => load<Job[]>("jobs.json");
export const getProjects = () => load<Project[]>("projects.json");
export const getDashboards = () => load<Dashboard[]>("dashboards.json");
export const getQuickLinks = () => load<QuickLink[]>("quicklinks.json");
export const getIdeas = () => load<Idea[]>("ideas.json");
export const getAgents = () => load<Agents>("agents.json");
