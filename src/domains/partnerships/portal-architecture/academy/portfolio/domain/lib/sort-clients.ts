/**
 * Portfolio Domain - Sort Clients
 */

import { PortfolioClient } from '../types';

export type SortOption =
  | 'newest'
  | 'oldest'
  | 'value-high'
  | 'value-low'
  | 'rating'
  | 'delivery';

export function sortClients(clients: PortfolioClient[], sortBy: SortOption): PortfolioClient[] {
  const sorted = [...clients];
  const getValue = (client: PortfolioClient) =>
    client.pricing.sisoPrice ?? client.pricing.max ?? client.pricing.min ?? client.pricing.marketValue ?? 0;

  switch (sortBy) {
    case 'newest':
      return sorted.sort(
        (a, b) => new Date(b.launchDate).getTime() - new Date(a.launchDate).getTime()
      );
    case 'oldest':
      return sorted.sort(
        (a, b) => new Date(a.launchDate).getTime() - new Date(b.launchDate).getTime()
      );
    case 'value-high':
      return sorted.sort((a, b) => getValue(b) - getValue(a));
    case 'value-low':
      return sorted.sort((a, b) => getValue(a) - getValue(b));
    case 'rating':
      return sorted.sort(
        (a, b) =>
          (b.results?.clientSatisfaction || 0) - (a.results?.clientSatisfaction || 0)
      );
    case 'delivery':
      return sorted.sort((a, b) => a.timeline.durationDays - b.timeline.durationDays);
    default:
      return sorted;
  }
}
