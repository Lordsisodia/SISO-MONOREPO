# All Notifications Tab

Comprehensive view of all notifications across the partnership platform with advanced filtering and management capabilities.

## Overview

The All Notifications tab provides a centralized view of all notifications, messages, updates, and alerts for partners. This serves as the primary notification hub where users can view, manage, and take action on all their platform communications in one unified interface.

## Domain Types

```typescript
interface AllNotification {
  id: string;
  type: NotificationType;
  category: NotificationCategory;
  priority: NotificationPriority;
  title: string;
  message: string;
  sender?: NotificationSender;
  timestamp: Date;
  isRead: boolean;
  metadata: NotificationMetadata;
  actions?: NotificationAction[];
  attachments?: NotificationAttachment[];
}

interface NotificationSender {
  id: string;
  name: string;
  avatar?: string;
  type: 'system' | 'partner' | 'admin' | 'client';
  role?: string;
}

interface NotificationMetadata {
  source: string;
  referenceId?: string;
  referenceType?: string;
  tags: string[];
  expiresAt?: Date;
  requiresAction: boolean;
}

enum NotificationType {
  SYSTEM_UPDATE = 'system_update',
  MESSAGE = 'message',
  DEAL_UPDATE = 'deal_update',
  COMMISSION_EARNED = 'commission_earned',
  TASK_ASSIGNED = 'task_assigned',
  ACHIEVEMENT_UNLOCKED = 'achievement_unlocked',
  REMINDER = 'reminder',
  ALERT = 'alert'
}

enum NotificationCategory {
  COMMUNICATIONS = 'communications',
  BUSINESS = 'business',
  FINANCIAL = 'financial',
  SYSTEM = 'system',
  SOCIAL = 'social',
  TASKS = 'tasks'
}
```

## Application Hooks

```typescript
// All Notifications Management
export const useAllNotifications = () => {
  const [notifications, setNotifications] = useState<AllNotification[]>([]);
  const [filters, setFilters] = useState<NotificationFilter[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [isLoading, setIsLoading] = useState(false);

  const loadNotifications = useCallback(async (options: NotificationLoadOptions = {}) => {
    setIsLoading(true);
    try {
      const response = await notificationService.getAllNotifications({
        page: options.page || 1,
        limit: options.limit || 50,
        filters: options.filters || filters,
        sort: options.sort || sortOrder,
        includeRead: options.includeRead ?? true
      });
      
      if (options.page === 1) {
        setNotifications(response.data);
      } else {
        setNotifications(prev => [...prev, ...response.data]);
      }
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setIsLoading(false);
    }
  }, [filters, sortOrder]);

  const markAsRead = useCallback(async (notificationId: string) => {
    await notificationService.markAsRead(notificationId);
    setNotifications(prev => prev.map(notification =>
      notification.id === notificationId
        ? { ...notification, isRead: true }
        : notification
    ));
  }, []);

  const markAllAsRead = useCallback(async () => {
    await notificationService.markAllAsRead();
    setNotifications(prev => prev.map(notification => ({ ...notification, isRead: true })));
  }, []);

  return {
    notifications,
    filters,
    sortOrder,
    isLoading,
    loadNotifications,
    markAsRead,
    markAllAsRead,
    setFilters,
    setSortOrder
  };
};

// Real-time Updates
export const useNotificationRealTime = () => {
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const socket = useWebSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on('new_notification', (notification: AllNotification) => {
      setNotifications(prev => [notification, ...prev]);
      setNewNotificationCount(prev => prev + 1);
      
      // Show toast notification for high-priority items
      if (notification.priority === 'high' || notification.priority === 'urgent') {
        showToast({
          title: notification.title,
          message: notification.message,
          type: 'info',
          duration: 5000
        });
      }
    });

    socket.on('notification_updated', (updatedNotification: AllNotification) => {
      setNotifications(prev => prev.map(notification =>
        notification.id === updatedNotification.id
          ? updatedNotification
          : notification
      ));
    });

    return () => {
      socket.off('new_notification');
      socket.off('notification_updated');
    };
  }, [socket]);

  return { newNotificationCount };
};

// Advanced Filtering
export const useAdvancedFilters = () => {
  const [availableFilters, setAvailableFilters] = useState<AdvancedFilter[]>([]);
  const [activeFilters, setActiveFilters] = useState<FilterState>({});
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);

  const loadAvailableFilters = useCallback(async () => {
    const filters = await notificationService.getAvailableFilters();
    setAvailableFilters(filters);
  }, []);

  const applyFilter = useCallback((filterKey: string, value: any) => {
    setActiveFilters(prev => ({ ...prev, [filterKey]: value }));
  }, []);

  const clearFilter = useCallback((filterKey: string) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[filterKey];
      return newFilters;
    });
  }, []);

  const saveCurrentFilters = useCallback(async (name: string) => {
    const savedFilter: SavedFilter = {
      id: generateId(),
      name,
      filters: activeFilters,
      createdAt: new Date(),
      isDefault: false
    };
    
    await notificationService.saveFilter(savedFilter);
    setSavedFilters(prev => [...prev, savedFilter]);
  }, [activeFilters]);

  return {
    availableFilters,
    activeFilters,
    savedFilters,
    applyFilter,
    clearFilter,
    saveCurrentFilters,
    loadAvailableFilters
  };
};
```

