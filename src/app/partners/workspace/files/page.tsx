import type { Metadata } from "next";
import { WorkspaceFilesContent } from "./FilesContent";

export const metadata: Metadata = {
  title: "Workspace Files • SISO Partners",
  description: "Unified workspace storage for personal, client, and shared documents.",
};

export default function PartnersWorkspaceFilesPage() {
  return <WorkspaceFilesContent />;
}
