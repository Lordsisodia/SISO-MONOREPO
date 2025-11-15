export type TrainingTrack = "Onboarding" | "Sales" | "Operations";
export type TrainingFormat = "video" | "live" | "article" | "challenge";
export type TrainingDifficulty = "Beginner" | "Intermediate" | "Advanced";

export interface TrainingCourse {
  id: string;
  title: string;
  description: string;
  track: TrainingTrack;
  difficulty: TrainingDifficulty;
  duration: string;
  prerequisites?: string;
  format: TrainingFormat;
  releaseStatus: "Available" | "Coming Soon";
  progress: number;
  isFavorite?: boolean;
}

export const courseCatalog: TrainingCourse[] = [
  {
    id: "course-1",
    title: "Partner Essentials 101",
    description: "Overview of SISO programs, incentives, and referral etiquette.",
    track: "Onboarding",
    difficulty: "Beginner",
    duration: "35m",
    prerequisites: "None",
    format: "video",
    releaseStatus: "Available",
    progress: 45,
    isFavorite: true,
  },
  {
    id: "course-2",
    title: "Sales Discovery Calls",
    description: "Framework for qualifying prospects and logging outcomes.",
    track: "Sales",
    difficulty: "Intermediate",
    duration: "50m",
    prerequisites: "Partner Essentials 101",
    format: "video",
    releaseStatus: "Available",
    progress: 10,
  },
  {
    id: "course-3",
    title: "Automation Ops Sprint",
    description: "How to hand off closed deals to delivery teams.",
    track: "Operations",
    difficulty: "Advanced",
    duration: "4 lessons",
    prerequisites: "Sales Discovery Calls",
    format: "article",
    releaseStatus: "Coming Soon",
    progress: 0,
  },
];
