export type ChallengeAction = {
  id: string;
  label: string;
  completed: boolean;
};

export type EarningsChallenge = {
  id: string;
  name: string;
  description: string;
  reward: string;
  rewardDetails?: string;
  type: "solo" | "team";
  points: number;
  progress: number;
  deadline: string;
  status: "active" | "upcoming" | "completed";
  actions: ChallengeAction[];
  teamName?: string;
  teammates?: string[];
  region?: string;
};

export const earningsChallenges: EarningsChallenge[] = [
  {
    id: "momentum-sprint",
    name: "Momentum Sprint",
    description: "Close two verified deals and submit post-mortems by Friday.",
    reward: "+10% payout boost",
    rewardDetails: "Applies to all November closes",
    type: "solo",
    points: 400,
    progress: 65,
    deadline: "Ends Nov 21",
    status: "active",
    actions: [
      { id: "deal-1", label: "Log first verified deal", completed: true },
      { id: "deal-2", label: "Log second verified deal", completed: false },
      { id: "retro", label: "Upload 2 playbook retro notes", completed: false },
    ],
  },
  {
    id: "squad-relay",
    name: "Squad Relay",
    description: "Team up with two partners to host three live campus drops.",
    reward: "Exclusive badge + ops concierge",
    type: "team",
    points: 550,
    progress: 40,
    deadline: "Ends Nov 30",
    status: "active",
    teamName: "Ops Guardians",
    teammates: ["Nova", "Sienna", "Harper"],
    actions: [
      { id: "session-1", label: "Run first live drop", completed: true },
      { id: "session-2", label: "Run second live drop", completed: false },
      { id: "recap", label: "Post recap in #wins", completed: false },
    ],
  },
  {
    id: "playbook-labs",
    name: "Playbook Labs",
    description: "Submit a new automation script to the Marketplace.",
    reward: "+150 pts + feature slot",
    type: "solo",
    points: 300,
    progress: 0,
    deadline: "Starts Dec 2",
    status: "upcoming",
    actions: [
      { id: "scope", label: "Scope idea with Ops", completed: false },
      { id: "submit", label: "Submit script", completed: false },
    ],
  },
  {
    id: "past-onboarding",
    name: "September Jumpstart",
    description: "Complete all onboarding rituals within 7 days.",
    reward: "+5% booster",
    type: "solo",
    points: 250,
    progress: 100,
    deadline: "Ended Oct 1",
    status: "completed",
    actions: [
      { id: "rituals", label: "Finish onboarding rituals", completed: true },
      { id: "share", label: "Share kickoff plan", completed: true },
    ],
  },
];
