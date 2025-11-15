# Tasks Notifications Tab

Task management notifications, deadline reminders, assignment alerts, and project collaboration updates.

## Overview

The Tasks Notifications tab provides centralized access to all task-related notifications including new assignments, deadline reminders, task updates, collaboration requests, and project milestone notifications. This helps partners stay organized and ensure timely completion of their responsibilities.

## Domain Types

```typescript
interface TaskNotification {
  id: string;
  type: TaskNotificationType;
  category: TaskCategory;
  priority: NotificationPriority;
  taskId: string;
  projectId?: string;
  title: string;
  description: string;
  assignee: TaskAssignee;
  creator?: TaskCreator;
  dueDate?: Date;
  status: TaskStatus;
  previousStatus?: TaskStatus;
  timestamp: Date;
  isRead: boolean;
  metadata: TaskNotificationMetadata;
  attachments?: TaskAttachment[];
  subtasks?: TaskSubtask[];
  dependencies?: TaskDependency[];
  estimatedTime?: number;
  actualTime?: number;
}

interface TaskAssignee {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  department: string;
  workload: number; // Percentage of capacity
  skills: string[];
}

interface TaskCreator {
  id: string;
  name: string;
  avatar?: string;
  role: string;
}

interface TaskNotificationMetadata {
  projectTitle?: string;
  taskList?: string;
  tags: string[];
  estimatedHours?: number;
  actualHours?: number;
  completionPercentage?: number;
  priority: TaskPriority;
  recurring?: RecurringPattern;
  watchers?: string[];
  comments?: number;
  lastActivity?: Date;
}

interface TaskSubtask {
  id: string;
  title: string;
  isCompleted: boolean;
  assignee?: string;
  dueDate?: Date;
}

interface TaskDependency {
  id: string;
  taskId: string;
  type: DependencyType;
  status: DependencyStatus;
}

enum TaskNotificationType {
  TASK_ASSIGNED = 'task_assigned',
  TASK_UPDATED = 'task_updated',
  TASK_COMPLETED = 'task_completed',
  TASK_OVERDUE = 'task_overdue',
  DEADLINE_REMINDER = 'deadline_reminder',
  SUBTASK_COMPLETED = 'subtask_completed',
  DEPENDENCY_READY = 'dependency_ready',
  COLLABORATION_REQUEST = 'collaboration_request',
  TASK_COMMENT = 'task_comment',
  TASK_MENTION = 'task_mention',
  PROJECT_DEADLINE = 'project_deadline'
}

enum TaskCategory {
  DEVELOPMENT = 'development',
  DESIGN = 'design',
  MARKETING = 'marketing',
  SALES = 'sales',
  SUPPORT = 'support',
  ADMINISTRATIVE = 'administrative',
  TRAINING = 'training',
  COMPLIANCE = 'compliance'
}

enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  IN_REVIEW = 'in_review',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  BLOCKED = 'blocked'
}
```

## Application Hooks