## Component Architecture

### AllNotificationsContainer

```typescript
interface AllNotificationsContainerProps {
  initialFilters?: FilterState;
  initialSortOrder?: SortOrder;
}

export const AllNotificationsContainer: React.FC<AllNotificationsContainerProps> = ({
  initialFilters = {},
  initialSortOrder = 'desc'
}) => {
  const {
    notifications,
    filters,
    sortOrder,
    isLoading,
    loadNotifications,
    markAsRead,
    markAllAsRead,
    setFilters,
    setSortOrder
  } = useAllNotifications();

  const { newNotificationCount } = useNotificationRealTime();
  const {
    availableFilters,
    activeFilters,
    savedFilters,
    applyFilter,
    clearFilter,
    saveCurrentFilters
  } = useAdvancedFilters();

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
    loadNotifications({ page: 1, filters: Object.values(newFilters) });
  }, [setFilters, loadNotifications]);

  const handleSortChange = useCallback((newSortOrder: SortOrder) => {
    setSortOrder(newSortOrder);
    loadNotifications({ page: 1, sort: newSortOrder });
  }, [setSortOrder, loadNotifications]);

  return (
    <AllNotificationsLayout>
      <NotificationHeader>
        <HeaderLeft>
          <NotificationTitle>All Notifications</NotificationTitle>
          {newNotificationCount > 0 && (
            <NewNotificationsBadge count={newNotificationCount} />
          )}
        </HeaderLeft>
        
        <HeaderActions>
          <MarkAllReadButton onClick={markAllAsRead}>
            Mark All as Read
          </MarkAllReadButton>
          <FilterMenuButton availableFilters={availableFilters} />
          <SortMenuButton sortOrder={sortOrder} onSortChange={handleSortChange} />
        </HeaderActions>
      </NotificationHeader>

      <AdvancedFiltersBar
        availableFilters={availableFilters}
        activeFilters={activeFilters}
        onFilterApply={applyFilter}
        onFilterClear={clearFilter}
        savedFilters={savedFilters}
        onSaveFilters={saveCurrentFilters}
      />

      <NotificationContent>
        {isLoading && notifications.length === 0 ? (
          <NotificationLoader />
        ) : notifications.length === 0 ? (
          <EmptyNotificationsState />
        ) : (
          <NotificationList
            notifications={notifications}
            onMarkAsRead={markAsRead}
            onLoadMore={() => loadNotifications({ page: 'next' })}
            hasMore={hasMore}
          />
        )}
      </NotificationContent>
    </AllNotificationsLayout>
  );
};
```

### NotificationListItem

```typescript
interface NotificationListItemProps {
  notification: AllNotification;
  onMarkAsRead: (id: string) => void;
  onActionClick?: (action: NotificationAction, notification: AllNotification) => void;
}

export const NotificationListItem: React.FC<NotificationListItemProps> = ({
  notification,
  onMarkAsRead,
  onActionClick
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleItemClick = useCallback(() => {
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
    setIsExpanded(!isExpanded);
  }, [notification.isRead, onMarkAsRead, isExpanded]);

  const handleActionClick = useCallback((action: NotificationAction) => {
    onActionClick?.(action, notification);
  }, [onActionClick, notification]);

  return (
    <NotificationItemContainer isRead={notification.isRead}>
      <NotificationHeader onClick={handleItemClick}>
        <NotificationLeft>
          <NotificationIcon type={notification.type} priority={notification.priority} />
          
          <NotificationContent>
            <NotificationTitle isRead={notification.isRead}>
              {notification.title}
            </NotificationTitle>
            
            <NotificationMessage isRead={notification.isRead}>
              {notification.message}
            </NotificationMessage>
            
            <NotificationMetadata>
              <SenderInfo sender={notification.sender} />
              <Timestamp timestamp={notification.timestamp} />
              {notification.requiresAction && (
                <ActionRequiredBadge />
              )}
            </NotificationMetadata>
          </NotificationContent>
        </NotificationLeft>

        <NotificationRight>
          {!notification.isRead && (
            <UnreadIndicator />
          )}
          <ExpandButton isExpanded={isExpanded} />
        </NotificationRight>
      </NotificationHeader>

      {isExpanded && (
        <NotificationExpandedContent>
          {notification.attachments && notification.attachments.length > 0 && (
            <NotificationAttachments attachments={notification.attachments} />
          )}
          
          {notification.actions && notification.actions.length > 0 && (
            <NotificationActions>
              {notification.actions.map((action) => (
                <ActionButton
                  key={action.id}
                  action={action}
                  onClick={() => handleActionClick(action)}
                />
              ))}
            </NotificationActions>
          )}
          
          <NotificationDetails metadata={notification.metadata} />
        </NotificationExpandedContent>
      )}
    </NotificationItemContainer>
  );
};
```

### AdvancedFiltersBar

