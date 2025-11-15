# Legal Settings

**Route**: `/partner/settings/legal`  
**Section**: Settings  
**Tier Access**: All (Starter+)  
**Spec**: docs/partners/PARTNERSHIP-PAGES-PLAN.md (Settings → Legal)  

## Overview

Legal settings provides partners with centralized access to all legal agreements, policies, and compliance documentation. This module ensures transparency about terms, privacy requirements, and partner agreements while tracking acknowledgment status and version history.

## Primary Objective

Surface agreements and version info to ensure partners are informed about their legal obligations and rights within the partnership program.

## Content Modules

### 1. Legal Documents Hub
- **Terms of Service**: Current SISO platform terms and usage policies
- **Privacy Policy**: Data handling, processing, and protection policies
- **Partner Agreement**: Specific partnership terms, commission structures, and obligations
- **Build Version**: Current platform version and legal update tracking

### 2. Agreement Status Tracking
- **Acknowledgment Status**: Track which documents have been read and acknowledged
- **Version History**: Show changes and updates over time
- **Required Actions**: Highlight documents requiring attention or re-acknowledgment

### 3. Compliance Information
- **Regional Compliance**: GDPR, CCPA, and other jurisdiction-specific requirements
- **Data Processing**: Information about data handling and partner data protection
- **Audit Trail**: Record of legal document interactions and acknowledgments

## Component Architecture

### LegalSettingsScreen
```tsx
export function LegalSettingsScreen() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <LegalSettingsHeader />
      
      {/* Documents Grid */}
      <LegalDocumentsGrid />
      
      {/* Version Info */}
      <VersionInfoSection />
      
      {/* Compliance Status */}
      <ComplianceStatusSection />
    </div>
  );
}
```

### LegalDocumentCard Component
```tsx
interface LegalDocumentCardProps {
  document: LegalDocument;
  onAcknowledge: (documentId: string) => void;
  onViewDocument: (documentId: string) => void;
}

export function LegalDocumentCard({
  document,
  onAcknowledge,
  onViewDocument
}: LegalDocumentCardProps) {
  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{document.title}</h3>
            {document.isRequired && (
              <Badge variant="destructive" className="text-xs">
                Required
              </Badge>
            )}
            {document.hasUpdates && (
              <Badge variant="secondary" className="text-xs">
                Updated
              </Badge>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground">
            {document.description}
          </p>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Last updated: {formatDate(document.lastUpdated)}</span>
            <span>Version: {document.version}</span>
            {document.acknowledgedAt && (
              <span className="text-green-600">
                Acknowledged: {formatDate(document.acknowledgedAt)}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDocument(document.id)}
            className="w-fit"
          >
            <FileText className="w-4 h-4 mr-2" />
            View Document
          </Button>
          
          {document.needsAcknowledgment && (
            <Button
              variant="default"
              size="sm"
              onClick={() => onAcknowledge(document.id)}
              className="w-fit bg-siso-orange hover:bg-siso-orange/90"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Acknowledge
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
```

### DocumentVersionHistory Component
```tsx
export function DocumentVersionHistory({ documentId }: { documentId: string }) {
  return (
    <div className="space-y-3">
      <h4 className="font-medium text-sm">Version History</h4>
      <div className="space-y-2">
        {versions.map((version) => (
          <div
            key={version.version}
            className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-siso-orange rounded-full" />
              <div>
                <span className="font-medium text-sm">
                  Version {version.version}
                </span>
                <p className="text-xs text-muted-foreground">
                  {formatDate(version.effectiveDate)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {version.changeType}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => viewVersionChanges(version.id)}
              >
                Changes
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Domain Types

### Legal Document Types
```typescript
export interface LegalDocument {
  id: string;
  title: string;
  description: string;
  type: LegalDocumentType;
  content: string;
  version: string;
  lastUpdated: Date;
  effectiveDate: Date;
  isRequired: boolean;
  needsAcknowledgment: boolean;
  acknowledgedAt?: Date;
  acknowledgedVersion?: string;
  hasUpdates: boolean;
  jurisdiction?: string[];
  category: LegalCategory;
}

