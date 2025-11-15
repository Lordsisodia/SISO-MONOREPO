"use client";

import { useEffect, useMemo, useState } from "react";
import { Sparkles, CheckCircle2, Clock3, Users } from "lucide-react";
import { HighlightCard } from "@/components/ui/card-5-static";
import { Button } from "@/components/ui/button";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { useRouter } from "next/navigation";
import { courses } from "../courses/data";
import {
  gettingStartedSteps,
  firstLessonPath,
  savedDocsPath,
  coursesPath,
  GettingStartedStep,
} from "./data";

const localStorageKey = "academyOnboarding:completed";
const stepsStorageKey = "academyOnboarding:steps";

function ChecklistItem({ step, onToggle, completed }: { step: GettingStartedStep; onToggle: () => void; completed: boolean }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
      <div className="space-y-1">
        <p className="text-sm font-semibold text-white">
          {completed ? "✓ " : ""}
          {step.title}
        </p>
        <p className="text-xs text-siso-text-muted">{step.description}</p>
      </div>
      <Button size="sm" variant={completed ? "ghost" : "secondary"} className="border border-white/10" onClick={onToggle}>
        {completed ? "✔️ Completed" : step.actionLabel}
      </Button>
    </div>
  );
}

export function GettingStartedScreen() {
  const router = useRouter();
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedFlag = window.localStorage.getItem(localStorageKey);
    if (storedFlag) {
      setIsComplete(storedFlag === "true");
    }
    const storedSteps = window.localStorage.getItem(stepsStorageKey);
    if (storedSteps) {
      try {
        const parsed: string[] = JSON.parse(storedSteps);
        setCompletedSteps(parsed);
      } catch {
        window.localStorage.removeItem(stepsStorageKey);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(localStorageKey, isComplete ? "true" : "false");
    window.localStorage.setItem(stepsStorageKey, JSON.stringify(completedSteps));
  }, [isComplete, completedSteps]);

  const toggleStep = (stepId: string) => {
    setCompletedSteps((prev) => {
      const next = prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId];
      if (next.length === gettingStartedSteps.length) {
        setIsComplete(true);
      } else if (isComplete) {
        setIsComplete(false);
      }
      return next;
    });
  };

  const handleMarkComplete = () => {
    setIsComplete(true);
    setCompletedSteps(gettingStartedSteps.map((step) => step.id));
  };

  const handleSkip = () => {
    setIsSkipped(true);
  };

  const progress = Math.round((completedSteps.length / gettingStartedSteps.length) * 100);
  const nextCourse = courses[0];

  const heroMetric = `${completedSteps.length}/${gettingStartedSteps.length}`;

  return (
    <main className="bg-siso-bg-primary text-siso-text-primary min-h-screen">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 lg:py-12">
        <HighlightCard
          color="orange"
          title="Getting started"
          description="Complete these core onboarding steps to unlock the full Academy experience."
          metricValue={heroMetric}
          metricLabel="steps complete"
          buttonText={isComplete ? "Explore Courses" : "Start first lesson"}
          onButtonClick={() => router.push(firstLessonPath)}
          icon={<Sparkles className="h-5 w-5 text-siso-orange" />}
          hideDivider
          titleClassName="uppercase tracking-[0.35em] text-white"
          descriptionClassName="text-sm"
        />

        {!isComplete && (completedSteps.length > 0 || isSkipped) ? (
          <div className="rounded-[24px] border border-siso-orange/60 bg-siso-orange/10 px-4 py-3 text-sm text-white">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p>Resume where you left off or skip until later.</p>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="border border-white/10" onClick={() => router.push(firstLessonPath)}>
                  Continue lesson
                </Button>
                <Button variant="link" size="sm" className="text-white/70" onClick={handleSkip}>
                  Skip for now
                </Button>
              </div>
            </div>
          </div>
        ) : null}

        <SettingsGroupCallout
          icon={<CheckCircle2 className="h-4 w-4" />}
          title="Checklist"
          subtitle="Complete these three quick steps to finish onboarding."
          showChevron={false}
        >
          <div className="space-y-3">
            {gettingStartedSteps.map((step) => (
              <ChecklistItem
                key={step.id}
                step={step}
                completed={completedSteps.includes(step.id)}
                onToggle={() => toggleStep(step.id)}
              />
            ))}
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-siso-text-muted">
              <span>Progress {progress}%</span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span>{isComplete ? "Onboarding complete" : "Keep going"}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" className="border border-white/10" onClick={handleMarkComplete}>
                Mark complete
              </Button>
              <Button variant="ghost" size="sm" className="border border-white/10" onClick={() => router.push(savedDocsPath)}>
                View Saved Docs
              </Button>
            </div>
          </div>
        </SettingsGroupCallout>

        <div className="grid gap-4 lg:grid-cols-2">
          <SettingsGroupCallout
            icon={<Sparkles className="h-4 w-4" />}
            title="First lesson"
            subtitle="Discovery Basics is waiting."
            showChevron={false}
          >
            <div className="space-y-3">
              <p className="text-sm text-siso-text-muted">Focus: {nextCourse.focus}</p>
              <Button variant="secondary" size="sm" className="border border-white/10" onClick={() => router.push(firstLessonPath)}>
                Start lesson
              </Button>
              <Button variant="ghost" size="sm" className="border border-white/10" onClick={() => router.push(savedDocsPath)}>
                Save to Saved Docs
              </Button>
            </div>
          </SettingsGroupCallout>

          <SettingsGroupCallout
            icon={<Clock3 className="h-4 w-4" />}
            title="Office hours"
            subtitle="Book a 20 min slot if you need a coach."
            showChevron={false}
          >
            <div className="space-y-3">
              <p className="text-xs text-siso-text-muted">Weekdays 9am–7pm local. Avg reply under 5 minutes (Active+ SLA).</p>
              <Button variant="outline" size="sm" className="border border-white/10" onClick={() => router.push("/partners/workspace")}>
                View office hours
              </Button>
              <Button variant="ghost" size="sm" className="border border-white/10" onClick={() => router.push(coursesPath)}>
                Browse Courses
              </Button>
            </div>
          </SettingsGroupCallout>
        </div>

        <SettingsGroupCallout
          icon={<Users className="h-4 w-4" />}
          title="Need help?"
          subtitle="Ask the community or reach Partner Success."
          showChevron={false}
        >
          <div className="flex flex-wrap gap-2">
            <Button variant="ghost" size="sm" className="border border-white/10" onClick={() => router.push("/partners/community/messages?tab=siso")}>
              Message Partner Success
            </Button>
            <Button variant="link" size="sm" className="text-white" onClick={() => router.push("/partners/community/help")}> 
              Open Help Center
            </Button>
          </div>
        </SettingsGroupCallout>
      </div>
    </main>
  );
}
