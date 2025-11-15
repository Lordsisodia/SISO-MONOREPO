export type SessionStatus = "open" | "rsvp" | "replay";

export interface LiveSession {
  id: string;
  title: string;
  date: string;
  status: SessionStatus;
}

export const upcomingSessions: LiveSession[] = [
  { id: "sess-1", title: "Office Hours: Discovery Roleplays", date: "2025-11-14T16:00:00Z", status: "open" },
  { id: "sess-2", title: "Sales Q&A", date: "2025-11-18T17:00:00Z", status: "rsvp" },
  { id: "sess-3", title: "Onboarding Replay: Essentials 101", date: "2025-11-05T15:00:00Z", status: "replay" },
];
