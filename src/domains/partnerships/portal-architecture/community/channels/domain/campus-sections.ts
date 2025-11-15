export interface CampusSection {
  id: string;
  label: string;
  channels: Array<{ id: string; name: string }>;
}

export const campusSections: CampusSection[] = [
  {
    id: "daily",
    label: "Daily",
    channels: [
      { id: "daily-checklist", name: "| daily-checklist" },
      { id: "daily-lesson", name: "| daily-lesson" },
      { id: "daily-accomplishment", name: "| daily-accomplishment" },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    channels: [
      { id: "fitness-challenge", name: "| fitness-challenge" },
      { id: "challenge-submit", name: "| challenge-submit" },
      { id: "marketing-review", name: "| marketing-review" },
    ],
  },
  {
    id: "mission-center",
    label: "Mission Center",
    channels: [
      { id: "receive-mission", name: "| receive-mission" },
      { id: "post-report", name: "| post-report" },
    ],
  },
];
