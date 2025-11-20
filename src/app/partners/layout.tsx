import type { ReactNode } from "react";
import { Fragment, Suspense } from "react";
import dynamic from "next/dynamic";
import { PartnerPerfMetrics } from "./PartnerPerfMetrics";

const LazyPartnersPageShell = dynamic(() => import("@/domains/partnerships/community/ui/LazyPartnersPageShell"));

export default function PartnersLayout({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      <PartnerPerfMetrics />
      <Suspense
        fallback={
          <div className="min-h-screen bg-siso-bg-primary text-siso-text-primary flex items-center justify-center">
            <div className="space-y-2 text-center">
              <div className="mx-auto h-6 w-32 rounded-full bg-white/10 animate-pulse" />
              <div className="mx-auto h-6 w-48 rounded-full bg-white/5 animate-pulse" />
            </div>
          </div>
        }
      >
        <LazyPartnersPageShell>{children}</LazyPartnersPageShell>
      </Suspense>
    </Fragment>
  );
}
