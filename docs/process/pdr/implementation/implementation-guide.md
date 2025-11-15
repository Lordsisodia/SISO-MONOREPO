# SISO Agency Platform - Developer Implementation Guide

## 🚀 Quick Start (20-Hour Sprint)

This guide provides step-by-step implementation instructions for building the SISO Agency Platform based on the comprehensive PDR. The platform features AI-powered PDR automation, progressive unlocking, mood boards, and real-time agent tracking.

### Prerequisites
- Node.js 18+ & npm/yarn
- Supabase CLI installed
- React/TypeScript experience
- Access to SISO codebase (200+ existing components)

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase (Auth, Database, Realtime)
- **AI**: OpenAI API for agent automation
- **Deployment**: Vercel

---

## 📋 Sprint Overview

### Sprint 1: Foundation (Hours 1-5)
- Environment setup & configuration
- Database schema implementation
- Authentication flow
- Base routing structure

### Sprint 2: Core Features (Hours 6-10)
- Progressive unlock system
- Mood board functionality
- Industry landing pages
- Client dashboard structure

### Sprint 3: AI Integration (Hours 11-15)
- Agent orchestration system
- Real-time progress tracking
- PDR automation workflow
- WebSocket connections

### Sprint 4: Polish & Deploy (Hours 16-20)
- Testing & bug fixes
- Performance optimization
- Deployment configuration
- Documentation

---

## 🏗️ Sprint 1: Foundation Setup (Hours 1-5)

### Hour 1: Project Setup & Configuration

#### 1.1 Environment Setup
```bash
# Clone and setup
cd /Users/shaansisodia/Desktop/Cursor/SISO_ECOSYSTEM/SISO-CLIENT-BASE
npm install

# Create environment file
cp .env.example .env.local
```

#### 1.2 Environment Variables
```env
# .env.local
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_OPENAI_API_KEY=your_openai_key
VITE_APP_URL=http://localhost:5173
VITE_STRIPE_PUBLIC_KEY=your_stripe_key
```

#### 1.3 Update Supabase Client
```typescript
// src/integrations/supabase/client.ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})
```

### Hour 2: Database Schema Implementation

#### 2.1 Create Migration Files
```sql
-- migrations/001_agency_core_tables.sql

-- Extend existing profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS
  onboarding_stage TEXT DEFAULT 'initial',
  industry_type TEXT,
  design_preferences JSONB DEFAULT '{}',
  unlock_progress JSONB DEFAULT '{"level": 1, "features": []}',
  last_active_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Projects extension for PDR
ALTER TABLE projects ADD COLUMN IF NOT EXISTS
  pdr_status TEXT DEFAULT 'pending',
  pdr_data JSONB DEFAULT '{}',
  mood_boards JSONB DEFAULT '[]',
  agent_assignments JSONB DEFAULT '[]',
  industry_config JSONB DEFAULT '{}';

-- Agent tracking table
CREATE TABLE IF NOT EXISTS agent_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  agent_type TEXT NOT NULL,
  activity_type TEXT NOT NULL,
  status TEXT DEFAULT 'running',
  progress INTEGER DEFAULT 0,
  data JSONB DEFAULT '{}',
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mood boards table
CREATE TABLE IF NOT EXISTS mood_boards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  images JSONB DEFAULT '[]',
  style_tags TEXT[] DEFAULT '{}',
  color_palette JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Feature unlocks table
CREATE TABLE IF NOT EXISTS feature_unlocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  feature_key TEXT NOT NULL,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unlock_method TEXT DEFAULT 'progression',
  metadata JSONB DEFAULT '{}',
  UNIQUE(user_id, feature_key)
);

-- Industry templates table
CREATE TABLE IF NOT EXISTS industry_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  industry_type TEXT NOT NULL UNIQUE,
  landing_config JSONB NOT NULL,
  default_features JSONB DEFAULT '[]',
  conversion_copy JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 2.2 Create RLS Policies
```sql
-- migrations/002_rls_policies.sql

-- Agent activities policies
ALTER TABLE agent_activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their project agents" ON agent_activities
  FOR SELECT USING (
    project_id IN (
      SELECT id FROM projects WHERE user_id = auth.uid()
    )
  );

-- Mood boards policies
ALTER TABLE mood_boards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their mood boards" ON mood_boards
  FOR ALL USING (user_id = auth.uid());

-- Feature unlocks policies
ALTER TABLE feature_unlocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their unlocks" ON feature_unlocks
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "System can create unlocks" ON feature_unlocks
  FOR INSERT WITH CHECK (true);
```

#### 2.3 Seed Industry Data
```sql
-- migrations/003_seed_industries.sql

INSERT INTO industry_templates (industry_type, landing_config, default_features, conversion_copy) VALUES
('restaurant', 
  '{"hero": {"title": "Transform Your Restaurant with AI", "subtitle": "From menu design to customer apps in 20 hours"}}',
  '["digital_menu", "online_ordering", "reservation_system", "loyalty_program"]',
  '{"cta": "Start Your Restaurant Transformation", "pain_points": ["Outdated paper menus", "No online presence", "Manual reservations"]}'),
  
('barbershop',
  '{"hero": {"title": "Modern Barbershop Management", "subtitle": "Book more appointments with smart scheduling"}}',
  '["appointment_booking", "client_profiles", "service_menu", "reminder_system"]',
  '{"cta": "Modernize Your Barbershop", "pain_points": ["Phone tag for bookings", "No-shows", "Cash-only payments"]}'),

('ecommerce',
  '{"hero": {"title": "Launch Your Online Store", "subtitle": "Professional e-commerce in record time"}}',
  '["product_catalog", "shopping_cart", "payment_processing", "inventory_management"]',
  '{"cta": "Build Your Store Today", "pain_points": ["No online sales", "Manual inventory", "Limited reach"]}');
