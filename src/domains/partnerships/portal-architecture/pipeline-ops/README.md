# Pipeline Operations

Comprehensive pipeline management system for deal acquisition, prospect management, recruitment, and client submission workflows.

## Overview

Pipeline Operations serves as the central hub for managing all business development activities within the SISO partnership ecosystem. This module provides tools and workflows for acquiring new deals, managing prospects, handling recruitment processes, submitting clients, and utilizing specialized tools to optimize partnership success rates.

## Architecture

The Pipeline Operations module follows a layered architecture:

```
┌─────────────────────────────────────────────────────────┐
│                    UI Layer                              │
├─────────────────────────────────────────────────────────┤
│                 Application Layer                        │
├─────────────────────────────────────────────────────────┤
│                  Domain Layer                            │
├─────────────────────────────────────────────────────────┤
│               Infrastructure Layer                       │
└─────────────────────────────────────────────────────────┘
```

## Domain Types

```typescript
interface PipelineOperation {
  id: string;
  type: PipelineType;
  stage: PipelineStage;
  status: PipelineStatus;
  priority: PipelinePriority;
  assignee: PipelineAssignee;
  source: PipelineSource;
  value?: number;
  probability: number;
  estimatedCloseDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  metadata: PipelineMetadata;
}

interface PipelineAssignee {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  department: string;
  capacity: number;
  currentWorkload: number;
}

interface PipelineSource {
  id: string;
  type: SourceType;
  name: string;
  campaignId?: string;
  referralSource?: string;
  cost?: number;
  conversionRate?: number;
}

interface PipelineMetadata {
  tags: string[];
  customFields: Record<string, any>;
  documents: PipelineDocument[];
  activities: PipelineActivity[];
  nextActions: PipelineAction[];
  riskFactors: string[];
  successFactors: string[];
}

enum PipelineType {
  CLIENT_ACQUISITION = 'client_acquisition',
  PARTNER_RECRUITMENT = 'partner_recruitment',
  TALENT_ACQUISITION = 'talent_acquisition',
  STRATEGIC_ALLIANCE = 'strategic_alliance',
  REFERRAL_PROGRAM = 'referral_program'
}

enum PipelineStage {
  LEAD_GENERATION = 'lead_generation',
  QUALIFICATION = 'qualification',
  INITIAL_CONTACT = 'initial_contact',
  NEEDS_ANALYSIS = 'needs_analysis',
  PROPOSAL_DEVELOPMENT = 'proposal_development',
  NEGOTIATION = 'negotiation',
  CLOSING = 'closing',
  ONBOARDING = 'onboarding',
  CLOSED_WON = 'closed_won',
  CLOSED_LOST = 'closed_lost'
}
```

## Application Hooks

