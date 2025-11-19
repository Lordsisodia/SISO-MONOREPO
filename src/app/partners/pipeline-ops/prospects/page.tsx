import { Suspense } from "react";
import { getProspects } from "@/domains/partnerships/portal-architecture/pipeline-ops/application/pipelineOpsService";
import { ProspectsWorkspace } from "./ProspectsWorkspace";
import { PartnersPageShell } from "@/domains/partnerships/community/ui/CommunityPageShell";
import { HighlightCard } from "@/components/ui/card-5-static";
import { Waves } from "@/components/ui/wave-background";

export default async function PartnerProspectsPage() {
  const prospects = await getProspects();

  return (
    <PartnersPageShell initialState={{ activeDrawerSection: "pipeline" }}>
      <div className="relative min-h-screen">
        <div className="pointer-events-none absolute inset-0 z-0" style={{ filter: "blur(5px)", opacity: 0.4 }}>
          <Waves className="h-full w-full" strokeColor="#f8a75c" backgroundColor="transparent" pointerSize={0.25} />
        </div>
        <div className="relative z-10 w-full px-4 pt-8 pb-12 lg:px-8">
          <div className="mx-auto w-full max-w-6xl space-y-6">
            <HighlightCard
              color="orange"
              title="My Prospects"
              description="View every logged client, filter by stage, and jump into next steps."
              icon={<span className="text-xl">📋</span>}
              hideDivider
              showCornerIcon={false}
              fullWidth
              className="w-full max-w-none"
              titleClassName="text-lg font-semibold uppercase tracking-[0.32em] text-white sm:text-xl"
              descriptionClassName="text-sm"
            />
            <Suspense fallback={<div className="p-10 text-white">Loading prospects…</div>}>
              <ProspectsWorkspace initialProspects={prospects} />
            </Suspense>
          </div>
        </div>
      </div>
    </PartnersPageShell>
  );
}
