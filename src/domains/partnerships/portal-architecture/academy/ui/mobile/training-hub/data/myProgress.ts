export interface TrackProgress {
  id: string;
  label: string;
  progress: number;
}

export const progressSummaries: TrackProgress[] = [
  { id: "onboarding", label: "Onboarding", progress: 80 },
  { id: "sales", label: "Sales", progress: 35 },
  { id: "operations", label: "Operations", progress: 10 },
];
