import type { ReactNode } from "react";

export type ProgressWidget = {
  type: "progress";
  tier: string;
  percent: number;
  ptsToNext: number;
  nextTier: string;
};

export type CoursesWidget = {
  type: "courses";
  available: number;
  inProgress: number;
  completed: number;
};

export type SpotlightWidget = {
  type: "spotlight";
  lesson: string;
  duration: string;
};

export type DashboardWidget = ProgressWidget | CoursesWidget | SpotlightWidget;

export type DashboardCard = {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
  stat: string;
  ctaLabel?: string;
  widget?: DashboardWidget;
};
