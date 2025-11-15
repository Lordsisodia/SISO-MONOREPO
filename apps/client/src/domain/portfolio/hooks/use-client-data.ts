/**
 * Portfolio Domain - Client Data Hook
 */

import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getClientBySlug } from '../lib';

export function useClientData() {
  const { client: slug } = useParams<{ client: string }>();
  const navigate = useNavigate();

  const client = useMemo(() => {
    if (!slug) return null;
    return getClientBySlug(slug);
  }, [slug]);

  // Redirect if client not found
  if (slug && !client) {
    navigate('/portfolio', { replace: true });
  }

  return client;
}
