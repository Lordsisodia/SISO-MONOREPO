"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useHydrateOnView } from "@/domains/shared/hooks/useHydrateOnView";
import type { WalletAnalytics } from "../types/enhanced-wallet.types";

const FinancialAnalytics = dynamic(() => import("./FinancialAnalytics").then((mod) => ({ default: mod.FinancialAnalytics })), {
  ssr: false,
});

function AnalyticsSkeleton() {
  return (
    <div className="space-y-3 rounded-[24px] border border-white/10 bg-white/5 p-4 animate-pulse">
      <div className="h-4 w-32 rounded-full bg-white/15" />
      <div className="grid gap-3 md:grid-cols-3">
        {[0, 1, 2].map((idx) => (
          <div key={`analytics-skel-${idx}`} className="rounded-2xl border border-white/10 bg-black/15 p-4 space-y-2">
            <div className="h-3 w-1/2 rounded-full bg-white/10" />
            <div className="h-5 w-3/4 rounded-full bg-white/15" />
            <div className="h-20 rounded-xl bg-white/5" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function FinancialAnalyticsHydrator({ analytics }: { analytics: WalletAnalytics }) {
  const { ref, hydrated } = useHydrateOnView<HTMLDivElement>({ rootMargin: "0px 0px -20% 0px" });

  return (
    <div ref={ref}>
      {hydrated ? (
        <Suspense fallback={<AnalyticsSkeleton />}>
          <FinancialAnalytics analytics={analytics} />
        </Suspense>
      ) : (
        <AnalyticsSkeleton />
      )}
    </div>
  );
}
