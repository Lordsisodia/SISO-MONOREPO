import Link from "next/link";
import { Suspense } from "react";
import Image from "next/image";
import { ArrowLeft, Info, Sparkles } from "lucide-react";
import { Awards } from "@/components/ui/award";
import { HighlightCard } from "@/components/ui/card-5-static";
import { Button } from "@/components/ui/button";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { Waves } from "@/components/ui/wave-background";

const levelData = {
  currentLevel: 2,
  currentPoints: 1250,
  pointsToNextLevel: 500,
  nextLevel: 3,
  currentTierId: "builder",
  nextTierId: "vanguard",
} as const;

const tierCatalog = [
  { id: "trailblazer", title: "Trailblazer", art: "/tiers/Trailblazer.svg" },
  { id: "builder", title: "Builder", art: "/tiers/Builder.svg" },
  { id: "vanguard", title: "Vanguard", art: "/tiers/Vanguard.svg" },
  { id: "apex", title: "Apex", art: "/tiers/Apex.svg" },
  { id: "sovereign", title: "Sovereign", art: "/tiers/Sovereign.svg" },
];

const xpFeed = [
  { title: "Finished Discovery Basics", source: "Course", xp: 120, when: "2h ago" },
  { title: "Shared portfolio link", source: "Engagement", xp: 40, when: "4h ago" },
];

const certificates = { count: 2, badges: 3 };

export function GettingStartedScreen() {
  const currentTier = tierCatalog.find((t) => t.id === levelData.currentTierId) ?? tierCatalog[0];
  const nextTier = tierCatalog.find((t) => t.id === levelData.nextTierId) ?? tierCatalog[1];
  const tierPct = Math.round(
    (levelData.currentPoints / (levelData.currentPoints + levelData.pointsToNextLevel)) * 100,
  );

  return (
    <main className="relative min-h-screen bg-siso-bg-primary text-siso-text-primary">
      <div className="pointer-events-none absolute inset-0 z-0" style={{ filter: "blur(6px)", opacity: 0.9 }}>
        <Suspense fallback={<div className="h-full w-full bg-[#0b0b0f]" aria-hidden="true" />}>
          <Waves className="h-full w-full" strokeColor="#f8a75c" backgroundColor="#0b0b0f" pointerSize={0.35} />
        </Suspense>
      </div>
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 lg:py-12">
        <div className="relative min-h-[128px]">
          <div className="pointer-events-none absolute inset-y-0 left-3 z-10 flex items-center">
            <Link
              href="/partners/academy"
              aria-label="Back"
              className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center text-white transition hover:text-white/80"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </div>
          <HighlightCard
            color="orange"
            title="My Progress"
            description="Climb tiers to unlock higher earnings and perks."
            metricValue={`Tier • Level ${levelData.currentLevel}`}
            metricLabel={`${levelData.currentPoints} pts • ${levelData.pointsToNextLevel} to Level ${levelData.nextLevel}`}
            buttonText="View tier details"
            buttonHref="/partners/academy/my-progress/tiers-and-perks"
            icon={<Awards variant="badge" title="Tier" subtitle={`L${levelData.currentLevel}`} level="gold" showIcon />}
            className="w-full pl-12"
            hideDivider
            hideFooter
            showCornerIcon={false}
            titleClassName="uppercase tracking-[0.35em] text-white"
            descriptionClassName="text-sm"
          />
        </div>

        <SettingsGroupCallout icon={<Sparkles className="h-4 w-4" />} title="Tier progress" subtitle="Your path to next tier" showChevron={false}>
          <div className="space-y-3 rounded-2xl border border-white/10 siso-inner-card px-4 py-4 text-sm text-siso-text-muted shadow-inner">
            <div className="relative overflow-hidden rounded-2xl border border-white/10">
              {currentTier.art ? (
                <Image src={currentTier.art} alt={`${currentTier.title} crest`} width={1200} height={260} className="h-40 w-full object-cover" />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-transparent" />
            </div>

            <div className="space-y-1 text-base text-white">
              <p className="text-[11px] uppercase tracking-[0.25em] text-white/70">
                Current tier • {currentTier.title} • {tierPct}%
              </p>
              <p className="font-semibold">{levelData.pointsToNextLevel} pts to {nextTier?.title ?? "next tier"}</p>
              <p className="text-xs text-siso-text-muted">Est. 2–3 wins or 1 course completion to level up</p>
            </div>

            <div className="h-3 rounded-full bg-white/5">
              <div className="h-full rounded-full bg-siso-orange" style={{ width: `${Math.min(100, tierPct)}%` }} />
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-siso-text-muted">
              <Info className="h-3.5 w-3.5 text-siso-orange" />
              <span>Complete “Discovery Basics” or log a closed-won deal to add +200 pts instantly.</span>
            </div>

            <div className="flex justify-center pt-2">
              <Button asChild variant="ghost" size="sm" className="w-full max-w-xs border border-white/15 rounded-2xl">
                <Link href="/partners/earnings/tier-progression">View tiers & perks</Link>
              </Button>
            </div>
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout icon={<Sparkles className="h-4 w-4" />} title="XP activity" subtitle="Recent points you earned" showChevron={false}>
          <div className="space-y-3 text-sm text-white rounded-2xl border border-white/10 siso-inner-card px-4 py-4 shadow-inner">
            <div className="flex items-center gap-2 text-[11px] text-siso-text-muted">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5">Past 7 days</span>
            </div>
            <div className="space-y-2">
              {xpFeed.map((item) => (
                <div key={item.title} className="flex items-center justify-between rounded-xl siso-inner-card-strong px-3 py-2">
                  <div className="space-y-1">
                    <p className="font-semibold">{item.title}</p>
                    <div className="flex items-center gap-2 text-[11px] text-siso-text-muted">
                      <span className="rounded-full bg-white/[0.08] px-2 py-[2px] uppercase tracking-[0.08em]">{item.source}</span>
                      <span>{item.when}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-siso-orange">+{item.xp} XP</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout icon={<Sparkles className="h-4 w-4" />} title="Certificates & badges" subtitle="Milestones you’ve hit" showChevron={false}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-white">
              <p className="text-xs uppercase tracking-[0.3em] text-siso-text-muted">Certificates</p>
              <p className="text-3xl font-bold">{certificates.count}</p>
              <p className="text-sm text-siso-text-muted">Course certificates earned</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-white">
              <p className="text-xs uppercase tracking-[0.3em] text-siso-text-muted">Badges</p>
              <p className="text-3xl font-bold">{certificates.badges}</p>
              <p className="text-sm text-siso-text-muted">Unique achievements unlocked</p>
            </div>
          </div>
        </SettingsGroupCallout>
      </div>
    </main>
  );
}
