import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, Flag, Trophy, Award as AwardIcon, Target, Wallet as WalletIcon } from "lucide-react";
import { LazyPartnersPageShell } from "@/domains/partnerships/community/ui/LazyPartnersPageShell";
import { HighlightCard } from "@/components/ui/card-5-static";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { Button } from "@/components/ui/button";
import { Waves } from "@/components/ui/wave-background";
import { walletSummary, ledgerEntries, complianceChecklist } from "@/domains/partnerships/earnings/data/walletData";
import { earningsChallenges } from "@/domains/partnerships/earnings/data/earningsChallenges";
import { badgeCollection, leaderboardEntries } from "@/domains/partnerships/earnings/data/earningsAchievements";
import { tierMeta, tierMetrics } from "@/domains/partnerships/earnings/data/tierProgression";
import {
  ChallengesWidget,
  LeaderboardWidget,
  AchievementsWidget,
  TierWidget,
  WalletWidget,
} from "@/domains/partnerships/earnings/ui/dashboard/widgets";

export default function EarningsDashboardPage() {
  const activeChallenges = earningsChallenges.filter((challenge) => challenge.status === "active");
  const upcomingChallenges = earningsChallenges.filter((challenge) => challenge.status === "upcoming");
  const featuredChallenge = activeChallenges[0]
    ? { ...activeChallenges[0], name: activeChallenges[0].name.split(" ").slice(0, 2).join(" ") }
    : undefined;

  return (
    <LazyPartnersPageShell initialState={{ activeDrawerSection: "growth" }}>
      <main className="relative min-h-screen overflow-hidden bg-siso-bg-primary text-siso-text-primary">
        <div className="pointer-events-none absolute inset-0 z-0" style={{ filter: "blur(5px)", opacity: 0.45 }}>
          <Suspense
            fallback={
              <div
                className="h-full w-full bg-[radial-gradient(circle_at_top,#20140a,#050505)] opacity-70"
                aria-hidden="true"
              />
            }
          >
            <Waves className="h-full w-full" strokeColor="#f8a75c" backgroundColor="transparent" pointerSize={0.25} />
          </Suspense>
        </div>
        <div className="relative z-10 space-y-6 p-4 lg:p-8">
          <HighlightCard
            color="orange"
            title="Earnings Dashboard"
            description="Monitor payouts, commissions, recognition, and tier momentum from one place."
            icon={<span className="text-xl" aria-hidden="true">💰</span>}
            hideDivider
            showCornerIcon={false}
            className="w-full"
            fullWidth
            titleClassName="uppercase tracking-[0.35em] text-white"
            descriptionClassName="text-sm"
          />

          <div className="space-y-5">
            <SettingsGroupCallout
              icon={<WalletIcon className="h-4 w-4" aria-hidden="true" />}
              title="Wallet & payouts"
              subtitle="Manage balances, payout cadence, rails, and compliance."
              showChevron={false}
            >
              <WalletWidget
                balance={walletSummary.balance}
                nextPayout={walletSummary.nextPayoutDate}
                connectedRails={walletSummary.connected}
                ledgerPreview={ledgerEntries}
                compliance={complianceChecklist}
              />
              <CalloutButton href="/partners/earnings/wallet" label="Open wallet" />
            </SettingsGroupCallout>

            <SettingsGroupCallout
              icon={<Target className="h-4 w-4" aria-hidden="true" />}
              title="Tier progression"
              subtitle="Track XP, missions, and the perks unlocking next."
              showChevron={false}
            >
              <TierWidget tierMeta={tierMeta} metrics={tierMetrics} />
              <CalloutButton href="/partners/earnings/tier-progression" label="Open tier board" />
            </SettingsGroupCallout>

            <SettingsGroupCallout
              icon={<AwardIcon className="h-4 w-4" aria-hidden="true" />}
              title="Achievements"
              subtitle="Badges, boosters, and recognition moments unlocked by your work."
              showChevron={false}
            >
              <AchievementsWidget
                earnedBadges={badgeCollection.filter((badge) => badge.status === "earned")}
                inProgressBadges={badgeCollection.filter((badge) => badge.status === "in-progress")}
              />
              <CalloutButton href="/partners/earnings/achievements" label="Open achievements" />
            </SettingsGroupCallout>

            <SettingsGroupCallout
              icon={<Trophy className="h-4 w-4" aria-hidden="true" />}
              title="Leaderboard"
              subtitle="See where you rank and borrow plays from the top partners."
              showChevron={false}
            >
              <LeaderboardWidget leaders={leaderboardEntries} />
              <CalloutButton href="/partners/earnings/leaderboard" label="Open leaderboard" />
            </SettingsGroupCallout>

            <SettingsGroupCallout
              icon={<Flag className="h-4 w-4" aria-hidden="true" />}
              title="Challenges"
              subtitle="Sprint missions with payout boosts and ops rewards."
              showChevron={false}
            >
              <ChallengesWidget
                featured={featuredChallenge}
                activeCount={activeChallenges.length}
                upcomingCount={upcomingChallenges.length}
              />
              <CalloutButton href="/partners/earnings/challenges" label="Open challenges" />
            </SettingsGroupCallout>
          </div>
        </div>
      </main>
    </LazyPartnersPageShell>
  );
}

function CalloutButton({ href, label }: { href: string; label: string }) {
  return (
    <Button
      asChild
      size="sm"
      className="mt-4 w-full rounded-full bg-white/15 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white hover:bg-white/25"
    >
      <Link href={href} className="inline-flex items-center justify-center gap-2">
        {label}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </Button>
  );
}
