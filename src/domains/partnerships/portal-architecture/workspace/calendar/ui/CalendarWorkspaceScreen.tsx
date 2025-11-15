'use client';

import { useMemo, useState } from 'react';
import { Clock, CloudCog, Filter, MapPin, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { HighlightCard } from '@/components/ui/card-5-static';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/domains/shared/utils/cn';
import {
  calendarEventTypes,
  calendarEvents,
  type CalendarEvent,
  calendarInsights,
  calendarSyncProviders,
} from '../data/events';
import { SettingsGroupCallout } from '@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout';

type CalendarViewMode = 'month' | 'week' | 'day';

const viewModes: { id: CalendarViewMode; label: string; helper: string }[] = [
  { id: 'month', label: 'Month', helper: 'Heatmap + totals' },
  { id: 'week', label: 'Week', helper: 'Focused sprint plan' },
  { id: 'day', label: 'Day', helper: 'Hour-by-hour' },
];

export function CalendarWorkspaceScreen() {
  const [viewMode, setViewMode] = useState<CalendarViewMode>('week');
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set(Object.keys(calendarEventTypes)));
  const [focusDate, setFocusDate] = useState(() => new Date());

  const visibleEvents = useMemo(() => {
    return calendarEvents.filter((event) => selectedTypes.has(event.type));
  }, [selectedTypes]);

  const weekDays = useMemo(() => buildWeek(focusDate), [focusDate]);
  const dayKey = formatKey(focusDate);
  const eventsByDay = useMemo(() => groupEventsByDay(visibleEvents), [visibleEvents]);

  const todaysEvents = eventsByDay[dayKey] ?? [];
  const priorityEvents = visibleEvents.filter((event) => event.tierAccess !== 'all');

  return (
    <section className="min-h-screen bg-[#030307] pb-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pt-12">
        <HeroBanner onJumpToToday={() => setFocusDate(new Date())} />

        <div className="grid gap-6 lg:grid-cols-[360px_auto]">
          <div className="flex flex-col gap-6">
            <CalendarFilters
              selectedTypes={selectedTypes}
              onToggleType={(key) => {
                setSelectedTypes((prev) => {
                  const next = new Set(prev);
                  if (next.has(key)) {
                    next.delete(key);
                  } else {
                    next.add(key);
                  }
                  return next;
                });
              }}
            />

            <SyncIntegrationsCard />

            <InsightsCard />

            <PriorityQueueCard events={priorityEvents} />
          </div>

          <div className="space-y-6">
            <Card className="border-white/10 bg-white/5">
              <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="text-white">Calendar view</CardTitle>
                  <CardDescription className="text-white/70">
                    Toggle through planning modes and keep office hours, webinars, tasks, and deals aligned.
                  </CardDescription>
                </div>

                <Tabs value={viewMode} onValueChange={(mode) => setViewMode(mode as CalendarViewMode)}>
                  <TabsList className="grid grid-cols-3 bg-white/10 text-white">
                    {viewModes.map((mode) => (
                      <TabsTrigger key={mode.id} value={mode.id} className="data-[state=active]:bg-white/40">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold">{mode.label}</span>
                          <span className="text-[11px] text-white/80">{mode.helper}</span>
                        </div>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </CardHeader>

              <CardContent>
                {viewMode === 'month' ? (
                  <MonthHeatmap eventsByDay={eventsByDay} focusDate={focusDate} onSelectDate={setFocusDate} />
                ) : null}
                {viewMode === 'week' ? (
                  <WeekGrid
                    weekDays={weekDays}
                    eventsByDay={eventsByDay}
                    onSelectDate={setFocusDate}
                    selectedDateKey={dayKey}
                  />
                ) : null}
                {viewMode === 'day' ? <DayTimeline events={todaysEvents} focusDate={focusDate} /> : null}
              </CardContent>
            </Card>

            <UpcomingEventsPanel
              focusDate={focusDate}
              events={visibleEvents}
              onSelectDate={(date) => setFocusDate(date)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroBanner({ onJumpToToday }: { onJumpToToday: () => void }) {
  return (
    <HighlightCard
      color="orange"
      title="Partner calendar"
      description="Everything scheduled across SISO enablement, your deals, and partner-to-partner events in one adaptive workspace."
      metricValue="12"
      metricLabel="events on deck this week"
      buttonText="Jump to today"
      onButtonClick={onJumpToToday}
      icon={<Sparkles className="h-5 w-5" />}
      className="w-full rounded-3xl border border-white/20 bg-gradient-to-br from-orange-600 to-rose-500 text-white pr-16"
      hideDivider
      hideFooter
      titleClassName="text-3xl font-semibold"
      descriptionClassName="text-sm"
      showCornerIcon={false}
    >
      <div />
    </HighlightCard>
  );
}

function CalendarFilters({
  selectedTypes,
  onToggleType,
}: {
  selectedTypes: Set<string>;
  onToggleType: (key: string) => void;
}) {
  return (
    <SettingsGroupCallout
      icon={<Filter className="h-4 w-4" />}
      title="Schedule filters"
      subtitle="Toggle calendar sources without leaving the workspace."
      showChevron={false}
    >
      <div className="space-y-3 rounded-2xl border border-white/5 bg-white/[0.02] p-3">
        {Object.entries(calendarEventTypes).map(([key, meta]) => {
          const isActive = selectedTypes.has(key);
          return (
            <button
              key={key}
              type="button"
              onClick={() => onToggleType(key)}
              className={cn(
                'w-full rounded-2xl border px-4 py-3 text-left transition',
                isActive ? 'border-white bg-white/10 shadow-lg text-white' : 'border-white/10 text-white/70 hover:border-white/30',
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">{meta.label}</p>
                  <p className="text-xs text-white/70">{meta.summary}</p>
                </div>
                <Badge
                  className={cn(
                    'border-none bg-gradient-to-br px-3 py-1 text-[11px] uppercase tracking-[0.3em]',
                    meta.accent,
                  )}
                >
                  {isActive ? 'Visible' : 'Hidden'}
                </Badge>
              </div>
            </button>
          );
        })}
      </div>
    </SettingsGroupCallout>
  );
}

function WeekGrid({
  weekDays,
  eventsByDay,
  onSelectDate,
  selectedDateKey,
}: {
  weekDays: Date[];
  eventsByDay: Record<string, CalendarEvent[]>;
  onSelectDate: (day: Date) => void;
  selectedDateKey: string;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {weekDays.map((day) => {
        const key = formatKey(day);
        const events = eventsByDay[key] ?? [];
        const isSelected = key === selectedDateKey;
        return (
          <div
            key={key}
            className={cn(
              'rounded-3xl border p-4 transition',
              isSelected ? 'border-white bg-white/10 shadow-lg' : 'border-white/10 bg-white/5 hover:border-white/40',
            )}
          >
            <button type="button" onClick={() => onSelectDate(day)} className="w-full text-left">
              <p className="text-sm uppercase tracking-[0.2em] text-white/60">{formatDay(day)}</p>
              <p className="text-3xl font-semibold text-white">{day.getDate()}</p>
            </button>
            <div className="mt-3 flex flex-col gap-3">
              {events.length === 0 ? (
                <p className="text-sm text-white/60">Heads-down time</p>
              ) : (
                events.map((event) => <EventPill key={event.id} event={event} />)
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MonthHeatmap({
  eventsByDay,
  focusDate,
  onSelectDate,
}: {
  eventsByDay: Record<string, CalendarEvent[]>;
  focusDate: Date;
  onSelectDate: (day: Date) => void;
}) {
  const { calendarGrid, monthLabel } = useMemo(() => {
    const start = new Date(focusDate.getFullYear(), focusDate.getMonth(), 1);
    const weeks: Date[][] = [];
    let cursor = start;
    while (weeks.length < 5) {
      const week: Date[] = [];
      for (let i = 0; i < 7; i += 1) {
        week.push(new Date(cursor));
        cursor = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + 1);
      }
      weeks.push(week);
    }
    return { calendarGrid: weeks, monthLabel: start.toLocaleDateString(undefined, { month: 'long', year: 'numeric' }) };
  }, [focusDate]);

  return (
    <div className="space-y-3">
      <p className="text-sm uppercase tracking-[0.3em] text-white/60">{monthLabel}</p>
      <div className="grid gap-2">
        {calendarGrid.map((week, index) => (
          <div key={week[0].toISOString()} className="grid grid-cols-7 gap-2">
            {week.map((day) => {
              const key = formatKey(day);
              const density = Math.min((eventsByDay[key]?.length ?? 0) / 3, 1);
              return (
                <button
                  type="button"
                  key={key}
                  onClick={() => onSelectDate(day)}
                  className="aspect-square rounded-xl border border-white/5 text-left"
                  style={{
                    backgroundColor: `rgba(255,255,255,${0.05 + density * 0.4})`,
                  }}
                >
                  <span className="block text-xs text-white/80">{day.getDate()}</span>
                  <span className="text-[10px] text-white/60">{eventsByDay[key]?.length ?? 0}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function DayTimeline({ events, focusDate }: { events: CalendarEvent[]; focusDate: Date }) {
  const sorted = [...events].sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  return (
    <div className="space-y-4">
      <p className="text-sm uppercase tracking-[0.3em] text-white/60">
        {focusDate.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
      </p>
      {sorted.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/20 bg-white/5 p-6 text-sm text-white/70">
          No time-blocked events. Create a quick reminder or sync another calendar to fill this view.
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((event) => (
            <div key={event.id} className="rounded-3xl border border-white/10 bg-white/10 p-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-white/20 text-[11px] uppercase tracking-[0.3em]">{calendarEventTypes[event.type].label}</Badge>
                <span className="text-white/70">{formatTimeRange(event)}</span>
              </div>
              <p className="mt-2 text-lg font-semibold text-white">{event.title}</p>
              <p className="text-sm text-white/80">{event.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EventPill({ event }: { event: CalendarEvent }) {
  const meta = calendarEventTypes[event.type];
  return (
    <div className="rounded-2xl border border-white/10 bg-black/10 p-3">
      <p className="text-sm font-semibold text-white">{event.title}</p>
      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-white/70">
        <span>{formatTimeRange(event)}</span>
        <span>•</span>
        <span>{event.location}</span>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <Badge className={cn('border-none text-[10px] uppercase tracking-[0.3em]', meta.accent)}>{meta.label}</Badge>
        {event.tags.map((tag) => (
          <Badge key={tag} className="bg-white/10 text-[11px] text-white">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}

function UpcomingEventsPanel({
  focusDate,
  events,
  onSelectDate,
}: {
  focusDate: Date;
  events: CalendarEvent[];
  onSelectDate: (date: Date) => void;
}) {
  const upcoming = useMemo(() => {
    return [...events]
      .filter((event) => new Date(event.startTime).getTime() >= Date.now())
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  }, [events]);

  return (
    <Card className="border-white/10 bg-white/[0.04]">
      <CardHeader>
        <CardTitle className="text-white">Upcoming</CardTitle>
        <CardDescription className="text-white/70">
          RSVP, add to your external calendars, or jump into prep docs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-[420px] pr-3">
          <div className="space-y-4">
            {upcoming.map((event) => (
              <div key={event.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                      {new Date(event.startTime).toLocaleDateString(undefined, {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-lg font-semibold text-white">{event.title}</p>
                    <p className="text-sm text-white/70">{event.host}</p>
                  </div>
                  <Badge className="bg-white/20 text-white">{calendarEventTypes[event.type].label}</Badge>
                </div>
                <p className="mt-2 text-sm text-white/80">{event.description}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/70">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" /> {formatTimeRange(event)} {event.timezone.replace('America/', '')}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {event.location}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button size="sm" className="bg-white text-black hover:bg-white/90" onClick={() => onSelectDate(new Date(event.startTime))}>
                    Focus day
                  </Button>
                  {event.allowsRsvp ? (
                    <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      RSVP
                    </Button>
                  ) : null}
                  <Button size="sm" variant="ghost" className="text-white/80">
                    Add to calendar
                  </Button>
                </div>
              </div>
            ))}
            {upcoming.length === 0 ? (
              <p className="text-sm text-white/70">Everything is done! Check back soon.</p>
            ) : null}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function SyncIntegrationsCard() {
  return (
    <SettingsGroupCallout
      icon={<CloudCog className="h-4 w-4" />}
      title="Sync status"
      subtitle="Calendar providers tied to your workspace"
      showChevron={false}
    >
      <div className="space-y-3">
        {calendarSyncProviders.map((provider) => (
          <div key={provider.id} className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-white">{provider.name}</p>
              <p className="text-xs text-white/70">
                {provider.connected ? `Last sync ${provider.lastSync}` : 'Not connected'}
              </p>
            </div>
            <Button size="sm" variant={provider.connected ? 'secondary' : 'outline'} className="text-xs uppercase tracking-[0.3em]">
              {provider.connected ? 'Connected' : 'Connect'}
            </Button>
          </div>
        ))}
      </div>
    </SettingsGroupCallout>
  );
}

function InsightsCard() {
  return (
    <SettingsGroupCallout
      icon={<TrendingUp className="h-4 w-4" />}
      title="Signals"
      subtitle="RSVPs, follow-ups, and commitments summarized"
      showChevron={false}
    >
      <div className="space-y-4">
        {calendarInsights.map((insight) => (
          <div key={insight.label} className="rounded-2xl border border-white/10 bg-black/20 p-3">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">{insight.label}</p>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-semibold text-white">{insight.value}</span>
              <span className="text-xs text-emerald-300">{insight.delta}</span>
            </div>
          </div>
        ))}
      </div>
    </SettingsGroupCallout>
  );
}

function PriorityQueueCard({ events }: { events: CalendarEvent[] }) {
  const sorted = [...events].sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  return (
    <SettingsGroupCallout
      icon={<Zap className="h-4 w-4" />}
      title="Priority tracks"
      subtitle="Tier-gated coaching + enterprise desks"
      showChevron={false}
    >
      <div className="space-y-3">
        {sorted.slice(0, 3).map((event) => (
          <div key={event.id} className="rounded-2xl border border-white/20 bg-black/30 p-3">
            <p className="text-sm font-semibold text-white">{event.title}</p>
            <p className="text-xs text-white/70">{formatTimeRange(event)}</p>
          </div>
        ))}
        {sorted.length === 0 ? <p className="text-sm text-white/80">No tier-gated events this week.</p> : null}
      </div>
    </SettingsGroupCallout>
  );
}

function buildWeek(referenceDate: Date) {
  const dayIndex = (referenceDate.getDay() + 6) % 7; // Monday start
  const monday = new Date(referenceDate);
  monday.setDate(referenceDate.getDate() - dayIndex);
  const days: Date[] = [];
  for (let i = 0; i < 7; i += 1) {
    days.push(new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i));
  }
  return days;
}

function groupEventsByDay(events: CalendarEvent[]) {
  return events.reduce<Record<string, CalendarEvent[]>>((acc, event) => {
    const key = formatKey(new Date(event.startTime));
    if (!acc[key]) acc[key] = [];
    acc[key].push(event);
    return acc;
  }, {});
}

function formatKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function formatDay(date: Date) {
  return date.toLocaleDateString(undefined, { weekday: 'short' });
}

function formatTimeRange(event: CalendarEvent) {
  return `${new Date(event.startTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} – ${new Date(event.endTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`;
}
