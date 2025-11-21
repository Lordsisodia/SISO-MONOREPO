export type RecruitmentSegment = "potential" | "onboarding" | "active" | "dormant";

export type RecruitmentSegmentFilter = "all" | RecruitmentSegment;

export type ProspectTask = {
  id: string;
  title: string;
  due: string;
  owner: string;
  complete: boolean;
};

export type ProspectAttachment = {
  id: string;
  name: string;
  size: string;
};

export interface RecruitmentProspect {
  id: string;
  candidateName: string;
  email: string;
  tier: string;
  segment: RecruitmentSegment;
  complianceStatus: "pending" | "cleared" | "blocked";
  dealsClosed: number;
  revenueToDate: number;
  progress: number; // 0-1 for activation progress
  referralSource: string;
  mentor: string;
  overrideBps: number;
  inviteSentOn: string;
  nextAction: string;
  lastAction: string;
  lastContactAgo: string;
  timezone: string;
  notes: string[];
  tasks: ProspectTask[];
  attachments: ProspectAttachment[];
}

export interface SegmentOption {
  value: RecruitmentSegmentFilter;
  label: string;
  description: string;
}
