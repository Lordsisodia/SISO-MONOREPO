# Design Preference System (Mood Board)

## 🎯 Task Overview

**Priority**: CRITICAL - Missing feature causing 68% of client complaints
**Impact**: Reduce design revision rounds by 62%
**Timeline**: 6-10 days
**Status**: 🔴 MISSING - Build from scratch

## 📝 Business Requirements

### Problem Statement
Clients struggle to communicate design preferences, leading to:
- Multiple revision rounds (average 3-5 revisions)
- Designer frustration and wasted time
- Client dissatisfaction with final designs
- Project delays due to design iteration

### Solution Overview
**Mood Board with Swipe Interface** that:
- Captures client design preferences intuitively
- Analyzes competitor websites automatically
- Uses AI to extract design patterns
- Creates unique designs better than competitors

## ✨ Feature Specifications

### Core Features
1. **Swipe Interface (Mobile)**
   - Tinder-style card swiping for design elements
   - Visual feedback (red/green overlays)
   - Quick action buttons (like, dislike, save)
   - Progress indicator showing completion

2. **Grid Selection (Desktop)**
   - Multi-select capability
   - Hover previews
   - Bulk operations
   - Advanced filtering by style, color, industry

3. **AI Design Analysis**
   - Extract color palettes from selected images
   - Identify typography patterns
   - Analyze layout structures
   - Generate design recommendations

4. **Competitor Integration**
   - Auto-import competitor website screenshots
   - Side-by-side comparison tools
   - Extract design elements from competitor sites
   - Identify gaps in competitor designs

### User Journey
```
1. Client enters onboarding
2. System shows industry-specific design samples
3. Client swipes/selects preferences (mobile/desktop)
4. AI analyzes selections for patterns
5. System imports competitor designs
6. Client refines preferences with competitor analysis
7. AI generates design brief
8. Designer receives comprehensive preference report
```

## 🏗️ Technical Architecture

### Frontend Components
```
MoodBoardGenerator/
├── MoodBoardSwiper.tsx        # Mobile swipe interface
├── MoodBoardGrid.tsx          # Desktop grid selection
├── DesignAnalyzer.tsx         # AI analysis display
├── CompetitorImporter.tsx     # Competitor website tool
├── PreferenceReport.tsx       # Final report generator
└── MoodBoardProvider.tsx      # State management
```

### Backend Services
```
/api/mood-board/
├── POST /create              # Create new mood board
├── POST /analyze             # AI analysis of selections
├── POST /competitor-import   # Import competitor designs
├── GET /recommendations      # AI design suggestions
└── POST /generate-report     # Final preference report
```

### Database Schema
```sql
-- Main mood board table
mood_boards (
  id uuid PRIMARY KEY,
  client_id uuid REFERENCES profiles(id),
  project_id uuid REFERENCES projects(id),
  industry varchar(100),
  status varchar(50),
  created_at timestamp,
  updated_at timestamp
);

-- Individual image selections
mood_board_images (
  id uuid PRIMARY KEY,
  mood_board_id uuid REFERENCES mood_boards(id),
  image_url text,
  image_category varchar(100),
  preference_score integer, -- 1-5 rating
  ai_analysis_data jsonb,
  created_at timestamp
);

-- Competitor analysis
competitor_designs (
  id uuid PRIMARY KEY,
  mood_board_id uuid REFERENCES mood_boards(id),
  competitor_url text,
  screenshot_url text,
  design_elements jsonb,
  color_palette jsonb,
  created_at timestamp
);

-- AI analysis results
design_preferences (
  id uuid PRIMARY KEY,
  mood_board_id uuid REFERENCES mood_boards(id),
  color_preferences jsonb,
  typography_preferences jsonb,
  layout_preferences jsonb,
  style_keywords text[],
  ai_confidence_score decimal,
  created_at timestamp
);
```

## 🎨 UI/UX Design Specifications

