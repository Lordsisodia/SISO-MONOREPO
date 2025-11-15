# Connected Devices Settings

- **Route**: `/partner/settings/devices`
- **Section**: Settings
- **Complexity**: Medium (has domain + application + ui layers)
- **Primary Objective**: Manage devices and sessions

## Content Modules & Components

### 1. Page Header & Introduction
**Location**: Top of page
**Component**: Standard settings page header

**Header Structure**:
```tsx
<div className="space-y-2 pb-6">
  <div className="flex items-center gap-3">
    <Monitor className="h-6 w-6 text-siso-orange" />
    <h1 className="text-2xl font-bold text-siso-text-primary">Connected Devices</h1>
  </div>
  <p className="text-siso-text-muted">
    Manage your active sessions and connected devices. Keep your account secure by reviewing devices that have access to your SISO partnership account.
  </p>
</div>
```

### 2. Current Device Indicator
**Location**: Below header
**Component**: Highlighted card showing current device

**Current Device Card**:
```tsx
<div className="rounded-2xl border border-siso-orange/60 bg-gradient-to-r from-siso-orange/5 to-siso-orange/10 p-4 mb-6">
  <div className="flex items-center gap-3">
    <div className="h-10 w-10 rounded-xl bg-siso-orange/20 flex items-center justify-center">
      <Smartphone className="h-5 w-5 text-siso-orange" />
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <h3 className="font-semibold text-siso-text-primary">Current Device</h3>
        <span className="px-2 py-1 bg-siso-orange/20 text-xs font-medium text-siso-orange rounded-full">
          Active Now
        </span>
      </div>
      <p className="text-sm text-siso-text-muted">
        {currentDevice.name} • {currentDevice.browser} on {currentDevice.os}
      </p>
    </div>
  </div>
</div>
```

### 3. Active Sessions List
**Location**: Main content area
**Component**: Device list with management actions

**Device List Structure**:
```typescript
const deviceList = [
  {
    id: "device-1",
    name: "MacBook Pro",
    type: "desktop" as const,
    browser: "Chrome 120.0",
    os: "macOS Sonoma 14.2",
    lastActive: new Date("2024-01-15T10:30:00Z"),
    current: true,
    location: "San Francisco, CA",
    ipAddress: "192.168.1.100"
  },
  {
    id: "device-2", 
    name: "iPhone 15 Pro",
    type: "mobile" as const,
    browser: "Safari 17.2",
    os: "iOS 17.2",
    lastActive: new Date("2024-01-14T18:45:00Z"),
    current: false,
    location: "San Francisco, CA", 
    ipAddress: "192.168.1.101"
  }
]
```

**Device Row Component**:
```tsx
<div className="divide-y divide-siso-border/30">
  {devices.map((device) => (
    <div key={device.id} className="p-4 hover:bg-siso-bg-secondary/50 transition-colors">
      <div className="flex items-center gap-4">
        {/* Device Icon */}
        <div className="h-12 w-12 rounded-xl bg-siso-bg-tertiary/80 flex items-center justify-center">
          {getDeviceIcon(device.type)}
        </div>
        
        {/* Device Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-siso-text-primary truncate">
              {device.name}
            </h3>
            {device.current && (
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-xs font-medium text-green-700 dark:text-green-400 rounded-full">
                Current
              </span>
            )}
          </div>
          <p className="text-sm text-siso-text-muted">
            {device.browser} • {device.os}
          </p>
          <div className="flex items-center gap-4 mt-1">
            <span className="text-xs text-siso-text-muted/70">
              📍 {device.location}
            </span>
            <span className="text-xs text-siso-text-muted/70">
              Last active: {formatRelativeTime(device.lastActive)}
            </span>
          </div>
        </div>
        
        {/* Actions */}
        {!device.current && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => revokeDevice(device.id)}
              className="px-3 py-1.5 text-sm border border-siso-border/60 rounded-lg hover:border-red-500/60 hover:text-red-500 transition-colors"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  ))}
</div>
```

### 4. Security Actions Section
**Location**: Below device list
**Component**: Security controls and bulk actions

**Security Actions**:
```tsx
<div className="mt-8 space-y-4">
  <div className="rounded-2xl border border-siso-border/60 bg-siso-bg-secondary/80 p-6">
    <h3 className="font-semibold text-siso-text-primary mb-4">Security Options</h3>
    
    <div className="space-y-3">
      {/* Sign Out All Other Devices */}
      <div className="flex items-center justify-between p-4 rounded-xl border border-siso-border/40 bg-siso-bg-tertiary/30">
        <div>
          <h4 className="font-medium text-siso-text-primary">Sign Out All Other Devices</h4>
          <p className="text-sm text-siso-text-muted">
            Immediately end all sessions except your current device
          </p>
        </div>
        <button
          onClick={signOutAllDevices}
          className="px-4 py-2 bg-siso-orange text-white rounded-lg hover:bg-siso-orange/90 transition-colors"
        >
          Sign Out All
        </button>
      </div>
      
      {/* Review Login History */}
      <div className="flex items-center justify-between p-4 rounded-xl border border-siso-border/40 bg-siso-bg-tertiary/30">
        <div>
          <h4 className="font-medium text-siso-text-primary">Login History</h4>
          <p className="text-sm text-siso-text-muted">
            View the last 30 days of login attempts and suspicious activity
          </p>
        </div>
        <button
          onClick={viewLoginHistory}
          className="px-4 py-2 border border-siso-border/60 text-siso-text-primary rounded-lg hover:border-siso-orange/60 hover:text-siso-orange transition-colors"
        >
          View History
        </button>
      </div>
    </div>
  </div>
</div>
```

