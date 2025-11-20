# Portfolio Enhancement - Domain-Based Architecture

**Architecture Pattern:** Domain-Driven Design (DDD)
**Version:** 2.0 (Domain-Based)
**Created:** 2025-10-23
**Architect:** Claude (BMAD Architect Persona)

---

## 🎯 Domain-Driven Design Philosophy

**Everything portfolio-related lives in one self-contained domain:**
- ✅ Easy to find all portfolio code
- ✅ Clear domain boundaries
- ✅ No naming conflicts
- ✅ Can be extracted to separate package if needed
- ✅ Follows SISO's modular architecture principles

---

## 📁 Complete Domain-Based Directory Structure

```
SISO-CLIENT-BASE/
├── public/
│   └── portfolio/                          # Portfolio assets
│       ├── mayorker/
│       │   ├── logo.png
│       │   ├── desktop/
│       │   │   ├── hero.png
│       │   │   ├── booking-page.png
│       │   │   └── admin-dashboard.png
│       │   ├── mobile/
│       │   │   ├── home.png
│       │   │   ├── booking.png
│       │   │   └── activities.png
│       │   └── features/
│       │       ├── calendar.png
│       │       ├── payment.png
│       │       └── confirmation.png
│       ├── uber-crypt/
│       ├── shout/
│       ├── optimal/
│       ├── nm-construction/
│       ├── lets-go/
│       ├── siso-internal/
│       ├── mooshin/
│       ├── gritness/
│       ├── trojan-mma/
│       ├── five-star-hire/
│       ├── elementary/
│       └── team-apollo/
│
└── src/
    ├── domain/
    │   └── portfolio/                      # 🎯 PORTFOLIO DOMAIN (self-contained)
    │       │
    │       ├── index.ts                    # Public API - exports everything
    │       │
    │       ├── types/                      # TypeScript type definitions
    │       │   ├── index.ts                # All type exports
    │       │   ├── client.types.ts         # Client/project types
    │       │   ├── industry.types.ts       # Industry types
    │       │   ├── timeline.types.ts       # Timeline types
    │       │   ├── pricing.types.ts        # Pricing types
    │       │   ├── media.types.ts          # Media/screenshot types
    │       │   └── stats.types.ts          # Statistics types
    │       │
    │       ├── constants/                  # Constants & configuration
    │       │   ├── index.ts                # All constant exports
    │       │   ├── colors.ts               # Industry colors
    │       │   ├── labels.ts               # UI labels
    │       │   └── config.ts               # Portfolio config
    │       │
    │       ├── data/                       # Data layer
    │       │   ├── index.ts                # Data exports
    │       │   ├── industries.ts           # 9 industry definitions
    │       │   └── clients/                # Client data files
    │       │       ├── index.ts            # Export all clients
    │       │       ├── mayorker.ts
    │       │       ├── uber-crypt.ts
    │       │       ├── shout.ts
    │       │       ├── optimal.ts
    │       │       ├── nm-construction.ts
    │       │       ├── lets-go.ts
    │       │       ├── siso-internal.ts
    │       │       ├── mooshin.ts
    │       │       ├── gritness.ts
    │       │       ├── trojan-mma.ts
    │       │       ├── five-star-hire.ts
    │       │       ├── elementary.ts
    │       │       └── team-apollo.ts
    │       │
    │       ├── lib/                        # Utility functions
    │       │   ├── index.ts                # Utility exports
    │       │   ├── get-client-by-slug.ts   # Find client by URL slug
    │       │   ├── get-industry-clients.ts # Filter by industry
    │       │   ├── calculate-stats.ts      # Portfolio statistics
    │       │   ├── filter-clients.ts       # Client filtering logic
    │       │   ├── search-clients.ts       # Client search logic
    │       │   ├── sort-clients.ts         # Client sorting logic
    │       │   └── seo-helpers.ts          # SEO utilities
    │       │
    │       ├── hooks/                      # React hooks
    │       │   ├── index.ts                # Hook exports
    │       │   ├── use-portfolio-data.ts   # Get portfolio data
    │       │   ├── use-client-data.ts      # Get client data
    │       │   ├── use-industry-data.ts    # Get industry data
    │       │   ├── use-portfolio-filter.ts # Filter logic
    │       │   ├── use-portfolio-search.ts # Search logic
    │       │   └── use-portfolio-seo.ts    # SEO meta tags
    │       │
    │       ├── components/                 # React components
    │       │   ├── index.ts                # Component exports
    │       │   │
    │       │   ├── shared/                 # Shared/reusable components
    │       │   │   ├── index.ts
    │       │   │   ├── IndustryBadge.tsx
    │       │   │   ├── TechStackBadge.tsx
    │       │   │   ├── PricingCard.tsx
    │       │   │   ├── BreadcrumbNav.tsx
    │       │   │   ├── PortfolioGrid.tsx   # Enhanced from existing
    │       │   │   ├── PortfolioCard.tsx   # Enhanced from existing
    │       │   │   └── PortfolioFilters.tsx
    │       │   │
    │       │   ├── hub/                    # Portfolio hub page components
    │       │   │   ├── index.ts
    │       │   │   ├── PortfolioHero.tsx
    │       │   │   ├── IndustryGrid.tsx
    │       │   │   ├── FeaturedProjects.tsx
    │       │   │   └── PartnerCTA.tsx
    │       │   │
    │       │   ├── industry/               # Industry page components
    │       │   │   ├── index.ts
    │       │   │   ├── IndustryHero.tsx
    │       │   │   ├── IndustryOverview.tsx
    │       │   │   ├── TemplateShowcase.tsx
    │       │   │   ├── CaseStudyHighlight.tsx
    │       │   │   └── RelatedIndustries.tsx
    │       │   │
    │       │   └── client/                 # Client detail page components
    │       │       ├── index.ts
    │       │       ├── ClientHero.tsx
    │       │       ├── ProjectOverviewPanel.tsx
    │       │       ├── PricingComparison.tsx
    │       │       ├── FeaturesShowcase.tsx
    │       │       ├── MarketAnalysisSection.tsx
    │       │       ├── AIAgentInsights.tsx
    │       │       ├── ResultsMetrics.tsx
    │       │       ├── DevelopmentTimeline.tsx
    │       │       ├── TestimonialSection.tsx
    │       │       ├── ScreenshotsGallery.tsx
    │       │       ├── TechnicalDetailsPanel.tsx
    │       │       ├── RelatedProjectsGrid.tsx
    │       │       └── ClientCTASection.tsx
    │       │
    │       └── pages/                      # Page components
    │           ├── index.ts                # Page exports
    │           ├── PortfolioHub.tsx        # /portfolio
    │           ├── IndustryLanding.tsx     # /portfolio/[industry]
    │           └── ClientDetail.tsx        # /portfolio/[industry]/[client]
    │
    ├── components/                         # Global/shared components
    │   └── ui/                             # shadcn/ui components
    │
    └── App.tsx                             # Main app (imports from domain)
```

