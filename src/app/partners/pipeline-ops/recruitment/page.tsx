import { Suspense } from "react";
import { getRecruitmentInvites } from "@/domains/partnerships/portal-architecture/pipeline-ops/application/pipelineOpsService";
import { RecruitmentWorkspace } from "./RecruitmentWorkspace";

export default async function PartnerRecruitmentPage() {
  const invites = await getRecruitmentInvites();

  return (
    <Suspense fallback={<div className="p-10 text-white">Loading recruitment data…</div>}>
      <RecruitmentWorkspace invites={invites} />
    </Suspense>
  );
}
