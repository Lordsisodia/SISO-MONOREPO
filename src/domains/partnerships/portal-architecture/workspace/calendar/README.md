# Calendar Management

Comprehensive calendar integration for scheduling, meeting management, and time coordination across partnership activities.

## Overview

The Calendar Management module provides a unified calendar experience that integrates with major calendar providers, supports scheduling across different time zones, and enables collaborative meeting management. This module helps partners manage their schedules, coordinate with team members and clients, and never miss important partnership-related events.

## Domain Types

```typescript
interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  allDay: boolean;
  timezone: string;
  location?: Location;
  attendees: Attendee[];
  organizer: Organizer;
  recurrence?: RecurrenceRule;
  reminders: EventReminder[];
  attachments: EventAttachment[];
  categories: EventCategory[];
  priority: EventPriority;
  status: EventStatus;
  visibility: EventVisibility;
  source: CalendarSource;
  externalId?: string;
  createdAt: Date;
  updatedAt: Date;
  metadata: EventMetadata;
}

interface Calendar {
  id: string;
  name: string;
  description?: string;
  color: string;
  timezone: string;
  source: CalendarSource;
  isDefault: boolean;
  isVisible: boolean;
  isWritable: boolean;
  shareSettings: CalendarShareSettings;
  syncSettings: SyncSettings;
  events: CalendarEvent[];
  createdAt: Date;
  updatedAt: Date;
}

interface Attendee {
  id: string;
  email: string;
  name?: string;
  responseStatus: ResponseStatus;
  isOrganizer: boolean;
  isOptional: boolean;
  comment?: string;
  respondedAt?: Date;
}

interface RecurrenceRule {
  frequency: RecurrenceFrequency;
  interval: number;
  count?: number;
  until?: Date;
  daysOfWeek?: DayOfWeek[];
  dayOfMonth?: number;
  weekOfMonth?: WeekOfMonth;
  exceptions: RecurrenceException[];
}

interface EventReminder {
  type: ReminderType;
  minutesBefore: number;
  isEnabled: boolean;
  message?: string;
}

enum EventStatus {
  TENTATIVE = 'tentative',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled'
}

enum ResponseStatus {
  NEEDS_ACTION = 'needsAction',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
  TENTATIVE = 'tentative'
}

enum RecurrenceFrequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly'
}
```

## Application Hooks

