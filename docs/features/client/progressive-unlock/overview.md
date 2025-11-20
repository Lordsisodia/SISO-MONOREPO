# Progressive Unlock System - Client Base Dashboard

## 🎯 Overview

The Progressive Unlock System is a **try-before-you-commit** onboarding flow that guides clients through building their app step-by-step. Users can **preview the entire dashboard** before logging in, but must authenticate before entering any data.

---

## 🔐 Authentication Strategy

### Preview Mode (Unauthenticated)
- Users land directly on the **dashboard**
- Can **see all 9 steps** and explore the interface
- UI shows "serious shit" - professional, complete dashboard
- **Cannot interact** or input data without logging in
- Any interaction attempt → **login prompt**

### One-Click Login
- **Google OAuth via Supabase** (primary)
- Email/password option (secondary, less encouraged)
- After login: **progress is saved** and all features unlock
- No multi-step onboarding forms before dashboard access

**Goal:** Reduce drop-off by letting users see value before asking for commitment

---

## 📊 Dashboard Architecture

### Core Structure
```
Dashboard (Shell/Layout)
├── Side Navigation (always visible)
│   ├── Project Switcher (top)
│   │   └── Select from multiple client projects
│   ├── 9 Progressive Steps (main nav)
│   └── Persistent Features (bottom)
│       ├── Communication (AI chat)
│       ├── Documents
│       ├── Tasks
│       └── Profile
│
└── Main Content Area
    └── Active Step Content
```

### Multi-Project Support
- Clients can have **multiple projects** being built simultaneously
- **Project switcher** at top of side nav
- Each project has its own:
  - 9-step progression state
  - Documents
  - Tasks
  - Timeline
  - Team assignments

---

## 🔢 The 9 Progressive Unlock Steps

### Step 1: Onboarding Info – 2‑Minute Quick Setup
**Unlocks:** Step 2 (Vision & Assets)  
**Requirements:** None (entry point)  
**Purpose:** Capture core intent through the voice-led onboarding plus essential form fields.

**Key Information Collected:**
- Project elevator pitch (via voice transcript)
- Must‑have features and integrations
- Ideal launch window and urgency
- Primary contact details and collaboration preferences
- Optional competitor URLs for context

**UI Pattern:** Conversational / voice interface with inline structured form enrichment

---

### Step 2: Vision & Assets – Moodboard + Brand Upload
**Unlocks:** Step 3 (App Plan & PDR)  
**Requirements:** Step 1 ≥80% complete  
**Purpose:** Translate brand identity and taste into structured design guidance.

**Key Activities:**
- Swipeable inspiration gallery (minimum five selections)
- Interactive colour picker with palette recommendations
- Logo / brand-guideline uploads (drag-and-drop)
- Tone-of-voice inputs and headline copy prompts

**Completion Criteria:** Required assets uploaded and palette locked.

---

### Step 3: App Plan & 46-Step PDR Review
**Unlocks:** Steps 4, 5, 6 (parallel unlock)  
**Requirements:** Step 2 completed  
**Purpose:** Present the AI-generated scope, pricing, and the full 46-step roadmap for sign-off.

**Key Features:**
- Generated app plan document with feature breakdown
- Embedded 46-step PDR timeline preview
- Cost estimates and billing schedule outline
- Change-request loop with comment history
- Approval / deposit CTA (triggers downstream unlocks)

**Critical:** This is the **gateway step**—approval flips on the execution experiences.

---

### Step 4: Timeline & Live Preview
**Unlocks:** N/A (parallel with 5 & 6)  
**Requirements:** Step 3 approved  
**Purpose:** Track milestone progress while watching the live landing/app mock evolve.

**Key Features:**
- 46-step PDR milestone tracker with status chips
- Delivery ETA projections and blockers
- Embedded live preview reflecting current brand/theme
- Task swimlanes tied to each milestone

**UI Pattern:** Split layout—timeline rail plus responsive preview pane

---

### Step 5: Agent & Cost Tracking
**Unlocks:** N/A (parallel with 4 & 6)  
**Requirements:** Step 3 approved  
**Purpose:** Provide transparency into who (and what) is working plus projected spend.

**Key Features:**
- Live agent activity feed with specialisation tags
- Token / inference cost tracking vs budget
- Milestone-based billing progress
- Alerts for scope creep or bottlenecks

**UI Pattern:** Real-time activity cards paired with KPI mini-dashboards

---

### Step 6: PDR Docs Hub
**Unlocks:** N/A (parallel with 4 & 5)  
**Requirements:** Step 3 approved (billing profile captured)  
**Purpose:** Centralise every generated deliverable, research artefact, and living document.

**Key Features:**
- Auto-populated folders organised by PDR phase
- Version history and side-by-side diffing
- Client uploads (logos, legal docs, content) with tagging
- Export/share options (PDF, Notion sync, ZIP bundles)

