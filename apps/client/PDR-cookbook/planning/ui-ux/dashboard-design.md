# SISO Agency Client Dashboard Design Document

## Executive Summary

This document outlines the comprehensive design for the SISO Agency Client Dashboard, featuring real-time progress tracking across 46 PDR steps, live agent visibility, and an intuitive progressive unlock system. The dashboard serves as the central hub for clients to monitor their project development, interact with AI agents, and access unlocked features based on their journey stage.

## Table of Contents

1. [Dashboard Information Architecture](#1-dashboard-information-architecture)
2. [Agent Activity Display](#2-agent-activity-display)  
3. [Timeline Visualization](#3-timeline-visualization)
4. [Client Communication Features](#4-client-communication-features)
5. [Mobile Dashboard Design](#5-mobile-dashboard-design)
6. [Real-time Update Strategies](#6-real-time-update-strategies)
7. [Component Specifications](#7-component-specifications)
8. [Wireframe Descriptions](#8-wireframe-descriptions)

---

## 1. Dashboard Information Architecture

### 1.1 Dashboard Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ Top Navigation Bar                                              │
│ ┌─────────────┬──────────────────────┬───────────┬──────────┐ │
│ │ SISO Logo   │ Progress: 35%        │ Notifs(3) │ Profile  │ │
│ └─────────────┴──────────────────────┴───────────┴──────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ Main Dashboard Area                                             │
│ ┌─────────────┬─────────────────────────────────────────────┐ │
│ │ Side Nav    │ Content Area                                │ │
│ │             │ ┌─────────────────────────────────────────┐ │ │
│ │ ◉ Overview  │ │ Welcome Banner & Quick Actions        │ │ │
│ │ ○ Timeline  │ └─────────────────────────────────────────┘ │ │
│ │ ○ Agents    │ ┌───────────┬───────────┬───────────────┐ │ │
│ │ ○ Features  │ │ Progress  │ Active    │ Next Steps    │ │ │
│ │ ○ Messages  │ │ Widget    │ Agents    │ & Tasks       │ │ │
│ │ ○ Payments  │ └───────────┴───────────┴───────────────┘ │ │
│ │             │ ┌─────────────────────────────────────────┐ │ │
│ │ 🔒 Locked   │ │ Feature Cards (Unlocked/Locked State) │ │ │
│ │ └─ Timeline │ └─────────────────────────────────────────┘ │ │
│ │ └─ Agents   │                                             │ │
│ └─────────────┴─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Getting Started Tasks (Onboarding Steps)

#### Welcome Banner Component
```typescript
interface WelcomeBanner {
  clientName: string;
  projectStage: 'onboarding' | 'design' | 'planning' | 'development' | 'launch';
  completionPercentage: number;
  nextMilestone: {
    name: string;
    tasksRemaining: number;
    estimatedTime: string;
  };
  quickActions: QuickAction[];
}

interface QuickAction {
  id: string;
  label: string;
  icon: IconType;
  route: string;
  isEnabled: boolean;
  requiresUnlock?: string;
}
```

#### Onboarding Checklist Widget
```
┌─────────────────────────────────────┐
│ 🚀 Getting Started (4/6 complete)   │
├─────────────────────────────────────┤
│ ✅ Create your account              │
│ ✅ Complete company profile         │
│ ✅ Connect social media             │
│ ✅ Upload brand assets              │
│ ⭕ Create mood board    [Continue]  │
│ 🔒 Review app plan     [Locked]    │
└─────────────────────────────────────┘
```

### 1.3 Progress Indicators

#### Overall Progress Component
```typescript
interface OverallProgress {
  totalSteps: 46;
  completedSteps: number;
  currentPhase: {
    name: string;
    stepsInPhase: number;
    stepsCompleted: number;
  };
  phases: Phase[];
  estimatedCompletion: Date;
  isOnTrack: boolean;
}

interface Phase {
  id: string;
  name: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'blocked';
  steps: Step[];
  dependencies: string[];
}
```

#### Visual Progress Representation
```
Discovery     Design      Development    Testing    Launch
[████████] -> [███░░░] -> [░░░░░░░░] -> [░░░░░] -> [░░░░]
  100%         60%          0%           0%         0%
```

### 1.4 Locked/Unlocked Feature States

#### Feature Card States
```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ ✅ Mood Board   │  │ 🔓 App Plan     │  │ 🔒 Timeline     │
│                 │  │                 │  │                 │
│ [Completed]     │  │ [In Progress]   │  │ [Locked]        │
│                 │  │                 │  │                 │
│ View Results >  │  │ Continue >      │  │ Unlock: Accept  │
│                 │  │                 │  │ App Plan First  │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

### 1.5 Notification Center

#### Notification Types & Priority
```typescript
interface NotificationCenter {
  notifications: Notification[];
  unreadCount: number;
  filters: NotificationFilter[];
}

interface Notification {
  id: string;
  type: 'feature_unlock' | 'agent_update' | 'milestone' | 'message' | 'alert';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  actionButton?: {
    label: string;
    action: () => void;
  };
  agent?: {
    id: string;
    name: string;
    avatar: string;
  };
}
```

### 1.6 Quick Actions & Shortcuts

```
┌──────────────────────────────────────────────────┐
│ Quick Actions                                    │
├──────────────────────────────────────────────────┤
│ 🎨 Continue Mood Board                           │
│ 💬 Message Active Agent                          │
│ 📊 View Today's Progress                         │
│ 📱 Download Mobile App                           │
│ ❓ Get Help                                      │
└──────────────────────────────────────────────────┘
```

---

## 2. Agent Activity Display

### 2.1 Real-time Agent Status Dashboard

```
┌─────────────────────────────────────────────────────────────┐
│ Active AI Agents (3/8 working)                              │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────┬─────────────┬─────────────┬─────────────┐ │
│ │ Agent #1    │ Agent #2    │ Agent #3    │ Agent #4    │ │
│ │ 🟢 Working  │ 🟡 Waiting  │ 🟢 Working  │ ⚫ Idle     │ │
│ │             │             │             │             │ │
│ │ Market      │ Competitor  │ Design      │ Technical   │ │
│ │ Research    │ Analysis    │ Analysis    │ Planning    │ │
│ │             │             │             │             │ │
│ │ Step 3/12   │ Blocked by  │ Step 8/10   │ Not started │ │
│ │ 45min       │ Client Input│ 2hr 15min   │             │ │
│ └─────────────┴─────────────┴─────────────┴─────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Token Usage Tracking Visualization

```typescript
interface TokenUsageDisplay {
  totalTokensAllocated: number;
  tokensUsed: number;
  tokensByAgent: {
    agentId: string;
    agentName: string;
    tokensUsed: number;
    percentage: number;
  }[];
  projectedUsage: number;
  costEstimate: number;
  visualChart: 'pie' | 'bar' | 'timeline';
}
```

#### Visual Representation
```
Token Usage by Agent
┌────────────────────────────────────┐
│ Research Agent    ████████ 35%     │
│ Design Agent      ██████ 25%       │
│ Competitor Agent  █████ 20%        │
│ Planning Agent    ███ 15%          │
│ Other             █ 5%             │
└────────────────────────────────────┘
Total: 125,000 / 500,000 tokens (25%)
```

### 2.3 Time Spent Metrics

```
┌─────────────────────────────────────────┐
│ Agent Time Investment                   │
├─────────────────────────────────────────┤
│ Today: 4hr 32min | This Week: 18hr     │
├─────────────────────────────────────────┤
│ By Phase:                               │
│ • Discovery:        8hr 15min ████████  │
│ • Analysis:         6hr 30min ██████    │
│ • Design:           3hr 15min ███       │
│ • Documentation:    45min     █         │
└─────────────────────────────────────────┘
```

### 2.4 Activity Logs with Timestamps

```typescript
interface ActivityLog {
  entries: LogEntry[];
  filters: {
    agentId?: string;
    dateRange?: DateRange;
    activityType?: ActivityType;
  };
  pagination: Pagination;
}

interface LogEntry {
  id: string;
  timestamp: Date;
  agent: {
    id: string;
    name: string;
    type: string;
  };
  activity: {
    type: 'started' | 'completed' | 'blocked' | 'error' | 'milestone';
    description: string;
    details?: any;
  };
  duration?: number;
  output?: {
    summary: string;
    link?: string;
  };
}
```

### 2.5 Agent Communication Interface

```
┌─────────────────────────────────────────────────────┐
│ Chat with Research Agent                          X │
├─────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────┐ │
│ │ Agent: I've completed the market analysis for   │ │
│ │ your restaurant app. Key findings:              │ │
│ │ • 73% of competitors lack loyalty programs      │ │
│ │ • Mobile ordering increased 145% this year      │ │
│ │ • Average app rating: 3.8/5                     │ │
│ │                                    10:32 AM     │ │
│ ├─────────────────────────────────────────────────┤ │
│ │ You: Can you analyze pricing models too?        │ │
│ │                                    10:35 AM     │ │
│ ├─────────────────────────────────────────────────┤ │
│ │ Agent: Starting pricing analysis now...          │ │
│ │ [Analyzing...] Expected: 15 minutes             │ │
│ │                                    10:36 AM     │ │
│ └─────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────┐ │
│ │ Type your message...                     [Send] │ │
│ └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

---

## 3. Timeline Visualization for 46 PDR Steps

### 3.1 Visual Progress Representations

#### Gantt Chart View
```
PDR Timeline - Restaurant App Project
├─ Discovery Phase (8 steps)
│  ├─ Client Analysis      ████████ Day 1-2
│  ├─ Market Research      ████████ Day 1-3  
│  ├─ Competitor Analysis  ████████ Day 2-4
│  └─ User Personas        ████░░░░ Day 3-5
├─ Design Phase (8 steps)
│  ├─ Mood Board Creation  ░░░░░░░░ Day 5-6
│  ├─ UI/UX Planning       ░░░░░░░░ Day 6-8
│  └─ Prototype Design     ░░░░░░░░ Day 8-10
└─ Development Phase (30 steps)
   └─ [Locked - Complete Design First]
```

#### Kanban Board View
```
┌──────────┬──────────┬──────────┬──────────┬──────────┐
│ Backlog  │ To Do    │ In Prog  │ Review   │ Done     │
├──────────┼──────────┼──────────┼──────────┼──────────┤
│ Step 15  │ Step 9   │ Step 6   │ Step 4   │ Step 1   │
│ Step 16  │ Step 10  │ Step 7   │ Step 5   │ Step 2   │
│ Step 17  │ Step 11  │ Step 8   │          │ Step 3   │
│ ...      │ Step 12  │          │          │          │
│ Step 46  │          │          │          │          │
└──────────┴──────────┴──────────┴──────────┴──────────┘
```

#### Custom Timeline View
```
┌─────────────────────────────────────────────────────────┐
│ Your PDR Journey                                        │
├─────────────────────────────────────────────────────────┤
│     Discovery        Design       Development           │
│ ●───●───●───●    ●───●───○───○    ○───○───○───○       │
│ ↑                ↑                                      │
│ You are here     Next phase                             │
│                                                         │
│ Completed: 6/46 steps (13%)                            │
│ Current: Competitor Deep Analysis                       │
│ Up Next: User Persona Development                       │
│ ETA: 2 weeks remaining                                  │
└─────────────────────────────────────────────────────────┘
```

### 3.2 Step Status Indicators

```typescript
interface StepStatus {
  id: string;
  number: number;
  name: string;
  phase: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'blocked' | 'skipped';
  assignedAgents: Agent[];
  startTime?: Date;
  completionTime?: Date;
  estimatedDuration: number;
  actualDuration?: number;
  blockers?: Blocker[];
  outputs?: Output[];
}

// Visual indicators
const statusIcons = {
  'not-started': '○',
  'in-progress': '◐',
  'completed': '●',
  'blocked': '⊗',
  'skipped': '◌'
};
```

### 3.3 Dependencies Between Steps

```
Step Dependencies Visualization
┌─────────────────┐
│ Market Research │
└────────┬────────┘
         ↓
┌─────────────────┐     ┌──────────────────┐
│ User Personas   │────→│ Feature Planning │
└─────────────────┘     └──────────────────┘
         ↓                       ↓
┌─────────────────┐     ┌──────────────────┐
│ Competitor      │────→│ Technical Arch   │
│ Analysis        │     └──────────────────┘
└─────────────────┘
```

### 3.4 ETA Calculations and Updates

```typescript
interface ETACalculator {
  totalSteps: 46;
  completedSteps: number;
  averageStepDuration: number; // in hours
  currentVelocity: number; // steps per day
  blockers: number;
  
  calculateETA(): {
    optimistic: Date;    // Best case
    realistic: Date;     // Based on current velocity
    pessimistic: Date;   // With potential delays
    confidence: number;  // 0-100%
  };
  
  factors: {
    clientResponseTime: number;
    agentAvailability: number;
    complexity: number;
    dependencies: number;
  };
}
```

### 3.5 Milestone Celebrations

```
┌──────────────────────────────────────────────┐
│ 🎉 Milestone Achieved!                       │
├──────────────────────────────────────────────┤
│ Discovery Phase Complete                     │
│                                              │
│ ⭐⭐⭐⭐⭐ Excellent Progress!               │
│                                              │
│ • 8 steps completed                          │
│ • 12 hours of agent work                    │
│ • 47 insights discovered                     │
│                                              │
│ [View Report] [Share] [Continue to Design]  │
└──────────────────────────────────────────────┘
```

---

## 4. Client Communication Features

### 4.1 Live Chat with Agents

```typescript
interface LiveChatSystem {
  conversations: Conversation[];
  activeChats: string[];
  typingIndicators: TypingIndicator[];
  
  features: {
    realTimeMessaging: boolean;
    fileSharing: boolean;
    voiceNotes: boolean;
    screenSharing: boolean;
    codeSnippets: boolean;
    reactions: boolean;
  };
}

interface Conversation {
  id: string;
  participants: Participant[];
  messages: Message[];
  status: 'active' | 'waiting' | 'closed';
  context: {
    relatedStep?: string;
    relatedFeature?: string;
    priority: 'low' | 'medium' | 'high';
  };
}
```

### 4.2 Feedback Submission System

```
┌─────────────────────────────────────────────┐
│ Feedback on Market Research Report          │
├─────────────────────────────────────────────┤
│ How satisfied are you with this deliverable?│
│                                             │
│ ○ Very Unsatisfied                          │
│ ○ Unsatisfied                               │
│ ◉ Neutral                                   │
│ ○ Satisfied                                 │
│ ○ Very Satisfied                            │
│                                             │
│ Additional Comments:                         │
│ ┌─────────────────────────────────────────┐ │
│ │ The competitor analysis could include   │ │
│ │ more pricing information...             │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ [Submit Feedback] [Request Revision]        │
└─────────────────────────────────────────────┘
```

### 4.3 Document Sharing Interface

```typescript
interface DocumentHub {
  folders: Folder[];
  recentDocuments: Document[];
  sharedWithAgents: Document[];
  
  documentTypes: {
    reports: PDFDocument[];
    designs: DesignFile[];
    spreadsheets: DataFile[];
    presentations: SlideFile[];
    code: CodeRepository[];
  };
  
  permissions: {
    canUpload: boolean;
    canDelete: boolean;
    canShare: boolean;
    canComment: boolean;
  };
}
```

### 4.4 Approval Workflows

```
┌─────────────────────────────────────────────┐
│ Pending Approvals (3)                       │
├─────────────────────────────────────────────┤
│ 1. App Feature List                         │
│    Ready for your review                    │
│    [Review Now] [Schedule Call]             │
│                                             │
│ 2. Design Mockups v2                        │
│    Updated based on feedback                │
│    [Review Now] [Compare Versions]          │
│                                             │
│ 3. Development Timeline                     │
│    Requires approval to proceed             │
│    [Review Now] [Request Changes]           │
└─────────────────────────────────────────────┘
```

### 4.5 Update Notifications

```typescript
interface UpdateNotificationSystem {
  channels: {
    inApp: boolean;
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  
  preferences: {
    frequency: 'realtime' | 'hourly' | 'daily' | 'weekly';
    types: NotificationType[];
    quietHours: {
      enabled: boolean;
      start: string; // "22:00"
      end: string;   // "08:00"
    };
  };
  
  templates: {
    stepCompleted: NotificationTemplate;
    milestoneReached: NotificationTemplate;
    approvalRequired: NotificationTemplate;
    agentMessage: NotificationTemplate;
    systemUpdate: NotificationTemplate;
  };
}
```

---

## 5. Mobile Dashboard Design

### 5.1 Responsive Layout Strategy

```
Mobile Portrait (375px)          Tablet (768px)
┌─────────────────┐              ┌─────────────────────┐
│ ≡ SISO  🔔 👤   │              │ SISO    Home  🔔 👤 │
├─────────────────┤              ├──────────┬──────────┤
│ Progress: 35%   │              │ Progress │ Actions  │
│ ████████░░░░░░  │              │ ████░░░  │ • Chat   │
├─────────────────┤              │          │ • Docs   │
│ Active: 3 agents│              ├──────────┴──────────┤
│ [View Details]  │              │ Active Agents       │
├─────────────────┤              │ ┌──────┬──────┐    │
│ Next: Complete  │              │ │ #1   │ #2   │    │
│ mood board      │              │ └──────┴──────┘    │
│ [Continue]      │              ├─────────────────────┤
├─────────────────┤              │ Timeline            │
│ [≡] Menu        │              │ [Gantt View]        │
└─────────────────┘              └─────────────────────┘
```

### 5.2 Touch-Friendly Controls

```typescript
interface TouchOptimizedControls {
  minimumTouchTarget: '44px'; // iOS standard
  swipeGestures: {
    horizontalSwipe: 'navigate-tabs';
    verticalScroll: 'natural';
    pullToRefresh: boolean;
    swipeToDelete: boolean;
  };
  
  buttonSizes: {
    primary: '48px';
    secondary: '40px';
    icon: '44px';
  };
  
  spacing: {
    betweenElements: '16px';
    contentPadding: '20px';
  };
}
```

### 5.3 Priority Information Display

Mobile Information Hierarchy:
1. **Overall Progress** - Always visible
2. **Critical Alerts** - Red banner if needed
3. **Active Tasks** - What needs attention now
4. **Quick Actions** - One-tap access
5. **Agent Status** - Collapsed by default
6. **Timeline** - Simplified view
7. **Documents** - Recent only

### 5.4 Offline Capability

```typescript
interface OfflineCapabilities {
  cachedData: {
    dashboardState: boolean;
    recentMessages: boolean;
    documents: boolean;
    timeline: boolean;
  };
  
  offlineActions: {
    viewProgress: boolean;
    readMessages: boolean;
    drafMessages: boolean;
    viewDocuments: boolean;
  };
  
  syncStrategy: {
    automatic: boolean;
    onWifiOnly: boolean;
    backgroundSync: boolean;
  };
}
```

### 5.5 Mobile-Specific Features

```
┌─────────────────────────────────┐
│ Quick Actions (Mobile)          │
├─────────────────────────────────┤
│ 📱 Call Agent                   │
│ 📸 Upload Photo                 │
│ 🎤 Voice Note                   │
│ 📍 Share Location               │
│ 🔔 Push Notifications           │
└─────────────────────────────────┘
```

---

## 6. Real-time Update Strategies

### 6.1 WebSocket Architecture

```typescript
interface RealtimeSystem {
  connection: {
    protocol: 'wss://';
    endpoint: 'realtime.siso.agency';
    heartbeat: 30000; // 30 seconds
    reconnectStrategy: 'exponential-backoff';
  };
  
  channels: {
    globalUpdates: Channel;
    projectSpecific: Channel;
    agentActivity: Channel;
    notifications: Channel;
  };
  
  subscriptions: {
    agentStatus: Subscription;
    stepProgress: Subscription;
    messages: Subscription;
    documents: Subscription;
  };
}
```

### 6.2 Update Prioritization

```typescript
enum UpdatePriority {
  CRITICAL = 0,  // Blocker alerts, system issues
  HIGH = 1,      // Approvals needed, agent messages
  MEDIUM = 2,    // Progress updates, completions
  LOW = 3,       // Stats updates, background info
}

interface UpdateQueue {
  process(update: Update): void {
    switch(update.priority) {
      case UpdatePriority.CRITICAL:
        this.immediateUpdate(update);
        break;
      case UpdatePriority.HIGH:
        this.queueHighPriority(update);
        break;
      default:
        this.batchUpdate(update);
    }
  }
}
```

### 6.3 Optimistic UI Updates

```typescript
interface OptimisticUpdate {
  // Update UI immediately
  applyOptimistic(action: Action): void;
  
  // Verify with server
  verifyWithServer(action: Action): Promise<boolean>;
  
  // Rollback if failed
  rollback(action: Action): void;
  
  // Common optimistic actions
  actions: {
    markAsRead: boolean;
    sendMessage: boolean;
    updateProgress: boolean;
    toggleFeature: boolean;
  };
}
```

### 6.4 Supabase Real-time Integration

```typescript
interface SupabaseRealtimeConfig {
  tables: {
    agent_activity: {
      events: ['INSERT', 'UPDATE'];
      filter: 'project_id=eq.{currentProject}';
    };
    project_progress: {
      events: ['UPDATE'];
      filter: 'client_id=eq.{currentClient}';
    };
    messages: {
      events: ['INSERT'];
      filter: 'recipient_id=eq.{currentUser}';
    };
    notifications: {
      events: ['INSERT'];
      filter: 'user_id=eq.{currentUser}';
    };
  };
  
  handlers: {
    onAgentUpdate: (payload: RealtimePayload) => void;
    onProgressUpdate: (payload: RealtimePayload) => void;
    onNewMessage: (payload: RealtimePayload) => void;
    onNotification: (payload: RealtimePayload) => void;
  };
}
```

### 6.5 Performance Optimization

```typescript
interface PerformanceStrategy {
  debouncing: {
    searchInput: 300; // ms
    progressUpdates: 1000;
    tokenUsage: 5000;
  };
  
  throttling: {
    scrollEvents: 100;
    resizeEvents: 200;
    animationFrames: 16; // 60fps
  };
  
  lazyLoading: {
    images: boolean;
    heavyComponents: boolean;
    belowFoldContent: boolean;
  };
  
  virtualization: {
    longLists: boolean;
    timelineSteps: boolean;
    messageHistory: boolean;
  };
}
```

---

## 7. Component Specifications

### 7.1 Core Dashboard Components

```typescript
// Progress Ring Component
interface ProgressRing {
  percentage: number;
  size: 'sm' | 'md' | 'lg';
  strokeWidth: number;
  primaryColor: string;
  backgroundColor: string;
  showPercentage: boolean;
  animated: boolean;
  segments?: {
    value: number;
    color: string;
    label: string;
  }[];
}

// Agent Card Component
interface AgentCard {
  agent: {
    id: string;
    name: string;
    type: string;
    avatar: string;
    specialization: string;
  };
  status: 'working' | 'waiting' | 'completed' | 'idle';
  currentTask?: {
    name: string;
    progress: number;
    step: string;
  };
  metrics: {
    tokensUsed: number;
    timeSpent: number;
    tasksCompleted: number;
  };
  actions: {
    message: () => void;
    viewDetails: () => void;
    pauseWork?: () => void;
  };
}

// Timeline Step Component
interface TimelineStep {
  step: {
    number: number;
    name: string;
    description: string;
    phase: string;
  };
  status: StepStatus;
  timeline: {
    estimated: Date;
    actual?: Date;
    duration: number;
  };
  dependencies: string[];
  assignedAgents: string[];
  outputs: {
    type: string;
    name: string;
    url: string;
  }[];
  isExpanded: boolean;
  onToggle: () => void;
}

// Feature Card Component
interface FeatureCard {
  feature: {
    id: string;
    name: string;
    description: string;
    icon: IconType;
  };
  state: 'locked' | 'unlocked' | 'completed' | 'in-progress';
  unlockCriteria?: {
    requirement: string;
    progress: number;
    total: number;
  };
  actions: {
    primary: {
      label: string;
      action: () => void;
      disabled?: boolean;
    };
    secondary?: {
      label: string;
      action: () => void;
    };
  };
  badge?: {
    text: string;
    type: 'new' | 'beta' | 'pro';
  };
}
```

### 7.2 Notification Components

```typescript
// Notification Toast Component
interface NotificationToast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
  duration?: number; // auto-dismiss
  persistent?: boolean;
  actions?: {
    label: string;
    action: () => void;
  }[];
  onDismiss: () => void;
  position: 'top-right' | 'top-center' | 'bottom-right';
}

// Notification Badge Component
interface NotificationBadge {
  count: number;
  maxCount?: number; // shows "99+" if exceeded
  color: 'primary' | 'secondary' | 'danger';
  size: 'sm' | 'md' | 'lg';
  pulse?: boolean;
  dot?: boolean; // shows dot instead of number
}
```

### 7.3 Interactive Components

```typescript
// Chat Interface Component
interface ChatInterface {
  conversation: Conversation;
  currentUser: User;
  isTyping: boolean;
  onSendMessage: (message: string, attachments?: File[]) => void;
  onTyping: () => void;
  features: {
    fileUpload: boolean;
    voiceNotes: boolean;
    codeBlocks: boolean;
    mentions: boolean;
    reactions: boolean;
  };
  layout: 'full' | 'compact' | 'minimal';
}

// Document Viewer Component
interface DocumentViewer {
  document: {
    id: string;
    name: string;
    type: 'pdf' | 'image' | 'video' | 'code' | 'spreadsheet';
    url: string;
    size: number;
  };
  permissions: {
    download: boolean;
    print: boolean;
    comment: boolean;
    share: boolean;
  };
  viewer: {
    zoom: boolean;
    fullscreen: boolean;
    annotations: boolean;
  };
  onClose: () => void;
}
```

### 7.4 Data Visualization Components

```typescript
// Token Usage Chart Component
interface TokenUsageChart {
  data: {
    used: number;
    total: number;
    byAgent: {
      name: string;
      value: number;
      color: string;
    }[];
    timeline: {
      date: Date;
      value: number;
    }[];
  };
  chartType: 'pie' | 'bar' | 'line' | 'doughnut';
  interactive: boolean;
  showLegend: boolean;
  showTooltips: boolean;
}

// Progress Timeline Component  
interface ProgressTimeline {
  steps: TimelineStep[];
  view: 'gantt' | 'kanban' | 'list' | 'calendar';
  filters: {
    phase?: string;
    status?: string;
    agent?: string;
    dateRange?: DateRange;
  };
  zoom: 'day' | 'week' | 'month';
  showDependencies: boolean;
  showCriticalPath: boolean;
  onStepClick: (step: TimelineStep) => void;
}
```

---

## 8. Wireframe Descriptions

### 8.1 Desktop Dashboard Wireframe

```
┌─────────────────────────────────────────────────────────────────────┐
│ SISO Agency                     35% Complete    (3) 🔔    John Doe ▼ │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│ ┌─────────────┐  ┌─────────────────────────────────────────────┐  │
│ │             │  │ Welcome back, John! Your app is taking shape │  │
│ │ ◉ Overview  │  │                                              │  │
│ │ ○ Timeline  │  │ ┌─────────┐ ┌─────────┐ ┌─────────┐       │  │
│ │ ○ Agents    │  │ │Progress │ │ Active  │ │  Next   │       │  │
│ │ ○ Features  │  │ │   35%   │ │3 Agents │ │ 2 Tasks │       │  │
│ │ ○ Messages  │  │ │ ███░░░░ │ │Working  │ │         │       │  │
│ │ ○ Docs      │  │ └─────────┘ └─────────┘ └─────────┘       │  │
│ │             │  │                                              │  │
│ │ 🔒 Locked   │  │ Current Phase: Design Discovery              │  │
│ │ └ Payments  │  │ ┌──────────────────────────────────────┐    │  │
│ │ └ Reports   │  │ │ Active Agents                        │    │  │
│ │             │  │ │ ┌────────┐ ┌────────┐ ┌────────┐  │    │  │
│ │             │  │ │ │Research│ │Design  │ │Analysis│  │    │  │
│ │ ❓ Help     │  │ │ │Agent #1│ │Agent #2│ │Agent #3│  │    │  │
│ │ 💡 Features │  │ │ │🟢 Work │ │🟡 Wait │ │🟢 Work │  │    │  │
│ │             │  │ │ └────────┘ └────────┘ └────────┘  │    │  │
│ └─────────────┘  │ └──────────────────────────────────────┘    │  │
│                  │                                              │  │
│                  │ Your Features                                │  │
│                  │ ┌──────────┐ ┌──────────┐ ┌──────────┐     │  │
│                  │ │✅ Profile│ │🎨 Mood   │ │🔒 App    │     │  │
│                  │ │Complete  │ │Board     │ │Plan      │     │  │
│                  │ └──────────┘ └──────────┘ └──────────┘     │  │
│                  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

### 8.2 Mobile Dashboard Wireframe

```
┌─────────────────┐
│ ≡  SISO  (3) 👤 │
├─────────────────┤
│                 │
│ Welcome, John!  │
│                 │
│ Progress: 35%   │
│ ████████░░░░░░  │
│                 │
├─────────────────┤
│ 🟢 3 Agents     │
│ Active Now      │
│ [View All >]    │
├─────────────────┤
│ 📋 Next Tasks   │
│ • Complete mood │
│   board (5 min) │
│ • Review market │
│   research      │
│ [See More >]    │
├─────────────────┤
│ 🔓 Unlocked     │
│ ┌─────┬─────┐   │
│ │Mood │ App │   │
│ │Board│Plan │   │
│ │ 🎨  │ 🔒 │   │
│ └─────┴─────┘   │
├─────────────────┤
│ [💬] [📊] [📁]  │
│ Chat Stats Docs │
└─────────────────┘
```

### 8.3 Agent Activity Panel Wireframe

```
┌───────────────────────────────────────────┐
│ Agent Activity Center                     │
├───────────────────────────────────────────┤
│ Filter: [All Agents ▼] [Today ▼]        │
├───────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐   │
│ │ Research Agent #1                   │   │
│ │ Status: 🟢 Analyzing competitors    │   │
│ │ Progress: ████████░░ 80%            │   │
│ │ Time: 2h 15m | Tokens: 45,231      │   │
│ │ [View Output] [Message] [Pause]     │   │
│ └─────────────────────────────────────┘   │
│                                           │
│ ┌─────────────────────────────────────┐   │
│ │ Design Agent #2                     │   │
│ │ Status: 🟡 Waiting for mood board   │   │
│ │ Ready to analyze your preferences   │   │
│ │ Time: -- | Tokens: 0                │   │
│ │ [Notify When Ready] [Message]       │   │
│ └─────────────────────────────────────┘   │
│                                           │
│ Token Usage Today: 125,432 / 500,000     │
│ ████████████░░░░░░░░░░░░░░ 25%          │
└───────────────────────────────────────────┘
```

### 8.4 Timeline Visualization Wireframe

```
┌─────────────────────────────────────────────────────┐
│ PDR Timeline            View: [Gantt ▼] [Week ▼]   │
├─────────────────────────────────────────────────────┤
│      Day 1    Day 2    Day 3    Day 4    Day 5     │
├─────────────────────────────────────────────────────┤
│ Discovery Phase (8/8 steps)                         │
│ 1 █████████████████████████ ✓ Client Analysis      │
│ 2 ████████████████████ ✓ Market Research           │
│ 3 ███████████████ ✓ Competitor Analysis            │
│ 4 ██████████ ✓ User Personas                       │
│                                                     │
│ Design Phase (2/8 steps)                            │
│ 5 ░░░░░░█████████░░░░░ ◐ Mood Board (60%)         │
│ 6 ░░░░░░░░░░░░░░░ ○ UI/UX Planning                │
│                                                     │
│ 🔒 Development Phase (Locked)                       │
│ Complete Design Phase to unlock                     │
│                                                     │
│ Legend: █ Complete ░ Planned ◐ Active ○ Not Started│
└─────────────────────────────────────────────────────┘
```

### 8.5 Communication Hub Wireframe

```
┌────────────────────────────────────────────────────┐
│ Communication Center    [All ▼] [Unread] [Starred] │
├────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────┐  │
│ │ 🔴 Approval Required - App Feature List      │  │
│ │ From: Planning Agent • 10 min ago            │  │
│ │ Please review and approve the feature list   │  │
│ │ [Review Now] [Schedule Call] [Message Agent] │  │
│ └──────────────────────────────────────────────┘  │
│                                                    │
│ ┌──────────────────────────────────────────────┐  │
│ │ 🟡 Update - Market Research Complete         │  │
│ │ From: Research Agent • 2 hours ago           │  │
│ │ 73 competitor apps analyzed, key insights... │  │
│ │ [View Report] [Share Feedback]               │  │
│ └──────────────────────────────────────────────┘  │
│                                                    │
│ ┌──────────────────────────────────────────────┐  │
│ │ 🟢 Progress Update - Step 6 Started          │  │
│ │ From: System • 3 hours ago                   │  │
│ │ Design Agent has started working on UI/UX    │  │
│ │ [View Timeline] [Dismiss]                    │  │
│ └──────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────┘
```

---

## Implementation Priorities

### Phase 1 - MVP (Week 1)
1. Basic dashboard layout with progress tracking
2. Simple agent status display
3. Mobile responsive design
4. Core navigation and feature cards
5. Basic real-time updates

### Phase 2 - Enhanced (Week 2)
1. Full timeline visualization
2. Live chat with agents
3. Document management
4. Advanced progress metrics
5. Push notifications

### Phase 3 - Complete (Month 1)
1. Token usage analytics
2. Comprehensive activity logs
3. Approval workflows
4. Offline capabilities
5. Advanced celebrations and gamification

## Technical Considerations

### Performance
- Virtualize long lists (timeline steps, activity logs)
- Lazy load heavy components
- Implement progressive enhancement
- Cache static content aggressively
- Use WebSocket connection pooling

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader optimized
- High contrast mode
- Reduced motion options

### Security
- End-to-end encryption for chat
- Secure document storage
- Role-based access control
- Audit logging
- Session management

This dashboard design provides a comprehensive, real-time view of the PDR process while maintaining clarity and usability across all devices. The progressive unlock system guides clients through their journey while the agent visibility features build trust and excitement about the AI-powered development process.