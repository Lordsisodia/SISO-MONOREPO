import type { Metadata } from "next";
import { LazyPartnersPageShell } from "@/domains/partnerships/community/ui/LazyPartnersPageShell";
import { TasksWorkspaceScreen } from "@/domains/partnerships/portal-architecture/workspace/tasks/ui/TasksWorkspaceScreen";

export const metadata: Metadata = {
  title: "Workspace Tasks • SISO Partners",
  description: "Centralized workspace tasks view (coming soon).",
};

export default function PartnersWorkspaceTasksPage() {
  return (
    <LazyPartnersPageShell initialState={{ activeDrawerSection: "workspace" }}>
      <TasksWorkspaceScreen />
    </LazyPartnersPageShell>
  );
}
