"use client";

import { useRouter } from "next/navigation";

import { PartnersPageShell } from "@/domains/partnerships/community/ui/CommunityPageShell";
import { HighlightCard } from "@/components/ui/card-5-static";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, LineChart, Medal, CheckCircle2 } from "lucide-react";

const performanceHighlights = [
  {
    title: "Referral funnel",
    description: "Invites ➜ Approved ➜ Revenue",
    metricValue: "62%",
    metricLabel: "invite-to-approval",
    buttonText: "View funnel",
    href: "/partners/recruitment/prospects",
    icon: <BarChart3 className="h-5 w-5" aria-hidden />,
  },
];

const funnelStages = [
  { stage: "Invites sent", value: 120, color: "bg-white/20" },
  { stage: "Applications", value: 78, color: "bg-white/30" },
  { stage: "Approved", value: 48, color: "bg-siso-orange" },
  { stage: "First deal", value: 21, color: "bg-emerald-400" },
];

const leaderboard = [
  { name: "Avery Diaz", metric: "6 approvals", payouts: "$9.3K" },
  { name: "Jordan Kim", metric: "4 approvals", payouts: "$5.1K" },
  { name: "Marin Patel", metric: "3 approvals", payouts: "$4.2K" },
];

const actions = [
  { label: "Follow up dormant invites", detail: "12 invites inactive for 14+ days" },
  { label: "Launch incentive boost", detail: "Goal: +15% invites this week" },
  { label: "Celebrate top recruiter", detail: "Send recognition post" },
];

export function RecruitmentPerformanceContent() {
  const router = useRouter();

  return (
    <PartnersPageShell initialState={{ activeDrawerSection: "recruitment" }}>
      <div className="space-y-6 p-4 lg:p-8">
        <div className="grid gap-4 lg:grid-cols-1">
          {performanceHighlights.map((card) => (
            <HighlightCard
              key={card.title}
              color="orange"
              title={card.title}
              description={card.description}
              metricValue={card.metricValue}
              metricLabel={card.metricLabel}
              buttonText={card.buttonText}
              onButtonClick={() => router.push(card.href)}
              icon={card.icon}
              hideDivider
              showCornerIcon={false}
              titleClassName="uppercase tracking-[0.35em] text-white"
              descriptionClassName="text-sm"
            />
          ))}
        </div>

        <SettingsGroupCallout icon={<LineChart className="h-4 w-4" />} title="Funnel health" subtitle="See where recruits drop." showChevron={false}>
          <div className="space-y-4">
            {funnelStages.map((stage) => (
              <div key={stage.stage} className="space-y-2">
                <div className="flex items-center justify-between text-sm text-white">
                  <span>{stage.stage}</span>
                  <span className="text-xs text-white/70">{stage.value}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div className={`h-full ${stage.color}`} style={{ width: `${(stage.value / 120) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </SettingsGroupCallout>

        <div className="grid gap-4 lg:grid-cols-2">
          <SettingsGroupCallout icon={<Medal className="h-4 w-4" />} title="Leaderboard" subtitle="Top recruiters by approvals and overrides." showChevron={false}>
            <div className="space-y-3 text-sm text-white/80">
              {leaderboard.map((row, index) => (
                <div key={row.name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
                  <div>
                    <p className="text-white">{index + 1}. {row.name}</p>
                    <p className="text-xs text-white/60">{row.metric}</p>
                  </div>
                  <Badge className="bg-white/10 text-white">{row.payouts}</Badge>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="border border-white/10">
                Export report
              </Button>
            </div>
          </SettingsGroupCallout>

          <SettingsGroupCallout icon={<CheckCircle2 className="h-4 w-4" />} title="Recommended actions" subtitle="Take immediate steps to unblock referrals." showChevron={false}>
            <div className="space-y-3 text-sm text-white/80">
              {actions.map((action) => (
                <div key={action.label} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <p className="text-white font-semibold">{action.label}</p>
                  <p className="text-xs text-white/60">{action.detail}</p>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="border border-white/10">
                Open automation center
              </Button>
            </div>
          </SettingsGroupCallout>
        </div>
      </div>
    </PartnersPageShell>
  );
}
