# Notifications Tabs

Organized notification management with categorized access to different types of updates and communications.

## Overview

The Notifications Tabs system provides organized access to different types of notifications through an intuitive tabbed interface. This system allows partners to easily filter and access specific types of updates based on their preferences and priorities.

## Domain Types

```typescript
interface NotificationTab {
  id: string;
  label: string;
  icon: ComponentType<SvgIconProps>;
  badge?: number;
  isActive: boolean;
  notifications: Notification[];
  filters: NotificationFilter[];
  pagination: PaginationState;
}

interface NotificationFilter {
  type: 'priority' | 'status' | 'date' | 'source';
  value: string;
  label: string;
  isActive: boolean;
}

interface TabConfiguration {
  tabs: NotificationTab[];
  defaultTab: string;
  unreadCounts: Record<string, number>;
  customFilters: NotificationFilter[];
}
```

## Application Hooks

```typescript
// Tab Management
export const useNotificationTabs = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [tabs, setTabs] = useState<NotificationTab[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const switchTab = useCallback((tabId: string) => {
    setActiveTab(tabId);
    // Update URL and load tab-specific notifications
  }, []);

  const updateTabBadge = useCallback((tabId: string, count: number) => {
    setTabs(prev => prev.map(tab => 
      tab.id === tabId ? { ...tab, badge: count } : tab
    ));
  }, []);

  return { activeTab, tabs, switchTab, updateTabBadge, isLoading };
};

// Filter Management
export const useNotificationFilters = (tabId: string) => {
  const [filters, setFilters] = useState<NotificationFilter[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const applyFilter = useCallback((filterId: string) => {
    setActiveFilters(prev => [...prev, filterId]);
  }, []);

  const removeFilter = useCallback((filterId: string) => {
    setActiveFilters(prev => prev.filter(id => id !== filterId));
  }, []);

  return { filters, activeFilters, applyFilter, removeFilter };
};

// Tab-specific Notifications
export const useTabNotifications = (tabId: string, filters: string[] = []) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    totalPages: 1,
    hasMore: true
  });

  const loadNotifications = useCallback(async (page: number = 1) => {
    // API call to fetch tab-specific notifications
    const response = await notificationService.getTabNotifications(tabId, {
      page,
      filters,
      limit: 20
    });
    
    setNotifications(prev => page === 1 ? response.data : [...prev, ...response.data]);
    setPagination(response.pagination);
  }, [tabId, filters]);

  return { notifications, pagination, loadNotifications };
};
```

## Component Architecture

### NotificationsTabsLayout

```typescript
interface NotificationsTabsLayoutProps {
  children: React.ReactNode;
  initialTab?: string;
  configuration: TabConfiguration;
}

export const NotificationsTabsLayout: React.FC<NotificationsTabsLayoutProps> = ({
  children,
  initialTab = 'all',
  configuration
}) => {
  const { activeTab, tabs, switchTab } = useNotificationTabs();
  const { tabNotifications, isLoading, loadMore } = useTabNotifications(activeTab);
  const { markAsRead, markAllAsRead } = useNotificationActions();

  return (
    <LayoutBox display="flex" flexDirection="column" height="100%">
      {/* Tab Navigation */}
      <TabNavigationContainer>
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            isActive={tab.id === activeTab}
            badge={tab.badge}
            onClick={() => switchTab(tab.id)}
          >
            <TabIcon component={tab.icon} />
            <TabLabel>{tab.label}</TabLabel>
          </TabButton>
        ))}
      </TabNavigationContainer>

      {/* Tab Content */}
      <TabContentContainer>
        <TabActions>
          <MarkAllReadButton onClick={() => markAllAsRead(activeTab)}>
            Mark All as Read
          </MarkAllReadButton>
          <FilterButton />
        </TabActions>
        
        {isLoading ? (
          <TabContentLoader />
        ) : (
          <>
            {children}
            <NotificationList
              notifications={tabNotifications}
              onMarkAsRead={markAsRead}
              onLoadMore={loadMore}
            />
          </>
        )}
      </TabContentContainer>
    </LayoutBox>
  );
};
```

### TabButton

```typescript
interface TabButtonProps {
  isActive: boolean;
  badge?: number;
  icon: ComponentType<SvgIconProps>;
  label: string;
  onClick: () => void;
}

export const TabButton: React.FC<TabButtonProps> = ({
  isActive,
  badge,
  icon: Icon,
  label,
  onClick
}) => {
  return (
    <StyledTabButton
      isActive={isActive}
      onClick={onClick}
      aria-selected={isActive}
      role="tab"
    >
      <IconContainer>
        <Icon color={isActive ? '#f6b75e' : '#6b7280'} />
      </IconContainer>
      
      <TabTypography isActive={isActive}>
        {label}
      </TabTypography>
      
      {badge && badge > 0 && (
        <BadgeContainer>
          <Badge count={badge} color="#f6b75e" />
        </BadgeContainer>
      )}
    </StyledTabButton>
  );
};
```

