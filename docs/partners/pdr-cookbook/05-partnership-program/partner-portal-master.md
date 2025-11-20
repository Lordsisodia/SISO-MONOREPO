# Partner Portal Master Document

This file merges the detailed design, audit, and feature breakdown so partner teams only maintain one source.

## Detailed Design Specs

# SISO Partner Portal - Detailed Design Specifications

## 🎯 DESIGN OVERVIEW

This document provides detailed component-level design for the 5 missing pages needed to complete SISO's progressive partner portal system.

---

## 1. 📈 TIER PROGRESSION PAGE (`/tier-progression`)

### Core Components Needed:

#### A. Tier Status Card
**Visual Elements:**
- Large circular progress ring showing % to next tier
- Current tier badge with icon and color
- Days remaining estimate to advancement
- Achievement celebration animations

**Data Requirements:**
- Current tier level (Starter/Active/Performer/Elite)
- Progress metrics (leads referred, sales generated, training completed)
- Historical progression timeline
- Next tier requirements checklist

#### B. Requirements Dashboard
**Component Structure:**
```
┌─ Requirement Categories ─┐
│ 📊 Sales Performance     │ ✅ 5/5 leads this month
│ 🎓 Training Completion   │ ⏳ 3/4 modules done  
│ 👥 Client Satisfaction  │ ✅ 4.8/5.0 rating
│ 📞 Support Engagement   │ ❌ 0/2 calls attended
└─ Time in Current Tier ───┘ ✅ 45/30 days minimum
```

**Interactive Features:**
- Click on incomplete requirements for quick action
- Progress bars with smooth animations
- Celebration effects when requirements completed
- Estimated timeline calculator

#### C. Benefits Preview
**Tier Comparison Table:**
- Current tier benefits (highlighted)
- Next tier benefits (with "coming soon" effects)
- Long-term tier benefits (Elite preview)
- Feature unlock animations

#### D. Historical Timeline
**Visual Timeline Components:**
- Date stamps for each tier advancement
- Achievement badges earned
- Notable milestones and rewards
- Time spent in each tier

### Technical Requirements:
- Real-time progress tracking
- WebSocket updates for instant progress
- Celebration animation library
- Mobile-responsive progress rings
- Push notifications for milestone achievements

---

## 2. 🎯 LEAD MANAGEMENT SYSTEM (`/leads`)

### Core Components Needed:

#### A. Lead Pipeline Dashboard
**Main Dashboard Layout:**
```
┌─ Quick Stats Row ──────────────────────────────┐
│ 📊 Active Leads: 12  💰 Potential: $4,800     │
│ 🔄 In Progress: 8   ✅ Converted: 3           │
└────────────────────────────────────────────────┘

┌─ Lead Pipeline Kanban ─────────────────────────┐
│ New │ Contacted │ Qualified │ Proposal │ Closed │
│  🟡  │    🔵     │    🟢     │    🟠    │   ✅   │
│  3   │     4     │     2     │    2     │   1    │
└────────────────────────────────────────────────┘
```

**Interactive Features:**
- Drag-and-drop between pipeline stages
- Quick action buttons on each lead card
- Bulk actions for multiple leads
- Filtering by source, date, value, status

#### B. Lead Tracking Cards
**Individual Lead Card Components:**
- Contact information and source
- Referral link attribution data
- Communication history timeline
- Next action reminders
- Estimated project value
- Days in current stage

#### C. Referral Link Generator
**Link Management Tools:**
- Custom campaign link creator
- UTM parameter builder
- QR code generator for offline sharing
- Link performance analytics
- Social media sharing buttons

#### D. Attribution Analytics
**Analytics Dashboard:**
- Traffic source breakdown
- Conversion funnel visualization
- ROI per marketing channel
- Geographic lead distribution
- Time-based performance trends

### Tier-Specific Features:
- **Starter**: Basic lead list, simple referral links
- **Active**: Pipeline management, attribution tracking
- **Performer**: Advanced analytics, automation rules
- **Elite**: Custom integrations, API access, white-label tracking

---

## 3. 🎨 MARKETING RESOURCES CENTER (`/marketing-center`)

### Core Components Needed:

