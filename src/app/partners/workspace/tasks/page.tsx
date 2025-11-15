import type { Metadata } from "next";
import { PartnersPageShell } from "@/domains/partnerships/community/ui/CommunityPageShell";
import { TasksWorkspaceScreen } from "@/domains/partnerships/portal-architecture/workspace/tasks/ui/TasksWorkspaceScreen";

export const metadata: Metadata = {
  title: "Workspace Tasks • SISO Partners",
  description: "Centralized workspace tasks view (coming soon).",
};

export default function PartnersWorkspaceTasksPage() {
  return (
    <PartnersPageShell initialState={{ activeDrawerSection: "workspace" }}>
      <TasksWorkspaceScreen />
    </PartnersPageShell>
  );
}
