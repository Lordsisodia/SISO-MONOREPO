"use client";

export const dynamic = 'force-dynamic';

import { HighlightCard } from "@/components/ui/card-5-static";
import { Star } from "lucide-react";

export default function HighlightCardDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <HighlightCard
        title="Highlights"
        description="You are taking fewer sleeps than you usually do by now"
        metricValue="8.3 hrs"
        metricLabel="Daily average last month"
        buttonText="See All"
        onButtonClick={() => alert("See All")}
        icon={<Star className="h-6 w-6" fill="currentColor" />}
      />
    </div>
  );
}
