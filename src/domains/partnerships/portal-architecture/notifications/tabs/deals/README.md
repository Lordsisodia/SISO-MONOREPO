# Deals Notifications Tab

Business opportunity notifications, deal updates, commission alerts, and client interaction notifications.

## Overview

The Deals Notifications tab provides centralized access to all business-related notifications including new deal opportunities, stage updates, commission payments, contract changes, and client communications. This ensures partners can stay informed about their business activities and respond promptly to opportunities.

## Domain Types

```typescript
interface DealNotification {
  id: string;
  type: DealNotificationType;
  category: DealCategory;
  priority: NotificationPriority;
  dealId: string;
  clientId?: string;
  title: string;
  description: string;
  value?: number;
  currency?: string;
  stage: DealStage;
  previousStage?: DealStage;
  assignee: DealAssignee;
  client?: ClientInfo;
  timestamp: Date;
  isRead: boolean;
  metadata: DealNotificationMetadata;
  actions?: DealAction[];
  documents?: DealDocument[];
  deadline?: Date;
  probability?: number;
}

interface DealAssignee {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  department: string;
}

interface ClientInfo {
  id: string;
  name: string;
  company: string;
  industry?: string;
  avatar?: string;
  contactInfo?: ContactInfo;
}

interface DealNotificationMetadata {
  source: string;
  referralSource?: string;
  campaignId?: string;
  expectedCloseDate?: Date;
  commissionRate?: number;
  estimatedCommission?: number;
  competitorInfo?: string;
  riskFactors?: string[];
  nextSteps?: string[];
  requiredActions?: string[];
}

interface DealDocument {
  id: string;
  type: DocumentType;
  title: string;
  url: string;
  size?: number;
  uploadedAt: Date;
  uploadedBy: string;
  isRequired: boolean;
  status: DocumentStatus;
}

enum DealNotificationType {
  NEW_OPPORTUNITY = 'new_opportunity',
  STAGE_UPDATED = 'stage_updated',
  DEAL_WON = 'deal_won',
  DEAL_LOST = 'deal_lost',
  COMMISSION_EARNED = 'commission_earned',
  CONTRACT_SIGNED = 'contract_signed',
  PAYMENT_RECEIVED = 'payment_received',
  FOLLOWUP_REQUIRED = 'followup_required',
  DEADLINE_APPROACHING = 'deadline_approaching',
  COMPETITOR_ACTIVITY = 'competitor_activity',
  CLIENT_REQUEST = 'client_request'
}

enum DealCategory {
  NEW_BUSINESS = 'new_business',
  EXISTING_CLIENT = 'existing_client',
  PARTNERSHIP = 'partnership',
  REFERRAL = 'referral',
  AFFILIATE = 'affiliate',
  DIRECT = 'direct'
}

enum DealStage {
  LEAD = 'lead',
  QUALIFIED = 'qualified',
  PROPOSAL = 'proposal',
  NEGOTIATION = 'negotiation',
  CLOSED_WON = 'closed_won',
  CLOSED_LOST = 'closed_lost',
  ON_HOLD = 'on_hold'
}
```

## Application Hooks

