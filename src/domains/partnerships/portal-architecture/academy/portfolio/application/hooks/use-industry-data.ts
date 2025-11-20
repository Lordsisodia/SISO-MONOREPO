"use client";

/**
 * Portfolio Domain - Industry Data Hook
 */

import { useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { getIndustryBySlug } from "../../data";
import { getIndustryClients } from "../../domain/lib";

const FALLBACK_ROUTE = "/partners/academy/portfolio";

export function useIndustryData() {
  const params = useParams();
  const router = useRouter();
  const slugParam = params?.industry ?? params?.slug ?? null;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

  const industry = useMemo(() => {
    if (typeof slug !== "string" || !slug) return null;
    return getIndustryBySlug(slug) ?? null;
  }, [slug]);

  const clients = useMemo(() => {
    if (!industry) return [];
    return getIndustryClients(industry.id);
  }, [industry]);

  useEffect(() => {
    if (typeof slug === "string" && slug.length > 0 && !industry) {
      router.replace(FALLBACK_ROUTE);
    }
  }, [industry, router, slug]);

  return {
    industry,
    clients,
  };
}
