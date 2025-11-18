/**
 * Portfolio Stats Section - Integration Component
 * Connects portfolio data to the ClientStats display component
 */

import { ClientStats } from '@/components/ui/stats-section';
import { PortfolioStats } from '../types';

interface PortfolioStatsSectionProps {
  stats: PortfolioStats;
}

export function PortfolioStatsSection({ stats }: PortfolioStatsSectionProps) {
  // Calculate mock growth percentages based on stats
  // In production, these would come from comparing historical data
  const totalProjectsGrowth = '+23.5%';
  const revenueGrowth = '+42.8%';
  const avgDeliveryChange = stats.avgDeliveryDays < 5 ? '-8.2%' : '+5.1%';
  const satisfactionChange = stats.clientSatisfaction >= 4.8 ? '+12.3%' : '+5.2%';

  // Convert portfolio stats to client stats format
  const clientStatsData = {
    appsCreated: {
      value: stats.totalProjects,
      change: totalProjectsGrowth,
    },
    totalRevenue: {
      value: stats.totalValueDelivered || 500000, // Fallback test value
      change: revenueGrowth,
      currency: 'USD',
    },
    avgAppSize: {
      value: `${stats.avgDeliveryDays}d`,
      change: avgDeliveryChange,
    },
    dailyActiveUsers: {
      value: Math.round(stats.clientSatisfaction * 100000) || 500000, // Mock calculation with fallback
      change: satisfactionChange,
    },
  };

  return <ClientStats stats={clientStatsData} />;
}