```

### Hour 3: Authentication & Routing

#### 3.1 Update Auth Flow
```typescript
// src/hooks/useSupabaseAuth.tsx
import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { User } from '@supabase/supabase-js'

export const useSupabaseAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [onboardingStage, setOnboardingStage] = useState<string>('initial')

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchOnboardingStage(session.user.id)
      }
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchOnboardingStage(session.user.id)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchOnboardingStage = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('onboarding_stage')
      .eq('id', userId)
      .single()
    
    if (data) {
      setOnboardingStage(data.onboarding_stage || 'initial')
    }
  }

  return { user, loading, onboardingStage }
}
```

#### 3.2 Create Progressive Unlock Hook
```typescript
// src/hooks/useProgressiveUnlock.ts
import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useSupabaseAuth } from './useSupabaseAuth'

interface UnlockProgress {
  level: number
  unlockedFeatures: string[]
  nextUnlock: string | null
  progress: number
}

export const useProgressiveUnlock = () => {
  const { user } = useSupabaseAuth()
  const [unlockProgress, setUnlockProgress] = useState<UnlockProgress>({
    level: 1,
    unlockedFeatures: [],
    nextUnlock: null,
    progress: 0
  })

  useEffect(() => {
    if (!user) return

    // Fetch unlock progress
    const fetchProgress = async () => {
      const { data: profile } = await supabase
        .from('profiles')
        .select('unlock_progress')
        .eq('id', user.id)
        .single()

      const { data: unlocks } = await supabase
        .from('feature_unlocks')
        .select('feature_key')
        .eq('user_id', user.id)

      if (profile?.unlock_progress) {
        setUnlockProgress({
          ...profile.unlock_progress,
          unlockedFeatures: unlocks?.map(u => u.feature_key) || []
        })
      }
    }

    fetchProgress()

    // Subscribe to changes
    const subscription = supabase
      .channel('unlock_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'feature_unlocks',
        filter: `user_id=eq.${user.id}`
      }, () => {
        fetchProgress()
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [user])

  const unlockFeature = async (featureKey: string) => {
    if (!user) return

    const { error } = await supabase
      .from('feature_unlocks')
      .insert({
        user_id: user.id,
        feature_key: featureKey,
        unlock_method: 'manual'
      })

    if (!error) {
      // Update local state
      setUnlockProgress(prev => ({
        ...prev,
        unlockedFeatures: [...prev.unlockedFeatures, featureKey]
      }))
    }

    return { error }
  }

  return { unlockProgress, unlockFeature }
}
```

### Hour 4: Reusable Component Mapping

#### 4.1 Component Reuse Strategy
```typescript
// src/components/platform/component-mapping.ts

// Map new features to existing components
export const COMPONENT_MAPPING = {
  // Existing components we can reuse
  cards: {
    base: '@/components/ui/card',
    animated: '@/components/ui/animated-card',
    glowing: '@/components/ui/glowing-card',
    dashboard: '@/components/dashboard/DashboardCard'
  },
  
  forms: {
    input: '@/components/ui/input',
    businessInfo: '@/components/onboarding/BusinessInfoForm',
    clientAdd: '@/components/admin/clients/ClientAddForm'
  },
  
  navigation: {
    sidebar: '@/components/sidebar/SidebarNavigation',
    breadcrumb: '@/components/ui/breadcrumb',
    tabs: '@/components/ui/tabs'
  },
  
  progress: {
    linear: '@/components/ui/progress',
    ai: '@/components/ui/ai-progress-indicator',
    tracker: '@/components/dashboard/ProgressTracker'
  },
  
  chat: {
    assistant: '@/components/chat/ChatAssistant',
    bubble: '@/components/ui/chat-bubble',
    expandable: '@/components/ui/expandable-chat'
  }
}

// Components that need modification
export const COMPONENTS_TO_MODIFY = {
  'DashboardLayout': {
    path: '@/components/dashboard/DashboardLayout',
    changes: ['Add agent activity panel', 'Include unlock progress bar']
  },
  'ProjectCard': {
    path: '@/components/projects/ProjectCard',
    changes: ['Add PDR status indicator', 'Show mood board preview']
  }
}

// New components to create
export const NEW_COMPONENTS = [
  'MoodBoardCreator',
  'AgentActivityFeed',
  'UnlockProgressBar',
  'IndustryLandingHero',
  'PDRStatusTracker',
  'FeatureUnlockModal'
]
```

#### 4.2 Create Base Platform Layout
```typescript
// src/components/platform/PlatformLayout.tsx
import { FC, ReactNode } from 'react'
import { UnifiedSidebar } from '@/components/dashboard/UnifiedSidebar'
import { useProgressiveUnlock } from '@/hooks/useProgressiveUnlock'
import { UnlockProgressBar } from './UnlockProgressBar'

interface PlatformLayoutProps {
  children: ReactNode
}

export const PlatformLayout: FC<PlatformLayoutProps> = ({ children }) => {
  const { unlockProgress } = useProgressiveUnlock()

  return (
    <div className="flex h-screen bg-background">
      <UnifiedSidebar />
      <div className="flex-1 flex flex-col">
        <UnlockProgressBar progress={unlockProgress} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
```

### Hour 5: Testing Infrastructure

#### 5.1 Setup Test Environment
```typescript
// src/tests/setup.ts
import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
      onAuthStateChange: vi.fn()
    },
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn()
        }))
      }))
    }))
  }
}))
```

#### 5.2 Create Test Utils
```typescript
// src/tests/utils.tsx
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ReactNode } from 'react'

export const renderWithRouter = (component: ReactNode) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

// Test data factories
export const createMockUser = (overrides = {}) => ({
  id: 'test-user-id',
  email: 'test@example.com',
  onboarding_stage: 'initial',
  ...overrides
})

