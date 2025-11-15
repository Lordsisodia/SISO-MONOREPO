export type CalendarEventType =
  | "office_hours"
  | "webinar"
  | "partner_event"
  | "task_due"
  | "deal_deadline";

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  timezone: string;
  type: CalendarEventType;
  host: string;
  location: string;
  tierAccess: "all" | "active" | "performer" | "elite";
  tags: string[];
  allowsRsvp?: boolean;
  allowRecording?: boolean;
}

export const calendarEventTypes: Record<CalendarEventType, { label: string; accent: string; summary: string }> = {
  office_hours: {
    label: "Office Hours",
    accent: "from-sky-500/80 to-sky-400/40 text-sky-100",
    summary: "One-on-one time with SISO experts.",
  },
  webinar: {
    label: "Webinar",
    accent: "from-amber-500/70 to-amber-400/30 text-amber-100",
    summary: "Live or on-demand enablement sessions.",
  },
  partner_event: {
    label: "Partner Event",
    accent: "from-purple-500/70 to-purple-400/30 text-purple-100",
    summary: "Community-hosted meetups & showcases.",
  },
  task_due: {
    label: "Task Due",
    accent: "from-emerald-500/60 to-emerald-400/20 text-emerald-100",
    summary: "Milestones synced from Tasks.",
  },
  deal_deadline: {
    label: "Deal Deadline",
    accent: "from-rose-500/70 to-rose-400/20 text-rose-100",
    summary: "Critical prospect or contract checkpoints.",
  },
};

export const calendarEvents: CalendarEvent[] = [
  {
    id: "evt-office-hours-deal",
    title: "Office Hours: Deal strategy sprint",
    description: "30-minute slot with Bria Mercer focused on unlocking stalled enterprise deals.",
    startTime: "2025-11-17T10:00:00-05:00",
    endTime: "2025-11-17T10:30:00-05:00",
    timezone: "America/New_York",
    type: "office_hours",
    host: "Bria Mercer",
    location: "Google Meet",
    tierAccess: "all",
    tags: ["Mentorship", "Sales"],
    allowsRsvp: true,
  },
  {
    id: "evt-webinar-forecast",
    title: "Webinar: Year-end revenue forecasting",
    description: "Live breakdown of the upgraded forecasting dashboard plus workbook download.",
    startTime: "2025-11-18T13:00:00-05:00",
    endTime: "2025-11-18T14:00:00-05:00",
    timezone: "America/New_York",
    type: "webinar",
    host: "Enablement Studio",
    location: "SISO Live Studio",
    tierAccess: "all",
    tags: ["Training", "Revenue"],
    allowsRsvp: true,
    allowRecording: true,
  },
  {
    id: "evt-deal-deadline-helix",
    title: "Deal deadline: Helix Labs contract",
    description: "Submit compliance packet + executive recap by end of day.",
    startTime: "2025-11-19T17:00:00-05:00",
    endTime: "2025-11-19T17:15:00-05:00",
    timezone: "America/New_York",
    type: "deal_deadline",
    host: "Pipeline Automation",
    location: "Pipeline Workspace",
    tierAccess: "active",
    tags: ["Pipeline", "Action Required"],
  },
  {
    id: "evt-partner-townhall",
    title: "Partner Town Hall: LATAM focus",
    description: "Regional spotlight + two partner showcases. Streamed + recorded.",
    startTime: "2025-11-20T11:00:00-05:00",
    endTime: "2025-11-20T12:00:00-05:00",
    timezone: "America/New_York",
    type: "partner_event",
    host: "Community Team",
    location: "Virtual stage",
    tierAccess: "all",
    tags: ["Community", "Regional"],
    allowsRsvp: true,
    allowRecording: true,
  },
  {
    id: "evt-task-deck",
    title: "Task Due: Q4 battlecard refresh",
    description: "Upload final deck to Shared Files before Marketing publishes.",
    startTime: "2025-11-21T09:00:00-05:00",
    endTime: "2025-11-21T09:30:00-05:00",
    timezone: "America/New_York",
    type: "task_due",
    host: "Task Automation",
    location: "Workspace Tasks",
    tierAccess: "all",
    tags: ["Marketing", "Content"],
  },
  {
    id: "evt-office-hours-priority",
    title: "Priority Office Hours: Enterprise desk",
    description: "Performer+ queue with guaranteed slot + async deal desk follow-up.",
    startTime: "2025-11-21T15:30:00-05:00",
    endTime: "2025-11-21T16:00:00-05:00",
    timezone: "America/New_York",
    type: "office_hours",
    host: "Deal Desk",
    location: "Zoom",
    tierAccess: "performer",
    tags: ["Enterprise", "Priority"],
    allowsRsvp: true,
  },
  {
    id: "evt-webinar-ai-surges",
    title: "Webinar: AI playbooks for services",
    description: "Panel with three Elite partners on pricing/packaging automation, plus templates.",
    startTime: "2025-11-22T12:00:00-05:00",
    endTime: "2025-11-22T13:30:00-05:00",
    timezone: "America/New_York",
    type: "webinar",
    host: "Partner Enablement",
    location: "SISO Live Studio",
    tierAccess: "active",
    tags: ["AI", "Pricing"],
    allowsRsvp: true,
    allowRecording: true,
  },
];

export const calendarSyncProviders = [
  { id: "google", name: "Google Calendar", connected: true, lastSync: "6m ago" },
  { id: "outlook", name: "Outlook / 365", connected: false, lastSync: null },
  { id: "ical", name: "ICS Link", connected: true, lastSync: "Just now" },
];

export const calendarInsights = [
  { label: "Confirmed this week", value: 8, delta: "+2 vs last week" },
  { label: "RSVP conversion", value: "76%", delta: "+6%" },
  { label: "Pending follow-ups", value: 3, delta: "2 tasks due" },
];
