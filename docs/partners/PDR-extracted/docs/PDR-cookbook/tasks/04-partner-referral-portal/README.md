# Partner Referral Portal (Commission Tracking System)

## 🎯 **ULTRA CONTEXT TASK OVERVIEW**

**Priority**: HIGH - Revenue multiplication through partnerships
**Impact**: Enable 30% of revenue through partner referrals within 6 months
**Timeline**: 5-6 days (Week 4, Backend Phase)
**Status**: 🔴 NEW - Build comprehensive partner ecosystem
**Breaking Risk**: 🟢 ZERO - Independent system, no existing functionality affected

## 📝 **BUSINESS CONTEXT & ULTRA THINK REASONING**

### **Problem Statement**
- **Manual referral tracking** = lost commissions and partner disputes
- **No partner visibility** = partners don't know referral status
- **Inconsistent commission rates** = confusion and unfair compensation
- **No partner performance data** = can't optimize partner relationships
- **Administrative overhead** = manual commission calculations and payments

### **PDR Vision: Automated Partner Ecosystem**
**"Partner Referral Portal"** should be the **revenue multiplication engine** that enables:
- **Automated commission tracking** for all partner referrals
- **Real-time partner dashboard** showing earnings and referral status
- **Tiered commission structure** rewarding top-performing partners
- **Performance analytics** optimizing partner relationships
- **Automated payments** streamlining commission distribution

### **Ultra Think: Partnership Economics**
- **Revenue Multiplication** = Partners bring customers we can't reach
- **Cost Efficiency** = Partners cost less than paid advertising
- **Quality Leads** = Referred customers have higher lifetime value
- **Market Expansion** = Partners provide local market access
- **Scalability** = Partner network grows exponentially

### **Strategic Value Proposition**
- **For Partners**: Transparent earnings, easy referral process, competitive rates
- **For Agency**: Expanded reach, quality leads, predictable growth channel
- **For Clients**: Trusted referrals from local experts

## 🏗️ **EXISTING INFRASTRUCTURE ANALYSIS**

### **Current Partner Tracking**
```typescript
// EXISTING: Basic partner stats hook found
// src/hooks/usePartnerStats.ts
// ASSESSMENT: Minimal functionality, needs comprehensive expansion
```

### **User Management Foundation**
```sql
-- EXISTING: User/profile system
profiles (
  id UUID,
  email VARCHAR(255),
  user_type VARCHAR(50), -- can add 'partner'
  -- Can be extended for partner relationships
);

-- STRATEGY: Build partner system on existing user foundation
```

### **Payment Integration Opportunity**
```typescript
// EXISTING: Payment processing components found
// src/components/admin/AdminPayments.tsx
// STRATEGY: Leverage existing payment infrastructure for commission payouts
```

## ✨ **PARTNER REFERRAL PORTAL SPECIFICATIONS**

### **Component 1: Partner Management System**

