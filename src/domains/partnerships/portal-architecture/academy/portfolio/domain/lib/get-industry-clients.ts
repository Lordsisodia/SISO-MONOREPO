/**
 * Portfolio Domain - Get Clients by Industry
 */

import { allClients } from '../data';
import { IndustryCategory, PortfolioClient } from '../types';

export function getIndustryClients(industry: IndustryCategory): PortfolioClient[] {
  return allClients.filter(
    (client) => client.industry === industry && client.metadata.showInPortfolio
  );
}
