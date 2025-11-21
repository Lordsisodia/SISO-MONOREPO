import { Suspense } from "react";
import Link from "next/link";

import { LazyPartnersPageShell } from "@/domains/partnerships/community/ui/LazyPartnersPageShell";
import { HighlightCard } from "@/components/ui/card-5-static";
import { Waves } from "@/components/ui/wave-background";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Handshake, Users, UserPlus, Paperclip, Medal } from "lucide-react";
import { teamMembers } from "@/domains/partnerships/recruitment/team/data/members";

const teamHighlights = [
  {
    title: "Active sales team",
    description: "Reps cleared to sell and paid overrides.",
    icon: <Handshake className="h-5 w-5" aria-hidden />,
  },
];

const livePartnerSummary = {
  metricValue: "18",
  metricLabel: "Live partners",
  description: "Cleared to sell and paid overrides.",
  buttonText: "Invite partner",
  href: "/partners/recruitment/prospects",
};

const quickHelpLinks = [
  { title: "Invite troubleshooting", description: "Checklist for compliance + wallet blockers.", href: "/partners/recruitment/prospects" },
  { title: "Academy playbook", description: "Remind reps which lessons unlock overrides.", href: "/partners/academy" },
  { title: "Wallet support", description: "Direct line to payouts + compliance review.", href: "/partners/earnings" },
];

const teamLeaderboard = [
  { name: "Avery Diaz", approvals: 6, overrides: 2, payouts: "$9.3K", approvalTime: "4.2 days" },
  { name: "Jordan Kim", approvals: 4, overrides: 1, payouts: "$5.1K", approvalTime: "5.4 days" },
  { name: "Marin Patel", approvals: 3, overrides: 1, payouts: "$4.2K", approvalTime: "3.8 days" },
];

export function RecruitmentTeamContent() {
  return (
    <LazyPartnersPageShell initialState={{ activeDrawerSection: "recruitment" }} showFloatingNavButton={false}>
      <section className="relative min-h-screen bg-siso-bg-primary text-siso-text-primary">
        <div className="pointer-events-none absolute inset-0 z-0" style={{ filter: "blur(5px)", opacity: 0.45, height: "120%" }}>
          <Suspense
            fallback={
              <div
                className="h-full w-full bg-[radial-gradient(circle_at_top,#20140a,#050505)] opacity-60"
                aria-hidden="true"
              />
            }
          >
            <Waves className="h-full w-full" strokeColor="#f8a75c" backgroundColor="transparent" pointerSize={0.25} />
          </Suspense>
        </div>

        <div className="relative z-10 space-y-6 p-4 lg:p-8">
          <div className="relative min-h-[128px]">
            <div className="pointer-events-none absolute inset-y-0 left-3 z-10 flex items-center">
              <Link
                href="/partners/recruitment"
                aria-label="Back to recruitment dashboard"
                className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:text-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </div>
            <div className="grid gap-4 lg:grid-cols-1">
              {teamHighlights.map((card) => (
                <HighlightCard
                  key={card.title}
                  color="orange"
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                  hideDivider
                  showCornerIcon={false}
                  titleClassName="uppercase tracking-[0.35em] text-white"
                  descriptionClassName="text-sm"
                  className="w-full pl-12"
                />
              ))}
            </div>
          </div>

          <SettingsGroupCallout
            icon={<Handshake className="h-4 w-4" />}
            title="Live partners"
            subtitle="Roster insights + immediate invite actions"
            showChevron={false}
          >
            <div className="grid gap-3 lg:grid-cols-2">
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-white/10 text-siso-orange flex items-center justify-center">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Live roster health</p>
                      <p className="text-xs text-white/70">Reps cleared to sell and collect overrides.</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-semibold leading-none lg:text-5xl">{livePartnerSummary.metricValue}</p>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/60">{livePartnerSummary.metricLabel}</p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-white/70">
                  {livePartnerSummary.description} Keep the count fresh so recruiting knows when to rotate prospects.
                </p>
              </article>

              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-white/10 text-siso-orange flex items-center justify-center">
                      <UserPlus className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Invite momentum</p>
                      <p className="text-xs text-white/70">Launch the standard invite kit in one tap.</p>
                    </div>
                  </div>
                  <Button asChild className="w-full rounded-full bg-white text-black hover:bg-white/90 lg:w-auto">
                    <Link href={livePartnerSummary.href}>{livePartnerSummary.buttonText}</Link>
                  </Button>
                </div>
              </article>
            </div>
          </SettingsGroupCallout>

          <SettingsGroupCallout
            icon={<Medal className="h-4 w-4" />}
            title="Team leaderboard"
            subtitle="Top recruiters by approvals and overrides."
            showChevron={false}
          >
            <div className="space-y-3 text-sm text-white/80">
              {teamLeaderboard.map((row, index) => (
                <div key={row.name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
                  <div>
                    <p className="text-white">{index + 1}. {row.name}</p>
                    <p className="text-xs text-white/60">{row.approvals} approvals • {row.overrides} overrides</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-white/10 text-white">{row.payouts}</Badge>
                    <p className="text-[11px] text-white/60">Avg {row.approvalTime}</p>
                  </div>
                </div>
              ))}
            </div>
          </SettingsGroupCallout>

          <SettingsGroupCallout icon={<Users className="h-4 w-4" />} title="Active sales team" subtitle="Every rep, their role, and current focus." showChevron={false}>
            <div className="space-y-3">
              {teamMembers.map((member) => (
                <Link
                  key={member.id}
                  href={`/partners/recruitment/team/${member.id}`}
                  className="group flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/80 transition hover:border-white/30 hover:bg-white/[0.06] lg:flex-row lg:items-center lg:justify-between"
                >
                  <div>
                    <p className="text-lg font-semibold text-white group-hover:text-white">{member.name}</p>
                    <p className="text-xs uppercase tracking-[0.35em] text-white/60">{member.role}</p>
                  </div>
                  <div className="text-xs text-white/60">{member.activity}</div>
                  <Badge className="bg-white/10 text-white">{member.tier}</Badge>
                  <Badge variant="outline" className="border-white/20 text-white">
                    {member.status}
                  </Badge>
                </Link>
              ))}
            </div>
          </SettingsGroupCallout>

          <SettingsGroupCallout icon={<Paperclip className="h-4 w-4" />} title="Quick help" subtitle="Shortcuts the team lead can drop into chat." showChevron={false}>
            <div className="space-y-3 text-sm text-white/70">
              {quickHelpLinks.map((resource) => (
                <div key={resource.title} className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
                  <p className="text-white">{resource.title}</p>
                  <p className="text-xs text-white/60">{resource.description}</p>
                  <Link href={resource.href} className="text-[11px] uppercase tracking-[0.4em] text-siso-orange">
                    Open
                  </Link>
                </div>
              ))}
            </div>
          </SettingsGroupCallout>
        </div>
      </section>
    </LazyPartnersPageShell>
  );
}