---

## 🎯 Domain Public API

### Main Export File

```typescript
// src/domain/portfolio/index.ts

/**
 * Portfolio Domain - Public API
 *
 * Import everything portfolio-related from this single entry point:
 * import { PortfolioHub, usePortfolioData, allClients } from '@/domain/portfolio';
 */

// Types
export * from './types';

// Constants
export * from './constants';

// Data
export * from './data';

// Utilities
export * from './lib';

// Hooks
export * from './hooks';

// Components
export * from './components';

// Pages
export * from './pages';
```

---

## 📊 Type System (Domain Types)

### Organized by Concern

```typescript
// src/domain/portfolio/types/index.ts
export * from './client.types';
export * from './industry.types';
export * from './timeline.types';
export * from './pricing.types';
export * from './media.types';
export * from './stats.types';
```

```typescript
// src/domain/portfolio/types/client.types.ts

import { IndustryCategory } from './industry.types';
import { ProjectTimeline } from './timeline.types';
import { ProjectPricing } from './pricing.types';
import { ProjectMedia } from './media.types';

export type ProjectType =
  | 'Website'
  | 'PWA'
  | 'SaaS'
  | 'Mobile App'
  | 'Web App'
  | 'Platform'
  | 'Internal Tool';

export type ProjectStatus =
  | 'Live'
  | 'In Development'
  | 'Maintenance'
  | 'Archived';

export interface ProjectFeatures {
  key: string[];
  technical: string[];
  integrations: string[];
}

export interface TechStack {
  frontend: string[];
  backend: string[];
  database: string[];
  hosting: string[];
  tools: string[];
}

export interface MarketAnalysis {
  competitorsSurveyed: string[];
  uniqueSellingPoints: string[];
  targetAudience: string;
  marketPosition: string;
}

export interface AIAgentWork {
  agentsUsed: string[];
  workPerformed: string[];
  automationHighlights: string[];
}

export interface PerformanceMetrics {
  pageLoadTime?: string;
  lighthouseScore?: number;
  uptime?: string;
}

export interface ProjectResults {
  deliverySpeed: string;
  performanceMetrics?: PerformanceMetrics;
  businessImpact?: string;
  clientSatisfaction?: number;
}

export interface Testimonial {
  quote: string;
  author: string;
  title: string;
  photo?: string;
}

export interface ProjectMetadata {
  featured: boolean;
  showInPortfolio: boolean;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
}

/**
 * Complete portfolio client/project definition
 */
export interface PortfolioClient {
  // Basic Info
  id: string;
  name: string;
  industry: IndustryCategory;
  tagline: string;
  description: string;

  // URLs & Links
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;

  // Project Classification
  projectType: ProjectType;
  status: ProjectStatus;
  launchDate: string;

  // Timeline
  timeline: ProjectTimeline;

  // Pricing
  pricing: ProjectPricing;

  // Features
  features: ProjectFeatures;

  // Technology
  techStack: TechStack;

  // Market Analysis (optional)
  marketAnalysis?: MarketAnalysis;

  // AI Agent Work (optional)
  aiAgents?: AIAgentWork;

  // Results (optional)
  results?: ProjectResults;

  // Testimonial (optional)
  testimonial?: Testimonial;

  // Media
  media: ProjectMedia;

  // Metadata
  metadata: ProjectMetadata;
}
```

