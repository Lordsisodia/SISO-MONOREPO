# Recruitment Management

## Overview
The Recruitment Management system provides a comprehensive platform for partner acquisition, onboarding, and relationship management within the SISO partnership ecosystem. This module enables efficient recruitment workflows, applicant tracking, and partner enrollment with automated processes and insightful analytics.

## Architecture

### Directory Structure
```
recruitment/
├── components/
│   ├── RecruitmentDashboard.tsx
│   ├── ApplicantTracker.tsx
│   ├── RecruitmentPipeline.tsx
│   ├── CandidateCard.tsx
│   ├── RecruitmentAnalytics.tsx
│   └── OnboardingWizard.tsx
├── hooks/
│   ├── useRecruitment.ts
│   ├── useApplicantTracking.ts
│   ├── useRecruitmentAnalytics.ts
│   └── useOnboarding.ts
├── services/
│   ├── recruitmentService.ts
│   ├── applicantService.ts
│   ├── onboardingService.ts
│   └── recruitmentAnalyticsService.ts
├── types/
│   ├── recruitment.types.ts
│   └── applicant.types.ts
└── utils/
    ├── recruitmentUtils.ts
    └── applicantUtils.ts
```

### Core Components

#### RecruitmentDashboard Component
```typescript
interface RecruitmentDashboardProps {
  viewMode: 'kanban' | 'list' | 'analytics';
  filters: RecruitmentFilters;
  onViewModeChange: (mode: 'kanban' | 'list' | 'analytics') => void;
  onFiltersChange: (filters: RecruitmentFilters) => void;
  className?: string;
}

export const RecruitmentDashboard: React.FC<RecruitmentDashboardProps> = ({
  viewMode,
  filters,
  onViewModeChange,
  onFiltersChange,
  className
}) => {
  const { 
    applicants, 
    pipelines, 
    stages, 
    loading, 
    fetchApplicants,
    updateApplicantStage,
    addApplicantNote
  } = useRecruitment(filters);

  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([]);
  const [showApplicantDetails, setShowApplicantDetails] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);

  const handleApplicantSelect = useCallback((applicantId: string, selected: boolean) => {
    setSelectedApplicants(prev => 
      selected 
        ? [...prev, applicantId]
        : prev.filter(id => id !== applicantId)
    );
  }, []);

  const handleApplicantOpen = useCallback((applicant: Applicant) => {
    setSelectedApplicant(applicant);
    setShowApplicantDetails(true);
  }, []);

  const handleStageChange = useCallback(async (
    applicantId: string, 
    newStageId: string
  ) => {
    try {
      await updateApplicantStage(applicantId, newStageId);
      toast.success('Applicant stage updated successfully');
    } catch (error) {
      console.error('Failed to update applicant stage:', error);
      toast.error('Failed to update applicant stage');
    }
  }, [updateApplicantStage]);

  const handleBulkActions = useCallback(async (action: BulkAction) => {
    switch (action) {
      case 'move_stage':
        await bulkUpdateStage(selectedApplicants);
        break;
      case 'send_email':
        await bulkSendEmail(selectedApplicants);
        break;
      case 'add_tags':
        await bulkAddTags(selectedApplicants);
        break;
      case 'archive':
        await bulkArchive(selectedApplicants);
        break;
      case 'delete':
        await bulkDelete(selectedApplicants);
        break;
    }
    setSelectedApplicants([]);
  }, [selectedApplicants]);

  const recruitmentStats = useMemo(() => {
    const total = applicants.length;
    const newApplications = applicants.filter(a => a.stage.type === 'application').length;
    const inReview = applicants.filter(a => a.stage.type === 'review').length;
    const interviews = applicants.filter(a => a.stage.type === 'interview').length;
    const offers = applicants.filter(a => a.stage.type === 'offer').length;
    const hired = applicants.filter(a => a.stage.type === 'hired').length;

    return {
      total,
      newApplications,
      inReview,
      interviews,
      offers,
      hired,
      conversionRate: total > 0 ? (hired / total) * 100 : 0
    };
  }, [applicants]);

  return (
    <div className="recruitment-dashboard">
      <div className="dashboard-header">
        <div className="header-title">
          <h1>Partner Recruitment</h1>
          <p className="text-muted-foreground">
            Manage partner applications and recruitment pipeline
          </p>
        </div>
        
        <div className="header-actions">
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Add Applicant
          </Button>
          
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import Applicants
          </Button>
        </div>
      </div>

      {/* Recruitment Stats */}
      <div className="recruitment-stats">
        <div className="stats-grid">
          <StatCard
            title="Total Applicants"
            value={recruitmentStats.total}
            change={getApplicantChange(applicants)}
            icon={<Users className="w-5 h-5" />}
          />
          
          <StatCard
            title="New Applications"
            value={recruitmentStats.newApplications}
            icon={<FileText className="w-5 h-5" />}
            color="blue"
          />
          
          <StatCard
            title="In Review"
            value={recruitmentStats.inReview}
            icon={<Search className="w-5 h-5" />}
            color="orange"
          />
          
          <StatCard
            title="Interviews"
            value={recruitmentStats.interviews}
            icon={<Video className="w-5 h-5" />}
            color="purple"
          />
          
          <StatCard
            title="Offers Extended"
            value={recruitmentStats.offers}
            icon={<Send className="w-5 h-5" />}
            color="green"
          />
          
          <StatCard
            title="Conversion Rate"
            value={`${recruitmentStats.conversionRate.toFixed(1)}%`}
            change={getConversionRateChange(applicants)}
            icon={<TrendingUp className="w-5 h-5" />}
            color="emerald"
          />
        </div>
      </div>

      {/* View Controls */}
      <div className="view-controls">
        <div className="filters-section">
          <RecruitmentFilters
            filters={filters}
            onFiltersChange={onFiltersChange}
            stages={stages}
          />
        </div>
        
        <div className="view-modes">
          <ToggleGroup
            type="single"
            value={viewMode}
            onValueChange={onViewModeChange}
          >
            <ToggleGroupItem value="kanban" aria-label="Kanban view">
              <Layout className="w-4 h-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <List className="w-4 h-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="analytics" aria-label="Analytics view">
              <BarChart className="w-4 h-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedApplicants.length > 0 && (
        <div className="bulk-actions-bar">
          <div className="selection-info">
            <span>{selectedApplicants.length} applicants selected</span>
            <Button variant="ghost" size="sm" onClick={() => setSelectedApplicants([])}>
              Clear selection
            </Button>
          </div>
          
          <div className="bulk-actions">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Move to Stage
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {stages.map(stage => (
                  <DropdownMenuItem 
                    key={stage.id}
                    onClick={() => handleBulkActions('move_stage')}
                  >
                    {stage.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="outline" size="sm" onClick={() => handleBulkActions('send_email')}>
              <Mail className="w-4 h-4 mr-1" />
              Send Email
            </Button>
            
            <Button variant="outline" size="sm" onClick={() => handleBulkActions('add_tags')}>
              <Tag className="w-4 h-4 mr-1" />
              Add Tags
            </Button>
            
            <Button variant="outline" size="sm" onClick={() => handleBulkActions('archive')}>
              <Archive className="w-4 h-4 mr-1" />
              Archive
            </Button>
            
            <Button variant="outline" size="sm" onClick={() => handleBulkActions('delete')}>
              <Trash className="w-4 h-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="dashboard-content">
        {viewMode === 'kanban' ? (
          <RecruitmentKanbanView
            stages={stages}
            applicants={applicants}
            selectedApplicants={selectedApplicants}
            onApplicantSelect={handleApplicantSelect}
            onApplicantOpen={handleApplicantOpen}
            onStageChange={handleStageChange}
          />
        ) : viewMode === 'list' ? (
          <RecruitmentListView
            applicants={applicants}
            selectedApplicants={selectedApplicants}
            onApplicantSelect={handleApplicantSelect}
            onApplicantOpen={handleApplicantOpen}
            onStageChange={handleStageChange}
          />
        ) : (
          <RecruitmentAnalyticsView
            applicants={applicants}
            stages={stages}
            filters={filters}
          />
        )}
      </div>

      {/* Applicant Details Modal */}
      <ApplicantDetailsDialog
        applicant={selectedApplicant}
        isOpen={showApplicantDetails}
        onClose={() => {
          setShowApplicantDetails(false);
          setSelectedApplicant(null);
        }}
        onStageChange={handleStageChange}
        onAddNote={addApplicantNote}
      />
    </div>
  );
};
```