#### A. Asset Library Grid
**Organization Structure:**
```
┌─ Categories Sidebar ──┐ ┌─ Asset Grid ─────────┐
│ 📄 Brochures         │ │ [IMG] [IMG] [IMG]    │
│ 📧 Email Templates   │ │ [IMG] [IMG] [IMG]    │
│ 📱 Social Media      │ │ [IMG] [IMG] [IMG]    │
│ 🎥 Video Content     │ │ [▶️ ] [▶️ ] [▶️ ]     │
│ 📊 Proposals         │ │ [PDF] [PDF] [PDF]    │
│ 🎨 Brand Assets      │ │ [PNG] [SVG] [JPG]    │
└───────────────────────┘ └──────────────────────┘
```

**Asset Card Components:**
- Preview thumbnail/icon
- Asset title and description
- File format and size
- Download/preview buttons
- Tier requirement badges
- Usage tracking metrics

#### B. Customization Tools
**Dynamic Content Generator:**
- Partner name/logo insertion
- Custom contact information
- Branded color scheme application
- Template customization wizard
- Preview before download

#### C. Brand Guidelines Hub
**Brand Asset Components:**
- Logo variations (light/dark/color)
- Color palette with hex codes
- Typography guidelines
- Usage do's and don'ts
- Brand voice and messaging

#### D. Performance Tracking
**Asset Analytics:**
- Most downloaded assets
- Conversion rates by asset type
- Partner usage statistics
- A/B testing results for materials

### Tier-Based Access Control:
```javascript
const tierAccess = {
  starter: ['brochures', 'basicEmails', 'logoFiles'],
  active: ['socialMedia', 'proposals', 'customization'],
  performer: ['videoContent', 'webinarSlides', 'advancedTemplates'],
  elite: ['whiteLabel', 'cobranded', 'customAPI']
}
```

---

## 4. 💰 COMMISSION CENTER (`/commissions`)

### Core Components Needed:

#### A. Earnings Overview Dashboard
**Main Stats Display:**
```
┌─ Current Month ─────────────────────────────────┐
│ 💰 Total Earned: $2,847  📈 vs Last Month: +23% │
│ 🎯 Pending: $1,200      📊 Paid: $1,647        │
│ 🏆 Rank: #12/156        ⭐ Bonus: $200         │
└─────────────────────────────────────────────────┘
```

**Interactive Charts:**
- Monthly earnings line chart
- Commission breakdown pie chart
- YTD performance vs goals
- Projection calculator

#### B. Commission Breakdown Table
**Detailed Transaction View:**
| Client Project | Commission Type | Amount | Status | Payment Date |
|---|---|---|---|---|
| TechCorp Website | Referral (20%) | $800 | ✅ Paid | Jan 15 |
| StartupApp PWA | Upsell (5%) | $150 | ⏳ Pending | Feb 1 |
| RetailSite Build | Base (15%) | $600 | 🔄 Processing | - |

**Filter/Sort Options:**
- Date range selector
- Commission type filter
- Status filter
- Amount range
- Client name search

#### C. Payment Management
**Payment Setup Components:**
- Bank account/PayPal configuration
- Payment schedule preferences
- Tax information forms
- Automatic vs manual withdrawals
- Payment history export

#### D. Bonus Tracking
**Bonus System Display:**
- Current bonus eligibility
- Bonus tier requirements
- Historical bonus earnings
- Special promotion tracking
- Achievement-based rewards

### Advanced Features by Tier:
- **Starter**: Basic commission tracking, monthly payments
- **Active**: Real-time tracking, weekly payments, basic analytics
- **Performer**: Advanced reporting, instant payments, goal tracking
- **Elite**: Custom reporting, API access, multi-currency support

---

## 5. 🤝 SUPPORT & COMMUNITY (`/partner-support`)

### Core Components Needed:

#### A. Support Channel Hub
**Tier-Based Support Matrix:**
```
┌─ Your Support Level: Performer ─────────────────┐
│ ✅ Priority Email Support (24h response)        │
│ ✅ Weekly Group Calls                           │
│ ✅ Dedicated Slack Channel                      │
│ 🔒 1-on-1 Support (Elite Only)                  │
│ 🔒 Account Manager (Elite Only)                 │
└──────────────────────────────────────────────────┘
```

**Quick Action Buttons:**
- Submit support ticket
- Schedule 1-on-1 call (if eligible)
- Join community Slack
- Access knowledge base
- Book group call slot

#### B. Ticket Management System
**Support Ticket Interface:**
- Priority level selection
- Category dropdown (technical, billing, training, etc.)
- File attachment support
- Status tracking with notifications
- Response time estimates

