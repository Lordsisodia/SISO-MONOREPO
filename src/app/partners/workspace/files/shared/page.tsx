import type { Metadata } from "next";
import { PartnersPageShell } from "@/domains/partnerships/community/ui/CommunityPageShell";

export const metadata: Metadata = {
  title: "Workspace Shared Files • SISO Partners",
  description: "Shared workspace file hub.",
};

export default function PartnersWorkspaceSharedFilesPage() {
  return (
    <PartnersPageShell initialState={{ activeDrawerSection: "workspace" }}>
      <section className="space-y-4 p-6 text-sm text-white">
        <h1 className="text-2xl font-semibold">Workspace Shared Files</h1>
        <p>Shared partner assets will ultimately surface here inside the workspace.</p>
      </section>
    </PartnersPageShell>
  );
}
