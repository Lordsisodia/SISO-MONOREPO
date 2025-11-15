import { SettingsDetailLayout } from "@/domains/partnerships/settings/ui/mobile/components/SettingsDetailLayout";
import {
  Trophy,
  CheckCircle2,
  Circle,
  Lock,
  HelpCircle,
  ArrowUpRight,
  PiggyBank,
  UserPlus,
  GraduationCap,
  Clock3,
  Activity,
  Sparkles,
  ShieldCheck,
  Star,
  LineChart,
} from "lucide-react";
import { GlowDivider } from "@/domains/shared/components/GlowDivider";
import { tierDefinitions, PartnerTierId } from "./tier-definitions";
import { cn } from "@/domains/shared/utils/cn";

const partnerSnapshot = {
  currentTierId: "silver" as PartnerTierId,
  commissionsUSD: 10250,
  referrals: 18,
  monthsActive: 5,
  completedTraining: ["Onboarding", "Core modules"],
  leadQualityScore: 78,
  nextTierProgress: 0.65,
};

const requirementIconMap = {
  commissions: PiggyBank,
  referrals: UserPlus,
  training: GraduationCap,
  months: Clock3,
  extra: Activity,
};

const benefitIconCycle = [Sparkles, ShieldCheck, Star, LineChart];

