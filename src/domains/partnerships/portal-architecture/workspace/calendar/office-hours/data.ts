export type OfficeHoursTopic =
  | 'deal_strategy'
  | 'technical'
  | 'commission'
  | 'marketing'
  | 'other';

export interface OfficeHoursSlot {
  id: string;
  expertId: string;
  startTime: string;
  endTime: string;
  isGroup: boolean;
  tierAccess: 'all' | 'active' | 'performer';
  capacity: number;
}

export interface ExpertProfile {
  id: string;
  name: string;
  title: string;
  timezone: string;
  specialty: string;
  avatarInitials: string;
  focusAreas: string[];
  activeSlots: number;
}

export interface ScheduledSession {
  id: string;
  title: string;
  expertName: string;
  scheduledFor: string;
  status: 'confirmed' | 'awaiting' | 'recording';
  topic: OfficeHoursTopic;
  notes?: string;
  canJoin?: boolean;
  recapLink?: string;
}

export const officeHoursTopics: Record<OfficeHoursTopic, { label: string; description: string }> = {
  deal_strategy: {
    label: 'Deal strategy',
    description: 'Objection handling, negotiation framing, multi-threading.',
  },
  technical: {
    label: 'Technical questions',
    description: 'Solutions architecture, scoping, Supabase/Next stack questions.',
  },
  commission: {
    label: 'Commission / tier',
    description: 'Compensation, tier upgrades, payout logistics.',
  },
  marketing: {
    label: 'Marketing + discovery',
    description: 'Campaign building, GTM, webinar hosting support.',
  },
  other: {
    label: 'Other',
    description: 'Anything outside the standard tracks.',
  },
};

export const expertProfiles: ExpertProfile[] = [
  {
    id: 'exp-bria',
    name: 'Bria Mercer',
    title: 'Head of Deal Desk',
    timezone: 'ET',
    specialty: 'Enterprise negotiation',
    avatarInitials: 'BM',
    focusAreas: ['Enterprise', 'Pricing', 'Enablement'],
    activeSlots: 5,
  },
  {
    id: 'exp-haruki',
    name: 'Haruki Lin',
    title: 'Solutions Architect',
    timezone: 'PT',
    specialty: 'Commerce infrastructure',
    avatarInitials: 'HL',
    focusAreas: ['Technical', 'AI', 'Integrations'],
    activeSlots: 4,
  },
  {
    id: 'exp-samira',
    name: 'Samira Ortiz',
    title: 'Partner Coach',
    timezone: 'ET',
    specialty: 'Pipeline velocity',
    avatarInitials: 'SO',
    focusAreas: ['Deal hygiene', 'Forecasting', 'Training'],
    activeSlots: 6,
  },
];

export const availableSlots: OfficeHoursSlot[] = [
  {
    id: 'slot-1',
    expertId: 'exp-bria',
    startTime: '2025-11-17T11:00:00-05:00',
    endTime: '2025-11-17T11:30:00-05:00',
    isGroup: false,
    tierAccess: 'all',
    capacity: 1,
  },
  {
    id: 'slot-2',
    expertId: 'exp-haruki',
    startTime: '2025-11-18T14:00:00-05:00',
    endTime: '2025-11-18T14:45:00-05:00',
    isGroup: true,
    tierAccess: 'all',
    capacity: 4,
  },
  {
    id: 'slot-3',
    expertId: 'exp-samira',
    startTime: '2025-11-19T13:30:00-05:00',
    endTime: '2025-11-19T14:00:00-05:00',
    isGroup: false,
    tierAccess: 'active',
    capacity: 1,
  },
  {
    id: 'slot-4',
    expertId: 'exp-bria',
    startTime: '2025-11-21T15:30:00-05:00',
    endTime: '2025-11-21T16:00:00-05:00',
    isGroup: false,
    tierAccess: 'performer',
    capacity: 1,
  },
];

export const upcomingSessions: ScheduledSession[] = [
  {
    id: 'sess-1',
    title: 'Deal review: Helix Labs',
    expertName: 'Bria Mercer',
    scheduledFor: '2025-11-17T10:30:00-05:00',
    status: 'confirmed',
    topic: 'deal_strategy',
    notes: 'Need talk track for CFO + procurement',
    canJoin: true,
  },
  {
    id: 'sess-2',
    title: 'Technical scope: retail POS',
    expertName: 'Haruki Lin',
    scheduledFor: '2025-11-18T14:00:00-05:00',
    status: 'awaiting',
    topic: 'technical',
    notes: 'Send diagram before session',
  },
];

export const pastSessions: ScheduledSession[] = [
  {
    id: 'hist-1',
    title: 'Commission modeling review',
    expertName: 'Samira Ortiz',
    scheduledFor: '2025-11-07T11:00:00-05:00',
    status: 'recording',
    topic: 'commission',
    recapLink: '#',
  },
];
