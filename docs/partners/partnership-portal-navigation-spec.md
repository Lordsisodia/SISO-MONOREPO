# SISO Partnership Portal - Navigation Architecture Specification

**Date:** November 10, 2025
**Version:** 1.0
**Status:** Final - Ready for Implementation

---

## 🎯 Overview

The SISO Partnership Portal is a mobile-first PWA designed to equip affiliate partners with everything they need to bring clients to SISO Agency. The navigation system uses a **9-icon side rail** with expandable detail panels containing subsections and dropdowns.

### Core Philosophy
- **Community + Utility** - Feel like a team, function like a CRM
- **Progressive Unlock** - Features unlock as partners advance tiers
- **Mobile-First** - Optimized for on-the-go partner experience
- **Gamified** - Leaderboards, achievements, challenges keep partners motivated

---

## 📱 Navigation Structure

### **Icon Rail (Left Side) - 9 Icons + Notifications**

```
1. 🏠 Home
2. 📊 Pipeline
3. 🎓 Academy
4. 💰 Growth
5. 📅 Calendar
6. ✅ Tasks
7. 👥 Community
8. 📝 Notes
9. ⚙️ Settings

+ 🔔 Notifications (Header Icon)
```

---

## 📄 Detailed Page Specifications

### **1. 🏠 Home**

**Purpose:** Central command center - first thing partners see daily

#### **Subsections:**

##### **Overview**
**Content:**
- **Hero Stats Cards (4 cards):**
  - Earnings This Month ($ amount + % change vs last month)
  - Active Deals (number in progress with SISO)
  - Tier Progress Ring (visual showing deals until next tier)
  - Commission Rate (current tier %)

- **Tier Advancement Preview:**
  - Progress bar: "X more deals to reach [Next Tier]"
  - Teaser of benefits unlocking at next level

**Tier Gating:** All tiers

---

##### **Announcements**
**Content:**
- Feed of SISO team broadcasts (latest first)
- Each announcement shows:
  - Title
  - Date posted
  - Preview text (expandable)
  - "New" badge for unread
- Examples:
  - "New Tier Benefits: White-Label Materials Now Available"
  - "Office Hours This Thursday: Enterprise Sales Training"
  - "Portfolio Update: 3 New Case Studies Added"

**Tier Gating:** All tiers

---

##### **Quick Actions**
**Content:**
- **Primary CTA:** "Submit New Client" button (leads to Pipeline → Submit Client)
- **Secondary Actions:**
  - View Portfolio (opens Academy → Portfolio)
  - Message SISO (opens direct chat)
  - Book Office Hours (opens Calendar)

**Tier Gating:** All tiers (but some actions may be tier-locked)

---

##### **Recent Activity**
**Content:**
- Real-time feed of partner-specific updates (last 7 days)
- Examples:
  - "Demo ready for Client X" (2 hours ago)
  - "Earned $500 commission on Deal Y" (1 day ago)
  - "New course available: Closing Enterprise Deals" (3 days ago)
  - "Sarah (partner) just closed a $10k deal!" (4 days ago)
  - "You advanced to Active Tier!" (5 days ago)

**Tier Gating:** All tiers

---

##### **Wins Feed**
**Content:**
- Social proof feed of all partner victories
- Each win shows:
  - Partner name (or anonymous if preferred)
  - Deal size (optional)
  - Industry/client type
  - Congratulations from team
- Sortable by: Recent, Highest Value, My Tier

**Tier Gating:** All tiers

---

##### **Portfolio Showcase**
**Content:**
- 3-4 featured SISO builds (rotates weekly)
- Each showcase card:
  - Project thumbnail/screenshot
  - Client industry
  - Tech stack used
  - "View Full Portfolio" CTA
- Links to Academy → Portfolio for full gallery

**Tier Gating:** All tiers

---

##### **Training Spotlight**
**Content:**
- Recommended next course based on:
  - Onboarding progress
  - Tier level
  - Recent activity
- Shows course thumbnail, duration, topics covered
- "Start Learning" CTA

**Tier Gating:** All tiers (recommended courses adjust per tier)

---

##### **Leaderboard Preview**
**Content:**
- Top 3 performers this week/month
- Shows:
  - Rank
  - Partner name
  - Deals closed
  - Earnings (optional)
- "View Full Leaderboard" CTA → Growth → Leaderboard

**Tier Gating:** All tiers

---

### **2. 📊 Pipeline**

**Purpose:** Client tracking, deal flow management, lead submission

#### **Subsections:**

##### **My Prospects**
**Content:**
- **Airtable-style View** (default: Kanban board, switchable to Table/List)
- Columns represent deal stages (see dropdown below)
- Each prospect card shows:
  - Company name
  - Industry
  - Contact person
  - Deal stage
  - Date added
  - Notes preview
  - Status indicators from SISO (e.g., "Demo in progress")

