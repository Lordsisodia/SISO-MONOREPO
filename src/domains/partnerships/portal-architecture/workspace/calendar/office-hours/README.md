# Office Hours Calendar Management

## Overview
The Office Hours Calendar Management system provides a structured platform for scheduling and managing one-on-one and group office hour sessions within the SISO partnership portal. This module enables partners to book dedicated time with experts, mentors, and support staff for personalized guidance, strategy sessions, and problem-solving consultations.

## Architecture

### Directory Structure
```
calendar/office-hours/
├── components/
│   ├── OfficeHoursScheduler.tsx
│   ├── AvailableSlots.tsx
│   ├── BookingForm.tsx
│   ├── UpcomingSessions.tsx
│   ├── SessionDetails.tsx
│   ├── ExpertProfile.tsx
│   └── SessionHistory.tsx
├── hooks/
│   ├── useOfficeHours.ts
│   ├── useBooking.ts
│   ├── useExpertAvailability.ts
│   └── useSessionManagement.ts
├── services/
│   ├── officeHoursService.ts
│   ├── bookingService.ts
│   ├── expertService.ts
│   └── calendarService.ts
├── types/
│   ├── office-hours.types.ts
│   └── booking.types.ts
└── utils/
    ├── timeUtils.ts
    └── calendarUtils.ts
```

### Core Components