#### ApplicantCard Component
```typescript
interface ApplicantCardProps {
  applicant: Applicant;
  isSelected: boolean;
  onSelect: (applicantId: string, selected: boolean) => void;
  onOpen: (applicant: Applicant) => void;
  onStageChange: (applicantId: string, newStageId: string) => void;
  compact?: boolean;
  className?: string;
}

export const ApplicantCard: React.FC<ApplicantCardProps> = ({
  applicant,
  isSelected,
  onSelect,
  onOpen,
  onStageChange,
  compact = false,
  className
}) => {
  const [showStageMenu, setShowStageMenu] = useState(false);
  const [loadingStageChange, setLoadingStageChange] = useState(false);

  const handleStageChange = useCallback(async (newStageId: string) => {
    try {
      setLoadingStageChange(true);
      await onStageChange(applicant.id, newStageId);
      setShowStageMenu(false);
    } finally {
      setLoadingStageChange(false);
    }
  }, [applicant.id, onStageChange]);

  const getStageColor = useCallback((stageType: string) => {
    const colors = {
      application: 'blue',
      review: 'orange',
      interview: 'purple',
      offer: 'green',
      hired: 'emerald',
      rejected: 'red',
      withdrawn: 'gray'
    };
    return colors[stageType] || 'gray';
  }, []);

  return (
    <Card 
      className={cn(
        'applicant-card',
        isSelected && 'selected',
        compact && 'compact',
        applicant.priority === 'high' && 'high-priority',
        className
      )}
    >
      <div className="applicant-header">
        <div className="applicant-info">
          <div className="applicant-avatar">
            <Avatar className="w-10 h-10">
              <AvatarImage src={applicant.avatar} />
              <AvatarFallback>
                {applicant.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            {applicant.priority === 'high' && (
              <div className="priority-indicator">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
              </div>
            )}
          </div>
          
          <div className="applicant-details">
            <h3 className="applicant-name">{applicant.name}</h3>
            <p className="applicant-title">{applicant.title}</p>
            <p className="applicant-company">{applicant.company}</p>
            
            <div className="applicant-meta">
              <span className="location">
                <MapPin className="w-3 h-3 mr-1" />
                {applicant.location}
              </span>
              
              <span className="applied-date">
                <Calendar className="w-3 h-3 mr-1" />
                Applied {formatRelativeTime(applicant.appliedAt)}
              </span>
              
              {applicant.source && (
                <span className="source">
                  <Link className="w-3 h-3 mr-1" />
                  {applicant.source}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="applicant-actions">
          <div className="stage-selector">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowStageMenu(!showStageMenu)}
              className="stage-button"
            >
              <div className={cn('stage-dot', getStageColor(applicant.stage.type))} />
              {applicant.stage.name}
              <ChevronDown className="w-3 h-3 ml-1" />
            </Button>
            
            {showStageMenu && (
              <div className="stage-menu">
                {applicant.possibleStages.map(stage => (
                  <button
                    key={stage.id}
                    className={cn(
                      'stage-option',
                      stage.id === applicant.stage.id && 'active'
                    )}
                    onClick={() => handleStageChange(stage.id)}
                    disabled={loadingStageChange}
                  >
                    <div className={cn('stage-dot', getStageColor(stage.type))} />
                    {stage.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpen(applicant)}
          >
            <Eye className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSelect(applicant.id, !isSelected)}
          >
            {isSelected ? (
              <CheckSquare className="w-4 h-4" />
            ) : (
              <Square className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
      
      {!compact && (
        <div className="applicant-content">
          <div className="applicant-summary">
            <p className="summary-text">{applicant.summary}</p>
            
            {applicant.skills.length > 0 && (
              <div className="skills-tags">
                {applicant.skills.slice(0, 4).map(skill => (
                  <Badge key={skill} variant="secondary" className="skill-tag">
                    {skill}
                  </Badge>
                ))}
                {applicant.skills.length > 4 && (
                  <Badge variant="outline" className="more-skills">
                    +{applicant.skills.length - 4} more
                  </Badge>
                )}
              </div>
            )}
          </div>
          
          <div className="applicant-stats">
            <div className="stat-item">
              <span className="stat-label">Score</span>
              <span className="stat-value">{applicant.score}/100</span>
            </div>
            
            <div className="stat-item">
              <span className="stat-label">Interviews</span>
              <span className="stat-value">{applicant.interviewCount}</span>
            </div>
            
            <div className="stat-item">
              <span className="stat-label">Status</span>
              <Badge variant={applicant.status === 'active' ? 'default' : 'secondary'}>
                {applicant.status}
              </Badge>
            </div>
            
            <div className="stat-item">
              <span className="stat-label">Last Contact</span>
              <span className="stat-value">
                {applicant.lastContactAt 
                  ? formatRelativeTime(applicant.lastContactAt)
                  : 'Never'
                }
              </span>
            </div>
          </div>
          
          {applicant.tags.length > 0 && (
            <div className="applicant-tags">
              {applicant.tags.map(tag => (
                <Badge key={tag.id} variant="outline" className="tag">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag.name}
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
```

