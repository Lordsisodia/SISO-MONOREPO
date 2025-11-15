import type { Metadata } from "next";
import { PartnersPageShell } from "@/domains/partnerships/community/ui/CommunityPageShell";

export const metadata: Metadata = {
  title: "Workspace Notes • SISO Partners",
  description: "Personal workspace notes interface (placeholder).",
};

export default function PartnersWorkspaceNotesPage() {
  return (
    <PartnersPageShell initialState={{ activeDrawerSection: "workspace" }}>
      <section className="space-y-4 p-6 text-sm text-white">
        <h1 className="text-2xl font-semibold">Workspace Notes</h1>
        <p>Coming soon: the dedicated My Notes workspace experience lives here.</p>
      </section>
    </PartnersPageShell>
  );
}
