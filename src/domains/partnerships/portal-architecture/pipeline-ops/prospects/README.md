# Prospects Management

Lead generation, prospect qualification, and lead nurturing workflows for potential partnership opportunities.

## Overview

Prospects Management provides comprehensive tools for identifying, qualifying, and nurturing potential business leads. This module enables partners to track prospect interactions, manage lead scoring, automate follow-ups, and convert qualified leads into active deals through systematic nurturing processes.

## Domain Types

```typescript
interface Prospect {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company: CompanyInfo;
  source: ProspectSource;
  status: ProspectStatus;
  score: ProspectScore;
  temperature: LeadTemperature;
  assignee?: LeadAssignee;
  tags: string[];
  customFields: Record<string, any>;
  activities: ProspectActivity[];
  communicationHistory: CommunicationHistory[];
  nurtureCampaign?: NurtureCampaign;
  createdAt: Date;
  updatedAt: Date;
  lastContactDate?: Date;
  nextFollowUpDate?: Date;
  metadata: ProspectMetadata;
}

interface CompanyInfo {
  name: string;
  industry: string;
  size: CompanySize;
  revenue?: number;
  website?: string;
  address?: Address;
  description?: string;
  technologies?: string[];
  currentPartnerships?: Partnership[];
  decisionMakers: DecisionMaker[];
  painPoints: string[];
}

interface ProspectSource {
  type: SourceType;
  sourceName: string;
  campaignId?: string;
  referralSource?: string;
  cost?: number;
  acquisitionDate: Date;
  conversionProbability?: number;
  sourceDetails: Record<string, any>;
}

interface ProspectScore {
  total: number;
  demographicScore: number;
  behavioralScore: number;
  firmographicScore: number;
  engagementScore: number;
  lastCalculated: Date;
  scoringFactors: ScoringFactor[];
}

interface NurtureCampaign {
  id: string;
  name: string;
  currentStep: number;
  totalSteps: number;
  startDate: Date;
  nextStepDate: Date;
  status: CampaignStatus;
  engagementMetrics: CampaignMetrics;
}

enum ProspectStatus {
  NEW = 'new',
  CONTACTED = 'contacted',
  ENGAGED = 'engaged',
  QUALIFIED = 'qualified',
  NURTURING = 'nurturing',
  CONVERTED = 'converted',
  DISQUALIFIED = 'disqualified',
  ARCHIVED = 'archived'
}

enum LeadTemperature {
  COLD = 'cold',
  WARM = 'warm',
  HOT = 'hot'
}

enum SourceType {
  WEBSITE_FORM = 'website_form',
  COLD_EMAIL = 'cold_email',
  REFERRAL = 'referral',
  SOCIAL_MEDIA = 'social_media',
  EVENT = 'event',
  PARTNER_REFERRAL = 'partner_referral',
  CONTENT_DOWNLOAD = 'content_download',
  WEBINAR = 'webinar',
  OUTREACH = 'outreach',
  PURCHASED_LIST = 'purchased_list'
}
```

## Application Hooks

