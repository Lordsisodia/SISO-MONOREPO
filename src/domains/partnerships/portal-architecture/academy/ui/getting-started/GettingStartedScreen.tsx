"use client";

"use client";

import { Sparkles, Users, ShieldCheck, Info } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Awards } from "@/components/ui/award";
import { HighlightCard } from "@/components/ui/card-5-static";
import { Button } from "@/components/ui/button";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { FallingPattern } from "@/domains/partnerships/portal-architecture/shared/forlinkpattern/falling-pattern";

export function GettingStartedScreen() {
  const router = useRouter();

  // Mocked data until API wiring
  const levelData = {
    currentLevel: 2,
    currentPoints: 1250,
    pointsToNextLevel: 500,
    nextLevel: 3,
    currentTierId: "builder",
    nextTierId: "vanguard",
  } as const;

  // Program tiers (Trailblazer → Builder → Vanguard → Apex → Sovereign) using saved SVG crests in /public/tiers
  const tierCatalog = [
    { id: "trailblazer", title: "Trailblazer", accent: "#f89f3c", art: "/tiers/Trailblazer.svg" },
    { id: "builder", title: "Builder", accent: "#f89f3c", art: "/tiers/Builder.svg" },
    { id: "vanguard", title: "Vanguard", accent: "#f89f3c", art: "/tiers/Vanguard.svg" },
    { id: "apex", title: "Apex", accent: "#f89f3c", art: "/tiers/Apex.svg" },
    { id: "sovereign", title: "Sovereign", accent: "#f89f3c", art: "/tiers/Sovereign.svg" },
  ];

  const currentTier = tierCatalog.find(t => t.id === levelData.currentTierId) ?? tierCatalog[0];
  const nextTier = tierCatalog.find(t => t.id === levelData.nextTierId) ?? tierCatalog[1];
  const tierPct = Math.round(
    (levelData.currentPoints / (levelData.currentPoints + levelData.pointsToNextLevel)) * 100
  );

  const xpFeed = [
    { title: "Finished Discovery Basics", source: "Course", xp: 120, when: "2h ago" },
    { title: "Shared portfolio link", source: "Engagement", xp: 40, when: "4h ago" },
  ];

  const certificates = { count: 2, badges: 3 };

  return (
    <main className="relative min-h-screen bg-siso-bg-primary text-siso-text-primary">
      <div className="pointer-events-none absolute inset-0 z-0">
        <FallingPattern className="h-full [mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]" />
      </div>
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 lg:py-12">
        <HighlightCard
          color="orange"
          title="My Progress"
          description="Climb tiers to unlock higher earnings and perks."
          metricValue={`Tier • Level ${levelData.currentLevel}`}
          metricLabel={`${levelData.currentPoints} pts • ${levelData.pointsToNextLevel} to Level ${levelData.nextLevel}`}
          buttonText="View tier details"
          onButtonClick={() => router.push("/partners/academy/my-progress/tiers-and-perks")}
          icon={
            <Awards
              variant="badge"
              title="Tier"
              subtitle={`L${levelData.currentLevel}`}
              level="gold"
              showIcon
            />
          }
          hideDivider
          hideFooter
          showCornerIcon={false}
          titleClassName="uppercase tracking-[0.35em] text-white"
          descriptionClassName="text-sm"
        />

        <SettingsGroupCallout
          icon={<Sparkles className="h-4 w-4" />}
          title="Tier progress"
          subtitle="Your path to next tier"
          showChevron={false}
        >
          <div className="space-y-3 rounded-2xl border border-white/10 siso-inner-card px-4 py-4 text-sm text-siso-text-muted shadow-inner">
            <div className="space-y-1 text-base text-white">
              <p className="text-[11px] uppercase tracking-[0.25em] text-white/70">
                Current tier • {currentTier.title} • {tierPct}%
              </p>
              <p className="font-semibold">
                {levelData.pointsToNextLevel} pts to {nextTier?.title ?? "next tier"}
              </p>
              <p className="text-xs text-siso-text-muted">Est. 2–3 wins or 1 course completion to level up</p>
            </div>

            <div className="h-3 rounded-full bg-white/5">
              <div
                  className="h-full rounded-full bg-siso-orange"
                  style={{
                    width: `${Math.min(
                      100,
                      tierPct
                    )}%`,
                  }}
                />
              </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-siso-text-muted">
              <Info className="h-3.5 w-3.5 text-siso-orange" />
              <span>Complete “Discovery Basics” or log a closed-won deal to add +200 pts instantly.</span>
            </div>

            <div className="flex justify-center pt-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full max-w-xs border border-white/15 rounded-2xl"
                onClick={() => router.push("/partners/earnings/tier-progression")}
              >
                View tiers & perks
              </Button>
            </div>
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<Sparkles className="h-4 w-4" />}
          title="XP activity"
          subtitle="Recent points you earned"
          showChevron={false}
        >
          <div className="space-y-3 text-sm text-white rounded-2xl border border-white/10 siso-inner-card px-4 py-4 shadow-inner">
            <div className="flex items-center gap-2 text-[11px] text-siso-text-muted">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5">
                Past 7 days
              </span>
            </div>

            <div className="space-y-2">
              {xpFeed.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between rounded-xl siso-inner-card-strong px-3 py-2 transition hover:bg-white/[0.05]"
                >
                  <div className="space-y-1">
                    <p className="font-semibold">{item.title}</p>
                    <div className="flex items-center gap-2 text-[11px] text-siso-text-muted">
                      <span className="rounded-full bg-white/[0.08] px-2 py-[2px] uppercase tracking-[0.08em]">
                        {item.source}
                      </span>
                      <span>{item.when}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-siso-orange">+{item.xp} XP</p>
                  </div>
                </div>
              ))}
            </div>

          <div className="space-y-1 text-[11px] text-siso-text-muted">
              <div className="flex items-center justify-between">
                <span>
                  {levelData.pointsToNextLevel} pts to Level {levelData.nextLevel}
                </span>
                <span className="text-white">
                  {Math.min(
                    100,
                    Math.round(
                      (levelData.currentPoints / (levelData.currentPoints + levelData.pointsToNextLevel)) * 100,
                    ),
                  )}
                  %
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.round(
                        (levelData.currentPoints / (levelData.currentPoints + levelData.pointsToNextLevel)) * 100,
                      ),
                    )}%`,
                  }}
                />
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                variant="ghost"
                size="sm"
                className="border border-white/15 w-full max-w-xs"
                onClick={() => router.push("/partners/academy/xp-breakdown")}
              >
                See XP breakdown →
              </Button>
            </div>
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<Sparkles className="h-4 w-4" />}
          title="Certificates"
          subtitle="Your earned credentials"
          showChevron={false}
        >
          <div className="space-y-3 rounded-2xl border border-white/10 bg-[rgba(19,13,7,0.65)] px-4 py-4 text-sm text-white shadow-inner">
            <div className="flex items-center justify-between gap-2">
              <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.25em] text-siso-text-muted">
                <span>Next certificate</span>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-1 text-[12px] text-siso-text-muted">
                {certificates.count}
              </span>
            </div>
            <div className="space-y-1">
              <div className="h-2 rounded-full bg-white/5">
                <div className="h-full rounded-full bg-siso-orange" style={{ width: "60%" }} />
              </div>
              <p className="text-xs text-siso-text-muted">60% to next certificate</p>
            </div>
            <p className="text-sm font-semibold text-white">Earn certificates by completing core lessons.</p>
            <div className="flex justify-center">
              <Button
                variant="ghost"
                size="sm"
                className="border border-white/15 w-full max-w-xs"
                onClick={() => router.push("/partners/academy/certificates")}
              >
                View certificates
              </Button>
            </div>
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<Users className="h-4 w-4" />}
          title="Need help?"
          subtitle="Ask the community or reach Partner Success."
          showChevron={false}
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white flex justify-center">
            <Button
              variant="link"
              size="sm"
              className="text-white p-0"
              onClick={() => router.push("/partners/community/help")}
            >
              Open Help Center
            </Button>
          </div>
        </SettingsGroupCallout>
      </div>
    </main>
  );
}