```typescript
// src/domain/portfolio/types/industry.types.ts

export type IndustryCategory =
  | 'tourism-activities'
  | 'fintech-crypto'
  | 'health-wellness'
  | 'construction'
  | 'saas-edtech'
  | 'elearning'
  | 'fitness-sports'
  | 'transportation'
  | 'food-beverage'
  | 'internal-tools';

export interface IndustryTemplate {
  description: string;
  reusableComponents: string[];
}

export interface IndustrySEO {
  title: string;
  description: string;
  keywords: string[];
}

export interface Industry {
  id: IndustryCategory;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  templateShowcase?: IndustryTemplate;
  seoMetadata: IndustrySEO;
}
```

```typescript
// src/domain/portfolio/types/timeline.types.ts

export interface TimelinePhase {
  name: string;
  description: string;
  completedDate: string;
}

export interface ProjectTimeline {
  startDate: string;
  endDate: string;
  durationDays: number;
  phases: TimelinePhase[];
}
```

```typescript
// src/domain/portfolio/types/pricing.types.ts

export type Currency = 'USD' | 'EUR' | 'GBP';

export interface ProjectPricing {
  marketValue: number;
  sisoPrice: number;
  currency: Currency;
  priceRange?: string;
  paymentStructure?: string;
  savings: number;
}
```