```typescript
// Prospects Management
export const useProspects = () => {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [prospectStats, setProspectStats] = useState<ProspectStats>();
  const [leadSources, setLeadSources] = useState<LeadSource[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadProspects = useCallback(async (filters?: ProspectFilters) => {
    setIsLoading(true);
    try {
      const response = await prospectsService.getProspects({
        includeArchived: false,
        limit: 100,
        filters
      });
      
      setProspects(response.data);
      
      // Calculate statistics
      const stats = calculateProspectStats(response.data);
      setProspectStats(stats);
    } catch (error) {
      console.error('Failed to load prospects:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProspectStatus = useCallback(async (prospectId: string, newStatus: ProspectStatus, notes?: string) => {
    const updatedProspect = await prospectsService.updateProspectStatus(prospectId, newStatus, notes);
    
    setProspects(prev => prev.map(prospect =>
      prospect.id === prospectId
        ? { ...prospect, status: newStatus, updatedAt: new Date() }
        : prospect
    ));
    
    // Log status change
    await prospectsService.logProspectActivity(prospectId, {
      type: 'status_change',
      previousStatus: prospects.find(p => p.id === prospectId)?.status,
      newStatus,
      notes,
      timestamp: new Date()
    });
    
    return updatedProspect;
  }, [prospects]);

  const assignToLead = useCallback(async (prospectId: string, assigneeId: string) => {
    const updatedProspect = await prospectsService.assignProspect(prospectId, assigneeId);
    
    setProspects(prev => prev.map(prospect =>
      prospect.id === prospectId
        ? { ...prospect, assignee: { id: assigneeId } as LeadAssignee }
        : prospect
    ));
    
    return updatedProspect;
  }, []);

  return {
    prospects,
    prospectStats,
    leadSources,
    isLoading,
    loadProspects,
    updateProspectStatus,
    assignToLead
  };
};

// Lead Scoring
export const useLeadScoring = () => {
  const [scoringRules, setScoringRules] = useState<ScoringRule[]>([]);

  const calculateScore = useCallback(async (prospect: Prospect): Promise<ProspectScore> => {
    let demographicScore = 0;
    let behavioralScore = 0;
    let firmographicScore = 0;
    let engagementScore = 0;
    
    const factors: ScoringFactor[] = [];

    // Demographic scoring
    if (prospect.company.size === 'enterprise') {
      demographicScore += 20;
      factors.push({ category: 'demographic', factor: 'Enterprise company', points: 20 });
    }
    
    if (prospect.company.industry in TARGET_INDUSTRIES) {
      demographicScore += 15;
      factors.push({ category: 'demographic', factor: 'Target industry', points: 15 });
    }

    // Behavioral scoring
    const recentActivities = prospect.activities.filter(activity => 
      activity.timestamp > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    );
    
    behavioralScore += recentActivities.length * 5;
    factors.push({ category: 'behavioral', factor: 'Recent activities', points: recentActivities.length * 5 });

    // Firmographic scoring
    if (prospect.company.revenue && prospect.company.revenue > 10000000) {
      firmographicScore += 25;
      factors.push({ category: 'firmographic', factor: 'High revenue company', points: 25 });
    }

    // Engagement scoring
    const recentEmails = prospect.communicationHistory.filter(comm => 
      comm.type === 'email' && comm.timestamp > new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
    );
    
    engagementScore += recentEmails.filter(email => email.opened).length * 3;
    engagementScore += recentEmails.filter(email => email.replied).length * 10;

    const totalScore = demographicScore + behavioralScore + firmographicScore + engagementScore;

    return {
      total: Math.min(100, totalScore),
      demographicScore,
      behavioralScore,
      firmographicScore,
      engagementScore,
      lastCalculated: new Date(),
      scoringFactors: factors
    };
  }, []);

  const updateScores = useCallback(async (prospects: Prospect[]) => {
    const updatedProspects = await Promise.all(
      prospects.map(async (prospect) => {
        const score = await calculateScore(prospect);
        await prospectsService.updateProspectScore(prospect.id, score);
        return { ...prospect, score };
      })
    );
    
    setProspects(updatedProspects);
    return updatedProspects;
  }, [calculateScore]);

  return { scoringRules, calculateScore, updateScores };
};

// Lead Nurturing
export const useLeadNurturing = () => {
  const [campaigns, setCampaigns] = useState<NurtureCampaign[]>([]);
  const [campaignTemplates, setCampaignTemplates] = useState<CampaignTemplate[]>([]);

  const enrollInCampaign = useCallback(async (prospectId: string, campaignId: string) => {
    const enrollment = await prospectsService.enrollInCampaign(prospectId, campaignId);
    
    setProspects(prev => prev.map(prospect =>
      prospect.id === prospectId
        ? { ...prospect, nurtureCampaign: enrollment }
        : prospect
    ));
    
    return enrollment;
  }, []);

  const processCampaignSteps = useCallback(async () => {
    const activeCampaigns = campaigns.filter(campaign => campaign.status === 'active');
    
    for (const campaign of activeCampaigns) {
      const prospectsInCampaign = prospects.filter(prospect => 
        prospect.nurtureCampaign?.id === campaign.id
      );
      
      for (const prospect of prospectsInCampaign) {
        if (prospect.nurtureCampaign?.nextStepDate <= new Date()) {
          await executeCampaignStep(prospect, campaign);
        }
      }
    }
  }, [campaigns, prospects]);

  return {
    campaigns,
    campaignTemplates,
    enrollInCampaign,
    processCampaignSteps
  };
};
```

