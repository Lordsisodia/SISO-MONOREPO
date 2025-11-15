# Partnership Workspace

Integrated productivity suite for partners with calendar management, task tracking, note-taking, and file organization.

## Overview

The Partnership Workspace provides a comprehensive productivity environment tailored specifically for SISO partners. This module integrates calendar management, task tracking, note-taking, and file organization into a unified workspace, enabling partners to manage their daily activities, collaborate with team members, and maintain organized records of their partnership activities.

## Architecture

The Workspace module follows a modular architecture that allows for seamless integration between different productivity components:

```
┌─────────────────────────────────────────────────────────┐
│                Workspace Orchestrator                   │
├─────────────────────────────────────────────────────────┤
│  Calendar    │    Tasks     │    Notes     │   Files    │
│  Management  │  Management  │ Management  │ Management │
├─────────────────────────────────────────────────────────┤
│                 Shared Services Layer                    │
│  Scheduling  │  Collaboration  │  Search  │  Sync      │
├─────────────────────────────────────────────────────────┤
│                  Data Integration Layer                  │
│   Calendar API   │   Task API   │   Notes API   │ Files API │
└─────────────────────────────────────────────────────────┘
```

## Domain Types

```typescript
interface Workspace {
  id: string;
  userId: string;
  name: string;
  type: WorkspaceType;
  preferences: WorkspacePreferences;
  widgets: WorkspaceWidget[];
  integrations: WorkspaceIntegration[];
  sharing: WorkspaceSharing;
  createdAt: Date;
  updatedAt: Date;
  lastAccessed: Date;
}

interface WorkspacePreferences {
  theme: Theme;
  timezone: string;
  language: string;
  dateFormat: string;
  timeFormat: TimeFormat;
  notifications: NotificationPreferences;
  privacy: PrivacySettings;
  shortcuts: KeyboardShortcut[];
  layout: LayoutConfiguration;
}

interface WorkspaceWidget {
  id: string;
  type: WidgetType;
  title: string;
  position: WidgetPosition;
  size: WidgetSize;
  configuration: WidgetConfiguration;
  isVisible: boolean;
  isMinimized: boolean;
  data: any;
}

interface WorkspaceIntegration {
  id: string;
  service: IntegrationService;
  status: IntegrationStatus;
  configuration: IntegrationConfig;
  syncFrequency: SyncFrequency;
  lastSync: Date;
  permissions: Permission[];
}

enum WorkspaceType {
  PERSONAL = 'personal',
  TEAM = 'team',
  PROJECT = 'project',
  PARTNERSHIP = 'partnership',
  CLIENT = 'client'
}

enum WidgetType {
  CALENDAR = 'calendar',
  TASK_LIST = 'task_list',
  NOTES = 'notes',
  FILES = 'files',
  WEATHER = 'weather',
  NEWS = 'news',
  CLOCK = 'clock',
  QUICK_ACTIONS = 'quick_actions',
  STATISTICS = 'statistics',
  MESSAGES = 'messages'
}
```

## Application Hooks