#### C. Community Forum
**Forum Structure:**
- General discussions
- Success stories sharing
- Technical troubleshooting
- Marketing tips exchange
- SISO updates and announcements

**Gamification Elements:**
- Community reputation points
- Helpful answer badges
- Top contributor recognition
- Monthly community challenges

#### D. Knowledge Base
**Searchable Resource Library:**
- FAQ with instant search
- Video tutorials library
- Step-by-step guides
- Troubleshooting flowcharts
- Best practices documentation

### Tier-Specific Features:
- **Starter**: Community forum, knowledge base
- **Active**: Email support, monthly group calls
- **Performer**: Priority support, weekly calls, Slack access
- **Elite**: 1-on-1 support, dedicated account manager, direct line

---

## 🛠️ TECHNICAL IMPLEMENTATION NOTES

### Database Schema Additions Needed:
```sql
-- Tier progression tracking
tier_progression (id, partner_id, current_tier, progress_data, next_tier_requirements)

-- Lead management
leads (id, partner_id, contact_info, source, status, value, created_at)
lead_activities (id, lead_id, activity_type, notes, created_at)

-- Marketing assets
marketing_assets (id, title, category, file_url, tier_requirement, usage_count)

-- Commission tracking
commissions (id, partner_id, project_id, amount, type, status, payment_date)

-- Support tickets
support_tickets (id, partner_id, subject, priority, status, responses)
```

### React Component Architecture:
```
src/pages/dashboard/
├── TierProgressionPage.tsx
├── LeadManagementPage.tsx
├── MarketingCenterPage.tsx
├── CommissionCenterPage.tsx
└── PartnerSupportPage.tsx

src/components/partner/
├── ProgressRing.tsx
├── RequirementCard.tsx
├── LeadCard.tsx
├── AssetCard.tsx
├── CommissionChart.tsx
└── SupportTicket.tsx
```

### Key Integration Points:
- WebSocket for real-time updates
- Supabase for database operations
- Stripe for payment processing
- SendGrid for email notifications
- Slack API for community integration

---

## 🚀 DEVELOPMENT PRIORITY ORDER

**Phase 1 (Critical Path):**
1. Tier Progression Page - Core progressive system
2. Enhanced Partner Dashboard - Tier-specific features

**Phase 2 (Revenue Impact):**
3. Lead Management System - Partner success tools
4. Commission Center - Payment transparency

**Phase 3 (Retention & Support):**
5. Marketing Resources Center - Partner enablement
6. Support & Community - Partner satisfaction

Each page should be developed with mobile-first responsive design and accessibility standards (WCAG 2.1 AA compliance).

## Page Audit & Feature Mapping

# SISO Partner Portal - Complete Page Audit & Feature Mapping

## 🔍 EXECUTIVE SUMMARY

**Current Status**: 70% foundation complete, needs progressive tier features  
**Key Finding**: Strong landing page and basic dashboard exist, but lacks tier progression  
**Missing**: Progressive unlocking, advanced tools, tier-specific features

---

## 📋 EXISTING PAGES AUDIT

### 1. Partnership Landing Page (`/partnership`)
**File**: `src/pages/PartnershipPage.tsx`  
**Status**: ✅ **COMPLETE** - Production ready

#### Current Features:
- Hero section with value proposition
- Portfolio showcase with 12 client examples
- 4-step partnership process
- Training preview with course categories
- Partner benefits and commission structure
- Application form integration
- Responsive design with modern UI

#### Strengths:
- Comprehensive marketing funnel
- Professional design with strong CTAs
- Clear value proposition for partners
- Mobile-responsive layout

#### What Partners Get Here:
- Program overview and benefits
- Commission structure transparency
- Application process
- Initial credibility through portfolio

---

### 2. Partner Dashboard (`/partner-dashboard`)
**File**: `src/pages/dashboard/PartnerDashboard.tsx`  
**Status**: ⚠️ **NEEDS ENHANCEMENT** - Basic version exists

#### Current Features:
- Earnings overview with monthly stats
- Commission tracking ($2,847 current)
- Partner leaderboard (top 5)
- Training course preview
- Basic tier display (Silver/Gold/Platinum)
- Quick stats grid