**UI Pattern:** Document library with filters, previews, and status badges

---

### Step 7: Live Build Stream
**Unlocks:** Step 8 (Quality & Approvals)  
**Requirements:** Development phase flagged as active  
**Purpose:** Give clients a real-time window into AI coding, deployments, and velocity.

**Key Features:**
- Live agent workstream with commit feed
- Deployment pipeline status and logs
- Interactive preview links per environment
- Build metrics (velocity, test pass rate, token burn)

**UI Pattern:** Multi-panel live dashboard combining activity feeds, metrics, and previews

---

### Step 8: Quality & Approvals
**Unlocks:** Step 9 (Launch & Growth)  
**Requirements:** Step 7 marked complete  
**Purpose:** Streamline QA sign-off without overwhelming clients with raw engineering detail.

**Key Features:**
- Aggregated automated test results and trend lines
- Lightweight bug triage board with business impact labelling
- Acceptance checklist and sign-off controls
- Performance benchmarking snapshots

**UI Pattern:** QA summary dashboard blended with approval task list

---

### Step 9: Launch & Growth
**Unlocks:** N/A (final step)  
**Requirements:** Step 8 QA sign-off  
**Purpose:** Coordinate go-live and immediately transition into growth/maintenance planning.

**Key Features:**
- Launch readiness checklist with owner assignments
- Deployment status and rollback plan visibility
- Post-launch monitoring widgets (analytics, uptime, feedback)
- Suggested next-phase services and success metrics
- Client testimonial / referral prompts

**UI Pattern:** Celebration-focused dashboard with status indicators and follow-up actions

---

## 🔄 Unlock Flow Diagram

```
Entry (Preview Mode)
    ↓
Login (Google OAuth)
    ↓
Step 1: Onboarding (business info)
    ↓ (80% complete)
Step 2: Vision & Assets (moodboard + brand uploads)
    ↓ (design complete)
Step 3: App Plan & PDR (APPROVAL REQUIRED)
    ↓
┌───┴─────┬─────────┐
│         │         │
Step 4    Step 5    Step 6
Timeline  Agents    Docs Hub
(parallel unlock)
    ↓
Step 7: Live Build
    ↓ (dev complete)
Step 8: Quality & Approvals
    ↓ (sign-off complete)
Step 9: Launch & Growth
```

---

## 🌐 Persistent Features (Accessible Throughout)

### Communication Domain
**Location:** Persistent chat widget + dedicated page  
**Access:** Throughout entire dashboard

**Features:**
- **AI Chatbot** (context-aware of current step)
- Support ticket system (via chat)
- CEO escalation (AI → human handoff)
- Step-specific help (contextual guidance)
- Real-time messaging

**Context Awareness:**
- Step 1: Help with business info questions
- Step 2: Design inspiration suggestions
- Step 3: App plan clarifications
- Step 4+: Progress updates and questions

---

### Documents Domain
**Location:** Side nav + dedicated page  
**Access:** Throughout entire dashboard

**Document Types:**

**Generated Documents (Per Step):**
- Step 1: Business requirements doc
- Step 2: Design brief
- Step 3: App plan PDF
- Step 4: Project timeline document
- Step 5: Agent activity reports & spend snapshots
- Step 6: PDR phase deliverables (briefs, research, designs)
- Step 7: Build logs and deployment summaries
- Step 8: QA reports and approval records
- Step 9: Launch packs, success playbooks, maintenance docs

**Client-Uploaded Documents:**
- Logo files
- Brand guidelines
- Content (text, images)
- Legal documents
- Custom requirements

**Features:**
- Document library view (all docs in one place)
- Upload/download
- Version history
- Organization by step or category
- Search and filter

---

### Tasks Domain
**Location:** Side nav + dedicated page  
**Access:** Throughout entire dashboard

**Features:**
- Task lists (tied to timeline steps)
- Client action items
- Status tracking (todo/in-progress/done)
- Due dates
- Priority levels
- Notifications for new tasks

**Task Sources:**
- AI-generated tasks (from requirements)
- Timeline milestone tasks
- Manual tasks from CEO/team
- Client-created tasks

**Integration:**
- Tasks appear in **Step 4 (Timeline)** within their milestone
- Separate **Tasks page** shows all tasks across all steps

---

### Profile Domain
**Location:** Side nav + dedicated page  
**Access:** Throughout entire dashboard

**Features:**
- User settings
- Account information
- Notification preferences
- **Edit previous steps** (after completion)
- Project history
- API keys (if applicable)

---

## 🎨 UI/UX Patterns

### Preview Mode (Unauthenticated)
- Dashboard visible but **semi-transparent overlay** on steps
- "Login to continue" button on any interaction
- Preview shows **realistic data** (not lorem ipsum)
- Steps show **what they'll get** when they log in