```typescript
// Workspace Management
export const useWorkspace = () => {
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [widgets, setWidgets] = useState<WorkspaceWidget[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadWorkspace = useCallback(async (workspaceId?: string) => {
    setIsLoading(true);
    try {
      const workspaceData = await workspaceService.getWorkspace(workspaceId);
      setWorkspace(workspaceData);
      
      // Load widgets
      const widgetsData = await workspaceService.getWorkspaceWidgets(workspaceData.id);
      setWidgets(widgetsData);
      
      // Update last accessed
      await workspaceService.updateLastAccessed(workspaceData.id);
    } catch (error) {
      console.error('Failed to load workspace:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateWorkspacePreferences = useCallback(async (preferences: Partial<WorkspacePreferences>) => {
    if (!workspace) return;
    
    const updatedWorkspace = await workspaceService.updateWorkspacePreferences(workspace.id, preferences);
    setWorkspace(updatedWorkspace);
    
    // Apply theme changes immediately
    if (preferences.theme) {
      applyTheme(preferences.theme);
    }
    
    return updatedWorkspace;
  }, [workspace]);

  const addWidget = useCallback(async (widgetType: WidgetType, position?: WidgetPosition) => {
    if (!workspace) return;
    
    const widget = await workspaceService.addWidget(workspace.id, {
      type: widgetType,
      position: position || getDefaultPosition(widgetType),
      size: getDefaultSize(widgetType),
      configuration: getDefaultConfiguration(widgetType),
      isVisible: true,
      isMinimized: false
    });
    
    setWidgets(prev => [...prev, widget]);
    return widget;
  }, [workspace]);

  const updateWidget = useCallback(async (widgetId: string, updates: Partial<WorkspaceWidget>) => {
    const updatedWidget = await workspaceService.updateWidget(widgetId, updates);
    
    setWidgets(prev => prev.map(widget =>
      widget.id === widgetId
        ? { ...widget, ...updates }
        : widget
    ));
    
    return updatedWidget;
  }, []);

  return {
    workspace,
    widgets,
    isLoading,
    loadWorkspace,
    updateWorkspacePreferences,
    addWidget,
    updateWidget
  };
};

// Workspace Integration Management
export const useWorkspaceIntegrations = () => {
  const [integrations, setIntegrations] = useState<WorkspaceIntegration[]>([]);
  const [syncStatus, setSyncStatus] = useState<Record<string, SyncStatus>>({});

  const connectService = useCallback(async (service: IntegrationService, config: IntegrationConfig) => {
    const integration = await workspaceService.connectService(service, config);
    
    setIntegrations(prev => [...prev, integration]);
    
    // Start initial sync
    await startIntegrationSync(integration.id);
    
    return integration;
  }, []);

  const startIntegrationSync = useCallback(async (integrationId: string) => {
    setSyncStatus(prev => ({
      ...prev,
      [integrationId]: { status: 'syncing', progress: 0, lastSync: new Date() }
    }));
    
    try {
      const result = await workspaceService.syncIntegration(integrationId, (progress) => {
        setSyncStatus(prev => ({
          ...prev,
          [integrationId]: { ...prev[integrationId], progress }
        }));
      });
      
      setSyncStatus(prev => ({
        ...prev,
        [integrationId]: { 
          status: 'completed', 
          progress: 100, 
          lastSync: new Date(),
          itemsSynced: result.itemsSynced,
          errors: result.errors
        }
      }));
      
      // Update integration last sync time
      setIntegrations(prev => prev.map(integration =>
        integration.id === integrationId
          ? { ...integration, lastSync: new Date(), status: 'active' }
          : integration
      ));
      
    } catch (error) {
      setSyncStatus(prev => ({
        ...prev,
        [integrationId]: { 
          status: 'error', 
          progress: 0, 
          lastSync: new Date(),
          error: error.message
        }
      }));
    }
  }, []);

  const disconnectService = useCallback(async (integrationId: string) => {
    await workspaceService.disconnectService(integrationId);
    
    setIntegrations(prev => prev.filter(integration => integration.id !== integrationId));
    setSyncStatus(prev => {
      const newStatus = { ...prev };
      delete newStatus[integrationId];
      return newStatus;
    });
  }, []);

  return {
    integrations,
    syncStatus,
    connectService,
    startIntegrationSync,
    disconnectService
  };
};

// Workspace Collaboration
export const useWorkspaceCollaboration = () => {
  const [sharedUsers, setSharedUsers] = useState<SharedUser[]>([]);
  const [activeCollaborators, setActiveCollaborators] = useState<ActiveCollaborator[]>([]);
  const [activities, setActivities] = useState<WorkspaceActivity[]>([]);

  const inviteCollaborator = useCallback(async (email: string, permissions: Permission[]) => {
    const invitation = await workspaceService.inviteCollaborator(email, permissions);
    
    setSharedUsers(prev => [...prev, {
      id: invitation.id,
      email,
      permissions,
      status: 'invited',
      invitedAt: new Date()
    }]);
    
    return invitation;
  }, []);

  const updateCollaboratorPermissions = useCallback async (userId: string, permissions: Permission[]) => {
    await workspaceService.updateCollaboratorPermissions(userId, permissions);
    
    setSharedUsers(prev => prev.map(user =>
      user.id === userId
        ? { ...user, permissions }
        : user
    ));
  }, []);

  const trackActivity = useCallback((activity: Omit<WorkspaceActivity, 'id' | 'timestamp'>) => {
    const activityData = {
      ...activity,
      id: generateId(),
      timestamp: new Date()
    };
    
    setActivities(prev => [activityData, ...prev].slice(0, 100)); // Keep last 100 activities
    
    // Broadcast to collaborators
    broadcastActivity(activityData);
  }, []);

  const broadcastActivity = useCallback((activity: WorkspaceActivity) => {
    // Use WebSocket to broadcast to connected collaborators
    workspaceSocket.emit('activity', activity);
  }, []);

  useEffect(() => {
    // Listen for activities from other collaborators
    workspaceSocket.on('activity', (activity: WorkspaceActivity) => {
      if (activity.userId !== getCurrentUserId()) {
        setActivities(prev => [activity, ...prev].slice(0, 100));
      }
    });

    return () => {
      workspaceSocket.off('activity');
    };
  }, []);

  return {
    sharedUsers,
    activeCollaborators,
    activities,
    inviteCollaborator,
    updateCollaboratorPermissions,
    trackActivity,
    broadcastActivity
  };
};
```