export const createMockProject = (overrides = {}) => ({
  id: 'test-project-id',
  name: 'Test Project',
  pdr_status: 'pending',
  mood_boards: [],
  ...overrides
})
```

---

## 🎨 Sprint 2: Core Features (Hours 6-10)

### Hour 6: Progressive Unlock System

#### 6.1 Create Unlock Progress Bar
```typescript
// src/components/platform/UnlockProgressBar.tsx
import { FC } from 'react'
import { Progress } from '@/components/ui/progress'
import { Lock, Unlock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface UnlockProgressBarProps {
  progress: {
    level: number
    progress: number
    nextUnlock: string | null
  }
}

export const UnlockProgressBar: FC<UnlockProgressBarProps> = ({ progress }) => {
  return (
    <div className="border-b bg-card px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex items-center gap-2 text-sm",
            progress.level > 1 ? "text-primary" : "text-muted-foreground"
          )}>
            {progress.level > 1 ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
            <span className="font-medium">Level {progress.level}</span>
          </div>
          <Progress value={progress.progress} className="w-32" />
        </div>
        {progress.nextUnlock && (
          <p className="text-sm text-muted-foreground">
            Next unlock: <span className="font-medium">{progress.nextUnlock}</span>
          </p>
        )}
      </div>
    </div>
  )
}
```

#### 6.2 Feature Unlock Modal
```typescript
// src/components/platform/FeatureUnlockModal.tsx
import { FC, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Sparkles, Trophy } from 'lucide-react'
import confetti from 'canvas-confetti'

interface FeatureUnlockModalProps {
  isOpen: boolean
  onClose: () => void
  feature: {
    name: string
    description: string
    icon: string
  }
}

