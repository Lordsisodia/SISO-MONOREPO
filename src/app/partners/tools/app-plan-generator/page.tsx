import { PartnersPageShell } from "@/domains/partnerships/community/ui/CommunityPageShell";
import { HighlightCard } from "@/components/ui/card-5-static";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { Button } from "@/components/ui/button";
import { Waves } from "@/components/ui/wave-background";

export default function AppPlanGeneratorPage() {
  return (
    <PartnersPageShell initialState={{ activeDrawerSection: "tools" }}>
      <main className="relative min-h-screen overflow-hidden bg-siso-bg-primary pb-20 text-white">
        <div className="pointer-events-none absolute inset-0 h-full w-full" style={{ filter: "blur(6px)", opacity: 0.9 }}>
          <Waves className="h-full w-full" strokeColor="#7ad7ff" backgroundColor="#08090f" pointerSize={0.3} />
        </div>

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col space-y-6 p-4 lg:p-8">
          <HighlightCard
            color="orange"
            title="App Plan Generator"
            description="Blueprint deal-ready app plans with scope, pricing, and delivery expectations without leaving Pipeline Ops."
            icon={<span className="text-xl">🛠️</span>}
            hideDivider
            showCornerIcon={false}
            titleClassName="uppercase tracking-[0.35em] text-white"
            descriptionClassName="text-sm"
            className="max-w-none"
            metricValue="Coming soon"
            metricLabel="status"
            buttonText="Notify me"
          />

          <SettingsGroupCallout
            icon={<span className="text-lg">📋</span>}
            title="Workflow preview"
            subtitle="Here’s what the generator will walk you through once it launches."
            showChevron={false}
          >
            <div className="grid gap-3 text-sm text-white/80 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Inputs</p>
                <ul className="mt-2 space-y-1 text-white/80">
                  <li>• Business description + goals</li>
                  <li>• Services needed + budget</li>
                  <li>• Risk notes / compliance flags</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">Outputs</p>
                <ul className="mt-2 space-y-1 text-white/80">
                  <li>• Timeline + pricing breakdown</li>
                  <li>• Required deliverables checklist</li>
                  <li>• Share-ready PDF + workspace tasks</li>
                </ul>
              </div>
            </div>
            <p className="mt-3 text-xs text-white/60">Full experience ships with instant plan preview + push to Active Deals.</p>
          </SettingsGroupCallout>

          <SettingsGroupCallout icon={<span className="text-lg">🚧</span>} title="Coming soon" subtitle="Final wiring + reviews in progress" showChevron={false}>
            <p className="text-sm text-white/80">
              We’re validating templates with partners before enabling the generator. Leave your email to get the launch note.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button size="sm" className="bg-white text-black hover:bg-white/90" disabled>
                Coming soon
              </Button>
              <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Share feature request
              </Button>
            </div>
          </SettingsGroupCallout>
        </div>
      </main>
    </PartnersPageShell>
  );
}
