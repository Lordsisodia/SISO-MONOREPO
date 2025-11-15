/**
 * Portfolio Domain - Search Clients
 */

import { PortfolioClient } from '../types';

export function searchClients(clients: PortfolioClient[], query: string): PortfolioClient[] {
  if (!query.trim()) {
    return clients;
  }

  const lowerQuery = query.toLowerCase();

  return clients.filter(
    (client) =>
      client.name.toLowerCase().includes(lowerQuery) ||
      client.description.toLowerCase().includes(lowerQuery) ||
      client.tagline.toLowerCase().includes(lowerQuery) ||
      client.features.key.some((f) => f.toLowerCase().includes(lowerQuery)) ||
      Object.values(client.techStack)
        .flat()
        .some((tech) => tech.toLowerCase().includes(lowerQuery)) ||
      client.metadata.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}