export const FeatureUnlockModal: FC<FeatureUnlockModalProps> = ({ 
  isOpen, 
  onClose, 
  feature 
}) => {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleUnlock = () => {
    setIsAnimating(true)
    
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })

    setTimeout(() => {
      setIsAnimating(false)
      onClose()
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            New Feature Unlocked!
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className={cn(
            "mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center",
            isAnimating && "animate-bounce"
          )}>
            <Sparkles className="h-10 w-10 text-primary" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold">{feature.name}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
          <Button 
            onClick={handleUnlock} 
            className="w-full"
            disabled={isAnimating}
          >
            {isAnimating ? "Unlocking..." : "Awesome! Let's use it"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
```

### Hour 7: Mood Board System

#### 7.1 Mood Board Creator Component
```typescript
// src/components/platform/MoodBoardCreator.tsx
import { FC, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload, X, Palette, Tag } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'

interface MoodBoardCreatorProps {
  projectId: string
  onComplete: () => void
}

export const MoodBoardCreator: FC<MoodBoardCreatorProps> = ({ 
  projectId, 
  onComplete 
}) => {
  const [title, setTitle] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [styleTags, setStyleTags] = useState<string[]>([])
  const [colorPalette, setColorPalette] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setIsUploading(true)
    const uploadedUrls: string[] = []

    for (const file of Array.from(files)) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `mood-boards/${projectId}/${fileName}`

      const { error: uploadError, data } = await supabase.storage
        .from('project-assets')
        .upload(filePath, file)

      if (!uploadError && data) {
        const { data: { publicUrl } } = supabase.storage
          .from('project-assets')
          .getPublicUrl(filePath)
        
        uploadedUrls.push(publicUrl)
      }
    }

    setImages([...images, ...uploadedUrls])
    setIsUploading(false)
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const addStyleTag = (tag: string) => {
    if (tag && !styleTags.includes(tag)) {
      setStyleTags([...styleTags, tag])
    }
  }

  const addColor = (color: string) => {
    if (color && !colorPalette.includes(color)) {
      setColorPalette([...colorPalette, color])
    }
  }

  const saveMoodBoard = async () => {
    const { error } = await supabase
      .from('mood_boards')
      .insert({
        project_id: projectId,
        user_id: (await supabase.auth.getUser()).data.user?.id,
        title,
        images,
        style_tags: styleTags,
        color_palette: { colors: colorPalette }
      })

    if (!error) {
      onComplete()
    }
  }

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Create Your Mood Board</h2>
        <p className="text-muted-foreground">
          Upload images and define the style for your project
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Mood Board Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Modern & Minimalist"
          />
        </div>

        <div>
          <Label>Images</Label>
          <div className="grid grid-cols-3 gap-4 mt-2">
            {images.map((url, index) => (
              <div key={index} className="relative group">
                <img 
                  src={url} 
                  alt={`Mood board ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            
            <label className="border-2 border-dashed border-border rounded-lg h-32 flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={isUploading}
              />
              <div className="text-center">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                <p className="text-sm text-muted-foreground mt-1">
                  {isUploading ? "Uploading..." : "Upload Images"}
                </p>
              </div>
            </label>
          </div>
        </div>

        <div>
          <Label className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Style Tags
          </Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {styleTags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
            <Input
              placeholder="Add tag..."
              className="w-32"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addStyleTag(e.currentTarget.value)
                  e.currentTarget.value = ''
                }
              }}
            />
          </div>
        </div>

        <div>
          <Label className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Color Palette
          </Label>
          <div className="flex gap-2 mt-2">
            {colorPalette.map((color, index) => (
              <div
                key={index}
                className="w-10 h-10 rounded-lg border-2 border-border"
                style={{ backgroundColor: color }}
              />
            ))}
            <Input
              type="color"
              className="w-10 h-10 p-0 border-2"
              onChange={(e) => addColor(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Button 
        onClick={saveMoodBoard}
        disabled={!title || images.length === 0}
        className="w-full"
      >
        Save Mood Board
      </Button>
    </Card>
  )
}
```

### Hour 8: Industry Landing Pages

#### 8.1 Dynamic Industry Landing Component
```typescript
// src/components/platform/IndustryLanding.tsx
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/ui/button'
import { AnimatedHero } from '@/components/ui/animated-hero'
import { FeatureGrid } from '@/components/home/FeatureGrid'
import { TestimonialSection } from '@/components/landing/TestimonialSection'

interface IndustryConfig {
  industry_type: string
  landing_config: {
    hero: {
      title: string
      subtitle: string
    }
  }
  default_features: string[]
  conversion_copy: {
    cta: string
    pain_points: string[]
  }
}

export const IndustryLanding: FC = () => {
  const { industry } = useParams<{ industry: string }>()
  const [config, setConfig] = useState<IndustryConfig | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchConfig = async () => {
      const { data, error } = await supabase
        .from('industry_templates')
        .select('*')
        .eq('industry_type', industry)
        .single()

      if (data && !error) {
        setConfig(data)
      }
      setLoading(false)
    }

    fetchConfig()
  }, [industry])

  if (loading) return <div>Loading...</div>
  if (!config) return <div>Industry not found</div>

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <AnimatedHero
        title={config.landing_config.hero.title}
        subtitle={config.landing_config.hero.subtitle}
        cta={config.conversion_copy.cta}
        ctaLink="/onboarding"
      />

      {/* Pain Points */}
      <section className="py-16 px-6 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Common Challenges We Solve
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {config.conversion_copy.pain_points.map((point, index) => (
              <Card key={index} className="p-6">
                <div className="text-destructive mb-2">✗</div>
                <p className="font-medium">{point}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Features Built for {industry}
          </h2>
          <FeatureGrid features={config.default_features} />
        </div>
      </section>

      {/* Social Proof */}
      <TestimonialSection industry={industry} />

      {/* CTA Section */}
      <section className="py-16 px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your {industry}?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of businesses already using SISO
          </p>
          <Button size="lg" variant="secondary">
            {config.conversion_copy.cta}
          </Button>
        </div>
      </section>
    </div>
  )
}
```

#### 8.2 Industry-Specific Routes
```typescript
// src/App.tsx - Add these routes
import { IndustryLanding } from '@/components/platform/IndustryLanding'

// In your routes configuration
<Route path="/industry/:industry" element={<IndustryLanding />} />
<Route path="/restaurant" element={<Navigate to="/industry/restaurant" />} />
<Route path="/barbershop" element={<Navigate to="/industry/barbershop" />} />
<Route path="/car-rental" element={<Navigate to="/industry/car-rental" />} />
<Route path="/bar" element={<Navigate to="/industry/bar" />} />
<Route path="/agency" element={<Navigate to="/industry/agency" />} />
<Route path="/ecommerce" element={<Navigate to="/industry/ecommerce" />} />
```

### Hour 9: Client Dashboard Structure

#### 9.1 Enhanced Client Dashboard
```typescript
// src/components/platform/ClientDashboard.tsx
import { FC } from 'react'
import { useProgressiveUnlock } from '@/hooks/useProgressiveUnlock'
import { useProjects } from '@/hooks/useProjects'
import { DashboardStats } from '@/components/dashboard/DashboardStats'
import { ProjectProgressCards } from '@/components/dashboard/ProjectProgressCards'
import { AgentActivityFeed } from './AgentActivityFeed'
import { MoodBoardGallery } from './MoodBoardGallery'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const ClientDashboard: FC = () => {
  const { unlockProgress } = useProgressiveUnlock()
  const { projects } = useProjects()

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2">Welcome back!</h1>
        <p className="text-muted-foreground">
          You're at Level {unlockProgress.level} with {unlockProgress.unlockedFeatures.length} features unlocked
        </p>
      </div>

      {/* Stats Overview */}
      <DashboardStats />

      {/* Main Content Tabs */}
      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="agents" disabled={unlockProgress.level < 2}>
            AI Agents
          </TabsTrigger>
          <TabsTrigger value="mood-boards" disabled={unlockProgress.level < 3}>
            Mood Boards
          </TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <ProjectProgressCards projects={projects} />
          <QuickActions />
        </TabsContent>

        <TabsContent value="agents">
          <AgentActivityFeed />
        </TabsContent>

        <TabsContent value="mood-boards">
          <MoodBoardGallery />
        </TabsContent>
      </Tabs>
    </div>
  )
}
```

### Hour 10: Real-time Updates Setup

#### 10.1 Agent Activity Feed Component
```typescript
// src/components/platform/AgentActivityFeed.tsx
import { FC, useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Bot, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { format } from 'date-fns'

interface AgentActivity {
  id: string
  agent_type: string
  activity_type: string
  status: string
  progress: number
  started_at: string
  completed_at?: string
  data: any
}

export const AgentActivityFeed: FC = () => {
  const [activities, setActivities] = useState<AgentActivity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initial fetch
    fetchActivities()

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('agent_activities')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'agent_activities'
      }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setActivities(prev => [payload.new as AgentActivity, ...prev])
        } else if (payload.eventType === 'UPDATE') {
          setActivities(prev => 
            prev.map(a => a.id === payload.new.id ? payload.new as AgentActivity : a)
          )
        }
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const fetchActivities = async () => {
    const { data } = await supabase
      .from('agent_activities')
      .select('*')
      .order('started_at', { ascending: false })
      .limit(20)

    if (data) {
      setActivities(data)
    }
    setLoading(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'running':
        return <Clock className="h-5 w-5 text-blue-500 animate-pulse" />
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Bot className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getAgentColor = (agentType: string) => {
    const colors: Record<string, string> = {
      'market_research': 'bg-blue-500',
      'competitor_analysis': 'bg-purple-500',
      'ui_design': 'bg-pink-500',
      'technical_architecture': 'bg-green-500',
      'content_generation': 'bg-yellow-500'
    }
    return colors[agentType] || 'bg-gray-500'
  }

  if (loading) return <div>Loading agent activities...</div>

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">AI Agent Activity</h2>
      
      <div className="space-y-3">
        {activities.map((activity) => (
          <Card key={activity.id} className="p-4">
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-full ${getAgentColor(activity.agent_type)} flex items-center justify-center text-white`}>
                <Bot className="h-5 w-5" />
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium capitalize">
                      {activity.agent_type.replace('_', ' ')} Agent
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {activity.activity_type}
                    </p>
                  </div>
                  {getStatusIcon(activity.status)}
                </div>
                
                {activity.status === 'running' && (
                  <Progress value={activity.progress} className="h-2" />
                )}
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Started {format(new Date(activity.started_at), 'h:mm a')}</span>
                  {activity.completed_at && (
                    <span>Completed {format(new Date(activity.completed_at), 'h:mm a')}</span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
```

---

## 🤖 Sprint 3: AI Integration (Hours 11-15)

### Hour 11: Agent Orchestration System

#### 11.1 Agent Manager Service
```typescript
// src/services/agents/AgentManager.ts
import { supabase } from '@/integrations/supabase/client'
import { MarketResearchAgent } from './MarketResearchAgent'
import { CompetitorAnalysisAgent } from './CompetitorAnalysisAgent'
import { UIDesignAgent } from './UIDesignAgent'
import { TechnicalArchitectureAgent } from './TechnicalArchitectureAgent'
import { ContentGenerationAgent } from './ContentGenerationAgent'

export interface AgentTask {
  projectId: string
  agentType: string
  taskType: string
  data: any
}

export class AgentManager {
  private agents: Record<string, any> = {
    market_research: new MarketResearchAgent(),
    competitor_analysis: new CompetitorAnalysisAgent(),
    ui_design: new UIDesignAgent(),
    technical_architecture: new TechnicalArchitectureAgent(),
    content_generation: new ContentGenerationAgent()
  }

  async assignTask(task: AgentTask): Promise<string> {
    // Create activity record
    const { data: activity, error } = await supabase
      .from('agent_activities')
      .insert({
        project_id: task.projectId,
        agent_type: task.agentType,
        activity_type: task.taskType,
        status: 'running',
        progress: 0,
        data: task.data
      })
      .select()
      .single()

    if (error || !activity) {
      throw new Error('Failed to create agent activity')
    }

    // Assign to appropriate agent
    const agent = this.agents[task.agentType]
    if (!agent) {
      throw new Error(`Unknown agent type: ${task.agentType}`)
    }

    // Execute task asynchronously
    this.executeTask(agent, task, activity.id)

    return activity.id
  }

  private async executeTask(agent: any, task: AgentTask, activityId: string) {
    try {
      // Update progress periodically
      const progressInterval = setInterval(async () => {
        const progress = agent.getProgress()
        await this.updateProgress(activityId, progress)
      }, 2000)

      // Execute the task
      const result = await agent.execute(task)

      // Clear progress interval
      clearInterval(progressInterval)

      // Update final status
      await supabase
        .from('agent_activities')
        .update({
          status: 'completed',
          progress: 100,
          completed_at: new Date().toISOString(),
          data: { ...task.data, result }
        })
        .eq('id', activityId)

      // Update project PDR data
      await this.updateProjectPDR(task.projectId, task.agentType, result)

    } catch (error) {
      // Handle errors
      await supabase
        .from('agent_activities')
        .update({
          status: 'failed',
          completed_at: new Date().toISOString(),
          data: { ...task.data, error: error.message }
        })
        .eq('id', activityId)
    }
  }

  private async updateProgress(activityId: string, progress: number) {
    await supabase
      .from('agent_activities')
      .update({ progress })
      .eq('id', activityId)
  }

  private async updateProjectPDR(projectId: string, agentType: string, result: any) {
    // Get current PDR data
    const { data: project } = await supabase
      .from('projects')
      .select('pdr_data')
      .eq('id', projectId)
      .single()

    const pdrData = project?.pdr_data || {}
    pdrData[agentType] = result

    // Update project
    await supabase
      .from('projects')
      .update({ 
        pdr_data: pdrData,
        pdr_status: this.calculatePDRStatus(pdrData)
      })
      .eq('id', projectId)
  }

  private calculatePDRStatus(pdrData: any): string {
    const requiredSteps = [
      'market_research',
      'competitor_analysis',
      'ui_design',
      'technical_architecture'
    ]

    const completedSteps = requiredSteps.filter(step => pdrData[step])
    
    if (completedSteps.length === 0) return 'pending'
    if (completedSteps.length < requiredSteps.length) return 'in_progress'
    return 'completed'
  }
}
```

### Hour 12: Individual Agent Implementation

#### 12.1 Market Research Agent
```typescript
// src/services/agents/MarketResearchAgent.ts
import { OpenAI } from 'openai'

export class MarketResearchAgent {
  private openai: OpenAI
  private progress: number = 0

  constructor() {
    this.openai = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    })
  }

  async execute(task: any): Promise<any> {
    this.progress = 0
    
    const steps = [
      { name: 'Industry Analysis', weight: 25 },
      { name: 'Target Audience Research', weight: 25 },
      { name: 'Market Trends', weight: 25 },
      { name: 'Competitive Landscape', weight: 25 }
    ]

    const results: any = {}

    for (const step of steps) {
      this.progress += step.weight * 0.5 // Start of step
      
      const result = await this.performStep(step.name, task.data)
      results[step.name.toLowerCase().replace(' ', '_')] = result
      
      this.progress += step.weight * 0.5 // End of step
    }

    return results
  }

  private async performStep(stepName: string, data: any): Promise<any> {
    const prompts: Record<string, string> = {
      'Industry Analysis': `Analyze the ${data.industry} industry for a ${data.businessType} business. Include market size, growth trends, and key players.`,
      'Target Audience Research': `Define target audience segments for a ${data.businessType} in the ${data.industry} industry. Include demographics, psychographics, and pain points.`,
      'Market Trends': `Identify current and emerging trends in the ${data.industry} industry that would impact a ${data.businessType}.`,
      'Competitive Landscape': `Map the competitive landscape for a ${data.businessType} in the ${data.industry} industry.`
    }

    const completion = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a market research expert. Provide detailed, actionable insights."
        },
        {
          role: "user",
          content: prompts[stepName] || ''
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    })

    return {
      content: completion.choices[0].message.content,
      timestamp: new Date().toISOString()
    }
  }

  getProgress(): number {
    return this.progress
  }
}
```

### Hour 13: PDR Automation Workflow

#### 13.1 PDR Automation Service
```typescript
// src/services/PDRAutomationService.ts
import { AgentManager } from './agents/AgentManager'
import { supabase } from '@/integrations/supabase/client'

export class PDRAutomationService {
  private agentManager: AgentManager

  constructor() {
    this.agentManager = new AgentManager()
  }

  async startPDRProcess(projectId: string, config: any): Promise<void> {
    // Define the PDR workflow stages
    const workflow = [
      {
        stage: 'market_research',
        agents: ['market_research'],
        parallel: false
      },
      {
        stage: 'competitive_analysis',
        agents: ['competitor_analysis'],
        parallel: false
      },
      {
        stage: 'design_planning',
        agents: ['ui_design', 'content_generation'],
        parallel: true
      },
      {
        stage: 'technical_planning',
        agents: ['technical_architecture'],
        parallel: false
      }
    ]

    // Update project status
    await supabase
      .from('projects')
      .update({ pdr_status: 'in_progress' })
      .eq('id', projectId)

    // Execute workflow
    for (const stage of workflow) {
      if (stage.parallel) {
        // Run agents in parallel
        await Promise.all(
          stage.agents.map(agentType => 
            this.agentManager.assignTask({
              projectId,
              agentType,
              taskType: `${stage.stage}_analysis`,
              data: config
            })
          )
        )
      } else {
        // Run agents sequentially
        for (const agentType of stage.agents) {
          await this.agentManager.assignTask({
            projectId,
            agentType,
            taskType: `${stage.stage}_analysis`,
            data: config
          })
          
          // Wait for completion before next agent
          await this.waitForAgentCompletion(projectId, agentType)
        }
      }
    }
  }

  private async waitForAgentCompletion(projectId: string, agentType: string): Promise<void> {
    return new Promise((resolve) => {
      const checkInterval = setInterval(async () => {
        const { data } = await supabase
          .from('agent_activities')
          .select('status')
          .eq('project_id', projectId)
          .eq('agent_type', agentType)
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        if (data?.status === 'completed' || data?.status === 'failed') {
          clearInterval(checkInterval)
          resolve()
        }
      }, 3000)
    })
  }

  async generatePDRDocument(projectId: string): Promise<string> {
    // Fetch all PDR data
    const { data: project } = await supabase
      .from('projects')
      .select('pdr_data, name, industry_config')
      .eq('id', projectId)
      .single()

    if (!project?.pdr_data) {
      throw new Error('No PDR data available')
    }

    // Generate comprehensive PDR document
    const pdrSections = [
      this.generateExecutiveSummary(project),
      this.generateMarketAnalysis(project.pdr_data.market_research),
      this.generateCompetitiveAnalysis(project.pdr_data.competitor_analysis),
      this.generateDesignStrategy(project.pdr_data.ui_design),
      this.generateTechnicalArchitecture(project.pdr_data.technical_architecture),
      this.generateImplementationPlan(project)
    ]

    return pdrSections.join('\n\n---\n\n')
  }

  private generateExecutiveSummary(project: any): string {
    return `# Project Development Report: ${project.name}

## Executive Summary

This comprehensive PDR outlines the strategic approach for developing ${project.name}, 
targeting the ${project.industry_config?.industry} industry.

Generated: ${new Date().toLocaleDateString()}
Status: Complete`
  }

  private generateMarketAnalysis(data: any): string {
    if (!data) return ''
    
    return `## Market Analysis

${data.industry_analysis?.content || ''}

### Target Audience
${data.target_audience_research?.content || ''}

### Market Trends
${data.market_trends?.content || ''}`
  }

  private generateCompetitiveAnalysis(data: any): string {
    if (!data) return ''
    
    return `## Competitive Analysis

${data.content || ''}`
  }

  private generateDesignStrategy(data: any): string {
    if (!data) return ''
    
    return `## Design Strategy

${data.content || ''}`
  }

  private generateTechnicalArchitecture(data: any): string {
    if (!data) return ''
    
    return `## Technical Architecture

${data.content || ''}`
  }

  private generateImplementationPlan(project: any): string {
    return `## Implementation Plan

### Phase 1: Foundation (Hours 1-5)
- Environment setup
- Database implementation
- Authentication flow

### Phase 2: Core Features (Hours 6-10)
- Industry-specific features
- Client dashboard
- Basic integrations

### Phase 3: Advanced Features (Hours 11-15)
- AI agent integration
- Real-time updates
- Progressive unlocking

### Phase 4: Launch (Hours 16-20)
- Testing & QA
- Performance optimization
- Deployment`
  }
}
```

### Hour 14: WebSocket Real-time Connections

#### 14.1 Real-time Connection Manager
```typescript
// src/services/RealtimeConnectionManager.ts
import { supabase } from '@/integrations/supabase/client'
import { RealtimeChannel } from '@supabase/supabase-js'

export class RealtimeConnectionManager {
  private channels: Map<string, RealtimeChannel> = new Map()
  private callbacks: Map<string, Set<Function>> = new Map()

  subscribeToProject(projectId: string, callback: (data: any) => void): () => void {
    const channelKey = `project:${projectId}`
    
    if (!this.channels.has(channelKey)) {
      const channel = supabase
        .channel(channelKey)
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'agent_activities',
          filter: `project_id=eq.${projectId}`
        }, (payload) => {
          this.notifyCallbacks(channelKey, { type: 'agent_activity', payload })
        })
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'projects',
          filter: `id=eq.${projectId}`
        }, (payload) => {
          this.notifyCallbacks(channelKey, { type: 'project_update', payload })
        })
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'mood_boards',
          filter: `project_id=eq.${projectId}`
        }, (payload) => {
          this.notifyCallbacks(channelKey, { type: 'mood_board', payload })
        })
        .subscribe()

      this.channels.set(channelKey, channel)
    }

    // Add callback
    if (!this.callbacks.has(channelKey)) {
      this.callbacks.set(channelKey, new Set())
    }
    this.callbacks.get(channelKey)!.add(callback)

    // Return unsubscribe function
    return () => {
      const callbacks = this.callbacks.get(channelKey)
      if (callbacks) {
        callbacks.delete(callback)
        if (callbacks.size === 0) {
          this.channels.get(channelKey)?.unsubscribe()
          this.channels.delete(channelKey)
          this.callbacks.delete(channelKey)
        }
      }
    }
  }

  subscribeToAgentUpdates(callback: (data: any) => void): () => void {
    const channelKey = 'global:agents'
    
    if (!this.channels.has(channelKey)) {
      const channel = supabase
        .channel(channelKey)
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'agent_activities'
        }, (payload) => {
          this.notifyCallbacks(channelKey, payload)
        })
        .subscribe()

      this.channels.set(channelKey, channel)
    }

    if (!this.callbacks.has(channelKey)) {
      this.callbacks.set(channelKey, new Set())
    }
    this.callbacks.get(channelKey)!.add(callback)

    return () => {
      const callbacks = this.callbacks.get(channelKey)
      if (callbacks) {
        callbacks.delete(callback)
        if (callbacks.size === 0) {
          this.channels.get(channelKey)?.unsubscribe()
          this.channels.delete(channelKey)
          this.callbacks.delete(channelKey)
        }
      }
    }
  }

  private notifyCallbacks(channelKey: string, data: any) {
    const callbacks = this.callbacks.get(channelKey)
    if (callbacks) {
      callbacks.forEach(callback => callback(data))
    }
  }

  disconnect() {
    this.channels.forEach(channel => channel.unsubscribe())
    this.channels.clear()
    this.callbacks.clear()
  }
}

