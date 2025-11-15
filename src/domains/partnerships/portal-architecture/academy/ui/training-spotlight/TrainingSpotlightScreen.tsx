"use client";

import Link from "next/link";
import { ArrowRight, Clock3, Share2, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HighlightCard } from "@/components/ui/card-5-static";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { useRouter } from "next/navigation";

const spotlight = {
  title: "Discovery Basics",
  lessonPath: "/partners/academy/courses/enterprise-sales-101/lessons/discovery-basics",
  assetPlaybook: "/partners/academy/portfolio/discovery-playbook",
  summary:
    "Shortcuts the first five discovery questions with direct scripts and research prompts that reflect current partner priorities.",
  whyNow:
    "High demand for consultative sales; trending deals are stuck in discovery, so this lesson shows how to level up the first call.",
  outcomes: [
    "Ask five discovery questions that uncover the real decision criteria",
    "Capture the story-based impact format so you can share it with your account team",
    "Close your next discovery call with a clear follow-up plan",
  ],
  previewLabel: "Lesson preview",
  previewCopy:
    "Roll through the first minute to see the opening script. Includes a mini role-play that partners can mirror in Loom recordings.",
  impact: [
    { label: "Pipeline velocity", value: "+12%" },
    { label: "Discovery win rate", value: "+8 pts" },
  ],
  prerequisites: ["Complete Enterprise Sales 101 Course", "Watch the Prospect Intelligence checklist"],
};

const relatedItems = [
  { label: "Customer story: Discovery playbook", href: "/partners/academy/portfolio/discovery-playbook" },
  { label: "Pitch Kit deck: Discovery Sprint", href: "/partners/academy/pitch-kit/decks/discovery-sprint" },
];

export function TrainingSpotlightScreen() {
  const router = useRouter();

  return (
    <main className="bg-siso-bg-primary text-siso-text-primary min-h-screen">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 lg:py-12">
        <HighlightCard
          color="orange"
          title="Training spotlight"
          description="This week’s high-impact lesson so you can unblock discovery deals faster."
          metricValue="Stage 3"
          metricLabel="Enable"
          buttonText="Start lesson"
          onButtonClick={() => router.push(spotlight.lessonPath)}
          icon={<Sparkles className="h-5 w-5 text-siso-orange" />}
          hideDivider
          titleClassName="uppercase tracking-[0.35em] text-white"
          descriptionClassName="text-sm"
        />

        <SettingsGroupCallout
          icon={<Star className="h-4 w-4" />}
          title="Why now"
          subtitle="Tying the lesson to today’s priorities"
          showChevron={false}
        >
          <div className="space-y-3">
            <p className="text-sm font-semibold text-white">{spotlight.title}</p>
            <p className="text-xs text-siso-text-muted">{spotlight.summary}</p>
            <p className="text-[11px] uppercase tracking-[0.3em] text-siso-orange">Current priority</p>
            <p className="text-sm text-white">{spotlight.whyNow}</p>
            <div className="flex flex-wrap gap-2">
              {spotlight.outcomes.map((outcome) => (
                <span key={outcome} className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-siso-text-muted">
                  {outcome}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" onClick={() => router.push(spotlight.lessonPath)}>
                Start lesson
              </Button>
              <Button variant="outline" size="sm" onClick={() => router.push("/partners/academy/saved")}>
                Save to Saved Docs
              </Button>
              <Button variant="ghost" size="sm" className="border border-white/10">
                <Share2 className="h-3 w-3" />
                <span className="ml-1">Copy link</span>
              </Button>
            </div>
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<Clock3 className="h-4 w-4" />}
          title={spotlight.previewLabel}
          subtitle={spotlight.previewCopy}
          showChevron={false}
        >
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-4 text-sm text-siso-text-muted">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[11px] uppercase tracking-[0.3em] text-white/80">Video preview</span>
              </div>
            </div>
          </div>
        </SettingsGroupCallout>

        <div className="grid gap-4 lg:grid-cols-2">
          <SettingsGroupCallout
            icon={<ArrowRight className="h-4 w-4" />}
            title="Impact metrics"
            subtitle="Signals from recent programs"
            showChevron={false}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {spotlight.impact.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/[0.02] p-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-siso-text-muted">{metric.label}</p>
                  <p className="text-lg font-semibold text-white">{metric.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 text-[11px] text-siso-text-muted">
              Data sourced from partner adoption last 30 days; track `view_spotlight` + `start_spotlight` for your telemetry.
            </div>
          </SettingsGroupCallout>

          <SettingsGroupCallout
            icon={<ArrowRight className="h-4 w-4" />}
            title="Need-to-know prep"
            subtitle="Pre-reqs + related proof"
            showChevron={false}
          >
            <div className="space-y-2 text-[11px]">
              <p className="font-semibold text-white">Prerequisites</p>
              <ul className="list-inside list-disc text-siso-text-muted">
                {spotlight.prerequisites.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="font-semibold text-white">Related assets</p>
              <div className="flex flex-wrap gap-2">
                {relatedItems.map((related) => (
                  <Link
                    key={related.href}
                    href={related.href}
                    className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-[11px] text-siso-orange"
                  >
                    <ArrowRight className="h-3 w-3" />
                    {related.label}
                  </Link>
                ))}
              </div>
            </div>
          </SettingsGroupCallout>
        </div>

        <section className="rounded-[26px] border border-white/10 bg-siso-bg-secondary/70 p-5 shadow-[0_15px_40px_rgba(0,0,0,0.3)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.35em] text-siso-text-muted">Next steps</p>
              <h2 className="text-lg font-semibold text-white">Preview the lesson plan</h2>
            </div>
            <Button variant="link" size="sm" className="text-siso-orange" onClick={() => router.push(spotlight.lessonPath)}>
              Open lesson
            </Button>
          </div>
          <ol className="mt-4 space-y-3 text-sm text-siso-text-muted">
            {[
              "Review the discovery script pre-read",
              "Walk through the 5 sample questions",
              "Practice the follow-up template and save to Saved Docs",
            ].map((step) => (
              <li key={step} className="flex items-start gap-2">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/10 text-[12px] text-white">
                  •
                </span>
                {step}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}