```typescript
// src/domain/portfolio/types/media.types.ts

export interface Screenshots {
  desktop: string[];
  mobile: string[];
  features: string[];
}

export interface ProjectMedia {
  logo?: string;
  screenshots: Screenshots;
  videos?: string[];
}
```

```typescript
// src/domain/portfolio/types/stats.types.ts

export interface PortfolioStats {
  totalProjects: number;
  industriesServed: number;
  avgDeliveryDays: number;
  totalValueDelivered: number;
  clientSatisfaction: number;
}
```

---

## 📦 Data Layer (Domain Data)

```typescript
// src/domain/portfolio/data/index.ts

export * from './industries';
export * from './clients';
```

```typescript
// src/domain/portfolio/data/industries.ts

import { Industry } from '../types';

export const industries: Industry[] = [
  {
    id: 'tourism-activities',
    name: 'Tourism & Activities',
    slug: 'tourism-activities',
    description: 'Booking platforms, rental systems, and tour management apps.',
    icon: '🏖️',
    color: 'bg-cyan-500',
    templateShowcase: {
      description: 'Pre-built booking flows and payment integration',
      reusableComponents: [
        'Activity Calendar',
        'Booking System',
        'Payment Processing',
      ],
    },
    seoMetadata: {
      title: 'Tourism & Activities App Development | SISO Agency',
      description: 'Build your tourism booking app in 48 hours.',
      keywords: ['tourism app', 'booking platform', 'rental system'],
    },
  },
  // ... 8 more industries
];

// Helper functions
export const getIndustryBySlug = (slug: string) =>
  industries.find((i) => i.slug === slug);

export const getIndustryById = (id: string) =>
  industries.find((i) => i.id === id);
```

```typescript
// src/domain/portfolio/data/clients/index.ts

import { PortfolioClient } from '../../types';
import { mayorker } from './mayorker';
import { uberCrypt } from './uber-crypt';
// ... import all 13

export const allClients: PortfolioClient[] = [
  mayorker,
  uberCrypt,
  // ... all 13
];

// Named exports for direct access
export {
  mayorker,
  uberCrypt,
  // ... all 13
};
```

```typescript
// src/domain/portfolio/data/clients/mayorker.ts

import { PortfolioClient } from '../../types';

export const mayorker: PortfolioClient = {
  id: 'mayorker',
  name: 'Mayorker Activities',
  industry: 'tourism-activities',
  tagline: 'Complete activity booking platform for Majorca tourism',
  description: '...',

  // ... full client data (same as before)
};
```

---

## 🛠️ Utility Layer (Domain Utils)

```typescript
// src/domain/portfolio/lib/index.ts

export * from './get-client-by-slug';
export * from './get-industry-clients';
export * from './calculate-stats';
export * from './filter-clients';
export * from './search-clients';
export * from './sort-clients';
export * from './seo-helpers';
```

```typescript
// src/domain/portfolio/lib/get-client-by-slug.ts

import { allClients } from '../data';
import { PortfolioClient } from '../types';

export function getClientBySlug(slug: string): PortfolioClient | undefined {
  return allClients.find((client) => client.id === slug);
}
```

```typescript
// src/domain/portfolio/lib/get-industry-clients.ts

import { allClients } from '../data';
import { IndustryCategory, PortfolioClient } from '../types';

export function getIndustryClients(
  industry: IndustryCategory
): PortfolioClient[] {
  return allClients.filter(
    (client) =>
      client.industry === industry && client.metadata.showInPortfolio
  );
}
```

