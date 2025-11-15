# SISO-CLIENT-BASE Existing App Research

## Overview
This document captures the existing features, components, and infrastructure in SISO-CLIENT-BASE that can be leveraged for the new client onboarding flow with mood board functionality.

## 🏗️ Core Architecture

### Routing & Navigation
- React Router with protected routes
- Existing client routes: `/client/*`
- Authentication guards: `AuthGuard`, `ClientRoute`, `PartnerAuthGuard`
- Admin-only route protection

### Database (Supabase)
**Existing Tables:**
- `client_onboarding` - Stores onboarding data
- `client_documents` - Stores app plans, wireframes, inspiration
- `banner_templates` - Image storage pattern example
- `users` - User authentication and profiles

**Document Types:**
- 'app_plan'
- 'functionalities'
- 'wireframes'
- 'inspiration'
- Can add: 'mood_board'

## 🔐 Authentication System

### Components
- `AuthGuard` - Protected route wrapper
- `ClientRoute` - Client-specific routes
- `GoogleSignInButton` - Social auth
- `EmailSignInButton` - Email auth
- `SignOutButton` - Logout functionality

### Hooks
- `useSupabaseAuth` - Auth state management
- `useAuthSession` - Session handling
- `useIsClient` - Client type checking
- `useAdminCheck` - Admin verification

## 📝 Existing Onboarding Flow

### BusinessOnboarding Component
- **Location**: `/src/components/onboarding/BusinessOnboarding.tsx`
- **Features**:
  - Interactive chat-based interface
  - Voice/chat/phone communication options
  - Progress tracking (percentage complete)
  - Auto-triggers app plan generation
  - Stores data in localStorage + Supabase

### Current Onboarding Steps
1. Business name
2. Industry/niche
3. Target audience
4. Core values
5. Budget
6. Timeline
7. Contact info

### Forms Available
- `BusinessInfoForm` - Company details
- `SocialLinksForm` - Social media links

## 👥 Client Management Infrastructure

### Components
- `ClientDashboardLayout` - Main dashboard structure
- `ClientDashboardContent` - Dashboard content area
- `ClientDetailSheet` - Detailed client view
- `ClientCard` - Client display cards
- `ClientStatusBadge` - Status indicators
- `ClientInviteDialog` - Invitation system

### Client Data Hooks
- `useClientDetails` - Fetch client with fallback
- `useClientDocuments` - Document management
- `useClientsList` - List all clients
- `useClientData` - General operations

## 🎨 Reusable UI Components

### Basic Components
- Cards, Buttons, Inputs, Dialogs
- Tabs, Badges, Avatars
- Form components with validation
- Toast notifications (Sonner)
- Loading states and skeletons

### Advanced Components
- `MediaBlock` - Image/video upload & display
- `AspectRatio` - Consistent image sizing
- `Carousel` - Image sliders
- `Sheet` - Slide-out panels
- `DropdownMenu` - Action menus
- Progress indicators
- Confetti animations

### Layout Components
- `UnifiedSidebar` - Main navigation
- `DashboardHeader` - Top navigation
- `ScrollArea` - Scrollable containers
- `ResizablePanel` - Adjustable layouts

## 📁 Media & Document Handling

### Existing Media Components
- `MediaBlock` - Upload/display images and videos
- `ClientAppMediaPreview` - Preview app media
- `ImageGallery` pattern (via NFTGallery)
- File upload with drag-and-drop support

### Storage Pattern
```typescript
// Example from client_documents
{
  id: string,
  client_id: string,
  document_type: 'wireframes' | 'app_plan' | 'inspiration',
  content: any,
  created_at: string,
  updated_at: string
}
```

## 🚀 Features to Leverage for Mood Board

### 1. Upload Infrastructure
- `MediaBlock` supports image uploads
- URL-based media import ready
- Supabase storage integration
- File type validation

### 2. Display Components
- Grid layouts (NFTGallery pattern)
- Image previews with AspectRatio
- Carousel for browsing
- Lightbox viewing capability

### 3. Data Storage
- Extend `client_documents` table
- Or create `client_mood_boards` table
- Existing client association patterns
- Permission system in place

### 4. User Flow
- Onboarding flow can be extended
- Progress tracking exists
- Client dashboard integration ready
- Navigation structure supports it

## 📊 Existing Pages & Routes

### Client-Specific Pages
- `/client/dashboard` - Main dashboard
- `/client/documents` - Document management
- `/client/status` - Project status
- `/client/support` - Support access
- `/client/tasks` - Task management

### Shared Pages
- `/portfolio` - Work showcase
- `/help` - Help documentation
- `/app-plan` - App planning tool
- `/timeline` - Project timeline

## 🔧 Technical Utilities

### Data Management
- `clientDataUtils` - Client operations
- `supabaseHelpers` - Database helpers
- `clientQueryBuilders` - Query construction
- `slugUtils` - URL generation

### Type Definitions
```typescript
interface ClientData {
  id: string;
  user_id: string;
  business_name: string;
  industry: string;
  target_audience: string;
  // ... more fields
}

interface ClientDocument {
  id: string;
  client_id: string;
  document_type: string;
  content: any;
  // ... timestamps
}
```

## 🎯 Implementation Strategy

### Quick Wins (Can implement immediately)
1. Extend BusinessOnboarding with mood board step
2. Use MediaBlock for image handling
3. Store in client_documents table
4. Add to client dashboard

### Medium Effort
1. Create dedicated MoodBoardBuilder component
2. Add swipe interface for preferences
3. Industry-specific template system
4. Real-time progress updates

### Considerations
1. Mobile-first (existing components are responsive)
2. Progressive enhancement ready
3. Authentication/permissions handled
4. Database schema flexible

## 📈 Current App Statistics
- **Total Components**: 200+ UI components
- **Client Features**: Full CRUD operations
- **Auth Methods**: Email, Google, Partner login
- **Database**: Supabase with real-time capabilities
- **File Storage**: Integrated with Supabase storage
- **Deployment**: Vite + React setup

## 🔄 Onboarding to Mood Board Flow

### Current Flow
1. Landing → Sign up → Dashboard
2. Start onboarding chat
3. Collect business info
4. Generate app plan
5. Show on dashboard

### Enhanced Flow
1. Landing → Sign up → Dashboard
2. Start onboarding chat
3. Collect business info
4. **NEW: Mood board preferences**
5. Generate enhanced app plan
6. Show progress on dashboard

This research shows we have a robust foundation to build upon. The existing infrastructure supports all requirements for the mood board feature without major architectural changes.