#### OfficeHoursScheduler Component
```typescript
interface OfficeHoursSchedulerProps {
  expertId: string;
  isExpertView: boolean;
  onSaveSchedule: (schedule: ExpertSchedule) => void;
  className?: string;
}

export const OfficeHoursScheduler: React.FC<OfficeHoursSchedulerProps> = ({
  expertId,
  isExpertView,
  onSaveSchedule,
  className
}) => {
  const [schedule, setSchedule] = useState<ExpertSchedule>({
    id: '',
    expertId,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    weeklySchedule: {},
    exceptions: [],
    bookingSettings: {
      minBookingDuration: 30,
      maxBookingDuration: 60,
      minAdvanceNotice: 24,
      maxAdvanceNotice: 30,
      allowGroupSessions: false,
      maxGroupSize: 1,
      autoConfirm: false,
      requireApproval: false
    },
    bufferTime: {
      before: 15,
      after: 15
    }
  });

  const [selectedWeek, setSelectedWeek] = useState(0);
  const [viewMode, setViewMode] = useState<'weekly' | 'daily'>('weekly');

  const { expert, loading } = useExpertAvailability(expertId);

  const handleWeeklyScheduleChange = useCallback((
    dayOfWeek: number, 
    slots: TimeSlot[]
  ) => {
    setSchedule(prev => ({
      ...prev,
      weeklySchedule: {
        ...prev.weeklySchedule,
        [dayOfWeek]: slots
      }
    }));
  }, []);

  const addException = useCallback((exception: ScheduleException) => {
    setSchedule(prev => ({
      ...prev,
      exceptions: [...prev.exceptions, exception]
    }));
  }, []);

  const removeException = useCallback((exceptionId: string) => {
    setSchedule(prev => ({
      ...prev,
      exceptions: prev.exceptions.filter(e => e.id !== exceptionId)
    }));
  }, []);

  const updateBookingSettings = useCallback((settings: BookingSettings) => {
    setSchedule(prev => ({
      ...prev,
      bookingSettings: {
        ...prev.bookingSettings,
        ...settings
      }
    }));
  }, []);

  const handleSave = useCallback(async () => {
    try {
      const savedSchedule = await officeHoursService.saveSchedule(schedule);
      onSaveSchedule(savedSchedule);
    } catch (error) {
      console.error('Failed to save schedule:', error);
    }
  }, [schedule, onSaveSchedule]);

  const generateWeeklyTemplate = useCallback(() => {
    const defaultWeeklySchedule: Record<number, TimeSlot[]> = {};
    
    // Monday - Friday, 9 AM - 5 PM with 1-hour lunch break
    for (let day = 1; day <= 5; day++) {
      defaultWeeklySchedule[day] = [
        { start: '09:00', end: '12:00' },
        { start: '13:00', end: '17:00' }
      ];
    }
    
    setSchedule(prev => ({
      ...prev,
      weeklySchedule: defaultWeeklySchedule
    }));
  }, []);

  return (
    <Card className={cn('office-hours-scheduler', className)}>
      <CardHeader>
        <div className="scheduler-header">
          <div className="header-info">
            <CardTitle>Office Hours Schedule</CardTitle>
            <CardDescription>
              Configure your availability for office hour sessions
            </CardDescription>
          </div>
          
          <div className="header-actions">
            <Button variant="outline" onClick={generateWeeklyTemplate}>
              <Calendar className="w-4 h-4 mr-2" />
              Generate Template
            </Button>
            
            <ToggleGroup
              type="single"
              value={viewMode}
              onValueChange={(value) => setViewMode(value as 'weekly' | 'daily')}
            >
              <ToggleGroupItem value="weekly" aria-label="Weekly view">
                <Calendar className="w-4 h-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="daily" aria-label="Daily view">
                <Clock className="w-4 h-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Timezone Settings */}
        <div className="timezone-section">
          <Label htmlFor="timezone">Timezone</Label>
          <TimezoneSelect
            value={schedule.timezone}
            onChange={(timezone) => setSchedule(prev => ({ ...prev, timezone }))}
          />
          <p className="text-sm text-muted-foreground">
            All times will be displayed in {schedule.timezone}
          </p>
        </div>

        {/* Weekly Schedule */}
        {viewMode === 'weekly' ? (
          <WeeklyScheduleView
            weeklySchedule={schedule.weeklySchedule}
            timezone={schedule.timezone}
            onScheduleChange={handleWeeklyScheduleChange}
          />
        ) : (
          <DailyScheduleView
            weeklySchedule={schedule.weeklySchedule}
            timezone={schedule.timezone}
            selectedWeek={selectedWeek}
            onScheduleChange={handleWeeklyScheduleChange}
          />
        )}

        {/* Booking Settings */}
        <div className="booking-settings">
          <h3 className="section-title">Booking Settings</h3>
          
          <div className="settings-grid">
            <div className="form-field">
              <Label htmlFor="minDuration">Minimum Booking Duration</Label>
              <Select
                value={schedule.bookingSettings.minBookingDuration.toString()}
                onValueChange={(value) => updateBookingSettings({
                  minBookingDuration: parseInt(value)
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="form-field">
              <Label htmlFor="maxDuration">Maximum Booking Duration</Label>
              <Select
                value={schedule.bookingSettings.maxBookingDuration.toString()}
                onValueChange={(value) => updateBookingSettings({
                  maxBookingDuration: parseInt(value)
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="form-field">
              <Label htmlFor="minNotice">Minimum Advance Notice (hours)</Label>
              <Input
                id="minNotice"
                type="number"
                value={schedule.bookingSettings.minAdvanceNotice}
                onChange={(e) => updateBookingSettings({
                  minAdvanceNotice: parseInt(e.target.value) || 0
                })}
                min="0"
                max="168"
              />
            </div>

            <div className="form-field">
              <Label htmlFor="maxNotice">Maximum Advance Notice (days)</Label>
              <Input
                id="maxNotice"
                type="number"
                value={schedule.bookingSettings.maxAdvanceNotice}
                onChange={(e) => updateBookingSettings({
                  maxAdvanceNotice: parseInt(e.target.value) || 1
                })}
                min="1"
                max="365"
              />
            </div>
          </div>

          <div className="booking-options">
            <div className="option-item">
              <Switch
                checked={schedule.bookingSettings.allowGroupSessions}
                onCheckedChange={(allowGroupSessions) => 
                  updateBookingSettings({ allowGroupSessions })
                }
              />
              <div className="option-info">
                <Label>Allow Group Sessions</Label>
                <p className="option-description">
                  Enable multiple participants to book the same time slot
                </p>
              </div>
            </div>

            {schedule.bookingSettings.allowGroupSessions && (
              <div className="form-field">
                <Label htmlFor="maxGroupSize">Maximum Group Size</Label>
                <Input
                  id="maxGroupSize"
                  type="number"
                  value={schedule.bookingSettings.maxGroupSize}
                  onChange={(e) => updateBookingSettings({
                    maxGroupSize: parseInt(e.target.value) || 1
                  })}
                  min="2"
                  max="10"
                />
              </div>
            )}

            <div className="option-item">
              <Switch
                checked={schedule.bookingSettings.autoConfirm}
                onCheckedChange={(autoConfirm) => 
                  updateBookingSettings({ autoConfirm })
                }
              />
              <div className="option-info">
                <Label>Auto-confirm Bookings</Label>
                <p className="option-description">
                  Automatically confirm booking requests without approval
                </p>
              </div>
            </div>

            <div className="option-item">
              <Switch
                checked={schedule.bookingSettings.requireApproval}
                onCheckedChange={(requireApproval) => 
                  updateBookingSettings({ requireApproval })
                }
              />
              <div className="option-info">
                <Label>Require Approval</Label>
                <p className="option-description">
                  Manually approve all booking requests
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Buffer Time */}
        <div className="buffer-settings">
          <h3 className="section-title">Buffer Time</h3>
          <p className="section-description">
            Add buffer time before and after appointments to prepare and wrap up
          </p>
          
          <div className="buffer-controls">
            <div className="form-field">
              <Label htmlFor="bufferBefore">Before Session (minutes)</Label>
              <Input
                id="bufferBefore"
                type="number"
                value={schedule.bufferTime.before}
                onChange={(e) => setSchedule(prev => ({
                  ...prev,
                  bufferTime: {
                    ...prev.bufferTime,
                    before: parseInt(e.target.value) || 0
                  }
                }))}
                min="0"
                max="60"
              />
            </div>

            <div className="form-field">
              <Label htmlFor="bufferAfter">After Session (minutes)</Label>
              <Input
                id="bufferAfter"
                type="number"
                value={schedule.bufferTime.after}
                onChange={(e) => setSchedule(prev => ({
                  ...prev,
                  bufferTime: {
                    ...prev.bufferTime,
                    after: parseInt(e.target.value) || 0
                  }
                }))}
                min="0"
                max="60"
              />
            </div>
          </div>
        </div>

        {/* Schedule Exceptions */}
        <div className="schedule-exceptions">
          <div className="section-header">
            <h3 className="section-title">Schedule Exceptions</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addException({
                id: generateId(),
                date: new Date(),
                type: 'unavailable',
                reason: '',
                recurring: false
              })}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Exception
            </Button>
          </div>
          
          <div className="exceptions-list">
            {schedule.exceptions.map((exception) => (
              <ScheduleExceptionEditor
                key={exception.id}
                exception={exception}
                onUpdate={(updatedException) => {
                  setSchedule(prev => ({
                    ...prev,
                    exceptions: prev.exceptions.map(e =>
                      e.id === exception.id ? updatedException : e
                    )
                  }));
                }}
                onRemove={() => removeException(exception.id)}
              />
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button onClick={handleSave} disabled={loading}>
          <Save className="w-4 h-4 mr-2" />
          Save Schedule
        </Button>
      </CardFooter>
    </Card>
  );
};
```