#### **Comprehensive Partner Lifecycle Management**
```typescript
// NEW: services/partnerManager.ts
export class PartnerManager {
  private commissionEngine: CommissionEngine;
  private paymentProcessor: PaymentProcessor;
  private analytics: PartnerAnalytics;
  private notificationService: NotificationService;

  constructor() {
    this.commissionEngine = new CommissionEngine();
    this.paymentProcessor = new PaymentProcessor();
    this.analytics = new PartnerAnalytics();
    this.notificationService = new NotificationService();
  }

  async registerPartner(partnerApplication: PartnerApplication): Promise<PartnerRegistrationResult> {
    // Validate application
    const validation = await this.validatePartnerApplication(partnerApplication);
    if (!validation.valid) {
      return {
        success: false,
        errors: validation.errors
      };
    }

    // Create partner profile
    const partnerId = await this.createPartnerProfile(partnerApplication);
    
    // Set up commission structure
    const commissionTier = await this.determineInitialCommissionTier(partnerApplication);
    await this.setupCommissionStructure(partnerId, commissionTier);

    // Generate referral tracking materials
    const trackingMaterials = await this.generateTrackingMaterials(partnerId);

    // Send welcome package
    await this.sendPartnerWelcomePackage(partnerId, trackingMaterials);

    return {
      success: true,
      partnerId: partnerId,
      trackingCode: trackingMaterials.primaryCode,
      commissionTier: commissionTier,
      dashboardUrl: this.generatePartnerDashboardUrl(partnerId)
    };
  }

  async trackReferral(
    trackingCode: string, 
    clientData: ReferralClientData,
    source: ReferralSource
  ): Promise<ReferralTrackingResult> {
    const partner = await this.getPartnerByTrackingCode(trackingCode);
    if (!partner) {
      throw new Error('Invalid tracking code');
    }

    // Create referral record
    const referral: PartnerReferral = {
      id: generateReferralId(),
      partnerId: partner.id,
      clientData: clientData,
      source: source,
      status: 'new',
      trackingCode: trackingCode,
      referredAt: new Date(),
      commissionRate: await this.getCurrentCommissionRate(partner.id),
      estimatedCommission: await this.calculateEstimatedCommission(partner.id, clientData.projectValue)
    };

    await this.saveReferral(referral);

    // Update partner stats
    await this.updatePartnerStats(partner.id, 'referral_received');

    // Notify partner
    await this.notificationService.notifyPartnerOfReferral(partner.id, referral);

    // Check for tier upgrade
    await this.checkAndProcessTierUpgrade(partner.id);

    return {
      referralId: referral.id,
      trackingSuccess: true,
      estimatedCommission: referral.estimatedCommission,
      commissionRate: referral.commissionRate
    };
  }

  async updateReferralStatus(
    referralId: string, 
    newStatus: ReferralStatus,
    metadata?: ReferralStatusMetadata
  ): Promise<void> {
    const referral = await this.getReferral(referralId);
    const oldStatus = referral.status;
    
    referral.status = newStatus;
    referral.statusUpdatedAt = new Date();
    
    if (metadata) {
      referral.metadata = { ...referral.metadata, ...metadata };
    }

    // Calculate commission if project completed
    if (newStatus === 'project_completed' && metadata?.finalProjectValue) {
      referral.finalCommission = await this.commissionEngine.calculateFinalCommission(
        referral.partnerId,
        metadata.finalProjectValue,
        referral.commissionRate
      );
      
      referral.commissionStatus = 'calculated';
      await this.scheduleCommissionPayment(referral);
    }

    await this.saveReferral(referral);

    // Notify partner of status change
    await this.notificationService.notifyPartnerOfStatusChange(
      referral.partnerId, 
      referral, 
      oldStatus, 
      newStatus
    );

    // Update analytics
    await this.analytics.recordReferralStatusChange(referral, oldStatus, newStatus);
  }

  async generatePartnerMaterials(partnerId: string): Promise<PartnerMaterials> {
    const partner = await this.getPartner(partnerId);
    
    return {
      trackingLinks: await this.generateTrackingLinks(partnerId),
      marketingAssets: await this.generateMarketingAssets(partner),
      emailTemplates: await this.generateEmailTemplates(partner),
      socialMediaContent: await this.generateSocialMediaContent(partner),
      landingPages: await this.generateCustomLandingPages(partner),
      qrCodes: await this.generateQRCodes(partnerId)
    };
  }

  private async determineInitialCommissionTier(application: PartnerApplication): Promise<CommissionTier> {
    let score = 0;
    
    // Business size scoring
    if (application.businessType === 'agency') score += 30;
    if (application.clientCount > 50) score += 20;
    if (application.averageProjectValue > 10000) score += 25;
    
    // Experience scoring
    if (application.yearsInBusiness > 5) score += 15;
    if (application.portfolioQuality === 'excellent') score += 10;
    
    // Determine tier
    if (score >= 80) return 'platinum';
    if (score >= 60) return 'gold';
    if (score >= 40) return 'silver';
    return 'bronze';
  }

  private async generateTrackingLinks(partnerId: string): Promise<TrackingLinks> {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const trackingCode = await this.getPartnerTrackingCode(partnerId);
    
    return {
      general: `${baseUrl}?ref=${trackingCode}`,
      restaurant: `${baseUrl}/restaurant?ref=${trackingCode}`,
      ecommerce: `${baseUrl}/ecommerce?ref=${trackingCode}`,
      professional: `${baseUrl}/professional?ref=${trackingCode}`,
      custom: `${baseUrl}/custom?ref=${trackingCode}&partner=${partnerId}`,
      shortLinks: await this.generateShortLinks(trackingCode)
    };
  }
}

interface PartnerApplication {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  website?: string;
  businessType: 'agency' | 'freelancer' | 'consultant' | 'reseller';
  clientCount: number;
  averageProjectValue: number;
  yearsInBusiness: number;
  portfolioQuality: 'basic' | 'good' | 'excellent';
  referralSource: string;
  expectedReferrals: number; // per month
  marketingChannels: string[];
}

interface PartnerReferral {
  id: string;
  partnerId: string;
  clientData: ReferralClientData;
  source: ReferralSource;
  status: ReferralStatus;
  trackingCode: string;
  referredAt: Date;
  statusUpdatedAt?: Date;
  commissionRate: number;
  estimatedCommission: number;
  finalCommission?: number;
  commissionStatus: 'pending' | 'calculated' | 'paid';
  metadata?: Record<string, any>;
}

type ReferralStatus = 
  | 'new' 
  | 'contacted' 
  | 'qualified' 
  | 'proposal_sent' 
  | 'project_started' 
  | 'project_completed' 
  | 'commission_paid' 
  | 'cancelled';

type CommissionTier = 'bronze' | 'silver' | 'gold' | 'platinum';
```

