# Partner Invitation System

## Overview
The Partner Invitation System provides a streamlined platform for inviting, onboarding, and managing new partners within the SISO ecosystem. This module handles the complete partner invitation workflow from personalized invitation creation to automated onboarding sequences with comprehensive tracking and analytics.

## Architecture

### Directory Structure
```
invite-partners/
├── components/
│   ├── InvitationWizard.tsx
│   ├── PartnerInvitationForm.tsx
│   ├── InvitationTemplate.tsx
│   ├── InvitationTracker.tsx
│   ├── OnboardingChecklist.tsx
│   └── InvitationAnalytics.tsx
├── hooks/
│   ├── usePartnerInvitation.ts
│   ├── useInvitationTemplates.ts
│   ├── useOnboardingFlow.ts
│   └── useInvitationAnalytics.ts
├── services/
│   ├── partnerInvitationService.ts
│   ├── invitationTemplateService.ts
│   ├── onboardingService.ts
│   └── invitationAnalyticsService.ts
├── types/
│   ├── invitation.types.ts
│   └── onboarding.types.ts
└── utils/
    ├── invitationUtils.ts
    └── templateUtils.ts
```

### Core Components

#### InvitationWizard Component
```typescript
interface InvitationWizardProps {
  partnerId?: string;
  initialData?: Partial<InvitationData>;
  onSave: (invitation: PartnerInvitation) => void;
  onCancel: () => void;
  className?: string;
}

export const InvitationWizard: React.FC<InvitationWizardProps> = ({
  partnerId,
  initialData,
  onSave,
  onCancel,
  className
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [invitationData, setInvitationData] = useState<InvitationData>({
    recipientInfo: {
      name: '',
      email: '',
      company: '',
      title: '',
      phone: '',
      linkedin: '',
      source: '',
      referrer: ''
    },
    invitationDetails: {
      partnerType: 'standard',
      partnershipLevel: 'basic',
      welcomeBonus: false,
      customMessage: '',
      personalization: {}
    },
    onboardingPlan: {
      skipWelcomeCall: false,
      trainingModules: [],
      mentorAssignment: false,
      resourceAccess: [],
      timeline: 'standard'
    },
    followUp: {
      automatedReminders: true,
      reminderSchedule: 'standard',
      customReminders: [],
      deadlineDays: 14
    }
  });

  const [selectedTemplate, setSelectedTemplate] = useState<InvitationTemplate | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const { templates, loading: loadingTemplates } = useInvitationTemplates();
  const { sendInvitation, previewInvitation } = usePartnerInvitation();

  const steps = [
    {
      id: 'recipient',
      title: 'Recipient Information',
      description: 'Who are you inviting to join the partnership?'
    },
    {
      id: 'template',
      title: 'Invitation Template',
      description: 'Choose and customize your invitation message'
    },
    {
      id: 'personalization',
      title: 'Personalization',
      description: 'Add personal touches and customize the experience'
    },
    {
      id: 'onboarding',
      title: 'Onboarding Plan',
      description: 'Set up the new partner\'s onboarding journey'
    },
    {
      id: 'review',
      title: 'Review & Send',
      description: 'Review your invitation and send it'
    }
  ];

  const handleNext = useCallback(() => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  }, [validateCurrentStep]);

  const handlePrevious = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  }, []);

  const handleSendInvitation = useCallback(async () => {
    try {
      setIsSending(true);
      
      const invitation = await sendInvitation({
        ...invitationData,
        templateId: selectedTemplate?.id,
        partnerId
      });
      
      onSave(invitation);
      toast.success('Invitation sent successfully!');
    } catch (error) {
      console.error('Failed to send invitation:', error);
      toast.error('Failed to send invitation');
    } finally {
      setIsSending(false);
    }
  }, [invitationData, selectedTemplate, partnerId, sendInvitation, onSave]);

  const validateCurrentStep = useCallback(() => {
    const errors: Record<string, string> = {};

    switch (steps[currentStep].id) {
      case 'recipient':
        if (!invitationData.recipientInfo.name.trim()) {
          errors.name = 'Name is required';
        }
        if (!invitationData.recipientInfo.email.trim()) {
          errors.email = 'Email is required';
        } else if (!isValidEmail(invitationData.recipientInfo.email)) {
          errors.email = 'Invalid email address';
        }
        if (!invitationData.recipientInfo.company.trim()) {
          errors.company = 'Company is required';
        }
        break;
        
      case 'template':
        if (!selectedTemplate) {
          errors.template = 'Please select an invitation template';
        }
        break;
        
      case 'personalization':
        if (invitationData.invitationDetails.customMessage.length > 1000) {
          errors.customMessage = 'Message must be less than 1000 characters';
        }
        break;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [currentStep, steps, invitationData, selectedTemplate]);

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'recipient':
        return (
          <RecipientInfoStep
            data={invitationData.recipientInfo}
            onChange={(recipientInfo) => setInvitationData(prev => ({ ...prev, recipientInfo }))}
            errors={validationErrors}
          />
        );
        
      case 'template':
        return (
          <TemplateSelectionStep
            templates={templates}
            selectedTemplate={selectedTemplate}
            onTemplateSelect={setSelectedTemplate}
            onPreview={setPreviewMode}
            loading={loadingTemplates}
            error={validationErrors.template}
          />
        );
        
      case 'personalization':
        return (
          <PersonalizationStep
            data={invitationData}
            onChange={setInvitationData}
            template={selectedTemplate}
            errors={validationErrors}
          />
        );
        
      case 'onboarding':
        return (
          <OnboardingPlanStep
            data={invitationData.onboardingPlan}
            onChange={(onboardingPlan) => setInvitationData(prev => ({ ...prev, onboardingPlan }))}
          />
        );
        
      case 'review':
        return (
          <ReviewStep
            invitationData={invitationData}
            template={selectedTemplate}
            onEdit={(step) => setCurrentStep(step)}
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <Card className={cn('invitation-wizard', className)}>
      <CardHeader>
        <div className="wizard-header">
          <div className="header-info">
            <CardTitle>Invite Partner</CardTitle>
            <CardDescription>
              Send a personalized invitation to join the SISO partnership program
            </CardDescription>
          </div>
          
          {previewMode && (
            <Button
              variant="outline"
              onClick={() => setPreviewMode(false)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Edit
            </Button>
          )}
        </div>
        
        {!previewMode && (
          <div className="wizard-progress">
            <div className="steps-indicator">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={cn(
                    'step-item',
                    index === currentStep && 'active',
                    index < currentStep && 'completed'
                  )}
                >
                  <div className="step-number">{index + 1}</div>
                  <div className="step-info">
                    <div className="step-title">{step.title}</div>
                    <div className="step-description">{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="wizard-content">
        {previewMode && selectedTemplate ? (
          <InvitationPreview
            template={selectedTemplate}
            data={invitationData}
            onClose={() => setPreviewMode(false)}
          />
        ) : (
          renderStepContent()
        )}
      </CardContent>
      
      {!previewMode && (
        <CardFooter className="wizard-footer">
          <div className="footer-left">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
          
          <div className="footer-right">
            {currentStep > 0 && (
              <Button variant="outline" onClick={handlePrevious}>
                Previous
              </Button>
            )}
            
            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSendInvitation} disabled={isSending}>
                {isSending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Invitation
                  </>
                )}
              </Button>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
```