### Locked Steps
- **Greyed out** with lock icon
- Shows unlock criteria on hover
- "Complete Step X to unlock" message

### Unlocked Steps
- **Full color** with checkmark or progress indicator
- Clickable and interactive
- Show completion percentage

### Current Step
- **Highlighted** (border or background color)
- Expanded in navigation
- Main content area shows step content

### Completed Steps
- **Checkmark** icon
- Can be revisited and edited via Profile
- Historical data preserved

---

## 🔧 Technical Considerations

### State Management
```typescript
interface DashboardState {
  user: User | null // null = preview mode
  currentProject: Project
  projects: Project[]
  
  stepProgress: {
    1: StepProgress // onboarding
    2: StepProgress // moodboard
    3: StepProgress // app-plan
    4: StepProgress // timeline
    5: StepProgress // agent-teams
    6: StepProgress // payments
    7: StepProgress // development
    8: StepProgress // testing
    9: StepProgress // launch
  }
  
  unlockedSteps: number[] // [1, 2, 3, ...]
  currentStep: number
}

interface StepProgress {
  unlocked: boolean
  completed: boolean
  percentComplete: number
  lastUpdated: Date
  data: Record<string, any>
}
```

### Authentication Flow
```typescript
// Preview mode → Login → Restore state
const authFlow = {
  preview: () => {
    // Show dashboard with all steps visible
    // Block interactions → prompt login
  },
  login: async () => {
    // Google OAuth via Supabase
    // Create user account
    // Initialize dashboard state
  },
  restore: () => {
    // Load user's project(s)
    // Restore step progress
    // Resume from last active step
  }
}
```

### Unlock Logic
```typescript
const canUnlockStep = (stepNumber: number, state: DashboardState): boolean => {
  // Step 1 always unlocked (after login)
  if (stepNumber === 1) return true
  
  // Linear unlocks
  if (stepNumber === 2) return state.stepProgress[1].completed
  if (stepNumber === 3) return state.stepProgress[2].completed
  
  // Parallel unlock (4, 5, 6 after 3 approval)
  if ([4, 5, 6].includes(stepNumber)) {
    return state.stepProgress[3].completed && 
           state.stepProgress[3].data.approved === true
  }
  
  // Resume linear
  if (stepNumber === 8) return state.stepProgress[7].completed
  if (stepNumber === 9) return state.stepProgress[8].completed
  
  return false
}
```

---

## 📱 Responsive Considerations

### Mobile Layout
- **Hamburger menu** for side nav
- Steps shown as **collapsible accordion**
- Persistent features in **bottom nav**
- Communication as **floating chat bubble**

### Tablet Layout
- **Collapsed side nav** (icons only)
- Expand on hover/click
- Main content full width

### Desktop Layout
- **Full side nav** always visible
- Persistent features at bottom of side nav
- Wide content area for step details

---

## 🚀 Future Enhancements

### Gamification
- **Leaderboards** showing other client apps
- Progress badges
- Completion rewards

### Referral System
- Earn credits for referring other clients
- Track referral pipeline
- Partnership program integration

### Advanced Features (Later)
- **Multiple team members** per project
- Role-based permissions
- White-label dashboard for agencies
- API access for integrations

---

## 📋 Implementation Checklist

### Phase 1: Core Dashboard Structure
- [ ] Dashboard shell/layout component
- [ ] Side navigation with 9 steps
- [ ] Project switcher (multi-project support)
- [ ] Preview mode (unauthenticated view)
- [ ] Google OAuth integration (Supabase)
- [ ] Step unlock logic
- [ ] Progress tracking state management

### Phase 2: 9 Steps Implementation
- [ ] Step 1: Onboarding Info (voice-led quick setup)
- [ ] Step 2: Vision & Assets (moodboard + brand uploads)
- [ ] Step 3: App Plan & PDR (approval workflow)
- [ ] Step 4: Timeline & Live Preview (46-step tracking + preview)
- [ ] Step 5: Agent & Cost Tracking (activity dashboard)
- [ ] Step 6: PDR Docs Hub (living deliverables library)
- [ ] Step 7: Live Build (real-time build status)
- [ ] Step 8: Quality & Approvals (QA dashboard)
- [ ] Step 9: Launch & Growth (go-live checklist)

### Phase 3: Persistent Features
- [ ] Communication domain (AI chatbot)
- [ ] Documents domain (upload/download)
- [ ] Tasks domain (action items)
- [ ] Profile domain (settings)

### Phase 4: Polish & Integration
- [ ] Mobile responsive design
- [ ] Real-time updates (WebSockets)
- [ ] Notifications system
- [ ] Help center integration
- [ ] Analytics tracking

---

**Document Version:** 1.1  
**Last Updated:** 2025-11-03  
**Status:** Planning Phase  
**Next Action:** Generate missing domains and begin implementation