```typescript
// Task Notifications Management
export const useTaskNotifications = () => {
  const [taskNotifications, setTaskNotifications] = useState<TaskNotification[]>([]);
  const [taskGroups, setTaskGroups] = useState<Record<string, TaskNotification[]>>({});
  const [overdueCount, setOverdueCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [upcomingCount, setUpcomingCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const loadTaskNotifications = useCallback(async (filters?: TaskFilters) => {
    setIsLoading(true);
    try {
      const response = await tasksService.getTaskNotifications({
        includeRead: true,
        includeCompleted: false,
        limit: 50,
        filters,
        sortBy: 'dueDate',
        sortOrder: 'asc'
      });
      
      setTaskNotifications(response.data);
      
      // Group by project and status
      const grouped = response.data.reduce((acc: Record<string, TaskNotification[]>, notification) => {
        const groupKey = notification.projectId || 'uncategorized';
        if (!acc[groupKey]) {
          acc[groupKey] = [];
        }
        acc[groupKey].push(notification);
        return acc;
      }, {});
      
      setTaskGroups(grouped);
      
      // Calculate counts
      const now = new Date();
      const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      
      const overdue = response.data.filter(n => 
        n.dueDate && n.dueDate < now && n.status !== 'completed'
      ).length;
      
      const today = response.data.filter(n => 
        n.dueDate && 
        n.dueDate.toDateString() === now.toDateString() && 
        n.status !== 'completed'
      ).length;
      
      const upcoming = response.data.filter(n => 
        n.dueDate && 
        n.dueDate > now && 
        n.dueDate <= tomorrow && 
        n.status !== 'completed'
      ).length;
      
      setOverdueCount(overdue);
      setTodayCount(today);
      setUpcomingCount(upcoming);
    } catch (error) {
      console.error('Failed to load task notifications:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const markAsRead = useCallback(async (notificationId: string) => {
    await tasksService.markNotificationAsRead(notificationId);
    setTaskNotifications(prev => prev.map(notification =>
      notification.id === notificationId
        ? { ...notification, isRead: true }
        : notification
    ));
  }, []);

  const markAsCompleted = useCallback(async (taskId: string, notificationId: string) => {
    await tasksService.updateTaskStatus(taskId, 'completed');
    setTaskNotifications(prev => prev.map(notification =>
      notification.id === notificationId
        ? { ...notification, status: 'completed', isRead: true }
        : notification
    ));
  }, []);

  return {
    taskNotifications,
    taskGroups,
    overdueCount,
    todayCount,
    upcomingCount,
    isLoading,
    loadTaskNotifications,
    markAsRead,
    markAsCompleted
  };
};

// Task Deadlines and Reminders
export const useTaskDeadlines = () => {
  const [upcomingDeadlines, setUpcomingDeadlines] = useState<TaskNotification[]>([]);
  const [overdueTasks, setOverdueTasks] = useState<TaskNotification[]>([]);

  const checkDeadlines = useCallback(() => {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    
    // Get all notifications with due dates
    const allTasks = taskNotifications.filter(n => n.dueDate);
    
    // Categorize tasks by deadline
    const overdue = allTasks.filter(n => 
      n.dueDate! < now && n.status !== 'completed'
    );
    
    const dueSoon = allTasks.filter(n => 
      n.dueDate! >= now && 
      n.dueDate! <= tomorrow && 
      n.status !== 'completed'
    );
    
    setOverdueTasks(overdue);
    setUpcomingDeadlines(dueSoon);
  }, [taskNotifications]);

  // Check deadlines every hour
  useEffect(() => {
    const interval = setInterval(checkDeadlines, 60 * 60 * 1000);
    checkDeadlines(); // Initial check
    
    return () => clearInterval(interval);
  }, [checkDeadlines]);

  return { upcomingDeadlines, overdueTasks, checkDeadlines };
};

// Task Collaboration
export const useTaskCollaboration = () => {
  const [collaborationRequests, setCollaborationRequests] = useState<CollaborationRequest[]>([]);
  const [taskMentions, setTaskMentions] = useState<TaskMention[]>([]);

  const sendCollaborationRequest = useCallback(async (taskId: string, userId: string, message: string) => {
    await tasksService.sendCollaborationRequest(taskId, userId, message);
    // Refresh notifications
    loadTaskNotifications();
  }, [loadTaskNotifications]);

  const acceptCollaborationRequest = useCallback(async (requestId: string) => {
    await tasksService.acceptCollaborationRequest(requestId);
    setCollaborationRequests(prev => prev.filter(req => req.id !== requestId));
  }, []);

  const declineCollaborationRequest = useCallback(async (requestId: string) => {
    await tasksService.declineCollaborationRequest(requestId);
    setCollaborationRequests(prev => prev.filter(req => req.id !== requestId));
  }, []);

  return {
    collaborationRequests,
    taskMentions,
    sendCollaborationRequest,
    acceptCollaborationRequest,
    declineCollaborationRequest
  };
};
```

