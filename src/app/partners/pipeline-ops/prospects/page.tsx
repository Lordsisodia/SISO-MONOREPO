import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProspects } from "@/domains/partnerships/portal-architecture/pipeline-ops/application/pipelineOpsService";
import { ProspectsWorkspace } from "./ProspectsWorkspace";
import { LazyPartnersPageShell } from "@/domains/partnerships/community/ui/LazyPartnersPageShell";
import { HighlightCard } from "@/components/ui/card-5-static";
import { Waves } from "@/components/ui/wave-background";

export default async function PartnerProspectsPage() {
  const prospects = await getProspects();

  return (
    <LazyPartnersPageShell initialState={{ activeDrawerSection: "pipeline" }}>
      <div className="relative min-h-screen">
        <div className="pointer-events-none absolute inset-0 z-0" style={{ filter: "blur(5px)", opacity: 0.4 }}>
          <Waves className="h-full w-full" strokeColor="#f8a75c" backgroundColor="transparent" pointerSize={0.25} />
        </div>
        <div className="relative z-10 w-full px-4 pt-8 pb-12 lg:px-8">
          <div className="mx-auto w-full max-w-6xl space-y-6">
            <div className="relative min-h-[128px]">
              <div className="pointer-events-none absolute inset-y-0 left-3 z-10 flex items-center">
                <Link
                  href="/partners/pipeline-ops"
                  aria-label="Back to Pipeline Ops dashboard"
                  className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:text-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </div>
              <HighlightCard
                color="orange"
                title="My Prospects"
                description="View every logged client, filter by stage, and jump into next steps."
                icon={<span className="text-xl">📋</span>}
                hideDivider
                showCornerIcon={false}
                fullWidth
                className="w-full max-w-none pl-12"
                titleClassName="text-lg font-semibold uppercase tracking-[0.32em] text-white sm:text-xl"
                descriptionClassName="text-sm"
              />
            </div>
            <Suspense fallback={<div className="p-10 text-white">Loading prospects…</div>}>
              <ProspectsWorkspace initialProspects={prospects} />
            </Suspense>
          </div>
        </div>
      </div>
    </LazyPartnersPageShell>
  );
}