```typescript
// Deal Notifications Management
export const useDealNotifications = () => {
  const [dealNotifications, setDealNotifications] = useState<DealNotification[]>([]);
  const [dealStats, setDealStats] = useState<DealStats>();
  const [activeDeals, setActiveDeals] = useState<Record<string, DealNotification[]>>({});
  const [isLoading, setIsLoading] = useState(false);

  const loadDealNotifications = useCallback(async (filters?: DealNotificationFilters) => {
    setIsLoading(true);
    try {
      const response = await dealsService.getDealNotifications({
        includeRead: true,
        limit: 50,
        filters,
        sortBy: 'timestamp',
        sortOrder: 'desc'
      });
      
      setDealNotifications(response.data);
      
      // Group by deal
      const grouped = response.data.reduce((acc: Record<string, DealNotification[]>, notification) => {
        if (!acc[notification.dealId]) {
          acc[notification.dealId] = [];
        }
        acc[notification.dealId].push(notification);
        return acc;
      }, {});
      
      setActiveDeals(grouped);
      
      // Calculate stats
      const stats = calculateDealStats(response.data);
      setDealStats(stats);
    } catch (error) {
      console.error('Failed to load deal notifications:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const markAsRead = useCallback(async (notificationId: string) => {
    await dealsService.markNotificationAsRead(notificationId);
    setDealNotifications(prev => prev.map(notification =>
      notification.id === notificationId
        ? { ...notification, isRead: true }
        : notification
    ));
  }, []);

  const markDealAsRead = useCallback(async (dealId: string) => {
    await dealsService.markDealNotificationsAsRead(dealId);
    setDealNotifications(prev => prev.map(notification =>
      notification.dealId === dealId
        ? { ...notification, isRead: true }
        : notification
    ));
  }, []);

  return {
    dealNotifications,
    dealStats,
    activeDeals,
    isLoading,
    loadDealNotifications,
    markAsRead,
    markDealAsRead
  };
};

// Deal Statistics
export const useDealStatistics = () => {
  const calculateDealStats = useCallback((notifications: DealNotification[]): DealStats => {
    const totalValue = notifications.reduce((sum, notification) => 
      sum + (notification.value || 0), 0
    );
    
    const wonDeals = notifications.filter(n => n.type === 'deal_won');
    const lostDeals = notifications.filter(n => n.type === 'deal_lost');
    const activeDeals = notifications.filter(n => 
      n.stage !== 'closed_won' && n.stage !== 'closed_lost'
    );
    
    const totalCommission = notifications.reduce((sum, notification) => 
      sum + (notification.metadata.estimatedCommission || 0), 0
    );
    
    const stageDistribution = notifications.reduce((acc, notification) => {
      acc[notification.stage] = (acc[notification.stage] || 0) + 1;
      return acc;
    }, {} as Record<DealStage, number>);
    
    return {
      totalDeals: notifications.length,
      totalValue,
      wonDeals: wonDeals.length,
      lostDeals: lostDeals.length,
      activeDeals: activeDeals.length,
      totalCommission,
      stageDistribution,
      winRate: wonDeals.length / (wonDeals.length + lostDeals.length) || 0
    };
  }, []);

  return { calculateDealStats };
};

// Deal Filtering
export const useDealFilters = () => {
  const [filters, setFilters] = useState<DealFilters>({
    stage: 'all',
    category: 'all',
    valueRange: { min: 0, max: 1000000 },
    dateRange: { start: null, end: null },
    assignee: 'all',
    priority: 'all'
  });

  const applyFilter = useCallback((filterKey: keyof DealFilters, value: any) => {
    setFilters(prev => ({ ...prev, [filterKey]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      stage: 'all',
      category: 'all',
      valueRange: { min: 0, max: 1000000 },
      dateRange: { start: null, end: null },
      assignee: 'all',
      priority: 'all'
    });
  }, []);

  const filterNotifications = useCallback((notifications: DealNotification[]): DealNotification[] => {
    return notifications.filter(notification => {
      if (filters.stage !== 'all' && notification.stage !== filters.stage) {
        return false;
      }
      
      if (filters.category !== 'all' && notification.category !== filters.category) {
        return false;
      }
      
      if (notification.value && (notification.value < filters.valueRange.min || notification.value > filters.valueRange.max)) {
        return false;
      }
      
      if (filters.dateRange.start && notification.timestamp < filters.dateRange.start) {
        return false;
      }
      
      if (filters.dateRange.end && notification.timestamp > filters.dateRange.end) {
        return false;
      }
      
      if (filters.assignee !== 'all' && notification.assignee.id !== filters.assignee) {
        return false;
      }
      
      if (filters.priority !== 'all' && notification.priority !== filters.priority) {
        return false;
      }
      
      return true;
    });
  }, [filters]);

  return { filters, applyFilter, clearFilters, filterNotifications };
};
```

## Component Architecture

### DealsNotificationsContainer