## Component Architecture

### ProspectsContainer

```typescript
interface ProspectsContainerProps {
  initialView?: 'list' | 'cards' | 'analytics';
  initialFilters?: ProspectFilters;
}

export const ProspectsContainer: React.FC<ProspectsContainerProps> = ({
  initialView = 'list',
  initialFilters = {}
}) => {
  const {
    prospects,
    prospectStats,
    leadSources,
    isLoading,
    loadProspects,
    updateProspectStatus,
    assignToLead
  } = useProspects();

  const { calculateScore, updateScores } = useLeadScoring();
  const { campaigns, enrollInCampaign } = useLeadNurturing();

  const [viewMode, setViewMode] = useState<ProspectViewMode>(initialView);
  const [filters, setFilters] = useState<ProspectFilters>({ ...defaultFilters, ...initialFilters });
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);

  useEffect(() => {
    loadProspects(filters);
    loadLeadSources();
    loadCampaigns();
  }, [loadProspects, filters]);

  // Auto-update scores every hour
  useEffect(() => {
    const interval = setInterval(() => {
      updateScores(prospects);
    }, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [prospects, updateScores]);

  const filteredProspects = useMemo(() => {
    return prospects.filter(prospect => applyProspectFilters(prospect, filters));
  }, [prospects, filters]);

  const qualifiedProspects = filteredProspects.filter(p => p.status === 'qualified');
  const hotLeads = filteredProspects.filter(p => p.temperature === 'hot');

  return (
    <ProspectsLayout>
      <ProspectsHeader>
        <HeaderLeft>
          <ProspectsTitle>Prospects</ProspectsTitle>
          <ProspectStatsSummary
            total={filteredProspects.length}
            qualified={qualifiedProspects.length}
            hot={hotLeads.length}
            new={filteredProspects.filter(p => p.status === 'new').length}
          />
        </HeaderLeft>
        
        <HeaderActions>
          <ViewModeToggle
            mode={viewMode}
            onChange={setViewMode}
            options={[
              { value: 'list', label: 'List', icon: ListIcon },
              { value: 'cards', label: 'Cards', icon: ViewModuleIcon },
              { value: 'analytics', label: 'Analytics', icon: BarChartIcon }
            ]}
          />
          <AddProspectButton onClick={() => setShowProspectForm(true)} />
          <ImportButton onClick={() => setShowImportDialog(true)} />
        </HeaderActions>
      </ProspectsHeader>

      <ProspectsToolbar>
        <LeadTemperatureFilter
          value={filters.temperature}
          onChange={(temperature) => setFilters(prev => ({ ...prev, temperature }))}
        />
        
        <ScoreRangeFilter
          min={filters.minScore}
          max={filters.maxScore}
          onChange={(range) => setFilters(prev => ({ ...prev, ...range }))}
        />
        
        <SourceFilter
          sources={leadSources}
          value={filters.source}
          onChange={(source) => setFilters(prev => ({ ...prev, source }))}
        />
        
        <StatusFilter
          value={filters.status}
          onChange={(status) => setFilters(prev => ({ ...prev, status }))}
        />
      </ProspectsToolbar>

      <ProspectsContent>
        {viewMode === 'analytics' ? (
          <ProspectsAnalyticsView
            prospects={filteredProspects}
            stats={prospectStats}
            campaigns={campaigns}
          />
        ) : viewMode === 'cards' ? (
          <ProspectsCardsView
            prospects={filteredProspects}
            onProspectSelect={setSelectedProspect}
            onStatusUpdate={updateProspectStatus}
            onAssign={assignToLead}
            onEnroll={enrollInCampaign}
          />
        ) : (
          <ProspectsListView
            prospects={filteredProspects}
            onProspectSelect={setSelectedProspect}
            onStatusUpdate={updateProspectStatus}
            onAssign={assignToLead}
            onEnroll={enrollInCampaign}
          />
        )}
      </ProspectsContent>

      {selectedProspect && (
        <ProspectDetailPanel
          prospect={selectedProspect}
          onClose={() => setSelectedProspect(null)}
          onUpdate={(updates) => handleProspectUpdate(selectedProspect.id, updates)}
        />
      )}
    </ProspectsLayout>
  );
};
```

