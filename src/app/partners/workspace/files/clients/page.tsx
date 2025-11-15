import type { Metadata } from "next";
import { PartnersPageShell } from "@/domains/partnerships/community/ui/CommunityPageShell";

export const metadata: Metadata = {
  title: "Workspace Client Files • SISO Partners",
  description: "Deal-specific workspace storage.",
};

export default function PartnersWorkspaceClientFilesPage() {
  return (
    <PartnersPageShell initialState={{ activeDrawerSection: "workspace" }}>
      <section className="space-y-4 p-6 text-sm text-white">
        <h1 className="text-2xl font-semibold">Workspace Client Files</h1>
        <p>Client-specific documents and approvals will live at this route.</p>
      </section>
    </PartnersPageShell>
  );
}