```typescript
interface DealsNotificationsContainerProps {
  initialFilters?: Partial<DealFilters>;
}

export const DealsNotificationsContainer: React.FC<DealsNotificationsContainerProps> = ({
  initialFilters = {}
}) => {
  const {
    dealNotifications,
    dealStats,
    activeDeals,
    isLoading,
    loadDealNotifications,
    markAsRead,
    markDealAsRead
  } = useDealNotifications();

  const { filters, applyFilter, clearFilters, filterNotifications } = useDealFilters();
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'cards' | 'stats'>('list');

  const filteredNotifications = filterNotifications(dealNotifications);
  const totalUnread = dealNotifications.filter(n => !n.isRead).length;

  useEffect(() => {
    loadDealNotifications();
  }, [loadDealNotifications]);

  return (
    <DealsLayout>
      <DealsHeader>
        <HeaderLeft>
          <DealsTitle>Business Deals</DealsTitle>
          {totalUnread > 0 && (
            <UnreadCountBadge count={totalUnread} />
          )}
        </HeaderLeft>
        
        <HeaderActions>
          <ViewModeToggle
            mode={viewMode}
            onChange={setViewMode}
            options={[
              { value: 'list', label: 'List', icon: ListIcon },
              { value: 'cards', label: 'Cards', icon: DashboardIcon },
              { value: 'stats', label: 'Stats', icon: BarChartIcon }
            ]}
          />
          <FilterButton 
            onClick={() => setShowFilters(!showFilters)} 
            isActive={hasActiveFilters}
          />
          {totalUnread > 0 && (
            <MarkAllReadButton onClick={() => Object.keys(activeDeals).forEach(markDealAsRead)}>
              Mark All Read
            </MarkAllReadButton>
          )}
        </HeaderActions>
      </DealsHeader>

      {dealStats && viewMode === 'stats' && (
        <DealStatisticsPanel stats={dealStats} />
      )}

      {showFilters && (
        <DealFiltersPanel
          filters={filters}
          onFilterChange={applyFilter}
          onClearFilters={clearFilters}
        />
      )}

      <DealsContent>
        {isLoading && dealNotifications.length === 0 ? (
          <DealsLoader />
        ) : filteredNotifications.length === 0 ? (
          <EmptyDealsState hasFilters={hasActiveFilters} />
        ) : viewMode === 'cards' ? (
          <DealCardsGrid
            notifications={filteredNotifications}
            activeDeals={activeDeals}
            onMarkAsRead={markAsRead}
            onMarkDealAsRead={markDealAsRead}
          />
        ) : (
          <DealsList
            notifications={filteredNotifications}
            activeDeals={activeDeals}
            onMarkAsRead={markAsRead}
            onMarkDealAsRead={markDealAsRead}
          />
        )}
      </DealsContent>
    </DealsLayout>
  );
};
```

### DealNotificationCard

```typescript
interface DealNotificationCardProps {
  notification: DealNotification;
  onMarkAsRead: (id: string) => void;
  onViewDeal?: (dealId: string) => void;
  showClientInfo?: boolean;
}

export const DealNotificationCard: React.FC<DealNotificationCardProps> = ({
  notification,
  onMarkAsRead,
  onViewDeal,
  showClientInfo = true
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMarkAsRead = useCallback(async () => {
    setIsProcessing(true);
    try {
      await onMarkAsRead(notification.id);
    } finally {
      setIsProcessing(false);
    }
  }, [notification.id, onMarkAsRead]);

  const handleViewDeal = useCallback(() => {
    onViewDeal?.(notification.dealId);
  }, [notification.dealId, onViewDeal]);

  const formatCurrency = useCallback((amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(amount);
  }, []);

  return (
    <DealCardContainer isRead={notification.isRead} priority={notification.priority}>
      <DealCardHeader onClick={() => setIsExpanded(!isExpanded)}>
        <DealLeft>
          <DealIcon type={notification.type} stage={notification.stage} />
          
          <DealContent>
            <DealTitle isRead={notification.isRead}>
              {notification.title}
              {notification.deadline && new Date(notification.deadline) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) && (
                <UrgentDeadlineBadge />
              )}
            </DealTitle>
            
            <DealDescription isRead={notification.isRead}>
              {notification.description}
            </DealDescription>
            
            <DealMetadata>
              <DealStage stage={notification.stage} />
              <AssigneeInfo assignee={notification.assignee} />
              <Timestamp timestamp={notification.timestamp} />
              {notification.value && (
                <DealValue value={notification.value} currency={notification.currency} />
              )}
            </DealMetadata>
          </DealContent>
        </DealLeft>

        <DealRight>
          {!notification.isRead && (
            <UnreadIndicator />
          )}
          <DealActions>
            <ActionButton onClick={handleViewDeal} variant="outlined">
              View Deal
            </ActionButton>
            {!notification.isRead && (
              <ActionButton 
                onClick={handleMarkAsRead} 
                disabled={isProcessing}
                variant="text"
              >
                {isProcessing ? 'Marking...' : 'Mark Read'}
              </ActionButton>
            )}
          </DealActions>
          <ExpandButton isExpanded={isExpanded} />
        </DealRight>
      </DealCardHeader>

      {isExpanded && (
        <DealExpandedContent>
          {showClientInfo && notification.client && (
            <ClientSection client={notification.client} />
          )}
          
          {notification.metadata.expectedCloseDate && (
            <TimelineSection>
              <TimelineItem
                label="Expected Close"
                date={notification.metadata.expectedCloseDate}
                type="deadline"
              />
            </TimelineSection>
          )}
          
          {notification.metadata.estimatedCommission && (
            <CommissionSection
              estimatedCommission={notification.metadata.estimatedCommission}
              commissionRate={notification.metadata.commissionRate}
              dealValue={notification.value}
            />
          )}
          
          {notification.documents && notification.documents.length > 0 && (
            <DocumentsSection documents={notification.documents} />
          )}
          
          {notification.actions && notification.actions.length > 0 && (
            <QuickActions actions={notification.actions} />
          )}
          
          {notification.metadata.nextSteps && notification.metadata.nextSteps.length > 0 && (
            <NextStepsSection steps={notification.metadata.nextSteps} />
          )}
        </DealExpandedContent>
      )}
    </DealCardContainer>
  );
};
```

