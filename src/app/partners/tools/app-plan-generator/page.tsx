import { PartnersPageShell } from "@/domains/partnerships/community/ui/CommunityPageShell";
import { HighlightCard } from "@/components/ui/card-5-static";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { Button } from "@/components/ui/button";

export default function AppPlanGeneratorPage() {
  return (
    <PartnersPageShell initialState={{ activeDrawerSection: "tools" }}>
      <div className="space-y-6 p-4 lg:p-8 text-white">
        <HighlightCard
          color="orange"
          title="App Plan Generator"
          description="Assemble deal-ready app plans with pricing, timelines, and attachments."
          metricValue="Beta"
          metricLabel="status"
          buttonText="Start plan"
          icon={<span className="text-xl">🛠️</span>}
          hideDivider
          showCornerIcon={false}
          titleClassName="uppercase tracking-[0.35em] text-white"
          descriptionClassName="text-sm"
        />

        <SettingsGroupCallout icon={<span className="text-lg">📋</span>} title="Coming soon" subtitle="UI scaffold ready" showChevron={false}>
          <p className="text-sm text-white/80">This route is live, but the full generator experience still needs to be wired in.</p>
          <div className="mt-3 flex gap-2">
            <Button size="sm" className="bg-white text-black hover:bg-white/90">Open placeholder</Button>
            <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">Share requirements</Button>
          </div>
        </SettingsGroupCallout>
      </div>
    </PartnersPageShell>
  );
}