### **Component 2: Commission Engine**

#### **Sophisticated Commission Calculation and Management**
```typescript
// NEW: services/commissionEngine.ts
export class CommissionEngine {
  private tierDefinitions: Map<CommissionTier, TierDefinition>;
  private bonusCalculator: BonusCalculator;
  private paymentScheduler: PaymentScheduler;

  constructor() {
    this.initializeTierDefinitions();
    this.bonusCalculator = new BonusCalculator();
    this.paymentScheduler = new PaymentScheduler();
  }

  async calculateFinalCommission(
    partnerId: string,
    projectValue: number,
    baseCommissionRate: number
  ): Promise<CommissionCalculation> {
    const partner = await this.getPartner(partnerId);
    const tierDefinition = this.tierDefinitions.get(partner.currentTier);
    
    // Base commission
    let baseCommission = projectValue * baseCommissionRate;
    
    // Apply tier multiplier
    const tierMultiplier = tierDefinition?.commissionMultiplier || 1.0;
    const tierAdjustedCommission = baseCommission * tierMultiplier;
    
    // Calculate bonuses
    const bonuses = await this.bonusCalculator.calculateBonuses(partnerId, projectValue);
    const totalBonuses = bonuses.reduce((sum, bonus) => sum + bonus.amount, 0);
    
    // Apply any penalties
    const penalties = await this.calculatePenalties(partnerId);
    const totalPenalties = penalties.reduce((sum, penalty) => sum + penalty.amount, 0);
    
    // Final calculation
    const finalCommission = Math.max(0, tierAdjustedCommission + totalBonuses - totalPenalties);
    
    return {
      projectValue,
      baseCommissionRate,
      baseCommission,
      tierMultiplier,
      tierAdjustedCommission,
      bonuses,
      penalties,
      finalCommission,
      calculatedAt: new Date()
    };
  }

  async processMonthlyCommissions(): Promise<CommissionProcessingResult> {
    const pendingCommissions = await this.getPendingCommissions();
    const processedPayments: ProcessedPayment[] = [];
    const errors: CommissionError[] = [];

    for (const commission of pendingCommissions) {
      try {
        const payment = await this.processCommissionPayment(commission);
        processedPayments.push(payment);
        
        // Update referral status
        await this.updateReferralCommissionStatus(commission.referralId, 'paid');
        
        // Notify partner
        await this.notifyPartnerOfPayment(commission.partnerId, payment);
        
      } catch (error) {
        errors.push({
          commissionId: commission.id,
          partnerId: commission.partnerId,
          error: error.message,
          amount: commission.amount
        });
      }
    }

    return {
      totalProcessed: processedPayments.length,
      totalAmount: processedPayments.reduce((sum, p) => sum + p.amount, 0),
      successfulPayments: processedPayments,
      errors: errors,
      processedAt: new Date()
    };
  }

  private initializeTierDefinitions(): void {
    this.tierDefinitions = new Map([
      ['bronze', {
        name: 'Bronze Partner',
        commissionMultiplier: 1.0,
        baseCommissionRate: 0.10, // 10%
        requirements: {
          monthlyReferrals: 1,
          quarterlyValue: 5000,
          qualityScore: 3.0
        },
        benefits: [
          'Monthly commission payments',
          'Basic marketing materials',
          'Email support'
        ]
      }],
      ['silver', {
        name: 'Silver Partner',
        commissionMultiplier: 1.2,
        baseCommissionRate: 0.12, // 12%
        requirements: {
          monthlyReferrals: 3,
          quarterlyValue: 15000,
          qualityScore: 3.5
        },
        benefits: [
          'Bi-weekly commission payments',
          'Advanced marketing materials',
          'Priority email support',
          'Co-marketing opportunities'
        ]
      }],
      ['gold', {
        name: 'Gold Partner',
        commissionMultiplier: 1.5,
        baseCommissionRate: 0.15, // 15%
        requirements: {
          monthlyReferrals: 5,
          quarterlyValue: 30000,
          qualityScore: 4.0
        },
        benefits: [
          'Weekly commission payments',
          'Custom marketing materials',
          'Phone support',
          'Joint sales calls',
          'Exclusive lead sharing'
        ]
      }],
      ['platinum', {
        name: 'Platinum Partner',
        commissionMultiplier: 2.0,
        baseCommissionRate: 0.20, // 20%
        requirements: {
          monthlyReferrals: 10,
          quarterlyValue: 75000,
          qualityScore: 4.5
        },
        benefits: [
          'Real-time commission payments',
          'Fully custom materials',
          'Dedicated account manager',
          'Joint business development',
          'Revenue sharing opportunities',
          'White-label options'
        ]
      }]
    ]);
  }
}

class BonusCalculator {
  async calculateBonuses(partnerId: string, projectValue: number): Promise<CommissionBonus[]> {
    const bonuses: CommissionBonus[] = [];
    const partner = await this.getPartner(partnerId);
    const partnerStats = await this.getPartnerStats(partnerId);

    // Volume bonus
    if (partnerStats.quarterlyReferralValue > 50000) {
      bonuses.push({
        type: 'volume',
        name: 'High Volume Bonus',
        amount: projectValue * 0.02, // Additional 2%
        reason: 'Quarterly referral value exceeded $50,000'
      });
    }

    // Quality bonus
    if (partnerStats.averageClientSatisfaction > 4.5) {
      bonuses.push({
        type: 'quality',
        name: 'Quality Excellence Bonus',
        amount: projectValue * 0.01, // Additional 1%
        reason: 'Average client satisfaction above 4.5'
      });
    }

    // Speed bonus
    if (partnerStats.averageConversionTime < 7) { // Less than 7 days to convert
      bonuses.push({
        type: 'speed',
        name: 'Fast Conversion Bonus',
        amount: projectValue * 0.005, // Additional 0.5%
        reason: 'Average conversion time under 7 days'
      });
    }

    // Milestone bonuses
    const milestoneBonus = await this.calculateMilestoneBonus(partnerId, partnerStats);
    if (milestoneBonus) {
      bonuses.push(milestoneBonus);
    }

    return bonuses;
  }

  private async calculateMilestoneBonus(partnerId: string, stats: PartnerStats): Promise<CommissionBonus | null> {
    // First referral bonus
    if (stats.totalReferrals === 1) {
      return {
        type: 'milestone',
        name: 'First Referral Bonus',
        amount: 500,
        reason: 'Congratulations on your first successful referral!'
      };
    }

    // 10 referrals bonus
    if (stats.totalReferrals === 10) {
      return {
        type: 'milestone',
        name: '10 Referrals Achievement',
        amount: 1000,
        reason: 'Achievement unlocked: 10 successful referrals!'
      };
    }

    // 25 referrals bonus
    if (stats.totalReferrals === 25) {
      return {
        type: 'milestone',
        name: '25 Referrals Champion',
        amount: 2500,
        reason: 'Champion status: 25 successful referrals!'
      };
    }

    return null;
  }
}

interface TierDefinition {
  name: string;
  commissionMultiplier: number;
  baseCommissionRate: number;
  requirements: {
    monthlyReferrals: number;
    quarterlyValue: number;
    qualityScore: number;
  };
  benefits: string[];
}

interface CommissionCalculation {
  projectValue: number;
  baseCommissionRate: number;
  baseCommission: number;
  tierMultiplier: number;
  tierAdjustedCommission: number;
  bonuses: CommissionBonus[];
  penalties: CommissionPenalty[];
  finalCommission: number;
  calculatedAt: Date;
}

interface CommissionBonus {
  type: 'volume' | 'quality' | 'speed' | 'milestone';
  name: string;
  amount: number;
  reason: string;
}
```

