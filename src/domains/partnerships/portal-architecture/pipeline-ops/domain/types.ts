export type PipelineStage =
  | "prospect"
  | "qualified"
  | "proposal"
  | "negotiation"
  | "won"
  | "lost";

export interface ProspectSummary {
  id: string;
  company: string;
  contactName: string;
  contactEmail: string;
  nextAction?: string;
  confidence: number; // 0-1
  stage: Extract<PipelineStage, "prospect" | "qualified">;
  owner: string;
  tags: string[];
  updatedAt: string;
}

export interface DealSummary {
  id: string;
  company: string;
  amount: number;
  stage: PipelineStage;
  agingDays: number;
  lastActivityAt: string;
  health: "on_track" | "risk" | "stalled";
  owner: string;
}

export interface RecruitmentInvite {
  id: string;
  partnerName: string;
  email: string;
  status: "sent" | "accepted" | "pending" | "inactive";
  rewardShareBps: number;
  sentAt: string;
}

export interface SubmitClientPayload {
  companyName: string;
  contactEmail: string;
  dealSizeEstimate: number;
  notes?: string;
  vertical: string;
}

export interface SubmitClientResponse {
  intakeId: string;
  status: "received" | "needs_review";
  estimatedSlaHrs: number;
}

export interface PipelineOpsOverview {
  prospects: ProspectSummary[];
  activeDeals: DealSummary[];
  recruitment: RecruitmentInvite[];
}