### ProspectCard

```typescript
interface ProspectCardProps {
  prospect: Prospect;
  onProspectSelect: (prospect: Prospect) => void;
  onStatusUpdate: (prospectId: string, status: ProspectStatus) => void;
  onAssign: (prospectId: string, assigneeId: string) => void;
  onEnroll: (prospectId: string, campaignId: string) => void;
  compact?: boolean;
}

export const ProspectCard: React.FC<ProspectCardProps> = ({
  prospect,
  onProspectSelect,
  onStatusUpdate,
  onAssign,
  onEnroll,
  compact = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const handleQuickStatusUpdate = useCallback((newStatus: ProspectStatus) => {
    onStatusUpdate(prospect.id, newStatus);
    setShowActions(false);
  }, [prospect.id, onStatusUpdate]);

  const getScoreColor = useCallback((score: number): string => {
    if (score >= 80) return '#22c55e'; // green
    if (score >= 60) return '#f59e0b'; // amber
    if (score >= 40) return '#f97316'; // orange
    return '#ef4444'; // red
  }, []);

  const daysSinceLastContact = prospect.lastContactDate
    ? Math.floor((Date.now() - prospect.lastContactDate.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <ProspectCardContainer compact={compact}>
      <ProspectCardHeader onClick={() => onProspectSelect(prospect)}>
        <ProspectLeft>
          <ProspectAvatar
            src={prospect.avatar}
            name={`${prospect.firstName} ${prospect.lastName}`}
          />
          
          <ProspectContent>
            <ProspectName>
              {prospect.firstName} {prospect.lastName}
              <LeadTemperature temperature={prospect.temperature} />
            </ProspectName>
            
            <ProspectCompany>
              <CompanyIcon />
              {prospect.company.name}
              <CompanySize size={prospect.company.size} />
              <IndustryTag industry={prospect.company.industry} />
            </ProspectCompany>
            
            <ProspectMetadata>
              <ScoreDisplay
                score={prospect.score.total}
                color={getScoreColor(prospect.score.total)}
              />
              <StatusBadge status={prospect.status} />
              <SourceTag source={prospect.source.type} />
              {daysSinceLastContact !== null && (
                <LastContact days={daysSinceLastContact} />
              )}
            </ProspectMetadata>
          </ProspectContent>
        </ProspectLeft>

        <ProspectRight>
          {prospect.assignee && (
            <AssigneeAvatar
              src={prospect.assignee.avatar}
              name={prospect.assignee.name}
            />
          )}
          <ProspectActions>
            <ActionButton onClick={() => setShowActions(!showActions)}>
              Quick Actions
            </ActionButton>
          </ProspectActions>
          <ExpandButton isExpanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)} />
        </ProspectRight>
      </ProspectCardHeader>

      {showActions && (
        <QuickActionsPanel>
          <StatusActions>
            <ActionButton 
              onClick={() => handleQuickStatusUpdate('qualified')}
              variant="contained"
              color="success"
            >
              Mark Qualified
            </ActionButton>
            <ActionButton 
              onClick={() => handleQuickStatusUpdate('nurturing')}
              variant="outlined"
            >
              Start Nurturing
            </ActionButton>
            <ActionButton 
              onClick={() => handleQuickStatusUpdate('disqualified')}
              variant="outlined"
              color="error"
            >
              Disqualify
            </ActionButton>
          </StatusActions>
          
          <ActionDivider />
          
          <OtherActions>
            <ActionButton onClick={() => composeEmail(prospect)}>
              Send Email
            </ActionButton>
            <ActionButton onClick={() => scheduleCall(prospect)}>
              Schedule Call
            </ActionButton>
            <ActionButton onClick={() => convertToDeal(prospect)}>
              Convert to Deal
            </ActionButton>
          </OtherActions>
        </QuickActionsPanel>
      )}

      {isExpanded && !compact && (
        <ProspectExpandedContent>
          <ContactInfoSection prospect={prospect} />
          
          <ScoreBreakdown score={prospect.score} />
          
          <RecentActivities activities={prospect.activities.slice(0, 5)} />
          
          {prospect.nurtureCampaign && (
            <NurtureCampaignStatus campaign={prospect.nurtureCampaign} />
          )}
          
          {prospect.tags.length > 0 && (
            <TagsSection tags={prospect.tags} />
          )}
        </ProspectExpandedContent>
      )}
    </ProspectCardContainer>
  );
};
```