## Component Architecture

### WorkspaceContainer

```typescript
interface WorkspaceContainerProps {
  workspaceId?: string;
  initialLayout?: LayoutMode;
}

export const WorkspaceContainer: React.FC<WorkspaceContainerProps> = ({
  workspaceId,
  initialLayout = 'grid'
}) => {
  const {
    workspace,
    widgets,
    isLoading,
    loadWorkspace,
    updateWorkspacePreferences,
    addWidget,
    updateWidget
  } = useWorkspace();

  const { integrations, syncStatus, connectService } = useWorkspaceIntegrations();
  const { sharedUsers, activeCollaborators, inviteCollaborator } = useWorkspaceCollaboration();

  const [layoutMode, setLayoutMode] = useState<LayoutMode>(initialLayout);
  const [selectedWidget, setSelectedWidget] = useState<WorkspaceWidget | null>(null);
  const [isCustomizing, setIsCustomizing] = useState(false);

  useEffect(() => {
    loadWorkspace(workspaceId);
  }, [loadWorkspace, workspaceId]);

  const handleWidgetDrop = useCallback((widget: WorkspaceWidget, position: WidgetPosition) => {
    updateWidget(widget.id, { position });
    trackActivity({
      userId: getCurrentUserId(),
      type: 'widget_moved',
      details: { widgetId: widget.id, newPosition: position }
    });
  }, [updateWidget]);

  const handleWidgetResize = useCallback((widget: WorkspaceWidget, size: WidgetSize) => {
    updateWidget(widget.id, { size });
  }, [updateWidget]);

  return (
    <WorkspaceContainer>
      <WorkspaceHeader>
        <HeaderLeft>
          <WorkspaceName>{workspace?.name || 'My Workspace'}</WorkspaceName>
          <WorkspaceType type={workspace?.type} />
        </HeaderLeft>
        
        <HeaderCenter>
          <NavigationTabs>
            <Tab isActive={true} onClick={() => navigateToWorkspace()}>Workspace</Tab>
            <Tab onClick={() => navigateToCalendar()}>Calendar</Tab>
            <Tab onClick={() => navigateToTasks()}>Tasks</Tab>
            <Tab onClick={() => navigateToNotes()}>Notes</Tab>
            <Tab onClick={() => navigateToFiles()}>Files</Tab>
          </NavigationTabs>
        </HeaderCenter>
        
        <HeaderRight>
          <CollaboratorsAvatars users={activeCollaborators} />
          <ShareButton onClick={() => setShowShareDialog(true)} />
          <LayoutToggle
            mode={layoutMode}
            onChange={setLayoutMode}
            options={[
              { value: 'grid', icon: ViewModuleIcon },
              { value: 'list', icon: ViewListIcon },
              { value: 'focus', icon: CenterFocusStrongIcon }
            ]}
          />
          <CustomizeButton
            isActive={isCustomizing}
            onClick={() => setIsCustomizing(!isCustomizing)}
          />
          <SettingsButton onClick={() => setShowSettings(true)} />
        </HeaderRight>
      </WorkspaceHeader>

      <WorkspaceContent>
        {layoutMode === 'focus' ? (
          <FocusModeView
            widgets={widgets.filter(w => w.isVisible)}
            selectedWidget={selectedWidget}
            onWidgetSelect={setSelectedWidget}
            onWidgetUpdate={updateWidget}
          />
        ) : layoutMode === 'list' ? (
          <ListModeView
            widgets={widgets.filter(w => w.isVisible)}
            onWidgetSelect={setSelectedWidget}
            onWidgetUpdate={updateWidget}
          />
        ) : (
          <GridModeView
            widgets={widgets.filter(w => w.isVisible)}
            onWidgetDrop={handleWidgetDrop}
            onWidgetResize={handleWidgetResize}
            onWidgetSelect={setSelectedWidget}
            onWidgetUpdate={updateWidget}
            isCustomizing={isCustomizing}
          />
        )}
      </WorkspaceContent>

      {isCustomizing && (
        <CustomizationPanel
          widgets={widgets}
          onWidgetAdd={addWidget}
          onWidgetRemove={(widgetId) => updateWidget(widgetId, { isVisible: false })}
          onWidgetUpdate={updateWidget}
        />
      )}

      {selectedWidget && (
        <WidgetConfigurationPanel
          widget={selectedWidget}
          onClose={() => setSelectedWidget(null)}
          onSave={(updates) => updateWidget(selectedWidget.id, updates)}
        />
      )}

      <SyncStatusIndicator
        integrations={integrations}
        syncStatus={syncStatus}
        onRetrySync={startIntegrationSync}
      />
    </WorkspaceContainer>
  );
};
```

