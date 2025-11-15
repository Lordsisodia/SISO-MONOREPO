import { Suspense } from "react";
import { getActiveDeals } from "@/domains/partnerships/portal-architecture/pipeline-ops/application/pipelineOpsService";
import { ActiveDealsWorkspace } from "./ActiveDealsWorkspace";

export default async function PartnerActiveDealsPage() {
  const deals = await getActiveDeals();

  return (
    <Suspense fallback={<div className="p-10 text-white">Loading active deals…</div>}>
      <ActiveDealsWorkspace initialDeals={deals} />
    </Suspense>
  );
}
