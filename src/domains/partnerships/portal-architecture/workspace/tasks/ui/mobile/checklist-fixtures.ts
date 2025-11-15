export interface ChecklistTask {
  id: string;
  group: string;
  title: string;
  cadence: string;
  isComplete: boolean;
}

export const mockChecklist: ChecklistTask[] = [
  { id: "task-1", group: "General Tasks", title: "Submit onboarding video intro", cadence: "Once", isComplete: true },
  { id: "task-2", group: "General Tasks", title: "Connect payout wallet", cadence: "Once", isComplete: false },
  { id: "task-3", group: "AI Automation", title: "Daily lesson", cadence: "Daily", isComplete: true },
  { id: "task-4", group: "AI Automation", title: "Workshop call", cadence: "Daily", isComplete: false },
];
