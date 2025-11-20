import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft, CheckCircle2, Clock, Sparkles } from "lucide-react";

import { Waves } from "@/components/ui/wave-background";
import { HighlightCard } from "@/components/ui/card-5-static";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/domains/shared/utils/cn";
import { courses } from "./data";

function moduleStatus(progress: number) {
  if (progress >= 100) return { label: "Done", tone: "success" as const };
  if (progress > 0) return { label: "In progress", tone: "info" as const };
  return { label: "Not started", tone: "muted" as const };
}

export function CourseProgramScreen({ courseId }: { courseId: string }) {
  const program = courses.find((c) => c.id === courseId);
  if (!program) return notFound();

  const modules = courses
    .filter((m) => m.moduleOf === courseId)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

  return (
    <main className="relative min-h-screen bg-siso-bg-primary text-siso-text-primary overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ filter: "blur(6px)", opacity: 0.9 }}
      >
        <Waves className="h-full w-full" strokeColor="#f8a75c" backgroundColor="#0b0b0f" pointerSize={0.35} />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 lg:py-12">
        <div className="relative min-h-[128px]">
          <div className="pointer-events-none absolute inset-y-0 left-3 z-10 flex items-center">
            <Link
              href="/partners/academy/courses"
              className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center text-white transition hover:text-white/80"
              aria-label="Back to catalog"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </div>
          <HighlightCard
            color="orange"
            title={program.title}
            description={program.longDescription ?? program.overview}
            icon={<Sparkles className="h-5 w-5 text-siso-orange" />}
            hideDivider
            className="pl-12"
            titleClassName="uppercase tracking-[0.3em] text-white"
            descriptionClassName="text-sm"
          >
            <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-white/70">
              <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                <Clock className="h-3.5 w-3.5" />
                {program.duration}
              </span>
              {program.legend ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  {program.legend}
                </span>
              ) : null}
            </div>
          </HighlightCard>
        </div>

        <SettingsGroupCallout
          icon={<Sparkles className="h-4 w-4" />}
          title="Chapters"
          subtitle="Open a chapter to view its lessons and track completion."
          showChevron={false}
        >
          <div className="space-y-3">
            {modules.map((mod) => {
              const status = moduleStatus(mod.progress);
              return (
                <article
                  key={mod.id}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 shadow-[0_14px_35px_rgba(0,0,0,0.35)]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-siso-orange/15 px-2 py-[2px] text-[10px] font-semibold uppercase tracking-[0.25em] text-siso-orange">
                          {mod.level}
                        </span>
                        {mod.duration ? (
                          <Badge className="border-white/20 bg-white/10 text-white/80">{mod.duration}</Badge>
                        ) : null}
                        <Badge
                          className={cn(
                            "flex items-center gap-1 border-white/15 bg-white/8 text-[11px]",
                            status.tone === "success" && "border-emerald-400/50 bg-emerald-400/15 text-emerald-100",
                            status.tone === "info" && "border-blue-400/40 bg-blue-400/10 text-blue-50",
                            status.tone === "muted" && "text-white/70",
                          )}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          {status.label}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold text-white">{mod.title}</h3>
                      <p className="text-sm text-siso-text-muted leading-relaxed">{mod.overview}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Link
                        href={`/partners/academy/courses/modules/${mod.id}`}
                        className="inline-flex items-center gap-2 rounded-2xl border border-white/12 bg-white/8 px-3 py-2 text-sm text-white hover:border-siso-orange"
                      >
                        Open chapter
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <p className="text-[11px] uppercase tracking-[0.25em] text-siso-text-muted">
                        {mod.lessons.length} lessons
                      </p>
                    </div>
                  </div>

                  {mod.lessons.length ? (
                    <div className="mt-3 grid gap-2 md:grid-cols-2">
                      {mod.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex items-start gap-2 rounded-2xl border border-white/10 bg-black/25 px-3 py-2 text-sm text-white/90"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-siso-orange" />
                          <div className="min-w-0">
                            <p className="font-semibold leading-tight">{lesson.title}</p>
                            <p className="text-[12px] text-siso-text-muted leading-tight">
                              {lesson.duration} • {lesson.summary}
                            </p>
                          </div>
                          <Link
                            href={`/partners/academy/courses/modules/${mod.id}/${lesson.id}`}
                            className="ml-auto text-[11px] uppercase tracking-[0.25em] text-siso-orange"
                          >
                            Open
                          </Link>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </SettingsGroupCallout>
      </div>
    </main>
  );
}