## Component Architecture

### TasksNotificationsContainer

```typescript
interface TasksNotificationsContainerProps {
  initialView?: 'list' | 'kanban' | 'calendar';
  initialFilters?: Partial<TaskFilters>;
}

export const TasksNotificationsContainer: React.FC<TasksNotificationsContainerProps> = ({
  initialView = 'list',
  initialFilters = {}
}) => {
  const {
    taskNotifications,
    taskGroups,
    overdueCount,
    todayCount,
    upcomingCount,
    isLoading,
    loadTaskNotifications,
    markAsRead,
    markAsCompleted
  } = useTaskNotifications();

  const { upcomingDeadlines, overdueTasks } = useTaskDeadlines();
  const { collaborationRequests, taskMentions } = useTaskCollaboration();

  const [viewMode, setViewMode] = useState<TaskViewMode>(initialView);
  const [filters, setFilters] = useState<TaskFilters>({ ...defaultFilters, ...initialFilters });
  const [showFilters, setShowFilters] = useState(false);

  const filteredNotifications = useMemo(() => {
    return taskNotifications.filter(notification => {
      if (filters.status !== 'all' && notification.status !== filters.status) {
        return false;
      }
      
      if (filters.category !== 'all' && notification.category !== filters.category) {
        return false;
      }
      
      if (filters.priority !== 'all' && notification.metadata.priority !== filters.priority) {
        return false;
      }
      
      if (filters.assignee !== 'all' && notification.assignee.id !== filters.assignee) {
        return false;
      }
      
      if (filters.hasDueDate && !notification.dueDate) {
        return false;
      }
      
      return true;
    });
  }, [taskNotifications, filters]);

  const totalUnread = taskNotifications.filter(n => !n.isRead).length;

  useEffect(() => {
    loadTaskNotifications();
  }, [loadTaskNotifications]);

  return (
    <TasksLayout>
      <TasksHeader>
        <HeaderLeft>
          <TasksTitle>Tasks</TasksTitle>
          {totalUnread > 0 && (
            <UnreadCountBadge count={totalUnread} />
          )}
        </HeaderLeft>
        
        <HeaderActions>
          <ViewModeToggle
            mode={viewMode}
            onChange={setViewMode}
            options={[
              { value: 'list', label: 'List', icon: ListIcon },
              { value: 'kanban', label: 'Board', icon: ViewKanbanIcon },
              { value: 'calendar', label: 'Calendar', icon: CalendarIcon }
            ]}
          />
          <FilterButton 
            onClick={() => setShowFilters(!showFilters)} 
            isActive={hasActiveFilters}
          />
          {totalUnread > 0 && (
            <MarkAllReadButton onClick={() => taskNotifications.forEach(n => markAsRead(n.id))}>
              Mark All Read
            </MarkAllReadButton>
          )}
        </HeaderActions>
      </TasksHeader>

      <TaskStatsBar>
        <StatItem type="overdue" count={overdueCount} icon={WarningIcon} color="#ef4444" />
        <StatItem type="today" count={todayCount} icon={TodayIcon} color="#f59e0b" />
        <StatItem type="upcoming" count={upcomingCount} icon={UpcomingIcon} color="#3b82f6" />
        <StatItem type="mentions" count={taskMentions.length} icon={AtIcon} color="#8b5cf6" />
      </TaskStatsBar>

      {showFilters && (
        <TaskFiltersPanel
          filters={filters}
          onFilterChange={setFilters}
          onClearFilters={() => setFilters(defaultFilters)}
        />
      )}

      <TasksContent>
        {collaborationRequests.length > 0 && (
          <CollaborationRequestsSection
            requests={collaborationRequests}
            onAccept={acceptCollaborationRequest}
            onDecline={declineCollaborationRequest}
          />
        )}

        {overdueTasks.length > 0 && (
          <OverdueTasksSection tasks={overdueTasks} />
        )}

        {isLoading && taskNotifications.length === 0 ? (
          <TasksLoader />
        ) : filteredNotifications.length === 0 ? (
          <EmptyTasksState hasFilters={hasActiveFilters} />
        ) : viewMode === 'kanban' ? (
          <TasksKanbanBoard
            notifications={filteredNotifications}
            onMarkAsRead={markAsRead}
            onStatusChange={markAsCompleted}
          />
        ) : viewMode === 'calendar' ? (
          <TasksCalendarView
            notifications={filteredNotifications}
            onTaskClick={handleTaskClick}
          />
        ) : (
          <TasksList
            notifications={filteredNotifications}
            onMarkAsRead={markAsRead}
            onStatusChange={markAsCompleted}
          />
        )}
      </TasksContent>
    </TasksLayout>
  );
};
```

