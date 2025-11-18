/**
 * Portfolio Domain - Industry Data Hook
 */

import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getIndustryBySlug } from '../data';
import { getIndustryClients } from '../lib';

export function useIndustryData() {
  const { industry: slug } = useParams<{ industry: string }>();
  const navigate = useNavigate();

  const industry = useMemo(() => {
    if (!slug) return null;
    return getIndustryBySlug(slug);
  }, [slug]);

  const clients = useMemo(() => {
    if (!industry) return [];
    return getIndustryClients(industry.id);
  }, [industry]);

  // Redirect if industry not found
  if (slug && !industry) {
    navigate('/portfolio', { replace: true });
  }

  return {
    industry,
    clients,
  };
}