#### InvitationTracker Component
```typescript
interface InvitationTrackerProps {
  filters?: InvitationFilters;
  onInvitationSelect?: (invitation: PartnerInvitation) => void;
  className?: string;
}

export const InvitationTracker: React.FC<InvitationTrackerProps> = ({
  filters,
  onInvitationSelect,
  className
}) => {
  const [invitations, setInvitations] = useState<PartnerInvitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvitations, setSelectedInvitations] = useState<string[]>([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedInvitation, setSelectedInvitation] = useState<PartnerInvitation | null>(null);

  const { 
    fetchInvitations, 
    sendReminder, 
    cancelInvitation, 
    resendInvitation,
    getInvitationStats 
  } = usePartnerInvitation();

  const [stats, setStats] = useState<InvitationStats>();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [invitationsData, statsData] = await Promise.all([
        fetchInvitations(filters),
        getInvitationStats(filters)
      ]);
      
      setInvitations(invitationsData);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to fetch invitations:', error);
    } finally {
      setLoading(false);
    }
  }, [filters, fetchInvitations, getInvitationStats]);

  const handleInvitationAction = useCallback(async (
    invitationId: string, 
    action: InvitationAction
  ) => {
    try {
      switch (action) {
        case 'remind':
          await sendReminder(invitationId);
          toast.success('Reminder sent successfully');
          break;
        case 'resend':
          await resendInvitation(invitationId);
          toast.success('Invitation resent successfully');
          break;
        case 'cancel':
          await cancelInvitation(invitationId);
          toast.success('Invitation cancelled');
          break;
      }
      fetchData(); // Refresh data
    } catch (error) {
      console.error(`Failed to ${action} invitation:`, error);
      toast.error(`Failed to ${action} invitation`);
    }
  }, [sendReminder, resendInvitation, cancelInvitation, fetchData]);

  const handleInvitationClick = useCallback((invitation: PartnerInvitation) => {
    setSelectedInvitation(invitation);
    setShowDetailsModal(true);
    onInvitationSelect?.(invitation);
  }, [onInvitationSelect]);

  const handleBulkActions = useCallback(async (action: BulkInvitationAction) => {
    try {
      switch (action) {
        case 'remind':
          await Promise.all(selectedInvitations.map(id => sendReminder(id)));
          toast.success(`Reminders sent to ${selectedInvitations.length} invitations`);
          break;
        case 'cancel':
          await Promise.all(selectedInvitations.map(id => cancelInvitation(id)));
          toast.success(`${selectedInvitations.length} invitations cancelled`);
          break;
        case 'export':
          await exportInvitations(selectedInvitations);
          break;
      }
      setSelectedInvitations([]);
      fetchData();
    } catch (error) {
      console.error('Bulk action failed:', error);
    }
  }, [selectedInvitations, sendReminder, cancelInvitation, fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <Card className={cn('invitation-tracker loading', className)}>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          <span>Loading invitations...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={cn('invitation-tracker', className)}>
      {/* Stats Overview */}
      {stats && (
        <div className="stats-overview">
          <div className="stats-grid">
            <StatCard
              title="Total Sent"
              value={stats.totalSent}
              change={stats.sentChange}
              icon={<Send className="w-5 h-5" />}
            />
            
            <StatCard
              title="Accepted"
              value={stats.accepted}
              change={stats.acceptedChange}
              icon={<CheckCircle className="w-5 h-5" />}
              color="green"
            />
            
            <StatCard
              title="Pending"
              value={stats.pending}
              icon={<Clock className="w-5 h-5" />}
              color="orange"
            />
            
            <StatCard
              title="Expired"
              value={stats.expired}
              icon={<XCircle className="w-5 h-5" />}
              color="red"
            />
            
            <StatCard
              title="Conversion Rate"
              value={`${stats.conversionRate}%`}
              change={stats.conversionRateChange}
              icon={<TrendingUp className="w-5 h-5" />}
              color="emerald"
            />
            
            <StatCard
              title="Avg. Response Time"
              value={stats.avgResponseTime}
              icon={<Timer className="w-5 h-5" />}
              color="blue"
            />
          </div>
        </div>
      )}

      {/* Bulk Actions */}
      {selectedInvitations.length > 0 && (
        <div className="bulk-actions-bar">
          <div className="selection-info">
            <span>{selectedInvitations.length} invitations selected</span>
            <Button variant="ghost" size="sm" onClick={() => setSelectedInvitations([])}>
              Clear selection
            </Button>
          </div>
          
          <div className="bulk-actions">
            <Button variant="outline" size="sm" onClick={() => handleBulkActions('remind')}>
              <Bell className="w-4 h-4 mr-1" />
              Send Reminders
            </Button>
            
            <Button variant="outline" size="sm" onClick={() => handleBulkActions('cancel')}>
              <X className="w-4 h-4 mr-1" />
              Cancel
            </Button>
            
            <Button variant="outline" size="sm" onClick={() => handleBulkActions('export')}>
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
          </div>
        </div>
      )}

      {/* Invitations List */}
      <div className="invitations-list">
        {invitations.length === 0 ? (
          <EmptyState
            icon={<Mail className="w-12 h-12" />}
            title="No invitations found"
            description="Start by inviting new partners to join the program."
            action={
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Send First Invitation
              </Button>
            }
          />
        ) : (
          <div className="invitations-grid">
            {invitations.map((invitation) => (
              <InvitationCard
                key={invitation.id}
                invitation={invitation}
                isSelected={selectedInvitations.includes(invitation.id)}
                onSelect={(selected) => 
                  setSelectedInvitations(prev => 
                    selected 
                      ? [...prev, invitation.id]
                      : prev.filter(id => id !== invitation.id)
                  )
                }
                onClick={() => handleInvitationClick(invitation)}
                onAction={(action) => handleInvitationAction(invitation.id, action)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Invitation Details Modal */}
      <InvitationDetailsDialog
        invitation={selectedInvitation}
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedInvitation(null);
        }}
        onAction={(action) => selectedInvitation && handleInvitationAction(selectedInvitation.id, action)}
      />
    </div>
  );
};
```