### **Component 3: Partner Dashboard & Analytics**

#### **Real-time Partner Performance Dashboard**
```typescript
// NEW: services/partnerDashboard.ts
export class PartnerDashboard {
  async getPartnerDashboardData(partnerId: string): Promise<PartnerDashboardData> {
    const [
      overview,
      earnings,
      referrals,
      performance,
      materials
    ] = await Promise.all([
      this.getPartnerOverview(partnerId),
      this.getEarningsData(partnerId),
      this.getReferralData(partnerId),
      this.getPerformanceMetrics(partnerId),
      this.getMarketingMaterials(partnerId)
    ]);

    return {
      overview,
      earnings,
      referrals,
      performance,
      materials,
      lastUpdated: new Date()
    };
  }

  private async getPartnerOverview(partnerId: string): Promise<PartnerOverview> {
    const partner = await this.getPartner(partnerId);
    const stats = await this.getPartnerStats(partnerId);
    const tierInfo = await this.getTierInformation(partner.currentTier);
    const nextTierRequirements = await this.getNextTierRequirements(partnerId);

    return {
      partnerInfo: {
        id: partnerId,
        businessName: partner.businessName,
        contactName: partner.contactName,
        currentTier: partner.currentTier,
        joinedDate: partner.createdAt,
        trackingCode: partner.primaryTrackingCode
      },
      currentStats: {
        totalReferrals: stats.totalReferrals,
        activeReferrals: stats.activeReferrals,
        totalEarnings: stats.totalEarnings,
        pendingEarnings: stats.pendingEarnings,
        conversionRate: stats.conversionRate,
        averageProjectValue: stats.averageProjectValue
      },
      tierInformation: tierInfo,
      nextTierRequirements: nextTierRequirements,
      achievements: await this.getPartnerAchievements(partnerId)
    };
  }

  private async getEarningsData(partnerId: string): Promise<EarningsData> {
    const currentMonth = await this.getMonthlyEarnings(partnerId, new Date());
    const lastMonth = await this.getMonthlyEarnings(partnerId, subMonths(new Date(), 1));
    const yearToDate = await this.getYearToDateEarnings(partnerId);
    const earningsHistory = await this.getEarningsHistory(partnerId, 12); // Last 12 months

    return {
      currentMonth: {
        amount: currentMonth.totalAmount,
        commissionsCount: currentMonth.commissionsCount,
        growth: this.calculateGrowthRate(currentMonth.totalAmount, lastMonth.totalAmount)
      },
      yearToDate: {
        amount: yearToDate.totalAmount,
        commissionsCount: yearToDate.commissionsCount,
        averagePerMonth: yearToDate.totalAmount / (new Date().getMonth() + 1)
      },
      pending: {
        amount: await this.getPendingEarnings(partnerId),
        expectedPaymentDate: await this.getNextPaymentDate(partnerId)
      },
      history: earningsHistory,
      projections: await this.calculateEarningsProjections(partnerId)
    };
  }

  private async getReferralData(partnerId: string): Promise<ReferralData> {
    const [
      recentReferrals,
      referralsByStatus,
      referralsBySource,
      conversionFunnel
    ] = await Promise.all([
      this.getRecentReferrals(partnerId, 10),
      this.getReferralsByStatus(partnerId),
      this.getReferralsBySource(partnerId),
      this.getConversionFunnel(partnerId)
    ]);

    return {
      recent: recentReferrals,
      byStatus: referralsByStatus,
      bySource: referralsBySource,
      conversionFunnel: conversionFunnel,
      trends: await this.getReferralTrends(partnerId)
    };
  }

  private async getPerformanceMetrics(partnerId: string): Promise<PerformanceMetrics> {
    const timeframes = ['month', 'quarter', 'year'];
    const metrics: Record<string, any> = {};

    for (const timeframe of timeframes) {
      metrics[timeframe] = await this.getTimeframeMetrics(partnerId, timeframe);
    }

    return {
      ...metrics,
      benchmarks: await this.getIndustryBenchmarks(),
      recommendations: await this.generatePerformanceRecommendations(partnerId)
    };
  }

  async generatePerformanceReport(partnerId: string, period: 'month' | 'quarter' | 'year'): Promise<PerformanceReport> {
    const startDate = this.getPeriodStartDate(period);
    const endDate = new Date();

    const [
      referralMetrics,
      earningsMetrics,
      qualityMetrics,
      competitiveAnalysis
    ] = await Promise.all([
      this.calculateReferralMetrics(partnerId, startDate, endDate),
      this.calculateEarningsMetrics(partnerId, startDate, endDate),
      this.calculateQualityMetrics(partnerId, startDate, endDate),
      this.getCompetitiveAnalysis(partnerId)
    ]);

    return {
      period: { start: startDate, end: endDate },
      summary: {
        totalReferrals: referralMetrics.total,
        totalEarnings: earningsMetrics.total,
        averageConversionTime: qualityMetrics.avgConversionTime,
        clientSatisfactionScore: qualityMetrics.avgSatisfaction
      },
      highlights: [
        `Generated ${referralMetrics.total} referrals`,
        `Earned $${earningsMetrics.total.toLocaleString()}`,
        `${referralMetrics.conversionRate}% conversion rate`,
        `${qualityMetrics.avgSatisfaction}/5.0 client satisfaction`
      ],
      recommendations: await this.generateRecommendations(partnerId, {
        referralMetrics,
        earningsMetrics,
        qualityMetrics,
        competitiveAnalysis
      }),
      nextSteps: await this.generateNextSteps(partnerId),
      attachments: await this.generateReportAttachments(partnerId, period)
    };
  }
}

interface PartnerDashboardData {
  overview: PartnerOverview;
  earnings: EarningsData;
  referrals: ReferralData;
  performance: PerformanceMetrics;
  materials: MarketingMaterials;
  lastUpdated: Date;
}

interface PartnerOverview {
  partnerInfo: {
    id: string;
    businessName: string;
    contactName: string;
    currentTier: CommissionTier;
    joinedDate: Date;
    trackingCode: string;
  };
  currentStats: {
    totalReferrals: number;
    activeReferrals: number;
    totalEarnings: number;
    pendingEarnings: number;
    conversionRate: number;
    averageProjectValue: number;
  };
  tierInformation: TierInformation;
  nextTierRequirements: TierRequirements;
  achievements: Achievement[];
}

interface EarningsData {
  currentMonth: MonthlyEarnings;
  yearToDate: YearToDateEarnings;
  pending: PendingEarnings;
  history: EarningsHistory[];
  projections: EarningsProjection;
}
```