export enum LegalDocumentType {
  TERMS_OF_SERVICE = 'terms_of_service',
  PRIVACY_POLICY = 'privacy_policy',
  PARTNER_AGREEMENT = 'partner_agreement',
  DATA_PROCESSING_ADDENDUM = 'data_processing_addendum',
  COOKIE_POLICY = 'cookie_policy',
  COMPLIANCE_GUIDELINES = 'compliance_guidelines'
}

export enum LegalCategory {
  PLATFORM_TERMS = 'platform_terms',
  PRIVACY_DATA = 'privacy_data',
  PARTNERSHIP_TERMS = 'partnership_terms',
  COMPLIANCE = 'compliance'
}
```

### Document Version Management
```typescript
export interface DocumentVersion {
  id: string;
  documentId: string;
  version: string;
  effectiveDate: Date;
  changeType: VersionChangeType;
  summary: string;
  changes: DocumentChange[];
  deprecatedAt?: Date;
  requiresReAcknowledgment: boolean;
}

export enum VersionChangeType {
  MAJOR = 'major',
  MINOR = 'minor',
  CLARIFICATION = 'clarification',
  LEGAL_UPDATE = 'legal_update',
  COMPLIANCE_UPDATE = 'compliance_update'
}

export interface DocumentChange {
  section: string;
  oldContent?: string;
  newContent: string;
  changeType: ChangeType;
  reason: string;
}

export enum ChangeType {
  ADDED = 'added',
  MODIFIED = 'modified',
  REMOVED = 'removed'
}
```

### Acknowledgment Tracking
```typescript
export interface LegalAcknowledgment {
  id: string;
  partnerId: string;
  documentId: string;
  documentVersion: string;
  acknowledgedAt: Date;
  ipAddress: string;
  userAgent: string;
  method: AcknowledgmentMethod;
  status: AcknowledgmentStatus;
}

export enum AcknowledgmentMethod {
  DIGITAL_SIGNATURE = 'digital_signature',
  CLICK_ACKNOWLEDGE = 'click_acknowledge',
  ELECTRONIC_SIGNATURE = 'electronic_signature'
}

export enum AcknowledgmentStatus {
  PENDING = 'pending',
  ACKNOWLEDGED = 'acknowledged',
  EXPIRED = 'expired',
  REVOKED = 'revoked'
}
```

### Compliance Management
```typescript
export interface ComplianceStatus {
  partnerId: string;
  jurisdiction: string[];
  requiredDocuments: string[];
  acknowledgedDocuments: string[];
  pendingAcknowledgments: string[];
  expiredAcknowledgments: string[];
  complianceScore: number;
  lastReviewed: Date;
  nextReviewDate: Date;
}

export interface RegionalRequirement {
  jurisdiction: string;
  requiredDocuments: LegalDocumentType[];
  additionalConsents: string[];
  storageLocation: string;
  dataProcessingRestrictions: string[];
}
```

## Application Hooks

### useLegalDocuments Hook
```typescript
export function useLegalDocuments() {
  const [documents, setDocuments] = useState<LegalDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await legalApi.getDocuments();
      setDocuments(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  };

  const acknowledgeDocument = async (documentId: string) => {
    try {
      await legalApi.acknowledgeDocument(documentId);
      await fetchDocuments(); // Refresh to update status
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to acknowledge');
    }
  };

  return {
    documents,
    loading,
    error,
    acknowledgeDocument,
    refetch: fetchDocuments
  };
}
```

### useDocumentViewer Hook
```typescript
export function useDocumentViewer(documentId: string) {
  const [document, setDocument] = useState<LegalDocument | null>(null);
  const [versions, setVersions] = useState<DocumentVersion[]>([]);
  const [loading, setLoading] = useState(false);

  const loadDocument = async (id: string) => {
    try {
      setLoading(true);
      const [docData, versionData] = await Promise.all([
        legalApi.getDocument(id),
        legalApi.getDocumentVersions(id)
      ]);
      
      setDocument(docData.data);
      setVersions(versionData.data);
    } catch (err) {
      console.error('Failed to load document:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (documentId) {
      loadDocument(documentId);
    }
  }, [documentId]);

  return {
    document,
    versions,
    loading,
    loadDocument
  };
}
```

## Visual Design System

### Color Scheme
```css
/* Legal Document Status Colors */
:root {
  --legal-required: #dc2626;    /* Red for required actions */
  --legal-acknowledged: #16a34a; /* Green for acknowledged */
  --legal-pending: #f59e0b;      /* Orange for pending */
  --legal-updated: #3b82f6;      /* Blue for updated documents */
  --legal-expired: #6b7280;      /* Gray for expired */
}
```

### Component Styling
```css
.legal-document-card {
  @apply border border-gray-200 rounded-lg p-6 transition-all duration-200;
}

