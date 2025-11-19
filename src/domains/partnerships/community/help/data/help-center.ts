export type HelpArticleSection = {
  heading?: string;
  body: string[];
  icon?: "clock" | "sparkles" | "credit-card" | "edit";
};

export type HelpArticle = {
  slug: string;
  title: string;
  summary: string;
  lastUpdated: string;
  sections: HelpArticleSection[];
  tags?: string[];
};

export type HelpCollectionIcon =
  | "life-buoy"
  | "credit-card"
  | "sparkles"
  | "shield-check"
  | "bar-chart"
  | "users";

export type HelpCollection = {
  slug: string;
  title: string;
  description: string;
  icon: HelpCollectionIcon;
  articles: HelpArticle[];
};

const formatDate = (value: string) => new Date(value).toISOString();

export const helpCollections: HelpCollection[] = [
  {
    slug: "academy",
    title: "Academy",
    description: "Courses, progress, and pitch materials.",
    icon: "sparkles",
    articles: [
      {
        slug: "academy-dashboard",
        title: "How do I read the Academy dashboard?",
        summary: "Progress, recommendations, and refresh cadence.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Check progress %, streaks, and the recommended next course first. The hero tiles are ordered by impact, so start with the top item before browsing."] },
          { body: ["Recommendations surface from your last activity, goals, and course difficulty balance. If you change goals, give the dashboard a few minutes to update suggestions."] },
          { body: ["Stats refresh every 15 minutes or immediately after a completion event; hard refresh if you just finished a lesson and don’t see it reflected."] },
        ],
      },
      {
        slug: "getting-started",
        title: "How do I complete Getting Started / My Progress?",
        summary: "Unlock levels, points, and personalized learning.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Finish the checklist steps to unlock badges, levels, and access to gated content. Each step awards points that also count toward tier progression."] },
          { body: ["Points come from lessons, quizzes, challenges, and streaks; missing a day pauses the streak but doesn’t reset your level."] },
          { body: ["Set your learning goals to personalize the order of suggested modules and the difficulty of quizzes you see."] },
        ],
      },
      {
        slug: "courses-catalog",
        title: "How do I use the courses catalog?",
        summary: "Filters, resumes, and gated courses.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Filter by category, difficulty, completion state, and duration to find the fastest next step."] },
          { body: ["Resume from the last lesson automatically; the player retains your place across devices within a minute."] },
          { body: ["Gated courses unlock after prerequisites are complete; if blocked, check the locked badge for the missing requirement."] },
        ],
      },
      {
        slug: "pitch-kit",
        title: "How do I work with pitch kits?",
        summary: "Download, customize, and track updates.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Download decks and one-pagers by industry; each includes an editable cover and CTA slide plus a locked pricing sheet."] },
          { body: ["Customize intro/outro, examples, and CTA text; keep the pricing and disclaimers unchanged to stay compliant."] },
          { body: ["We announce updates in Community → Announcements and version notes are listed on each kit; download the latest before pitches."] },
        ],
      },
      {
        slug: "training-spotlight",
        title: "How do I use the training spotlight?",
        summary: "Pick the weekly high-impact lesson.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Spotlight is curated weekly based on current pipeline themes and common blockers we’re seeing in deals."] },
          { body: ["Bookmark the spotlight lesson to resume later; finishing within the week grants a small bonus point multiplier."] },
          { body: ["Related assets (kits, templates, decks) are linked under the spotlight card so you can act immediately."] },
        ],
      },
    ],
  },
  {
    slug: "client-pipeline",
    title: "Client Pipeline",
    description: "Prospects, deals, and submissions.",
    icon: "bar-chart",
    articles: [
      {
        slug: "pipeline-dashboard",
        title: "How do I read the pipeline dashboard?",
        summary: "Prospects, velocity, and filters.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Prospects = open leads not yet qualified; Active deals = in-stage opportunities tied to an offer."] },
          { body: ["Use stage, owner, and industry filters to focus daily work; saved filters persist on your device."] },
          { body: ["Pipeline stats refresh every 10 minutes or instantly after you update a stage."] },
        ],
      },
      {
        slug: "submit-client",
        title: "How do I submit a client?",
        summary: "Required fields and review flow.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Provide company, buyer contact, problem statement, budget range, and urgency so Ops can triage quickly."] },
          { body: ["Ops reviews submissions within one business day; critical deals marked urgent are checked first."] },
          { body: ["Track status and required clarifications on the Submit Client page; you’ll get a notification on decisions."] },
        ],
      },
      {
        slug: "prospects",
        title: "How do I manage prospects?",
        summary: "Prioritization, tags, and assignment.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Priority combines a lead score, recency, and manual flags from Ops; highest-priority prospects float to the top."] },
          { body: ["Tags (industry, size, urgency, source) drive list filters and quick segments for outreach."] },
          { body: ["Assign or reassign via the actions menu; changes log to history so teams see ownership shifts."] },
        ],
      },
      {
        slug: "app-plan-generator",
        title: "How do I use the App Plan Generator?",
        summary: "Inputs, edits, and sharing.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Enter goals, scope, timeline, budget, and constraints to generate a tailored app plan."] },
          { body: ["Regenerate with refined prompts and keep past versions for comparison; note changes in the comments field."] },
          { body: ["Share via secure link or export to PDF for clients; links respect permissions and expire if revoked."] },
        ],
      },
    ],
  },
  {
    slug: "community",
    title: "Community",
    description: "Channels, wins, announcements, and messages.",
    icon: "users",
    articles: [
      {
        slug: "post-first-message",
        title: "How do I post my first Community message?",
        summary: "Pick the right channel and get replies fast.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["General = questions, updates, quick help; Wins and Announcements are read-only and automation-driven.", "Tag @squads or subject experts to speed answers; include your context up front.", "Enable @mention notifications so you don’t miss replies."] },
        ],
      },
      {
        slug: "wins-playbook",
        title: "What counts as a win and how is it auto-posted?",
        summary: "Auto rules, fields shown, reactions.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Auto posts fire for deals, course completions, challenges, new partner joins, and earning milestones; no manual posting needed.", "Win cards show value, commission if available, and links back to the source record for auditing.", "Reactions award points; replies are intentionally locked to keep wins clean—discuss in General if needed."] },
        ],
      },
      {
        slug: "announcements",
        title: "How do announcements work and where do I follow up?",
        summary: "Categories, severity, and reactions.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Categories: release, program-update, maintenance/outage, promotion/incentive, compliance/legal, event/webinar—check the pill to identify type quickly.", "Severity badges: info = FYI, warn = caution/behavior change, critical = immediate impact.", "React to acknowledge; replies are disabled. Start a thread in General for clarifications."] },
        ],
      },
      {
        slug: "messaging-threads",
        title: "When should I DM vs start a channel thread?",
        summary: "Routing, tags, and inbox actions.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["DM/group for quick coordination or sensitive info; channel threads for searchable answers the community can reuse.", "Use tags (deal/course/support) so filters and routing pick up your message.", "Inbox actions: mark unread to revisit, pin to keep top-of-list, archive to clean up, snooze to pause alerts."] },
        ],
      },
      {
        slug: "troubleshoot-community",
        title: "How do I fix common Community issues?",
        summary: "Posting locks, reactions, notifications.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Wins and Announcements are intentionally read-only; use General for follow-ups.", "If reactions don’t show, refresh; if still missing, check connectivity and sign-out/sign-in.", "Re-enable notifications in Settings → Notifications if you muted a channel or set quiet hours."] },
        ],
      },
    ],
  },
  {
    slug: "earnings",
    title: "Earnings",
    description: "Wallet, payouts, tiers, achievements.",
    icon: "credit-card",
    articles: [
      {
        slug: "earnings-dashboard",
        title: "How do I read the Earnings dashboard?",
        summary: "Totals, pending, available, alerts.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Totals include cleared + pending; Available is what you can withdraw now; Pending includes items inside hold windows.", "Dashboard updates hourly or immediately after payout events.", "Alerts flag holds, missing tax info, or expiring payment methods—clear them to avoid payout delays."] },
        ],
      },
      {
        slug: "wallet-payouts",
        title: "How do payouts work in Wallet?",
        summary: "Schedule, methods, holds.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Standard payouts run twice weekly; instant transfers appear when verified rails and limits permit.", "View holds/disputes under Wallet → Holds with reasons and required documents.", "Fees and FX conversions display before you confirm a transfer."] },
        ],
      },
      {
        slug: "tier-progression",
        title: "How do I progress tiers?",
        summary: "Points, thresholds, benefits.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Earn tier points via deals, course completions, and challenges; points also stack with achievements.", "Tier changes apply to commissions on the next earnings cycle and show instantly in your tier badge.", "Benefits and thresholds are listed per tier; hover to see details."] },
        ],
      },
      {
        slug: "achievements-leaderboard",
        title: "How do achievements and the leaderboard work?",
        summary: "Scoring and tie-breakers.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Achievements grant points, badges, and sometimes challenge credits; they also boost visibility in leaderboards.", "Leaderboard uses rolling 30-day earnings plus a streak bonus to reward consistency.", "Ties break on most recent win, then on total reactions from wins."] },
        ],
      },
      {
        slug: "challenges",
        title: "How do challenges pay out?",
        summary: "Join, rewards, failure states.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Join from Challenges after reading the requirements and deadlines; some require a specific tier.", "Rewards may be points, badges, or payout bonuses—check the reward pill before starting.", "If you miss a challenge, you can rejoin next cycle; progress does not carry over unless stated."] },
        ],
      },
    ],
  },
  {
    slug: "notifications",
    title: "Notifications",
    description: "Settings, channels, digests, delivery.",
    icon: "bell",
    articles: [
      {
        slug: "notification-settings",
        title: "How do I set notification preferences?",
        summary: "Events, channels, quiet hours.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Toggle announcements, @mentions, wins, reactions, and DMs individually so you only get what you need.", "Choose in-app, email, or push per event; critical announcements override quiet hours unless you disable overrides.", "Set quiet hours to pause non-critical alerts; urgent notices still come through if enabled."] },
        ],
      },
      {
        slug: "channel-preferences",
        title: "How do channel-specific preferences work?",
        summary: "Mute/priority per channel.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Mute a Community channel or a single conversation without affecting others.", "Pin priority channels so their alerts rise above your global settings.", "Per-channel settings override global defaults; review both if you miss or get too many pings."] },
        ],
      },
      {
        slug: "digests",
        title: "How do daily/weekly digests work?",
        summary: "Content and controls.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Digests bundle top announcements, recent wins, and unread @mentions to reduce noise.", "Set daily or weekly frequency, or pause entirely, from Notifications settings.", "When you read items in-app, they drop out of the next digest automatically."] },
        ],
      },
      {
        slug: "delivery-troubleshooting",
        title: "How do I fix notification delivery issues?",
        summary: "Missed alerts, bounces, duplicates.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Check channel mutes and quiet hours first; most delivery issues come from local settings.", "Verify email/push permissions and re-auth if your token expired.", "Report duplicates or missing alerts to support with timestamps so we can trace them."] },
        ],
      },
      {
        slug: "reduce-notification-noise",
        title: "How do I reduce notification noise?",
        summary: "Tuning signals without missing critical alerts.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Mute low-priority channels but keep Announcements on to avoid missing critical updates.", "Move non-critical events (reactions, some DMs) into digests instead of real-time.", "Use quiet hours plus per-channel priorities to keep urgent items flowing while cutting noise."] },
        ],
      },
    ],
  },
  {
    slug: "partnership-hub",
    title: "Partnership Hub",
    description: "Programs, offers, agreements, ops requests.",
    icon: "users",
    articles: [
      {
        slug: "partner-programs",
        title: "How do partner programs work?",
        summary: "Eligibility, enrollment, benefits.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["View programs filtered by tier or region to see what you qualify for today.", "Enroll from the program page; approvals and required steps are emailed and shown in the card.", "Benefits (leads, assets, support level) are tracked on the program card with start/end dates."] },
        ],
      },
      {
        slug: "offers-assets",
        title: "How do I find and request partner assets?",
        summary: "Assets, localization, versioning.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Browse the latest decks/one-pagers in Assets; recently updated files show a ‘new’ badge.", "Request custom or localized assets via the request form; include target industry and language.", "Version history displays on each asset so you know which revision you’re using."] },
        ],
      },
      {
        slug: "agreements-compliance",
        title: "How do I handle agreements and compliance?",
        summary: "Signing, renewals, documents.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Review and sign agreements in-app with a full audit trail and downloadable copy.", "We send renewal reminders 30 and 7 days before expiration; renew early to avoid access gaps.", "Upload compliance docs directly to the agreement record to keep everything linked."] },
        ],
      },
      {
        slug: "partner-ops-requests",
        title: "How do I submit and track ops requests?",
        summary: "Create, track, escalate requests.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Open requests for billing, access, or data fixes with a clear description and urgency.", "Each request shows its SLA on the card; status changes notify you automatically.", "Escalate by adding a blocker tag or @Ops when a deliverable is at risk."] },
        ],
      },
      {
        slug: "program-benefits-tracking",
        title: "How do I track program benefits over time?",
        summary: "Benefit unlocks and history.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["See unlocked benefits and their effective dates in each program card.", "History shows when benefits activated or changed so finance/audit can verify.", "If a benefit looks missing, contact Ops with the program name and date you qualified."] },
        ],
      },
    ],
  },
  {
    slug: "profile",
    title: "Profile",
    description: "Visibility, badges, preferences, privacy.",
    icon: "users",
    articles: [
      {
        slug: "profile-overview",
        title: "How do I edit and share my profile?",
        summary: "Visible fields and update timing.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Your avatar, headline, focus, and tags are visible in the directory and partner cards.", "Edits propagate within minutes across Community, Messages, and Directory.", "Toggle contact methods (email, DM) to control how others can reach you."] },
        ],
      },
      {
        slug: "verification-badges",
        title: "How do verification and badges work?",
        summary: "Types, display, appeals.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Complete email/ID/certification checks to unlock verification badges.", "Badges display on your profile and directory cards, boosting trust for prospects.", "Appeal or request verification from Settings if something is missing or incorrect."] },
        ],
      },
      {
        slug: "preferences-availability",
        title: "How do I set preferences and availability?",
        summary: "Status, mentoring, hiring visibility.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Set availability and time zone so meeting suggestions and status chips stay accurate.", "Opt into mentoring or hiring signals to surface in searches for those intents.", "Control which contact methods are shown to different audiences if needed."] },
        ],
      },
      {
        slug: "privacy-data",
        title: "How do I control privacy and data access?",
        summary: "Public vs private, export/delete.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Choose which fields stay public vs private; private items are hidden from directory search.", "Request data export or deletion from Settings → Privacy; we’ll confirm timelines before actioning.", "Activity visibility (wins/posts/reactions) follows community policies; request removals via support if required."] },
        ],
      },
      {
        slug: "activity-visibility",
        title: "How do I control who sees my activity?",
        summary: "Wins, posts, reactions visibility.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Activity visibility follows the permissions of each section; wins are viewable by all partners, DMs are private.", "Adjust notification visibility in Settings to limit who sees your status signals.", "For compliance-driven removals, contact support with the activity link and reason."] },
        ],
      },
    ],
  },
  {
    slug: "recruitment",
    title: "Recruitment",
    description: "Candidates, outreach, offers.",
    icon: "users",
    articles: [
      {
        slug: "recruitment-dashboard",
        title: "How do I read the recruitment dashboard?",
        summary: "KPIs, refresh, targets.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["KPIs include pipeline size, outreach volume, interviews, and conversion rate.", "Dashboard refreshes every 15 minutes; push refresh after bulk imports.", "Targets are set by role/tier and shown in the header; hit them to unlock accelerator rewards."] },
        ],
      },
      {
        slug: "candidates",
        title: "How do I manage prospects/candidates?",
        summary: "Add, stage, tag candidates.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Add or import candidates with role, region, and source to enable proper routing.", "Stages flow sourced → contacted → interviewing → offer; updates drive reporting.", "Tag by role, region, cohort, or referral source to filter and segment outreach."] },
        ],
      },
      {
        slug: "outreach-templates",
        title: "How do I run outreach with templates?",
        summary: "Templates, logging, A/B tests.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Use stored templates as a base; personalize intros and value props for each role/industry.", "Log every attempt with outcome so conversion reporting stays accurate.", "A/B test subject lines or CTAs and compare response rates week over week."] },
        ],
      },
      {
        slug: "offers-onboarding",
        title: "How do I send offers and track onboarding?",
        summary: "Offers, acceptance, handoff.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Generate and send offers with start date, tier, and incentive details prefilled.", "Track acceptance, counter, or stalled states; escalate blockers quickly.", "Hand off accepted partners to Academy and Community onboarding for day-1 success."] },
        ],
      },
      {
        slug: "handoff-accepted",
        title: "How do I hand off accepted partners to onboarding?",
        summary: "Post-offer steps and ownership.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Trigger the onboarding checklist as soon as an offer is accepted; auto-create welcome tasks.", "Assign an owner to oversee Academy setup and initial Community introductions.", "Monitor early activity (first login, first course, first post) to catch drop-off early."] },
        ],
      },
    ],
  },
  {
    slug: "settings",
    title: "Settings",
    description: "Account, security, billing, integrations.",
    icon: "shield-check",
    articles: [
      {
        slug: "account-settings",
        title: "How do I manage my account settings?",
        summary: "Email, password, MFA, recovery.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Change email, password, and MFA in Account; use hardware keys or TOTP for strongest security.", "Manage connected identities (SSO/OAuth) and revoke old sessions regularly.", "Recover access with backup codes or contact support after ID verification."] },
        ],
      },
      {
        slug: "security-permissions",
        title: "How do security and permissions work?",
        summary: "Sessions, roles, API keys.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Review active sessions/devices and revoke anything you don’t recognize.", "Roles determine what you can post and view; check the Roles page if access looks wrong.", "Enable/disable API keys and rotate them regularly; limit scopes to what you need."] },
        ],
      },
      {
        slug: "billing-invoices",
        title: "How do I manage billing and invoices?",
        summary: "Payment methods, invoices, dunning.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Update payment methods and billing contacts from Billing; changes apply to the next invoice.", "Download invoices/receipts any time; past-due items are flagged.", "Failed payments enter dunning—update your card and retry to clear holds."] },
        ],
      },
      {
        slug: "integrations",
        title: "How do integrations connect and sync?",
        summary: "Connect, scopes, sync.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Connect CRM/task tools and review requested scopes before approving.", "Pause or resync an integration from the Integrations page if data looks stale.", "Disconnect stops future syncs; historical data remains unless you request deletion."] },
        ],
      },
      {
        slug: "data-export-privacy",
        title: "How do I export or delete my data?",
        summary: "Data portability and privacy controls.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Request a full data export from Settings → Privacy; we’ll email you when it’s ready.", "Submit deletion requests there as well; the UI shows expected completion timelines.", "Some records may be retained for compliance/audit; we’ll note what stays and why."] },
        ],
      },
    ],
  },
  {
    slug: "workspace",
    title: "Workspace",
    description: "Dashboard, calendar, tasks, files/notes.",
    icon: "life-buoy",
    articles: [
      {
        slug: "workspace-dashboard",
        title: "How do I customize the Workspace dashboard?",
        summary: "Widgets, layout, refresh.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Widgets include tasks, calendar, files, and cross-section alerts; hide ones you don’t use.", "Drag and reorder tiles to create your own layout; settings persist per user.", "Data refreshes every 10 minutes or on-demand for tasks and calendar."] },
        ],
      },
      {
        slug: "calendar",
        title: "How do I use the calendar for webinars and office hours?",
        summary: "Register, time zones, sync.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Register from the calendar card; confirmations and links arrive by email and appear as reminders.", "Time zones auto-adjust to your profile setting to avoid missed sessions.", "Sync to Google/Outlook using the iCal link; changes propagate within a few minutes."] },
        ],
      },
      {
        slug: "tasks",
        title: "How do I manage tasks in Workspace?",
        summary: "Create, assign, tag.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Create or assign tasks with due dates, priority, and watchers if collaboration is needed.", "Use tags to filter and link tasks to deals, courses, or wins for context.", "Track completion history in the task drawer, including who closed it and when."] },
        ],
      },
      {
        slug: "files-notes",
        title: "How do I handle files and notes?",
        summary: "Upload, versioning, access.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Upload and share files with role-based access; restrict sensitive docs to teams.", "Version history is kept on each file; restore older versions if needed.", "Organize notes into folders and link them to tasks, deals, or courses for easy retrieval."] },
        ],
      },
      {
        slug: "cross-section-alerts",
        title: "How do cross-section alerts surface in Workspace?",
        summary: "Community/Earnings alerts in one view.",
        lastUpdated: formatDate("2025-11-17"),
        sections: [
          { body: ["Alerts from Community and Earnings surface in the dashboard widgets so you don’t miss critical items.", "Control which alert types show in each widget via settings to avoid overload.", "Open the linked section page directly from the alert to resolve quickly."] },
        ],
      },
    ],
  },
];

export const getHelpCollections = () => helpCollections;

export const getHelpCollection = (slug: string) =>
  helpCollections.find((collection) => collection.slug === slug);

export const getHelpArticle = (collectionSlug: string, articleSlug: string) => {
  const collection = getHelpCollection(collectionSlug);
  if (!collection) return undefined;
  return {
    collection,
    article: collection.articles.find((article) => article.slug === articleSlug),
  };
};
