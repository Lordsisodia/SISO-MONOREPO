/**
 * Portfolio Domain - Client/Project Types
 */

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

export type ProjectStatus = 'Live' | 'In Development' | 'Maintenance' | 'Archived';

export interface ProjectFeatures {
  key: string[]; // Key features
  technical: string[]; // Technical features
  integrations: string[]; // Third-party integrations
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
  agentsUsed: string[]; // e.g., ["Analyst", "PM", "UX Expert"]
  workPerformed: string[];
  automationHighlights: string[];
}

export interface PerformanceMetrics {
  pageLoadTime?: string; // e.g., "1.2s"
  lighthouseScore?: number; // 0-100
  uptime?: string; // e.g., "99.9%"
}

export interface ProjectResults {
  deliverySpeed: string; // e.g., "48 hours"
  performanceMetrics?: PerformanceMetrics;
  businessImpact?: string;
  clientSatisfaction?: number; // 1-5 rating
}

export interface Testimonial {
  quote: string;
  author: string;
  title: string;
  photo?: string; // Path to photo
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
  id: string; // URL-safe slug
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
  launchDate: string; // ISO date

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

  // App Structure (optional)
  pages?: { id: string; title: string; route?: string; type?: 'page' | 'modal' | 'flow' }[];
  pageLinks?: { from: string; to: string; label?: string }[];

  // Metadata
  metadata: ProjectMetadata;
}