.legal-document-card:hover {
  @apply border-siso-orange/30 shadow-lg;
}

.legal-document-card.required {
  @apply border-l-4 border-l-red-500 bg-red-50/50;
}

.legal-document-card.updated {
  @apply border-l-4 border-l-blue-500 bg-blue-50/50;
}

.legal-acknowledgment-checkbox {
  @apply w-4 h-4 text-siso-orange border-gray-300 rounded focus:ring-siso-orange/20;
}

.legal-version-timeline {
  @apply relative pl-6 before:absolute before:left-2 before:top-0 before:bottom-0 before:w-0.5 before:bg-gray-200;
}

.legal-version-item {
  @apply relative mb-4 before:absolute before:-left-4 before:top-2 before:w-4 before:h-4 before:bg-siso-orange before:rounded-full;
}
```

## Key Features

### Document Management
- **Version Control**: Track all document versions with change history
- **Access Control**: Role-based access to sensitive legal documents
- **Search & Filter**: Find specific agreements or clauses quickly
- **Export Options**: Download documents in PDF, HTML formats

### Acknowledgment System
- **Digital Signatures**: Legally binding acknowledgment with timestamps
- **Progress Tracking**: Show completion status for required documents
- **Reminders**: Automatic notifications for pending or expired acknowledgments
- **Audit Trail**: Complete log of all acknowledgment activities

### Compliance Monitoring
- **Jurisdiction Detection**: Automatic identification of applicable regulations
- **Compliance Score**: Visual indicator of legal compliance status
- **Regional Requirements**: Specific documents based on partner location
- **Review Scheduling**: Automated reminders for periodic legal reviews

## Integration Points

### Backend APIs
```typescript
// Legal Documents API
GET    /api/legal/documents              // List all legal documents
GET    /api/legal/documents/:id          // Get specific document
POST   /api/legal/documents/:id/acknowledge  // Acknowledge document
GET    /api/legal/documents/:id/versions // Get document version history

