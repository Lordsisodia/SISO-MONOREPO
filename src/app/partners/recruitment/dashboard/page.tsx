import type { Metadata } from "next";
import { Suspense } from "react";

import { PartnersPageShell } from "@/domains/partnerships/community/ui/CommunityPageShell";
import { getRecruitmentInvites } from "@/domains/partnerships/portal-architecture/pipeline-ops/application/pipelineOpsService";
import { RecruitmentWorkspace } from "@/domains/partnerships/portal-architecture/recruitment/ui/RecruitmentWorkspace";

export const metadata: Metadata = {
  title: "Recruitment Dashboard • SISO Partners",
  description: "Track invites, approvals, and the team growing the SISO partner network.",
};

export default async function PartnersRecruitmentDashboardPage() {
  const invites = await getRecruitmentInvites();

  return (
    <PartnersPageShell initialState={{ activeDrawerSection: "recruitment" }}>
      <Suspense fallback={<div className="p-10 text-white">Loading recruitment dashboard…</div>}>
        <RecruitmentWorkspace invites={invites} />
      </Suspense>
    </PartnersPageShell>
  );
}