```typescript
// Calendar Management
export const useCalendar = () => {
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<CalendarViewMode>('month');
  const [isLoading, setIsLoading] = useState(false);

  const loadCalendars = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await calendarService.getCalendars();
      setCalendars(response.data);
    } catch (error) {
      console.error('Failed to load calendars:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadEvents = useCallback(async (startDate: Date, endDate: Date, calendarIds?: string[]) => {
    setIsLoading(true);
    try {
      const response = await calendarService.getEvents({
        startDate,
        endDate,
        calendarIds: calendarIds || calendars.filter(cal => cal.isVisible).map(cal => cal.id)
      });
      setEvents(response.data);
    } catch (error) {
      console.error('Failed to load events:', error);
    } finally {
      setIsLoading(false);
    }
  }, [calendars]);

  const createEvent = useCallback(async (eventData: CreateEventData): Promise<CalendarEvent> => {
    const event = await calendarService.createEvent(eventData);
    
    setEvents(prev => [...prev, event]);
    
    // Track event creation
    analytics.track('calendar_event_created', {
      event_id: event.id,
      calendar_id: event.source.calendarId,
      has_attendees: event.attendees.length > 0,
      is_recurring: !!event.recurrence,
      timestamp: new Date().toISOString()
    });
    
    return event;
  }, []);

  const updateEvent = useCallback(async (eventId: string, updates: Partial<CalendarEvent>) => {
    const updatedEvent = await calendarService.updateEvent(eventId, updates);
    
    setEvents(prev => prev.map(event =>
      event.id === eventId
        ? { ...event, ...updates, updatedAt: new Date() }
        : event
    ));
    
    return updatedEvent;
  }, []);

  return {
    calendars,
    events,
    selectedDate,
    viewMode,
    isLoading,
    loadCalendars,
    loadEvents,
    createEvent,
    updateEvent,
    setSelectedDate,
    setViewMode
  };
};

// Event Scheduling
export const useEventScheduling = () => {
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [suggestions, setSuggestions] = useState<SchedulingSuggestion[]>([]);
  const [isFindingSlots, setIsFindingSlots] = useState(false);

  const findAvailableSlots = useCallback(async (
    attendees: Attendee[],
    duration: number,
    preferredTimes: TimeRange[],
    dateRange: DateRange
  ) => {
    setIsFindingSlots(true);
    try {
      const response = await calendarService.findAvailableSlots({
        attendees: attendees.map(a => a.email),
        duration,
        preferredTimes,
        dateRange
      });
      
      setAvailableSlots(response.slots);
      setSuggestions(response.suggestions);
    } catch (error) {
      console.error('Failed to find available slots:', error);
    } finally {
      setIsFindingSlots(false);
    }
  }, []);

  const proposeTime = useCallback(async (eventId: string, timeSlots: TimeSlot[]) => {
    const proposal = await calendarService.proposeTime(eventId, timeSlots);
    
    // Update local state
    setEvents(prev => prev.map(event =>
      event.id === eventId
        ? { ...event, status: 'tentative', metadata: { ...event.metadata, proposal } }
        : event
    ));
    
    return proposal;
  }, []);

  const scheduleRecurringEvent = useCallback(async (eventData: CreateRecurringEventData) => {
    const events = await calendarService.createRecurringEvent(eventData);
    
    setEvents(prev => [...prev, ...events]);
    return events;
  }, []);

  return {
    availableSlots,
    suggestions,
    isFindingSlots,
    findAvailableSlots,
    proposeTime,
    scheduleRecurringEvent
  };
};

// Calendar Integration
export const useCalendarIntegration = () => {
  const [integrations, setIntegrations] = useState<CalendarIntegration[]>([]);
  const [syncStatus, setSyncStatus] = useState<Record<string, SyncStatus>>({});

  const connectCalendar = useCallback(async (provider: CalendarProvider, authData: AuthData) => {
    const integration = await calendarService.connectCalendar(provider, authData);
    
    setIntegrations(prev => [...prev, integration]);
    
    // Start initial sync
    await startCalendarSync(integration.id);
    
    return integration;
  }, []);

  const startCalendarSync = useCallback(async (integrationId: string) => {
    setSyncStatus(prev => ({
      ...prev,
      [integrationId]: { status: 'syncing', progress: 0, lastSync: new Date() }
    }));

    try {
      const result = await calendarService.syncCalendar(integrationId, (progress) => {
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
          eventsSynced: result.eventsSynced,
          conflictsResolved: result.conflictsResolved
        }
      }));

      // Refresh events after sync
      loadEvents(currentStartDate, currentEndDate);
      
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

  const resolveConflicts = useCallback(async (conflicts: CalendarConflict[]) => {
    const resolutions = await calendarService.resolveConflicts(conflicts);
    
    // Update events with resolutions
    resolutions.forEach(resolution => {
      if (resolution.action === 'update') {
        updateEvent(resolution.eventId, resolution.updates);
      } else if (resolution.action === 'delete') {
        setEvents(prev => prev.filter(event => event.id !== resolution.eventId));
      }
    });
    
    return resolutions;
  }, []);

  return {
    integrations,
    syncStatus,
    connectCalendar,
    startCalendarSync,
    resolveConflicts
  };
};
```

## Component Architecture

### CalendarContainer

