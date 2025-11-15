export type Lesson = {
  id: string;
  title: string;
  duration: string;
  summary: string;
  relatedAssets: { label: string; href: string }[];
};

export type Course = {
  id: string;
  title: string;
  overview: string;
  level: "beginner" | "intermediate" | "advanced";
  industry: string;
  tags: string[];
  duration: string;
  progress: number;
  focus: string;
  legend: string;
  lessons: Lesson[];
  relatedAssets: { label: string; href: string }[];
};

export const courses: Course[] = [
  {
    id: "enterprise-sales-101",
    title: "Enterprise Sales 101",
    overview: "A structured framework for consultative enterprise deals with tiered pricing, playbooks, and objection handling.",
    level: "intermediate",
    industry: "SaaS",
    tags: ["sales", "enterprise", "playbook"],
    duration: "3h",
    progress: 62,
    focus: "Win larger mid-market and enterprise opportunities",
    legend: "6 lessons",
    lessons: [
      {
        id: "discovery-basics",
        title: "Discovery basics",
        duration: "20m",
        summary: "Structure your first five discovery questions so prospects feel heard and understood.",
        relatedAssets: [
          { label: "Retail Tech Case Study", href: "/partners/academy/portfolio/retail-tech-case-study" },
          { label: "Discovery Sprint Deck", href: "/partners/academy/pitch-kit/decks/discovery-sprint" },
        ],
      },
      {
        id: "story-based-impact",
        title: "Story-based impact messaging",
        duration: "18m",
        summary: "Use narratives that combine customer context, delta, and results.",
        relatedAssets: [
          { label: "Manufacturing pitch deck", href: "/partners/academy/pitch-kit/decks/manufacturing" },
        ],
      },
    ],
    relatedAssets: [
      { label: "ROI calculator", href: "/partners/academy/portfolio/roi-calculator" },
      { label: "Enterprise pitch kit", href: "/partners/academy/pitch-kit/decks/enterprise" },
    ],
  },
  {
    id: "growth-marketing-sprint",
    title: "Growth Marketing Sprint",
    overview: "Playbook to orchestrate omnichannel outreach, nurture sequences, and paid experiments for partners.",
    level: "advanced",
    industry: "Marketing",
    tags: ["marketing", "growth", "experiment"],
    duration: "2.5h",
    progress: 14,
    focus: "Build a reliable nurture sequence",
    legend: "5 lessons",
    lessons: [
      {
        id: "experiment-design",
        title: "Experiment design",
        duration: "22m",
        summary: "Craft hypothesis-driven campaigns with measurement plans.",
        relatedAssets: [
          { label: "Design Ops Case Study", href: "/partners/academy/portfolio/design-ops-case-study" },
        ],
      },
    ],
    relatedAssets: [
      { label: "Automation demo", href: "/partners/academy/pitch-kit/demo-videos/automation-platform" },
    ],
  },
  {
    id: "startup-cs-playbook",
    title: "Startup CS Playbook",
    overview: "Playbook for onboarding startup founders, aligning success plans, and packaging renewals.",
    level: "beginner",
    industry: "Startup",
    tags: ["customer", "renewals", "cs"],
    duration: "1.8h",
    progress: 5,
    focus: "Help founders launch with confidence",
    legend: "3 lessons",
    lessons: [
      {
        id: "launch-and-checklist",
        title: "Launch readiness checklist",
        duration: "16m",
        summary: "Countdown of activities before go-live with SISO services.",
        relatedAssets: [
          { label: "Brand kit toolkit", href: "/partners/academy/pitch-kit/brand-kit/colors" },
        ],
      },
    ],
    relatedAssets: [
      { label: "Checklist template", href: "/partners/academy/portfolio/checklist-template" },
    ],
  },
];
