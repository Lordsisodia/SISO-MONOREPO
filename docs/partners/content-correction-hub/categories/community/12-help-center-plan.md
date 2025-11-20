# Help Center Content Plan (Community)

**Purpose**: Define the Community-specific Help Center categories, starter articles, and seed Q&A per article so we can replace the generic Wallet/Onboarding content in `help-center.ts`.

## Categories & Starter Articles

### 1) Getting Started with Community
- **Article A: “Post your first message”**
  - Q1: How do I choose the right channel for my first post?
  - Q2: What’s the expected response time and how do I get faster replies?
  - Q3: How do I enable notifications for replies and @mentions?
- **Article B: “Set notifications for Community”**
  - Q1: Which events trigger notifications (announcements, @mentions, replies, reactions)?
  - Q2: How do I mute a channel or conversation without missing announcements?
  - Q3: Can I get email/push in addition to in-app?

### 2) Wins Playbook
- **Article A: “What counts as a win?”**
  - Q1: Which events auto-post to Wins (deals, course completions, challenges, new partners, earning milestones)?
  - Q2: What fields are shown on a win card (value, commission, source link)?
  - Q3: Who can react and do reactions grant points?
- **Article B: “Win post template”**
  - Q1: What’s the ideal 3-line format (hook, numbers, asset links)?
  - Q2: How do I add supporting assets (deck, Loom, CTA link)?
  - Q3: How are pinned wins chosen?

### 3) Announcements & Alerts
- **Article A: “Understand announcement types”**
  - Q1: What are the categories (release, program update, maintenance/outage, promotion/incentive, compliance/legal, event/webinar)?
  - Q2: What do severity badges mean (info/warn/critical)?
  - Q3: How long do pinned announcements stay up?
- **Article B: “Acknowledge and follow up”**
  - Q1: Can I reply to announcements? (reactions only—no replies)
  - Q2: Where should I ask questions about an announcement?
  - Q3: How do read receipts or unread counts work?

### 4) Messaging & Threads
- **Article A: “DM vs channel post”**
  - Q1: When should I start a DM/group vs post in General or Wins?
  - Q2: How do tags (deal/course/support) affect routing and filters?
  - Q3: How do I mark a conversation as pinned, archived, or snoozed?
- **Article B: “Thread tools and reactions”**
  - Q1: How do reactions work and do they grant points?
  - Q2: How do quick-reply templates/attachments show in the thread pane?
  - Q3: How is unread handled across devices?

### 5) Profile & Directory
- **Article A: “Improve your partner card”**
  - Q1: Which fields surface in the directory (tier, focus, tags, wins, availability)?
  - Q2: How do I appear as open to mentor or hiring?
  - Q3: How often does availability refresh?
- **Article B: “Find the right partner/mentor”**
  - Q1: How to filter by tier, industry, availability, tags?
  - Q2: How to start a message from a profile?
  - Q3: Can I bookmark or save partners?

### 6) Troubleshooting
- **Article A: “Can’t post in a channel”**
  - Q1: Why is the composer locked in Wins/Announcements?
  - Q2: What to do if a post fails to send?
  - Q3: How to report spam or abuse?
- **Article B: “Reactions or notifications not syncing”**
  - Q1: Why don’t reactions show up immediately?
  - Q2: How to re-enable notifications if they’re muted?
  - Q3: Who to contact if sync issues persist?

## Next Actions
- Replace `help-center.ts` collections and articles with the above (titles, slugs, summaries, lastUpdated).
- Wire `generateStaticParams` to new collection/article slugs.
- Add related links: each article links back to its Channel/Directory page where relevant.