## Domain Types

### Recruitment Types
```typescript
export interface Applicant {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  title: string;
  company: string;
  location: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  stage: RecruitmentStage;
  possibleStages: RecruitmentStage[];
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'inactive' | 'archived';
  source: string;
  sourceDetails?: SourceDetails;
  score: number;
  interviewCount: number;
  lastContactAt?: Date;
  nextFollowUp?: Date;
  tags: ApplicantTag[];
  attachments: ApplicantAttachment[];
  notes: ApplicantNote[];
  timeline: TimelineEvent[];
  assignments: RecruiterAssignment[];
  compensation?: CompensationExpectation;
  availability?: AvailabilityInfo;
  metadata: ApplicantMetadata;
  appliedAt: Date;
  updatedAt: Date;
  createdAt: Date;
  createdBy: string;
  updatedBy: string;
}

export interface RecruitmentStage {
  id: string;
  name: string;
  type: StageType;
  description: string;
  order: number;
  color: string;
  isActive: boolean;
  automatedActions: AutomatedAction[];
  requiredDocuments: DocumentRequirement[];
  defaultDuration?: number;
  probability: number;
}

export interface RecruitmentPipeline {
  id: string;
  name: string;
  description: string;
  stages: RecruitmentStage[];
  isActive: boolean;
  settings: PipelineSettings;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Experience {
  id: string;
  company: string;
  title: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  gpa?: number;
  achievements: string[];
}

export interface ApplicantNote {
  id: string;
  applicantId: string;
  authorId: string;
  authorName: string;
  content: string;
  type: NoteType;
  visibility: NoteVisibility;
  attachments: NoteAttachment[];
  mentions: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TimelineEvent {
  id: string;
  applicantId: string;
  type: EventType;
  title: string;
  description: string;
  authorId: string;
  authorName: string;
  data: Record<string, any>;
  attachments: EventAttachment[];
  createdAt: Date;
}

export interface RecruiterAssignment {
  id: string;
  applicantId: string;
  recruiterId: string;
  recruiterName: string;
  role: AssignmentRole;
  assignedAt: Date;
  assignedBy: string;
  isActive: boolean;
}

export interface SourceDetails {
  platform: string;
  campaign?: string;
  referrer?: string;
  utmParameters?: UTMParameters;
  originalUrl?: string;
}

export interface CompensationExpectation {
  salary?: SalaryRange;
  equity?: boolean;
  benefits: string[];
  negotiationStatus: 'not_discussed' | 'in_progress' | 'agreed';
  notes?: string;
}

export interface AvailabilityInfo {
  startDate?: Date;
  noticePeriod?: number;
  flexible: boolean;
  preferredSchedule?: string[];
  relocation: boolean;
  remoteWork: boolean;
}

export interface ApplicantMetadata {
  resumeUrl?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  socialProfiles: SocialProfile[];
  assessments: Assessment[];
  backgroundCheck?: BackgroundCheck;
  references: Reference[];
  compliance: ComplianceInfo;
}

export type StageType = 
  | 'application'
  | 'review'
  | 'screening'
  | 'interview'
  | 'technical'
  | 'offer'
  | 'hired'
  | 'rejected'
  | 'withdrawn';

export type NoteType = 'general' | 'interview' | 'assessment' | 'reference' | 'offer';
export type NoteVisibility = 'private' | 'team' | 'all';
export type EventType = 'stage_change' | 'interview_scheduled' | 'note_added' | 'email_sent' | 'assessment_completed' | 'offer_extended';
export type AssignmentRole = 'primary' | 'secondary' | 'reviewer' | 'interviewer';

export interface PipelineSettings {
  allowSelfAssignment: boolean;
  requireStageApprovals: boolean;
  autoAdvanceRules: AutoAdvanceRule[];
  notificationSettings: NotificationSettings;
  permissions: PipelinePermissions;
}
```