#### Missing Progressive Features:
- [ ] Tier progression tracking
- [ ] Unlockable features per tier
- [ ] Achievement system
- [ ] Advanced analytics for higher tiers
- [ ] Tier-specific tools and resources

#### What Partners Need Here:
- **Starter Tier**: Basic stats, commission tracking
- **Active Tier**: Enhanced analytics, lead tracking
- **Performer Tier**: Advanced tools, priority support
- **Elite Tier**: White-label options, custom reporting

---

### 3. Training Hub (`/training-hub`)
**File**: `src/pages/dashboard/TrainingHub.tsx`  
**Status**: ✅ **STRONG FOUNDATION** - Needs tier restrictions

#### Current Features:
- 6 course categories with progress tracking
- Certification system preview
- Live webinar calendar
- Resource library access
- Learning statistics dashboard
- Achievement display

#### Existing Course Categories:
1. **Sales Fundamentals** (8 modules, 2h)
2. **SISO Platform Mastery** (12 modules, 3h)
3. **Client Management** (6 modules, 1.5h)
4. **Marketing Strategies** (10 modules, 2.5h)
5. **Technical Basics** (5 modules, 1h)
6. **Advanced Techniques** (15 modules, 4h)

#### Progressive Enhancements Needed:
- **Starter**: Access to Sales Fundamentals + Platform Mastery only
- **Active**: Unlock Client Management + Marketing Strategies
- **Performer**: Add Technical Basics + exclusive webinars
- **Elite**: Full access + 1-on-1 coaching sessions

---

## 🚀 MISSING PAGES NEEDED

### 4. Tier Progression Page (`/tier-progression`)
**Status**: 🔴 **MISSING** - Critical for progressive system

#### Required Features:
- Current tier status with visual progress bar
- Requirements for next tier advancement
- Benefits unlocked at each tier
- Historical progression timeline
- Tier-specific challenges and goals

#### Partner Tools Needed:
- Progress tracking dashboard
- Milestone celebrations
- Next tier requirements checklist
- Estimated time to advancement

---

### 5. Lead Management System (`/leads`)
**Status**: 🔴 **MISSING** - Essential for Active+ tiers

#### Required Features:
- Lead tracking and attribution
- Referral link generation
- Conversion funnel analytics
- Follow-up automation tools
- Pipeline management

#### Tier-Specific Access:
- **Starter**: View basic lead status
- **Active**: Full lead management + analytics
- **Performer**: Advanced attribution + automation
- **Elite**: Custom tracking + API access

---

### 6. Marketing Resources (`/marketing-center`)
**Status**: 🔴 **MISSING** - Critical for partner success

#### Required Features:
- Downloadable marketing materials
- Brand guidelines and assets
- Email templates and scripts
- Social media content library
- Customizable proposal templates

#### Progressive Unlocking:
- **Starter**: Basic brochures + email templates
- **Active**: Social media kit + custom proposals
- **Performer**: Video content + webinar slides
- **Elite**: White-label materials + co-branded assets

---

### 7. Commission Center (`/commissions`)
**Status**: 🔴 **MISSING** - Needs detailed tracking

#### Required Features:
- Detailed commission breakdowns
- Payment history and schedules
- Tax documentation access
- Bonus tracking and eligibility
- Withdrawal/payment management

#### Advanced Features for Higher Tiers:
- Real-time commission tracking
- Custom reporting
- Multi-currency support
- Advanced tax reporting

---

### 8. Support & Community (`/partner-support`)
**Status**: 🔴 **MISSING** - Essential for retention

#### Required Features:
- Tier-based support channels
- Community forum access
- Knowledge base
- Ticket system
- Resource library

#### Tier-Specific Support:
- **Starter**: Community forum + knowledge base
- **Active**: Email support + monthly group calls
- **Performer**: Priority support + dedicated Slack
- **Elite**: 1-on-1 support + direct account manager

---

## 🛠️ PARTNER TOOLS BY TIER

### Starter Tier Tools
- Basic dashboard with commission tracking
- Lead referral links
- Core training modules (2 categories)
- Basic marketing materials
- Community forum access

### Active Tier Tools
- Enhanced analytics dashboard
- Lead management system
- Additional training modules (4 categories)
- Social media marketing kit
- Email support access

### Performer Tier Tools
- Advanced reporting and analytics
- Automation tools for follow-ups
- Technical training modules
- Video marketing content
- Priority support channel