```typescript
// src/domain/portfolio/lib/calculate-stats.ts

import { allClients } from '../data';
import { PortfolioStats } from '../types';

export function calculatePortfolioStats(): PortfolioStats {
  const visible = allClients.filter((c) => c.metadata.showInPortfolio);
  const uniqueIndustries = new Set(visible.map((c) => c.industry));

  const avgDelivery =
    visible.reduce((sum, c) => sum + c.timeline.durationDays, 0) /
    visible.length;

  const totalValue = visible.reduce((sum, c) => sum + c.pricing.sisoPrice, 0);

  const avgSatisfaction =
    visible
      .filter((c) => c.results?.clientSatisfaction)
      .reduce((sum, c) => sum + (c.results?.clientSatisfaction || 0), 0) /
    visible.filter((c) => c.results?.clientSatisfaction).length;

  return {
    totalProjects: visible.length,
    industriesServed: uniqueIndustries.size,
    avgDeliveryDays: Math.round(avgDelivery),
    totalValueDelivered: totalValue,
    clientSatisfaction: Math.round(avgSatisfaction * 10) / 10,
  };
}
```

```typescript
// src/domain/portfolio/lib/filter-clients.ts

import { PortfolioClient, IndustryCategory } from '../types';

export interface FilterOptions {
  industries?: IndustryCategory[];
  techStack?: string[];
  featured?: boolean;
  projectType?: string[];
}

export function filterClients(
  clients: PortfolioClient[],
  filters: FilterOptions
): PortfolioClient[] {
  let filtered = [...clients];

  if (filters.industries?.length) {
    filtered = filtered.filter((c) => filters.industries!.includes(c.industry));
  }

  if (filters.techStack?.length) {
    filtered = filtered.filter((c) =>
      filters.techStack!.some(
        (tech) =>
          c.techStack.frontend.includes(tech) ||
          c.techStack.backend.includes(tech) ||
          c.techStack.database.includes(tech)
      )
    );
  }

  if (filters.featured !== undefined) {
    filtered = filtered.filter((c) => c.metadata.featured === filters.featured);
  }

  if (filters.projectType?.length) {
    filtered = filtered.filter((c) =>
      filters.projectType!.includes(c.projectType)
    );
  }

  return filtered;
}
```

```typescript
// src/domain/portfolio/lib/search-clients.ts

import { PortfolioClient } from '../types';

export function searchClients(
  clients: PortfolioClient[],
  query: string
): PortfolioClient[] {
  const lowerQuery = query.toLowerCase();

  return clients.filter(
    (client) =>
      client.name.toLowerCase().includes(lowerQuery) ||
      client.description.toLowerCase().includes(lowerQuery) ||
      client.tagline.toLowerCase().includes(lowerQuery) ||
      client.features.key.some((f) => f.toLowerCase().includes(lowerQuery)) ||
      Object.values(client.techStack)
        .flat()
        .some((tech) => tech.toLowerCase().includes(lowerQuery)) ||
      client.metadata.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}
```

```typescript
// src/domain/portfolio/lib/sort-clients.ts

import { PortfolioClient } from '../types';

export type SortOption =
  | 'newest'
  | 'oldest'
  | 'value-high'
  | 'value-low'
  | 'rating'
  | 'delivery';

export function sortClients(
  clients: PortfolioClient[],
  sortBy: SortOption
): PortfolioClient[] {
  const sorted = [...clients];

  switch (sortBy) {
    case 'newest':
      return sorted.sort(
        (a, b) =>
          new Date(b.launchDate).getTime() - new Date(a.launchDate).getTime()
      );
    case 'oldest':
      return sorted.sort(
        (a, b) =>
          new Date(a.launchDate).getTime() - new Date(b.launchDate).getTime()
      );
    case 'value-high':
      return sorted.sort((a, b) => b.pricing.sisoPrice - a.pricing.sisoPrice);
    case 'value-low':
      return sorted.sort((a, b) => a.pricing.sisoPrice - b.pricing.sisoPrice);
    case 'rating':
      return sorted.sort(
        (a, b) =>
          (b.results?.clientSatisfaction || 0) -
          (a.results?.clientSatisfaction || 0)
      );
    case 'delivery':
      return sorted.sort(
        (a, b) => a.timeline.durationDays - b.timeline.durationDays
      );
    default:
      return sorted;
  }
}
```

---

## 🪝 Hooks Layer (Domain Hooks)

