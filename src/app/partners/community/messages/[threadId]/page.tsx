import { LazyMobileShell } from "@/domains/partnerships/mobile/ui/LazyMobileShell";

interface ThreadPageProps {
  params: { threadId: string };
}

export default function PartnersCommunityMessageThreadPage({ params }: ThreadPageProps) {
  void params.threadId;

  return <LazyMobileShell initialTab="messages" initialImmersiveMode showFloatingNavButton={false} />;
}
