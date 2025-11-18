/**
 * Portfolio Domain - Timeline Types
 */

export interface TimelinePhase {
  name: string; // "Day 1", "Day 2", "Week 2", etc.
  description: string;
  completedDate: string; // ISO date
}

export interface ProjectTimeline {
  startDate: string; // ISO date
  endDate: string; // ISO date
  durationDays: number;
  phases: TimelinePhase[];
}