```typescript
interface CalendarContainerProps {
  initialView?: CalendarViewMode;
  initialDate?: Date;
  calendarIds?: string[];
}

export const CalendarContainer: React.FC<CalendarContainerProps> = ({
  initialView = 'month',
  initialDate = new Date(),
  calendarIds
}) => {
  const {
    calendars,
    events,
    selectedDate,
    viewMode,
    isLoading,
    loadCalendars,
    loadEvents,
    createEvent,
    updateEvent,
    setSelectedDate,
    setViewMode
  } = useCalendar();

  const { availableSlots, findAvailableSlots, proposeTime } = useEventScheduling();

  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [selectedCalendars, setSelectedCalendars] = useState<string[]>(calendarIds || []);

  useEffect(() => {
    loadCalendars();
  }, [loadCalendars]);

  useEffect(() => {
    const dateRange = getDateRangeForView(selectedDate, viewMode);
    loadEvents(dateRange.start, dateRange.end, selectedCalendars);
  }, [loadEvents, selectedDate, viewMode, selectedCalendars]);

  const handleDateSelect = useCallback((date: Date) => {
    setSelectedDate(date);
    setShowEventForm(true);
  }, [setSelectedDate]);

  const handleEventClick = useCallback((event: CalendarEvent) => {
    setSelectedEvent(event);
  }, []);

  const handleEventCreate = useCallback(async (eventData: CreateEventData) => {
    const event = await createEvent({
      ...eventData,
      source: {
        provider: 'siso',
        calendarId: calendars.find(cal => cal.isDefault)?.id || calendars[0]?.id
      }
    });
    
    setShowEventForm(false);
    setSelectedEvent(event);
  }, [createEvent, calendars]);

  const handleEventUpdate = useCallback(async (eventId: string, updates: Partial<CalendarEvent>) => {
    await updateEvent(eventId, updates);
    
    if (selectedEvent?.id === eventId) {
      setSelectedEvent(prev => prev ? { ...prev, ...updates } : null);
    }
  }, [updateEvent, selectedEvent]);

  const visibleEvents = useMemo(() => {
    return events.filter(event => 
      selectedCalendars.length === 0 || 
      selectedCalendars.includes(event.source.calendarId)
    );
  }, [events, selectedCalendars]);

  return (
    <CalendarLayout>
      <CalendarHeader>
        <HeaderLeft>
          <CalendarNavigation
            currentDate={selectedDate}
            viewMode={viewMode}
            onNavigate={setSelectedDate}
            onViewChange={setViewMode}
          />
          <TodayButton onClick={() => setSelectedDate(new Date())} />
        </HeaderLeft>
        
        <HeaderCenter>
          <CurrentDateDisplay date={selectedDate} viewMode={viewMode} />
        </HeaderCenter>
        
        <HeaderRight>
          <CalendarSelector
            calendars={calendars}
            selectedCalendars={selectedCalendars}
            onSelectionChange={setSelectedCalendars}
          />
          <CreateEventButton onClick={() => setShowEventForm(true)} />
          <ViewModeToggle
            mode={viewMode}
            onChange={setViewMode}
            options={[
              { value: 'day', label: 'Day', icon: ViewDayIcon },
              { value: 'week', label: 'Week', icon: ViewWeekIcon },
              { value: 'month', label: 'Month', icon: ViewModuleIcon },
              { value: 'year', label: 'Year', icon: DateRangeIcon }
            ]}
          />
        </HeaderRight>
      </CalendarHeader>

      <CalendarContent>
        {viewMode === 'day' ? (
          <DayView
            date={selectedDate}
            events={visibleEvents}
            onDateSelect={handleDateSelect}
            onEventClick={handleEventClick}
            onEventCreate={handleEventCreate}
          />
        ) : viewMode === 'week' ? (
          <WeekView
            date={selectedDate}
            events={visibleEvents}
            onDateSelect={handleDateSelect}
            onEventClick={handleEventClick}
            onEventCreate={handleEventCreate}
          />
        ) : viewMode === 'year' ? (
          <YearView
            date={selectedDate}
            events={visibleEvents}
            onDateSelect={handleDateSelect}
            onEventClick={handleEventClick}
          />
        ) : (
          <MonthView
            date={selectedDate}
            events={visibleEvents}
            onDateSelect={handleDateSelect}
            onEventClick={handleEventClick}
            onEventCreate={handleEventCreate}
          />
        )}
      </CalendarContent>

      <CalendarSidebar>
        <MiniCalendar
          date={selectedDate}
          events={visibleEvents}
          onDateSelect={setSelectedDate}
        />
        
        <UpcomingEvents
          events={visibleEvents.filter(event => 
            event.startTime > new Date() && 
            event.startTime <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          )}
          onEventClick={handleEventClick}
        />
      </CalendarSidebar>

      {showEventForm && (
        <EventFormDialog
          selectedDate={selectedDate}
          calendars={calendars}
          onClose={() => setShowEventForm(false)}
          onSubmit={handleEventCreate}
        />
      )}

      {selectedEvent && (
        <EventDetailDialog
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onUpdate={handleEventUpdate}
          onDelete={(eventId) => handleEventDelete(eventId)}
        />
      )}
    </CalendarLayout>
  );
};
```