## 🗄️ **DATABASE SCHEMA EXTENSIONS**

```sql
-- EXTEND existing profiles table for partners
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS is_partner BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS partner_tier VARCHAR(20),
ADD COLUMN IF NOT EXISTS partner_status VARCHAR(50) DEFAULT 'active';

-- NEW: Partner profiles
CREATE TABLE IF NOT EXISTS partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  business_name VARCHAR(255) NOT NULL,
  contact_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  website VARCHAR(255),
  business_type VARCHAR(50),
  client_count INTEGER,
  average_project_value DECIMAL,
  years_in_business INTEGER,
  portfolio_quality VARCHAR(20),
  referral_source VARCHAR(255),
  expected_monthly_referrals INTEGER,
  marketing_channels TEXT[],
  current_tier VARCHAR(20) DEFAULT 'bronze',
  status VARCHAR(50) DEFAULT 'active',
  primary_tracking_code VARCHAR(50) UNIQUE,
  commission_rate DECIMAL DEFAULT 0.10,
  payment_method VARCHAR(50),
  payment_details JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- NEW: Partner referrals
CREATE TABLE IF NOT EXISTS partner_referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID REFERENCES partners(id),
  tracking_code VARCHAR(50),
  client_name VARCHAR(255),
  client_email VARCHAR(255),
  client_phone VARCHAR(50),
  project_type VARCHAR(100),
  estimated_project_value DECIMAL,
  final_project_value DECIMAL,
  referral_source VARCHAR(100),
  status VARCHAR(50) DEFAULT 'new',
  commission_rate DECIMAL,
  estimated_commission DECIMAL,
  final_commission DECIMAL,
  commission_status VARCHAR(50) DEFAULT 'pending',
  referred_at TIMESTAMP DEFAULT NOW(),
  status_updated_at TIMESTAMP,
  project_completed_at TIMESTAMP,
  commission_paid_at TIMESTAMP,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- NEW: Commission payments
CREATE TABLE IF NOT EXISTS commission_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID REFERENCES partners(id),
  payment_period_start DATE,
  payment_period_end DATE,
  total_amount DECIMAL,
  referrals_count INTEGER,
  payment_method VARCHAR(50),
  payment_reference VARCHAR(255),
  payment_status VARCHAR(50) DEFAULT 'pending',
  processing_fee DECIMAL DEFAULT 0,
  net_amount DECIMAL,
  paid_at TIMESTAMP,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- NEW: Partner performance tracking
CREATE TABLE IF NOT EXISTS partner_performance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID REFERENCES partners(id),
  metric_date DATE DEFAULT CURRENT_DATE,
  referrals_count INTEGER DEFAULT 0,
  successful_referrals INTEGER DEFAULT 0,
  total_referral_value DECIMAL DEFAULT 0,
  commissions_earned DECIMAL DEFAULT 0,
  conversion_rate DECIMAL DEFAULT 0,
  average_conversion_time INTEGER, -- in days
  client_satisfaction_avg DECIMAL,
  tier_points INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- NEW: Partner tier requirements
CREATE TABLE IF NOT EXISTS partner_tier_definitions (
  tier_name VARCHAR(20) PRIMARY KEY,
  display_name VARCHAR(50),
  commission_multiplier DECIMAL DEFAULT 1.0,
  base_commission_rate DECIMAL,
  monthly_referrals_required INTEGER,
  quarterly_value_required DECIMAL,
  quality_score_required DECIMAL,
  benefits TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- NEW: Partner marketing materials tracking
CREATE TABLE IF NOT EXISTS partner_marketing_materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID REFERENCES partners(id),
  material_type VARCHAR(100),
  material_name VARCHAR(255),
  file_url TEXT,
  tracking_code VARCHAR(50),
  usage_count INTEGER DEFAULT 0,
  conversion_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- NEW: Partner achievements
CREATE TABLE IF NOT EXISTS partner_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID REFERENCES partners(id),
  achievement_type VARCHAR(100),
  achievement_name VARCHAR(255),
  description TEXT,
  reward_amount DECIMAL,
  achieved_at TIMESTAMP DEFAULT NOW(),
  metadata JSONB
);

-- FUNCTION: Calculate partner tier based on performance
CREATE OR REPLACE FUNCTION calculate_partner_tier(partner_uuid UUID)
RETURNS VARCHAR(20) AS $$
DECLARE
  performance RECORD;
  new_tier VARCHAR(20);
BEGIN
  -- Get partner performance for last quarter
  SELECT 
    SUM(referrals_count) as total_referrals,
    SUM(total_referral_value) as total_value,
    AVG(client_satisfaction_avg) as avg_satisfaction
  INTO performance
  FROM partner_performance
  WHERE partner_id = partner_uuid 
    AND metric_date >= CURRENT_DATE - INTERVAL '3 months';

  -- Determine tier based on performance
  IF performance.total_referrals >= 30 AND performance.total_value >= 75000 AND performance.avg_satisfaction >= 4.5 THEN
    new_tier := 'platinum';
  ELSIF performance.total_referrals >= 15 AND performance.total_value >= 30000 AND performance.avg_satisfaction >= 4.0 THEN
    new_tier := 'gold';
  ELSIF performance.total_referrals >= 9 AND performance.total_value >= 15000 AND performance.avg_satisfaction >= 3.5 THEN
    new_tier := 'silver';
  ELSE
    new_tier := 'bronze';
  END IF;

  -- Update partner tier if changed
  UPDATE partners 
  SET current_tier = new_tier, updated_at = NOW()
  WHERE id = partner_uuid AND current_tier != new_tier;

  RETURN new_tier;
END;
$$ LANGUAGE plpgsql;

-- FUNCTION: Process monthly commission payments
CREATE OR REPLACE FUNCTION process_monthly_commissions()
RETURNS JSONB AS $$
DECLARE
  payment_record RECORD;
  total_processed INTEGER := 0;
  total_amount DECIMAL := 0;
  processing_results JSONB := '[]'::JSONB;
BEGIN
  -- Process commissions for each partner
  FOR payment_record IN
    SELECT 
      p.id as partner_id,
      p.business_name,
      SUM(pr.final_commission) as total_commission,
      COUNT(pr.id) as referrals_count
    FROM partners p
    JOIN partner_referrals pr ON p.id = pr.partner_id
    WHERE pr.commission_status = 'calculated'
      AND pr.project_completed_at >= DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month')
      AND pr.project_completed_at < DATE_TRUNC('month', CURRENT_DATE)
    GROUP BY p.id, p.business_name
    HAVING SUM(pr.final_commission) > 0
  LOOP
    -- Create commission payment record
    INSERT INTO commission_payments (
      partner_id,
      payment_period_start,
      payment_period_end,
      total_amount,
      referrals_count,
      net_amount
    )
    VALUES (
      payment_record.partner_id,
      DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month'),
      DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '1 day',
      payment_record.total_commission,
      payment_record.referrals_count,
      payment_record.total_commission * 0.97 -- 3% processing fee
    );

    -- Mark referrals as paid
    UPDATE partner_referrals 
    SET 
      commission_status = 'paid',
      commission_paid_at = NOW()
    WHERE partner_id = payment_record.partner_id
      AND commission_status = 'calculated';

    -- Add to results
    processing_results := processing_results || jsonb_build_object(
      'partner_id', payment_record.partner_id,
      'business_name', payment_record.business_name,
      'amount', payment_record.total_commission,
      'referrals', payment_record.referrals_count
    );

    total_processed := total_processed + 1;
    total_amount := total_amount + payment_record.total_commission;
  END LOOP;

  RETURN jsonb_build_object(
    'total_partners_processed', total_processed,
    'total_amount_processed', total_amount,
    'payments', processing_results,
    'processed_at', NOW()
  );
END;
$$ LANGUAGE plpgsql;

-- Insert tier definitions
INSERT INTO partner_tier_definitions (tier_name, display_name, commission_multiplier, base_commission_rate, monthly_referrals_required, quarterly_value_required, quality_score_required, benefits) VALUES
('bronze', 'Bronze Partner', 1.0, 0.10, 1, 5000, 3.0, ARRAY['Monthly payments', 'Basic materials', 'Email support']),
('silver', 'Silver Partner', 1.2, 0.12, 3, 15000, 3.5, ARRAY['Bi-weekly payments', 'Advanced materials', 'Priority support', 'Co-marketing']),
('gold', 'Gold Partner', 1.5, 0.15, 5, 30000, 4.0, ARRAY['Weekly payments', 'Custom materials', 'Phone support', 'Joint sales calls']),
('platinum', 'Platinum Partner', 2.0, 0.20, 10, 75000, 4.5, ARRAY['Real-time payments', 'Full customization', 'Account manager', 'Revenue sharing'])
ON CONFLICT (tier_name) DO NOTHING;
```

