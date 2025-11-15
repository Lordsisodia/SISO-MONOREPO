import type {
  DealSummary,
  PipelineOpsOverview,
  ProspectSummary,
  RecruitmentInvite,
  SubmitClientPayload,
  SubmitClientResponse,
} from "../domain/types";

const mockProspects: ProspectSummary[] = [
  {
    id: "prospect_brookstone",
    company: "Brookstone Bikes",
    contactName: "Ravi Patel",
    contactEmail: "ravi@brookstone.io",
    nextAction: "Send updated deck",
    confidence: 0.42,
    stage: "prospect",
    owner: "Avery (SISO)",
    tags: ["d2c", "lifestyle"],
    updatedAt: "2025-11-07T15:30:00Z",
  },
  {
    id: "prospect_betaops",
    company: "BetaOps Cloud",
    contactName: "Jenna Ruiz",
    contactEmail: "jenna@betaops.com",
    nextAction: "Schedule scoping call",
    confidence: 0.63,
    stage: "qualified",
    owner: "Nico (SISO)",
    tags: ["saas", "ai"],
    updatedAt: "2025-11-08T10:05:00Z",
  },
];

const mockDeals: DealSummary[] = [
  {
    id: "deal_coastline",
    company: "Coastline Logistics",
    amount: 185_000,
    stage: "proposal",
    agingDays: 18,
    lastActivityAt: "2025-11-08T22:00:00Z",
    health: "on_track",
    owner: "Avery (SISO)",
  },
  {
    id: "deal_novatron",
    company: "Novatron Energy",
    amount: 420_000,
    stage: "negotiation",
    agingDays: 32,
    lastActivityAt: "2025-11-05T14:00:00Z",
    health: "risk",
    owner: "Sasha (SISO)",
  },
];

const mockInvites: RecruitmentInvite[] = [
  {
    id: "invite_maria",
    partnerName: "Maria Lopez",
    email: "maria@siso.partners",
    status: "accepted",
    rewardShareBps: 200,
    sentAt: "2025-10-12T00:00:00Z",
  },
  {
    id: "invite_hari",
    partnerName: "Hari Min",
    email: "hari@siso.partners",
    status: "pending",
    rewardShareBps: 150,
    sentAt: "2025-11-04T00:00:00Z",
  },
];

export async function fetchPipelineOpsOverview(): Promise<PipelineOpsOverview> {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ prospects: mockProspects, activeDeals: mockDeals, recruitment: mockInvites }), 120)
  );
}

export async function submitClientIntake(payload: SubmitClientPayload): Promise<SubmitClientResponse> {
  console.info("[pipeline-ops] submit-client", payload);
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          intakeId: `intake_${Math.random().toString(36).slice(2, 8)}`,
          status: "received",
          estimatedSlaHrs: 8,
        }),
      200,
    ),
  );
}

export const pipelineOpsMocks = {
  prospects: mockProspects,
  deals: mockDeals,
  recruitment: mockInvites,
};