### Elite Tier Tools
- White-label marketing materials
- Custom API access for integrations
- Full training library + coaching
- Co-branded proposal templates
- Dedicated account manager

---

## 📊 FEATURE DEVELOPMENT PRIORITY

### Phase 1: Progressive Foundation (Weeks 1-4)
1. Tier progression page with visual tracking
2. Enhanced dashboard with tier-specific features
3. Training hub tier restrictions
4. Basic lead management system

### Phase 2: Core Tools (Weeks 5-8)
1. Marketing resource center
2. Commission center with detailed tracking
3. Partner support system
4. Mobile app companion

### Phase 3: Advanced Features (Weeks 9-12)
1. White-label customization tools
2. API integrations for Elite tier
3. Advanced analytics and reporting
4. Gamification and achievement system

### Phase 4: Optimization (Weeks 13-16)
1. Performance optimization
2. A/B testing framework
3. Advanced automation features
4. Custom integrations

---

## 🎯 IMMEDIATE ACTION ITEMS

1. **Enhance Existing Dashboard** - Add tier progression tracking
2. **Create Tier Progression Page** - Visual journey mapping
3. **Build Lead Management System** - Critical for Active+ partners
4. **Develop Marketing Center** - Resource library with tier access
5. **Implement Support System** - Tier-based support channels

---

## 💡 STRATEGIC RECOMMENDATIONS

### For Partner Success:
- Focus on tools that directly impact partner earnings
- Create clear value differentiation between tiers
- Implement gamification to encourage progression
- Provide tier-specific support to reduce churn

### For SISO Business:
- Track partner progression metrics closely
- Use tier advancement as key retention strategy
- Create exclusive benefits for higher tiers
- Implement automated progression notifications

---

*This audit reveals that SISO has a strong foundation but needs progressive tier features to create the compelling partner experience that drives advancement and retention.*

## Pages & Feature Breakdown

# Partner Portal Pages & Features Breakdown

## Existing Pages Analysis

### 1. PartnerDashboard.tsx (EXISTING - 90% Complete)
**Current Features:**
- Earnings tracking with monthly/quarterly views
- Tier progression display (Silver/Gold/Platinum)
- Commission rate display
- Leaderboard with top performers
- AppPlanMicroChat integration
- Training hub preview section
- Client management overview
- Stats cards (total earnings, active clients, conversion rate)

**Missing Features for Progressive System:**
- Badge/achievement display
- Real-time tier progression bar
- Tier-specific action items
- Performance analytics charts
- Weekly challenges display
- Notification center

### 2. TrainingHub.tsx (EXISTING - 85% Complete)  
**Current Features:**
- Course categories (Sales, Marketing, Product, Technical)
- Learning progress tracking
- Certification system
- Skill level indicators
- Featured learning paths
- Resource library with downloads
- Webinar calendar
- Module progression tracking

**Missing Features for Progressive System:**
- Tier-locked content indication
- Advanced certification tracks
- Interactive skill assessments
- 1:1 coaching booking
- Advanced sales training modules
- Technical deep-dive content

### 3. PartnershipPage.tsx (EXISTING - 100% Complete)
**Current Features:**
- Partnership program marketing
- Portfolio showcase
- Process explanation
- Training highlights
- Performance stats
- AI chat integration
- Requirements section
- Application flow

**Status:** Ready for production

## New Pages Needed

### 4. Partner Onboarding Flow (NEW - High Priority)
**Page:** `/partner/onboarding`
**Features by Tier:**
- **All Tiers:** Welcome sequence, profile setup, legal agreements
- **Starter:** Basic training checklist, first referral guide
- **Active:** Advanced sales training unlock
- **Performer:** Strategic account planning tools
- **Elite:** White-label resources access

### 5. Client Management System (NEW - High Priority)
**Page:** `/partner/clients`
**Features by Tier:**
- **Starter:** Basic client list, contact info, referral status
- **Active:** Pipeline tracking, deal stages, notes system
- **Performer:** Advanced CRM features, automated follow-ups
- **Elite:** Custom client portals, white-label proposals

### 6. Commission & Earnings Center (ENHANCE EXISTING)
**Page:** `/partner/earnings`
**Features by Tier:**
- **All Tiers:** Basic earnings overview, payment history
- **Active:** Detailed commission breakdowns, tax documents
- **Performer:** Performance analytics, forecasting tools
- **Elite:** Real-time payouts, custom reporting