## Domain Types

### Invitation Types
```typescript
export interface PartnerInvitation {
  id: string;
  recipientInfo: RecipientInfo;
  senderInfo: SenderInfo;
  invitationDetails: InvitationDetails;
  onboardingPlan: OnboardingPlan;
  followUp: FollowUpSchedule;
  status: InvitationStatus;
  tracking: InvitationTracking;
  metadata: InvitationMetadata;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  respondedAt?: Date;
  createdBy: string;
  updatedBy: string;
}

export interface RecipientInfo {
  name: string;
  email: string;
  company: string;
  title: string;
  phone?: string;
  linkedin?: string;
  source: string;
  referrer?: string;
  customFields?: Record<string, any>;
}

export interface SenderInfo {
  id: string;
  name: string;
  email: string;
  title: string;
  avatar?: string;
  signature?: string;
}

export interface InvitationDetails {
  partnerType: PartnerType;
  partnershipLevel: PartnershipLevel;
  welcomeBonus: boolean;
  customMessage: string;
  personalization: PersonalizationData;
  attachments: InvitationAttachment[];
  termsAndConditions: boolean;
}

export interface PersonalizationData {
  recipientName: string;
  companyName: string;
  recipientTitle: string;
  referralName?: string;
  specificBenefits: string[];
  painPoints: string[];
  industrySpecific: string[];
}

export interface OnboardingPlan {
  skipWelcomeCall: boolean;
  trainingModules: string[];
  mentorAssignment: boolean;
  resourceAccess: ResourceAccess[];
  timeline: OnboardingTimeline;
  customSteps: CustomOnboardingStep[];
}

export interface FollowUpSchedule {
  automatedReminders: boolean;
  reminderSchedule: ReminderSchedule;
  customReminders: CustomReminder[];
  deadlineDays: number;
  escalationRules: EscalationRule[];
}

export interface InvitationTracking {
  sentAt: Date;
  deliveredAt?: Date;
  openedAt?: Date;
  clickedAt?: Date;
  responseTimes: ResponseTime[];
  deviceInfo: DeviceInfo[];
  locationData: LocationData[];
  utmParameters?: UTMParameters;
}

export interface InvitationMetadata {
  templateId?: string;
  campaignId?: string;
  source: InvitationSource;
  cost?: number;
  tags: string[];
  notes?: string;
  internalRating?: number;
  priority: InvitationPriority;
}

export interface InvitationTemplate {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  subject: string;
  htmlContent: string;
  textContent: string;
  variables: TemplateVariable[];
  attachments: TemplateAttachment[];
  isActive: boolean;
  usageCount: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InvitationStats {
  totalSent: number;
  accepted: number;
  pending: number;
  expired: number;
  cancelled: number;
  conversionRate: number;
  avgResponseTime: string;
  sentChange: number;
  acceptedChange: number;
  conversionRateChange: number;
  timeRange: DateRange;
}

export interface InvitationAttachment {
  id: string;
  name: string;
  type: AttachmentType;
  url: string;
  size: number;
  description?: string;
  required: boolean;
}

export interface ResourceAccess {
  id: string;
  name: string;
  type: 'document' | 'tool' | 'training' | 'community' | 'support';
  accessLevel: 'immediate' | 'after_acceptance' | 'after_onboarding';
  description?: string;
}

export type InvitationStatus = 
  | 'draft'
  | 'sent'
  | 'delivered'
  | 'opened'
  | 'clicked'
  | 'responded'
  | 'accepted'
  | 'declined'
  | 'expired'
  | 'cancelled';

export type PartnerType = 'standard' | 'premium' | 'enterprise' | 'strategic';
export type PartnershipLevel = 'basic' | 'professional' | 'business' | 'enterprise';
export type TemplateCategory = 'general' | 'corporate' | 'startup' | 'enterprise' | 'custom';
export type InvitationPriority = 'low' | 'medium' | 'high' | 'urgent';
export type InvitationAction = 'remind' | 'resend' | 'cancel';
export type BulkInvitationAction = 'remind' | 'cancel' | 'export';

export interface OnboardingTimeline {
  welcomeCall: boolean;
  trainingCompletion: number; // days
  resourceAccess: number; // days
  mentorIntroduction: number; // days
  firstMilestone: number; // days
}

export interface CustomReminder {
  id: string;
  daysAfter: number;
  message: string;
  conditions?: ReminderCondition[];
}
```