```typescript
interface AdvancedFiltersBarProps {
  availableFilters: AdvancedFilter[];
  activeFilters: FilterState;
  onFilterApply: (key: string, value: any) => void;
  onFilterClear: (key: string) => void;
  savedFilters: SavedFilter[];
  onSaveFilters: (name: string) => void;
}

export const AdvancedFiltersBar: React.FC<AdvancedFiltersBarProps> = ({
  availableFilters,
  activeFilters,
  onFilterApply,
  onFilterClear,
  savedFilters,
  onSaveFilters
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const activeFilterCount = Object.keys(activeFilters).length;

  return (
    <FiltersBarContainer>
      <FiltersBarHeader>
        <FiltersToggle onClick={() => setShowFilters(!showFilters)}>
          <FilterIcon />
          <FiltersText>Filters</FiltersText>
          {activeFilterCount > 0 && (
            <FilterCountBadge count={activeFilterCount} />
          )}
          <ExpandIcon isExpanded={showFilters} />
        </FiltersToggle>

        {activeFilterCount > 0 && (
          <ClearFiltersButton onClick={() => Object.keys(activeFilters).forEach(onFilterClear)}>
            Clear All
          </ClearFiltersButton>
        )}
      </FiltersBarHeader>

      {showFilters && (
        <FiltersContent>
          {availableFilters.map((filter) => (
            <FilterControl
              key={filter.key}
              filter={filter}
              value={activeFilters[filter.key]}
              onChange={(value) => onFilterApply(filter.key, value)}
            />
          ))}
          
          <FilterActions>
            <SaveFilterButton onClick={() => setShowSaveDialog(true)}>
              Save Current Filters
            </SaveFilterButton>
            
            {savedFilters.length > 0 && (
              <SavedFiltersDropdown>
                {savedFilters.map((savedFilter) => (
                  <SavedFilterItem
                    key={savedFilter.id}
                    savedFilter={savedFilter}
                    onApply={() => Object.entries(savedFilter.filters).forEach(onFilterApply)}
                  />
                ))}
              </SavedFiltersDropdown>
            )}
          </FilterActions>
        </FiltersContent>
      )}

      {showSaveDialog && (
        <SaveFilterDialog
          onSave={onSaveFilters}
          onClose={() => setShowSaveDialog(false)}
        />
      )}
    </FiltersBarContainer>
  );
};
```

## Implementation Guidelines

### Performance Optimization

```typescript
// Virtual scrolling for large lists
export const useVirtualizedNotifications = () => {
  const [virtualItems, setVirtualItems] = useState<VirtualItem[]>([]);
  
  const calculateVisibleItems = useCallback((
    items: AllNotification[],
    containerHeight: number,
    itemHeight: number,
    scrollTop: number
  ) => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 1,
      items.length
    );

    return items.slice(startIndex, endIndex).map((item, index) => ({
      item,
      index: startIndex + index,
      top: (startIndex + index) * itemHeight,
      height: itemHeight
    }));
  }, []);

  return { virtualItems, calculateVisibleItems };
};

// Infinite scroll optimization
export const useInfiniteScroll = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoading) return;

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });

    if (node) {
      observerRef.current.observe(node);
    }
  }, [isLoading, hasMore]);

  return { lastElementRef, isLoading, hasMore };
};
```

### Analytics Integration

```typescript
export const useAllNotificationsAnalytics = () => {
  const trackNotificationInteraction = useCallback((
    action: string,
    notification: AllNotification,
    context?: any
  ) => {
    analytics.track('notification_interaction', {
      action,
      notification_id: notification.id,
      notification_type: notification.type,
      notification_category: notification.category,
      notification_priority: notification.priority,
      sender_type: notification.sender?.type,
      context,
      timestamp: new Date().toISOString()
    });
  }, []);

  const trackFilterUsage = useCallback((filters: FilterState) => {
    analytics.track('notification_filters_applied', {
      filter_count: Object.keys(filters).length,
      filter_types: Object.keys(filters),
      timestamp: new Date().toISOString()
    });
  }, []);

  const trackSearchUsage = useCallback((searchQuery: string, resultCount: number) => {
    analytics.track('notification_search', {
      query: searchQuery,
      result_count: resultCount,
      timestamp: new Date().toISOString()
    });
  }, []);

  return { trackNotificationInteraction, trackFilterUsage, trackSearchUsage };
};
```

## Features

### Unified Notification View
- All notification types in one interface
- Chronological and priority-based sorting
- Advanced filtering and search capabilities
- Batch operations for multiple notifications

### Real-time Updates
- Live notification updates
- New notification indicators
- Real-time count updates
- WebSocket-based synchronization

### Rich Notification Content
- Multimedia attachments support
- Interactive notification actions
- Expanded view with full details
- Contextual information display

### Performance Optimization
- Virtual scrolling for large lists
- Infinite scroll implementation
- Efficient caching strategies
- Optimized re-rendering

## Security Considerations

- Input sanitization for search queries
- XSS protection in notification content
- CSRF protection for notification actions
- Rate limiting on notification operations

## Accessibility

- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Focus management for dynamic content