### MonthView

```typescript
interface MonthViewProps {
  date: Date;
  events: CalendarEvent[];
  onDateSelect: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
  onEventCreate?: (date: Date, eventData: Partial<CreateEventData>) => void;
}

export const MonthView: React.FC<MonthViewProps> = ({
  date,
  events,
  onDateSelect,
  onEventClick,
  onEventCreate
}) => {
  const [currentDate, setCurrentDate] = useState(date);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = useMemo(() => startOfMonth(currentDate), [currentDate]);
  const monthEnd = useMemo(() => endOfMonth(currentDate), [currentDate]);
  const calendarStart = useMemo(() => startOfWeek(monthStart), [monthStart]);
  const calendarEnd = useMemo(() => endOfWeek(monthEnd), [monthEnd]);

  const weeks = useMemo(() => {
    const weeks: Date[][] = [];
    let currentWeek: Date[] = [];
    let currentDate = new Date(calendarStart);

    while (currentDate <= calendarEnd) {
      currentWeek.push(new Date(currentDate));
      
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }
    
    return weeks;
  }, [calendarStart, calendarEnd]);

  const getEventsForDate = useCallback((date: Date): CalendarEvent[] => {
    return events.filter(event => {
      const eventStart = startOfDay(event.startTime);
      const eventEnd = endOfDay(event.endTime);
      const dateStart = startOfDay(date);
      const dateEnd = endOfDay(date);
      
      return (
        (eventStart <= dateEnd && eventEnd >= dateStart) ||
        isSameDay(event.startTime, date) ||
        isSameDay(event.endTime, date)
      );
    });
  }, [events]);

  const handleDateClick = useCallback((date: Date) => {
    setSelectedDate(date);
    onDateSelect(date);
  }, [onDateSelect]);

  const handleEventClick = useCallback((event: CalendarEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    onEventClick(event);
  }, [onEventClick]);

  const handleDateDoubleClick = useCallback((date: Date, e: React.MouseEvent) => {
    e.stopPropagation();
    onEventCreate?.(date, { startTime: date, endTime: addHours(date, 1) });
  }, [onEventCreate]);

  return (
    <MonthViewContainer>
      <MonthGrid>
        <WeekHeader>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <WeekdayHeader key={index}>{day}</WeekdayHeader>
          ))}
        </WeekHeader>
        
        {weeks.map((week, weekIndex) => (
          <WeekRow key={weekIndex}>
            {week.map((date, dateIndex) => {
              const dateEvents = getEventsForDate(date);
              const isCurrentMonth = date.getMonth() === currentDate.getMonth();
              const isToday = isSameDay(date, new Date());
              const isSelected = selectedDate && isSameDay(date, selectedDate);

              return (
                <DayCell
                  key={`${weekIndex}-${dateIndex}`}
                  isCurrentMonth={isCurrentMonth}
                  isToday={isToday}
                  isSelected={isSelected}
                  onClick={() => handleDateClick(date)}
                  onDoubleClick={(e) => handleDateDoubleClick(date, e)}
                >
                  <DayNumber>{date.getDate()}</DayNumber>
                  
                  <DayEvents>
                    {dateEvents.slice(0, 3).map((event, eventIndex) => (
                      <EventPill
                        key={event.id}
                        event={event}
                        onClick={(e) => handleEventClick(event, e)}
                        isLast={eventIndex === Math.min(dateEvents.length - 1, 2)}
                      />
                    ))}
                    
                    {dateEvents.length > 3 && (
                      <MoreEventsIndicator>
                        +{dateEvents.length - 3} more
                      </MoreEventsIndicator>
                    )}
                  </DayEvents>
                </DayCell>
              );
            })}
          </WeekRow>
        ))}
      </MonthGrid>
    </MonthViewContainer>
  );
};
```

### EventFormDialog

