export interface GettingStartedStep {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
  icon: string;
}

export const gettingStartedSteps: GettingStartedStep[] = [
  {
    id: "intro-video",
    title: "Watch the 2‑min welcome",
    description: "Understand how to navigate Academy and where to find the quickest wins.",
    actionLabel: "Play intro",
    actionHref: "/partners/academy/training-spotlight",
    icon: "PlayCircle",
  },
  {
    id: "first-lesson",
    title: "Finish Discovery Basics",
    description: "Complete the first core lesson to unlock your skill assessment and level progress.",
    actionLabel: "Start lesson",
    actionHref: "/partners/academy/courses/enterprise-sales-101/lessons/discovery-basics",
    icon: "BookOpen",
  },
  {
    id: "office-hours",
    title: "Book office hours",
    description: "Schedule 20 minutes with Partner Success to review pipeline and next steps.",
    actionLabel: "Book time",
    actionHref: "/partners/workspace",
    icon: "CalendarClock",
  },
];

export const firstLessonPath = "/partners/academy/courses/enterprise-sales-101/lessons/discovery-basics";
export const savedDocsPath = "/partners/academy/saved";
export const coursesPath = "/partners/academy/courses";