```typescript
// Pipeline Management
export const usePipelineManagement = () => {
  const [pipelineItems, setPipelineItems] = useState<PipelineOperation[]>([]);
  const [pipelineStats, setPipelineStats] = useState<PipelineStats>();
  const [selectedStage, setSelectedStage] = useState<PipelineStage | 'all'>('all');
  const [isLoading, setIsLoading] = useState(false);

  const loadPipelineItems = useCallback(async (filters?: PipelineFilters) => {
    setIsLoading(true);
    try {
      const response = await pipelineService.getPipelineItems({
        stage: selectedStage === 'all' ? undefined : selectedStage,
        includeClosed: false,
        limit: 100,
        filters
      });
      
      setPipelineItems(response.data);
      
      const stats = calculatePipelineStats(response.data);
      setPipelineStats(stats);
    } catch (error) {
      console.error('Failed to load pipeline items:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedStage]);

  const updatePipelineStage = useCallback(async (itemId: string, newStage: PipelineStage) => {
    const updatedItem = await pipelineService.updateStage(itemId, newStage);
    
    setPipelineItems(prev => prev.map(item =>
      item.id === itemId
        ? { ...item, stage: newStage, updatedAt: new Date() }
        : item
    ));
    
    // Log the stage change
    analytics.track('pipeline_stage_updated', {
      item_id: itemId,
      previous_stage: pipelineItems.find(item => item.id === itemId)?.stage,
      new_stage: newStage,
      timestamp: new Date().toISOString()
    });
    
    return updatedItem;
  }, [pipelineItems]);

  return {
    pipelineItems,
    pipelineStats,
    selectedStage,
    isLoading,
    loadPipelineItems,
    updatePipelineStage,
    setSelectedStage
  };
};

// Pipeline Analytics
export const usePipelineAnalytics = () => {
  const [analytics, setAnalytics] = useState<PipelineAnalytics>();
  const [conversionRates, setConversionRates] = useState<ConversionRates>();

  const loadAnalytics = useCallback(async (timeRange: TimeRange) => {
    const response = await pipelineService.getAnalytics(timeRange);
    setAnalytics(response);
    
    // Calculate conversion rates between stages
    const rates = calculateConversionRates(response.stageData);
    setConversionRates(rates);
  }, []);

  const generateForecast = useCallback((pipelineItems: PipelineOperation[]): Forecast => {
    const activeDeals = pipelineItems.filter(item => 
      item.stage !== 'closed_won' && item.stage !== 'closed_lost'
    );
    
    const forecastValue = activeDeals.reduce((total, deal) => {
      return total + (deal.value || 0) * deal.probability;
    }, 0);
    
    const forecastByMonth = groupDealsByExpectedCloseDate(activeDeals);
    
    return {
      totalValue: forecastValue,
      expectedCloseCount: activeDeals.length,
      byMonth: forecastByMonth,
      confidence: calculateForecastConfidence(activeDeals)
    };
  }, []);

  return { analytics, conversionRates, loadAnalytics, generateForecast };
};

// Pipeline Automation
export const usePipelineAutomation = () => {
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const loadAutomationRules = useCallback(async () => {
    const rules = await pipelineService.getAutomationRules();
    setAutomationRules(rules);
  }, []);

  const createAutomationRule = useCallback(async (rule: CreateAutomationRule) => {
    const newRule = await pipelineService.createAutomationRule(rule);
    setAutomationRules(prev => [...prev, newRule]);
    return newRule;
  }, []);

  const processAutomation = useCallback(async (trigger: AutomationTrigger) => {
    setIsProcessing(true);
    try {
      const applicableRules = automationRules.filter(rule => 
        rule.trigger.type === trigger.type && 
        rule.trigger.conditions.every(condition => 
          evaluateCondition(condition, trigger.data)
        )
      );

      for (const rule of applicableRules) {
        await executeAutomationAction(rule.action, trigger.data);
      }
    } finally {
      setIsProcessing(false);
    }
  }, [automationRules]);

  return {
    automationRules,
    isProcessing,
    loadAutomationRules,
    createAutomationRule,
    processAutomation
  };
};
```

## Component Architecture

### PipelineOperationsContainer

```typescript
interface PipelineOperationsContainerProps {
  initialView?: 'kanban' | 'list' | 'analytics';
  initialFilters?: PipelineFilters;
}

export const PipelineOperationsContainer: React.FC<PipelineOperationsContainerProps> = ({
  initialView = 'kanban',
  initialFilters = {}
}) => {
  const {
    pipelineItems,
    pipelineStats,
    selectedStage,
    isLoading,
    loadPipelineItems,
    updatePipelineStage,
    setSelectedStage
  } = usePipelineManagement();

  const { analytics, conversionRates, loadAnalytics, generateForecast } = usePipelineAnalytics();

  const [viewMode, setViewMode] = useState<PipelineViewMode>(initialView);
  const [filters, setFilters] = useState<PipelineFilters>({ ...defaultFilters, ...initialFilters });
  const [showAutomation, setShowAutomation] = useState(false);

  useEffect(() => {
    loadPipelineItems(filters);
    loadAnalytics({ start: daysAgo(30), end: new Date() });
  }, [loadPipelineItems, loadAnalytics, filters]);

  const filteredItems = useMemo(() => {
    return pipelineItems.filter(item => applyPipelineFilters(item, filters));
  }, [pipelineItems, filters]);

  const forecast = useMemo(() => generateForecast(filteredItems), [filteredItems, generateForecast]);

  return (
    <PipelineLayout>
      <PipelineHeader>
        <HeaderLeft>
          <PipelineTitle>Operations Pipeline</PipelineTitle>
          <PipelineStats stats={pipelineStats} />
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
          <FilterButton onClick={() => setShowFilters(!showFilters)} />
          <AutomationButton onClick={() => setShowAutomation(!showAutomation)} />
        </HeaderActions>
      </PipelineHeader>

      <PipelineNavigation>
        <StageFilter
          stages={getPipelineStages()}
          selectedStage={selectedStage}
          onStageChange={setSelectedStage}
          counts={pipelineStats?.stageDistribution}
        />
      </PipelineNavigation>

      {showFilters && (
        <PipelineFiltersPanel
          filters={filters}
          onFilterChange={setFilters}
          onClearFilters={() => setFilters(defaultFilters)}
        />
      )}

      <PipelineContent>
        {viewMode === 'analytics' ? (
          <PipelineAnalyticsView
            analytics={analytics}
            conversionRates={conversionRates}
            forecast={forecast}
          />
        ) : viewMode === 'kanban' ? (
          <PipelineKanbanBoard
            items={filteredItems}
            onStageUpdate={updatePipelineStage}
            stages={getPipelineStages()}
          />
        ) : (
          <PipelineListView
            items={filteredItems}
            onStageUpdate={updatePipelineStage}
            onItemEdit={handleItemEdit}
          />
        )}
      </PipelineContent>

      {showAutomation && (
        <PipelineAutomationPanel
          rules={automationRules}
          onRuleCreate={createAutomationRule}
          onRuleEdit={handleRuleEdit}
        />
      )}
    </PipelineLayout>
  );
};
```