// Compliance API
GET    /api/legal/compliance/status      // Get compliance status
POST   /api/legal/compliance/review      // Trigger compliance review
GET    /api/legal/compliance/requirements // Get jurisdiction requirements
```

### External Integrations
- **DocuSign Integration**: Electronic signature capabilities
- **Legal Content Management**: CMS for legal document updates
- **Compliance Monitoring**: Third-party compliance tracking services
- **Audit Logging**: Immutable audit trail for legal compliance

## Error Handling

### Document Loading Errors
```typescript
const handleDocumentError = (error: Error) => {
  if (error.message.includes('404')) {
    toast.error('Legal document not found. Please contact support.');
  } else if (error.message.includes('403')) {
    toast.error('You do not have access to this document.');
  } else {
    toast.error('Failed to load legal document. Please try again.');
  }
};
```

### Acknowledgment Errors
```typescript
const handleAcknowledgmentError = (error: Error) => {
  if (error.message.includes('already_acknowledged')) {
    toast.info('This document has already been acknowledged.');
  } else if (error.message.includes('expired')) {
    toast.error('This document version has expired. Please review the latest version.');
  } else {
    toast.error('Failed to acknowledge document. Please try again.');
  }
};
```

## Performance Considerations

### Document Loading
- **Lazy Loading**: Load document content only when viewed
- **Caching Strategy**: Cache frequently accessed legal documents
- **CDN Delivery**: Serve documents via CDN for global performance
- **Compression**: Compress document content for faster loading

### Real-time Updates
- **WebSocket Integration**: Real-time updates for document changes
- **Change Notifications**: Push notifications for important legal updates
- **Background Sync**: Synchronize acknowledgments in background

## Testing Strategy

### Unit Tests
- Document parsing and validation
- Acknowledgment flow logic
- Version comparison algorithms
- Compliance rule evaluation

### Integration Tests
- API endpoint testing
- Document acknowledgment workflows
- Permission-based access control
- Cross-browser compatibility

### E2E Tests
- Complete legal document review flow
- Multi-document acknowledgment scenarios
- Error handling and recovery
- Mobile responsiveness

## Accessibility Requirements

### WCAG 2.1 Compliance
- **Keyboard Navigation**: Full keyboard access to all legal documents
- **Screen Reader Support**: Proper ARIA labels and semantic markup
- **Visual Accessibility**: Sufficient contrast ratios for legal text
- **Focus Management**: Clear focus indicators for interactive elements

### Legal Document Accessibility
- **Text-to-Speech**: Support for screen readers reading legal content
- **High Contrast Mode**: Enhanced contrast for legal document viewing
- **Font Size Control**: Adjustable text size for legal document readability
- **Language Support**: Multi-language support for international partners

## Security Requirements

### Data Protection
- **Encryption**: Encrypt sensitive legal document content
- **Access Logging**: Track all access to legal documents
- **Data Retention**: Comply with data retention requirements
- **Secure Transmission**: HTTPS for all legal document communications

### Authentication & Authorization
- **Role-Based Access**: Different access levels for different partner tiers
- **Session Management**: Secure session handling for document viewing
- **Audit Logging**: Comprehensive logging of all legal document interactions
- **Rate Limiting**: Prevent abuse of legal document downloads

## Analytics & Telemetry

### Legal Engagement Metrics
- **Document Views**: Track which documents are most frequently viewed
- **Acknowledgment Rates**: Monitor acknowledgment completion rates
- **Time to Acknowledge**: Measure time between document access and acknowledgment
- **Drop-off Points**: Identify where partners abandon the acknowledgment process

### Compliance Analytics
- **Jurisdiction Compliance**: Track compliance by geographic region
- **Document Effectiveness**: Measure understanding through follow-up surveys
- **Update Impact**: Analyze impact of legal document updates on acknowledgment rates
- **Risk Assessment**: Identify potential compliance risks before they become issues

## Implementation Checklist

### Core Functionality
- [ ] Legal document management system
- [ ] Version control and history tracking
- [ ] Digital acknowledgment workflow
- [ ] Compliance status monitoring
- [ ] Regional requirement handling

### Integration & API
- [ ] Legal documents API endpoints
- [ ] External legal content management integration
- [ ] Electronic signature capabilities
- [ ] Audit logging system
- [ ] Compliance monitoring service

### UI/UX Components
- [ ] Document viewer with search and navigation
- [ ] Acknowledgment interface with clear CTAs
- [ ] Version history visualization
- [ ] Compliance status dashboard
- [ ] Mobile-responsive design

### Testing & Quality Assurance
- [ ] Unit tests for legal logic
- [ ] Integration tests for API endpoints
- [ ] E2E tests for complete workflows
- [ ] Accessibility testing
- [ ] Security testing

### Performance & Optimization
- [ ] Document loading optimization
- [ ] Caching strategy implementation
- [ ] CDN configuration for document delivery
- [ ] Real-time update system
- [ ] Background sync capabilities

## Launch Considerations

### Migration Strategy
- **Existing Acknowledgments**: Migrate current acknowledgment data
- **Document Import**: Import existing legal documents and versions
- **User Communication**: Notify partners of new legal management system
- **Training Materials**: Provide guidance on using the new system

### Compliance Validation
- **Legal Review**: Have legal counsel review the implementation
- **Jurisdiction Testing**: Validate compliance across different regions
- **Accessibility Audit**: Ensure WCAG 2.1 compliance
- **Security Assessment**: Conduct security penetration testing

### Success Metrics
- **Acknowledgment Rate**: >95% for required documents
- **User Satisfaction**: >4.5/5 rating for legal document management
- **Compliance Score**: 100% for monitored compliance requirements
- **Performance**: <2 second load time for document viewer