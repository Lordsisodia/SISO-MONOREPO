import { getActiveDeals } from "@/domains/partnerships/portal-architecture/pipeline-ops/application/pipelineOpsService";
import { LazyPartnersPageShell } from "@/domains/partnerships/community/ui/LazyPartnersPageShell";
import { HighlightCard } from "@/components/ui/card-5-static";
import { Waves } from "@/components/ui/wave-background";
import { ActiveDealsHydrator } from "./ActiveDealsHydrator.client";

export default async function PartnerActiveDealsPage() {
  const deals = await getActiveDeals();

  return (
    <LazyPartnersPageShell initialState={{ activeDrawerSection: "pipeline" }}>
      <main className="relative min-h-screen overflow-hidden bg-siso-bg-primary pb-20 text-siso-text-primary">
        <div className="pointer-events-none absolute inset-0 h-full w-full" style={{ filter: "blur(6px)", opacity: 0.9 }}>
          <Waves className="h-full w-full" strokeColor="#f8a75c" backgroundColor="#0b0b0f" pointerSize={0.35} />
        </div>

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col space-y-6 p-4 lg:p-8">
          <HighlightCard
            color="orange"
            title="Active Deals"
            description="Track health, next steps, and commission forecasts without leaving Client Pipeline."
            icon={<span className="text-xl">🤝</span>}
            hideDivider
            showCornerIcon={false}
            titleClassName="uppercase tracking-[0.35em] text-white"
            descriptionClassName="text-sm"
            className="max-w-none"
          />

          <ActiveDealsHydrator deals={deals} />
        </div>
      </main>
    </LazyPartnersPageShell>
  );
}