```typescript
// src/domain/portfolio/hooks/index.ts

export * from './use-portfolio-data';
export * from './use-client-data';
export * from './use-industry-data';
export * from './use-portfolio-filter';
export * from './use-portfolio-search';
export * from './use-portfolio-seo';
```

```typescript
// src/domain/portfolio/hooks/use-portfolio-data.ts

import { useMemo } from 'react';
import { allClients } from '../data';
import { calculatePortfolioStats } from '../lib';

export function usePortfolioData() {
  const clients = useMemo(
    () => allClients.filter((c) => c.metadata.showInPortfolio),
    []
  );

  const stats = useMemo(() => calculatePortfolioStats(), []);

  const featured = useMemo(
    () => clients.filter((c) => c.metadata.featured),
    [clients]
  );

  return {
    clients,
    stats,
    featured,
  };
}
```

```typescript
// src/domain/portfolio/hooks/use-client-data.ts

import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getClientBySlug } from '../lib';

export function useClientData() {
  const { client: slug } = useParams<{ client: string }>();
  const navigate = useNavigate();

  const client = useMemo(() => {
    if (!slug) return null;
    return getClientBySlug(slug);
  }, [slug]);

  // Redirect if client not found
  if (slug && !client) {
    navigate('/portfolio', { replace: true });
  }

  return client;
}
```

```typescript
// src/domain/portfolio/hooks/use-industry-data.ts

import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getIndustryBySlug, getIndustryClients } from '../lib';

export function useIndustryData() {
  const { industry: slug } = useParams<{ industry: string }>();
  const navigate = useNavigate();

  const industry = useMemo(() => {
    if (!slug) return null;
    return getIndustryBySlug(slug);
  }, [slug]);

  const clients = useMemo(() => {
    if (!industry) return [];
    return getIndustryClients(industry.id);
  }, [industry]);

  // Redirect if industry not found
  if (slug && !industry) {
    navigate('/portfolio', { replace: true });
  }

  return {
    industry,
    clients,
  };
}
```

```typescript
// src/domain/portfolio/hooks/use-portfolio-filter.ts

import { useState, useMemo } from 'react';
import { PortfolioClient, IndustryCategory } from '../types';
import { filterClients, sortClients, searchClients, SortOption } from '../lib';

export function usePortfolioFilter(initialClients: PortfolioClient[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<
    IndustryCategory[]
  >([]);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const filteredClients = useMemo(() => {
    let result = initialClients;

    // Search
    if (searchQuery) {
      result = searchClients(result, searchQuery);
    }

    // Filter
    result = filterClients(result, {
      industries: selectedIndustries.length ? selectedIndustries : undefined,
      techStack: selectedTech.length ? selectedTech : undefined,
    });

    // Sort
    result = sortClients(result, sortBy);

    return result;
  }, [initialClients, searchQuery, selectedIndustries, selectedTech, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedIndustries([]);
    setSelectedTech([]);
  };

  const hasActiveFilters =
    searchQuery || selectedIndustries.length > 0 || selectedTech.length > 0;

  return {
    searchQuery,
    setSearchQuery,
    selectedIndustries,
    setSelectedIndustries,
    selectedTech,
    setSelectedTech,
    sortBy,
    setSortBy,
    filteredClients,
    clearFilters,
    hasActiveFilters,
  };
}
```

---

## 🧩 Component Layer (Domain Components)

### Component Structure
All components stay within the domain, organized by purpose:

```typescript
// src/domain/portfolio/components/index.ts

// Shared components
export * from './shared';

// Page-specific components
export * from './hub';
export * from './industry';
export * from './client';
```

### Example Component with Domain Imports

```typescript
// src/domain/portfolio/components/hub/PortfolioHero.tsx

import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { usePortfolioData } from '../../hooks';

export function PortfolioHero() {
  const { stats } = usePortfolioData();

  return (
    <section className="py-20">
      <div className="container">
        <h1 className="text-5xl font-bold">
          {stats.totalProjects}+ Apps Across{' '}
          <span className="text-siso-orange">{stats.industriesServed} Industries</span>
        </h1>
        {/* ... rest of component */}
      </div>
    </section>
  );
}
```