## Application Hooks

### usePartnerInvitation Hook
```typescript
export const usePartnerInvitation = () => {
  const [invitations, setInvitations] = useState<PartnerInvitation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchInvitations = useCallback(async (filters?: InvitationFilters) => {
    try {
      setLoading(true);
      const invitationsData = await partnerInvitationService.getInvitations(filters);
      setInvitations(invitationsData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  const sendInvitation = useCallback(async (invitationData: CreateInvitationData) => {
    try {
      setLoading(true);
      const invitation = await partnerInvitationService.createInvitation(invitationData);
      setInvitations(prev => [invitation, ...prev]);
      
      // Track invitation sent event
      await trackInvitationEvent('sent', invitation.id);
      
      return invitation;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const sendReminder = useCallback(async (invitationId: string) => {
    try {
      await partnerInvitationService.sendReminder(invitationId);
      
      // Update invitation tracking
      setInvitations(prev => prev.map(invitation =>
        invitation.id === invitationId
          ? {
              ...invitation,
              tracking: {
                ...invitation.tracking,
                responseTimes: [
                  ...invitation.tracking.responseTimes,
                  {
                    type: 'reminder_sent',
                    timestamp: new Date()
                  }
                ]
              }
            }
          : invitation
      ));
    } catch (err) {
      console.error('Failed to send reminder:', err);
      throw err;
    }
  }, []);

  const resendInvitation = useCallback(async (invitationId: string) => {
    try {
      const updatedInvitation = await partnerInvitationService.resendInvitation(invitationId);
      
      setInvitations(prev => prev.map(invitation =>
        invitation.id === invitationId ? updatedInvitation : invitation
      ));
    } catch (err) {
      console.error('Failed to resend invitation:', err);
      throw err;
    }
  }, []);

  const cancelInvitation = useCallback(async (invitationId: string) => {
    try {
      await partnerInvitationService.cancelInvitation(invitationId);
      
      setInvitations(prev => prev.map(invitation =>
        invitation.id === invitationId
          ? { ...invitation, status: 'cancelled' }
          : invitation
      ));
    } catch (err) {
      console.error('Failed to cancel invitation:', err);
      throw err;
    }
  }, []);

  const getInvitationStats = useCallback(async (filters?: InvitationFilters) => {
    try {
      return await partnerInvitationService.getInvitationStats(filters);
    } catch (err) {
      console.error('Failed to get invitation stats:', err);
      throw err;
    }
  }, []);

  return {
    invitations,
    loading,
    error,
    fetchInvitations,
    sendInvitation,
    sendReminder,
    resendInvitation,
    cancelInvitation,
    getInvitationStats
  };
};
```

