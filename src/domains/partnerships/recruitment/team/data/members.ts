export type TeamMemberAction = {
  id: string;
  title: string;
  due: string;
  owner: string;
  type: "coaching" | "compliance" | "pipeline";
};

export type TeamMemberTraining = {
  id: string;
  label: string;
  status: "clear" | "due" | "blocked";
  detail: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  tier: string;
  activity: string;
  status: string;
  focus: string;
  coverage: string;
  timezone: string;
  invitesThisMonth: number;
  referralsYtd: number;
  liveDeals: number;
  readiness: string;
  mentorStatus: string;
  bio: string;
  actions: TeamMemberAction[];
  training: TeamMemberTraining[];
  achievements: string[];
  contact: {
    email: string;
    phone: string;
    slack: string;
  };
};

export const teamMembers: TeamMember[] = [
  {
    id: "avery-diaz",
    name: "Avery Diaz",
    role: "Partner Lead",
    tier: "Performer",
    activity: "Closed 2 referrals this month",
    status: "Green",
    focus: "Enterprise healthcare + ops-heavy orgs",
    coverage: "Healthcare · Enterprise",
    timezone: "EST",
    invitesThisMonth: 6,
    referralsYtd: 14,
    liveDeals: 3,
    readiness: "Cleared to sell",
    mentorStatus: "Mentoring 1 new recruit",
    bio: "Runs the most predictable healthcare funnel and co-builds custom pitch kits.",
    actions: [
      { id: "avery-action-1", title: "Prep MercyHealth pitch deck", due: "Nov 22", owner: "Avery", type: "pipeline" },
      { id: "avery-action-2", title: "Shadow Nova's onboarding call", due: "Nov 24", owner: "Avery", type: "coaching" },
    ],
    training: [
      { id: "avery-training-1", label: "Pitch certification", status: "clear", detail: "Valid through Jan 2026" },
      { id: "avery-training-2", label: "Wallet setup", status: "clear", detail: "Direct deposit active" },
      { id: "avery-training-3", label: "Academy Stage 3", status: "clear", detail: "Completed Oct 2025" },
    ],
    achievements: ["Closed MercyHealth referral in <21d", "Built healthcare objection handler doc"],
    contact: {
      email: "avery@siso.so",
      phone: "+1 (312) 555-1203",
      slack: "@avery",
    },
  },
  {
    id: "jordan-kim",
    name: "Jordan Kim",
    role: "Inbound Recruiter",
    tier: "Active",
    activity: "4 invites pending compliance",
    status: "Action needed",
    focus: "LATAM + prosumer coaching",
    coverage: "LATAM · Prosumer",
    timezone: "PST",
    invitesThisMonth: 8,
    referralsYtd: 11,
    liveDeals: 1,
    readiness: "Compliance follow-ups needed",
    mentorStatus: "Open to mentor",
    bio: "Owns the LATAM pipeline and keeps WhatsApp communities warm.",
    actions: [
      { id: "jordan-action-1", title: "Send wallet forms to Torres Labs", due: "Nov 21", owner: "Jordan", type: "compliance" },
      { id: "jordan-action-2", title: "Book bilingual closer for Esperanza Apps", due: "Nov 23", owner: "Jordan", type: "pipeline" },
    ],
    training: [
      { id: "jordan-training-1", label: "Pitch certification", status: "due", detail: "Renew by Dec 5" },
      { id: "jordan-training-2", label: "Wallet setup", status: "clear", detail: "All payouts cleared" },
      { id: "jordan-training-3", label: "Academy Stage 3", status: "clear", detail: "Completed Sept 2025" },
    ],
    achievements: ["Reactivated LATAM WhatsApp leads", "Built bilingual email drips"],
    contact: {
      email: "jordan.kim@siso.so",
      phone: "+1 (415) 555-9823",
      slack: "@jordan",
    },
  },
  {
    id: "marin-patel",
    name: "Marin Patel",
    role: "Strategic Sales",
    tier: "Elite",
    activity: "Mentoring 3 new reps",
    status: "Green",
    focus: "Ecommerce platform expansions",
    coverage: "Ecommerce · Strategic",
    timezone: "CST",
    invitesThisMonth: 5,
    referralsYtd: 18,
    liveDeals: 4,
    readiness: "Cleared to sell",
    mentorStatus: "Mentoring Avery + Nova",
    bio: "Former Shopify Plus GM bringing predictable six-figure deals.",
    actions: [
      { id: "marin-action-1", title: "Shadow demo with Atlas Retail", due: "Nov 23", owner: "Marin", type: "pipeline" },
      { id: "marin-action-2", title: "Record ops handoff Loom", due: "Nov 25", owner: "Marin", type: "coaching" },
    ],
    training: [
      { id: "marin-training-1", label: "Pitch certification", status: "clear", detail: "Valid through Aug 2026" },
      { id: "marin-training-2", label: "Wallet setup", status: "clear", detail: "Multi-currency ready" },
      { id: "marin-training-3", label: "Academy Stage 3", status: "clear", detail: "Completed Aug 2025" },
    ],
    achievements: ["Closed first $500K+ referral", "Built eCom objection tree"],
    contact: {
      email: "marin@siso.so",
      phone: "+1 (312) 555-9910",
      slack: "@marin",
    },
  },
  {
    id: "nova-chen",
    name: "Nova Chen",
    role: "Community Advocate",
    tier: "Starter",
    activity: "Needs onboarding course",
    status: "Training",
    focus: "Creator programs + community ops",
    coverage: "SMB · Creator",
    timezone: "EST",
    invitesThisMonth: 2,
    referralsYtd: 3,
    liveDeals: 0,
    readiness: "Training in progress",
    mentorStatus: "Mentee • Paired with Avery",
    bio: "Brings TikTok creator leads and grows Discord community activations.",
    actions: [
      { id: "nova-action-1", title: "Finish Academy Stage 3", due: "Nov 25", owner: "Nova", type: "compliance" },
      { id: "nova-action-2", title: "Book onboarding call with Avery", due: "Nov 22", owner: "Nova", type: "coaching" },
    ],
    training: [
      { id: "nova-training-1", label: "Pitch certification", status: "blocked", detail: "Complete Stage 3 first" },
      { id: "nova-training-2", label: "Wallet setup", status: "due", detail: "Missing W-9" },
      { id: "nova-training-3", label: "Academy Stage 3", status: "blocked", detail: "45% complete" },
    ],
    achievements: ["Sourced 3 creator communities", "Hosts weekly Discord jams"],
    contact: {
      email: "nova@siso.so",
      phone: "+1 (347) 555-4432",
      slack: "@nova",
    },
  },
];

export function getTeamMemberById(id: string) {
  return teamMembers.find((member) => member.id === id);
}
