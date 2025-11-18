export type TierId = "Starter" | "Active" | "Prime" | "Collective";

export type TierMetric = {
  id: string;
  label: string;
  value: number;
  target: number;
  helper: string;
};

export type TierBenefit = {
  perk: string;
  tiers: Record<TierId, string>;
};

export type UnlockMission = {
  id: string;
  title: string;
  description: string;
  reward: string;
  steps: string[];
  tiers?: string[];
};

export type TierHistoryEntry = {
  id: string;
  tier: TierId;
  date: string;
  note: string;
};

export const tierMeta = {
  currentTier: "Active" as TierId,
  nextTier: "Prime" as TierId,
  pointsToNext: 320,
  estUpgradeDate: "Est. Jan 26",
  progressPct: 68,
};

export const tierMetrics: TierMetric[] = [
  { id: "activity", label: "Activity points", value: 680, target: 1000, helper: "Submit 320 more" },
  { id: "nps", label: "Client NPS", value: 4.7, target: 4.8, helper: "Avg of last 5 surveys" },
  { id: "revenue", label: "Revenue contribution", value: 88, target: 100, helper: "% of Prime threshold" },
];

export const tierBenefits: TierBenefit[] = [
  {
    perk: "Commission rate",
    tiers: {
      Starter: "12%",
      Active: "14%",
      Prime: "16%",
      Collective: "18%",
    },
  },
  {
    perk: "Beta feature access",
    tiers: {
      Starter: "Launch previews",
      Active: "+ Ops betas",
      Prime: "Ops + Growth betas",
      Collective: "All betas + roadmap vote",
    },
  },
  {
    perk: "Support SLA",
    tiers: {
      Starter: "72h",
      Active: "48h",
      Prime: "24h",
      Collective: "Dedicated captain",
    },
  },
  {
    perk: "Payout boost",
    tiers: {
      Starter: "—",
      Active: "+2%",
      Prime: "+4%",
      Collective: "+6%",
    },
  },
];

export const unlockMissions: UnlockMission[] = [
  // Trailblazer → Builder (0–1k)
  {
    id: "featured-course",
    title: "Finish a featured course",
    description: "Complete “Discovery Basics” (or any featured course).",
    reward: "+250 XP",
    steps: ["Start the featured course", "Finish modules", "Mark complete"],
    tiers: ["Trailblazer"],
  },
  {
    id: "verified-win-1",
    title: "Log a verified win",
    description: "Close 1 deal with NPS ≥ 4.5 and attach a retro.",
    reward: "+300 XP",
    steps: ["Close deal", "Collect NPS", "Upload retro & proof"],
    tiers: ["Trailblazer"],
  },
  {
    id: "publish-case-card",
    title: "Publish a case card",
    description: "Add a new portfolio/case study with proof links.",
    reward: "+200 XP",
    steps: ["Draft case", "Link proof", "Publish to portfolio"],
    tiers: ["Trailblazer"],
  },
  // Builder → Vanguard (1k–3k)
  {
    id: "win-streak-2",
    title: "Win streak",
    description: "Close 2 deals in 14 days, both NPS ≥ 4.5.",
    reward: "+400 XP",
    steps: ["Close 1st win", "Close 2nd win", "Submit both retros"],
    tiers: ["Builder"],
  },
  {
    id: "ops-beta",
    title: "Use an Ops beta",
    description: "Enable an Ops beta feature and log a success note.",
    reward: "+250 XP",
    steps: ["Enable beta", "Run workflow", "Post outcome note"],
    tiers: ["Builder"],
  },
  {
    id: "growth-sprint",
    title: "Growth sprint",
    description: "Run a 7-day outbound cadence and log 10 replies.",
    reward: "+250 XP",
    steps: ["Launch cadence", "Log replies", "Share summary"],
    tiers: ["Builder"],
  },
  // Vanguard → Apex (3k–10k)
  {
    id: "co-marketing-pack",
    title: "Ship a co-marketing pack",
    description: "Create a co-branded one-pager and publish a LinkedIn post.",
    reward: "+500 XP",
    steps: ["Draft one-pager", "Co-brand review", "Publish social post"],
    tiers: ["Vanguard"],
  },
  {
    id: "pipeline-depth",
    title: "Deepen pipeline",
    description: "Advance 3 opps to Verbal and log notes.",
    reward: "+400 XP",
    steps: ["Move opps to Verbal", "Add notes", "Tag wins"],
    tiers: ["Vanguard"],
  },
  {
    id: "mentor-two",
    title: "Mentor sessions",
    description: "Host 2 onboarding sessions for Trailblazers; submit recaps.",
    reward: "+300 XP",
    steps: ["Claim mentees", "Host sessions", "Submit recaps"],
    tiers: ["Vanguard"],
  },
  // Apex → Sovereign (10k–25k+)
  {
    id: "lighthouse-win",
    title: "Lighthouse win",
    description: "Close 1 deal >$20k ACV with shared retro.",
    reward: "+700 XP",
    steps: ["Close deal", "Upload retro", "Link proof"],
    tiers: ["Apex"],
  },
  {
    id: "feature-influence",
    title: "Influence a feature",
    description: "Submit 1 accepted roadmap proposal or beta feedback with metrics.",
    reward: "+400 XP",
    steps: ["Submit proposal", "Provide metrics", "Get acceptance noted"],
    tiers: ["Apex"],
  },
  {
    id: "community-spotlight",
    title: "Community spotlight",
    description: "Lead a 20-minute spotlight/workshop and upload recording.",
    reward: "+350 XP",
    steps: ["Host session", "Record", "Upload link"],
    tiers: ["Apex"],
  },
  // Global weekly rotations
  {
    id: "nps-guardrail",
    title: "NPS guardrail",
    description: "Keep rolling NPS ≥ 4.6 across your last 5 surveys.",
    reward: "+250 XP",
    steps: ["Collect surveys", "Maintain ≥4.6", "Submit snapshot"],
    tiers: ["Global"],
  },
  {
    id: "weekly-updates",
    title: "Weekly updates streak",
    description: "Post pipeline updates weekly for 3 weeks straight.",
    reward: "+200 XP",
    steps: ["Week 1 update", "Week 2 update", "Week 3 update"],
    tiers: ["Global"],
  },
  {
    id: "asset-adoption",
    title: "Asset adoption",
    description: "Drive 3 partners to use a shared asset (tracked link proof).",
    reward: "+250 XP",
    steps: ["Share asset link", "Collect 3 uses", "Submit proof"],
    tiers: ["Global"],
  },
];

export const tierHistory: TierHistoryEntry[] = [
  { id: "h1", tier: "Starter", date: "Jan 2024", note: "Joined program" },
  { id: "h2", tier: "Active", date: "May 2024", note: "Hit activity streak + NPS 4.6" },
];
