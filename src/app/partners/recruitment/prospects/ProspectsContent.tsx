import Link from "next/link";
import { LazyPartnersPageShell } from "@/domains/partnerships/community/ui/LazyPartnersPageShell";
import { HighlightCard } from "@/components/ui/card-5-static";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calculator, Compass, Paperclip, SendHorizontal, Zap } from "lucide-react";

const pipelineHero = {
  title: "Recruitment pipeline",
  description: "Qualified recruits currently in motion.",
  metricValue: "32",
  metricLabel: "active prospects",
  buttonText: "Add prospect",
  href: "/partners/recruitment/prospects",
};

const inviteSnapshot = {
  sent: 14,
  conversion: "62% invite ➜ approval",
  bottleneck: "4 invites waiting on compliance packets",
};

const prospectFilters = ["All prospects", "Needs outreach", "Interviewing", "Compliance", "Dormant"];

const prospectRows = [
  {
    name: "Luca Ramirez",
    channel: "Partner referral · Carter Blake",
    stage: "Interviewing",
    owner: "Avery Diaz",
    score: "88",
    nextAction: "Schedule onboarding call",
  },
  {
    name: "Sasha Bennett",
    channel: "Event · SaaS Expo",
    stage: "Applied",
    owner: "Jordan Kim",
    score: "73",
    nextAction: "Send compliance pack",
  },
  {
    name: "Maya Thompson",
    channel: "Inbound form",
    stage: "Compliance",
    owner: "Marin Patel",
    score: "91",
    nextAction: "Legal review in progress",
  },
  {
    name: "Andre Keller",
    channel: "Cold outreach",
    stage: "Dormant",
    owner: "Open",
    score: "65",
    nextAction: "Nudge with incentives",
  },
];

const automationQueue = [
  { id: "task-1", label: "Send onboarding kit", detail: "3 recruits waiting", urgency: "Today" },
  { id: "task-2", label: "Assign mentor", detail: "2 approved partners", urgency: "Tomorrow" },
  { id: "task-3", label: "Review compliance docs", detail: "Maya T.", urgency: "Due in 2d" },
];

const resourceLinks = [
  { title: "Invite template", description: "Copy/paste outreach with incentive reminders." },
  { title: "Recruiting FAQ", description: "Answer common partner questions instantly." },
  { title: "Override calculator", description: "Estimate payouts per recruit.", href: "/partners/earnings/overview" },
];

export function RecruitmentProspectsContent() {
  return (
    <LazyPartnersPageShell initialState={{ activeDrawerSection: "recruitment" }}>
      <div className="space-y-6 p-4 lg:p-8">
        <HighlightCard
          color="orange"
          title={pipelineHero.title}
          description={pipelineHero.description}
          metricValue={pipelineHero.metricValue}
          metricLabel={pipelineHero.metricLabel}
          buttonText={pipelineHero.buttonText}
          buttonHref={pipelineHero.href}
          icon={<Compass className="h-5 w-5" />}
          hideDivider
          showCornerIcon={false}
          titleClassName="uppercase tracking-[0.35em] text-white"
          descriptionClassName="text-sm"
        />

        <SettingsGroupCallout icon={<SendHorizontal className="h-4 w-4" />} title="Invites this week" subtitle="Warm intros, referral links, and nurture flows." showChevron={false}>
          <div className="flex flex-wrap items-center gap-6 text-sm text-white">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/60">Sent</p>
              <p className="text-2xl font-semibold">{inviteSnapshot.sent}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/60">Conversion</p>
              <p className="text-lg font-semibold text-siso-orange">{inviteSnapshot.conversion}</p>
            </div>
            <div className="flex-1 text-xs text-white/70">{inviteSnapshot.bottleneck}</div>
            <Link
              href="/partners/recruitment/team"
              className="inline-flex items-center rounded-full border border-white/10 px-3 py-1 text-sm text-white hover:border-white/40"
            >
              Review outreach
            </Link>
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout icon={<Calculator className="h-4 w-4" />} title="Segment views" subtitle="Filter prospects by status, owner, or source." showChevron={false}>
          <div className="flex flex-wrap gap-2">
            {prospectFilters.map((filter) => (
              <span key={filter} className="rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-white/80">
                {filter}
              </span>
            ))}
            <Button variant="ghost" size="sm" className="border border-white/10">
              Create saved view
            </Button>
          </div>
        </SettingsGroupCallout>

        <div className="overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.03]">
          <div className="grid grid-cols-[2.2fr,1.2fr,1fr,0.7fr,1.5fr] border-b border-white/5 px-4 py-3 text-[11px] uppercase tracking-[0.35em] text-white/60">
            <span>Prospect</span>
            <span>Stage</span>
            <span>Owner</span>
            <span>Score</span>
            <span>Next action</span>
          </div>
          {prospectRows.map((prospect) => (
            <div key={prospect.name} className="grid grid-cols-[2.2fr,1.2fr,1fr,0.7fr,1.5fr] items-center border-b border-white/5 px-4 py-4 text-sm text-white/80 last:border-b-0">
              <div>
                <p className="font-semibold text-white">{prospect.name}</p>
                <p className="text-xs text-white/60">{prospect.channel}</p>
              </div>
              <Badge className="w-fit bg-white/10 uppercase tracking-widest text-[10px] text-white">{prospect.stage}</Badge>
              <span>{prospect.owner}</span>
              <span className="font-semibold text-siso-orange">{prospect.score}</span>
              <div className="flex items-center justify-between gap-2 text-xs text-white/70">
                <span>{prospect.nextAction}</span>
                <Button variant="ghost" size="sm" className="border border-white/10 px-3">
                  Update
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <SettingsGroupCallout icon={<Zap className="h-4 w-4" />} title="Automation queue" subtitle="High-priority actions generated from playbooks." showChevron={false}>
            <div className="space-y-3">
              {automationQueue.map((task) => (
                <div key={task.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{task.label}</p>
                    <p className="text-xs text-white/60">{task.detail}</p>
                  </div>
                  <Badge className="bg-white/10 text-white">{task.urgency}</Badge>
                </div>
              ))}
            </div>
          </SettingsGroupCallout>

          <SettingsGroupCallout icon={<Paperclip className="h-4 w-4" />} title="Quick resources" subtitle="Attach collateral before the next touch." showChevron={false}>
            <div className="space-y-3 text-sm text-white/70">
              {resourceLinks.map((resource) => (
                <div key={resource.title} className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
                  <p className="text-white">{resource.title}</p>
                  <p className="text-xs text-white/60">{resource.description}</p>
                  {resource.href ? (
                    <Link href={resource.href} className="text-[11px] uppercase tracking-[0.4em] text-siso-orange">
                      Open
                    </Link>
                  ) : null}
                </div>
              ))}
            </div>
          </SettingsGroupCallout>
        </div>
      </div>
    </LazyPartnersPageShell>
  );
}

export default RecruitmentProspectsContent;