## Application Hooks

### useRecruitment Hook
```typescript
export const useRecruitment = (filters?: RecruitmentFilters) => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [pipelines, setPipelines] = useState<RecruitmentPipeline[]>([]);
  const [stages, setStages] = useState<RecruitmentStage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchApplicants = useCallback(async () => {
    try {
      setLoading(true);
      const [applicantsData, pipelinesData] = await Promise.all([
        recruitmentService.getApplicants(filters),
        recruitmentService.getPipelines()
      ]);
      
      setApplicants(applicantsData);
      setPipelines(pipelinesData);
      
      // Extract stages from active pipeline
      const activePipeline = pipelinesData.find(p => p.isActive);
      if (activePipeline) {
        setStages(activePipeline.stages);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const createApplicant = useCallback(async (applicantData: CreateApplicantData) => {
    const newApplicant = await recruitmentService.createApplicant(applicantData);
    setApplicants(prev => [newApplicant, ...prev]);
    return newApplicant;
  }, []);

  const updateApplicantStage = useCallback(async (
    applicantId: string, 
    stageId: string
  ) => {
    const updatedApplicant = await recruitmentService.updateApplicantStage(applicantId, stageId);
    setApplicants(prev => prev.map(applicant =>
      applicant.id === applicantId ? updatedApplicant : applicant
    ));
    
    // Create timeline event
    await recruitmentService.createTimelineEvent(applicantId, {
      type: 'stage_change',
      title: `Stage changed to ${updatedApplicant.stage.name}`,
      description: `Applicant moved to ${updatedApplicant.stage.name} stage`
    });
    
    return updatedApplicant;
  }, []);

  const addApplicantNote = useCallback(async (
    applicantId: string, 
    noteData: CreateNoteData
  ) => {
    const note = await recruitmentService.addApplicantNote(applicantId, noteData);
    setApplicants(prev => prev.map(applicant =>
      applicant.id === applicantId 
        ? { ...applicant, notes: [note, ...applicant.notes] }
        : applicant
    ));
    return note;
  }, []);

  const bulkUpdateStage = useCallback(async (
    applicantIds: string[], 
    stageId: string
  ) => {
    const updatedApplicants = await recruitmentService.bulkUpdateStage(applicantIds, stageId);
    setApplicants(prev => prev.map(applicant => {
      const updated = updatedApplicants.find(a => a.id === applicant.id);
      return updated || applicant;
    }));
  }, []);

  useEffect(() => {
    fetchApplicants();
  }, [fetchApplicants]);

  return {
    applicants,
    pipelines,
    stages,
    loading,
    error,
    refetch: fetchApplicants,
    createApplicant,
    updateApplicantStage,
    addApplicantNote,
    bulkUpdateStage
  };
};
```

