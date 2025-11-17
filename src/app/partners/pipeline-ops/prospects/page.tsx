import { Suspense } from "react";
import { getProspects } from "@/domains/partnerships/portal-architecture/pipeline-ops/application/pipelineOpsService";
import { ProspectsWorkspace } from "./ProspectsWorkspace";
import { PartnersPageShell } from "@/domains/partnerships/community/ui/CommunityPageShell";
import { HighlightCard } from "@/components/ui/card-5-static";

export default async function PartnerProspectsPage() {
  const prospects = await getProspects();

  return (
    <PartnersPageShell initialState={{ activeDrawerSection: "pipeline" }}>
      <div className="space-y-6 p-4 lg:p-8">
        <HighlightCard
          color="orange"
          title="My Prospects"
          description="View every logged client, filter by stage, and jump into next steps."
          metricValue={`${prospects.length}`}
          metricLabel="in pipeline"
          buttonText="Submit client"
          onButtonClick={() => (window.location.href = "/partners/pipeline-ops/submit-client")}
          icon={<span className="text-xl">📋</span>}
          hideDivider
          showCornerIcon={false}
          titleClassName="uppercase tracking-[0.35em] text-white"
          descriptionClassName="text-sm"
        />

        <Suspense fallback={<div className="p-10 text-white">Loading prospects…</div>}>
          <ProspectsWorkspace initialProspects={prospects} />
        </Suspense>
      </div>
    </PartnersPageShell>
  );
}