// Export singleton instance
export const realtimeManager = new RealtimeConnectionManager()
```

### Hour 15: Integration Testing

#### 15.1 Integration Test Suite
```typescript
// src/tests/integration/PDRAutomation.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { PDRAutomationService } from '@/services/PDRAutomationService'
import { supabase } from '@/integrations/supabase/client'

describe('PDR Automation Integration', () => {
  let pdrService: PDRAutomationService
  const mockProjectId = 'test-project-123'

  beforeEach(() => {
    pdrService = new PDRAutomationService()
    vi.clearAllMocks()
  })

  it('should start PDR process successfully', async () => {
    // Mock Supabase responses
    vi.spyOn(supabase.from('projects'), 'update').mockReturnValue({
      eq: vi.fn().mockResolvedValue({ data: {}, error: null })
    } as any)

    const config = {
      industry: 'restaurant',
      businessType: 'fast-casual dining'
    }

    await expect(
      pdrService.startPDRProcess(mockProjectId, config)
    ).resolves.not.toThrow()
  })

  it('should handle agent failures gracefully', async () => {
    // Mock agent failure
    vi.spyOn(supabase.from('agent_activities'), 'insert').mockReturnValue({
      select: vi.fn().mockReturnValue({
        single: vi.fn().mockResolvedValue({ 
          data: null, 
          error: new Error('Agent failed') 
        })
      })
    } as any)

    await expect(
      pdrService.startPDRProcess(mockProjectId, {})
    ).rejects.toThrow('Failed to create agent activity')
  })
})
```

#### 15.2 Component Integration Tests
```typescript
// src/tests/integration/ProgressiveUnlock.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { ClientDashboard } from '@/components/platform/ClientDashboard'
import { BrowserRouter } from 'react-router-dom'

