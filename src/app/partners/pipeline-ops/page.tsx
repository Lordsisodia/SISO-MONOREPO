import { PartnersPageShell } from "@/domains/partnerships/community/ui/CommunityPageShell";
import { HighlightCard } from "@/components/ui/card-5-static";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const pipelineWidgets = [
  {
    title: "Prospects",
    description: "Track every opportunity, log next steps, and nudge new leads to move forward.",
    href: "/partners/pipeline-ops/prospects",
  },
  {
    title: "Active deals",
    description: "See what’s in progress, who’s on deck, and which deals need attention.",
    href: "/partners/pipeline-ops/active-deals",
  },
  {
    title: "Recruitment",
    description: "Add new partners, monitor referrals, and manage team overrides.",
    href: "/partners/pipeline-ops/recruitment",
  },
];

export default function PipelineOpsDashboardPage() {
  const router = useRouter();
  return (
    <PartnersPageShell>
      <div className="space-y-6 p-4 lg:p-8">
        <HighlightCard
          color="orange"
          title="Pipeline Ops Dashboard"
          description="Centralize your revenue pipeline, referrals, and deal health in one place."
          metricValue="6"
          metricLabel="deals in motion"
          buttonText="View prospects"
          onButtonClick={() => router.push("/partners/pipeline-ops/prospects")}
          icon={<span className="text-xl">⚡</span>}
          hideDivider
          titleClassName="uppercase tracking-[0.35em] text-white"
          descriptionClassName="text-sm"
        />

        <SettingsGroupCallout
          icon={<span className="text-xl">🔁</span>}
          title="Quick links"
          subtitle="Jump straight into the right workflow."
          showChevron={false}
        >
          <div className="space-y-3">
            {pipelineWidgets.map((widget) => (
              <div key={widget.title} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-white">{widget.title}</p>
                  <p className="text-xs text-siso-text-muted">{widget.description}</p>
                </div>
                <Link href={widget.href} className="text-siso-orange text-[11px] uppercase tracking-[0.4em]">
                  Open
                </Link>
              </div>
            ))}
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<span className="text-xl">💡</span>}
          title="What’s next"
          subtitle="Monitor the deals that need your voice."
          showChevron={false}
        >
          <div className="text-xs text-siso-text-muted space-y-2">
            <p>Deals in negotiation: 3</p>
            <p>Needs follow-up: 2</p>
            <p>Ready for demo: 1</p>
            <Button asChild variant="ghost" size="sm" className="border border-white/10">
              <Link href="/partners/pipeline-ops/active-deals">Review active deals</Link>
            </Button>
          </div>
        </SettingsGroupCallout>
      </div>
    </PartnersPageShell>
  );
}