### PipelineKanbanBoard

```typescript
interface PipelineKanbanBoardProps {
  items: PipelineOperation[];
  onStageUpdate: (itemId: string, newStage: PipelineStage) => void;
  stages: PipelineStage[];
}

export const PipelineKanbanBoard: React.FC<PipelineKanbanBoardProps> = ({
  items,
  onStageUpdate,
  stages
}) => {
  const [columns, setColumns] = useState< PipelineColumn[] >(
    stages.map(stage => ({
      id: stage,
      title: formatStageTitle(stage),
      stage,
      items: []
    }))
  );

  // Group items by stage
  useEffect(() => {
    const itemsByStage = items.reduce((acc, item) => {
      acc[item.stage] = acc[item.stage] || [];
      acc[item.stage].push(item);
      return acc;
    }, {} as Record<PipelineStage, PipelineOperation[]>);

    setColumns(prev => prev.map(column => ({
      ...column,
      items: itemsByStage[column.stage] || []
    })));
  }, [items]);

  const handleDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;

    const sourceStage = result.source.droppableId as PipelineStage;
    const destinationStage = result.destination.droppableId as PipelineStage;

    if (sourceStage !== destinationStage) {
      const item = columns.find(col => col.stage === sourceStage)?.items[result.source.index];
      if (item) {
        onStageUpdate(item.id, destinationStage);
      }
    }
  }, [columns, onStageUpdate]);

  return (
    <KanbanBoard>
      <DragDropContext onDragEnd={handleDragEnd}>
        {columns.map((column) => (
          <PipelineColumn key={column.id}>
            <ColumnHeader>
              <ColumnTitle>{column.title}</ColumnTitle>
              <ColumnMetrics
                count={column.items.length}
                totalValue={column.items.reduce((sum, item) => sum + (item.value || 0), 0)}
              />
            </ColumnHeader>
            
            <Droppable droppableId={column.stage}>
              {(provided, snapshot) => (
                <ColumnItems
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {column.items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <PipelineItemCard
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          item={item}
                          isDragging={snapshot.isDragging}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ColumnItems>
              )}
            </Droppable>
          </PipelineColumn>
        ))}
      </DragDropContext>
    </KanbanBoard>
  );
};
```

### PipelineAnalyticsView

```typescript
interface PipelineAnalyticsViewProps {
  analytics?: PipelineAnalytics;
  conversionRates?: ConversionRates;
  forecast: Forecast;
}

export const PipelineAnalyticsView: React.FC<PipelineAnalyticsViewProps> = ({
  analytics,
  conversionRates,
  forecast
}) => {
  return (
    <AnalyticsLayout>
      <AnalyticsHeader>
        <AnalyticsTitle>Performance Analytics</AnalyticsTitle>
        <DateRangeSelector
          value={dateRange}
          onChange={setDateRange}
        />
      </AnalyticsHeader>

      <AnalyticsGrid>
        <AnalyticsCard title="Pipeline Health">
          <PipelineHealthChart
            data={analytics?.healthMetrics}
            thresholds={HEALTH_THRESHOLDS}
          />
        </AnalyticsCard>

        <AnalyticsCard title="Conversion Rates">
          <ConversionRatesChart
            rates={conversionRates}
            benchmarks={INDUSTRY_BENCHMARKS}
          />
        </AnalyticsCard>

        <AnalyticsCard title="Revenue Forecast">
          <RevenueForecastChart
            forecast={forecast}
            historicalData={analytics?.revenueHistory}
          />
        </AnalyticsCard>

        <AnalyticsCard title="Source Performance">
          <SourcePerformanceChart
            data={analytics?.sourcePerformance}
          />
        </AnalyticsCard>
      </AnalyticsGrid>

      <DetailedAnalytics>
        <StageAnalysis analytics={analytics} />
        <SourceAnalysis analytics={analytics} />
        <TrendAnalysis analytics={analytics} />
      </DetailedAnalytics>
    </AnalyticsLayout>
  );
};
```