---

## 📄 Page Layer (Domain Pages)

```typescript
// src/domain/portfolio/pages/index.ts

export * from './PortfolioHub';
export * from './IndustryLanding';
export * from './ClientDetail';
```

```typescript
// src/domain/portfolio/pages/PortfolioHub.tsx

import {
  PortfolioHero,
  IndustryGrid,
  FeaturedProjects,
  PortfolioFilters,
  PortfolioGrid,
  PartnerCTA,
} from '../components';
import { usePortfolioData, usePortfolioFilter } from '../hooks';

export function PortfolioHub() {
  const { clients, featured } = usePortfolioData();
  const {
    searchQuery,
    setSearchQuery,
    selectedIndustries,
    setSelectedIndustries,
    sortBy,
    setSortBy,
    filteredClients,
    clearFilters,
    hasActiveFilters,
  } = usePortfolioFilter(clients);

  return (
    <div className="portfolio-hub">
      <PortfolioHero />
      <IndustryGrid />

      <div className="container py-16">
        <PortfolioFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedIndustries={selectedIndustries}
          onIndustriesChange={setSelectedIndustries}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onClearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        <FeaturedProjects projects={featured} />

        <PortfolioGrid projects={filteredClients} />
      </div>

      <PartnerCTA />
    </div>
  );
}
```

```typescript
// src/domain/portfolio/pages/IndustryLanding.tsx

import {
  BreadcrumbNav,
  IndustryHero,
  IndustryOverview,
  TemplateShowcase,
  PortfolioGrid,
  CaseStudyHighlight,
  RelatedIndustries,
} from '../components';
import { useIndustryData } from '../hooks';

export function IndustryLanding() {
  const { industry, clients } = useIndustryData();

  if (!industry) return null;

  const featured = clients.find((c) => c.metadata.featured);

  return (
    <div className="industry-landing">
      <BreadcrumbNav
        items={[
          { label: 'Home', href: '/' },
          { label: 'Portfolio', href: '/portfolio' },
          { label: industry.name, href: `/portfolio/${industry.slug}` },
        ]}
      />

      <IndustryHero industry={industry} clientCount={clients.length} />
      <IndustryOverview industry={industry} />

      <div className="container py-16">
        <h2 className="text-3xl font-bold mb-8">
          {industry.name} Projects
        </h2>
        <PortfolioGrid projects={clients} />
      </div>

      {featured && <CaseStudyHighlight client={featured} />}
      <RelatedIndustries currentIndustry={industry.id} />
    </div>
  );
}
```

```typescript
// src/domain/portfolio/pages/ClientDetail.tsx

import {
  BreadcrumbNav,
  ClientHero,
  ProjectOverviewPanel,
  PricingComparison,
  FeaturesShowcase,
  MarketAnalysisSection,
  AIAgentInsights,
  ResultsMetrics,
  DevelopmentTimeline,
  TestimonialSection,
  ScreenshotsGallery,
  TechnicalDetailsPanel,
  RelatedProjectsGrid,
  ClientCTASection,
} from '../components';
import { useClientData } from '../hooks';
import { getIndustryById } from '../data';

export function ClientDetail() {
  const client = useClientData();

  if (!client) return null;

  const industry = getIndustryById(client.industry);

  return (
    <div className="client-detail">
      <BreadcrumbNav
        items={[
          { label: 'Home', href: '/' },
          { label: 'Portfolio', href: '/portfolio' },
          {
            label: industry?.name || '',
            href: `/portfolio/${industry?.slug}`,
          },
          { label: client.name, href: '' },
        ]}
      />

      <ClientHero client={client} />
      <ProjectOverviewPanel client={client} />
      <PricingComparison pricing={client.pricing} />
      <FeaturesShowcase client={client} />

      {client.marketAnalysis && (
        <MarketAnalysisSection analysis={client.marketAnalysis} />
      )}

      {client.aiAgents && <AIAgentInsights aiAgents={client.aiAgents} />}

      {client.results && <ResultsMetrics results={client.results} />}

      <DevelopmentTimeline timeline={client.timeline} />

      {client.testimonial && (
        <TestimonialSection testimonial={client.testimonial} />
      )}

      <ScreenshotsGallery media={client.media} />
      <TechnicalDetailsPanel techStack={client.techStack} />
      <RelatedProjectsGrid currentClient={client} />
      <ClientCTASection client={client} />
    </div>
  );
}
```

