# SISO Agency Client-Side App Vision & Specifications

## Overview
Simplified client onboarding app with mood board functionality for design preferences.

## Core Flow

### 1. Landing & Signup
- **Industry-Specific Landing Pages** for better conversion:
  - Restaurants
  - Bars
  - Agencies
  - Car Rental
  - Barbershops
  - (More industries to be added)
- Direct flow: Landing → Sign up/Sign in → Dashboard
- Mobile-first design (PWA for iPhone home screen)

### 2. Client Dashboard 
**Route:** `/client/home`
- Show "Getting Started" tasks immediately
- Reuse existing UI elements but simplify for client understanding
- Progressive feature unlock based on task completion
- Mobile-optimized

### 3. Onboarding Process (First Task)
**Two Options:**
a) **Chat Onboarding** 
b) **Phone Call Onboarding** (2-minute voice)

**Data Collection:**
- Company name
- Company logo
- What the company does
- Social media links
- Existing website (if any)
- Business goals
- Progress indicator (% of data collected)
- Can pause/resume anytime

### 4. Mood Board Feature (Unlocked after Onboarding)
**Purpose:** Collect design preferences
- Nav notification when unlocked
- Select/swipe images
- Upload own images
- Industry-specific templates
- Personalized based on business type

### 5. App Plan Page (After Mood Board)
- Simplified one-page version (current version too complex)
- Keep existing UI elements
- Show features based on requirements
- Features they want vs what we offer
- Feedback mechanism
- Accept/Start button to proceed

### 6. Timeline Page (After Plan Accepted)
- Shows all 46 PDR steps
- Live updates on progress
- Real-time status for each step
- Estimated time to completion
- Visual progress indicators

### 7. Unlocked Pages After Timeline

**Agent Teams Page:**
- Show all agents working on project
- Time spent per agent
- Tokens used
- Activity logs

**Financial/Payments Page:**
- Total expenses
- Payment processing
- Invoice details
- Cost breakdown

### 8. Always Available Pages

**Portfolio:**
- Available from start
- Show other apps we've built
- Industry-specific examples

**Help:**
- Always accessible
- Support resources
- FAQ

**Feature Hub:**
- Community feature suggestion platform
- Clients can submit new feature ideas
- Vote up/down on existing suggestions
- Add specs and requirements to suggestions
- Real-time status updates:
  - Suggested
  - In Review
  - In Development
  - Integrated
- Filter by:
  - Most voted
  - Recently added
  - By status
  - By industry
- Show which features have been integrated
- Timeline of feature implementations

## Navigation Structure
```
/client/
  ├── home (dashboard)
  ├── onboarding
  ├── mood-board (locked initially)
  ├── app-plan (locked initially)
  ├── timeline (locked initially)
  ├── agent-teams (locked initially)
  ├── payments (locked initially)
  ├── portfolio (always available)
  ├── feature-hub (always available)
  └── help (always available)
```

## Progressive Unlock Flow
1. **Start:** Dashboard with tasks
2. **Complete Onboarding:** Unlocks Mood Board
3. **Complete Mood Board:** Unlocks App Plan
4. **Accept App Plan:** Unlocks Timeline, Agent Teams, Payments

## Key Features Summary
1. Industry-specific landing pages
2. Clear client routing (/client/*)
3. Progressive task-based unlocking
4. 46-step PDR timeline tracking
5. Transparent agent work visibility
6. Simplified but comprehensive flow

## Technical Notes
- PWA for mobile
- Supabase for data
- Notion MCP for documentation
- Reuse existing UI components
- Simplify complexity for clients
- Clear navigation and progress

## Data Flow
Industry Landing → Signup → Client Dashboard → Onboarding → Mood Board → App Plan → Timeline/PDR Tracking → Project Development → Testing → Launch