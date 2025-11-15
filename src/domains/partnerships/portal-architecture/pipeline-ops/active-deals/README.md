# Active Deals Management

Real-time deal tracking, negotiation management, and closing workflows for active partnership opportunities.

## Overview

Active Deals Management provides comprehensive tools for tracking and managing all active business deals throughout their lifecycle. This module enables partners to monitor deal progress, manage negotiations, track documents, and optimize closing processes with real-time updates and collaborative features.

## Domain Types

```typescript
interface ActiveDeal {
  id: string;
  title: string;
  description: string;
  client: ClientInfo;
  dealType: DealType;
  stage: DealStage;
  previousStage?: DealStage;
  value: number;
  currency: string;
  probability: number;
  priority: DealPriority;
  assignee: DealAssignee;
  teamMembers: DealTeamMember[];
  source: DealSource;
  createdAt: Date;
  updatedAt: Date;
  expectedCloseDate: Date;
  actualCloseDate?: Date;
  status: DealStatus;
  metadata: DealMetadata;
  documents: DealDocument[];
  activities: DealActivity[];
  nextSteps: DealNextStep[];
  competitorInfo?: CompetitorInfo;
  contractTerms?: ContractTerms;
}

interface ClientInfo {
  id: string;
  name: string;
  company: string;
  industry: string;
  size: CompanySize;
  contactInfo: ContactInfo;
  decisionMakers: DecisionMaker[];
  currentPartnerships: Partnership[];
  painPoints: string[];
  budget?: number;
  timeline?: string;
}

interface DealAssignee {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  department: string;
  commissionRate: number;
  quota: number;
  currentPerformance: number;
}

interface DealMetadata {
  tags: string[];
  customFields: Record<string, any>;
  riskFactors: string[];
  successFactors: string[];
  objections: string[];
  keyStakeholders: string[];
  buyingSignals: string[];
  nextFollowUp: Date;
  lastContactDate: Date;
  contactFrequency: ContactFrequency;
}

interface CompetitorInfo {
  competitors: Competitor[];
  competitorAdvantages: string[];
  ourAdvantages: string[];
  pricingComparison: PricingComparison;
  marketPosition: MarketPosition;
}

enum DealType {
  NEW_CLIENT = 'new_client',
  EXPANSION = 'expansion',
  RENEWAL = 'renewal',
  PARTNERSHIP = 'partnership',
  STRATEGIC_ALLIANCE = 'strategic_alliance',
  JOINT_VENTURE = 'joint_venture'
}

enum DealStage {
  QUALIFIED = 'qualified',
  DISCOVERY = 'discovery',
  PROPOSAL = 'proposal',
  NEGOTIATION = 'negotiation',
  CLOSING = 'closing',
  WON = 'won',
  LOST = 'lost'
}
```

## Application Hooks

