import type { LucideIcon } from "lucide-react";
import { Award, Medal, Crown, Gem } from "lucide-react";

export type PartnerTierId = "bronze" | "silver" | "gold" | "platinum";

type TierVisuals = {
  crestIcon: LucideIcon;
  crestGradient: string;
  accentGlow: string;
  accentBorder: string;
};

export type TierDefinition = {
  id: PartnerTierId;
  title: string;
  commissionRate: number;
  color: string;
  description: string;
  visuals: TierVisuals;
  requirements: {
    commissionsUSD: number;
    referrals: number;
    training: string;
    monthsActive: number;
    extra?: string;
  };
  benefits: string[];
};

export const tierDefinitions: TierDefinition[] = [
  {
    id: "bronze",
    title: "Bronze",
    commissionRate: 0.2,
    color: "#cd7f32",
    description: "Kick-off tier for new partners",
    visuals: {
      crestIcon: Award,
      crestGradient: "from-[#5d3b1c] via-[#b8773c] to-[#f3c690]",
      accentGlow: "rgba(248, 166, 62, 0.55)",
      accentBorder: "rgba(248, 166, 62, 0.35)",
    },
    requirements: {
      commissionsUSD: 0,
      referrals: 0,
      training: "Onboarding",
      monthsActive: 0,
    },
    benefits: ["20% base commission", "Campus + Pipeline access"],
  },
  {
    id: "silver",
    title: "Silver",
    commissionRate: 0.25,
    color: "#c0c0c0",
    description: "Reliable operator with proven output",
    visuals: {
      crestIcon: Medal,
      crestGradient: "from-[#2b2f40] via-[#6d768b] to-[#f2f5ff]",
      accentGlow: "rgba(188, 196, 214, 0.5)",
      accentBorder: "rgba(188, 196, 214, 0.4)",
    },
    requirements: {
      commissionsUSD: 5000,
      referrals: 10,
      training: "Core modules",
      monthsActive: 3,
    },
    benefits: ["25% commission", "Mentor office hours", "Affiliate dashboard access"],
  },
  {
    id: "gold",
    title: "Gold",
    commissionRate: 0.3,
    color: "#f6b75e",
    description: "Consistent closer and pipeline leader",
    visuals: {
      crestIcon: Crown,
      crestGradient: "from-[#4f2f12] via-[#f5b042] to-[#ffe38a]",
      accentGlow: "rgba(255, 199, 94, 0.55)",
      accentBorder: "rgba(255, 199, 94, 0.45)",
    },
    requirements: {
      commissionsUSD: 15000,
      referrals: 25,
      training: "Advanced certification",
      monthsActive: 6,
      extra: "Lead quality score >70%",
    },
    benefits: ["30% commission", "Priority support", "Campaign co-marketing"],
  },
  {
    id: "platinum",
    title: "Platinum",
    commissionRate: 0.35,
    color: "#e5e4e2",
    description: "Strategic partner and pod leader",
    visuals: {
      crestIcon: Gem,
      crestGradient: "from-[#2a1f4f] via-[#7c7bff] to-[#e6e6ff]",
      accentGlow: "rgba(124, 123, 255, 0.45)",
      accentBorder: "rgba(124, 123, 255, 0.45)",
    },
    requirements: {
      commissionsUSD: 50000,
      referrals: 50,
      training: "All modules + specialist",
      monthsActive: 12,
      extra: "Consistent performance",
    },
    benefits: ["35% commission", "Dedicated success manager", "Early product access"],
  },
];
