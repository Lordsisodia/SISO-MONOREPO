import { Suspense } from "react";
import { getProspects } from "@/domains/partnerships/portal-architecture/pipeline-ops/application/pipelineOpsService";
import { ProspectsWorkspace } from "./ProspectsWorkspace";

export default async function PartnerProspectsPage() {
  const prospects = await getProspects();

  return (
    <Suspense fallback={<div className="p-10 text-white">Loading prospects…</div>}>
      <ProspectsWorkspace initialProspects={prospects} />
    </Suspense>
  );
}