### TaskNotificationCard

```typescript
interface TaskNotificationCardProps {
  notification: TaskNotification;
  onMarkAsRead: (id: string) => void;
  onStatusChange?: (taskId: string, newStatus: TaskStatus) => void;
  showProjectInfo?: boolean;
}

export const TaskNotificationCard: React.FC<TaskNotificationCardProps> = ({
  notification,
  onMarkAsRead,
  onStatusChange,
  showProjectInfo = true
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleMarkAsRead = useCallback(async () => {
    await onMarkAsRead(notification.id);
  }, [notification.id, onMarkAsRead]);

  const handleStatusChange = useCallback(async (newStatus: TaskStatus) => {
    setIsUpdating(true);
    try {
      await onStatusChange?.(notification.taskId, newStatus);
    } finally {
      setIsUpdating(false);
    }
  }, [notification.taskId, onStatusChange]);

  const getDueDateStatus = useCallback((dueDate: Date): DueDateStatus => {
    const now = new Date();
    const daysUntilDue = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (dueDate < now) return 'overdue';
    if (daysUntilDue === 0) return 'today';
    if (daysUntilDue <= 3) return 'soon';
    return 'future';
  }, []);

  const dueDateStatus = notification.dueDate ? getDueDateStatus(notification.dueDate) : null;

  return (
    <TaskCardContainer isRead={notification.isRead} priority={notification.priority}>
      <TaskCardHeader onClick={() => setIsExpanded(!isExpanded)}>
        <TaskLeft>
          <TaskStatusIcon status={notification.status} />
          
          <TaskContent>
            <TaskTitle isRead={notification.isRead}>
              {notification.title}
              {dueDateStatus === 'overdue' && <OverdueBadge />}
              {dueDateStatus === 'today' && <DueTodayBadge />}
            </TaskTitle>
            
            <TaskDescription isRead={notification.isRead}>
              {notification.description}
            </TaskDescription>
            
            <TaskMetadata>
              {showProjectInfo && notification.metadata.projectTitle && (
                <ProjectTag title={notification.metadata.projectTitle} />
              )}
              <AssigneeInfo assignee={notification.assignee} />
              <PriorityBadge priority={notification.metadata.priority} />
              <Timestamp timestamp={notification.timestamp} />
            </TaskMetadata>
          </TaskContent>
        </TaskLeft>

        <TaskRight>
          {!notification.isRead && (
            <UnreadIndicator />
          )}
          {notification.dueDate && (
            <DueDateIndicator date={notification.dueDate} status={dueDateStatus} />
          )}
          <TaskActions>
            <ActionButton onClick={() => navigateToTask(notification.taskId)}>
              View Task
            </ActionButton>
            {!notification.isRead && (
              <ActionButton onClick={handleMarkAsRead} variant="text">
                Mark Read
              </ActionButton>
            )}
          </TaskActions>
          <ExpandButton isExpanded={isExpanded} />
        </TaskRight>
      </TaskCardHeader>

      {isExpanded && (
        <TaskExpandedContent>
          {notification.creator && (
            <TaskCreator creator={notification.creator} />
          )}
          
          {notification.dueDate && (
            <TaskDeadline dueDate={notification.dueDate} estimatedTime={notification.metadata.estimatedHours} />
          )}
          
          {notification.subtasks && notification.subtasks.length > 0 && (
            <SubtasksList subtasks={notification.subtasks} />
          )}
          
          {notification.attachments && notification.attachments.length > 0 && (
            <TaskAttachments attachments={notification.attachments} />
          )}
          
          <TaskProgress
            percentage={notification.metadata.completionPercentage || 0}
            estimatedHours={notification.metadata.estimatedHours}
            actualHours={notification.metadata.actualHours}
          />
          
          <TaskQuickActions
            status={notification.status}
            onStatusChange={handleStatusChange}
            isUpdating={isUpdating}
          />
        </TaskExpandedContent>
      )}
    </TaskCardContainer>
  );
};
```