```typescript
interface EventFormDialogProps {
  selectedDate?: Date;
  event?: CalendarEvent;
  calendars: Calendar[];
  onClose: () => void;
  onSubmit: (eventData: CreateEventData) => void;
}

export const EventFormDialog: React.FC<EventFormDialogProps> = ({
  selectedDate = new Date(),
  event,
  calendars,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState<CreateEventData>({
    title: event?.title || '',
    description: event?.description || '',
    startTime: event?.startTime || selectedDate,
    endTime: event?.endTime || addHours(selectedDate, 1),
    allDay: event?.allDay || false,
    location: event?.location,
    attendees: event?.attendees || [],
    recurrence: event?.recurrence,
    reminders: event?.reminders || [
      { type: 'popup', minutesBefore: 15, isEnabled: true }
    ],
    categories: event?.categories || [],
    priority: event?.priority || 'normal',
    visibility: event?.visibility || 'default'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const validation = validateEventData(formData);
      if (!validation.isValid) {
        setErrors(validation.errors);
        return;
      }

      await onSubmit(formData);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, onSubmit, onClose]);

  const addAttendee = useCallback((attendee: Attendee) => {
    setFormData(prev => ({
      ...prev,
      attendees: [...prev.attendees, attendee]
    }));
  }, []);

  const removeAttendee = useCallback((email: string) => {
    setFormData(prev => ({
      ...prev,
      attendees: prev.attendees.filter(a => a.email !== email)
    }));
  }, []);

  const updateRecurrence = useCallback((recurrence: RecurrenceRule) => {
    setFormData(prev => ({
      ...prev,
      recurrence
    }));
  }, []);

  return (
    <EventFormDialogContainer open={true} onClose={onClose} maxWidth="md" fullWidth>
      <EventFormHeader>
        <EventFormTitle>{event ? 'Edit Event' : 'New Event'}</EventFormTitle>
        <CloseButton onClick={onClose} />
      </EventFormHeader>

      <EventFormContent>
        <EventBasicInfo>
          <TitleField
            value={formData.title}
            onChange={(title) => setFormData(prev => ({ ...prev, title }))}
            error={errors.title}
            placeholder="Add title"
            autoFocus
          />
          
          <DescriptionField
            value={formData.description}
            onChange={(description) => setFormData(prev => ({ ...prev, description }))}
            placeholder="Add description"
            multiline
            rows={3}
          />
        </EventBasicInfo>

        <EventTimeInfo>
          <AllDayToggle
            checked={formData.allDay}
            onChange={(allDay) => setFormData(prev => ({ ...prev, allDay }))}
          />
          
          <TimeFields>
            <StartTimePicker
              value={formData.startTime}
              onChange={(startTime) => setFormData(prev => ({ ...prev, startTime }))}
              disabled={formData.allDay}
            />
            
            <EndTimePicker
              value={formData.endTime}
              onChange={(endTime) => setFormData(prev => ({ ...prev, endTime }))}
              disabled={formData.allDay}
            />
          </TimeFields>
        </EventTimeInfo>

        <EventDetails>
          <LocationField
            value={formData.location?.name || ''}
            onChange={(locationName) => setFormData(prev => ({
              ...prev,
              location: { ...prev.location, name: locationName }
            }))}
            placeholder="Add location"
          />
          
          <CalendarSelector
            calendars={calendars}
            selectedCalendar={formData.source?.calendarId}
            onChange={(calendarId) => setFormData(prev => ({
              ...prev,
              source: { ...prev.source, calendarId }
            }))}
          />
          
          <PrioritySelector
            value={formData.priority}
            onChange={(priority) => setFormData(prev => ({ ...prev, priority }))}
          />
        </EventDetails>

        <AttendeesSection>
          <AttendeesHeader>
            <AttendeesTitle>Attendees</AttendeesTitle>
            <AddAttendeeButton onClick={() => setShowAttendeeSearch(true)} />
          </AttendeesHeader>
          
          <AttendeesList>
            {formData.attendees.map((attendee) => (
              <AttendeeItem
                key={attendee.email}
                attendee={attendee}
                onRemove={() => removeAttendee(attendee.email)}
              />
            ))}
          </AttendeesList>
        </AttendeesSection>

        <RecurrenceSection>
          <RecurrenceToggle
            checked={!!formData.recurrence}
            onChange={(enabled) => {
              if (enabled) {
                updateRecurrence({
                  frequency: 'weekly',
                  interval: 1,
                  exceptions: []
                });
              } else {
                updateRecurrence(undefined);
              }
            }}
          />
          
          {formData.recurrence && (
            <RecurrenceEditor
              recurrence={formData.recurrence}
              onChange={updateRecurrence}
              eventStartTime={formData.startTime}
            />
          )}
        </RecurrenceSection>

        <RemindersSection>
          <RemindersHeader>
            <RemindersTitle>Reminders</RemindersTitle>
            <AddReminderButton onClick={() => addReminder()} />
          </RemindersHeader>
          
          <RemindersList>
            {formData.reminders.map((reminder, index) => (
              <ReminderItem
                key={index}
                reminder={reminder}
                onChange={(updatedReminder) => updateReminder(index, updatedReminder)}
                onRemove={() => removeReminder(index)}
              />
            ))}
          </RemindersList>
        </RemindersSection>
      </EventFormContent>

      <EventFormActions>
        <CancelButton onClick={onClose}>Cancel</CancelButton>
        <SubmitButton
          onClick={handleSubmit}
          disabled={isSubmitting}
          variant="contained"
        >
          {isSubmitting ? 'Saving...' : (event ? 'Update' : 'Create')}
        </SubmitButton>
      </EventFormActions>
    </EventFormDialogContainer>
  );
};
```

