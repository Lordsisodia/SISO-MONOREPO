export type WebinarStatus = 'upcoming' | 'live' | 'replay';

export interface Webinar {
  id: string;
  title: string;
  category: 'sales' | 'product' | 'industry' | 'success';
  startsAt: string;
  durationMinutes: number;
  timezone: string;
  hosts: string[];
  coverImage?: string;
  status: WebinarStatus;
  summary: string;
  rsvpCount?: number;
  cta?: string;
  replayLink?: string;
  price?: number;
  tierAccess?: 'all' | 'active' | 'performer';
}

export const webinarCategories = [
  { id: 'all', label: 'All sessions' },
  { id: 'sales', label: 'Sales training' },
  { id: 'product', label: 'Product updates' },
  { id: 'industry', label: 'Industry insights' },
  { id: 'success', label: 'Partner spotlights' },
];

export const upcomingWebinars: Webinar[] = [
  {
    id: 'web-forecasting',
    title: 'Year-end revenue forecasting lab',
    category: 'sales',
    startsAt: '2025-11-18T13:00:00-05:00',
    durationMinutes: 60,
    timezone: 'ET',
    hosts: ['Enablement Studio'],
    status: 'upcoming',
    summary: 'Live walkthrough of the updated forecasting template plus peer critiques.',
    rsvpCount: 182,
    cta: 'Register',
  },
  {
    id: 'web-ai-playbooks',
    title: 'AI services playbooks',
    category: 'product',
    startsAt: '2025-11-22T12:00:00-05:00',
    durationMinutes: 90,
    timezone: 'ET',
    hosts: ['Partner Enablement', 'Elite Council'],
    status: 'upcoming',
    summary: 'Packaging/pricing frameworks with real proposals available to download.',
    rsvpCount: 240,
    cta: 'Reserve seat',
    tierAccess: 'active',
  },
  {
    id: 'web-live-latam',
    title: 'LATAM mini summit (live)',
    category: 'industry',
    startsAt: '2025-11-20T11:00:00-05:00',
    durationMinutes: 60,
    timezone: 'ET',
    hosts: ['Community Team'],
    status: 'live',
    summary: 'Regional demand signals, pipeline breakdowns, and AMA with top partners.',
    cta: 'Join live room',
  },
];

export const replayLibrary: Webinar[] = [
  {
    id: 'web-replay-pricing',
    title: 'Pricing experiments that stuck',
    category: 'success',
    startsAt: '2025-10-28T12:00:00-05:00',
    durationMinutes: 55,
    timezone: 'ET',
    hosts: ['Monica Reid'],
    status: 'replay',
    summary: '3 Elite operators showing the before/after math on retainers.',
    replayLink: '#',
  },
  {
    id: 'web-replay-ops',
    title: 'Operations dashboard deep dive',
    category: 'product',
    startsAt: '2025-11-02T10:00:00-05:00',
    durationMinutes: 45,
    timezone: 'ET',
    hosts: ['Product'],
    status: 'replay',
    summary: 'Migration tips and automation recipes for the Partner Workspace.',
    replayLink: '#',
  },
];

export const webinarStats = [
  { label: 'Seats filled', value: '84%', delta: '+9 pts vs Oct' },
  { label: 'Replay completion', value: '62%', delta: '+4 pts' },
  { label: 'New registrants', value: '312', delta: '+41 week over week' },
];