#### AvailableSlots Component
```typescript
interface AvailableSlotsProps {
  expertId: string;
  selectedDate: Date;
  onSlotSelect: (slot: TimeSlot, duration: number) => void;
  loading?: boolean;
  className?: string;
}

export const AvailableSlots: React.FC<AvailableSlotsProps> = ({
  expertId,
  selectedDate,
  onSlotSelect,
  loading,
  className
}) => {
  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([]);
  const [selectedDuration, setSelectedDuration] = useState(30);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loadingSlots, setLoadingSlots] = useState(true);

  const { expertSchedule } = useExpertAvailability(expertId);
  const { existingBookings } = useBooking(expertId, selectedDate);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (!expertSchedule) return;
      
      try {
        setLoadingSlots(true);
        const slots = await officeHoursService.getAvailableSlots({
          expertId,
          date: selectedDate,
          duration: selectedDuration,
          schedule: expertSchedule,
          existingBookings
        });
        
        setAvailableSlots(slots);
      } catch (error) {
        console.error('Failed to fetch available slots:', error);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchAvailableSlots();
  }, [expertId, selectedDate, selectedDuration, expertSchedule, existingBookings]);

  const handleDurationChange = useCallback((duration: number) => {
    setSelectedDuration(duration);
  }, []);

  const handleSlotClick = useCallback((slot: AvailableSlot) => {
    onSlotSelect(slot.timeSlot, selectedDuration);
  }, [onSlotSelect, selectedDuration]);

  if (loadingSlots || loading) {
    return (
      <Card className={cn('available-slots loading', className)}>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="ml-2">Loading available slots...</span>
        </CardContent>
      </Card>
    );
  }

  if (availableSlots.length === 0) {
    return (
      <Card className={cn('available-slots empty', className)}>
        <CardContent className="text-center py-8">
          <CalendarX className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Available Slots</h3>
          <p className="text-muted-foreground mb-4">
            There are no available time slots for {formatDate(selectedDate)}.
            Try selecting a different date or duration.
          </p>
          <Button variant="outline" onClick={() => setSelectedDuration(30)}>
            Try 30-minute sessions
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('available-slots', className)}>
      <CardHeader>
        <div className="slots-header">
          <div className="header-info">
            <CardTitle className="text-lg">
              Available Slots for {formatDate(selectedDate)}
            </CardTitle>
            <CardDescription>
              {availableSlots.length} slots available
            </CardDescription>
          </div>
          
          <div className="header-controls">
            <div className="duration-selector">
              <Label htmlFor="duration">Session Duration:</Label>
              <Select
                value={selectedDuration.toString()}
                onValueChange={(value) => handleDurationChange(parseInt(value))}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 min</SelectItem>
                  <SelectItem value="30">30 min</SelectItem>
                  <SelectItem value="45">45 min</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <ToggleGroup
              type="single"
              value={viewMode}
              onValueChange={(value) => setViewMode(value as 'grid' | 'list')}
            >
              <ToggleGroupItem value="grid" aria-label="Grid view">
                <Grid className="w-4 h-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="list" aria-label="List view">
                <List className="w-4 h-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {viewMode === 'grid' ? (
          <div className="slots-grid">
            {availableSlots.map((slot, index) => (
              <Button
                key={index}
                variant="outline"
                className="slot-button"
                onClick={() => handleSlotClick(slot)}
              >
                <Clock className="w-4 h-4 mr-2" />
                {formatTime(slot.timeSlot.start)} - {formatTime(slot.timeSlot.end)}
              </Button>
            ))}
          </div>
        ) : (
          <div className="slots-list">
            {availableSlots.map((slot, index) => (
              <div
                key={index}
                className="slot-item"
                onClick={() => handleSlotClick(slot)}
              >
                <div className="slot-time">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="time-range">
                    {formatTime(slot.timeSlot.start)} - {formatTime(slot.timeSlot.end)}
                  </span>
                </div>
                
                <div className="slot-details">
                  <span className="duration">{selectedDuration} minutes</span>
                  {slot.isBuffered && (
                    <Badge variant="secondary" className="ml-2">
                      Buffer included
                    </Badge>
                  )}
                </div>
                
                <Button size="sm">
                  Select
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
```

