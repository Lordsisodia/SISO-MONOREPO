export interface GettingStartedStep {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
}

export const gettingStartedSteps: GettingStartedStep[] = [
  {
    id: "intro-video",
    title: "Watch the welcome video",
    description: "See how SISO partners collaborate, where to drop content, and how to prioritize your first week.",
    actionLabel: "Watch video",
    actionHref: "/partners/academy/training-spotlight",
  },
  {
    id: "first-lesson",
    title: "Complete the first lesson",
    description: "Start 'Discovery Basics' so you can practice the five questions that uncover real decision criteria.",
    actionLabel: "Open lesson",
    actionHref: "/partners/academy/courses/enterprise-sales-101/lessons/discovery-basics",
  },
  {
    id: "office-hours",
    title: "Book office hours",
    description: "Reserve a 20-minute slot with Partner Success to review what you learned and ask about real accounts.",
    actionLabel: "View calendar",
    actionHref: "/partners/workspace",
  },
];

export const firstLessonPath = "/partners/academy/courses/enterprise-sales-101/lessons/discovery-basics";
export const savedDocsPath = "/partners/academy/saved";
export const coursesPath = "/partners/academy/courses";