### TasksKanbanBoard

```typescript
interface TasksKanbanBoardProps {
  notifications: TaskNotification[];
  onMarkAsRead: (id: string) => void;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
}

export const TasksKanbanBoard: React.FC<TasksKanbanBoardProps> = ({
  notifications,
  onMarkAsRead,
  onStatusChange
}) => {
  const [columns, setColumns] = useState<TaskColumn[]>([
    { id: 'todo', title: 'To Do', status: 'todo' },
    { id: 'in_progress', title: 'In Progress', status: 'in_progress' },
    { id: 'in_review', title: 'In Review', status: 'in_review' },
    { id: 'completed', title: 'Completed', status: 'completed' }
  ]);

  // Group notifications by status
  const tasksByStatus = useMemo(() => {
    return notifications.reduce((acc: Record<TaskStatus, TaskNotification[]>, notification) => {
      if (!acc[notification.status]) {
        acc[notification.status] = [];
      }
      acc[notification.status].push(notification);
      return acc;
    }, {} as Record<TaskStatus, TaskNotification[]>);
  }, [notifications]);

  const handleDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;

    const sourceStatus = columns.find(col => col.id === result.source.droppableId)?.status;
    const destinationStatus = columns.find(col => col.id === result.destination.droppableId)?.status;

    if (sourceStatus && destinationStatus && sourceStatus !== destinationStatus) {
      const task = tasksByStatus[sourceStatus]?.[result.source.index];
      if (task) {
        onStatusChange(task.taskId, destinationStatus);
      }
    }
  }, [columns, tasksByStatus, onStatusChange]);

  return (
    <KanbanContainer>
      <DragDropContext onDragEnd={handleDragEnd}>
        <KanbanColumns>
          {columns.map((column) => {
            const columnTasks = tasksByStatus[column.status] || [];
            
            return (
              <KanbanColumn key={column.id}>
                <ColumnHeader>
                  <ColumnTitle>{column.title}</ColumnTitle>
                  <ColumnCount count={columnTasks.length} />
                </ColumnHeader>
                
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <ColumnTasks
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      isDraggingOver={snapshot.isDraggingOver}
                    >
                      {columnTasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <KanbanTaskCard
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              isDragging={snapshot.isDragging}
                            >
                              <TaskNotificationCard
                                notification={task}
                                onMarkAsRead={onMarkAsRead}
                                onStatusChange={onStatusChange}
                                showProjectInfo={false}
                              />
                            </KanbanTaskCard>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ColumnTasks>
                  )}
                </Droppable>
              </KanbanColumn>
            );
          })}
        </KanbanColumns>
      </DragDropContext>
    </KanbanContainer>
  );
};
```

## Implementation Guidelines

### Task Prioritization