export function TierListScreen() {
  const currentTierIndex = tierDefinitions.findIndex((tier) => tier.id === partnerSnapshot.currentTierId);
  const currentTier = tierDefinitions[currentTierIndex] ?? tierDefinitions[0];
  const nextTier = tierDefinitions[currentTierIndex + 1];
  const CrestIcon = currentTier.visuals.crestIcon;

  const ladder = tierDefinitions.map((tier, index) => {
    if (index < currentTierIndex) return { tier, status: "completed" as const };
    if (index === currentTierIndex) return { tier, status: "current" as const };
    return { tier, status: "upcoming" as const };
  });

  const heroStats = [
    { label: "Commissions", value: `$${partnerSnapshot.commissionsUSD.toLocaleString()}` },
    { label: "Referrals", value: partnerSnapshot.referrals },
    { label: "Months active", value: partnerSnapshot.monthsActive },
  ];

  const requirementCards = nextTier
    ? (
        [
          {
            id: "commissions",
            label: "Total commissions",
            value: `$${partnerSnapshot.commissionsUSD.toLocaleString()}`,
            target: `$${nextTier.requirements.commissionsUSD.toLocaleString()}`,
            met: partnerSnapshot.commissionsUSD >= nextTier.requirements.commissionsUSD,
            helper: "Close two more retainers to lock this in.",
          },
          {
            id: "referrals",
            label: "Partner referrals",
            value: partnerSnapshot.referrals,
            target: nextTier.requirements.referrals,
            met: partnerSnapshot.referrals >= nextTier.requirements.referrals,
            helper: "Keep the warm intro cadence running weekly.",
          },
          {
            id: "training",
            label: nextTier.requirements.training,
            value: partnerSnapshot.completedTraining.includes(nextTier.requirements.training) ? "Completed" : "Pending",
            target: "Required",
            met: partnerSnapshot.completedTraining.includes(nextTier.requirements.training),
            helper: "Book a sprint with Enablement to finish.",
          },
          {
            id: "months",
            label: "Months active",
            value: partnerSnapshot.monthsActive,
            target: nextTier.requirements.monthsActive,
            met: partnerSnapshot.monthsActive >= nextTier.requirements.monthsActive,
            helper: "Stay consistent to build the streak.",
          },
          nextTier.requirements.extra
            ? {
                id: "extra",
                label: nextTier.requirements.extra,
                value: `${partnerSnapshot.leadQualityScore}% quality score`,
                target: ">70%",
                met: partnerSnapshot.leadQualityScore >= 70,
                helper: "Tighten lead notes for cleaner handoffs.",
              }
            : null,
        ].filter(Boolean) as Array<{
          id: keyof typeof requirementIconMap;
          label: string;
          value: string | number;
          target: string | number;
          met: boolean;
          helper: string;
        }>
      )
    : [];

  const heroProgressPercent = nextTier ? Math.min(Math.round(partnerSnapshot.nextTierProgress * 100), 100) : 100;

  return (
    <SettingsDetailLayout
      title="My Tiers"
      description="Track progress, unlock new benefits, and see what it takes to level up."
      icon={<Trophy className="h-5 w-5 text-siso-orange" />}
      wrapContent={false}
    >
      <div className="space-y-6 text-siso-text-primary">
        <section
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-siso-bg-secondary/95 via-[#11131b] to-[#1e2130] px-4 py-5 text-white shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
          style={{ boxShadow: `0 35px 80px ${currentTier.visuals.accentGlow}` }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-45"
            style={{
              background: `radial-gradient(circle at 20% 25%, ${currentTier.color}33, transparent 60%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.2), transparent 55%)`,
            }}
          />
          <div className="relative flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-white/65">Current tier</p>
                <h2 className="text-2xl font-semibold text-white">{currentTier.title}</h2>
                <p className="text-xs text-white/70">
                  {Math.round(currentTier.commissionRate * 100)}% commission · {currentTier.description}
                </p>
              </div>
              <div className="relative h-16 w-16 shrink-0">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-70 blur-xl" />
                <div
                  className={cn(
                    "relative flex h-full w-full items-center justify-center rounded-3xl border border-white/20 bg-white/5 text-white",
                    "shadow-[0_15px_30px_rgba(0,0,0,0.45)]",
                    "bg-gradient-to-br",
                    currentTier.visuals.crestGradient,
                  )}
                >
                  <CrestIcon className="h-6 w-6" />
                </div>
              </div>
            </div>

            {nextTier ? (
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 shrink-0">
                  <div className="absolute inset-0 rounded-full border border-white/10 bg-black/20" />
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(var(--siso-orange) ${heroProgressPercent}%, rgba(255,255,255,0.08) ${heroProgressPercent}% 100%)`,
                    }}
                  />
                  <div className="relative flex h-full w-full items-center justify-center rounded-full bg-[#090b10] text-center text-lg font-semibold">
                    {heroProgressPercent}%
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between text-xs text-white/70">
                    <span>Progress to {nextTier.title}</span>
                    <span>{heroProgressPercent}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/15">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[var(--siso-red)] via-[var(--siso-orange)] to-[#ffd166]"
                      style={{ width: `${heroProgressPercent}%` }}
                    />
                  </div>
                  <p className="text-xs text-white/65">
                    Complete {nextTier.requirements.training} and secure {Math.max(nextTier.requirements.referrals - partnerSnapshot.referrals, 0)} more referrals to unlock.
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-white/70">You’re at the highest tier. Keep leading the pod.</p>
            )}

            <GlowDivider className="w-16" height={4} />

            <ul className="grid grid-cols-3 gap-3 text-left text-white">
              {heroStats.map((stat) => (
                <li key={stat.label} className="rounded-2xl border border-white/15 bg-white/5 px-3 py-2">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/60">{stat.label}</p>
                  <p className="text-lg font-semibold text-white">{stat.value}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-semibold text-siso-text-primary">Tier ladder</p>
              <p className="text-xs text-siso-text-muted">See where you stand across the partnership journey.</p>
            </div>
            <GlowDivider className="w-12" height={4} />
          </div>

          <div className="space-y-3">
            {ladder.map(({ tier, status }, index) => {
              const Icon = tier.visuals.crestIcon;

              return (
                <article
                  key={tier.id}
                  className={cn(
                    "relative overflow-hidden rounded-2xl border px-4 py-3 transition",
                    status === "current" && "border-siso-orange/70 bg-siso-bg-secondary/80 shadow-[0_12px_32px_rgba(0,0,0,0.45)]",
                    status === "completed" && "border-siso-border/40 bg-siso-bg-secondary/40",
                    status === "upcoming" && "border-dashed border-siso-border/50 bg-siso-bg-secondary/30",
                  )}
                  style={{ boxShadow: status === "current" ? `0 15px 45px ${tier.visuals.accentGlow}` : undefined }}
                >
                  <div className="absolute inset-y-0 left-0 w-1 rounded-full" style={{ background: tier.visuals.accentBorder }} />
                  <div className="ml-3 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-2xl border border-white/5 bg-siso-bg-primary/40 text-white",
                            "bg-gradient-to-br",
                            tier.visuals.crestGradient,
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-siso-text-primary">{tier.title}</p>
                            <span className="text-xs text-siso-text-muted">{Math.round(tier.commissionRate * 100)}% commission</span>
                          </div>
                          <p className="text-xs text-siso-text-muted">{tier.description}</p>
                        </div>
                      </div>

                      {status === "completed" ? (
                        <div className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
                          Unlocked
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                      ) : status === "current" ? (
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 rounded-full border border-siso-border/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-siso-text-primary transition hover:border-siso-orange hover:text-siso-orange"
                        >
                          View playbook
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </button>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full border border-siso-border/50 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-siso-text-muted">
                          Locked
                          <Lock className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 text-[11px] uppercase text-siso-text-muted">
                      <span>#{index + 1} in ladder</span>
                      <span>{tier.benefits.length} key perks</span>
                      <span>Focus: {tier.requirements.training}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {nextTier ? (
          <section className="space-y-3 rounded-3xl border border-siso-border/60 bg-siso-bg-secondary/60 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-semibold text-siso-text-primary">Requirements for {nextTier.title}</p>
                <p className="text-xs text-siso-text-muted">Clear the checklist to unlock the next crest.</p>
              </div>
              <GlowDivider className="w-10" height={3} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {requirementCards.map((requirement, index) => {
                const Icon = requirementIconMap[requirement.id];

                return (
                  <div
                    key={requirement.label}
                    className={cn(
                      "rounded-2xl border px-3 py-3 text-sm transition",
                      requirement.met
                        ? "border-emerald-400/50 bg-emerald-400/5"
                        : "border-siso-border/60 bg-siso-bg-secondary/70",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2">
                        <span
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-2xl border border-siso-border/50 bg-siso-bg-primary/50",
                            requirement.met && "border-emerald-400/50 bg-emerald-500/10 text-emerald-300",
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.2em] text-siso-text-muted">{requirement.label}</p>
                          <p className="text-base font-semibold text-siso-text-primary">{requirement.value}</p>
                        </div>
                      </div>
                      {requirement.met ? (
                        <CheckCircle2 className="mt-1 h-4 w-4 text-emerald-400" />
                      ) : (
                        <Circle className="mt-1 h-4 w-4 text-siso-text-muted" />
                      )}
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-siso-text-muted">
                      <span>Goal {requirement.target}</span>
                      {!requirement.met && (
                        <button type="button" className="text-siso-orange underline-offset-2 hover:underline">
                          View plan
                        </button>
                      )}
                    </div>
                    <p className="mt-1 text-[11px] text-siso-text-muted">{requirement.helper}</p>
                  </div>
                );
              })}
            </div>
          </section>
        ) : null}

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-base font-semibold text-siso-text-primary">Tier benefits</p>
            <GlowDivider className="w-12" height={4} />
          </div>

          <div className="grid gap-4">
            <div className="rounded-3xl border border-siso-border/70 bg-siso-bg-secondary/80 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-siso-text-primary">What you have ({currentTier.title})</p>
                <span className="text-xs uppercase tracking-[0.35em] text-siso-text-muted">Active</span>
              </div>
              <div className="mt-3 grid gap-2">
                {currentTier.benefits.map((benefit, index) => {
                  const Icon = benefitIconCycle[index % benefitIconCycle.length];

                  return (
                    <div
                      key={benefit}
                      className="flex items-center justify-between rounded-2xl border border-siso-border/40 bg-siso-bg-tertiary/50 px-3 py-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-siso-orange">
                          <Icon className="h-4 w-4" />
                        </span>
                        <p className="text-sm text-siso-text-primary">{benefit}</p>
                      </div>
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    </div>
                  );
                })}
              </div>
            </div>

            {nextTier ? (
              <div className="rounded-3xl border border-siso-orange/40 bg-siso-bg-secondary/70 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-siso-text-primary">What’s next ({nextTier.title})</p>
                    <p className="text-xs text-siso-text-muted">Preview perks unlocked immediately after promotion.</p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-full border border-siso-border/50 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-siso-text-primary"
                  >
                    Compare
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="mt-3 grid gap-2">
                  {nextTier.benefits.map((benefit, index) => {
                    const Icon = benefitIconCycle[(index + 1) % benefitIconCycle.length];

                    return (
                      <div
                        key={benefit}
                        className="flex items-center justify-between rounded-2xl border border-dashed border-siso-border/50 bg-siso-bg-secondary/40 px-3 py-2"
                      >
                        <div className="flex items-center gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-siso-bg-primary/40 text-siso-text-muted">
                            <Icon className="h-4 w-4" />
                          </span>
                          <p className="text-sm text-siso-text-primary">{benefit}</p>
                        </div>
                        <Lock className="h-4 w-4 text-siso-text-muted" />
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-siso-border/60 bg-gradient-to-br from-[#12131c] via-[#191c29] to-[#0c0d12] px-4 py-5">
          <div className="space-y-3 text-siso-text-primary">
            <div>
              <p className="text-sm font-semibold">Need a boost?</p>
              <p className="text-xs text-siso-text-muted">Tap into HQ coaches or swap playbooks with top pods.</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-siso-text-muted">
                <Sparkles className="h-4 w-4 text-siso-orange" /> Audit your funnel with Enablement Live.
              </div>
              <div className="flex items-center gap-2 text-siso-text-muted">
                <ShieldCheck className="h-4 w-4 text-siso-orange" /> Get paired with a Platinum mentor for 2 weeks.
              </div>
            </div>
            <div className="flex gap-3 text-sm font-semibold">
              <button
                type="button"
                className="flex-1 rounded-2xl bg-gradient-to-r from-[var(--siso-red)] via-[var(--siso-orange)] to-[#ffd166] py-2 text-center text-[#0b0b0f] shadow-[0_15px_35px_rgba(0,0,0,0.45)]"
              >
                Book a call with HQ
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-2xl border border-siso-border/60 px-4 py-2 text-siso-text-primary"
              >
                Share wins
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-2 flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-white/80 backdrop-blur">
            <HelpCircle className="h-6 w-6" />
          </div>
        </section>
      </div>
    </SettingsDetailLayout>
  );
}
