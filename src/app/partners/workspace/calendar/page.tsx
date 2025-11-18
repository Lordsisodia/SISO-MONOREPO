import type { Metadata } from 'next';
import { CalendarWorkspaceScreen } from '@/domains/partnerships/portal-architecture/workspace/calendar/ui';
import { PartnersPageShell } from '@/domains/partnerships/community/ui/CommunityPageShell';

// Disable prerendering for this heavy, client-centric page to avoid build-time SSR issues
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Calendar • SISO Partners',
  description:
    'Unified calendar for office hours, webinars, tasks, and deal deadlines. Color-coded by event type with tier-aware filters.',
};

export default function PartnersCalendarPage() {
  return (
    <PartnersPageShell initialState={{ activeDrawerSection: 'workspace' }}>
      <CalendarWorkspaceScreen />
    </PartnersPageShell>
  );
}
