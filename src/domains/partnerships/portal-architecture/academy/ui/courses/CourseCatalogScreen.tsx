"use client";

import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, Bookmark, Filter, Play, Sparkles } from "lucide-react";
import { HighlightCard } from "@/components/ui/card-5-static";
import { Button } from "@/components/ui/button";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { CustomDropdown } from "@/domains/partnerships/portal-architecture/settings/general/ui/CustomDropdown";
import { courses, type CourseCategory } from "./data";
import { cn } from "@/domains/shared/utils/cn";
import { Waves } from "@/components/ui/wave-background";

const levels = ["all", "beginner", "intermediate", "advanced"] as const;
const statuses = ["all", "not-started", "in-progress", "completed"] as const;

const deriveStatus = (progress: number) => {
  if (progress <= 0) return "not-started";
  if (progress >= 100) return "completed";
  return "in-progress";
};

const derivedCourses = courses.map((course) => ({
  ...course,
  status: deriveStatus(course.progress),
  recommended: course.trending,
}));

export function CourseCatalogScreen() {
  return (
    <main className="bg-siso-bg-primary text-siso-text-primary min-h-screen relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0" style={{ filter: "blur(4px)", opacity: 0.6 }}>
        <Suspense fallback={<div className="h-full w-full bg-[#050505]" aria-hidden="true" />}>
          <Waves className="h-full w-full" strokeColor="#ffa94d" backgroundColor="#050505" pointerSize={0.25} />
        </Suspense>
      </div>
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 lg:py-12">
        <HighlightCard
          color="orange"
          title="Courses catalog"
          description="Stick to the plan with curated learning paths and on-demand lessons."
          metricValue="22"
          metricLabel="Courses live"
          buttonText="View saved"
          buttonHref="/partners/academy/saved"
          icon={<Sparkles className="h-5 w-5 text-siso-orange" />}
          hideDivider
          hideFooter={false}
          titleClassName="uppercase tracking-[0.35em] text-white"
          descriptionClassName="text-sm"
          fullWidth
        />

        <FilterControls />

        <div className="grid gap-6 lg:grid-cols-2">
          {derivedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </main>
  );
}

function FilterControls() {
  return (
    <SettingsGroupCallout icon={<Filter className="h-4 w-4" />} title="Filter" subtitle="Choose level + status" showChevron={false}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">Level</p>
          <CustomDropdown
            options={levels.map((level) => ({ label: level, value: level }))}
            value={levels[0]}
            onChange={() => undefined}
            searchable={false}
            disabled
            allowCustom={false}
          />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">Status</p>
          <CustomDropdown
            options={statuses.map((status) => ({ label: status, value: status }))}
            value={statuses[0]}
            onChange={() => undefined}
            searchable={false}
            disabled
            allowCustom={false}
          />
        </div>
      </div>
    </SettingsGroupCallout>
  );
}

function CourseCard({ course }: { course: (typeof derivedCourses)[number] }) {
  const levelLabel = course.level[0].toUpperCase() + course.level.slice(1);
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 shadow-[0_20px_45px_rgba(0,0,0,0.3)] flex flex-col gap-4">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <Sparkles className="h-4 w-4 text-siso-orange" />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-siso-orange/15 px-2 py-[2px] text-[10px] font-semibold uppercase tracking-[0.25em] text-siso-orange">
                {levelLabel}
              </span>
              <span className="rounded-full border border-white/10 px-2 py-[2px] text-[10px] uppercase tracking-[0.25em] text-siso-text-muted">
                {course.industry}
              </span>
              {course.recommended ? (
                <span className="rounded-full bg-white/10 px-2 py-[2px] text-[10px] uppercase tracking-[0.25em] text-white">
                  Recommended
                </span>
              ) : null}
              <span className="rounded-full bg-white/5 px-2 py-[2px] text-[10px] uppercase tracking-[0.25em] text-siso-text-muted">
                {course.status.replace("-", " ")}
              </span>
            </div>
            <h3 className="mt-2 text-xl font-semibold text-white">{course.title}</h3>
            <p className="text-sm text-siso-text-muted">{course.overview}</p>
          </div>
        </div>
        <div className="text-xs text-siso-text-muted">{course.duration}</div>
      </header>

      <div className="h-2.5 rounded-full bg-white/5">
        <div
          className={cn("h-full rounded-full", course.progress >= 100 ? "bg-emerald-400" : "bg-siso-orange")}
          style={{ width: `${course.progress}%` }}
        />
      </div>
      <p className="text-xs text-siso-text-muted">{course.progress}% complete • {course.legend}</p>

      <div className="flex flex-wrap items-center gap-2 text-[11px]">
        {(course.tags ?? []).slice(0, 2).map((tag) => (
          <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-siso-text-muted">
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button asChild variant="secondary" size="sm" className="border border-white/10">
          <Link href={`/partners/academy/courses/${course.id}`} className="inline-flex items-center gap-1 text-xs">
            <Play className="h-3.5 w-3.5" /> Start
          </Link>
        </Button>
        <Button asChild variant="ghost" size="sm" className="border border-white/10">
          <Link href={`/partners/academy/saved?add=${course.id}`}>
            <Bookmark className="h-4 w-4" /> Save
          </Link>
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 text-[11px]">
        {(course.relatedAssets ?? []).map((asset) => (
          <Link key={asset.href} href={asset.href} className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-siso-text-muted">
            <ArrowRight className="h-3 w-3" /> {asset.label}
          </Link>
        ))}
      </div>
    </article>
  );
}