### Mobile Swipe Interface
- **Card Size**: 350px x 250px
- **Swipe Threshold**: 100px horizontal movement
- **Animation**: 300ms ease-out transitions
- **Visual Feedback**: 
  - Green overlay: opacity 0.3 for likes
  - Red overlay: opacity 0.3 for dislikes
- **Progress Bar**: Top of screen, shows completion %

### Desktop Grid View
- **Grid Layout**: 4 columns on desktop, 2 on tablet
- **Card Hover**: Lift effect with shadow
- **Multi-select**: Checkbox overlay on hover
- **Filtering**: Sidebar with style categories
- **Bulk Actions**: Select all, clear all, export

### Color Scheme
```css
--mood-board-bg: #1a1a1a;
--card-bg: #2d2d2d;
--accent-green: #00ff88;
--accent-red: #ff4757;
--text-primary: #ffffff;
--text-secondary: #a0a0a0;
```

## 🔧 Implementation Plan

### Phase 1: Basic Swipe Interface (Days 1-3)
- [ ] Create MoodBoardSwiper component
- [ ] Implement card swipe mechanics
- [ ] Add image collection (stock design samples)
- [ ] Basic preference storage

### Phase 2: AI Analysis (Days 4-6)
- [ ] Integrate Claude API for design analysis
- [ ] Extract color palettes from images
- [ ] Identify design patterns
- [ ] Generate preference reports

### Phase 3: Competitor Integration (Days 7-8)
- [ ] Build competitor website importer
- [ ] Screenshot capture functionality
- [ ] Design element extraction
- [ ] Comparison tools

### Phase 4: Desktop Grid & Polish (Days 9-10)
- [ ] Create desktop grid interface
- [ ] Add filtering and search
- [ ] Performance optimization
- [ ] Testing and bug fixes

## 🧪 Testing Strategy

### Unit Tests
- [ ] Swipe gesture detection
- [ ] Image preference scoring
- [ ] AI analysis accuracy
- [ ] Database operations

### Integration Tests
- [ ] Complete mood board workflow
- [ ] Competitor import process
- [ ] Report generation
- [ ] Cross-device compatibility

### User Testing
- [ ] Mobile swipe usability
- [ ] Desktop grid efficiency
- [ ] AI recommendation quality
- [ ] Overall workflow satisfaction

## 📊 Success Metrics

### Immediate (Week 1)
- [ ] 90% users complete mood board
- [ ] <2 minutes average completion time
- [ ] 85% satisfaction with swipe interface

### Medium-term (Month 1)
- [ ] 62% reduction in design revisions
- [ ] 40% faster design approval process
- [ ] 95% designer satisfaction with briefs

### Long-term (Quarter 1)
- [ ] 25% increase in project profit margins
- [ ] 90% client satisfaction with final designs
- [ ] 50% faster overall project delivery

## 🔗 Integration Points

### Existing Components
- **OnboardingChat.tsx**: Add mood board step
- **ClientDashboard**: Show mood board progress
- **ProjectDetailsPage**: Display design preferences

### New API Endpoints
- Mood board CRUD operations
- AI analysis services
- Competitor data import
- Image storage and retrieval

### Third-party Services
- **Claude API**: Design analysis
- **Puppeteer**: Website screenshots
- **Cloudinary**: Image storage and optimization
- **Color Thief**: Color palette extraction

## 🚨 Technical Risks & Mitigation

### Risk: AI Analysis Accuracy
**Mitigation**: Human review system for AI recommendations

### Risk: Image Loading Performance
**Mitigation**: Progressive loading, image optimization, CDN

### Risk: Competitor Website Access
**Mitigation**: Multiple screenshot services, fallback options

### Risk: Mobile Performance
**Mitigation**: Virtual scrolling, image lazy loading

## 📋 Definition of Done

- [ ] Mobile swipe interface working smoothly
- [ ] Desktop grid view fully functional
- [ ] AI analysis generating useful insights
- [ ] Competitor import working reliably
- [ ] Performance meets benchmarks (<2s load time)
- [ ] All tests passing
- [ ] Documentation complete
- [ ] User testing completed with 85%+ satisfaction