## Domain Types

### Office Hours Types
```typescript
export interface ExpertSchedule {
  id: string;
  expertId: string;
  timezone: string;
  weeklySchedule: Record<number, TimeSlot[]>;
  exceptions: ScheduleException[];
  bookingSettings: BookingSettings;
  bufferTime: BufferTime;
  createdAt: Date;
  updatedAt: Date;
}

export interface TimeSlot {
  start: string; // HH:mm format
  end: string; // HH:mm format
}

export interface AvailableSlot {
  timeSlot: TimeSlot;
  isBuffered: boolean;
  quality: 'excellent' | 'good' | 'fair';
  confidence: number;
}

export interface ScheduleException {
  id: string;
  date: Date;
  type: 'unavailable' | 'custom-hours' | 'recurring';
  customSlots?: TimeSlot[];
  reason?: string;
  recurring?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    endDate?: Date;
  };
}

export interface BookingSettings {
  minBookingDuration: number;
  maxBookingDuration: number;
  minAdvanceNotice: number;
  maxAdvanceNotice: number;
  allowGroupSessions: boolean;
  maxGroupSize: number;
  autoConfirm: boolean;
  requireApproval: boolean;
}

export interface BufferTime {
  before: number;
  after: number;
}

export interface OfficeHoursBooking {
  id: string;
  expertId: string;
  participantId: string;
  participantInfo: ParticipantInfo;
  timeSlot: TimeSlot;
  date: Date;
  duration: number;
  timezone: string;
  status: BookingStatus;
  type: BookingType;
  groupSessionId?: string;
  participants?: ParticipantInfo[];
  topic?: string;
  description?: string;
  meetingLink?: string;
  calendarInvite?: CalendarInvite;
  notes?: string;
  rating?: number;
  feedback?: BookingFeedback;
  rescheduleHistory: RescheduleRecord[];
  createdAt: Date;
  updatedAt: Date;
  reminderSent: boolean[];
}

export interface ParticipantInfo {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  company?: string;
  role?: string;
  timezone: string;
  phone?: string;
  meetingPreferences?: MeetingPreferences;
}

export interface MeetingPreferences {
  preferredCommunication: 'video' | 'audio' | 'chat';
  accommodationNeeds?: string[];
  previousSessions?: string[];
  topicsOfInterest?: string[];
}

export interface CalendarInvite {
  id: string;
  eventId: string;
  provider: 'google' | 'outlook' | 'apple';
  status: 'pending' | 'sent' | 'accepted' | 'declined';
  sentAt?: Date;
  responseAt?: Date;
}

export interface BookingFeedback {
  rating: number;
  comment?: string;
  category: 'helpfulness' | 'knowledge' | 'communication' | 'problem-solving';
  recommendations?: string[];
  wouldRecommend: boolean;
  submittedAt: Date;
}

export interface RescheduleRecord {
  id: string;
  originalTimeSlot: TimeSlot;
  newTimeSlot: TimeSlot;
  reason: string;
  requestedBy: string;
  requestedAt: Date;
  approved: boolean;
  approvedBy?: string;
  approvedAt?: Date;
}

export type BookingStatus = 
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'completed'
  | 'no-show'
  | 'rescheduled';

export type BookingType = 'one-on-one' | 'group' | 'consultation' | 'review' | 'mentoring';

export interface ExpertProfile {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar?: string;
  expertise: string[];
  languages: string[];
  ratings: ExpertRatings;
  availabilitySummary: AvailabilitySummary;
  consultationTypes: ConsultationType[];
  hourlyRate?: number;
  currency?: string;
  responseRate: number;
  responseTime: number;
  certifications?: Certification[];
  socialLinks?: SocialLink[];
}
```