### 5. Login History Modal (Optional Enhancement)
**Location**: Modal overlay
**Component**: Detailed login history with suspicious activity flags

**Login History Structure**:
```typescript
interface LoginEntry {
  id: string;
  timestamp: Date;
  device: {
    name: string;
    type: "mobile" | "desktop" | "tablet";
    browser: string;
    os: string;
  };
  location: {
    city: string;
    country: string;
    ipAddress: string;
  };
  status: "success" | "failed" | "suspicious";
  details?: string;
}
```

## Domain Types & Data Structure

### Device Interface
```typescript
interface Device {
  id: string;                    // Unique device identifier
  name: string;                  // Device display name
  type: "mobile" | "desktop" | "tablet";  // Device category
  browser: string;               // Browser and version
  os: string;                    // Operating system and version
  lastActive: Date;              // Last activity timestamp
  current: boolean;              // Is this the current device?
  location?: string;             // Geographic location
  ipAddress?: string;            // IP address
}
```

### Login History Interface
```typescript
interface LoginEntry {
  id: string;           // Unique login attempt ID
  timestamp: Date;      // When the login attempt occurred
  device: Device;       // Device information
  location: {           // Location data
    city: string;
    country: string;
    ipAddress: string;
  };
  status: "success" | "failed" | "suspicious";  // Login outcome
  details?: string;    // Additional context
}
```

## Application Hook: `useDevices`

**Purpose**: Manages device data and provides device management functions

**Hook Structure**:
```typescript
export function useDevices() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLoginHistory, setShowLoginHistory] = useState(false);

  // Fetch devices
  const fetchDevices = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/user/devices');
      setDevices(response.data);
    } catch (error) {
      console.error('Failed to fetch devices:', error);
    } finally {
      setLoading(false);
    }
  };

  // Revoke specific device
  const revokeDevice = async (deviceId: string) => {
    try {
      await api.delete(`/api/user/devices/${deviceId}`);
      setDevices(prev => prev.filter(device => device.id !== deviceId));
      toast.success('Device signed out successfully');
    } catch (error) {
      toast.error('Failed to sign out device');
    }
  };

  // Revoke all devices except current
  const revokeAllDevices = async () => {
    try {
      await api.post('/api/user/devices/revoke-all');
      await fetchDevices(); // Refresh device list
      toast.success('All other devices signed out');
    } catch (error) {
      toast.error('Failed to sign out devices');
    }
  };

  // Get login history
  const getLoginHistory = async (): Promise<LoginEntry[]> => {
    try {
      const response = await api.get('/api/user/login-history');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch login history:', error);
      return [];
    }
  };

  return {
    devices,
    loading,
    showLoginHistory,
    setShowLoginHistory,
    revokeDevice,
    revokeAllDevices,
    getLoginHistory,
    refreshDevices: fetchDevices
  };
}
```

## Visual Design System

### Component Styling
- **Device Rows**: `p-4` padding with hover background change
- **Current Device Card**: Orange gradient background with prominent styling
- **Action Buttons**: Consistent `px-4 py-2` padding with color-coded states
- **Security Cards**: Nested backgrounds with border accents

### Device Icons
```typescript
const getDeviceIcon = (type: Device["type"]) => {
  switch (type) {
    case "mobile":
      return <Smartphone className="h-5 w-5" />;
    case "desktop":
      return <Monitor className="h-5 w-5" />;
    case "tablet":
      return <Tablet className="h-5 w-5" />;
  }
};
```

### Color Coding
- **Current Device**: Green accent with "Active Now" badge
- **Regular Devices**: Neutral gray icons and borders
- **Danger Actions**: Red hover states for sign-out actions
- **Primary Actions**: Orange background for main CTAs

### Typography Scale
- **Device Names**: 16px semibold, truncate overflow
- **Browser/OS Info**: 14px regular, muted color
- **Location/IP**: 12px muted with 70% opacity
- **Timestamps**: 12px with relative time formatting

### Spacing System
- **Row Padding**: `p-4` (16px) for comfortable touch targets
- **Item Gaps**: `gap-4` (16px) between icon, content, and actions
- **Section Spacing**: `mt-8` (32px) between major sections
- **Card Padding**: `p-6` (24px) for security options

## Interaction Patterns