- **Filters:**
  - By industry
  - By stage
  - By date range
  - By SISO status (awaiting info, demo ready, etc.)

- **Actions:**
  - Add new prospect (opens Submit Client form)
  - Edit prospect details
  - Move between stages (drag-and-drop)
  - Add notes
  - Archive/delete

**Tier Gating:** All tiers

---

##### **Active Deals**
**Content:**
- Deals currently being worked on by SISO team
- Enhanced view showing:
  - **SISO Status Updates:**
    - "Demo being built - ETA 3 days"
    - "Awaiting client logo/branding"
    - "Proposal sent to client"
    - "Negotiation in progress"
  - **Next Steps Required:**
    - "Share demo with client by [date]"
    - "Follow up on proposal response"
  - **Team Comments:** Messages from SISO team about this deal

- **Commission Tracker:** Expected commission amount per deal

**Tier Gating:** All tiers

---

##### **Submit Client**
**Content:**
- **Form to log new potential client:**
  - Company Name (required)
  - Industry (dropdown: SaaS, E-commerce, Healthcare, Finance, Other)
  - Contact Person Name
  - Contact Email
  - Contact Phone (optional)
  - Company Website (optional)
  - Upload Logo (optional)
  - Client Goals (textarea: "What does the client want to build?")
  - Budget Range (dropdown: <$5k, $5k-$10k, $10k-$25k, $25k-$50k, $50k+, Unknown)
  - Project Timeline (dropdown: ASAP, 1-2 months, 3-6 months, 6+ months)
  - Additional Notes (textarea)

- **CTA:** "Submit to SISO Team"
- **Post-submission:** Confirmation + redirect to My Prospects

**Tier Gating:** All tiers

---

#### **Dropdown: Deal Stages**
- **Prospecting** - Partner hasn't reached out yet (brainstorming phase)
- **Contacted** - Partner made initial contact with client
- **Demo Ready** - SISO built something to show
- **Negotiating** - Deal being closed, terms discussed
- **Won** - Client signed, commission earned
- **Lost** - Deal didn't close (archived)

**Usage:** Partners can manually move prospects between stages

---

### **3. 🎓 Academy**

**Purpose:** Training + sales enablement resources combined

#### **Subsections:**

##### **Getting Started**
**Content:**
- **Onboarding Path (Sequential):**
  1. Welcome to SISO Partnership (video intro)
  2. How SISO Works (process overview)
  3. Understanding Our Services (what we build)
  4. The Partner Commission Structure (tier system explained)
  5. Your First Client Submission (walkthrough)
  6. Pitch Best Practices (objection handling)

- **Progress Tracker:** Visual checklist showing completion
- **Certificate:** "SISO Certified Partner" badge upon completion

**Tier Gating:** All tiers (required for Starter tier)

---

##### **Courses**
**Content:**
- **Course Library (Categories):**
  - Sales Fundamentals
  - Technical Basics (explaining web/app development)
  - Industry Deep Dives (SaaS, E-commerce, etc.)
  - Advanced Closing Techniques (Active+ tier)
  - Enterprise Sales (Performer+ tier)

- **Each Course Shows:**
  - Title, thumbnail, duration
  - Difficulty level
  - Completion status
  - Certificate available (yes/no)
  - Tier requirement (if locked)

- **Course Page:**
  - Video lessons
  - Quiz/assessment
  - Downloadable resources
  - Community discussion

**Tier Gating:**
- Basic courses: All tiers
- Advanced courses: Active+
- Enterprise/coaching: Performer+

---