## Service Layer

### RecruitmentService
```typescript
export class RecruitmentService {
  private api: ApiClient;
  private applicant: ApplicantService;
  private pipeline: PipelineService;
  private analytics: RecruitmentAnalyticsService;

  constructor() {
    this.api = new ApiClient();
    this.applicant = new ApplicantService();
    this.pipeline = new PipelineService();
    this.analytics = new RecruitmentAnalyticsService();
  }

  async getApplicants(filters?: RecruitmentFilters): Promise<Applicant[]> {
    const params = new URLSearchParams();
    
    if (filters?.stageIds?.length) {
      params.append('stageIds', filters.stageIds.join(','));
    }
    if (filters?.status) {
      params.append('status', filters.status);
    }
    if (filters?.priority) {
      params.append('priority', filters.priority);
    }
    if (filters?.source) {
      params.append('source', filters.source);
    }
    if (filters?.tags?.length) {
      params.append('tags', filters.tags.join(','));
    }
    if (filters?.dateRange) {
      params.append('dateFrom', filters.dateRange.from.toISOString());
      params.append('dateTo', filters.dateRange.to.toISOString());
    }
    if (filters?.search) {
      params.append('search', filters.search);
    }

    const response = await this.api.get(`/recruitment/applicants?${params}`);
    return response.data.map(this.transformApplicantData);
  }

  async createApplicant(applicantData: CreateApplicantData): Promise<Applicant> {
    const response = await this.api.post('/recruitment/applicants', applicantData);
    const applicant = this.transformApplicantData(response.data);
    
    // Trigger automation rules
    await this.triggerAutomationRules(applicant);
    
    return applicant;
  }

  async updateApplicantStage(applicantId: string, stageId: string): Promise<Applicant> {
    const response = await this.api.put(`/recruitment/applicants/${applicantId}/stage`, {
      stageId
    });
    
    const updatedApplicant = this.transformApplicantData(response.data);
    
    // Send notifications
    await this.sendStageChangeNotifications(updatedApplicant);
    
    return updatedApplicant;
  }

  async bulkUpdateStage(applicantIds: string[], stageId: string): Promise<Applicant[]> {
    const response = await this.api.post('/recruitment/applicants/bulk-stage', {
      applicantIds,
      stageId
    });
    
    return response.data.map(this.transformApplicantData);
  }

  async addApplicantNote(applicantId: string, noteData: CreateNoteData): Promise<ApplicantNote> {
    const response = await this.api.post(`/recruitment/applicants/${applicantId}/notes`, noteData);
    return this.transformNoteData(response.data);
  }

  async createTimelineEvent(applicantId: string, eventData: CreateTimelineEventData): Promise<TimelineEvent> {
    const response = await this.api.post(`/recruitment/applicants/${applicantId}/timeline`, eventData);
    return this.transformTimelineEventData(response.data);
  }

  async getPipelines(): Promise<RecruitmentPipeline[]> {
    const response = await this.api.get('/recruitment/pipelines');
    return response.data.map(this.transformPipelineData);
  }

  async getRecruitmentAnalytics(filters?: AnalyticsFilters): Promise<RecruitmentAnalytics> {
    return this.analytics.getAnalytics(filters);
  }

  private async triggerAutomationRules(applicant: Applicant): Promise<void> {
    const automationRules = await this.getAutomationRules(applicant.stage.id);
    
    for (const rule of automationRules) {
      if (this.evaluateRuleConditions(rule, applicant)) {
        await this.executeRuleActions(rule, applicant);
      }
    }
  }

  private evaluateRuleConditions(rule: AutomationRule, applicant: Applicant): boolean {
    // Implementation for rule condition evaluation
    return true; // Simplified for example
  }

  private async executeRuleActions(rule: AutomationRule, applicant: Applicant): Promise<void> {
    // Implementation for rule action execution
    for (const action of rule.actions) {
      switch (action.type) {
        case 'send_email':
          await this.sendAutomatedEmail(applicant, action.data);
          break;
        case 'create_task':
          await this.createAutomatedTask(applicant, action.data);
          break;
        case 'assign_recruiter':
          await this.assignRecruiter(applicant, action.data);
          break;
      }
    }
  }

  private transformApplicantData(data: any): Applicant {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      avatar: data.avatar,
      title: data.title,
      company: data.company,
      location: data.location,
      summary: data.summary,
      experience: data.experience || [],
      education: data.education || [],
      skills: data.skills || [],
      stage: data.stage,
      possibleStages: data.possibleStages || [],
      priority: data.priority,
      status: data.status,
      source: data.source,
      sourceDetails: data.sourceDetails,
      score: data.score,
      interviewCount: data.interviewCount,
      lastContactAt: data.lastContactAt ? new Date(data.lastContactAt) : undefined,
      nextFollowUp: data.nextFollowUp ? new Date(data.nextFollowUp) : undefined,
      tags: data.tags || [],
      attachments: data.attachments || [],
      notes: data.notes || [],
      timeline: data.timeline || [],
      assignments: data.assignments || [],
      compensation: data.compensation,
      availability: data.availability,
      metadata: data.metadata,
      appliedAt: new Date(data.appliedAt),
      updatedAt: new Date(data.updatedAt),
      createdAt: new Date(data.createdAt),
      createdBy: data.createdBy,
      updatedBy: data.updatedBy
    };
  }
}
```

