import { cache } from "react";
import type {
  DealSummary,
  PipelineOpsOverview,
  ProspectSummary,
  RecruitmentInvite,
  SubmitClientPayload,
  SubmitClientResponse,
} from "../domain/types";
import { fetchPipelineOpsOverview, submitClientIntake } from "../infrastructure/mockPipelineOpsApi";

export const getPipelineOpsOverview = cache(async (): Promise<PipelineOpsOverview> => {
  return fetchPipelineOpsOverview();
});

export async function getProspects(): Promise<ProspectSummary[]> {
  const overview = await getPipelineOpsOverview();
  return overview.prospects;
}

export async function getActiveDeals(): Promise<DealSummary[]> {
  const overview = await getPipelineOpsOverview();
  return overview.activeDeals;
}

export async function getRecruitmentInvites(): Promise<RecruitmentInvite[]> {
  const overview = await getPipelineOpsOverview();
  return overview.recruitment;
}

export async function submitClient(payload: SubmitClientPayload): Promise<SubmitClientResponse> {
  if (!payload.companyName || !payload.contactEmail) {
    throw new Error("Company name and contact email are required");
  }
  return submitClientIntake(payload);
}
