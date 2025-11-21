import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { earningsChallenges } from "@/domains/partnerships/earnings/data/earningsChallenges";
import { ChallengeDetailScreen } from "@/domains/partnerships/earnings/ui/challenges/ChallengeDetailScreen";
import { EarningsPageShell } from "@/domains/partnerships/earnings/ui/components/EarningsPageShell";

type ChallengeDetailPageProps = {
  params: { challengeId: string } | Promise<{ challengeId: string }>;
};

export async function generateMetadata({ params }: ChallengeDetailPageProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const challenge = earningsChallenges.find((c) => c.id === resolvedParams.challengeId);
  if (!challenge) {
    return {
      title: "Challenge • Earnings",
      description: "Explore challenge details and rewards.",
    };
  }

  return {
    title: `${challenge.name} • Earnings`,
    description: challenge.description,
  };
}

export default async function ChallengeDetailPage({ params }: ChallengeDetailPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const challenge = earningsChallenges.find((c) => c.id === resolvedParams.challengeId);

  if (!challenge) {
    notFound();
  }

  return (
    <EarningsPageShell>
      <ChallengeDetailScreen challenge={challenge} />
    </EarningsPageShell>
  );
}
