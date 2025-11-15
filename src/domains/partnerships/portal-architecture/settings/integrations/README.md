# App Integrations Settings

- **Route**: `/partner/settings/integrations`
- **Section**: Settings
- **Complexity**: Complex (has domain + application + ui layers)
- **Primary Objective**: Link external tools partners use

## Content Modules & Components

### 1. Page Header & Introduction
**Location**: Top of page
**Component**: Standard settings page header with integration-focused description

**Header Structure**:
```tsx
<div className="space-y-2 pb-6">
  <div className="flex items-center gap-3">
    <Link2 className="h-6 w-6 text-siso-orange" />
    <h1 className="text-2xl font-bold text-siso-text-primary">App Integrations</h1>
  </div>
  <p className="text-siso-text-muted">
    Connect your favorite productivity tools to streamline your partnership workflow. 
    Sync data with Notion, Google Drive, Calendar, and more to work seamlessly across all your platforms.
  </p>
</div>
```

### 2. Available Integrations Grid
**Location**: Main content area
**Component**: Grid of integration cards with connection status

**Integration Cards Structure**:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Notion Integration */}
  <IntegrationCard
    integration={notionIntegration}
    onConnect={() => handleConnect('notion')}
    onDisconnect={() => handleDisconnect('notion')}
    onManage={() => handleManage('notion')}
  />

  {/* Google Drive Integration */}
  <IntegrationCard
    integration={googleDriveIntegration}
    onConnect={() => handleConnect('google-drive')}
    onDisconnect={() => handleDisconnect('google-drive')}
    onManage={() => handleManage('google-drive')}
  />

  {/* Google Calendar Integration */}
  <IntegrationCard
    integration={googleCalendarIntegration}
    onConnect={() => handleConnect('google-calendar')}
    onDisconnect={() => handleDisconnect('google-calendar')}
    onManage={() => handleManage('google-calendar')}
  />

  {/* Slack Integration */}
  <IntegrationCard
    integration={slackIntegration}
    onConnect={() => handleConnect('slack')}
    onDisconnect={() => handleDisconnect('slack')}
    onManage={() => handleManage('slack')}
  />
</div>
```

### 3. Integration Card Component
**Location**: Reusable component for each integration
**Purpose**: Display integration details and connection controls

**IntegrationCard Component**:
```tsx
interface IntegrationCardProps {
  integration: Integration;
  onConnect: () => void;
  onDisconnect: () => void;
  onManage: () => void;
}