### 7. Marketing Resource Center (NEW - Medium Priority)
**Page:** `/partner/marketing`
**Features by Tier:**
- **Starter:** Basic brochures, email templates, social media posts
- **Active:** Video content library, case studies, ROI calculators
- **Performer:** Custom marketing campaigns, A/B test results
- **Elite:** White-label marketing materials, co-marketing opportunities

### 8. Performance Analytics Dashboard (NEW - Medium Priority)
**Page:** `/partner/analytics`
**Features by Tier:**
- **Starter:** Basic metrics (referrals sent, conversions)
- **Active:** Detailed performance charts, comparison data
- **Performer:** Advanced analytics, cohort analysis, predictive insights
- **Elite:** Custom dashboards, API access, executive reports

### 9. Partner Community Hub (NEW - Low Priority)
**Page:** `/partner/community`
**Features by Tier:**
- **All Tiers:** Partner directory, success stories
- **Active:** Discussion forums, peer networking
- **Performer:** Exclusive mastermind groups, expert AMAs
- **Elite:** Private elite circle, strategic partnerships

### 10. Certification Center (ENHANCE EXISTING)
**Page:** `/partner/certifications`
**Features by Tier:**
- **Starter:** Basic sales certification
- **Active:** Advanced sales + marketing certifications
- **Performer:** Technical certifications, industry specializations
- **Elite:** Master trainer certification, speaking opportunities

## Progressive Feature Unlocking Matrix

| Feature Category | Starter (20%) | Active (22%) | Performer (25%) | Elite (30%) |
|------------------|---------------|--------------|-----------------|-------------|
| **Dashboard** | Basic stats | Real-time updates | Advanced analytics | Custom KPIs |
| **Training** | Core modules | Advanced sales | Technical deep-dives | Master classes |
| **Marketing** | Templates | Video library | Custom campaigns | White-label |
| **Clients** | Basic CRM | Pipeline tracking | Automation | Custom portals |
| **Analytics** | Basic metrics | Performance charts | Predictive insights | Executive reports |
| **Support** | Email support | Priority support | Dedicated manager | Strategic advisor |
| **Earnings** | Monthly payouts | Bi-weekly payouts | Weekly payouts | Real-time payouts |

## Implementation Priority

### Phase 1 (Weeks 1-4): Core Enhancement
1. Enhance PartnerDashboard with progressive features
2. Add tier progression indicators
3. Implement notification system
4. Create onboarding flow

### Phase 2 (Weeks 5-8): Client Management
1. Build comprehensive client management system
2. Add pipeline tracking tools
3. Integrate CRM features
4. Create proposal generation tools

### Phase 3 (Weeks 9-12): Analytics & Marketing
1. Develop performance analytics dashboard
2. Build marketing resource center
3. Add advanced reporting features
4. Create white-label materials

### Phase 4 (Weeks 13-16): Community & Advanced Features
1. Launch partner community hub
2. Add certification enhancements
3. Implement API access for Elite tier
4. Create strategic partnership tools

## Technical Requirements

### Database Tables Needed
- `partner_tiers` - Tier definitions and requirements
- `partner_progress` - Individual partner progression tracking
- `partner_achievements` - Badge and milestone system
- `partner_clients` - Client relationship management
- `partner_earnings` - Detailed commission tracking
- `partner_resources` - Resource access permissions
- `partner_notifications` - Notification preferences and history

### API Endpoints Required
- `/api/partner/tier-progress` - Real-time tier progression
- `/api/partner/achievements` - Badge and milestone tracking
- `/api/partner/analytics` - Performance data
- `/api/partner/resources` - Tier-based resource access
- `/api/partner/clients` - Client management CRUD
- `/api/partner/notifications` - Notification management

### Integration Points
- Supabase real-time subscriptions for tier changes
- Stripe for commission payouts
- Sendgrid for email notifications
- Twilio for SMS notifications
- Zapier for automation workflows

## Success Metrics

### Partner Engagement
- Time spent in portal (target: 15+ min/session)
- Feature adoption rates (target: 80%+ for tier features)
- Training completion rates (target: 90%+ for required modules)

### Business Impact
- Partner retention rate (target: 85%+)
- Average time to next tier (target: <90 days)
- Revenue per partner (target: 20% increase YoY)
- Partner satisfaction score (target: 4.5+/5)