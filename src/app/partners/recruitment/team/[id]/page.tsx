import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { LazyPartnersPageShell } from "@/domains/partnerships/community/ui/LazyPartnersPageShell";
import { HighlightCard } from "@/components/ui/card-5-static";
import { Waves } from "@/components/ui/wave-background";
import { getTeamMemberById } from "@/domains/partnerships/recruitment/team/data/members";
import { TeamMemberProfile } from "../components/TeamMemberProfile";

export default async function TeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = getTeamMemberById(id);

  if (!member) {
    notFound();
  }

  return (
    <LazyPartnersPageShell initialState={{ activeDrawerSection: "recruitment" }} showFloatingNavButton={false}>
      <main className="relative min-h-screen overflow-hidden bg-siso-bg-primary pb-20 text-white">
        <div className="pointer-events-none absolute inset-0 h-full w-full" style={{ filter: "blur(6px)", opacity: 0.8 }}>
          <Waves className="h-full w-full" strokeColor="#f8a75c" backgroundColor="#05050a" pointerSize={0.35} />
        </div>

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col space-y-6 p-4 lg:p-8">
          <div className="relative min-h-[128px]">
            <div className="pointer-events-none absolute inset-y-0 left-3 z-10 flex items-center">
              <Link
                href="/partners/recruitment/team"
                aria-label="Back to team overview"
                className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:text-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </div>
            <HighlightCard
              color="orange"
              title="Team member profile"
              description="Deep dive stats, next actions, and readiness for this rep."
              icon={<span className="text-xl">🧭</span>}
              hideDivider
              showCornerIcon={false}
              titleClassName="uppercase tracking-[0.35em] text-white"
              descriptionClassName="text-sm"
              className="max-w-none pl-12"
            />
          </div>

          <TeamMemberProfile member={member} />
        </div>
      </main>
    </LazyPartnersPageShell>
  );
}