## Service Layer

### PartnerInvitationService
```typescript
export class PartnerInvitationService {
  private api: ApiClient;
  private template: InvitationTemplateService;
  private email: EmailService;
  private analytics: InvitationAnalyticsService;

  constructor() {
    this.api = new ApiClient();
    this.template = new InvitationTemplateService();
    this.email = new EmailService();
    this.analytics = new InvitationAnalyticsService();
  }

  async getInvitations(filters?: InvitationFilters): Promise<PartnerInvitation[]> {
    const params = new URLSearchParams();
    
    if (filters?.status) {
      params.append('status', filters.status);
    }
    if (filters?.partnerType) {
      params.append('partnerType', filters.partnerType);
    }
    if (filters?.dateRange) {
      params.append('dateFrom', filters.dateRange.from.toISOString());
      params.append('dateTo', filters.dateRange.to.toISOString());
    }
    if (filters?.search) {
      params.append('search', filters.search);
    }

    const response = await this.api.get(`/partner-invitations?${params}`);
    return response.data.map(this.transformInvitationData);
  }

  async createInvitation(invitationData: CreateInvitationData): Promise<PartnerInvitation> {
    // Validate invitation data
    await this.validateInvitationData(invitationData);

    // Generate personalized content if template provided
    if (invitationData.templateId) {
      invitationData.invitationDetails.customMessage = 
        await this.generatePersonalizedContent(invitationData);
    }

    const response = await this.api.post('/partner-invitations', invitationData);
    const invitation = this.transformInvitationData(response.data);

    // Send invitation email
    await this.sendInvitationEmail(invitation);

    // Schedule automated reminders
    if (invitation.followUp.automatedReminders) {
      await this.scheduleReminders(invitation);
    }

    // Track analytics
    await this.analytics.trackInvitationCreated(invitation);

    return invitation;
  }

  async sendReminder(invitationId: string): Promise<void> {
    const invitation = await this.getInvitationById(invitationId);
    
    if (invitation.status !== 'sent' && invitation.status !== 'delivered') {
      throw new Error('Can only send reminders for sent invitations');
    }

    const reminderEmail = await this.generateReminderEmail(invitation);
    await this.email.sendEmail(reminderEmail);

    // Track reminder event
    await this.analytics.trackInvitationReminder(invitationId);
  }

  async resendInvitation(invitationId: string): Promise<PartnerInvitation> {
    const invitation = await this.getInvitationById(invitationId);
    
    // Create new invitation with updated expiry
    const newInvitationData: CreateInvitationData = {
      ...invitation,
      expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      tracking: {
        ...invitation.tracking,
        sentAt: new Date()
      }
    };

    // Cancel old invitation
    await this.cancelInvitation(invitationId);

    // Create new invitation
    return this.createInvitation(newInvitationData);
  }

  async cancelInvitation(invitationId: string): Promise<void> {
    await this.api.put(`/partner-invitations/${invitationId}/cancel`);
    await this.analytics.trackInvitationCancelled(invitationId);
  }

  async getInvitationStats(filters?: InvitationFilters): Promise<InvitationStats> {
    return this.analytics.getInvitationStats(filters);
  }

  private async validateInvitationData(data: CreateInvitationData): Promise<void> {
    // Validate recipient email
    if (!isValidEmail(data.recipientInfo.email)) {
      throw new Error('Invalid recipient email');
    }

    // Validate required fields
    const requiredFields = ['name', 'company', 'title'];
    for (const field of requiredFields) {
      if (!data.recipientInfo[field]?.trim()) {
        throw new Error(`${field} is required`);
      }
    }

    // Validate expiry date
    if (data.expiresAt && data.expiresAt <= new Date()) {
      throw new Error('Expiry date must be in the future');
    }

    // Check for duplicate invitations
    const existingInvitation = await this.findExistingInvitation(data.recipientInfo.email);
    if (existingInvitation && existingInvitation.status === 'sent') {
      throw new Error('Invitation already sent to this email');
    }
  }

  private async generatePersonalizedContent(data: CreateInvitationData): Promise<string> {
    if (!data.templateId) return data.invitationDetails.customMessage;

    const template = await this.template.getTemplateById(data.templateId);
    const variables = {
      recipientName: data.recipientInfo.name,
      companyName: data.recipientInfo.company,
      recipientTitle: data.recipientInfo.title,
      senderName: data.senderInfo.name,
      senderTitle: data.senderInfo.title,
      ...data.invitationDetails.personalization
    };

    return this.template.renderTemplate(template, variables);
  }

  private async sendInvitationEmail(invitation: PartnerInvitation): Promise<void> {
    const emailData = {
      to: invitation.recipientInfo.email,
      subject: `Invitation to join ${invitation.invitationDetails.partnerType} partnership program`,
      htmlContent: invitation.invitationDetails.customMessage,
      textContent: this.stripHtml(invitation.invitationDetails.customMessage),
      attachments: invitation.invitationDetails.attachments,
      trackingId: invitation.id,
      category: 'partner_invitation'
    };

    await this.email.sendEmail(emailData);
    
    // Update invitation tracking
    await this.updateInvitationTracking(invitation.id, {
      sentAt: new Date(),
      deliveredAt: new Date()
    });
  }

  private async scheduleReminders(invitation: PartnerInvitation): Promise<void> {
    const { reminderSchedule, customReminders, deadlineDays } = invitation.followUp;
    
    // Schedule standard reminders
    const standardReminders = this.getStandardReminders(reminderSchedule, deadlineDays);
    
    for (const reminder of [...standardReminders, ...customReminders]) {
      const reminderDate = new Date(Date.now() + reminder.daysAfter * 24 * 60 * 60 * 1000);
      
      await this.scheduleReminder({
        invitationId: invitation.id,
        scheduledAt: reminderDate,
        message: reminder.message,
        conditions: reminder.conditions
      });
    }
  }

  private getStandardReminders(schedule: ReminderSchedule, deadlineDays: number): CustomReminder[] {
    const reminders: CustomReminder[] = [];

    switch (schedule) {
      case 'aggressive':
        reminders.push(
          { daysAfter: 2, message: 'Following up on your partnership invitation' },
          { daysAfter: 5, message: 'Still interested in joining our partnership program?' },
          { daysAfter: deadlineDays - 2, message: 'Your invitation expires soon!' }
        );
        break;
      case 'standard':
        reminders.push(
          { daysAfter: 4, message: 'Following up on your partnership invitation' },
          { daysAfter: deadlineDays - 3, message: 'Your invitation expires in 3 days' }
        );
        break;
      case 'gentle':
        reminders.push(
          { daysAfter: 7, message: 'Just checking in about your partnership invitation' }
        );
        break;
    }

    return reminders;
  }

  private transformInvitationData(data: any): PartnerInvitation {
    return {
      id: data.id,
      recipientInfo: data.recipientInfo,
      senderInfo: data.senderInfo,
      invitationDetails: data.invitationDetails,
      onboardingPlan: data.onboardingPlan,
      followUp: data.followUp,
      status: data.status,
      tracking: data.tracking,
      metadata: data.metadata,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
      expiresAt: new Date(data.expiresAt),
      respondedAt: data.respondedAt ? new Date(data.respondedAt) : undefined,
      createdBy: data.createdBy,
      updatedBy: data.updatedBy
    };
  }
}
```

