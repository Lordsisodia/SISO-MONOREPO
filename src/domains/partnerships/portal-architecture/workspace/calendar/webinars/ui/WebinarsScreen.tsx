'use client';

import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HighlightCard } from '@/components/ui/card-5-static';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/domains/shared/utils/cn';
import { CalendarDays, Camera, PlayCircle, Presentation, Sparkles } from 'lucide-react';
import {
  webinarCategories,
  upcomingWebinars,
  replayLibrary,
  webinarStats,
  type Webinar,
} from '../data';
import { SettingsGroupCallout } from '@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout';

export function WebinarsScreen() {
  const [category, setCategory] = useState('all');

  const filteredUpcoming = useMemo(() => {
    return upcomingWebinars.filter((webinar) => category === 'all' || webinar.category === category);
  }, [category]);

  const liveSession = filteredUpcoming.find((webinar) => webinar.status === 'live');
  const futureSessions = filteredUpcoming.filter((webinar) => webinar.status !== 'live');

  return (
    <section className="min-h-screen bg-[#05060f] pb-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pt-12">
        <HighlightCard
          color="orange"
          title="Partner webinars"
          description="Live enablement, product drops, and peer spotlights. Fully integrated with RSVP + replay analytics."
          metricValue="3"
          metricLabel="live sessions this week"
          buttonText="See highlights"
          onButtonClick={() => window.scrollTo({ top: 200, behavior: 'smooth' })}
          icon={<Presentation className="h-5 w-5" />}
          hideDivider
          hideFooter
          className="w-full pr-16"
          showCornerIcon={false}
        >
          <div />
        </HighlightCard>

        <StatsPanel />

        <SettingsGroupCallout
          icon={<Presentation className="h-4 w-4 text-siso-orange" />}
          title="Browse tracks"
          subtitle="Filter by focus or see everything at once."
          showChevron={false}
        >
          <div className="space-y-4 rounded-[22px] border border-white/10 bg-white/5 p-4">
            <Tabs value={category} onValueChange={setCategory}>
              <TabsList className="flex w-full flex-wrap gap-2 bg-white/10">
                {webinarCategories.map((cat) => (
                  <TabsTrigger
                    key={cat.id}
                    value={cat.id}
                    className="rounded-full border border-white/10 px-4 py-2 text-sm text-white data-[state=active]:border-white data-[state=active]:bg-white/20"
                  >
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {liveSession ? <LiveSessionCard webinar={liveSession} /> : null}

            <div className="grid gap-4 md:grid-cols-2">
              {futureSessions.map((webinar) => (
                <UpcomingCard key={webinar.id} webinar={webinar} />
              ))}
              {futureSessions.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-white/20 bg-white/5 p-6 text-sm text-white/70">
                  Nothing else this week in that track.
                </div>
              ) : null}
            </div>
          </div>
        </SettingsGroupCallout>

        <ReplayLibrary />
      </div>
    </section>
  );
}

function StatsPanel() {
  return (
    <SettingsGroupCallout
      icon={<Sparkles className="h-4 w-4 text-siso-orange" />}
      title="Webinar stats"
      subtitle="Engagement + replays"
      showChevron={false}
    >
      <div className="grid gap-3 rounded-[22px] border border-white/10 bg-white/5 p-4 md:grid-cols-3">
        {webinarStats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-white/10 bg-black/15 p-4">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">{stat.label}</p>
            <p className="text-3xl font-semibold text-white">{stat.value}</p>
            <p className="text-sm text-emerald-300">{stat.delta}</p>
          </div>
        ))}
      </div>
    </SettingsGroupCallout>
  );
}

function LiveSessionCard({ webinar }: { webinar: Webinar }) {
  return (
    <div className="rounded-3xl border border-emerald-400/40 bg-gradient-to-r from-emerald-500/30 to-slate-900/80 p-4 shadow-lg">
      <div className="flex items-center gap-2 text-emerald-200">
        <Camera className="h-4 w-4" /> Streaming now
      </div>
      <p className="mt-2 text-2xl font-semibold text-white">{webinar.title}</p>
      <p className="text-sm text-white/80">{webinar.summary}</p>
      <div className="mt-3 flex flex-wrap gap-3 text-xs text-white/70">
        <span className="flex items-center gap-1">
          <CalendarDays className="h-4 w-4" /> {new Date(webinar.startsAt).toLocaleString()}
        </span>
        <span className="flex items-center gap-1">
          <Sparkles className="h-4 w-4" /> {webinar.hosts.join(', ')}
        </span>
      </div>
      <div className="mt-4 flex gap-2">
        <Button className="bg-white text-black hover:bg-white/90">Join live room</Button>
        <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
          Add to calendar
        </Button>
      </div>
    </div>
  );
}

function UpcomingCard({ webinar }: { webinar: Webinar }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between">
        <Badge className="bg-white/20 text-white">{webinarCategories.find((cat) => cat.id === webinar.category)?.label}</Badge>
        {webinar.rsvpCount ? <p className="text-xs text-white/70">{webinar.rsvpCount} RSVPs</p> : null}
      </div>
      <p className="mt-2 text-xl font-semibold text-white">{webinar.title}</p>
      <p className="text-sm text-white/70">{webinar.summary}</p>
      <div className="mt-3 space-y-1 text-xs text-white/70">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4" /> {new Date(webinar.startsAt).toLocaleString()}
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4" /> {webinar.hosts.join(' • ')}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="sm" className="bg-white text-black hover:bg-white/90">
          {webinar.cta ?? 'Register'}
        </Button>
        <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
          Add to calendar
        </Button>
        {webinar.tierAccess && webinar.tierAccess !== 'all' ? (
          <Badge className="bg-amber-500/20 text-amber-100">{webinar.tierAccess}+ only</Badge>
        ) : null}
      </div>
    </div>
  );
}

function ReplayLibrary() {
  return (
    <SettingsGroupCallout
      icon={<PlayCircle className="h-4 w-4 text-siso-orange" />}
      title="Replay library"
      subtitle="Catch up on recordings and download slides"
      showChevron={false}
    >
      <div className="grid gap-4 rounded-[22px] border border-white/10 bg-white/5 p-4 md:grid-cols-2">
        {replayLibrary.map((webinar) => (
          <div key={webinar.id} className="rounded-3xl border border-white/10 bg-black/15 p-4">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">
              {new Date(webinar.startsAt).toLocaleDateString()}
            </p>
            <p className="text-xl font-semibold text-white">{webinar.title}</p>
            <p className="text-sm text-white/80">{webinar.summary}</p>
            <div className="mt-2 text-xs text-white/60">{webinar.hosts.join(', ')}</div>
            <Button size="sm" variant="ghost" className="mt-4 text-white/80" asChild>
              <a href={webinar.replayLink ?? '#'}>Watch replay</a>
            </Button>
          </div>
        ))}
        {replayLibrary.length === 0 ? <p className="text-sm text-white/70">No recordings yet.</p> : null}
      </div>
    </SettingsGroupCallout>
  );
}
