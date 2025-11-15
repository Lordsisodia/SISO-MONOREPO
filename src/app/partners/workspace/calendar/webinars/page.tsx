import type { Metadata } from 'next';
import { WebinarsScreen } from '@/domains/partnerships/portal-architecture/workspace/calendar/webinars/ui';
import { PartnersPageShell } from '@/domains/partnerships/community/ui/CommunityPageShell';

export const metadata: Metadata = {
  title: 'Webinars • SISO Partners',
  description: 'Plan live training, register for upcoming sessions, and replay every workshop.',
};

export default function PartnersCalendarWebinarsPage() {
  return (
    <PartnersPageShell initialState={{ activeDrawerSection: 'workspace' }}>
      <WebinarsScreen />
    </PartnersPageShell>
  );
}
