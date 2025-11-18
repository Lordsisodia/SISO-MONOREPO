export type PitchKitAssetType = "decks" | "demo-videos" | "case-studies" | "objection-handling" | "brand-kit";

export interface PitchAsset {
  id: string;
  title: string;
  summary: string;
  type: PitchKitAssetType;
  status: "public" | "partner-only";
  focus: string;
  relatedProofs: { label: string; href: string }[];
  link: string;
  tags: string[];
}

export interface PitchKitDetail extends PitchAsset {
  researchBullets: string[];
  researchLink?: string;
  talkTrack: string;
  followUps: string[];
  objections: { objection: string; reply: string }[];
  metrics?: string[];
  assets?: {
    deckUrl?: string;
    pdfUrl?: string;
    onePagerUrl?: string;
    demoVideos?: { title: string; url: string }[];
    caseStudies?: { title: string; url: string; metric?: string }[];
  };
  sequenceSnippets?: {
    email?: string;
    linkedin?: string;
    sms?: string;
  };
  deckSlides?: DeckSlide[];
}

export type DeckSlideType =
  | "cover"
  | "pains"
  | "solution"
  | "features"
  | "process"
  | "roi"
  | "pricing"
  | "costs"
  | "proof"
  | "objections"
  | "research"
  | "cta";

export interface DeckSlide {
  type: DeckSlideType;
  title: string;
  subtitle?: string;
  bullets?: string[];
  stats?: { label: string; value: string }[];
  table?: { columns: string[]; rows: string[][] };
  cta?: { label: string; href: string };
}

export const assetTypes: { id: PitchKitAssetType; label: string; blurb: string }[] = [
  { id: "decks", label: "Decks", blurb: "Discovery & closing slides with pricing and ROI hooks." },
  { id: "demo-videos", label: "Demo videos", blurb: "Short walkthroughs to drop mid-call." },
  { id: "case-studies", label: "Case studies", blurb: "Proof points with outcomes and testimonials." },
  { id: "objection-handling", label: "Objection handling", blurb: "Scripts for price, timing, and risk pushback." },
  { id: "brand-kit", label: "Brand kit", blurb: "Logos, colors, and messaging snippets." },
];

export const pitchAssets: PitchAsset[] = [
  {
    id: "deck-standard",
    title: "Standard pitch kit (featured)",
    summary: "Generic pitch deck and talk-track you can use when no industry kit exists yet.",
    type: "decks",
    status: "public",
    focus: "Default kit for any prospect; swap logos and add 1–2 proof links.",
    relatedProofs: [{ label: "Browse portfolio", href: "/partners/academy/portfolio" }],
    link: "/partners/academy/pitch-kit/decks/standard",
    tags: ["general", "discovery", "featured"],
  },
  {
    id: "deck-restaurants",
    title: "Restaurants pitch kit",
    summary: "Menu, online ordering, loyalty, and upsell flows for hospitality operators.",
    type: "decks",
    status: "public",
    focus: "Use for independent restaurants and small groups; highlights quick revenue lifts.",
    relatedProofs: [{ label: "Hospitality proofs", href: "/partners/academy/portfolio" }],
    link: "/partners/academy/pitch-kit/decks/restaurants",
    tags: ["restaurants", "hospitality", "loyalty"],
  },
  {
    id: "deck-bike-rentals",
    title: "Bike rentals pitch kit",
    summary: "Booking, inventory, damage cover, and membership flows for micromobility.",
    type: "decks",
    status: "public",
    focus: "Great for rental shops or tour operators with seasonal peaks.",
    relatedProofs: [{ label: "Mobility proofs", href: "/partners/academy/portfolio" }],
    link: "/partners/academy/pitch-kit/decks/bike-rentals",
    tags: ["mobility", "rentals", "bike"],
  },
  {
    id: "deck-tour-guides",
    title: "Tour guides pitch kit",
    summary: "Scheduling, payments, tips, and review capture for local guides.",
    type: "decks",
    status: "public",
    focus: "Helps guides fill slots and collect reviews to rank higher on platforms.",
    relatedProofs: [{ label: "Tourism proofs", href: "/partners/academy/portfolio" }],
    link: "/partners/academy/pitch-kit/decks/tour-guides",
    tags: ["travel", "tours", "bookings"],
  },
];

export const pitchKitByLink: Record<string, PitchAsset> = pitchAssets.reduce((acc, kit) => {
  acc[kit.link] = kit;
  return acc;
}, {} as Record<string, PitchAsset>);