### GridModeView

```typescript
interface GridModeViewProps {
  widgets: WorkspaceWidget[];
  onWidgetDrop: (widget: WorkspaceWidget, position: WidgetPosition) => void;
  onWidgetResize: (widget: WorkspaceWidget, size: WidgetSize) => void;
  onWidgetSelect: (widget: WorkspaceWidget) => void;
  onWidgetUpdate: (widget: WorkspaceWidget, updates: Partial<WorkspaceWidget>) => void;
  isCustomizing: boolean;
}

export const GridModeView: React.FC<GridModeViewProps> = ({
  widgets,
  onWidgetDrop,
  onWidgetResize,
  onWidgetSelect,
  onWidgetUpdate,
  isCustomizing
}) => {
  const [draggedWidget, setDraggedWidget] = useState<WorkspaceWidget | null>(null);
  const [resizingWidget, setResizingWidget] = useState<WorkspaceWidget | null>(null);
  const [gridLayout, setGridLayout] = useState<GridLayoutItem[]>([]);

  // Convert widgets to grid layout items
  useEffect(() => {
    const layoutItems = widgets.map(widget => ({
      i: widget.id,
      x: widget.position.x,
      y: widget.position.y,
      w: widget.size.width,
      h: widget.size.height,
      minW: getMinWidth(widget.type),
      minH: getMinHeight(widget.type),
      maxW: getMaxWidth(widget.type),
      maxH: getMaxHeight(widget.type)
    }));
    
    setGridLayout(layoutItems);
  }, [widgets]);

  const handleLayoutChange = useCallback((newLayout: GridLayoutItem[]) => {
    newLayout.forEach(item => {
      const widget = widgets.find(w => w.id === item.i);
      if (widget) {
        onWidgetUpdate(widget.id, {
          position: { x: item.x, y: item.y },
          size: { width: item.w, height: item.h }
        });
      }
    });
  }, [widgets, onWidgetUpdate]);

  const handleDragStart = useCallback((widget: WorkspaceWidget) => {
    setDraggedWidget(widget);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedWidget(null);
  }, []);

  const handleResizeStart = useCallback((widget: WorkspaceWidget) => {
    setResizingWidget(widget);
  }, []);

  const handleResizeEnd = useCallback(() => {
    setResizingWidget(null);
  }, []);

  return (
    <GridContainer>
      <ResponsiveGridLayout
        layouts={{ lg: gridLayout }}
        onLayoutChange={handleLayoutChange}
        isDraggable={isCustomizing}
        isResizable={isCustomizing}
        useCSSTransforms={true}
        preventCollision={true}
        autoSize={true}
        margin={[16, 16]}
        containerPadding={[16, 16]}
        rowHeight={60}
      >
        {widgets.map((widget) => (
          <GridItem key={widget.id} className="grid-item">
            <WidgetContainer
              widget={widget}
              isDragging={draggedWidget?.id === widget.id}
              isResizing={resizingWidget?.id === widget.id}
              isCustomizing={isCustomizing}
              onClick={() => !isCustomizing && onWidgetSelect(widget)}
              onDragStart={() => handleDragStart(widget)}
              onDragEnd={handleDragEnd}
              onResizeStart={() => handleResizeStart(widget)}
              onResizeEnd={handleResizeEnd}
            >
              <WidgetContent
                widget={widget}
                onUpdate={(updates) => onWidgetUpdate(widget.id, updates)}
              />
              
              {isCustomizing && (
                <WidgetControls>
                  <MinimizeButton
                    isMinimized={widget.isMinimized}
                    onClick={() => onWidgetUpdate(widget.id, { isMinimized: !widget.isMinimized })}
                  />
                  <RemoveButton
                    onClick={() => onWidgetUpdate(widget.id, { isVisible: false })}
                  />
                  <ConfigureButton
                    onClick={() => onWidgetSelect(widget)}
                  />
                </WidgetControls>
              )}
            </WidgetContainer>
          </GridItem>
        ))}
      </ResponsiveGridLayout>

      {isCustomizing && (
        <WidgetLibrary
          onWidgetAdd={(widgetType, position) => {
            const newWidget = {
              id: generateId(),
              type: widgetType,
              title: getDefaultTitle(widgetType),
              position: position || getDefaultPosition(widgetType),
              size: getDefaultSize(widgetType),
              configuration: getDefaultConfiguration(widgetType),
              isVisible: true,
              isMinimized: false
            };
            
            onWidgetUpdate(newWidget.id, newWidget);
          }}
        />
      )}
    </GridContainer>
  );
};
```

