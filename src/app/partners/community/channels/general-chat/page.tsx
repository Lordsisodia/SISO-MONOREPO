import type { Metadata } from "next";
import { GeneralChatScreen } from "@/domains/partnerships/community/ui/general-chat";

export const metadata: Metadata = {
  title: "General Chat • SISO Partner Community",
  description: "Program-wide channel for quick wins, questions, and updates.",
};

export default function PartnersCommunityGeneralChatPage() {
  return <GeneralChatScreen />;
}