## Application Hooks

### useOfficeHours Hook
```typescript
export const useOfficeHours = (expertId?: string) => {
  const [schedule, setSchedule] = useState<ExpertSchedule | null>(null);
  const [bookings, setBookings] = useState<OfficeHoursBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSchedule = useCallback(async () => {
    if (!expertId) return;
    
    try {
      const scheduleData = await officeHoursService.getSchedule(expertId);
      setSchedule(scheduleData);
    } catch (err) {
      setError(err as Error);
    }
  }, [expertId]);

  const fetchBookings = useCallback(async (filters?: BookingFilters) => {
    try {
      const bookingsData = await bookingService.getBookings({ expertId, ...filters });
      setBookings(bookingsData);
    } catch (err) {
      setError(err as Error);
    }
  }, [expertId]);

  const createBooking = useCallback(async (bookingData: CreateBookingData) => {
    const newBooking = await bookingService.createBooking(bookingData);
    setBookings(prev => [...prev, newBooking]);
    return newBooking;
  }, []);

  const updateBooking = useCallback(async (
    bookingId: string, 
    updates: Partial<OfficeHoursBooking>
  ) => {
    const updatedBooking = await bookingService.updateBooking(bookingId, updates);
    setBookings(prev => prev.map(booking =>
      booking.id === bookingId ? updatedBooking : booking
    ));
    return updatedBooking;
  }, []);

  const cancelBooking = useCallback(async (bookingId: string, reason?: string) => {
    await bookingService.cancelBooking(bookingId, reason);
    setBookings(prev => prev.map(booking =>
      booking.id === bookingId 
        ? { ...booking, status: 'cancelled' }
        : booking
    ));
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchSchedule(), fetchBookings()]);
      setLoading(false);
    };

    loadData();
  }, [fetchSchedule, fetchBookings]);

  return {
    schedule,
    bookings,
    loading,
    error,
    refetchSchedule: fetchSchedule,
    refetchBookings: fetchBookings,
    createBooking,
    updateBooking,
    cancelBooking
  };
};
```

