/**
 * Portfolio Domain - Portfolio Data Hook
 */

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
