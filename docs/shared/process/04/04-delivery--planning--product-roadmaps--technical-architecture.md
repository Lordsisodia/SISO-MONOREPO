# Technical Architecture Document
## SISO Agency Client Onboarding Platform with Mood Board Functionality

### Executive Summary

This document outlines the technical architecture for the enhanced client onboarding platform leveraging SISO Agency's existing infrastructure. The platform will feature an improved onboarding flow, mood board functionality, real-time dashboards, and AI agent integration.

### Table of Contents

1. [System Overview](#system-overview)
2. [Architecture Principles](#architecture-principles)
3. [Component Mapping](#component-mapping)
4. [Database Schema Design](#database-schema-design)
5. [API Architecture](#api-architecture)
6. [State Management](#state-management)
7. [Real-time Architecture](#real-time-architecture)
8. [Security Architecture](#security-architecture)
9. [Performance Optimization](#performance-optimization)
10. [Integration Points](#integration-points)
11. [Deployment Architecture](#deployment-architecture)

---

## System Overview

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: 200+ shadcn/ui components (already built)
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage + Realtime)
- **State Management**: React Context + Zustand (for complex state)
- **Routing**: React Router v6
- **Animation**: Framer Motion
- **PWA**: Vite PWA Plugin
- **AI Integration**: Anthropic SDK + Custom AI Agents
- **Documentation**: Notion MCP

### Architecture Pattern
- **Client-Side**: Component-based architecture with feature-based organization
- **API**: RESTful + GraphQL-like queries via Supabase
- **Real-time**: WebSocket connections via Supabase Realtime
- **Storage**: Supabase Storage for media files

---

## Architecture Principles

1. **Reuse Over Rebuild**: Maximize use of existing components and infrastructure
2. **Progressive Enhancement**: Add features incrementally without breaking existing functionality
3. **Real-time First**: Design for real-time updates from the ground up
4. **Security by Design**: Implement RLS and authentication at every layer
5. **Performance Optimized**: Lazy loading, code splitting, and caching strategies
6. **Developer Experience**: Type safety, clear documentation, and consistent patterns

---

## Component Mapping

### Existing Components → New Features

#### 1. Enhanced Onboarding Flow
```typescript
// Extend existing BusinessOnboarding component
BusinessOnboarding (existing)
├── EnhancedBusinessOnboarding (new wrapper)
│   ├── OnboardingProgress (new)
│   ├── MoodBoardStep (new)
│   ├── BrandIdentityStep (new)
│   └── ProjectGoalsStep (new)
```

**Implementation Strategy:**
- Wrap existing `BusinessOnboarding` with new enhanced features
- Add progress tracking and save state between steps
- Integrate mood board upload as a new step
- Preserve existing chat-based interface

#### 2. Mood Board Functionality
```typescript
// Leverage MediaBlock for mood board
MediaBlock (existing)
├── MoodBoardUploader (new)
│   ├── DragDropZone
│   ├── ImageGrid
│   ├── CategoryTagger
│   └── AIStyleAnalyzer
```

**Implementation Strategy:**
- Extend `MediaBlock` for multi-file uploads
- Add drag-and-drop functionality
- Implement image categorization (colors, styles, themes)
- Add AI-powered style analysis

#### 3. Client Dashboard Enhancement
```typescript
// Extend ClientDashboard components
ClientDashboard (existing)
├── EnhancedClientDashboard (new)
│   ├── ProjectOverview (enhanced)
│   ├── MoodBoardGallery (new)
│   ├── ProgressTimeline (new)
│   ├── AgentActivityFeed (new)
│   └── DocumentHub (enhanced)
```

**Implementation Strategy:**
- Build on existing `ClientDashboardContent`
- Add real-time progress indicators
- Integrate mood board viewer
- Show AI agent activity in real-time

#### 4. Agent Dashboard
```typescript
// New component structure
AgentDashboard (new)
├── ClientList
│   ├── ClientCard
│   └── ClientFilters
├── ActivityFeed
│   ├── RecentActions
│   └── NotificationCenter
├── TaskManager
│   ├── TaskList
│   └── TaskAssignment
└── Analytics
    ├── PerformanceMetrics
    └── ClientInsights
```

---

## Database Schema Design

### Extended Schema for New Features

```sql
-- Extend existing tables
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS
  onboarding_completed_at TIMESTAMP,
  onboarding_progress JSONB DEFAULT '{}',
  brand_preferences JSONB DEFAULT '{}';

-- New tables for mood boards
CREATE TABLE public.mood_boards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE public.mood_board_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mood_board_id UUID REFERENCES mood_boards(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  original_name TEXT,
  file_size INTEGER,
  mime_type TEXT,
  dimensions JSONB, -- {width, height}
  colors JSONB, -- extracted color palette
  tags TEXT[], -- AI-generated tags
  category TEXT, -- style category
  uploaded_at TIMESTAMP DEFAULT NOW(),
  uploaded_by UUID REFERENCES profiles(id)
);

-- Progress tracking
CREATE TABLE public.onboarding_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  step_name TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending', 'in_progress', 'completed', 'skipped')),
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  data JSONB DEFAULT '{}',
  UNIQUE(client_id, step_name)
);

-- Agent activity tracking
CREATE TABLE public.agent_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID REFERENCES profiles(id),
  client_id UUID REFERENCES profiles(id),
  project_id UUID REFERENCES projects(id),
  activity_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Real-time notifications
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipient_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES profiles(id),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  data JSONB DEFAULT '{}',
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_mood_board_images_mood_board ON mood_board_images(mood_board_id);
CREATE INDEX idx_agent_activities_client ON agent_activities(client_id);
CREATE INDEX idx_agent_activities_created ON agent_activities(created_at DESC);
CREATE INDEX idx_notifications_recipient ON notifications(recipient_id, read);
```

### Row Level Security (RLS) Policies

```sql
-- Mood boards: clients see their own, agents see assigned clients
CREATE POLICY mood_boards_select ON mood_boards
  FOR SELECT USING (
    auth.uid() = client_id OR
    EXISTS (
      SELECT 1 FROM project_members
      WHERE project_members.project_id = mood_boards.project_id
      AND project_members.user_id = auth.uid()
    )
  );

-- Agent activities: visible to relevant parties
CREATE POLICY agent_activities_select ON agent_activities
  FOR SELECT USING (
    auth.uid() = agent_id OR
    auth.uid() = client_id OR
    is_admin(auth.uid())
  );
```

---

## API Architecture

### RESTful Endpoints Structure

```typescript
// Client APIs
/api/clients
  GET    /                    // List clients (agents only)
  GET    /:id                 // Get client details
  PUT    /:id                 // Update client
  GET    /:id/progress        // Get onboarding progress
  POST   /:id/progress        // Update progress

// Mood Board APIs
/api/mood-boards
  GET    /                    // List mood boards
  POST   /                    // Create mood board
  GET    /:id                 // Get mood board details
  PUT    /:id                 // Update mood board
  DELETE /:id                 // Delete mood board
  POST   /:id/images          // Upload images
  DELETE /:id/images/:imageId // Remove image

// Activity APIs
/api/activities
  GET    /                    // List activities (filtered)
  POST   /                    // Log new activity
  GET    /feed                // Real-time activity feed

// Progress APIs
/api/progress
  GET    /:clientId           // Get client progress
  POST   /:clientId/:step     // Update step progress
```

### Supabase Functions Implementation

```typescript
// Edge Functions for complex operations
export async function analyzeMoodBoard(req: Request) {
  const { images } = await req.json();
  
  // AI analysis
  const analysis = await analyzeImagesWithAI(images);
  
  // Extract colors, styles, themes
  const insights = {
    dominantColors: extractColors(images),
    styleCategories: analysis.styles,
    brandPersonality: analysis.personality,
    recommendations: analysis.recommendations
  };
  
  return new Response(JSON.stringify(insights));
}

// Real-time subscriptions
const subscription = supabase
  .channel('agent-activities')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'agent_activities',
    filter: `client_id=eq.${clientId}`
  }, handleNewActivity)
  .subscribe();
```

---

## State Management

### Zustand Store Architecture

```typescript
// stores/clientStore.ts
interface ClientStore {
  // State
  currentClient: Client | null;
  onboardingProgress: OnboardingProgress;
  moodBoards: MoodBoard[];
  activities: Activity[];
  
  // Actions
  setCurrentClient: (client: Client) => void;
  updateProgress: (step: string, data: any) => void;
  addMoodBoardImage: (boardId: string, image: Image) => void;
  subscribeToUpdates: (clientId: string) => void;
}

// stores/agentStore.ts  
interface AgentStore {
  // State
  assignedClients: Client[];
  activeChats: Chat[];
  notifications: Notification[];
  
  // Actions
  loadAssignedClients: () => Promise<void>;
  sendMessage: (clientId: string, message: string) => void;
  markNotificationRead: (id: string) => void;
}
```

### Context Providers

```typescript
// contexts/RealtimeContext.tsx
export const RealtimeProvider: React.FC = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  
  useEffect(() => {
    const channel = supabase.channel('global-updates');
    
    // Subscribe to multiple tables
    channel
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'agent_activities' 
      }, handleActivityChange)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'notifications' 
      }, handleNotification)
      .subscribe();
      
    return () => {
      channel.unsubscribe();
    };
  }, []);
  
  return (
    <RealtimeContext.Provider value={{ isConnected, activities }}>
      {children}
    </RealtimeContext.Provider>
  );
};
```

---

## Real-time Architecture

### WebSocket Connection Management

```typescript
// utils/realtimeManager.ts
class RealtimeManager {
  private channels: Map<string, RealtimeChannel> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  
  subscribeToClient(clientId: string, handlers: ChannelHandlers) {
    const channelName = `client:${clientId}`;
    
    if (this.channels.has(channelName)) {
      return this.channels.get(channelName);
    }
    
    const channel = supabase
      .channel(channelName)
      .on('presence', { event: 'sync' }, handlers.onPresenceSync)
      .on('broadcast', { event: 'message' }, handlers.onMessage)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'agent_activities',
        filter: `client_id=eq.${clientId}`
      }, handlers.onActivity)
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          this.channels.set(channelName, channel);
        }
      });
      
    return channel;
  }
  
  // Graceful reconnection
  private handleDisconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      setTimeout(() => {
        this.reconnectAttempts++;
        this.reconnectAll();
      }, Math.pow(2, this.reconnectAttempts) * 1000);
    }
  }
}
```

### Presence Management

```typescript
// hooks/usePresence.ts
export function usePresence(channelName: string) {
  const [presenceState, setPresenceState] = useState<PresenceState>({});
  
  useEffect(() => {
    const channel = supabase.channel(channelName);
    
    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        setPresenceState(state);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        setPresenceState(prev => ({ ...prev, [key]: newPresences }));
      })
      .on('presence', { event: 'leave' }, ({ key }) => {
        setPresenceState(prev => {
          const next = { ...prev };
          delete next[key];
          return next;
        });
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            user_id: user.id,
            online_at: new Date().toISOString(),
          });
        }
      });
      
    return () => {
      channel.unsubscribe();
    };
  }, [channelName]);
  
  return presenceState;
}
```

---

## Security Architecture

### Authentication Flow

```typescript
// Enhanced auth with role management
interface AuthContext {
  user: User | null;
  role: 'client' | 'agent' | 'admin' | null;
  permissions: Permission[];
  isLoading: boolean;
}

// Middleware for role-based access
export function requireRole(allowedRoles: Role[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = await getUser(req);
    
    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    next();
  };
}
```

### Data Encryption

```typescript
// Encrypt sensitive data before storage
import { createCipheriv, createDecipheriv } from 'crypto';

class EncryptionService {
  private algorithm = 'aes-256-gcm';
  private key: Buffer;
  
  encrypt(text: string): EncryptedData {
    const iv = crypto.randomBytes(16);
    const cipher = createCipheriv(this.algorithm, this.key, iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return {
      encrypted,
      iv: iv.toString('hex'),
      authTag: cipher.getAuthTag().toString('hex')
    };
  }
  
  decrypt(data: EncryptedData): string {
    const decipher = createDecipheriv(
      this.algorithm,
      this.key,
      Buffer.from(data.iv, 'hex')
    );
    
    decipher.setAuthTag(Buffer.from(data.authTag, 'hex'));
    
    let decrypted = decipher.update(data.encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
}
```

---

## Performance Optimization

### Code Splitting Strategy

```typescript
// Lazy load heavy components
const MoodBoardEditor = lazy(() => 
  import(/* webpackChunkName: "mood-board" */ './components/MoodBoardEditor')
);

const AgentDashboard = lazy(() =>
  import(/* webpackChunkName: "agent-dashboard" */ './pages/AgentDashboard')
);

// Route-based splitting
const routes = [
  {
    path: '/client/mood-board',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <MoodBoardEditor />
      </Suspense>
    )
  }
];
```

### Image Optimization

```typescript
// Image optimization service
class ImageOptimizer {
  async optimizeForMoodBoard(file: File): Promise<OptimizedImage> {
    // Resize for thumbnails
    const thumbnail = await this.resize(file, { width: 300, height: 300 });
    
    // Compress original
    const compressed = await this.compress(file, { quality: 0.85 });
    
    // Generate WebP version
    const webp = await this.convertToWebP(compressed);
    
    return {
      original: compressed,
      thumbnail,
      webp,
      metadata: await this.extractMetadata(file)
    };
  }
  
  // Progressive loading
  generateBlurHash(image: File): Promise<string> {
    // Generate blur hash for placeholder
  }
}
```

### Caching Strategy

```typescript
// Service Worker for offline support
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/api/mood-boards')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).then((response) => {
          return caches.open('mood-boards-v1').then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
  }
});

// React Query for data caching
const { data: moodBoards } = useQuery({
  queryKey: ['moodBoards', clientId],
  queryFn: fetchMoodBoards,
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
});
```

---

## Integration Points

### 1. Notion MCP Integration

```typescript
// Automatic documentation sync
class NotionIntegration {
  async syncClientDocumentation(clientId: string) {
    const clientData = await getClientData(clientId);
    const moodBoards = await getMoodBoards(clientId);
    
    // Create/update Notion page
    const page = await notion.pages.create({
      parent: { database_id: process.env.NOTION_CLIENTS_DB },
      properties: {
        Name: { title: [{ text: { content: clientData.name } }] },
        Status: { select: { name: clientData.status } },
        'Mood Boards': { url: `/clients/${clientId}/mood-boards` }
      },
      children: [
        {
          object: 'block',
          type: 'heading_2',
          heading_2: { text: [{ text: { content: 'Project Overview' } }] }
        },
        // ... more blocks
      ]
    });
    
    return page;
  }
}
```

### 2. AI Agent Communication

```typescript
// AI Agent API
interface AIAgentAPI {
  analyzeStyle(images: Image[]): Promise<StyleAnalysis>;
  generateRecommendations(moodBoard: MoodBoard): Promise<Recommendations>;
  chatWithClient(message: string, context: Context): Promise<Response>;
}

// WebSocket bridge for AI agents
class AIAgentBridge {
  private socket: WebSocket;
  
  connectAgent(agentId: string) {
    this.socket = new WebSocket(`wss://ai-agents.siso.app/${agentId}`);
    
    this.socket.on('message', (data) => {
      const { type, payload } = JSON.parse(data);
      
      switch (type) {
        case 'style_analysis':
          this.handleStyleAnalysis(payload);
          break;
        case 'client_message':
          this.forwardToClient(payload);
          break;
      }
    });
  }
}
```

### 3. Third-party Services

```typescript
// Service integrations
const integrations = {
  // Color extraction service
  colorAPI: {
    extractPalette: async (imageUrl: string) => {
      const response = await fetch('https://api.color.pizza/v1/', {
        method: 'POST',
        body: JSON.stringify({ imageUrl })
      });
      return response.json();
    }
  },
  
  // Style analysis
  styleAI: {
    analyze: async (images: string[]) => {
      // Integration with style analysis API
    }
  },
  
  // Calendar integration for meetings
  calendar: {
    scheduleMeeting: async (clientId: string, agentId: string) => {
      // Calendly or similar integration
    }
  }
};
```

---

## Deployment Architecture

### Infrastructure

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - VITE_SUPABASE_URL=${SUPABASE_URL}
      - VITE_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
    depends_on:
      - redis
  
  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
  
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
```

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build application
        run: |
          npm ci
          npm run build
          
      - name: Run tests
        run: npm test
        
      - name: Deploy to Vercel
        uses: vercel/action@v2
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

### Monitoring & Analytics

```typescript
// Performance monitoring
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay()
  ],
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0.1,
});

// Custom analytics
class Analytics {
  trackMoodBoardCreated(clientId: string, imageCount: number) {
    gtag('event', 'mood_board_created', {
      client_id: clientId,
      image_count: imageCount,
      timestamp: new Date().toISOString()
    });
  }
  
  trackOnboardingProgress(step: string, duration: number) {
    gtag('event', 'onboarding_progress', {
      step_name: step,
      duration_seconds: duration
    });
  }
}
```

---

## Migration Strategy

### Phase 1: Foundation (Week 1-2)
1. Set up database schema extensions
2. Implement authentication enhancements
3. Create base UI components
4. Set up real-time infrastructure

### Phase 2: Core Features (Week 3-4)
1. Enhanced onboarding flow
2. Mood board functionality
3. Client dashboard improvements
4. Basic agent dashboard

### Phase 3: Advanced Features (Week 5-6)
1. AI integrations
2. Real-time collaboration
3. Advanced analytics
4. Performance optimizations

### Phase 4: Polish & Launch (Week 7-8)
1. UI/UX refinements
2. Testing & bug fixes
3. Documentation
4. Deployment & monitoring

---

## Conclusion

This architecture leverages SISO Agency's existing infrastructure while adding powerful new features for client onboarding and mood board functionality. The design prioritizes reusability, real-time collaboration, and scalability while maintaining security and performance standards.

The modular approach allows for incremental development and testing, reducing risk and ensuring a smooth deployment process.