## 🎯 **SUCCESS METRICS**

### **Partner Ecosystem Success**
- [ ] 50+ active partners within 6 months
- [ ] 30% of revenue from partner referrals
- [ ] 85% partner satisfaction score
- [ ] 95% commission payment accuracy

### **Referral Quality Success**
- [ ] 70% conversion rate from partner referrals
- [ ] 25% higher lifetime value for referred clients
- [ ] 4.5+ average client satisfaction from referrals
- [ ] 40% faster sales cycle for referred clients

### **System Performance Success**
- [ ] 99.9% uptime for partner portal
- [ ] Real-time tracking accuracy 99.5%
- [ ] Commission calculations 100% accurate
- [ ] Automated payments 95% successful

## 📋 **ACCEPTANCE CRITERIA**

### **Must Have**
- [ ] Complete partner registration and onboarding
- [ ] Real-time referral tracking system
- [ ] Automated commission calculations
- [ ] Partner dashboard with earnings visibility
- [ ] Tiered commission structure
- [ ] Monthly commission payment processing

### **Should Have**
- [ ] Advanced partner analytics
- [ ] Marketing materials generation
- [ ] Performance-based tier upgrades
- [ ] Achievement and bonus system

### **Could Have**
- [ ] White-label partner solutions
- [ ] Advanced reporting and insights
- [ ] Integration with external payment systems
- [ ] Partner community features

This Partner Referral Portal creates a comprehensive ecosystem for scaling revenue through strategic partnerships while maintaining transparency and fairness for all participants.