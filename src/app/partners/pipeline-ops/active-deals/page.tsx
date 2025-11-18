import { Suspense } from "react";
import { getActiveDeals } from "@/domains/partnerships/portal-architecture/pipeline-ops/application/pipelineOpsService";
import { ActiveDealsWorkspace } from "./ActiveDealsWorkspace";
import { PartnersPageShell } from "@/domains/partnerships/community/ui/CommunityPageShell";
import { HighlightCard } from "@/components/ui/card-5-static";

export default async function PartnerActiveDealsPage() {
  const deals = await getActiveDeals();

  return (
    <PartnersPageShell initialState={{ activeDrawerSection: "pipeline" }}>
      <div className="space-y-6 p-4 lg:p-8">
        <HighlightCard
          color="orange"
          title="Active Deals"
          description="Track health, next steps, and commission forecasts without leaving Client Pipeline."
          metricValue={`${deals.length}`}
          metricLabel="in flight"
          buttonText="Submit client"
          buttonHref="/partners/pipeline-ops/submit-client"
          icon={<span className="text-xl">🤝</span>}
          hideDivider
          showCornerIcon={false}
          titleClassName="uppercase tracking-[0.35em] text-white"
          descriptionClassName="text-sm"
        />

        <Suspense fallback={<div className="p-10 text-white">Loading active deals…</div>}>
          <ActiveDealsWorkspace initialDeals={deals} />
        </Suspense>
      </div>
    </PartnersPageShell>
  );
}
