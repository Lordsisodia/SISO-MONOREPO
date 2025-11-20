import { redirect } from "next/navigation";

export default async function PartnersMessageThreadPage({ params }: { params: Promise<{ threadId: string }> }) {
  const { threadId } = await params;
  redirect(`/partners/community/messages/${encodeURIComponent(threadId)}`);
}
