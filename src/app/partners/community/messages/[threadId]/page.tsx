import { MobileShell } from "@/domains/partnerships/mobile/ui/MobileShell";

interface ThreadPageProps {
  params: { threadId: string };
}

export default function PartnersCommunityMessageThreadPage({ params }: ThreadPageProps) {
  void params.threadId;

  return <MobileShell initialTab="messages" initialImmersiveMode />;
}