### LeadScoringDashboard

```typescript
interface LeadScoringDashboardProps {
  prospects: Prospect[];
  scoringRules: ScoringRule[];
}

export const LeadScoringDashboard: React.FC<LeadScoringDashboardProps> = ({
  prospects,
  scoringRules
}) => {
  const [selectedRule, setSelectedRule] = useState<ScoringRule | null>(null);

  const scoreDistribution = useMemo(() => {
    return {
      hot: prospects.filter(p => p.temperature === 'hot').length,
      warm: prospects.filter(p => p.temperature === 'warm').length,
      cold: prospects.filter(p => p.temperature === 'cold').length
    };
  }, [prospects]);

  const averageScore = useMemo(() => {
    const totalScore = prospects.reduce((sum, prospect) => sum + prospect.score.total, 0);
    return prospects.length > 0 ? totalScore / prospects.length : 0;
  }, [prospects]);

  const topScoringFactors = useMemo(() => {
    const factorCounts = prospects.reduce((acc, prospect) => {
      prospect.score.scoringFactors.forEach(factor => {
        acc[factor.factor] = (acc[factor.factor] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(factorCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([factor, count]) => ({ factor, count }));
  }, [prospects]);

  return (
    <ScoringDashboardLayout>
      <DashboardHeader>
        <DashboardTitle>Lead Scoring Analytics</DashboardTitle>
        <ConfigureButton onClick={() => setShowScoringConfig(true)} />
      </DashboardHeader>

      <ScoringMetrics>
        <MetricCard
          title="Average Score"
          value={averageScore}
          format="number"
          icon={ScoreIcon}
        />
        
        <MetricCard
          title="Hot Leads"
          value={scoreDistribution.hot}
          change={calculateChange('hot', scoreDistribution)}
          icon={LocalFireDepartmentIcon}
          color="#ef4444"
        />
        
        <MetricCard
          title="Warm Leads"
          value={scoreDistribution.warm}
          change={calculateChange('warm', scoreDistribution)}
          icon={WhatshotIcon}
          color="#f59e0b"
        />
        
        <MetricCard
          title="Cold Leads"
          value={scoreDistribution.cold}
          change={calculateChange('cold', scoreDistribution)}
          icon={AcUnitIcon}
          color="#3b82f6"
        />
      </ScoringMetrics>

      <ScoringCharts>
        <ScoreDistributionChart prospects={prospects} />
        <ScoringFactorsChart factors={topScoringFactors} />
        <ScoreTrendChart prospects={prospects} />
        <ConversionByScoreChart prospects={prospects} />
      </ScoringCharts>

      <ScoringRules>
        <RulesHeader>
          <RulesTitle>Scoring Rules</RulesTitle>
          <AddRuleButton onClick={() => setShowRuleForm(true)} />
        </RulesHeader>
        
        <RulesList>
          {scoringRules.map((rule) => (
            <RuleItem
              key={rule.id}
              rule={rule}
              onEdit={() => setSelectedRule(rule)}
              onToggle={() => toggleRule(rule.id)}
              onDelete={() => deleteRule(rule.id)}
            />
          ))}
        </RulesList>
      </ScoringRules>

      {selectedRule && (
        <RuleEditPanel
          rule={selectedRule}
          onClose={() => setSelectedRule(null)}
          onSave={(updatedRule) => handleRuleUpdate(updatedRule)}
        />
      )}
    </ScoringDashboardLayout>
  );
};
```

