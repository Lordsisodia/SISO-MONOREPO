import { LazyMobileShell } from "@/domains/partnerships/mobile/ui/LazyMobileShell";

export default async function PartnersCommunityMessageThreadPage({ params }: { params: Promise<{ threadId: string }> }) {
  await params;
  return <LazyMobileShell initialTab="messages" initialImmersiveMode showFloatingNavButton={false} />;
}