### useBooking Hook
```typescript
export const useBooking = (expertId: string, date?: Date) => {
  const [existingBookings, setExistingBookings] = useState<OfficeHoursBooking[]>([]);
  const [conflicts, setConflicts] = useState<BookingConflict[]>([]);

  const checkConflicts = useCallback((
    timeSlot: TimeSlot, 
    date: Date
  ): BookingConflict[] => {
    const conflicts: BookingConflict[] = [];
    
    for (const booking of existingBookings) {
      if (isSameDay(booking.date, date) && 
          booking.status !== 'cancelled' &&
          timeSlotsOverlap(booking.timeSlot, timeSlot)) {
        conflicts.push({
          type: 'time-conflict',
          existingBooking: booking,
          requestedSlot: timeSlot
        });
      }
    }
    
    return conflicts;
  }, [existingBookings]);

  const getAvailableTimeSlots = useCallback((
    duration: number,
    preferredTimes?: TimeSlot[]
  ): AvailableSlot[] => {
    const workingHours = schedule?.weeklySchedule[getDayOfWeek(date)] || [];
    const availableSlots: AvailableSlot[] = [];
    
    for (const workSlot of workingHours) {
      const slotStart = timeToMinutes(workSlot.start);
      const slotEnd = timeToMinutes(workSlot.end);
      
      let currentTime = slotStart;
      
      while (currentTime + duration <= slotEnd) {
        const testSlot: TimeSlot = {
          start: minutesToTime(currentTime),
          end: minutesToTime(currentTime + duration)
        };
        
        const slotConflicts = checkConflicts(testSlot, date);
        
        if (slotConflicts.length === 0) {
          availableSlots.push({
            timeSlot: testSlot,
            isBuffered: false,
            quality: calculateSlotQuality(testSlot, preferredTimes),
            confidence: calculateAvailabilityConfidence(testSlot)
          });
        }
        
        currentTime += 15; // 15-minute intervals
      }
    }
    
    return availableSlots;
  }, [schedule, date, checkConflicts]);

  useEffect(() => {
    if (expertId && date) {
      const fetchBookingsForDate = async () => {
        const bookings = await bookingService.getBookings({
          expertId,
          date,
          status: ['confirmed', 'pending']
        });
        setExistingBookings(bookings);
      };

      fetchBookingsForDate();
    }
  }, [expertId, date]);

  return {
    existingBookings,
    conflicts,
    checkConflicts,
    getAvailableTimeSlots
  };
};
```

## Service Layer