### NotificationFiltersPanel

```typescript
interface NotificationFiltersPanelProps {
  tabId: string;
  filters: NotificationFilter[];
  onFilterChange: (filters: string[]) => void;
}

export const NotificationFiltersPanel: React.FC<NotificationFiltersPanelProps> = ({
  tabId,
  filters,
  onFilterChange
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleFilterToggle = useCallback((filterId: string) => {
    const newFilters = selectedFilters.includes(filterId)
      ? selectedFilters.filter(id => id !== filterId)
      : [...selectedFilters, filterId];
    
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  }, [selectedFilters, onFilterChange]);

  return (
    <FiltersContainer>
      <FiltersHeader onClick={() => setIsExpanded(!isExpanded)}>
        <FilterIcon />
        <FiltersText>Filters</FiltersText>
        <ExpandIcon isExpanded={isExpanded} />
      </FiltersHeader>
      
      {isExpanded && (
        <FiltersContent>
          {filters.map((filter) => (
            <FilterChip
              key={filter.id}
              isActive={selectedFilters.includes(filter.id)}
              onClick={() => handleFilterToggle(filter.id)}
            >
              {filter.label}
            </FilterChip>
          ))}
        </FiltersContent>
      )}
    </FiltersContainer>
  );
};
```

## Implementation Guidelines

### Tab Configuration

```typescript
export const notificationTabConfig: TabConfiguration = {
  defaultTab: 'all',
  tabs: [
    {
      id: 'all',
      label: 'All',
      icon: NotificationsIcon,
      filters: []
    },
    {
      id: 'updates',
      label: 'Updates',
      icon: UpdateIcon,
      filters: ['type:system', 'type:announcement']
    },
    {
      id: 'chats',
      label: 'Chats',
      icon: ChatIcon,
      filters: ['type:message', 'type:chat']
    },
    {
      id: 'deals',
      label: 'Deals',
      icon: BusinessIcon,
      filters: ['type:deal', 'type:commission']
    },
    {
      id: 'tasks',
      label: 'Tasks',
      icon: AssignmentIcon,
      filters: ['type:task', 'type:reminder']
    }
  ]
};
```

### Analytics Integration

```typescript
export const useTabAnalytics = () => {
  const trackTabSwitch = useCallback((fromTab: string, toTab: string) => {
    analytics.track('notification_tab_switch', {
      from_tab: fromTab,
      to_tab: toTab,
      timestamp: new Date().toISOString()
    });
  }, []);

  const trackFilterUsage = useCallback((tabId: string, filterId: string) => {
    analytics.track('notification_filter_applied', {
      tab_id: tabId,
      filter_id: filterId,
      timestamp: new Date().toISOString()
    });
  }, []);

  const trackNotificationAction = useCallback((action: string, notificationId: string) => {
    analytics.track('notification_action', {
      action,
      notification_id: notificationId,
      timestamp: new Date().toISOString()
    });
  }, []);

  return { trackTabSwitch, trackFilterUsage, trackNotificationAction };
};
```

### Mobile Optimization

```typescript
export const useMobileTabBehavior = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [swipeEnabled, setSwipeEnabled] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSwipeGesture = useCallback((direction: 'left' | 'right') => {
    if (!swipeEnabled || !isMobile) return;
    
    // Implement tab switching based on swipe direction
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    
    if (direction === 'left' && currentIndex < tabs.length - 1) {
      switchTab(tabs[currentIndex + 1].id);
    } else if (direction === 'right' && currentIndex > 0) {
      switchTab(tabs[currentIndex - 1].id);
    }
  }, [isMobile, swipeEnabled, activeTab, tabs, switchTab]);

  return { isMobile, handleSwipeGesture, setSwipeEnabled };
};
```

## Features

### Smart Tab Switching
- URL-based tab navigation
- Smooth transitions between tabs
- Preservation of scroll position
- Loading states during tab switches

### Advanced Filtering
- Multi-select filter options
- Persistent filter preferences
- Real-time filter application
- Filter count indicators

### Badge Management
- Real-time badge updates
- Cumulative count calculation
- Zero-state handling
- Accessibility support

### Performance Optimization
- Lazy loading of tab content
- Infinite scroll implementation
- Caching of tab data
- Optimized re-rendering

## Security Considerations

- Input sanitization for filter values
- XSS protection in tab content
- CSRF protection for tab actions
- Rate limiting on tab switches

## Accessibility

- ARIA attributes for tab navigation
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support