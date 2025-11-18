/**
 * Portfolio Domain - Get Client by Slug
 */

import { allClients } from '../data';
import { PortfolioClient } from '../types';

export function getClientBySlug(slug: string): PortfolioClient | undefined {
  return allClients.find((client) => client.id === slug);
}