### OfficeHoursService
```typescript
export class OfficeHoursService {
  private api: ApiClient;
  private calendar: CalendarService;

  constructor() {
    this.api = new ApiClient();
    this.calendar = new CalendarService();
  }

  async getSchedule(expertId: string): Promise<ExpertSchedule | null> {
    try {
      const response = await this.api.get(`/office-hours/schedule/${expertId}`);
      return this.transformScheduleData(response.data);
    } catch (error) {
      if (error.status === 404) {
        return null; // No schedule set yet
      }
      throw error;
    }
  }

  async saveSchedule(schedule: ExpertSchedule): Promise<ExpertSchedule> {
    const response = await this.api.post('/office-hours/schedule', schedule);
    return this.transformScheduleData(response.data);
  }

  async getAvailableSlots(params: GetAvailableSlotsParams): Promise<AvailableSlot[]> {
    const availableSlots: AvailableSlot[] = [];
    const dayOfWeek = getDayOfWeek(params.date);
    const weeklySchedule = params.schedule.weeklySchedule[dayOfWeek] || [];
    
    // Filter out exceptions for the selected date
    const exceptions = params.schedule.exceptions.filter(exception => 
      isSameDay(exception.date, params.date)
    );
    
    // Check if the entire day is unavailable
    const dayUnavailable = exceptions.some(e => e.type === 'unavailable');
    if (dayUnavailable) return [];
    
    // Process custom hours exceptions
    const customHours = exceptions.find(e => e.type === 'custom-hours');
    const workingSlots = customHours?.customSlots || weeklySchedule;
    
    // Generate available slots considering existing bookings
    for (const workSlot of workingSlots) {
      const slots = this.generateSlotsFromWorkSlot(
        workSlot, 
        params.duration,
        params.existingBookings,
        params.schedule.bufferTime
      );
      availableSlots.push(...slots);
    }
    
    return availableSlots.sort((a, b) => 
      timeToMinutes(a.timeSlot.start) - timeToMinutes(b.timeSlot.start)
    );
  }

  async getExpertsByExpertise(expertise: string): Promise<ExpertProfile[]> {
    const response = await this.api.get(`/office-hours/experts?expertise=${expertise}`);
    return response.data.map(this.transformExpertData);
  }

  async getExpertProfile(expertId: string): Promise<ExpertProfile> {
    const response = await this.api.get(`/office-hours/experts/${expertId}`);
    return this.transformExpertData(response.data);
  }

  private generateSlotsFromWorkSlot(
    workSlot: TimeSlot,
    duration: number,
    existingBookings: OfficeHoursBooking[],
    bufferTime: BufferTime
  ): AvailableSlot[] {
    const slots: AvailableSlot[] = [];
    const startMinutes = timeToMinutes(workSlot.start);
    const endMinutes = timeToMinutes(workSlot.end);
    
    let currentTime = startMinutes + bufferTime.before;
    const endTime = endMinutes - bufferTime.after;
    
    while (currentTime + duration <= endTime) {
      const testSlot: TimeSlot = {
        start: minutesToTime(currentTime),
        end: minutesToTime(currentTime + duration)
      };
      
      const hasConflict = existingBookings.some(booking =>
        timeSlotsOverlap(booking.timeSlot, testSlot) && 
        booking.status !== 'cancelled'
      );
      
      if (!hasConflict) {
        slots.push({
          timeSlot: testSlot,
          isBuffered: bufferTime.before > 0 || bufferTime.after > 0,
          quality: this.calculateSlotQuality(testSlot),
          confidence: this.calculateAvailabilityConfidence(testSlot)
        });
      }
      
      currentTime += 15; // 15-minute intervals
    }
    
    return slots;
  }

  private calculateSlotQuality(slot: TimeSlot): 'excellent' | 'good' | 'fair' {
    const hour = parseInt(slot.start.split(':')[0]);
    
    // Business hours (9 AM - 5 PM) are excellent
    if (hour >= 9 && hour <= 17) {
      return 'excellent';
    }
    
    // Early morning or evening are good
    if ((hour >= 6 && hour < 9) || (hour > 17 && hour <= 20)) {
      return 'good';
    }
    
    // Late evening or very early morning are fair
    return 'fair';
  }

  private calculateAvailabilityConfidence(slot: TimeSlot): number {
    // This would typically consider factors like:
    // - Historical booking patterns
    // - Expert availability trends
    // - Day of the week preferences
    // - Seasonal patterns
    
    const hour = parseInt(slot.start.split(':')[0]);
    const baseConfidence = 0.8;
    
    // Adjust confidence based on time of day
    if (hour >= 9 && hour <= 17) {
      return Math.min(baseConfidence + 0.1, 1.0);
    }
    
    if (hour >= 18 && hour <= 21) {
      return baseConfidence;
    }
    
    return Math.max(baseConfidence - 0.2, 0.5);
  }

  private transformScheduleData(data: any): ExpertSchedule {
    return {
      id: data.id,
      expertId: data.expertId,
      timezone: data.timezone,
      weeklySchedule: data.weeklySchedule,
      exceptions: data.exceptions,
      bookingSettings: data.bookingSettings,
      bufferTime: data.bufferTime,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt)
    };
  }

  private transformExpertData(data: any): ExpertProfile {
    return {
      id: data.id,
      name: data.name,
      title: data.title,
      bio: data.bio,
      avatar: data.avatar,
      expertise: data.expertise,
      languages: data.languages,
      ratings: data.ratings,
      availabilitySummary: data.availabilitySummary,
      consultationTypes: data.consultationTypes,
      hourlyRate: data.hourlyRate,
      currency: data.currency,
      responseRate: data.responseRate,
      responseTime: data.responseTime,
      certifications: data.certifications,
      socialLinks: data.socialLinks
    };
  }
}
```

