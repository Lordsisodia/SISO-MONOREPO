import type { Metadata } from "next";
import { LazyPartnersPageShell } from "@/domains/partnerships/community/ui/LazyPartnersPageShell";

export const metadata: Metadata = {
  title: "Workspace Notes • SISO Partners",
  description: "Personal workspace notes interface (placeholder).",
};

export default function PartnersWorkspaceNotesPage() {
  return (
    <LazyPartnersPageShell initialState={{ activeDrawerSection: "workspace" }}>
      <section className="space-y-4 p-6 text-sm text-white">
        <h1 className="text-2xl font-semibold">Workspace Notes</h1>
        <p>Coming soon: the dedicated My Notes workspace experience lives here.</p>
      </section>
    </LazyPartnersPageShell>
  );
}
