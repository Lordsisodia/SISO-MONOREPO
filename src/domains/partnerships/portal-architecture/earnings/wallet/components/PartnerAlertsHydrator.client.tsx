"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useHydrateOnView } from "@/domains/shared/hooks/useHydrateOnView";
import type { WalletSecurity } from "../types/enhanced-wallet.types";

const EnhancedSecurity = dynamic(() => import("./EnhancedSecurity").then((mod) => ({ default: mod.EnhancedSecurity })), {
  ssr: false,
});

function AlertsSkeleton() {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 shadow-inner shadow-black/30 animate-pulse space-y-3">
      <div className="h-4 w-52 rounded-full bg-white/15" />
      {[0, 1, 2].map((idx) => (
        <div key={`alert-skel-${idx}`} className="rounded-2xl border border-white/10 bg-black/15 p-3 space-y-2">
          <div className="h-3 w-1/3 rounded-full bg-white/10" />
          <div className="h-3 w-2/3 rounded-full bg-white/10" />
          <div className="h-8 rounded-lg bg-white/5" />
        </div>
      ))}
    </div>
  );
}

type PartnerAlertsHydratorProps = {
  security: WalletSecurity;
  onSecurityUpdate: (updates: Partial<WalletSecurity>) => void;
};

export function PartnerAlertsHydrator({ security, onSecurityUpdate }: PartnerAlertsHydratorProps) {
  const { ref, hydrated } = useHydrateOnView<HTMLDivElement>({ rootMargin: "0px 0px -15% 0px" });

  return (
    <div ref={ref}>
      {hydrated ? (
        <Suspense fallback={<AlertsSkeleton />}>
          <EnhancedSecurity security={security} onSecurityUpdate={onSecurityUpdate} />
        </Suspense>
      ) : (
        <AlertsSkeleton />
      )}
    </div>
  );
}