## Implementation Guidelines

### Pipeline Configuration

```typescript
export const pipelineConfig: PipelineConfiguration = {
  stages: [
    { id: 'lead_generation', title: 'Lead Generation', color: '#3b82f6', order: 1 },
    { id: 'qualification', title: 'Qualification', color: '#8b5cf6', order: 2 },
    { id: 'initial_contact', title: 'Initial Contact', color: '#06b6d4', order: 3 },
    { id: 'needs_analysis', title: 'Needs Analysis', color: '#10b981', order: 4 },
    { id: 'proposal_development', title: 'Proposal', color: '#f59e0b', order: 5 },
    { id: 'negotiation', title: 'Negotiation', color: '#ef4444', order: 6 },
    { id: 'closing', title: 'Closing', color: '#ec4899', order: 7 },
    { id: 'onboarding', title: 'Onboarding', color: '#22c55e', order: 8 }
  ],
  
  automations: [
    {
      trigger: { type: 'stage_change', stage: 'qualification' },
      actions: [
        { type: 'send_email', template: 'follow_up_qualification' },
        { type: 'assign_task', assigneeRole: 'sales_rep' }
      ]
    },
    {
      trigger: { type: 'date_based', daysBeforeClosing: 7 },
      actions: [
        { type: 'send_notification', message: 'Deal closing soon' },
        { type: 'update_priority', priority: 'high' }
      ]
    }
  ],
  
  validation: {
    requiredFields: ['title', 'assignee', 'source'],
    stageValidation: {
      'proposal_development': ['value', 'probability'],
      'negotiation': ['contract_terms', 'stakeholders']
    }
  }
};
```

### Performance Optimization

```typescript
export const usePipelineOptimization = () => {
  const analyzeBottlenecks = useCallback((items: PipelineOperation[]): BottleneckAnalysis => {
    const stageDurations = calculateStageDurations(items);
    const avgDurations = calculateAverageStageDurations(stageDurations);
    
    const bottlenecks = Object.entries(avgDurations)
      .filter(([_, duration]) => duration > BOTTLENECK_THRESHOLD)
      .map(([stage, duration]) => ({
        stage,
        averageDuration: duration,
        impact: calculateBottleneckImpact(stage, items)
      }));
    
    return {
      bottlenecks,
      recommendations: generateBottleneckRecommendations(bottlenecks),
      potentialImprovement: calculatePotentialImprovement(bottlenecks, items)
    };
  }, []);

  const optimizeResourceAllocation = useCallback((items: PipelineOperation[]): ResourceOptimization => {
    const workloadDistribution = calculateWorkloadDistribution(items);
    const performanceMetrics = calculateAssigneePerformance(items);
    
    return {
      currentAllocation: workloadDistribution,
      recommendations: generateReallocationRecommendations(workloadDistribution, performanceMetrics),
      expectedImprovement: calculateExpectedImprovement(workloadDistribution, performanceMetrics)
    };
  }, []);

  return { analyzeBottlenecks, optimizeResourceAllocation };
};
```

## Features

### Pipeline Management
- Visual kanban board for stage tracking
- Drag-and-drop stage updates
- Customizable pipeline stages
- Automated workflows and triggers

### Deal Management
- Comprehensive deal tracking
- Value and probability management
- Document and attachment management
- Timeline and activity tracking

### Analytics & Reporting
- Real-time performance metrics
- Conversion rate analysis
- Revenue forecasting
- Source effectiveness tracking

### Automation
- Custom automation rules
- Workflow triggers and actions
- Task assignment automation
- Communication automation

## Security Considerations

- Role-based access control for pipeline operations
- Data encryption for sensitive deal information
- Audit trail for all pipeline activities
- Compliance with data protection regulations

## Accessibility

- Screen reader support for pipeline navigation
- Keyboard navigation for all interactions
- High contrast mode support
- Clear visual indicators for pipeline stages