---

## 🔌 Integration with Main App

```typescript
// src/App.tsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  PortfolioHub,
  IndustryLanding,
  ClientDetail,
} from '@/domain/portfolio';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Other routes */}
        <Route path="/" element={<HomePage />} />

        {/* Portfolio Domain Routes */}
        <Route path="/portfolio" element={<PortfolioHub />} />
        <Route path="/portfolio/:industry" element={<IndustryLanding />} />
        <Route
          path="/portfolio/:industry/:client"
          element={<ClientDetail />}
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## ✅ Implementation Checklist (Domain-Based)

### Phase 1: Domain Foundation
- [ ] Create `/src/domain/portfolio/` directory
- [ ] Create `index.ts` (public API)
- [ ] Create `/types/` with all type files
- [ ] Create `/constants/` with colors, labels, config
- [ ] Create domain folder structure

### Phase 2: Data Layer
- [ ] Create `/data/industries.ts` with all 9 industries
- [ ] Create `/data/clients/` directory
- [ ] Create all 13 client data files
- [ ] Create `/data/clients/index.ts`
- [ ] Create `/data/index.ts`

### Phase 3: Utility Layer
- [ ] Create all utility functions in `/lib/`
- [ ] Create client lookup functions
- [ ] Create filter/search/sort functions
- [ ] Create stats calculation
- [ ] Create SEO helpers

### Phase 4: Hooks Layer
- [ ] Create `use-portfolio-data.ts`
- [ ] Create `use-client-data.ts`
- [ ] Create `use-industry-data.ts`
- [ ] Create `use-portfolio-filter.ts`
- [ ] Create `use-portfolio-seo.ts`

### Phase 5: Component Layer
- [ ] Create `/components/shared/` components
- [ ] Create `/components/hub/` components
- [ ] Create `/components/industry/` components
- [ ] Create `/components/client/` components
- [ ] Create component index files

### Phase 6: Page Layer
- [ ] Create `PortfolioHub.tsx`
- [ ] Create `IndustryLanding.tsx`
- [ ] Create `ClientDetail.tsx`
- [ ] Create `/pages/index.ts`

### Phase 7: Integration
- [ ] Update main `App.tsx` with portfolio routes
- [ ] Test all routing
- [ ] Verify domain imports work
- [ ] Test public API exports

### Phase 8: Assets
- [ ] Organize screenshots in `/public/portfolio/`
- [ ] Collect all client logos
- [ ] Optimize all images

---

## 🎯 Benefits of Domain-Based Architecture

### 1. **Self-Contained**
All portfolio code in one place - easy to find and maintain.

### 2. **Clear Public API**
Single import point: `import { ... } from '@/domain/portfolio'`

### 3. **Easy to Extract**
Could become separate npm package if needed.

### 4. **No Naming Conflicts**
Portfolio types/functions don't clash with global ones.

### 5. **Scalable**
Easy to add more domains (blog, products, etc.) using same pattern.

### 6. **Better Organization**
Related code grouped together, not scattered across folders.

---

**Status:** ✅ Domain Architecture Complete
**Ready for Implementation:** Yes
**Estimated Time:** Same as before (8 days full-time)

All portfolio code lives in `/src/domain/portfolio/` 🎉
