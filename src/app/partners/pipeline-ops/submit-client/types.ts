import type { ThreadOverview } from "@/domains/partnerships/portal-architecture/community/messages/ui/mobile/components/DirectoryOverlay";

export type DirectoryEntry = {
  id: string;
  name: string;
  note?: string;
};

export type FormState = {
  companyName: string;
  legalName: string;
  industry: string;
  companySize: string;
  partnershipType: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  socialLink: string;
  website: string;
  addressLine1: string;
  city: string;
  region: string;
  country: string;
  clientGoals: string;
  challenges: string;
  objectives: string;
  servicesRequested: string[];
  timeline: string;
  budgetRange: string;
  contextNotes: string;
  commercialNotes: string;
  expectedValue: string;
  successProbability: string;
  riskNotes: string;
  specialRequirements: string;
  shareWithSiso: boolean;
  documents: string[];
};

export type WizardPrompt = {
  id: string;
  type: "text" | "textarea" | "chips" | "multi-select" | "upload" | "summary";
  field?: keyof FormState;
  prompt: string;
  helper?: string;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  quickReplies?: string[];
};

export type PipelineOpsConfig = {
  initialAssistantMessage?: string;
  wizardPrompts: WizardPrompt[];
  savedDraftThreads: ThreadOverview[];
  outgoingRequests: DirectoryEntry[];
  blockedContacts: DirectoryEntry[];
};