### WidgetContent

```typescript
interface WidgetContentProps {
  widget: WorkspaceWidget;
  onUpdate: (updates: Partial<WorkspaceWidget>) => void;
}

export const WidgetContent: React.FC<WidgetContentProps> = ({
  widget,
  onUpdate
}) => {
  const renderWidgetContent = useCallback(() => {
    switch (widget.type) {
      case 'calendar':
        return (
          <CalendarWidget
            configuration={widget.configuration}
            onUpdate={(config) => onUpdate({ configuration: config })}
          />
        );
      
      case 'task_list':
        return (
          <TaskListWidget
            configuration={widget.configuration}
            onUpdate={(config) => onUpdate({ configuration: config })}
          />
        );
      
      case 'notes':
        return (
          <NotesWidget
            configuration={widget.configuration}
            onUpdate={(config) => onUpdate({ configuration: config })}
          />
        );
      
      case 'files':
        return (
          <FilesWidget
            configuration={widget.configuration}
            onUpdate={(config) => onUpdate({ configuration: config })}
          />
        );
      
      case 'weather':
        return (
          <WeatherWidget
            configuration={widget.configuration}
            onUpdate={(config) => onUpdate({ configuration: config })}
          />
        );
      
      case 'clock':
        return (
          <ClockWidget
            configuration={widget.configuration}
            onUpdate={(config) => onUpdate({ configuration: config })}
          />
        );
      
      case 'quick_actions':
        return (
          <QuickActionsWidget
            configuration={widget.configuration}
            onUpdate={(config) => onUpdate({ configuration: config })}
          />
        );
      
      case 'statistics':
        return (
          <StatisticsWidget
            configuration={widget.configuration}
            onUpdate={(config) => onUpdate({ configuration: config })}
          />
        );
      
      case 'messages':
        return (
          <MessagesWidget
            configuration={widget.configuration}
            onUpdate={(config) => onUpdate({ configuration: config })}
          />
        );
      
      default:
        return <div>Unknown widget type</div>;
    }
  }, [widget.type, widget.configuration, onUpdate]);

  return (
    <WidgetContentContainer>
      <WidgetHeader>
        <WidgetTitle>{widget.title}</WidgetTitle>
        <WidgetMenu>
          <MenuItem onClick={() => refreshWidget(widget.id)}>
            <RefreshIcon />
            Refresh
          </MenuItem>
          <MenuItem onClick={() => duplicateWidget(widget)}>
            <ContentCopyIcon />
            Duplicate
          </MenuItem>
          <MenuItem onClick={() => exportWidget(widget)}>
            <DownloadIcon />
            Export
          </MenuItem>
        </WidgetMenu>
      </WidgetHeader>
      
      <WidgetBody>
        {renderWidgetContent()}
      </WidgetBody>
    </WidgetContentContainer>
  );
};
```