## Implementation Guidelines

### Applicant Management
- Comprehensive applicant profiles with rich metadata
- Automated stage progression with customizable rules
- Bulk operations for efficient recruitment workflows
- Advanced filtering and search capabilities
- Applicant scoring and ranking algorithms

### Pipeline Management
- Visual pipeline representation with drag-and-drop
- Customizable stages and workflows
- Automated task creation and assignment
- Performance metrics and conversion tracking
- Template-based pipeline creation

### Communication & Collaboration
- Integrated email templates and automation
- Team collaboration with role-based permissions
- Interview scheduling and coordination
- Automated follow-ups and reminders
- Centralized communication history

### Analytics & Reporting
- Real-time recruitment metrics and KPIs
- Funnel analysis and conversion tracking
- Time-to-hire and cost-per-hire analytics
- Source effectiveness analysis
- Predictive analytics for hiring outcomes

### Integration Features
- Applicant Tracking System (ATS) integrations
- Job board posting and syndication
- Social media recruiting integration
- Background check and assessment services
- HRIS and onboarding system integration

### Compliance & Security
- EEOC and OFCCP compliance features
- Data privacy and security controls
- Audit trails and activity logging
- Document management and retention
- Accessibility and inclusive design

### Mobile Optimization
- Mobile-responsive applicant management
- Push notifications for urgent updates
- On-the-go interview scheduling
- Voice-to-text note-taking
- Offline mode for field recruiting

## Testing Strategy
- Unit tests for recruitment workflows and business logic
- Integration tests for automation rules and triggers
- E2E tests for complete applicant lifecycle
- Performance tests for large applicant databases
- Security testing for data protection and compliance
- Cross-browser and mobile compatibility tests

## SISO Design System Integration
- Consistent orange color scheme (#f6b75e) for primary actions
- Visual pipeline stages with color-coded indicators
- Professional applicant cards and profiles
- Loading states for data operations
- Responsive layouts for mobile and desktop
- Accessibility features for inclusive recruitment