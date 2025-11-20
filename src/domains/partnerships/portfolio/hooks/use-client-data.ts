"use client";

/**
 * Portfolio Domain - Client Data Hook
 */

import { useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { getClientBySlug } from "../lib";

const FALLBACK_ROUTE = "/partners/academy/portfolio";

export function useClientData() {
  const params = useParams();
  const router = useRouter();
  const slugParam = params?.client ?? params?.slug ?? null;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

  const client = useMemo(() => {
    if (typeof slug !== "string" || !slug) return null;
    return getClientBySlug(slug) ?? null;
  }, [slug]);

  useEffect(() => {
    if (typeof slug === "string" && slug.length > 0 && !client) {
      router.replace(FALLBACK_ROUTE);
    }
  }, [client, router, slug]);

  return client;
}