## Implementation Guidelines

### Schedule Management
- Flexible weekly scheduling with timezone support
- Recurring patterns and custom exceptions
- Intelligent buffer time management
- Holiday and vacation blocking
- Seasonal availability adjustments

### Booking System
- Real-time availability checking
- Conflict detection and resolution
- Group session support
- Waitlist management
- Automated confirmations and reminders

### Expert Management
- Comprehensive expert profiles with specializations
- Rating and feedback systems
- Availability summaries and insights
- Performance analytics and reporting
- Expert matching algorithms

### User Experience
- Intuitive time slot selection interface
- Mobile-responsive booking flow
- Calendar integration and sync
- One-click rescheduling options
- Smart recommendations based on preferences

### Calendar Integration
- Google Calendar, Outlook, and Apple Calendar support
- Automated calendar invites and updates
- Time zone conversion and detection
- Recurring event management
- Calendar conflict checking

### Communication Features
- In-app messaging and notifications
- Email confirmations and reminders
- Video conferencing integration
- Screen sharing and collaboration tools
- Post-session follow-ups and feedback

### Analytics & Insights
- Booking patterns and utilization metrics
- Expert performance tracking
- User satisfaction and feedback analysis
- Revenue and ROI tracking
- Predictive availability optimization

### Security & Privacy
- Secure video conferencing links
- Data encryption and privacy controls
- HIPAA compliance for medical consultations
- Access control and authentication
- Audit logging and compliance reporting

### Mobile Optimization
- Native mobile app experience
- Push notifications for reminders
- Offline calendar sync
- Touch-optimized interface
- Progressive Web App capabilities

## Testing Strategy
- Unit tests for scheduling logic and time management
- Integration tests for calendar synchronization
- E2E tests for complete booking workflows
- Load testing for concurrent bookings
- Timezone and daylight saving tests
- Cross-platform calendar integration tests

## SISO Design System Integration
- Consistent orange color scheme (#f6b75e) for primary actions
- Time slot selection with intuitive controls
- Expert profile cards with ratings
- Loading states for schedule fetching
- Responsive layouts for mobile devices
- Dark mode support for professional interface