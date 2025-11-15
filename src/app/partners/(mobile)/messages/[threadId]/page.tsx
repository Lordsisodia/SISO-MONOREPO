import { redirect } from "next/navigation";

interface ThreadPageProps {
  params: { threadId: string };
}

export default function PartnersMessageThreadPage({ params }: ThreadPageProps) {
  redirect(`/partners/community/messages/${encodeURIComponent(params.threadId)}`);
}
