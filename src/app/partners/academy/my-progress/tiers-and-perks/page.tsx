import Link from "next/link";
import { ShieldCheck, Sparkles } from "lucide-react";
import { HighlightCard } from "@/components/ui/card-5-static";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { Button } from "@/components/ui/button";
import { TierCarousel } from "./TierCarousel.client";

const tiers = [
  {
    level: 1,
    name: "Starter",
    points: 0,
    requirement: "Sign up + complete onboarding",
    perks: ["Help Center access", "Community messages", "Office hours booking"],
  },
  {
    level: 2,
    name: "Active",
    points: 500,
    requirement: "500 pts + 1 course complete",
    perks: ["Priority office hours", "Saved Docs sync", "Portfolio share links"],
  },
  {
    level: 3,
    name: "Prime",
    points: 1200,
    requirement: "1200 pts + 3 courses complete",
    perks: ["Lead routing access", "Enhanced commission rate", "Early access to pitch kits"],
  },
  {
    level: 4,
    name: "Elite",
    points: 2500,
    requirement: "2500 pts + 5 courses complete",
    perks: ["Priority leads", "Custom pitch kit support", "Achievement celebrations"],
  },
];

export default function TierPerksPage() {
  return (
    <main className="bg-siso-bg-primary text-siso-text-primary min-h-screen">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 lg:py-12">
        <div className="relative">
          <HighlightCard
            color="orange"
            title="Tiers & perks"
            description="Understand every tier, what it unlocks, and how to level up."
            metricValue="4 tiers"
            metricLabel="Starter → Elite"
            icon={<Sparkles className="h-5 w-5 text-siso-orange" />}
            hideDivider
            hideFooter
            showCornerIcon={false}
            titleClassName="uppercase tracking-[0.35em] text-white"
            descriptionClassName="text-sm"
          />
          <Button variant="ghost" size="sm" className="absolute left-1 top-1/2 -translate-y-1/2 text-white" asChild>
            <Link href="/partners/academy/my-progress" aria-label="Back to progress">
              ←
            </Link>
          </Button>
        </div>

        <SettingsGroupCallout
          icon={<ShieldCheck className="h-4 w-4" />}
          title="All tiers"
          subtitle="Requirements and perks"
          showChevron={false}
        >
          <TierCarousel tiers={tiers} />
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<Sparkles className="h-4 w-4" />}
          title="How to level up"
          subtitle="Quick reminders"
          showChevron={false}
        >
          <div className="space-y-2 text-sm text-siso-text-muted">
            <p>• Complete courses to earn the bulk of your points.</p>
            <p>• Share assets and engage to pick up small XP boosts.</p>
            <p>• Certificates typically unlock at higher tiers—keep progressing.</p>
            <Button variant="ghost" size="sm" className="border border-white/10 mt-2" asChild>
              <Link href="/partners/academy/xp-breakdown">View XP activity</Link>
            </Button>
          </div>
        </SettingsGroupCallout>
      </div>
    </main>
  );
}
