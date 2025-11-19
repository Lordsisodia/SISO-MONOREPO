import { notFound } from "next/navigation";
import { PartnersPageShell } from "@/domains/partnerships/community/ui/CommunityPageShell";
import { HighlightCard } from "@/components/ui/card-5-static";
import { Waves } from "@/components/ui/wave-background";
import { getProspectById } from "@/domains/partnerships/portal-architecture/pipeline-ops/application/pipelineOpsService";
import { ProspectDetailWorkspace } from "@/app/partners/pipeline-ops/components/ProspectDetailWorkspace";

interface ProspectRecordPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProspectRecordPage({ params }: ProspectRecordPageProps) {
  const { id } = await params;
  const prospect = await getProspectById(id);

  if (!prospect) {
    notFound();
  }

  return (
    <PartnersPageShell initialState={{ activeDrawerSection: "pipeline" }}>
      <main className="relative min-h-screen overflow-hidden bg-siso-bg-primary pb-20 text-white">
        <div className="pointer-events-none absolute inset-0 h-full w-full" style={{ filter: "blur(6px)", opacity: 0.8 }}>
          <Waves className="h-full w-full" strokeColor="#f8a75c" backgroundColor="#05060c" pointerSize={0.35} />
        </div>

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col space-y-6 p-4 lg:p-8">
          <HighlightCard
            color="orange"
            title="Prospect record"
            description="Deep dive on contact details, stages, and next actions before you promote to Active Deals."
            icon={<span className="text-xl">📋</span>}
            hideDivider
            showCornerIcon={false}
            titleClassName="uppercase tracking-[0.35em] text-white"
            descriptionClassName="text-sm"
            className="max-w-none"
          />

          <ProspectDetailWorkspace prospect={prospect} />
        </div>
      </main>
    </PartnersPageShell>
  );
}