## Implementation Guidelines

### Lead Scoring Algorithm

```typescript
export const leadScoringConfig: LeadScoringConfiguration = {
  demographicFactors: [
    { field: 'company.size', value: 'enterprise', points: 20 },
    { field: 'company.industry', value: 'technology', points: 15 },
    { field: 'company.revenue', operator: '>', value: 10000000, points: 25 },
    { field: 'job.title', contains: ['ceo', 'cto', 'director'], points: 10 }
  ],
  
  behavioralFactors: [
    { action: 'email_opened', points: 3, timeWindow: 30 },
    { action: 'email_clicked', points: 5, timeWindow: 30 },
    { action: 'website_visit', points: 2, timeWindow: 7 },
    { action: 'content_download', points: 10, timeWindow: 90 },
    { action: 'webinar_attended', points: 15, timeWindow: 180 }
  ],
  
  engagementFactors: [
    { metric: 'page_views', threshold: 10, points: 5 },
    { metric: 'time_on_site', threshold: 300, points: 8 },
    { metric: 'form_submissions', threshold: 1, points: 12 },
    { metric: 'meeting_scheduled', threshold: 1, points: 20 }
  ],
  
  thresholds: {
    hot: { min: 80, max: 100 },
    warm: { min: 60, max: 79 },
    cold: { min: 0, max: 59 }
  }
};
```

### Nurturing Campaign Templates

```typescript
export const nurturingTemplates: CampaignTemplate[] = [
  {
    id: 'new_lead_nurture',
    name: 'New Lead Nurturing',
    description: 'Multi-touch campaign for new leads',
    steps: [
      {
        day: 1,
        type: 'email',
        template: 'welcome_email',
        subject: 'Welcome to SISO Partnership Network'
      },
      {
        day: 3,
        type: 'email',
        template: 'value_proposition',
        subject: 'How SISO Can Transform Your Business'
      },
      {
        day: 7,
        type: 'email',
        template: 'case_study',
        subject: 'Success Stories from Our Partners'
      },
      {
        day: 14,
        type: 'email',
        template: 'invitation',
        subject: 'Schedule a Personalized Consultation'
      }
    ]
  },
  {
    id: 'engaged_prospect',
    name: 'Engaged Prospect Campaign',
    description: 'Campaign for prospects showing buying signals',
    steps: [
      {
        day: 1,
        type: 'email',
        template: 'personalized_outreach',
        subject: 'Following Up on Your Interest'
      },
      {
        day: 4,
        type: 'email',
        template: 'detailed_information',
        subject: 'More Information About Our Partnership'
      },
      {
        day: 10,
        type: 'call_task',
        template: 'follow_up_call',
        description: 'Schedule follow-up call with prospect'
      }
    ]
  }
];
```

## Features

### Lead Management
- Comprehensive prospect database with advanced filtering
- Lead scoring algorithm with customizable criteria
- Temperature tracking (hot/warm/cold)
- Status management and progression tracking

### Automated Nurturing
- Multi-step email nurture campaigns
- Behavioral trigger-based automation
- Personalized content delivery
- Engagement tracking and optimization

### Analytics & Insights
- Lead scoring performance analytics
- Conversion rate tracking
- Source effectiveness analysis
- Campaign performance metrics

### Team Collaboration
- Lead assignment and routing
- Activity logging and timeline
- Communication history tracking
- Team performance dashboards

## Security Considerations

- GDPR compliance for prospect data
- Consent management for communications
- Data encryption for personal information
- Access controls based on team roles

## Accessibility

- Screen reader support for prospect information
- Keyboard navigation for all interactions
- High contrast mode support
- Clear visual indicators for lead status and scoring