## Implementation Guidelines

### Widget Configuration

```typescript
export const widgetConfigurations: Record<WidgetType, WidgetConfiguration> = {
  calendar: {
    defaultSize: { width: 4, height: 3 },
    minSize: { width: 2, height: 2 },
    maxSize: { width: 8, height: 6 },
    defaultConfiguration: {
      view: 'month',
      showWeekends: true,
      startDayOfWeek: 0,
      defaultCalendarView: 'month',
      integrationIds: []
    }
  },
  
  task_list: {
    defaultSize: { width: 3, height: 4 },
    minSize: { width: 2, height: 2 },
    maxSize: { width: 6, height: 8 },
    defaultConfiguration: {
      view: 'list',
      groupBy: 'status',
      showCompleted: false,
      priority: 'all',
      dueDateRange: 'upcoming'
    }
  },
  
  notes: {
    defaultSize: { width: 3, height: 3 },
    minSize: { width: 2, height: 2 },
    maxSize: { width: 6, height: 6 },
    defaultConfiguration: {
      view: 'grid',
      sortBy: 'updatedAt',
      tags: [],
      searchQuery: ''
    }
  },
  
  files: {
    defaultSize: { width: 3, height: 4 },
    minSize: { width: 2, height: 2 },
    maxSize: { width: 6, height: 8 },
    defaultConfiguration: {
      view: 'list',
      sortBy: 'name',
      fileTypes: [],
      showHidden: false
    }
  }
};
```

### Workspace Integration

```typescript
export const workspaceIntegrations: Record<string, IntegrationConfiguration> = {
  google_workspace: {
    name: 'Google Workspace',
    services: ['calendar', 'drive', 'tasks', 'notes'],
    authMethod: 'oauth2',
    scopes: [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/tasks'
    ],
    syncFrequency: '5m'
  },
  
  microsoft_365: {
    name: 'Microsoft 365',
    services: ['calendar', 'onedrive', 'planner', 'onenote'],
    authMethod: 'oauth2',
    scopes: [
      'Calendars.ReadWrite',
      'Files.ReadWrite',
      'Tasks.ReadWrite'
    ],
    syncFrequency: '5m'
  },
  
  slack: {
    name: 'Slack',
    services: ['messages', 'files'],
    authMethod: 'oauth2',
    scopes: [
      'channels:read',
      'chat:read',
      'files:read'
    ],
    syncFrequency: '2m'
  }
};
```

## Features

### Unified Workspace
- Customizable widget-based interface
- Drag-and-drop layout management
- Multiple layout modes (grid, list, focus)
- Real-time widget updates and synchronization

### Integrated Productivity
- Calendar integration with major providers
- Task management with cross-platform sync
- Note-taking with rich text and attachments
- File management with cloud storage integration

### Collaboration Features
- Real-time collaboration indicators
- Workspace sharing and permissions
- Activity tracking and notifications
- Team workspace creation and management

### Cross-Platform Sync
- Integration with Google Workspace, Microsoft 365, and other services
- Bidirectional synchronization
- Conflict resolution and merge strategies
- Offline mode support with background sync

## Security Considerations

- End-to-end encryption for sensitive data
- Granular permission controls for shared workspaces
- Audit logging for all workspace activities
- Secure API key management for integrations

## Accessibility

- Screen reader support for all widgets and controls
- Keyboard navigation for workspace customization
- High contrast mode support
- Adjustable text sizes and contrast ratios