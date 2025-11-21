import { Suspense } from "react";
import { LazyPartnersPageShell } from "@/domains/partnerships/community/ui/LazyPartnersPageShell";
import { PortfolioMobileScreen } from "@/domains/partnerships/portal-architecture/academy/portfolio/ui/PortfolioMobileScreen";
import { getRequestBaseUrl } from "@/domains/shared/utils/request-base-url";
import { fetchPortfolioIndex } from "@/domains/partnerships/portfolio/server/data-source";

export default async function AcademyPortfolioPage() {
  const baseUrl = await getRequestBaseUrl();
  const dataPromise = fetchPortfolioIndex(baseUrl);

  return (
    <LazyPartnersPageShell initialState={{ activeDrawerSection: "academy" }}>
      <Suspense fallback={<PortfolioFallback />}
      >
        <PortfolioDataBoundary dataPromise={dataPromise} />
      </Suspense>
    </LazyPartnersPageShell>
  );
}

type BoundaryProps = {
  dataPromise: ReturnType<typeof fetchPortfolioIndex>;
};

async function PortfolioDataBoundary({ dataPromise }: BoundaryProps) {
  const { clients, stats } = await dataPromise;
  return <PortfolioMobileScreen clients={clients} stats={stats} />;
}

function PortfolioFallback() {
  return (
    <div className="min-h-screen bg-siso-bg-primary text-siso-text-primary px-4 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-4">
        <div className="h-32 rounded-3xl border border-white/10 bg-white/5 animate-pulse" />
        {[0, 1].map((idx) => (
          <div
            key={`portfolio-skel-${idx}`}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-inner shadow-black/40 animate-pulse space-y-3"
          >
            <div className="h-5 w-1/3 rounded-full bg-white/10" />
            <div className="h-3 w-2/3 rounded-full bg-white/10" />
            <div className="h-32 rounded-2xl bg-white/5" />
          </div>
        ))}
      </div>
    </div>
  );
}