describe('Progressive Unlock Integration', () => {
  it('should show locked features based on user level', async () => {
    render(
      <BrowserRouter>
        <ClientDashboard />
      </BrowserRouter>
    )

    await waitFor(() => {
      // Check that AI Agents tab is disabled for level 1 users
      const agentsTab = screen.getByText('AI Agents')
      expect(agentsTab.closest('button')).toHaveAttribute('disabled')
    })
  })

  it('should unlock features when user progresses', async () => {
    // Test feature unlock flow
    render(
      <BrowserRouter>
        <ClientDashboard />
      </BrowserRouter>
    )

    // Simulate user progression
    // Check that previously locked features become available
  })
})
```

---

## 🚀 Sprint 4: Polish & Deploy (Hours 16-20)

### Hour 16: Performance Optimization

#### 16.1 Code Splitting & Lazy Loading
```typescript
// src/App.tsx - Optimize bundle size
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

// Lazy load heavy components
const IndustryLanding = lazy(() => import('@/components/platform/IndustryLanding'))
const ClientDashboard = lazy(() => import('@/components/platform/ClientDashboard'))
const MoodBoardCreator = lazy(() => import('@/components/platform/MoodBoardCreator'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/industry/:industry" element={<IndustryLanding />} />
        <Route path="/dashboard" element={<ClientDashboard />} />
        <Route path="/mood-board/create" element={<MoodBoardCreator />} />
      </Routes>
    </Suspense>
  )
}
```

#### 16.2 Query Optimization
```typescript
// src/hooks/useOptimizedProjects.ts
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'