export const pitchKitDetails: Record<string, PitchKitDetail> = {
  "decks/standard": {
    ...pitchAssets.find((p) => p.id === "deck-standard")!,
    researchBullets: [
      "SMBs value <90-day ROI and fast setup over bespoke builds.",
      "Standard kit covers discovery → demo → close with generic proof placeholders.",
      "Add 1–2 portfolio links for credibility; keep deck lightweight for mobile.",
    ],
    talkTrack: "Lead with time-to-value, show the deck highlight reel, then confirm a tailored proof follow-up.",
    followUps: ["Which KPI matters most: revenue, cost, or retention?", "Can we share 1 relevant proof before Friday?", "Who signs off on tooling changes?"],
    objections: [
      { objection: "We already have decks", reply: "Use yours, drop in our ROI and proof slides; 10 min edit." },
      { objection: "Too generic", reply: "Pick 2 slides to swap with industry proof—takes <15 minutes." },
      { objection: "No time to review", reply: "Send the 2-slide mini deck and a 90s loom; we’ll do the lift." },
    ],
  },
  "decks/restaurants": {
    ...pitchAssets.find((p) => p.id === "deck-restaurants")!,
    researchBullets: [
      "Operators care about table turns, online ordering mix, and labor coverage.",
      "Loyalty + upsell lifts AOV 8–15% when paired with SMS reactivation.",
      "Menu updates + modifiers are the biggest friction; show the flow in 30s.",
    ],
    talkTrack: "Open with lost revenue from abandoned orders, show ordering/loyalty flow, finish with 2-week pilot ask.",
    followUps: ["How do you handle peak rush today?", "What % of orders are direct vs. delivery apps?", "Who owns loyalty and reactivation?"],
    objections: [
      { objection: "We’re locked into a POS", reply: "Keep your POS; this plugs in as a front-end + loyalty layer." },
      { objection: "Too busy to switch", reply: "Start with a single location, keep menu in sync; go live in days." },
      { objection: "Customers already use delivery apps", reply: "Run direct-order incentives; show A/B uplift on take-home margins." },
    ],
    metrics: [
      "+8–12% average order value via direct + loyalty offers",
      "+10% direct orders vs delivery apps within 30 days",
      "<14 days to go-live alongside your existing POS",
    ],
    assets: {
      deckUrl: "/partners/academy/pitch-kit/decks/restaurants",
      pdfUrl: "/assets/pitchkits/restaurants.pdf",
      onePagerUrl: "/assets/pitchkits/restaurants-onepager.pdf",
      demoVideos: [{ title: "Ordering & loyalty flow (90s)", url: "https://video.example/ordering-loyalty" }],
      caseStudies: [
        {
          title: "2-location bistro • +12% AOV",
          url: "/partners/academy/portfolio/hospitality-bistro",
          metric: "+12% AOV, +9% direct orders",
        },
      ],
    },
    sequenceSnippets: {
      email:
        "Subject: Cut delivery fees & lift AOV in 2 weeks\nBody: Quick win: launch direct ordering + loyalty without swapping POS. 90s flow video: https://video.example/ordering-loyalty",
      linkedin: "Quick win: direct ordering + loyalty; 2-min deck: /partners/academy/pitch-kit/decks/restaurants",
    },
    researchLink: "https://linked.example/restaurant-industry-snapshot",
    deckSlides: [
      {
        type: "cover",
        title: "Restaurants Pitch Kit",
        subtitle: "More direct orders. Higher AOV. Live in <14 days.",
      },
      {
        type: "pains",
        title: "What restaurant operators fight every week",
        bullets: [
          "Delivery fees erode margin; direct orders underperform.",
          "Menus/modifiers slow to change; staff workarounds cause errors.",
          "Midweek dip and lapsed guests; loyalty not driving repeat.",
        ],
      },
      {
        type: "solution",
        title: "Direct ordering + loyalty + SMS reactivation",
        bullets: [
          "Mobile-first ordering flow with table, pickup, delivery.",
          "Built-in offers, stamps, and upsells to lift AOV.",
          "Automated reactivation nudges to fill midweek gaps.",
        ],
      },
      {
        type: "features",
        title: "Why this beats the status quo",
        bullets: [
          "Menu editor & modifiers — live in minutes, no dev calls.",
          "Loyalty & promos — stamps, bundles, midweek boosters.",
          "Reviews & tips — capture after checkout to boost rank.",
          "POS passthrough — keep your POS; we add the revenue layer.",
        ],
      },
      {
        type: "process",
        title: "Go-live in under 14 days",
        bullets: [
          "Day 1–2: Import menu, connect payments/POS.",
          "Day 3–5: Launch direct ordering + starter offers.",
          "Day 6–14: Reactivation campaigns + A/B promos; measure uplift.",
        ],
      },
      {
        type: "roi",
        title: "Pilot targets (30 days)",
        stats: [
          { label: "AOV lift", value: "+8–12%" },
          { label: "Direct orders", value: "+10%" },
          { label: "Time to live", value: "<14 days" },
        ],
      },
      {
        type: "pricing",
        title: "Costs vs typical options",
        table: {
          columns: ["", "This kit", "Delivery apps", "DIY site"],
          rows: [
            ["Per-order fee", "0%", "15–30%", "0% but dev time"],
            ["Hosting year 1", "Covered by SISO", "N/A", "$/mo + maintenance"],
            ["Loyalty/promos", "Included", "Limited / extra", "Custom build"],
            ["Go-live speed", "<14 days", "Immediate", "4–8 weeks+"],
          ],
        },
      },
      {
        type: "costs",
        title: "We cover the infrastructure year 1",
        bullets: ["Hosting + database + monitoring included", "Security/backup handled by SISO", "Renewal plan set before year 2"],
      },
      {
        type: "proof",
        title: "Proof you can share",
        bullets: ["2-location bistro: +12% AOV, +9% direct orders", "Hospitality proofs: more in portfolio"],
      },
      {
        type: "objections",
        title: "Answer the common pushbacks",
        bullets: [
          "“We’re locked into a POS” → Keep POS; this is the front-end/loyalty layer.",
          "“Too busy to switch” → Start with one location; menu stays in sync.",
          "“Delivery apps already cover us” → Direct saves 15–30% fees; run A/B incentive.",
        ],
      },
      {
        type: "research",
        title: "Industry snapshot (use in intros)",
        bullets: [
          "Delivery fee pressure makes direct mix strategic.",
          "Loyalty + SMS drives repeat; quick-service adoption growing.",
          "Menu agility and promos beat static sites for midweek fill.",
        ],
      },
      {
        type: "cta",
        title: "Start a 2-week pilot",
        subtitle: "Pick one location; we launch, you measure the uplift.",
        cta: { label: "Book pilot", href: "/partners/academy/pilot-booking" },
      },
    ],
  },
  "decks/bike-rentals": {
    ...pitchAssets.find((p) => p.id === "deck-bike-rentals")!,
    researchBullets: [
      "Top pains: no-shows, damaged returns, and slow turnaround on inventory.",
      "Memberships smooth seasonality; email/SMS nudges cut idle inventory.",
      "Waivers + card holds reduce disputes; highlight this in the deck.",
    ],
    talkTrack: "Frame against no-shows and damage risk, show booking + hold flow, end with a weekend pilot.",
    followUps: ["What % of bookings no-show today?", "Do you hold cards or deposits per unit?", "How do you upsell helmets/tours today?"],
    objections: [
      { objection: "We already take bookings", reply: "Layer on holds, addons, and automated reminders without replacing POS." },
      { objection: "Chargebacks worry us", reply: "Pre-auth + photo check-in; show that workflow slide." },
      { objection: "Seasonal cash flow", reply: "Memberships + bundles stabilize off-peak; we’ll template two offers." },
    ],
  },
  "decks/tour-guides": {
    ...pitchAssets.find((p) => p.id === "deck-tour-guides")!,
    researchBullets: [
      "Guides compete on reviews, photo proof, and calendar density.",
      "Tips and upsells (private tour, add-ons) boost margin per booking.",
      "Automated review capture after tours meaningfully lifts ranking.",
    ],
    talkTrack: "Lead with filling empty slots, show booking + review capture, finish with ‘try this on one route’ ask.",
    followUps: ["Which days have the lowest fill?", "Do you segment private vs group tours?", "How do you collect tips/reviews today?"],
    objections: [
      { objection: "We list on big marketplaces", reply: "Keep them; add direct bookings and review capture to lift rank and margin." },
      { objection: "Tech feels heavy", reply: "Lightweight web flow; keep your current messaging, we host it." },
      { objection: "No time to tweak scripts", reply: "Use the canned outreach & tour reminder templates already in the kit." },
    ],
  },
};
