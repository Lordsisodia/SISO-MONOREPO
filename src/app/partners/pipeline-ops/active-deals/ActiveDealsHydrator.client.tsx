"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import type { DealSummary } from "@/domains/partnerships/portal-architecture/pipeline-ops/domain/types";
import { useHydrateOnView } from "@/domains/shared/hooks/useHydrateOnView";
import { cn } from "@/lib/utils";

const LazyActiveDealsWorkspace = dynamic(
  () => import("./ActiveDealsWorkspace").then((mod) => ({ default: mod.ActiveDealsWorkspace })),
  { ssr: false, loading: () => null },
);

export function ActiveDealsHydrator({ deals }: { deals: DealSummary[] }) {
  const { ref, hydrated } = useHydrateOnView<HTMLDivElement>({ rootMargin: "240px 0px" });

  return (
    <div ref={ref} aria-live="polite">
      {hydrated ? (
        <Suspense fallback={<ActiveDealsFallback />}> 
          <LazyActiveDealsWorkspace initialDeals={deals} />
        </Suspense>
      ) : (
        <ActiveDealsFallback />
      )}
    </div>
  );
}

function ActiveDealsFallback() {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-sm text-white/60",
        "animate-pulse",
      )}
    >
      Streaming active deals…
    </div>
  );
}
