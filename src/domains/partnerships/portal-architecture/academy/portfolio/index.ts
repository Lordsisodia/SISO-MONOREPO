/**
 * Portfolio Domain - Public API
 *
 * Clean Architecture Structure:
 * - domain/      → Business types, constants, rules
 * - application/ → Hooks and state management
 * - ui/          → Components and screens
 *
 * Import everything portfolio-related from this single entry point:
 * import { PortfolioHub, usePortfolioData, allClients } from '@/domains/partnerships/portal-architecture/academy/portfolio';
 */

// Domain Layer - Types, constants, and business logic
export * from './domain/types';
export * from './domain/constants';
export * from './domain/lib';

// Application Layer - Hooks and state
export * from './application/hooks';

// UI Layer - Components and pages
export * from './ui/components';
export * from './ui/pages';

// Data (mock data for development)
export * from './data';
