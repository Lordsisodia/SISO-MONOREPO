import type { Metadata } from 'next';
import { OfficeHoursScreen } from '@/domains/partnerships/portal-architecture/workspace/calendar/office-hours/ui';
import { PartnersPageShell } from '@/domains/partnerships/community/ui/CommunityPageShell';

export const metadata: Metadata = {
  title: 'Office Hours • SISO Partners',
  description: 'Book expert coaching, manage upcoming sessions, and review post-call recaps.',
};

export default function PartnersCalendarOfficeHoursPage() {
  return (
    <PartnersPageShell initialState={{ activeDrawerSection: 'workspace' }}>
      <OfficeHoursScreen />
    </PartnersPageShell>
  );
}