```typescript
// Active Deals Management
export const useActiveDeals = () => {
  const [activeDeals, setActiveDeals] = useState<ActiveDeal[]>([]);
  const [dealStats, setDealStats] = useState<DealStats>();
  const [stageDistribution, setStageDistribution] = useState<Record<DealStage, number>>({});
  const [isLoading, setIsLoading] = useState(false);

  const loadActiveDeals = useCallback(async (filters?: DealFilters) => {
    setIsLoading(true);
    try {
      const response = await dealsService.getActiveDeals({
        status: 'active',
        includeWon: false,
        includeLost: false,
        limit: 100,
        filters
      });
      
      setActiveDeals(response.data);
      
      // Calculate statistics
      const stats = calculateDealStats(response.data);
      setDealStats(stats);
      
      // Calculate stage distribution
      const distribution = response.data.reduce((acc, deal) => {
        acc[deal.stage] = (acc[deal.stage] || 0) + 1;
        return acc;
      }, {} as Record<DealStage, number>);
      setStageDistribution(distribution);
    } catch (error) {
      console.error('Failed to load active deals:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateDealStage = useCallback(async (dealId: string, newStage: DealStage, notes?: string) => {
    const updatedDeal = await dealsService.updateDealStage(dealId, newStage, notes);
    
    setActiveDeals(prev => prev.map(deal =>
      deal.id === dealId
        ? { ...deal, stage: newStage, updatedAt: new Date() }
        : deal
    ));
    
    // Log stage change
    await dealsService.logDealActivity(dealId, {
      type: 'stage_change',
      previousStage: activeDeals.find(d => d.id === dealId)?.stage,
      newStage,
      notes,
      timestamp: new Date()
    });
    
    return updatedDeal;
  }, [activeDeals]);

  const updateDealValue = useCallback(async (dealId: string, newValue: number, notes?: string) => {
    const updatedDeal = await dealsService.updateDealValue(dealId, newValue, notes);
    
    setActiveDeals(prev => prev.map(deal =>
      deal.id === dealId
        ? { ...deal, value: newValue, updatedAt: new Date() }
        : deal
    ));
    
    return updatedDeal;
  }, []);

  return {
    activeDeals,
    dealStats,
    stageDistribution,
    isLoading,
    loadActiveDeals,
    updateDealStage,
    updateDealValue
  };
};

// Deal Analytics
export const useDealAnalytics = () => {
  const [analytics, setAnalytics] = useState<DealAnalytics>();
  const [forecast, setForecast] = useState<DealForecast>();

  const loadAnalytics = useCallback(async (timeRange: TimeRange) => {
    const [analyticsData, forecastData] = await Promise.all([
      dealsService.getDealAnalytics(timeRange),
      dealsService.getDealForecast(timeRange)
    ]);
    
    setAnalytics(analyticsData);
    setForecast(forecastData);
  }, []);

  const calculateWinRate = useCallback((deals: ActiveDeal[]): number => {
    const totalDeals = deals.length;
    const wonDeals = deals.filter(deal => deal.status === 'won').length;
    return totalDeals > 0 ? (wonDeals / totalDeals) * 100 : 0;
  }, []);

  const calculateAverageDealSize = useCallback((deals: ActiveDeal[]): number => {
    const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);
    return deals.length > 0 ? totalValue / deals.length : 0;
  }, []);

  const calculateSalesCycle = useCallback((deals: ActiveDeal[]): number => {
    const completedDeals = deals.filter(deal => deal.actualCloseDate);
    if (completedDeals.length === 0) return 0;
    
    const totalDays = completedDeals.reduce((sum, deal) => {
      return sum + (deal.actualCloseDate!.getTime() - deal.createdAt.getTime()) / (1000 * 60 * 60 * 24);
    }, 0);
    
    return totalDays / completedDeals.length;
  }, []);

  return {
    analytics,
    forecast,
    loadAnalytics,
    calculateWinRate,
    calculateAverageDealSize,
    calculateSalesCycle
  };
};

// Deal Collaboration
export const useDealCollaboration = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [activities, setActivities] = useState<DealActivity[]>([]);

  const addTeamMember = useCallback(async (dealId: string, memberId: string, role: string) => {
    await dealsService.addTeamMember(dealId, memberId, role);
    
    // Update local state
    setActiveDeals(prev => prev.map(deal =>
      deal.id === dealId
        ? {
            ...deal,
            teamMembers: [...deal.teamMembers, { id: memberId, role, addedAt: new Date() }]
          }
        : deal
    ));
  }, []);

  const logActivity = useCallback(async (dealId: string, activity: Omit<DealActivity, 'id' | 'timestamp'>) => {
    const loggedActivity = await dealsService.logDealActivity(dealId, activity);
    setActivities(prev => [loggedActivity, ...prev]);
    return loggedActivity;
  }, []);

  const scheduleFollowUp = useCallback(async (dealId: string, followUp: FollowUpSchedule) => {
    await dealsService.scheduleFollowUp(dealId, followUp);
    
    // Update deal metadata
    setActiveDeals(prev => prev.map(deal =>
      deal.id === dealId
        ? {
            ...deal,
            metadata: {
              ...deal.metadata,
              nextFollowUp: followUp.date
            }
          }
        : deal
    ));
  }, []);

  return {
    teamMembers,
    activities,
    addTeamMember,
    logActivity,
    scheduleFollowUp
  };
};
```