## Implementation Guidelines

### Invitation Management
- Multi-step invitation wizard with validation
- Template-based email composition with personalization
- Automated reminder scheduling and escalation
- Bulk invitation operations with tracking
- Invitation status tracking and analytics

### Personalization Features
- Dynamic content insertion based on recipient data
- Customizable templates with variable support
- Industry-specific messaging options
- Personal benefit highlighting
- Referral and source attribution

### Onboarding Integration
- Seamless transition from invitation to onboarding
- Automated user account creation
- Resource access provisioning
- Training module assignment
- Mentor and buddy system integration

### Tracking & Analytics
- Real-time invitation status tracking
- Open and click rate monitoring
- Conversion funnel analysis
- Response time analytics
- Campaign performance metrics

### Communication Features
- Multi-channel delivery (email, SMS, in-app)
- Automated follow-up sequences
- Personalized messaging at scale
- Template management and A/B testing
- Delivery optimization and retry logic

### Compliance & Security
- GDPR and privacy compliance
- Email consent management
- Data retention policies
- Secure invitation links with expiration
- Anti-spam compliance and deliverability

### User Experience
- Intuitive invitation creation flow
- Real-time preview capabilities
- Mobile-responsive invitation emails
- One-click acceptance process
- Progress tracking for applicants

### Integration Capabilities
- CRM synchronization for lead management
- Marketing automation platform integration
- Analytics and reporting tools
- Calendar integration for follow-ups
- Social media recruitment integration

## Testing Strategy
- Unit tests for invitation workflow and validation
- Integration tests for email delivery and tracking
- E2E tests for complete invitation lifecycle
- Performance tests for bulk invitation operations
- Security testing for data protection
- Cross-email client compatibility testing

## SISO Design System Integration
- Consistent orange color scheme (#f6b75e) for primary actions
- Professional invitation templates with branding
- Progress indicators for multi-step workflows
- Loading states for email sending
- Responsive designs for mobile viewing
- Accessibility features for inclusive design