```typescript
export const useTaskPrioritization = () => {
  const calculateTaskPriority = useCallback((notification: TaskNotification): number => {
    let score = 0;
    
    // Due date urgency
    if (notification.dueDate) {
      const now = new Date();
      const daysUntilDue = Math.ceil((notification.dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysUntilDue < 0) score += 100; // Overdue
      else if (daysUntilDue === 0) score += 80; // Due today
      else if (daysUntilDue <= 3) score += 60; // Due soon
      else if (daysUntilDue <= 7) score += 40; // Due this week
    }
    
    // Task priority
    const priorityScores = {
      'urgent': 50,
      'high': 35,
      'medium': 20,
      'low': 10
    };
    
    score += priorityScores[notification.metadata.priority] || 0;
    
    // Task status weight
    const statusWeights = {
      'todo': 20,
      'in_progress': 15,
      'in_review': 10,
      'blocked': 40 // Blocked tasks get higher priority
    };
    
    score += statusWeights[notification.status] || 0;
    
    // Dependencies (tasks blocking others get higher priority)
    if (notification.dependencies && notification.dependencies.length > 0) {
      score += notification.dependencies.length * 5;
    }
    
    // Workload consideration
    if (notification.assignee.workload > 80) {
      score += 15; // Higher priority for overloaded assignees
    }
    
    return score;
  }, []);

  const sortTasks = useCallback((tasks: TaskNotification[]): TaskNotification[] => {
    return [...tasks].sort((a, b) => {
      const priorityA = calculateTaskPriority(a);
      const priorityB = calculateTaskPriority(b);
      
      if (priorityA !== priorityB) {
        return priorityB - priorityA;
      }
      
      // Sort by due date if priorities are equal
      if (a.dueDate && b.dueDate) {
        return a.dueDate.getTime() - b.dueDate.getTime();
      }
      
      return b.timestamp.getTime() - a.timestamp.getTime();
    });
  }, [calculateTaskPriority]);

  return { calculateTaskPriority, sortTasks };
};
```

### Deadline Management

```typescript
export const useDeadlineManagement = () => {
  const scheduleReminders = useCallback((notifications: TaskNotification[]) => {
    const now = new Date();
    
    notifications.forEach(notification => {
      if (!notification.dueDate) return;
      
      const dueDate = notification.dueDate;
      const timeUntilDue = dueDate.getTime() - now.getTime();
      
      // Schedule reminders at different intervals
      const reminderIntervals = [
        { hours: 24, message: 'Task due tomorrow' },
        { hours: 2, message: 'Task due in 2 hours' },
        { hours: 0.5, message: 'Task due in 30 minutes' }
      ];
      
      reminderIntervals.forEach(({ hours, message }) => {
        const reminderTime = timeUntilDue - (hours * 60 * 60 * 1000);
        
        if (reminderTime > 0 && reminderTime < 24 * 60 * 60 * 1000) {
          setTimeout(() => {
            showToast({
              title: 'Task Deadline Reminder',
              message: `${message}: ${notification.title}`,
              type: 'warning',
              duration: 5000,
              action: {
                label: 'View Task',
                onClick: () => navigateToTask(notification.taskId)
              }
            });
          }, reminderTime);
        }
      });
    });
  }, []);

  return { scheduleReminders };
};
```

## Features

### Comprehensive Task Management
- Multiple task views (list, kanban, calendar)
- Status tracking and updates
- Subtask management
- Dependency tracking

### Smart Notifications
- Deadline reminders and alerts
- Overdue task notifications
- Assignment notifications
- Collaboration requests

### Team Collaboration
- Task assignment and reassignment
- Real-time status updates
- Comments and mentions
- File attachments

### Analytics and Reporting
- Task completion tracking
- Workload distribution
- Performance metrics
- Project progress visualization

## Security Considerations

- Task access control based on project membership
- Audit trail for task modifications
- Secure file handling for attachments
- Permission-based task visibility

## Accessibility

- Screen reader support for task information
- Keyboard navigation for task actions
- High contrast mode support
- Clear visual indicators for task status and priority