## Component Architecture

### ActiveDealsContainer

```typescript
interface ActiveDealsContainerProps {
  initialView?: 'kanban' | 'list' | 'analytics';
  initialFilters?: DealFilters;
}

export const ActiveDealsContainer: React.FC<ActiveDealsContainerProps> = ({
  initialView = 'kanban',
  initialFilters = {}
}) => {
  const {
    activeDeals,
    dealStats,
    stageDistribution,
    isLoading,
    loadActiveDeals,
    updateDealStage,
    updateDealValue
  } = useActiveDeals();

  const { analytics, forecast, loadAnalytics } = useDealAnalytics();

  const [viewMode, setViewMode] = useState<DealViewMode>(initialView);
  const [filters, setFilters] = useState<DealFilters>({ ...defaultFilters, ...initialFilters });
  const [selectedDeal, setSelectedDeal] = useState<ActiveDeal | null>(null);

  useEffect(() => {
    loadActiveDeals(filters);
    loadAnalytics({ start: daysAgo(90), end: new Date() });
  }, [loadActiveDeals, loadAnalytics, filters]);

  const filteredDeals = useMemo(() => {
    return activeDeals.filter(deal => applyDealFilters(deal, filters));
  }, [activeDeals, filters]);

  const totalValue = filteredDeals.reduce((sum, deal) => sum + deal.value, 0);
  const weightedValue = filteredDeals.reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0);

  return (
    <ActiveDealsLayout>
      <DealsHeader>
        <HeaderLeft>
          <DealsTitle>Active Deals</DealsTitle>
          <DealStatsSummary
            totalDeals={filteredDeals.length}
            totalValue={totalValue}
            weightedValue={weightedValue}
            averageDealSize={totalValue / filteredDeals.length || 0}
          />
        </HeaderLeft>
        
        <HeaderActions>
          <ViewModeToggle
            mode={viewMode}
            onChange={setViewMode}
            options={[
              { value: 'kanban', label: 'Kanban', icon: ViewKanbanIcon },
              { value: 'list', label: 'List', icon: ListIcon },
              { value: 'analytics', label: 'Analytics', icon: BarChartIcon }
            ]}
          />
          <AddDealButton onClick={() => setShowDealForm(true)} />
          <ExportButton onClick={() => exportDeals(filteredDeals)} />
        </HeaderActions>
      </DealsHeader>

      <DealsToolbar>
        <StageProgress
          stages={getDealStages()}
          distribution={stageDistribution}
          onStageFilter={(stage) => setFilters(prev => ({ ...prev, stage }))}
        />
        
        <QuickFilters
          filters={QUICK_FILTERS}
          activeFilters={filters}
          onFilterChange={setFilters}
        />
      </DealsToolbar>

      <DealsContent>
        {viewMode === 'analytics' ? (
          <DealsAnalyticsView
            analytics={analytics}
            forecast={forecast}
            deals={filteredDeals}
          />
        ) : viewMode === 'kanban' ? (
          <DealsKanbanBoard
            deals={filteredDeals}
            onStageUpdate={updateDealStage}
            onDealSelect={setSelectedDeal}
            stages={getDealStages()}
          />
        ) : (
          <DealsListView
            deals={filteredDeals}
            onStageUpdate={updateDealStage}
            onDealSelect={setSelectedDeal}
            onValueUpdate={updateDealValue}
          />
        )}
      </DealsContent>

      {selectedDeal && (
        <DealDetailPanel
          deal={selectedDeal}
          onClose={() => setSelectedDeal(null)}
          onUpdate={(updates) => handleDealUpdate(selectedDeal.id, updates)}
        />
      )}
    </ActiveDealsLayout>
  );
};
```

### DealCard