### DealStatisticsPanel

```typescript
interface DealStatisticsPanelProps {
  stats: DealStats;
}

export const DealStatisticsPanel: React.FC<DealStatisticsPanelProps> = ({ stats }) => {
  return (
    <StatsContainer>
      <StatsHeader>
        <StatsTitle>Business Overview</StatsTitle>
        <StatsPeriod>Last 30 Days</StatsPeriod>
      </StatsHeader>
      
      <StatsGrid>
        <StatCard>
          <StatIcon component={BusinessIcon} color="#f6b75e" />
          <StatValue>{stats.totalDeals}</StatValue>
          <StatLabel>Total Deals</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatIcon component={AttachMoneyIcon} color="#22c55e" />
          <StatValue>{formatCurrency(stats.totalValue)}</StatValue>
          <StatLabel>Total Value</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatIcon component={TrendingUpIcon} color="#3b82f6" />
          <StatValue>{Math.round(stats.winRate * 100)}%</StatValue>
          <StatLabel>Win Rate</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatIcon component={AccountBalanceWalletIcon} color="#8b5cf6" />
          <StatValue>{formatCurrency(stats.totalCommission)}</StatValue>
          <StatLabel>Est. Commission</StatLabel>
        </StatCard>
      </StatsGrid>
      
      <StageDistributionChart distribution={stats.stageDistribution} />
      
      <QuickStats>
        <QuickStat>
          <QuickStatLabel>Active Deals</QuickStatLabel>
          <QuickStatValue>{stats.activeDeals}</QuickStatValue>
        </QuickStat>
        
        <QuickStat>
          <QuickStatLabel>Won This Month</QuickStatLabel>
          <QuickStatValue>{stats.wonDeals}</QuickStatValue>
        </QuickStat>
        
        <QuickStat>
          <QuickStatLabel>Lost This Month</QuickStatLabel>
          <QuickStatValue>{stats.lostDeals}</QuickStatValue>
        </QuickStat>
      </QuickStats>
    </StatsContainer>
  );
};
```

## Implementation Guidelines

### Deal Value Calculation

```typescript
export const useDealValueCalculation = () => {
  const calculateEstimatedCommission = useCallback((
    dealValue: number,
    commissionRate: number,
    dealStage: DealStage
  ): number => {
    // Adjust commission probability based on deal stage
    const stageProbability = {
      'lead': 0.1,
      'qualified': 0.3,
      'proposal': 0.6,
      'negotiation': 0.8,
      'closed_won': 1.0,
      'closed_lost': 0,
      'on_hold': 0.2
    };
    
    const probability = stageProbability[dealStage] || 0.5;
    return dealValue * commissionRate * probability;
  }, []);

  const calculateDealScore = useCallback((notification: DealNotification): number => {
    let score = 0;
    
    // Value-based scoring
    if (notification.value) {
      if (notification.value > 100000) score += 50;
      else if (notification.value > 50000) score += 35;
      else if (notification.value > 10000) score += 20;
    }
    
    // Stage-based scoring
    const stageScores = {
      'negotiation': 40,
      'proposal': 30,
      'qualified': 20,
      'lead': 10
    };
    
    score += stageScores[notification.stage] || 0;
    
    // Urgency scoring
    if (notification.deadline) {
      const daysUntilDeadline = Math.ceil(
        (notification.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      );
      
      if (daysUntilDeadline < 7) score += 30;
      else if (daysUntilDeadline < 30) score += 15;
    }
    
    return score;
  }, []);

  return { calculateEstimatedCommission, calculateDealScore };
};
```

## Features

### Comprehensive Deal Tracking
- Multi-stage deal pipeline management
- Value and commission tracking
- Client information integration
- Document management system

### Real-time Updates
- Instant deal stage notifications
- Commission earning alerts
- Deadline and follow-up reminders
- Competitor activity updates

### Analytics and Insights
- Deal performance statistics
- Win rate tracking
- Revenue forecasting
- Conversion analytics

### Interactive Actions
- Quick deal status updates
- Document upload and management
- Client communication shortcuts
- Task assignment and tracking

## Security Considerations

- Client data protection
- Commission calculation accuracy
- Access control for sensitive deal information
- Audit trail for deal modifications

## Accessibility

- Screen reader support for deal information
- Keyboard navigation for deal actions
- High contrast mode support
- Clear visual hierarchy for deal stages