import Link from "next/link";

import { LazyPartnersPageShell } from "@/domains/partnerships/community/ui/LazyPartnersPageShell";
import { HighlightCard } from "@/components/ui/card-5-static";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Handshake, Users, Target, Map as MapIcon } from "lucide-react";

const teamHighlights = [
  {
    title: "Active sales team",
    description: "Reps cleared to sell and paid overrides.",
    metricValue: "18",
    metricLabel: "live partners",
    buttonText: "Invite partner",
    href: "/partners/recruitment/prospects",
    icon: <Handshake className="h-5 w-5" aria-hidden />,
  },
];

const roster = [
  {
    name: "Avery Diaz",
    role: "Partner Lead",
    tier: "Performer",
    activity: "Closed 2 referrals this month",
    status: "Green",
  },
  {
    name: "Jordan Kim",
    role: "Inbound Recruiter",
    tier: "Active",
    activity: "4 invites pending compliance",
    status: "Action needed",
  },
  {
    name: "Marin Patel",
    role: "Strategic Sales",
    tier: "Elite",
    activity: "Mentoring 3 new reps",
    status: "Green",
  },
  {
    name: "Nova Chen",
    role: "Community Advocate",
    tier: "Starter",
    activity: "Needs onboarding course",
    status: "Training",
  },
];

const trainingAlerts = [
  { id: "cert", label: "Pitch certification expiring", detail: "4 reps need renewal", progress: 60 },
  { id: "wallet", label: "Wallet setup pending", detail: "2 reps missing payout forms", progress: 40 },
  { id: "academy", label: "Academy checkpoint", detail: "Complete Stage 3 lessons", progress: 75 },
];

const coverageGaps = [
  { segment: "Healthcare", owner: "Unassigned", need: "Enterprise hunter" },
  { segment: "LATAM", owner: "Jordan Kim", need: "Spanish-speaking closer" },
  { segment: "eCommerce", owner: "Avery Diaz", need: "Operations specialist" },
];

export function RecruitmentTeamContent() {
  return (
    <LazyPartnersPageShell initialState={{ activeDrawerSection: "recruitment" }}>
      <div className="space-y-6 p-4 lg:p-8">
        <div className="grid gap-4 lg:grid-cols-1">
          {teamHighlights.map((card) => (
            <HighlightCard
              key={card.title}
              color="orange"
              title={card.title}
              description={card.description}
              metricValue={card.metricValue}
              metricLabel={card.metricLabel}
              buttonText={card.buttonText}
              buttonHref={card.href}
              icon={card.icon}
              hideDivider
              showCornerIcon={false}
              titleClassName="uppercase tracking-[0.35em] text-white"
              descriptionClassName="text-sm"
            />
          ))}
        </div>

        <SettingsGroupCallout icon={<Users className="h-4 w-4" />} title="Roster" subtitle="Every rep, their role, and current focus." showChevron={false}>
          <div className="space-y-3">
            {roster.map((member) => (
              <div key={member.name} className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/80 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-lg font-semibold text-white">{member.name}</p>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/60">{member.role}</p>
                </div>
                <div className="text-xs text-white/60">{member.activity}</div>
                <Badge className="bg-white/10 text-white">{member.tier}</Badge>
                <Badge variant="outline" className="border-white/20 text-white">
                  {member.status}
                </Badge>
              </div>
            ))}
          </div>
        </SettingsGroupCallout>

        <div className="grid gap-4 lg:grid-cols-2">
          <SettingsGroupCallout icon={<Target className="h-4 w-4" />} title="Training & compliance" subtitle="Stay ahead of expirations and onboarding tasks." showChevron={false}>
            <div className="space-y-4">
              {trainingAlerts.map((alert) => (
                <div key={alert.id} className="space-y-2 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex items-center justify-between text-sm text-white">
                    <span>{alert.label}</span>
                    <span className="text-xs text-white/60">{alert.detail}</span>
                  </div>
                  <Progress value={alert.progress} className="h-2" />
                </div>
              ))}
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Link href="/partners/academy/checklist">Open academy checklist</Link>
              </Button>
            </div>
          </SettingsGroupCallout>

          <SettingsGroupCallout icon={<MapIcon className="h-4 w-4" />} title="Coverage gaps" subtitle="Where we still need expertise." showChevron={false}>
            <div className="space-y-3 text-sm text-white/80">
              {coverageGaps.map((gap) => (
                <div key={gap.segment} className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
                  <p className="text-white font-semibold">{gap.segment}</p>
                  <p className="text-xs text-white/60">Owner: {gap.owner}</p>
                  <p className="text-xs text-white/60">Need: {gap.need}</p>
                </div>
              ))}
              <Button asChild className="bg-siso-orange text-black hover:bg-orange-400">
                <Link href="/partners/recruitment/requests">Log recruiting request</Link>
              </Button>
            </div>
          </SettingsGroupCallout>
        </div>
      </div>
    </LazyPartnersPageShell>
  );
}