```typescript
interface DealCardProps {
  deal: ActiveDeal;
  onStageUpdate: (dealId: string, newStage: DealStage) => void;
  onDealSelect: (deal: ActiveDeal) => void;
  compact?: boolean;
}

export const DealCard: React.FC<DealCardProps> = ({
  deal,
  onStageUpdate,
  onDealSelect,
  compact = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStageChange = useCallback(async (newStage: DealStage) => {
    setIsUpdating(true);
    try {
      await onStageUpdate(deal.id, newStage);
    } finally {
      setIsUpdating(false);
    }
  }, [deal.id, onStageUpdate]);

  const formatCurrency = useCallback((amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(amount);
  }, []);

  const daysUntilClose = deal.expectedCloseDate
    ? Math.ceil((deal.expectedCloseDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <DealCardContainer compact={compact}>
      <DealCardHeader onClick={() => onDealSelect(deal)}>
        <DealLeft>
          <DealPriorityIndicator priority={deal.priority} />
          
          <DealContent>
            <DealTitle>{deal.title}</DealTitle>
            
            <DealClient>
              <ClientAvatar src={deal.client.avatar} name={deal.client.name} />
              <ClientInfo>
                <ClientName>{deal.client.name}</ClientName>
                <ClientCompany>{deal.client.company}</ClientCompany>
              </ClientInfo>
            </DealClient>
            
            <DealMetadata>
              <DealValue value={deal.value} currency={deal.currency} />
              <DealProbability probability={deal.probability} />
              {daysUntilClose !== null && (
                <TimeToClose days={daysUntilClose} />
              )}
              <DealType type={deal.type} />
            </DealMetadata>
          </DealContent>
        </DealLeft>

        <DealRight>
          <DealStage stage={deal.stage} />
          <DealActions>
            <ActionButton onClick={() => navigateToDeal(deal.id)}>
              View Details
            </ActionButton>
          </DealActions>
        </DealRight>
      </DealCardHeader>

      {!compact && (
        <DealCardBody>
          <DealDescription>{deal.description}</DealDescription>
          
          <DealTeam>
            <TeamAvatarGroup members={deal.teamMembers} maxVisible={3} />
            <AssigneeInfo assignee={deal.assignee} />
          </DealTeam>
          
          {deal.competitorInfo && deal.competitorInfo.competitors.length > 0 && (
            <CompetitorAlert competitors={deal.competitorInfo.competitors} />
          )}
          
          <DealProgress
            stage={deal.stage}
            probability={deal.probability}
            stages={getDealStages()}
          />
          
          <DealQuickActions>
            <StageDropdown
              currentStage={deal.stage}
              onStageChange={handleStageChange}
              disabled={isUpdating}
            />
            <LogActivityButton dealId={deal.id} />
            <ScheduleFollowUpButton dealId={deal.id} />
          </DealQuickActions>
        </DealCardBody>
      )}
    </DealCardContainer>
  );
};
```

### DealAnalyticsView

