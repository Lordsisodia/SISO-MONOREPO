# Page Template: Workspace Files

**Use this template for detailed analysis and planning of individual pages**

## Page Metadata
- **Page Name**: Workspace Files (Hub)
- **Route**: `/partners/workspace/files`
- **File**: `src/app/partners/workspace/files/page.tsx`
- **Section**: Workspace
- **Status**: planning
- **Priority**: release-critical

## Simple Questions (AI asks you these)
*Provide quick, intuitive answers - AI handles all the complexity*

1. **What should this page do?** (One sentence goal)
2. **Who uses it?** (Just describe the user)
3. **What's working now?** (What parts are actually done)
4. **What's broken/missing?** (Quick list of problems)
5. **What data should show here?** (Just describe in plain English)
6. **Who needs to approve this?** (Legal, subject experts, etc.)

## AI Analysis (AI fills this automatically)

### Current State Assessment
- **Component Analysis**: `WorkspaceFilesContent` renders hero, three segment cards (My/Client/Shared), storage stats, recent activity—all static.
- **Content Audit**: Storage numbers, activity items, segment badges/descriptions are mocked; permissions copy not validated.
- **Performance Review**: Static page; future load depends on file lists/activity feed.
- **Accessibility Check**: Need ARIA/labels for cards/buttons once dynamic.

### Technical Requirements
- **Data Needs**: File metadata (name, type, size, owner, client, last updated, access level, expiry), quotas, recent activity, shared link status.
- **Component Specifications**: Segment cards with counts, storage health, activity feed, CTAs to subpages (my/client/shared).
- **Integration Points**: Storage backend (S3/GDrive/etc.), permissions/ACL service, audit/activity stream, download/share endpoints.
- **State Management**: Server fetch for stats/activity; client actions for uploads/link creation.

## Page Overview
- **Page Goal**: Centralize file access with clear permissions, quotas, and quick links to scoped views.
- **Persona & Story**: Partner needs the latest deck/contract, sees storage health, and can jump to relevant scope.
- **Success Metrics**: File opens/downloads, link creation, upload success, zero permission confusion reports.

## Component Structure

### Component Map
*AI fills current state from code analysis, you provide target state*

| Component | Current State (AI) | Target State (You) | Suggested CTA (AI) | Owner (AI) |
|-----------|-------------------|-------------------|-------------------|------------|
| Hero card | Static “3 spaces unified” | | Upload / Create folder | |
| Segment cards (My/Client/Shared) | Static copy + helper counts | | Open scope; Manage | |
| Storage health | Static stats | | View usage / Manage storage | |
| Recent activity | Static list | | View item / Open folder | |

### Component Details (examples)

#### Hero card
- **Purpose**: Introduce files hub + primary action.
- **Required Data**: Primary CTA (upload), secondary metrics (quota, expiring links).

#### Segment cards
- **Purpose**: Entry points to scopes.
- **Required Data**: Counts, badge text, description, helper (e.g., “links expiring”).

#### Storage health
- **Purpose**: Quota awareness.
- **Required Data**: Used/total, trend, alerts.

#### Recent activity
- **Purpose**: Audit trail.
- **Required Data**: Actor, action, item, location, timestamp, link.

## Data & Content Planning
- **Static Content**: Headings, helper text, permission language, empty-state copy.
- **Dynamic Content**: Stats, activity, scope counts, expiring links.
- **Media Assets**: Icons per scope/file type.

## Implementation Checklist
- [ ] Define file metadata + permission model
- [ ] Decide quotas and alert thresholds
- [ ] Activity feed schema + source
- [ ] Empty/error/expired-link states + accessibility