export const useOptimizedProjects = (userId: string) => {
  return useQuery({
    queryKey: ['projects', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          id,
          name,
          pdr_status,
          created_at,
          agent_activities!inner(
            agent_type,
            status,
            progress
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(10)

      if (error) throw error
      return data
    },
    staleTime: 30000, // Cache for 30 seconds
    cacheTime: 300000, // Keep in cache for 5 minutes
  })
}
```

### Hour 17: Bug Fixes & Edge Cases

#### 17.1 Error Boundary Implementation
```typescript
// src/components/ErrorBoundary.tsx
import { Component, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    
    // Send to error tracking service
    if (import.meta.env.PROD) {
      // Sentry.captureException(error)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center space-y-4">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
            <h1 className="text-2xl font-bold">Something went wrong</h1>
            <p className="text-muted-foreground">
              We're sorry for the inconvenience. Please try refreshing the page.
            </p>
            <Button onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
```

### Hour 18: Deployment Configuration

#### 18.1 Environment Configuration
```typescript
// src/config/environment.ts
interface Environment {
  supabaseUrl: string
  supabaseAnonKey: string
  openaiApiKey: string
  appUrl: string
  stripePublicKey: string
  isDevelopment: boolean
  isProduction: boolean
}

export const env: Environment = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  openaiApiKey: import.meta.env.VITE_OPENAI_API_KEY,
  appUrl: import.meta.env.VITE_APP_URL,
  stripePublicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD
}

// Validate required env vars
const requiredVars = [
  'supabaseUrl',
  'supabaseAnonKey',
  'appUrl'
]

for (const varName of requiredVars) {
  if (!env[varName as keyof Environment]) {
    throw new Error(`Missing required environment variable: ${varName}`)
  }
}
```

#### 18.2 Vercel Deployment Config
```json
// vercel.json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ],
  "env": {
    "VITE_SUPABASE_URL": "@supabase_url",
    "VITE_SUPABASE_ANON_KEY": "@supabase_anon_key",
    "VITE_OPENAI_API_KEY": "@openai_api_key",
    "VITE_STRIPE_PUBLIC_KEY": "@stripe_public_key"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### Hour 19: Documentation

#### 19.1 API Documentation
```markdown
# SISO Agency Platform API Documentation

## Authentication
All API requests require authentication via Supabase Auth JWT tokens.

### Headers
```
Authorization: Bearer <jwt_token>
```

## Endpoints

### Projects
- GET `/api/projects` - List user projects
- POST `/api/projects` - Create new project
- GET `/api/projects/:id` - Get project details
- PUT `/api/projects/:id` - Update project

### Agent Activities
- GET `/api/agent-activities?project_id=:id` - List activities for project
- POST `/api/agent-activities` - Create new agent task

### Mood Boards
- GET `/api/mood-boards?project_id=:id` - List project mood boards
- POST `/api/mood-boards` - Create mood board
- PUT `/api/mood-boards/:id` - Update mood board

### Feature Unlocks
- GET `/api/feature-unlocks` - List user's unlocked features
- POST `/api/feature-unlocks` - Unlock a feature
```

### Hour 20: Final Testing & Launch Checklist

#### 20.1 Launch Checklist
```markdown
# SISO Agency Platform Launch Checklist

## Pre-Launch Testing
- [ ] All unit tests passing
- [ ] Integration tests completed
- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] Mobile responsiveness verified
- [ ] Load testing completed (handle 100+ concurrent users)
- [ ] Security audit performed

## Database
- [ ] All migrations applied to production
- [ ] RLS policies tested and verified
- [ ] Backup strategy in place
- [ ] Monitoring configured

## Features
- [ ] Progressive unlock system working
- [ ] Mood board creation and display
- [ ] Agent automation triggering correctly
- [ ] Real-time updates functioning
- [ ] Industry landing pages live

## Performance
- [ ] Bundle size < 500KB (initial)
- [ ] Lighthouse score > 90
- [ ] Core Web Vitals passing
- [ ] Images optimized and lazy loaded

## Deployment
- [ ] Environment variables configured
- [ ] SSL certificate active
- [ ] CDN configured
- [ ] Error tracking enabled
- [ ] Analytics installed

## Legal & Compliance
- [ ] Privacy policy updated
- [ ] Terms of service updated
- [ ] Cookie consent implemented
- [ ] GDPR compliance verified

## Post-Launch
- [ ] Monitor error rates
- [ ] Track conversion metrics
- [ ] Gather user feedback
- [ ] Plan iteration 2
```

---

## 🎯 Developer Tips & Best Practices

### Common Pitfalls to Avoid
1. **State Management**: Use React Query for server state, avoid prop drilling
2. **Type Safety**: Always define TypeScript interfaces for Supabase tables
3. **Real-time Subscriptions**: Remember to unsubscribe to prevent memory leaks
4. **Error Handling**: Implement proper error boundaries and user feedback
5. **Performance**: Lazy load heavy components and optimize images

### Performance Optimization
1. **Code Splitting**: Use dynamic imports for route-based splitting
2. **Image Optimization**: Use Next.js Image or lazy loading
3. **Query Optimization**: Use select() to limit data fetched
4. **Caching Strategy**: Implement React Query for intelligent caching
5. **Bundle Analysis**: Regular checks with webpack-bundle-analyzer

### Debugging Strategies
1. **React DevTools**: Essential for component debugging
2. **Network Tab**: Monitor Supabase requests and WebSocket connections
3. **Console Logging**: Strategic logging for agent activities
4. **Error Tracking**: Sentry integration for production issues
5. **Performance Profiling**: Use Chrome DevTools Performance tab

### Code Organization
```
src/
├── components/
│   ├── platform/       # New platform components
│   ├── ui/            # Reusable UI components
│   └── features/      # Feature-specific components
├── hooks/             # Custom React hooks
├── services/          # Business logic & API calls
│   ├── agents/       # AI agent implementations
│   └── realtime/     # WebSocket managers
├── utils/            # Helper functions
└── types/            # TypeScript definitions
```

---

## 🚀 Quick Reference Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run test            # Run tests
npm run lint            # Lint code

# Database
supabase db push        # Apply migrations
supabase db reset       # Reset database
supabase functions serve # Test edge functions

# Deployment
vercel --prod           # Deploy to production
vercel --preview        # Deploy preview
```

---

This implementation guide provides a complete roadmap for building the SISO Agency Platform in 20 hours. Follow the sprints sequentially, leverage existing components, and focus on delivering core functionality first. Remember to test continuously and keep the user experience at the forefront of all decisions.