```typescript
interface DealAnalyticsViewProps {
  analytics?: DealAnalytics;
  forecast?: DealForecast;
  deals: ActiveDeal[];
}

export const DealAnalyticsView: React.FC<DealAnalyticsViewProps> = ({
  analytics,
  forecast,
  deals
}) => {
  const [selectedMetric, setSelectedMetric] = useState<AnalyticsMetric>('revenue');

  return (
    <AnalyticsLayout>
      <AnalyticsHeader>
        <AnalyticsTitle>Deal Performance Analytics</AnalyticsTitle>
        <MetricSelector
          value={selectedMetric}
          onChange={setSelectedMetric}
          options={ANALYTICS_METRICS}
        />
        <DateRangeSelector value={dateRange} onChange={setDateRange} />
      </AnalyticsHeader>

      <AnalyticsGrid>
        <MetricCard
          title="Pipeline Value"
          value={analytics?.pipelineValue || 0}
          change={analytics?.pipelineValueChange || 0}
          format="currency"
          icon={AccountBalanceIcon}
        />
        
        <MetricCard
          title="Win Rate"
          value={analytics?.winRate || 0}
          change={analytics?.winRateChange || 0}
          format="percentage"
          icon={TrendingUpIcon}
        />
        
        <MetricCard
          title="Average Deal Size"
          value={analytics?.averageDealSize || 0}
          change={analytics?.averageDealSizeChange || 0}
          format="currency"
          icon={MoneyIcon}
        />
        
        <MetricCard
          title="Sales Cycle"
          value={analytics?.averageSalesCycle || 0}
          change={analytics?.salesCycleChange || 0}
          format="days"
          icon={ScheduleIcon}
        />
      </AnalyticsGrid>

      <ChartsSection>
        <RevenueChart
          title="Revenue Forecast"
          data={forecast?.monthlyForecast || []}
          confidence={forecast?.confidence}
        />
        
        <ConversionFunnel
          title="Deal Conversion Funnel"
          data={analytics?.conversionData || []}
        />
        
        <StageDurationChart
          title="Average Time in Each Stage"
          data={analytics?.stageDurations || []}
        />
        
        <SourcePerformanceChart
          title="Deal Source Performance"
          data={analytics?.sourcePerformance || []}
        />
      </ChartsSection>

      <DetailedAnalytics>
        <DealPerformanceTable deals={deals} />
        <TopPerformers data={analytics?.topPerformers || []} />
        <LostDealsAnalysis data={analytics?.lostDealsAnalysis || []} />
      </DetailedAnalytics>
    </AnalyticsLayout>
  );
};
```

## Implementation Guidelines

### Deal Scoring

```typescript
export const useDealScoring = () => {
  const calculateDealScore = useCallback((deal: ActiveDeal): DealScore => {
    let score = 0;
    let factors: ScoreFactor[] = [];

    // Value scoring
    if (deal.value > 100000) {
      score += 30;
      factors.push({ type: 'value', score: 30, weight: 'high' });
    } else if (deal.value > 50000) {
      score += 20;
      factors.push({ type: 'value', score: 20, weight: 'medium' });
    }

    // Probability scoring
    score += deal.probability * 0.4;
    factors.push({ type: 'probability', score: deal.probability * 0.4, weight: 'high' });

    // Stage scoring
    const stageScores = {
      'negotiation': 25,
      'proposal': 20,
      'discovery': 15,
      'qualified': 10
    };
    
    const stageScore = stageScores[deal.stage] || 0;
    score += stageScore;
    factors.push({ type: 'stage', score: stageScore, weight: 'medium' });

    // Client quality scoring
    if (deal.client.size === 'enterprise') score += 15;
    if (deal.client.industry in TARGET_INDUSTRIES) score += 10;
    
    // Competitor analysis
    if (deal.competitorInfo?.ourAdvantages.length > 0) {
      score += 10;
    }

    return {
      total: Math.min(100, score),
      factors,
      recommendation: generateRecommendation(score, factors)
    };
  }, []);

  const prioritizeDeals = useCallback((deals: ActiveDeal[]): ActiveDeal[] => {
    return [...deals]
      .map(deal => ({
        ...deal,
        score: calculateDealScore(deal)
      }))
      .sort((a, b) => b.score.total - a.score.total);
  }, [calculateDealScore]);

  return { calculateDealScore, prioritizeDeals };
};
```

## Features

### Comprehensive Deal Management
- Visual deal pipeline with drag-and-drop functionality
- Real-time deal status updates
- Value and probability tracking
- Multi-stage deal progression

### Advanced Analytics
- Revenue forecasting and predictions
- Conversion rate analysis
- Performance benchmarking
- Deal source effectiveness tracking

### Team Collaboration
- Team assignment and workload management
- Activity logging and timeline tracking
- Document sharing and version control
- Communication and note-taking

### Automation & Workflows
- Automated follow-up scheduling
- Stage-based workflow triggers
- Task assignment automation
- Email template integration

## Security Considerations

- Role-based access control for deal information
- Encryption for sensitive client data
- Audit trail for all deal activities
- Compliance with data protection regulations

## Accessibility

- Screen reader support for deal information
- Keyboard navigation for all interactions
- High contrast mode support
- Clear visual indicators for deal status