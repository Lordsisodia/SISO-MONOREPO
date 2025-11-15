# Client Dashboard - Progressive Unlock System

## Overview

The Client Dashboard implements a **progressive unlock workflow** that guides clients through a structured app development process. Each step must be completed before subsequent steps become accessible.

## Step Numbering System

Steps are numbered using a two-digit prefix (01-, 02-, etc.) to maintain clear ordering and tracking:

```
dashboard/
├── 01-onboarding/          # Step 1 – Onboarding Info (voice-led quick setup + core form)
├── 02-moodboard/           # Step 2 – Vision & Assets (moodboard, logo, brand colours)
├── 03-app-plan/            # Step 3 – App Plan & PDR (scope approval + 46-step preview)
├── 04-timeline/            # Step 4 – Timeline & Live Preview (milestones alongside live mock)
├── 05-agent-teams/         # Step 5 – Agent & Cost Tracking (agent activity, token/billing insight)
├── 06-payments/            # Step 6 – PDR Docs Hub (living deliverables library)
├── 07-development/         # Step 7 – Live Build (real-time build stream)
├── 08-testing/             # Step 8 – Quality & Approvals (testing + acceptance checklists)
└── 09-launch/              # Step 9 – Launch & Growth (go-live and post-launch playbook)
```

## Progressive Unlock Flow

### Linear Unlock Chain
```
Step 1 (Onboarding Info) 
    ↓ unlocks
Step 2 (Vision & Assets)
    ↓ unlocks
Step 3 (App Plan & PDR - requires approval)
    ↓ unlocks (parallel)
    ├─→ Step 4 (Timeline & Live Preview)
    ├─→ Step 5 (Agent & Cost Tracking)
    └─→ Step 6 (PDR Docs Hub)
    
Step 7 (Live Build - starts after development flag)
    ↓ unlocks
Step 8 (Quality & Approvals)
    ↓ unlocks
Step 9 (Launch & Growth)
```

### Unlock Dependencies

| Step | Client-Facing Label | Internal Folder | Requires | Unlocks |
|------|---------------------|-----------------|----------|---------|
| 01 | Onboarding Info | 01-onboarding | None (entry point) | 02 |
| 02 | Vision & Assets | 02-moodboard | Step 1 ≥80% complete (voice + asset upload) | 03 |
| 03 | App Plan & PDR | 03-app-plan | Step 2 complete (design selections locked) | 04, 05, 06 (parallel) |
| 04 | Timeline & Live Preview | 04-timeline | Step 3 approved | N/A (parallel with 05, 06) |
| 05 | Agent & Cost Tracking | 05-agent-teams | Step 3 approved | N/A (parallel with 04, 06) |
| 06 | PDR Docs Hub | 06-payments | Step 3 approved (initial billing configured) | N/A (parallel with 04, 05) |
| 07 | Live Build | 07-development | Development phase flagged as active | 08 |
| 08 | Quality & Approvals | 08-testing | Step 7 development marked complete | 09 |
| 09 | Launch & Growth | 09-launch | Step 8 QA sign-off | N/A (final step) |

## Parallel Unlock Pattern

After **Step 3 (App Plan & PDR)** is approved, three steps unlock simultaneously:
- **Step 4 (Timeline & Live Preview)**: Shows 46-step PDR progress alongside the evolving preview
- **Step 5 (Agent & Cost Tracking)**: Displays active agents, token usage and projected spend
- **Step 6 (PDR Docs Hub)**: Exposes the running library of generated briefs, research and deliverables

These run in parallel and can be accessed independently once unlocked.

## Domain Structure

Each numbered step follows the standard domain structure:

```
01-onboarding/
├── components/         # Step-specific UI components
├── sections/          # Larger composite sections
├── hooks/             # React hooks for step logic
├── server/            # Server actions and data fetching
├── types/             # TypeScript type definitions
├── utils/             # Helper functions
├── pages/             # Page components
└── index.ts           # Public exports
```

## Implementation Guidelines

### 1. Step Completion Tracking
```typescript
interface StepCompletion {
  stepNumber: number
  completed: boolean
  percentComplete: number
  unlocks: number[]
  requiredData?: Record<string, any>
}
```

### 2. Unlock Logic
```typescript
const canAccessStep = (stepNumber: number, completedSteps: StepCompletion[]) => {
  // Check if previous required step is completed
  // Handle special cases (parallel unlocks after step 3)
  // Return boolean
}
```

### 3. UI States
- **Locked**: Step not yet accessible (greyed out)
- **Current**: Active step user is working on
- **Completed**: Step finished, can be edited via profile
- **Available**: Unlocked but not yet started

## Profile Access

The **Profile** domain (separate from numbered steps) provides:
- Access to all completed step data
- Ability to edit previously completed information
- Historical view of the entire journey
- Settings and preferences management

Profile is accessible throughout the entire dashboard, not part of the progressive unlock sequence.

## Integration with Routes

Steps map to Next.js routes:
```
/dashboard/onboarding      → 01-onboarding (Onboarding Info)
/dashboard/moodboard       → 02-moodboard (Vision & Assets)
/dashboard/app-plan        → 03-app-plan (App Plan & PDR)
/dashboard/timeline        → 04-timeline (Timeline & Live Preview)
/dashboard/agent-teams     → 05-agent-teams (Agent & Cost Tracking)
/dashboard/docs            → 06-payments (PDR Docs Hub)
/dashboard/live-build      → 07-development (Live Build)
/dashboard/quality         → 08-testing (Quality & Approvals)
/dashboard/launch          → 09-launch (Launch & Growth)
/dashboard/profile         → profile (always accessible)
```

## Key Features

### Chat/Voice Interface
Steps 1-3 utilize an interactive chat/voice interface for:
- Rapid information gathering and intent capture (Step 1)
- Design preference discovery with live feedback (Step 2)
- Plan presentation and approval dialogue (Step 3)

### Real-time Updates
Steps 4-9 provide live updates on:
- PDR milestone progress and preview changes (Step 4)
- AI agent activity and projected spend (Step 5)
- Deliverable generation status (Step 6)
- Build stream and deployment artefacts (Step 7)
- QA progress and acceptance tasks (Step 8)
- Launch readiness and post-launch metrics (Step 9)

### 46-Step PDR Timeline
Step 3 surfaces the full 46-step Project Development Report during plan review, while Step 4 mirrors the same data as milestones complete:
- Planning phases
- Design iterations
- Development milestones
- Testing checkpoints
- Launch preparation

## Best Practices

1. **Maintain Step Independence**: Each step should be self-contained with its own components, hooks, and types
2. **Document Dependencies**: Always document @requires and @unlocks in index.ts
3. **Handle Edge Cases**: Consider what happens if user navigates directly to locked step
4. **Preserve State**: Save step progress even if user navigates away
5. **Allow Editing**: Via Profile, users can update completed step data
6. **Provide Feedback**: Clear visual indicators for locked/unlocked/completed states

## Future Enhancements

- **Step 10+**: Additional phases can be added following the numbering pattern
- **Branching Paths**: Conditional steps based on project type
- **Skip Options**: Allow advanced users to skip certain steps
- **Templates**: Pre-filled step data for common project types

---

*Dashboard Progressive Unlock System v1.0*
*Last Updated: 2025-11-01*