function IntegrationCard({
  integration,
  onConnect,
  onDisconnect,
  onManage
}: IntegrationCardProps) {
  const getIntegrationIcon = (type: Integration["type"]) => {
    switch (type) {
      case "notion":
        return <FileText className="h-6 w-6" />;
      case "google-drive":
        return <HardDrive className="h-6 w-6" />;
      case "google-calendar":
        return <Calendar className="h-6 w-6" />;
      case "slack":
        return <MessageSquare className="h-6 w-6" />;
      default:
        return <Plug className="h-6 w-6" />;
    }
  };

  const getStatusColor = () => {
    return integration.connected 
      ? "text-green-500" 
      : "text-gray-400";
  };

  const getCardBorder = () => {
    return integration.connected 
      ? "border-green-500/60 bg-green-500/5" 
      : "border-siso-border/60 bg-siso-bg-secondary/80";
  };

  return (
    <div className={`rounded-2xl border-2 ${getCardBorder()} p-6 transition-all hover:border-siso-orange/60`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`h-12 w-12 rounded-xl bg-siso-bg-tertiary/80 flex items-center justify-center ${getStatusColor()}`}>
            {getIntegrationIcon(integration.type)}
          </div>
          <div>
            <h3 className="font-semibold text-siso-text-primary text-lg">
              {integration.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <div className={`h-2 w-2 rounded-full ${integration.connected ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <span className="text-sm text-siso-text-muted">
                {integration.connected ? 'Connected' : 'Not connected'}
              </span>
              {integration.connected && integration.connectedAt && (
                <span className="text-xs text-siso-text-muted">
                  Connected {formatRelativeTime(integration.connectedAt)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Status Badge */}
        {integration.connected && (
          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            Active
          </Badge>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-siso-text-muted mb-4 leading-relaxed">
        {getIntegrationDescription(integration.type)}
      </p>

      {/* Permissions */}
      {integration.connected && integration.permissions.length > 0 && (
        <div className="mb-4 p-3 rounded-lg bg-siso-bg-tertiary/50">
          <h4 className="text-xs font-medium text-siso-text-primary mb-2 uppercase tracking-wide">
            Permissions
          </h4>
          <div className="flex flex-wrap gap-2">
            {integration.permissions.map((permission) => (
              <span
                key={permission}
                className="px-2 py-1 bg-siso-orange/10 text-siso-orange text-xs rounded-full"
              >
                {formatPermission(permission)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        {!integration.connected ? (
          <button
            onClick={onConnect}
            className="flex-1 px-4 py-2 bg-siso-orange text-white rounded-lg hover:bg-siso-orange/90 transition-colors font-medium"
          >
            Connect {integration.name}
          </button>
        ) : (
          <>
            <button
              onClick={onManage}
              className="flex-1 px-4 py-2 border border-siso-border/60 text-siso-text-primary rounded-lg hover:border-siso-orange/60 hover:text-siso-orange transition-colors font-medium"
            >
              Manage
            </button>
            <button
              onClick={onDisconnect}
              className="px-4 py-2 border border-red-500/60 text-red-500 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors font-medium"
            >
              Disconnect
            </button>
          </>
        )}
      </div>
    </div>
  );
}
```

### 4. Integration Descriptions
**Location**: Helper function for integration descriptions
**Purpose**: Provide detailed descriptions for each integration type

**Integration Descriptions**:
```typescript
const getIntegrationDescription = (type: Integration["type"]) => {
  switch (type) {
    case "notion":
      return "Sync your notes, tasks, and documentation with Notion. Keep all your partnership resources organized and accessible from your favorite productivity tool.";
    case "google-drive":
      return "Automatically backup your files and documents to Google Drive. Access your partnership assets from anywhere and share them securely with clients.";
    case "google-calendar":
      "Sync SISO events, office hours, and deadlines with your Google Calendar. Never miss an important partnership activity or meeting.";
    case "slack":
      "Get notifications for deal updates, messages, and announcements directly in Slack. Stay connected to the partnership community without switching apps.";
    default:
      return "Connect with your favorite productivity tools to enhance your partnership workflow.";
  }
};
```

### 5. Connection Modal
**Location**: Modal overlay for OAuth/authorization flows
**Purpose**: Handle integration connection process

**Connection Modal Component**:
```tsx
interface ConnectionModalProps {
  integration: Integration;
  isOpen: boolean;
  onClose: () => void;
  onConnect: (code: string) => void;
}

function ConnectionModal({
  integration,
  isOpen,
  onClose,
  onConnect
}: ConnectionModalProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      const authUrl = getAuthUrl(integration.type);
      // Open OAuth window
      const popup = window.open(authUrl, 'auth', 'width=500,height=600');
      
      // Listen for OAuth callback
      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'OAUTH_SUCCESS') {
          onConnect(event.data.code);
          popup?.close();
        } else if (event.data.type === 'OAUTH_ERROR') {
          setError(event.data.error);
          popup?.close();
        }
      };
      
      window.addEventListener('message', handleMessage);
      
      // Cleanup
      return () => {
        window.removeEventListener('message', handleMessage);
        if (popup && !popup.closed) {
          popup.close();
        }
      };
    } catch (err) {
      setError('Failed to open connection window');
      setIsConnecting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          {getIntegrationIcon(integration.type)}
          <h2 className="text-xl font-bold text-siso-text-primary">
            Connect {integration.name}
          </h2>
        </div>
        
        <p className="text-siso-text-muted mb-6">
          {getConnectDescription(integration.type)}
        </p>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-siso-border/60 text-siso-text-primary rounded-lg hover:border-siso-orange/60 transition-colors"
            disabled={isConnecting}
          >
            Cancel
          </button>
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className="flex-1 px-4 py-2 bg-siso-orange text-white rounded-lg hover:bg-siso-orange/90 transition-colors disabled:opacity-50"
          >
            {isConnecting ? 'Connecting...' : 'Connect'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
```

### 6. Settings Management Section (Optional Enhancement)
**Location**: Below integration grid
**Component**: Global integration settings and preferences

**Settings Section**:
```tsx
<div className="mt-8 rounded-2xl border border-siso-border/60 bg-siso-bg-secondary/80 p-6">
  <h3 className="font-semibold text-siso-text-primary mb-4">Integration Settings</h3>
  
  <div className="space-y-4">
    {/* Sync Frequency */}
    <div className="flex items-center justify-between">
      <div>
        <h4 className="font-medium text-siso-text-primary">Sync Frequency</h4>
        <p className="text-sm text-siso-text-muted">
          How often to sync data with connected services
        </p>
      </div>
      <Select value={syncFrequency} onValueChange={setSyncFrequency}>
        <option value="realtime">Real-time</option>
        <option value="hourly">Every hour</option>
        <option value="daily">Once daily</option>
        <option value="manual">Manual only</option>
      </Select>
    </div>

    {/* Notification Preferences */}
    <div className="flex items-center justify-between">
      <div>
        <h4 className="font-medium text-siso-text-primary">Integration Notifications</h4>
        <p className="text-sm text-siso-text-muted">
          Get notified about sync status and errors
        </p>
      </div>
      <ToggleSwitch
        checked={integrationNotifications}
        onCheckedChange={setIntegrationNotifications}
      />
    </div>

    {/* Auto-connect */}
    <div className="flex items-center justify-between">
      <div>
        <h4 className="font-medium text-siso-text-primary">Auto-connect New Services</h4>
        <p className="text-sm text-siso-text-muted">
          Automatically connect services when detected
        </p>
      </div>
      <ToggleSwitch
        checked={autoConnect}
        onCheckedChange={setAutoConnect}
      />
    </div>
  </div>
</div>
```

## Domain Types & Data Structure

### Integration Interface
```typescript
interface Integration {
  id: string;                           // Unique integration identifier
  name: string;                         // Display name (e.g., "Notion", "Google Drive")
  type: "notion" | "google-drive" | "google-calendar" | "slack";  // Integration type
  connected: boolean;                   // Connection status
  connectedAt?: Date;                  // When the integration was connected
  permissions: string[];                // Granted permissions list
  lastSync?: Date;                     // Last successful sync timestamp
  settings?: IntegrationSettings;       // Integration-specific settings
  status: "active" | "error" | "syncing"; // Current status
  errorMessage?: string;                // Error message if status is "error"
}
```

### Integration Settings Interface
```typescript
interface IntegrationSettings {
  syncFrequency: "realtime" | "hourly" | "daily" | "manual";
  autoSync: boolean;
  notifications: boolean;
  dataFilters: {
    dealUpdates: boolean;
    notifications: boolean;
    calendarEvents: boolean;
    files: boolean;
  };
  folderMappings?: Record<string, string>;  // For file-based integrations
}
```

### OAuth Configuration Interface
```typescript
interface OAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
  authUrl: string;
  tokenUrl: string;
}
```

## Application Hook: `useIntegrations`

**Purpose**: Manages integration connections and provides integration operations

**Hook Structure**:
```typescript
export function useIntegrations() {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);
  const [connectingType, setConnectingType] = useState<string | null>(null);

  // Fetch all integrations
  const fetchIntegrations = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/integrations');
      setIntegrations(response.data);
    } catch (error) {
      console.error('Failed to fetch integrations:', error);
    } finally {
      setLoading(false);
    }
  };

  // Connect integration
  const connectIntegration = async (type: string, code: string) => {
    setConnectingType(type);
    try {
      const response = await api.post('/api/integrations/connect', {
        type,
        code,
        redirectUri: window.location.origin + '/settings/integrations'
      });
      
      setIntegrations(prev => 
        prev.map(int => 
          int.type === type 
            ? { ...response.data, connected: true }
            : int
        )
      );
      
      toast.success(`${getIntegrationName(type)} connected successfully`);
    } catch (error) {
      toast.error(`Failed to connect ${getIntegrationName(type)}`);
      throw error;
    } finally {
      setConnectingType(null);
    }
  };

  // Disconnect integration
  const disconnectIntegration = async (type: string) => {
    try {
      await api.delete(`/api/integrations/${type}`);
      
      setIntegrations(prev => 
        prev.map(int => 
          int.type === type 
            ? { ...int, connected: false, connectedAt: undefined }
            : int
        )
      );
      
      toast.success(`${getIntegrationName(type)} disconnected`);
    } catch (error) {
      toast.error(`Failed to disconnect ${getIntegrationName(type)}`);
    }
  };

  // Sync integration data
  const syncIntegration = async (type: string) => {
    try {
      await api.post(`/api/integrations/${type}/sync`);
      
      setIntegrations(prev => 
        prev.map(int => 
          int.type === type 
            ? { ...int, status: 'syncing' as const }
            : int
        )
      );
      
      toast.success(`Syncing ${getIntegrationName(type)}...`);
    } catch (error) {
      toast.error(`Failed to sync ${getIntegrationName(type)}`);
    }
  };

  // Update integration settings
  const updateIntegrationSettings = async (type: string, settings: IntegrationSettings) => {
    try {
      await api.put(`/api/integrations/${type}/settings`, settings);
      toast.success(`${getIntegrationName(type)} settings updated`);
    } catch (error) {
      toast.error(`Failed to update ${getIntegrationName(type)} settings`);
    }
  };

  return {
    integrations,
    loading,
    connectingType,
    fetchIntegrations,
    connectIntegration,
    disconnectIntegration,
    syncIntegration,
    updateIntegrationSettings
  };
}
```

## Visual Design System

### Component Styling
- **Integration Cards**: `rounded-2xl border-2 p-6` with status-based coloring
- **Connected State**: Green accent with "Active" badge
- **Disconnected State**: Neutral gray styling with orange hover
- **Icon Containers**: `h-12 w-12 rounded-xl` with colored backgrounds

### Status Indicators
- **Connected**: Green background and text, filled circle indicator
- **Disconnected**: Gray background and text, empty circle indicator
- **Error State**: Red styling with error message display
- **Syncing**: Blue spinner or loading state

### Color Coding
- **Primary Orange**: `#f6b75e` (siso-orange) for main CTAs
- **Success Green**: `#10b981` for connected status
- **Error Red**: `#ef4444` for error states
- **Neutral Gray**: `#6b7280` for disconnected state

### Typography Scale
- **Integration Names**: 18px semibold, primary text color
- **Status Text**: 14px regular, muted/colored text
- **Permission Tags**: 12px regular, orange text with background
- **Button Text**: 14px medium, consistent across all buttons

### Spacing System
- **Card Padding**: `p-6` (24px) for comfortable content layout
- **Grid Gaps**: `gap-6` (24px) between integration cards
- **Item Spacing**: `gap-3` (12px) within cards
- **Section Spacing**: `mt-8` (32px) between major sections

## Integration-Specific Implementations

### Notion Integration
**Features**:
- **Database Sync**: Sync notes, pages, and databases
- **Task Integration**: Sync tasks and due dates
- **File Handling**: Attach files from Notion to SISO
- **Template Sync**: Use Notion templates for SISO documents

**OAuth Scopes**:
- `read:database` - Read databases and pages
- `write:database` - Create and modify content
- `file:read` - Access files and attachments

### Google Drive Integration
**Features**:
- **File Backup**: Automatic backup of SISO files
- **Folder Mapping**: Map SISO folders to Drive folders
- **Sharing**: Share files via Drive links
- **Version History**: Maintain file version history

**OAuth Scopes**:
- `drive.file` - File access
- `drive.metadata` - File metadata
- `drive.readonly` - Read-only access

### Google Calendar Integration
**Features**:
- **Event Sync**: Sync SISO events to calendar
- **Office Hours**: Display SISO office hours
- **Task Deadlines**: Show task due dates
- **Meeting Links**: Add meeting links to events

**OAuth Scopes**:
- `calendar.readonly` - Read calendar events
- `calendar.events` - Create and modify events

### Slack Integration
**Features**:
- **Notification Sync**: Send SISO notifications to Slack
- **Channel Integration**: Post updates to specific channels
- **Direct Messages**: Send DMs for important updates
- **Commands**: Slash commands for quick actions

**OAuth Scopes**:
- `channels:read` - Read channel information
- `chat:write` - Send messages
- `users:read` - User information

## Integration Flows

### OAuth Connection Flow
```typescript
const connectIntegration = async (type: string) => {
  // 1. Generate authorization URL
  const authUrl = generateAuthUrl(type);
  
  // 2. Open popup window
  const popup = window.open(authUrl, 'auth', 'width=500,height=600');
  
  // 3. Listen for callback
  window.addEventListener('message', handleAuthCallback);
  
  // 4. Exchange authorization code for tokens
  const tokens = await exchangeCodeForTokens(code);
  
  // 5. Save tokens and update integration status
  await saveIntegrationTokens(type, tokens);
};

const handleAuthCallback = (event: MessageEvent) => {
  if (event.origin !== window.location.origin) return;
  
  if (event.data.type === 'OAUTH_SUCCESS') {
    connectIntegration(event.data.code, event.data.type);
  } else if (event.data.type === 'OAUTH_ERROR') {
    showError(event.data.error);
  }
};
```

### Data Synchronization
```typescript
const syncData = async (integrationType: string) => {
  try {
    // 1. Update status to syncing
    updateIntegrationStatus(integrationType, 'syncing');
    
    // 2. Fetch data from external service
    const externalData = await fetchDataFromService(integrationType);
    
    // 3. Transform data to SISO format
    const sisoData = transformData(externalData, integrationType);
    
    // 4. Save data to SISO database
    await saveToSISO(sisoData, integrationType);
    
    // 5. Update last sync timestamp
    updateIntegrationStatus(integrationType, 'active');
    
  } catch (error) {
    updateIntegrationStatus(integrationType, 'error');
    logSyncError(integrationType, error);
  }
};
```

### Error Handling
```typescript
const handleIntegrationError = (error: IntegrationError) => {
  // 1. Log error details
  logError(error);
  
  // 2. Update integration status
  updateIntegrationStatus(error.type, 'error', error.message);
  
  // 3. Show user notification
  showNotification({
    type: 'error',
    title: 'Integration Error',
    message: `Failed to ${error.action} ${getIntegrationName(error.type)}`,
    actions: [
      {
        label: 'Retry',
        onClick: () => retryIntegration(error.type, error.action)
      },
      {
        label: 'Settings',
        onClick: () => navigateToIntegrationSettings(error.type)
      }
    ]
  });
};
```

## Security Considerations

### Token Management
- **Secure Storage**: Encrypt tokens at rest in database
- **Token Refresh**: Implement automatic token refresh mechanisms
- **Token Revocation**: Handle token revocation on disconnect
- **Scope Limitation**: Request minimum necessary permissions

### Data Privacy
- **Data Minimization**: Only sync necessary data
- **Encryption**: Encrypt sensitive data in transit
- **Access Control**: Implement proper access controls for synced data
- **Compliance**: Ensure GDPR and data protection compliance

### API Security
- **Rate Limiting**: Implement rate limiting for API calls
- **Webhook Security**: Validate webhook signatures
- **Access Tokens**: Use secure access tokens for API calls
- **Audit Logging**: Log all integration activities

## Performance Considerations

### Batch Processing
- **Bulk Operations**: Process multiple items in batches
- **Queue System**: Implement queue for background operations
- **Retry Logic**: Implement exponential backoff for failed operations
- **Progress Tracking**: Show progress for long-running syncs

### Caching Strategy
- **Response Caching**: Cache API responses to reduce calls
- **Data Caching**: Cache transformed data to avoid reprocessing
- **Invalidation**: Implement cache invalidation on data changes
- **Background Refresh**: Refresh cached data in background

### Resource Optimization
- **Lazy Loading**: Load integration data on demand
- **Image Optimization**: Optimize synced images and files
- **Bandwidth Management**: Implement data compression for large transfers
- **Memory Management**: Clean up unused resources and connections

## Error Handling

### Connection Errors
- **Network Failures**: Handle network connectivity issues
- **Authentication Errors**: Handle expired or invalid credentials
- **Permission Errors**: Handle insufficient permissions
- **Service Errors**: Handle external service outages

### Sync Errors
- **Data Validation**: Validate data format and structure
- **Conflict Resolution**: Handle data conflicts between services
- **Partial Failures**: Handle partial sync failures gracefully
- **Recovery Mechanisms**: Implement automatic retry with fallback

### User Experience
- **Error Messaging**: Clear, actionable error messages
- **Recovery Options**: Provide options to retry or resolve issues
- **Status Indicators**: Clear indication of sync status
- **Progress Feedback**: Show progress for long-running operations

## Testing Strategy

### Unit Tests
- **Hook Testing**: `useIntegrations` state management and API calls
- **Utility Functions**: Data transformation and formatting functions
- **Error Scenarios**: Network failures and edge cases
- **OAuth Flow**: Authentication and token exchange logic

### Integration Tests
- **API Integration**: Mock external service responses
- **Data Sync**: End-to-end synchronization workflows
- **Error Handling**: Error scenarios and recovery mechanisms
- **Real-time Updates**: WebSocket event handling

### E2E Tests
- **Connection Workflows**: Complete OAuth connection flows
- **Data Synchronization**: End-to-end sync processes
- **User Interactions**: Connect, manage, and disconnect integrations
- **Error Recovery**: Error handling and user recovery workflows