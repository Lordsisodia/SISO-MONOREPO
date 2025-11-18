/**
 * Portfolio Domain - Industry Types
 */

import { LucideIcon } from 'lucide-react';

export type IndustryCategory =
  | 'tourism-activities'
  | 'fintech-crypto'
  | 'health-wellness'
  | 'construction'
  | 'saas'
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
  icon: LucideIcon; // Lucide React Icon
  color: string; // Tailwind class
  headerImage?: string; // Header/hero image URL
  templateShowcase?: IndustryTemplate;
  seoMetadata: IndustrySEO;
}