### Device Management
- **Hover Effects**: Background color change on device rows
- **Confirmation Dialogs**: Confirm device revocation before action
- **Loading States**: Show skeleton loaders during API calls
- **Success Feedback**: Toast notifications for completed actions

### Security Controls
- **Primary CTA**: Orange "Sign Out All" button for bulk action
- **Secondary CTA**: Border-only buttons for viewing history
- **Danger Actions**: Red hover states for destructive operations
- **Modal Views**: Overlay for detailed login history

### Responsive Behavior
- **Mobile Layout**: Stack device info vertically with full-width actions
- **Desktop Layout**: Horizontal layout with better space utilization
- **Touch Targets**: Minimum 44px tap targets for mobile usability

## Integration Points

### Authentication System
- **Session Management**: Integrate with auth provider session tracking
- **Device Fingerprinting**: Generate unique device identifiers
- **Session Tokens**: Handle session invalidation on device revocation
- **Current Device Detection**: Identify the active browsing session

### Security Monitoring
- **Suspicious Activity**: Flag unusual login patterns or locations
- **IP Geolocation**: Map IP addresses to geographic locations
- **Failed Login Tracking**: Monitor and display failed authentication attempts
- **Security Alerts**: Notify users of suspicious activity

### User Preferences
- **Device Naming**: Allow users to customize device display names
- **Trusted Devices**: Option to remember devices for extended sessions
- **Login Notifications**: Alert users when new devices access their account
- **Session Duration**: Configurable session timeout preferences

## Data Requirements

### API Endpoints
```typescript
// Get all active devices
GET /api/user/devices

// Revoke specific device session
DELETE /api/user/devices/:deviceId

// Revoke all devices except current
POST /api/user/devices/revoke-all

// Get login history (last 30 days)
GET /api/user/login-history?limit=30&days=30

// Update device display name
PUT /api/user/devices/:deviceId
{
  name: string;
}

// Report suspicious activity
POST /api/user/report-suspicious-activity
{
  deviceId: string;
  description: string;
}
```

### Real-time Updates
- **WebSocket Events**: Device connect/disconnect notifications
- **Live Session Updates**: Real-time device status changes
- **Security Alerts**: Immediate notifications for suspicious activity
- **Session Expiry**: Handle automatic session expiration

### Browser Storage
- **Device ID**: Store device identifier in localStorage
- **Session Tracking**: Maintain session state across browser refreshes
- **Preferences**: Cache user device management preferences
- **Offline Support**: Basic functionality when network unavailable

## Security Considerations

### Device Identification
- **Fingerprinting**: Use browser and system characteristics for device ID
- **Secure Tokens**: Store session tokens with device association
- **Session Validation**: Validate device tokens on each request
- **Anti-Tampering**: Prevent device ID manipulation

### Data Privacy
- **Location Data**: Only store approximate location (city/country)
- **IP Address**: Hash or truncate IP addresses for privacy
- **Data Retention**: Automatically expire old login history entries
- **GDPR Compliance**: Allow users to export and delete their data

### Access Control
- **Current Device Protection**: Prevent users from revoking their current session
- **Recovery Options**: Provide account recovery if all devices are revoked
- **Rate Limiting**: Prevent brute force attacks on device management
- **Authentication**: Require re-authentication for sensitive device actions

## Performance Considerations

### Efficient Loading
- **Pagination**: Limit login history to prevent large data loads
- **Caching**: Cache device information to reduce API calls
- **Lazy Loading**: Load detailed device information on demand
- **Background Sync**: Refresh device list in background when needed

### Mobile Optimization
- **Touch Targets**: Ensure 44px minimum touch targets
- **Network Awareness**: Optimize for potentially slow mobile connections
- **Battery Efficiency**: Minimize background polling and updates
- **Memory Management**: Clean up event listeners and timers

## Error Handling

### Network Errors
- **Retry Logic**: Automatic retry with exponential backoff
- **Offline Mode**: Graceful degradation when network unavailable
- **Error Messages**: Clear, actionable error descriptions
- **Recovery Options**: Provide manual refresh and retry options

### User Experience
- **Loading States**: Clear indicators during data fetching
- **Empty States**: Helpful messaging when no devices found
- **Confirmation Dialogs**: Prevent accidental device revocation
- **Success Feedback**: Clear confirmation when actions complete

## Testing Strategy

### Unit Tests
- **Hook Testing**: `useDevices` state management and API calls
- **Component Testing**: Device list rendering and interactions
- **Utility Functions**: Device icon mapping and formatting helpers
- **Error Scenarios**: Network failures and edge cases

### Integration Tests
- **API Integration**: Mock API responses for device operations
- **Authentication Flow**: Session management integration
- **Real-time Updates**: WebSocket event handling
- **Security Features**: Device revocation and session management

### E2E Tests
- **Complete User Flows**: Device management from list to revocation
- **Cross-Device Testing**: Verify behavior across different devices
- **Security Scenarios**: Suspicious activity detection and response
- **Mobile Experience**: Touch interactions and responsive behavior