## Implementation Guidelines

### Calendar Integration Configuration

```typescript
export const calendarProviders: Record<CalendarProvider, ProviderConfiguration> = {
  google: {
    name: 'Google Calendar',
    authUrl: 'https://accounts.google.com/oauth/authorize',
    scopes: [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events'
    ],
    apiBaseUrl: 'https://www.googleapis.com/calendar/v3',
    syncStrategy: 'incremental',
    maxEventsPerSync: 2500,
    rateLimit: {
      requestsPerSecond: 100,
      requestsPerDay: 10000
    }
  },
  
  microsoft: {
    name: 'Microsoft 365 Calendar',
    authUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    scopes: [
      'https://graph.microsoft.com/Calendars.ReadWrite',
      'https://graph.microsoft.com/Events.ReadWrite'
    ],
    apiBaseUrl: 'https://graph.microsoft.com/v1.0',
    syncStrategy: 'incremental',
    maxEventsPerSync: 1000,
    rateLimit: {
      requestsPerSecond: 10000,
      requestsPerDay: 100000
    }
  },
  
  apple: {
    name: 'Apple Calendar',
    authUrl: 'https://appleid.apple.com/auth/authorize',
    scopes: ['calendar.readwrite'],
    apiBaseUrl: 'https://api.icloud.com/ck/database',
    syncStrategy: 'full',
    maxEventsPerSync: 5000,
    rateLimit: {
      requestsPerSecond: 50,
      requestsPerDay: 1000
    }
  }
};
```

### Time Zone Management

```typescript
export const timezoneConfig: TimezoneConfiguration = {
  defaultTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  supportedTimezones: [
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Australia/Sydney'
  ],
  autoDetection: true,
  userPreferenceStorage: 'localStorage',
  businessHours: {
    start: '09:00',
    end: '17:00',
    days: [1, 2, 3, 4, 5], // Monday to Friday
    timezone: 'user'
  }
};
```

## Features

### Multi-Calendar Integration
- Support for Google Calendar, Microsoft 365, Apple Calendar
- Bidirectional synchronization with conflict resolution
- Calendar color coding and organization
- Offline support with background sync

### Advanced Scheduling
- Smart meeting time suggestions
- Attendee availability detection
- Recurring event management with exceptions
- Time zone-aware scheduling

### Event Management
- Rich event creation with categories and priorities
- Attendee management with response tracking
- Multiple reminder options (email, push, SMS)
- Event attachment and documentation support

### Collaboration Features
- Calendar sharing with granular permissions
- Team calendar creation and management
- Real-time collaboration indicators
- Meeting room and resource booking

## Security Considerations

- OAuth 2.0 authentication for calendar providers
- Encrypted storage of calendar data
- Permission-based access control
- Audit logging for calendar modifications

## Accessibility

- Screen reader support for calendar navigation
- Keyboard navigation for all calendar operations
- High contrast mode support
- Clear visual indicators for event types and statuses