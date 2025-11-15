/**
 * Portfolio Domain - Calculate Portfolio Statistics
 */

import { allClients } from '../data';
import { PortfolioStats } from '../types';

export function calculatePortfolioStats(): PortfolioStats {
  const visible = allClients.filter((c) => c.metadata.showInPortfolio);

  const uniqueIndustries = new Set(visible.map((c) => c.industry));

  const avgDelivery =
    visible.reduce((sum, c) => sum + c.timeline.durationDays, 0) / visible.length;

  const totalValue = visible.reduce((sum, c) => sum + c.pricing.sisoPrice, 0);

  const clientsWithRatings = visible.filter((c) => c.results?.clientSatisfaction);
  const avgSatisfaction =
    clientsWithRatings.length > 0
      ? clientsWithRatings.reduce((sum, c) => sum + (c.results?.clientSatisfaction || 0), 0) /
        clientsWithRatings.length
      : 0;

  return {
    totalProjects: visible.length,
    industriesServed: uniqueIndustries.size,
    avgDeliveryDays: Math.round(avgDelivery),
    totalValueDelivered: totalValue,
    clientSatisfaction: Math.round(avgSatisfaction * 10) / 10, // Round to 1 decimal
  };
}
