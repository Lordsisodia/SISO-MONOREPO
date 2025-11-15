/**
 * Portfolio Domain - Filter Clients
 */

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
          c.techStack.database.includes(tech) ||
          c.techStack.tools.includes(tech)
      )
    );
  }

  if (filters.featured !== undefined) {
    filtered = filtered.filter((c) => c.metadata.featured === filters.featured);
  }

  if (filters.projectType?.length) {
    filtered = filtered.filter((c) => filters.projectType!.includes(c.projectType));
  }

  return filtered;
}