##### **Portfolio**
**Content:**
- **Gallery of SISO Builds:**
  - Filterable by: Industry, Tech Stack, Project Size
  - Each project card:
    - Screenshots/demo video
    - Client industry (anonymized if needed)
    - Tech stack used
    - Project scope/features
    - Timeline (how long it took)
    - "Use This as Sales Ammo" button (saves to partner's pitch kit)

- **Featured Case Studies:**
  - Deep dives on select projects
  - Problem → Solution → Results format
  - Client testimonial (if available)
  - ROI metrics

**Tier Gating:** All tiers

---

##### **Pitch Kit**
**Content:**
- **Brand Assets:**
  - SISO logo (various formats)
  - Color palette
  - Typography guide
  - Usage guidelines

- **Presentation Templates:**
  - Generic sales deck (PowerPoint/Google Slides)
  - Industry-specific decks (SaaS, E-commerce, etc.) - Active+
  - Proposal templates

- **Sales Scripts:**
  - Cold outreach email templates
  - Phone script outlines
  - Follow-up sequences
  - Objection handling responses

- **Demo Videos:**
  - SISO process explainer (2 min)
  - Past project walkthroughs
  - Client testimonial videos

- **ROI Calculator:**
  - Interactive tool to show client cost savings
  - Customizable inputs

**Tier Gating:**
- Basic assets: All tiers
- Industry-specific decks: Active+
- Custom templates: Performer+

---

##### **Saved Docs**
**Content:**
- Personal bookmark collection
- Partners can save:
  - Favorite courses
  - Key portfolio projects
  - Useful pitch templates
  - Industry resources

- **Organization:**
  - Folders (custom categories)
  - Tags
  - Search

- **Quick Access:** Star icon on any Academy page to save

**Tier Gating:** All tiers

---

#### **Dropdown: Resources by Industry**

**Content Structure (Repeat for Each Industry):**
- **Industry Overview:**
  - Market size/trends
  - Common pain points SISO solves
  - Key decision-makers (who to pitch)

- **Pain Point Playbook:**
  - Problem: "Outdated legacy systems"
  - SISO Solution: "Modern web app rebuild"
  - Pitch Angle: "Save $X/year in maintenance"

- **Case Studies:** Filtered portfolio projects
- **Industry-Specific Assets:** Tailored pitch decks, demos

**Industries:**
- SaaS
- E-commerce
- Healthcare
- Finance
- Real Estate
- Education
- *(Add more as SISO expands)*

**Tier Gating:**
- Industry overview: All tiers
- Detailed playbooks: Active+
- Advanced case studies: Performer+

---

#### **Dropdown: Sales Assets**

Expanded organization of Pitch Kit content:
- **Brand Kit** → Logos, colors, fonts
- **Presentation Templates** → Decks, proposals
- **Demo Videos** → Explainers, walkthroughs
- **Case Studies** → Full project deep-dives
- **Objection Handling Guide** → Common pushbacks + responses

---

### **4. 💰 Growth**

**Purpose:** Earnings tracking + tier progression + gamification

#### **Subsections:**

##### **Earnings**
**Content:**
- **Earnings Dashboard:**
  - Total Earned (lifetime)
  - This Month earnings
  - Pending commissions (deals in progress)
  - Next payout date
  - Chart: Earnings over time (monthly view)

- **Quick Stats:**
  - Average deal size
  - Total deals closed
  - Conversion rate (prospects → won deals)
  - Best month ever

**Tier Gating:** All tiers

---

##### **Tier Progress**
**Content:**
- **Visual Tier Ring/Progress Bar:**
  - Current tier highlighted
  - Deals completed vs deals needed for next tier
  - Animated progression

- **Current Tier Benefits Display:**
  - Commission rate
  - Features unlocked
  - Support level
  - Team override % (if applicable)

- **Next Tier Preview:**
  - "X more deals to unlock:"
  - List of benefits waiting at next tier
  - Teaser of exclusive features

- **All Tiers Comparison Table:**
  - Side-by-side view of Starter → Active → Performer → Elite
  - Commission rates
  - Feature access
  - Support levels

**Tier Gating:** All tiers

---

##### **Leaderboard**
**Content:**
- **Tabs:**
  - This Week
  - This Month
  - This Quarter
  - All Time

- **Ranking Display:**
  - Position
  - Partner name (or anonymous handle)
  - Deals closed
  - Earnings (optional, can hide)
  - Tier badge

- **Filters:**
  - By tier (see only your tier's competition)
  - By region (if geographic expansion)

- **Your Rank Highlighted:** "You're #12 this month!"

**Tier Gating:** All tiers

---

##### **Achievements**
**Content:**
- **Badge Collection:**
  - First Sale
  - Quick Closer (deal in <30 days)
  - Team Builder (referred 3+ partners)
  - Top Performer (top 10 leaderboard)
  - Industry Expert (5+ deals in one industry)
  - Century Club (100 deals lifetime)
  - *(+50 more creative badges)*

- **Each Achievement Shows:**
  - Badge icon/graphic
  - Name + description
  - Date earned (or "locked" if not earned)
  - How to unlock (criteria)
  - Rarity (% of partners who have it)

- **Display Options:**
  - Grid view (all badges)
  - Progress view (close to earning)
  - Showcase (select 3 to display on profile)

**Tier Gating:** All tiers

---

##### **Challenges**
**Content:**
- **Active Challenges:**
  - Weekly: "Submit 5 new prospects"
  - Monthly: "Close 2 deals"
  - Community: "Team goal - 100 deals this month"

- **Each Challenge Shows:**
  - Title + description
  - Progress bar
  - Time remaining
  - Reward (badge, bonus commission %, recognition)
  - Leaderboard (who's winning)

- **Completed Challenges:**
  - Archive of past wins
  - Rewards earned

- **Suggest a Challenge:** Partners can propose new challenges

**Tier Gating:**
- Basic challenges: All tiers
- Advanced challenges: Active+
- Team challenges: Performer+ (can create for their recruits)

---

##### **Team Building**
**Content:**
- **Refer a Partner:**
  - Unique referral link (shareable)
  - Referral tracking (how many signed up via your link)
  - Referral bonuses (5% of their earnings - Active+ tier)

- **My Recruits:**
  - List of partners you referred
  - Their tier status
  - Their deal activity (anonymized or visible based on permission)
  - Your team override earnings (Performer+ tier)

- **Team Leaderboard:** (Performer+ tier)
  - Rank your recruits
  - Team total earnings
  - Best performing recruit

- **Recruitment Resources:**
  - "Join SISO Partnership" landing page template
  - Social media graphics
  - Email templates to invite prospects

**Tier Gating:**
- Refer a Partner: All tiers
- Track Recruits: All tiers
- Team Overrides: Performer+ (earn 10% of recruit's commissions)
- Team Management Tools: Performer+

---

#### **Dropdown: Earnings Details**

##### **Commissions Overview**
- Total pending commissions
- Breakdown by client/deal
- Commission calculation explanation

##### **Transaction History**
- Table of all past payouts
- Columns: Date, Amount, Deal(s) Included, Status (Paid/Pending), Payment Method
- Downloadable as CSV

##### **Wallet & Payout Methods**
- **Stripe Connect Integration:**
  - Link bank account
  - Set payout frequency (weekly, bi-weekly, monthly)
  - Tax information (W-9 for US partners)
  - Payout history

- **Payment Preferences:**
  - Default currency
  - Minimum payout threshold

##### **Tax Documents**
- **1099 Forms (US Partners):**
  - Year-end tax documents
  - Downloadable PDFs
  - Earnings summary for tax filing

- **International Partners:**
  - Earnings reports
  - Tax treaty info (if applicable)

---

#### **Dropdown: Tier Benefits**

##### **Current Tier Perks**
- Detailed list of everything unlocked at current tier
- "How to use this feature" links

##### **Next Tier Requirements**
- Exact number of deals needed
- Timeline estimate ("At current pace, you'll reach Active in 45 days")
- Benefits preview

##### **All Tier Comparison**
- Full table showing Starter vs Active vs Performer vs Elite
- Commission rates, features, support, bonuses

---

### **5. 📅 Calendar**

**Purpose:** Schedule management, booking office hours, event tracking

#### **Subsections:**

##### **My Calendar**
**Content:**
- **Calendar View:**
  - Month/Week/Day views (toggle)
  - Color-coded events:
    - Blue: SISO office hours
    - Green: Webinars/training
    - Purple: Partner events
    - Gray: Personal events (if integration enabled)

- **Event Types Displayed:**
  - Booked office hours with SISO team
  - Upcoming webinars
  - Partner meetups
  - Deal deadlines ("Show demo to Client X by Friday")
  - Task due dates (from Tasks section)

- **Quick Add Event:** Partners can add personal reminders

**Tier Gating:** All tiers

---

##### **Office Hours**
**Content:**
- **Book Time with SISO Team:**
  - Calendar showing SISO team availability
  - Select date/time slot
  - Topic selection dropdown:
    - General Q&A
    - Deal Strategy Session
    - Technical Questions
    - Commission/Tier Questions
    - Other
  - Add notes for context

- **Upcoming Booked Sessions:**
  - Date/time
  - Team member assigned
  - Join link (Zoom/Meet)
  - Reschedule/cancel options

- **Past Sessions:**
  - Meeting notes (from SISO team)
  - Recording (if available)
  - Action items

**Tier Gating:**
- Standard office hours: All tiers (first-come first-serve)
- Priority booking: Active+ (guaranteed slots)
- 1:1 coaching: Performer+ (monthly dedicated sessions)

---

##### **Webinars**
**Content:**
- **Upcoming Webinars:**
  - Title, date, time
  - Topic description
  - Presenter (SISO team member or guest)
  - Register button
  - Add to calendar

- **Categories:**
  - Sales Training
  - Product Updates
  - Industry Insights
  - Success Stories (partner spotlight)

- **Past Webinars:**
  - Recording library
  - Slides/resources download
  - Q&A transcript

**Tier Gating:** All tiers (some exclusive webinars for Active+)

---

##### **Team Events**
**Content:**
- **Partner Meetups:**
  - Virtual hangouts
  - Regional in-person events (if applicable)
  - SISO team socials

- **Elite Council Meetings:** (Elite tier only)
  - Strategic planning sessions
  - Product roadmap input
  - Exclusive networking

**Tier Gating:**
- General events: All tiers
- Elite events: Elite tier only

---

#### **Dropdown: Calendar Views**
- **Month View** - See full month at a glance
- **Week View** - Detailed weekly schedule
- **Day View** - Hour-by-hour agenda

---

### **6. ✅ Tasks**

**Purpose:** Onboarding checklist + personal task management + assigned tasks from SISO

#### **Subsections:**

##### **Onboarding**
**Content:**
- **Checklist for New Partners:**
  - Complete profile setup
  - Watch "Welcome to SISO" video
  - Complete Getting Started training
  - Submit first prospect
  - Book first office hours
  - Join Community chat
  - Set up payout method

- **Progress Indicator:** "3 of 7 tasks complete"
- **Priority:** Displayed at top of Tasks until complete
- **Completion Reward:** Badge unlocked + "Onboarding Complete" celebration

**Tier Gating:** All tiers (disappears once complete)

---

##### **My Tasks**
**Content:**
- **Personal To-Do List:**
  - Partners can create custom tasks
  - Each task:
    - Title
    - Description (optional)
    - Due date (optional)
    - Priority (high/medium/low)
    - Linked client (optional - connects to Pipeline prospect)
    - Checklist sub-items (optional)

- **Actions:**
  - Add task
  - Edit task
  - Mark complete
  - Delete
  - Duplicate

- **Views:**
  - Today (tasks due today)
  - Upcoming (next 7 days)
  - All tasks
  - Completed (archive)

**Tier Gating:** All tiers

---

##### **Assigned Tasks**
**Content:**
- **Tasks from SISO Team:**
  - Examples:
    - "Show demo to Client X by Friday"
    - "Follow up on Prospect Y proposal"
    - "Update Client Z contact info"
    - "Complete Advanced Sales Training"

- **Each Task Shows:**
  - Title + description
  - Who assigned it (SISO team member name)
  - Due date
  - Priority
  - Related deal/client (clickable link)
  - Completion status

- **Notifications:**
  - Push notification when new task assigned
  - Reminder 24 hours before due date

**Tier Gating:** All tiers

---

#### **Dropdown: Task Categories**
- **Today** - All tasks due today
- **This Week** - Next 7 days
- **Overdue** - Missed deadlines (highlighted red)
- **Completed** - Archive of finished tasks

---

### **7. 👥 Community**

**Purpose:** Partner-to-partner connection, social proof, SISO communication

**Note:** Only chat channels use # prefix (Discord-style). Other subsections don't.

#### **Subsections:**

##### **# general-chat**
**Content:**
- Open discussion room for all partners
- Chat features:
  - Real-time messaging
  - Reactions (emoji)
  - Thread replies
  - @mentions
  - Search chat history
  - Pin important messages

- **Typical Topics:**
  - Sales tips
  - Asking for advice
  - Celebrating wins
  - Sharing resources
  - General socializing

**Tier Gating:** All tiers

---

##### **# wins**
**Content:**
- Dedicated channel for celebrating closed deals
- **Post Format:**
  - Partner name
  - "Just closed a [deal size] deal with [industry]!"
  - Optional: Client name (if not confidential)
  - Team congratulations in replies

- **Auto-Posts:**
  - System automatically posts when partner closes deal
  - Partner can add custom message

- **Leaderboard Integration:** "🏆 Top closer this month!"

**Tier Gating:** All tiers (read), Active+ (post)

---

##### **# questions**
**Content:**
- Q&A-focused chat room
- Partners ask, other partners (or SISO team) answer
- **Typical Questions:**
  - "How do I pitch to healthcare clients?"
  - "What's the typical timeline for a SaaS build?"
  - "Anyone have success with cold email?"

- **Features:**
  - Mark answer as "Solved"
  - Upvote helpful responses
  - SISO team members have "Staff" badge

**Tier Gating:** All tiers

---

##### **# feedback**
**Content:**
- Partners submit ideas, feature requests, bug reports
- **Post Format:**
  - Title
  - Description
  - Category (Feature Request, Bug, Improvement)
  - Upvote/downvote

- **SISO Response:**
  - Team responds with status: Under Review, Planned, In Progress, Shipped
  - Updates posted in thread

- **Top Suggestions:** Most upvoted displayed prominently

**Tier Gating:** All tiers

---

##### **Partner Directory**
**Content:**
- **Searchable List of All Partners:**
  - Name
  - Photo (optional)
  - Tier badge
  - Primary industry focus (optional)
  - Location (optional)
  - Bio (optional)
  - "Message" button (opens DM)

- **Filters:**
  - By tier
  - By industry
  - By location

- **Profiles:**
  - Click partner name → view full profile
  - Stats: Deals closed, earnings (if public), tier, achievements
  - Message history (if previously chatted)

**Tier Gating:** All tiers (view), Active+ (full profiles with stats)

---

### **8. 📝 Notes**

**Purpose:** Knowledge management, client tracking, shareable documentation

#### **Subsections:**

##### **My Notes**
**Content:**
- **Private Personal Notes:**
  - Rich text editor (markdown support)
  - Formatting: Bold, italic, headers, lists, links, images
  - Organization:
    - Folders (custom categories)
    - Tags
    - Search
    - Sort by: Date created, modified, alphabetical

- **Note Types:**
  - Quick notes
  - Meeting notes (template available)
  - Sales scripts
  - Industry research
  - Personal reminders

- **Actions:**
  - Create new note
  - Duplicate
  - Move to folder
  - Share (convert to Shared Note)
  - Export (PDF, markdown)
  - Delete

**Tier Gating:** All tiers

---

##### **Shared Notes**
**Content:**
- **Public Notes Visible to All Partners:**
  - Community-contributed knowledge
  - Best practices
  - Template library
  - Industry insights

- **Features:**
  - Upvote helpful notes (Reddit-style)
  - Comment threads
  - Author attribution
  - "Fork" note (copy to your personal notes to edit)

- **Top Shared Notes:**
  - Most viewed
  - Most upvoted
  - Recently added

**Tier Gating:**
- View: All tiers
- Create Shared Notes: Active+
- Pin notes to top: Performer+ (moderator privileges)

---

##### **Client Notes**
**Content:**
- **Notes Attached to Specific Pipeline Prospects:**
  - Meeting summaries
  - Client preferences
  - Technical requirements
  - Follow-up reminders

- **Linked to Pipeline:**
  - Notes tab on each prospect's detail page
  - Auto-timestamps
  - Activity history ("Note added 2 days ago")

- **Share with SISO Team:**
  - Toggle to make note visible to SISO for context
  - SISO can add their own notes (visible to partner)

**Tier Gating:** All tiers

---

#### **Dropdown: Note Types**

**Templates Available:**
- **Quick Notes** - Blank canvas
- **Meeting Notes** - Pre-structured (Attendees, Agenda, Action Items, Next Steps)
- **Sales Scripts** - Call outline format
- **Industry Research** - Market trends, pain points, opportunities

**Usage:** Select template when creating new note for auto-formatting

---

### **9. ⚙️ Settings**

**Purpose:** Account management, preferences, integrations, support

#### **Subsections:**

##### **Profile**
**Content:**
- **Editable Fields:**
  - Profile photo (upload)
  - Display name
  - Email (verified)
  - Phone number (optional)
  - Location (optional)
  - Bio (150 chars, shown in Partner Directory)
  - Primary industry focus (dropdown)
  - Website/LinkedIn (optional)

- **Privacy Settings:**
  - Show earnings on leaderboard (yes/no)
  - Show in Partner Directory (yes/no)
  - Allow other partners to message me (yes/no)

- **Account Stats (Read-Only):**
  - Partner since [date]
  - Current tier
  - Total deals closed
  - Total earnings

**Tier Gating:** All tiers

---

##### **Notifications**
**Content:**
- **Notification Preferences:**
  - Push notifications (mobile)
  - Email notifications
  - In-app notifications

- **Categories (Toggle Each):**
  - Deal updates (demo ready, status changes)
  - Commission payouts (earnings processed)
  - Tier progression (advanced to next tier)
  - Community activity (mentions, replies)
  - Tasks (assigned tasks, due date reminders)
  - Announcements (SISO team broadcasts)
  - Training (new courses available)
  - Calendar (event reminders)

- **Frequency:**
  - Instant
  - Daily digest
  - Weekly digest
  - Off

**Tier Gating:** All tiers

---

##### **Linked Accounts**
**Content:**
- **Integrations:**
  - **Stripe Connect** (for payouts) - required
  - **Notion** - sync notes (optional)
  - **Google Docs** - import/export notes (optional)
  - **Calendar Sync** (Google/Outlook) - sync SISO events to personal calendar

- **Each Integration Shows:**
  - Connected status (green checkmark or "Connect" button)
  - Last synced date
  - Disconnect option
  - Settings (if applicable)

- **API Access (Elite Tier):**
  - Generate API keys
  - Webhook endpoints
  - Rate limits
  - Documentation link

**Tier Gating:**
- Basic integrations: All tiers
- API access: Elite tier only

---

##### **Security**
**Content:**
- **Password Management:**
  - Change password
  - Password strength indicator
  - Last changed date

- **Two-Factor Authentication:**
  - Enable/disable 2FA
  - Setup guide (QR code for authenticator app)
  - Backup codes

- **Active Sessions:**
  - List of logged-in devices
  - Last active date/time
  - Location (IP-based)
  - "Sign out all other devices" option

- **Login History:**
  - Last 30 days of login attempts
  - Flagged suspicious activity

**Tier Gating:** All tiers

---

#### **Dropdown: Support & Help**

##### **Help Center/FAQ**
- Searchable knowledge base
- Categories:
  - Getting Started
  - Commission & Payouts
  - Tier System
  - Technical Support
  - Community Guidelines
- Video tutorials
- Step-by-step guides

##### **Message SISO**
- Opens direct chat with SISO support team
- Typical response time displayed ("Usually within 4 hours")
- Upload screenshots for context
- Thread history saved

##### **Office Hours**
- Link to Calendar → Office Hours
- "Book a call with SISO team"
- Available time slots

**Tier Gating:**
- Help Center: All tiers
- Message SISO: All tiers (response time varies by tier)
- Priority Support: Active+ (4-hour response guarantee)
- Dedicated Account Manager: Performer+ (direct line)

---

## 🔔 Notifications System

**Location:** Bell icon in header (top-right, always visible)

**Behavior:**
- Badge count shows unread notifications
- Tapping opens slide-over panel

**Tabs:**
1. **All** - Combined feed of everything
2. **Updates** - SISO announcements, tier changes, feature unlocks
3. **Deals** - Client status updates, demo ready, deal closed
4. **Chats** - Message notifications from Community or DMs
5. **Tasks** - Assigned tasks, due date reminders

**Each Notification Shows:**
- Icon (type indicator)
- Title
- Preview text
- Time ago (2 hours ago, yesterday, etc.)
- Unread indicator (blue dot)
- Tap to navigate to relevant page

**Actions:**
- Mark all as read
- Clear read notifications
- Notification settings (links to Settings → Notifications)

---

## 🔒 Tier-Gating Rules

### **Feature Access by Tier:**

#### **Starter (0-2 deals) - Commission: 20%**
**Full Access:**
- Home (all subsections)
- Pipeline (basic CRM)
- Academy (Getting Started, basic courses, portfolio)
- Growth (Earnings, Tier Progress, Achievements)
- Calendar (view only, book standard office hours)
- Tasks (all subsections)
- Community (# general-chat, # questions)
- Notes (My Notes, Client Notes)
- Settings (all)

**Locked (Visible but Disabled with "Unlock at Active" Tooltip):**
- Academy → Industry-specific resources
- Academy → Advanced courses
- Growth → Leaderboard (teaser visible on Home)
- Growth → Challenges
- Growth → Team Building (refer, but no overrides)
- Community → # wins (read-only)
- Community → Partner Directory (limited profiles)
- Notes → Shared Notes (read-only)

---

#### **Active (3-9 deals) - Commission: 22%**
**Newly Unlocked:**
- Growth → Leaderboard (full access)
- Growth → Challenges
- Academy → Industry deep-dives
- Academy → Advanced courses
- Academy → ROI calculator
- Community → # wins (can post)
- Community → Partner Directory (full profiles)
- Notes → Shared Notes (create + edit)
- Calendar → Priority office hours booking

**Still Locked:**
- Academy → White-label materials (Performer+)
- Growth → Team Building overrides (Performer+)
- Calendar → 1:1 coaching sessions (Performer+)
- Settings → API access (Elite)

---

#### **Performer (10-24 deals) - Commission: 25% + 10% team overrides**
**Newly Unlocked:**
- Growth → Team Building (full management + 10% overrides)
- Academy → White-label materials
- Academy → Custom proposal templates
- Academy → Enterprise sales training
- Calendar → Monthly 1:1 coaching
- Community → Moderator privileges (pin notes, featured posts)

**Still Locked:**
- Settings → API access (Elite)
- Community → Elite Council events (Elite)

---

#### **Elite (25+ deals) - Commission: 30% + 10% overrides + custom deals**
**Newly Unlocked:**
- Everything
- Settings → API access + webhooks
- Calendar → Elite Council meetings
- Growth → Custom deal structures (negotiate with SISO)
- Academy → Master trainer certification
- Community → Advisory board participation

---

## 📐 Technical Implementation Notes

### **Navigation Component Structure:**

```typescript
// Recommended data structure

interface NavIcon {
  id: string;
  label: string;
  icon: React.ComponentType;
  subsections: NavSubsection[];
}

interface NavSubsection {
  id: string;
  label: string;
  path: string;
  tierRequired: 'starter' | 'active' | 'performer' | 'elite';
  hasHashtag: boolean; // true for chat channels only
  dropdown?: NavDropdown;
}

interface NavDropdown {
  label: string;
  items: NavDropdownItem[];
}

interface NavDropdownItem {
  id: string;
  label: string;
  path?: string;
  description?: string;
}
```

### **Tier-Gating Logic:**

```typescript
// Pseudo-code for tier checks

function canAccessFeature(
  featureTierRequired: Tier,
  userCurrentTier: Tier
): boolean {
  const tierHierarchy = ['starter', 'active', 'performer', 'elite'];
  const userTierIndex = tierHierarchy.indexOf(userCurrentTier);
  const requiredTierIndex = tierHierarchy.indexOf(featureTierRequired);

  return userTierIndex >= requiredTierIndex;
}

// Usage in nav rendering:
if (!canAccessFeature(subsection.tierRequired, user.tier)) {
  // Show locked state with tooltip
  return <LockedNavItem
    label={subsection.label}
    unlockTier={subsection.tierRequired}
    dealsNeeded={calculateDealsNeeded(user.tier, subsection.tierRequired)}
  />;
}
```

### **Mobile Considerations:**

- Icon rail should be sticky (always visible while scrolling)
- Detail panel slides in from left when icon tapped
- Swipe right to close detail panel
- Bottom padding for iOS safe area
- Haptic feedback on icon tap
- Smooth animations (300ms transition)

### **State Management:**

- Active icon stored in URL state (`/partners?nav=academy`)
- Expanded dropdowns stored in local state
- User tier fetched from auth context
- Notification count real-time via WebSocket

---

## 📊 Success Metrics

**Track These Analytics:**

1. **Navigation Usage:**
   - Most-visited icons/subsections
   - Least-used features (candidates for removal)
   - Time spent per section
   - Drop-off points (where users exit app)

2. **Tier Progression:**
   - Average time to reach each tier
   - Feature unlock impact on activity
   - Retention by tier

3. **Engagement:**
   - Daily active users
   - Community chat activity
   - Task completion rates
   - Notes created per user

4. **Business Impact:**
   - Clients submitted per week
   - Conversion rate (submitted → closed)
   - Revenue per partner by tier
   - Referral network growth

---

## 🚀 Implementation Phases

### **Phase 1: Core MVP (Weeks 1-4)**
- Icons: Home, Pipeline, Academy (basic), Growth (earnings only), Tasks, Settings
- Subsections: Essential pages only, no dropdowns
- Features: Client submission, basic tracking, onboarding checklist
- Goal: Partners can submit clients and track earnings

### **Phase 2: Community + Gamification (Weeks 5-8)**
- Icons: Add Community, Notes
- Growth enhancements: Leaderboard, achievements, tier progress
- Academy expansion: Portfolio, pitch kit
- Goal: Social features live, partners feel connected

### **Phase 3: Advanced Features (Weeks 9-12)**
- Icon: Add Calendar
- Growth: Team building, challenges
- Academy: Industry resources, advanced training
- Notes: Shared notes, rich editor
- Goal: Active+ tier features functional

### **Phase 4: Elite Tier + Polish (Weeks 13-16)**
- Elite tier features (API access, coaching, etc.)
- Performer tier team management tools
- White-label materials
- Calendar integration (Google/Outlook)
- Goal: Full feature parity with design spec

---

## 📝 Content Requirements

**Content Team Must Create:**

1. **Training Content:**
   - 10+ courses (Getting Started, Sales, Industry deep-dives)
   - Video scripts + production
   - Quiz questions per module
   - Certification criteria

2. **Portfolio:**
   - 20+ case studies (anonymized client projects)
   - Screenshots, demo videos
   - Industry categorization
   - ROI metrics per project

3. **Sales Assets:**
   - Brand kit (logos, colors, fonts)
   - 5+ presentation templates
   - Email scripts (cold outreach, follow-ups)
   - Objection handling guide
   - Industry-specific pitch decks (5+ industries)

4. **Help Center:**
   - 50+ FAQ articles
   - Video tutorials (screen recordings)
   - Troubleshooting guides

5. **Announcements:**
   - Launch announcement
   - Weekly updates template
   - Tier advancement celebration copy

---

## 🎨 Design System Notes

**Visual Language:**
- **Locked State:** Desaturated gray + 🔒 icon
- **New Badge:** Orange "NEW" badge for 7 days post-unlock
- **Tier Colors:**
  - Starter: Gray/Silver
  - Active: Blue
  - Performer: Purple
  - Elite: Gold
- **Progress Indicators:** Ring/circular progress for tier advancement
- **Notifications:** Blue dot for unread, red for urgent
- **Hashtag Channels:** Use # prefix + monospace font for Discord vibes

**Component Patterns:**
- Icon rail: 64px wide, always visible
- Detail panel: 320px wide on mobile (88% screen width)
- Subsection cards: Rounded corners, subtle shadow
- Dropdown arrows: Rotate 180° when expanded
- Empty states: Friendly illustrations + helpful CTAs

---

## ✅ Pre-Launch Checklist

**Before Going Live:**

- [ ] All 9 icons functional with subsections
- [ ] Tier-gating logic tested (all 4 tiers)
- [ ] Notifications system live (real-time)
- [ ] Stripe Connect integration complete
- [ ] Client submission form validates properly
- [ ] Portfolio populated (20+ projects)
- [ ] Training courses complete (Getting Started minimum)
- [ ] Help Center/FAQ live
- [ ] Mobile responsive (tested on iOS + Android)
- [ ] Performance: <2s load time
- [ ] Security audit passed
- [ ] Partner beta test (5 users, 2 weeks)

---

## 📞 Support & Maintenance

**Post-Launch Monitoring:**
- Daily: Notification system uptime, chat functionality
- Weekly: User activity metrics, feature adoption rates
- Monthly: Content updates (new courses, portfolio additions)
- Quarterly: Tier system adjustments based on partner feedback

**Escalation Path:**
- Bug reports → # feedback channel → SISO dev team
- Feature requests → Vote in # feedback → Product roadmap
- Critical issues → Message SISO (priority support for Active+)

---

**End of Specification Document**

*Version 1.0 | November 10, 2025*
*Ready for Development Handoff*
