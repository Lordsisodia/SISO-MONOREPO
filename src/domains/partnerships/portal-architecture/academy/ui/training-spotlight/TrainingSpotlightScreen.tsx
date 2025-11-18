"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HighlightCard } from "@/components/ui/card-5-static";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const FallingPattern = dynamic(
  () =>
    import("@/domains/partnerships/portal-architecture/shared/forlinkpattern/falling-pattern").then(
      (m) => m.FallingPattern,
    ),
  { ssr: false, loading: () => null },
);

const spotlight = {
  title: "SISO Induction",
  lessonPath: "/partners/academy/courses/induction",
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
  rationale: [
    "Recent deals stalled in discovery for >10 days",
    "Matches your role (AE) and tier (Active)",
    "Highest lift on win-rate in last 30 days for peers",
  ],
  durationMinutes: 18,
  difficulty: "Intermediate",
  progress: 42,
  prerequisites: ["Complete Enterprise Sales 101 Course", "Watch the Prospect Intelligence checklist"],
};

const proofAssets = [
  { label: "Customer story: Discovery playbook", href: "/partners/academy/portfolio/discovery-playbook" },
  { label: "Pitch Kit deck: Discovery Sprint", href: "/partners/academy/pitch-kit/decks/discovery-sprint" },
];

export function TrainingSpotlightScreen() {
  const router = useRouter();

  return (
    <main className="bg-siso-bg-primary text-siso-text-primary min-h-screen relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0">
        <FallingPattern className="h-full [mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]" />
      </div>
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 lg:py-12">
        <HighlightCard
          color="orange"
          title="Training spotlight"
          description="Next up in your flow: finish the required induction course."
          metricValue=""
          metricLabel=""
          buttonText=""
          onButtonClick={() => {}}
          icon={<Sparkles className="h-5 w-5 text-siso-orange" />}
          hideDivider
          hideFooter
          titleClassName="uppercase tracking-[0.35em] text-white"
          descriptionClassName="text-sm"
        />

        <SettingsGroupCallout
          icon={<ArrowRight className="h-4 w-4" />}
          title="Next course"
          subtitle="Jump to the next required step"
          showChevron={false}
        >
          <div className="rounded-3xl border border-white/10 siso-inner-card p-4 shadow-[0_15px_40px_rgba(0,0,0,0.25)]">
            <div className="space-y-3 text-sm text-siso-text-muted">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-white text-base font-semibold">{spotlight.title}</p>
                  <p className="text-xs">You’re {spotlight.progress}% through this requirement.</p>
                </div>
                <Button variant="secondary" size="sm" onClick={() => router.push(spotlight.lessonPath)}>
                  Go to course
                </Button>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3">
                <div className="flex items-center justify-between text-xs text-siso-text-muted">
                  <span>Progress</span>
                  <span className="text-white font-semibold">{spotlight.progress}%</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-500"
                    style={{ width: `${spotlight.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<Star className="h-4 w-4" />}
          title="Why now"
          subtitle="Tying the lesson to today’s priorities"
          showChevron={false}
        >
          <div className="rounded-3xl border border-white/10 siso-inner-card p-4 shadow-[0_15px_40px_rgba(0,0,0,0.25)] space-y-3">
            <p className="text-sm font-semibold text-white">{spotlight.title}</p>
            <p className="text-xs text-siso-text-muted">{spotlight.summary}</p>
            <p className="text-[11px] uppercase tracking-[0.3em] text-siso-orange">Current priority</p>
            <p className="text-sm text-white">{spotlight.whyNow}</p>
            <div className="space-y-1 text-sm text-siso-text-muted">
              {spotlight.rationale.map((reason) => (
                <div key={reason} className="flex items-start gap-2">
                  <span className="mt-[2px] h-1.5 w-1.5 rounded-full bg-siso-orange" />
                  <span>{reason}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {spotlight.outcomes.map((outcome) => (
                <span key={outcome} className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-siso-text-muted">
                  {outcome}
                </span>
              ))}
            </div>
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<ArrowRight className="h-4 w-4" />}
          title="Need-to-know prep"
          subtitle="Pre-reqs + related proof"
          showChevron={false}
        >
          <div className="rounded-3xl border border-white/10 siso-inner-card p-4 shadow-[0_15px_40px_rgba(0,0,0,0.25)] space-y-2 text-[11px]">
            <p className="font-semibold text-white">Prerequisites</p>
            <ul className="list-inside list-disc text-siso-text-muted">
              {spotlight.prerequisites.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="pt-2 font-semibold text-white">Post-lesson proof to send</p>
            <div className="flex flex-wrap gap-2">
              {proofAssets.map((related) => (
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

        <SettingsGroupCallout
          icon={<Sparkles className="h-4 w-4" />}
          title="Next steps"
          subtitle="Preview the lesson plan"
          showChevron={false}
        >
          <div className="rounded-3xl border border-white/10 siso-inner-card p-4 shadow-[0_15px_40px_rgba(0,0,0,0.25)]">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.35em] text-siso-text-muted">Stay on track</p>
              <Button variant="link" size="sm" className="text-siso-orange" onClick={() => router.push(spotlight.lessonPath)}>
                Open lesson
              </Button>
            </div>
            <ol className="mt-3 space-y-3 text-sm text-siso-text-muted">
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
          </div>
        </SettingsGroupCallout>
      </div>
    </main>
  );
}
