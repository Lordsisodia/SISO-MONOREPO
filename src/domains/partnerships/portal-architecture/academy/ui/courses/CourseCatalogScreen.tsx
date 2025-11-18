"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bookmark, Sparkles, Play } from "lucide-react";
import { HighlightCard } from "@/components/ui/card-5-static";
import { Button } from "@/components/ui/button";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { CustomDropdown } from "@/domains/partnerships/portal-architecture/settings/general/ui/CustomDropdown";
import { courses, type CourseCategory } from "./data";
import { cn } from "@/domains/shared/utils/cn";
import dynamic from "next/dynamic";

const FallingPattern = dynamic(
  () =>
    import("@/domains/partnerships/portal-architecture/shared/forlinkpattern/falling-pattern").then(
      (m) => m.FallingPattern,
    ),
  { ssr: false, loading: () => null },
);

const levels = ["all", "beginner", "intermediate", "advanced"] as const;
const statuses = ["all", "not-started", "in-progress", "completed"] as const;

const deriveStatus = (progress: number) => {
  if (progress <= 0) return "not-started";
  if (progress >= 100) return "completed";
  return "in-progress";
};

type DerivedCourse = (typeof courses)[number] & {
  status: (typeof statuses)[number];
  recommended?: boolean;
};

const derivedCourses: DerivedCourse[] = courses.map((course) => ({
  ...course,
  status: deriveStatus(course.progress) as (typeof statuses)[number],
  recommended: course.trending,
}));

function CourseCard({
  course,
  saved,
  onToggleSave,
  onCopyLink,
}: {
  course: DerivedCourse;
  saved: boolean;
  onToggleSave: () => void;
  onCopyLink: () => void;
}) {
  const levelLabel = course.level[0].toUpperCase() + course.level.slice(1);
  return (
    <article className="w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-5 shadow-[0_20px_45px_rgba(0,0,0,0.3)] flex flex-col min-h-[360px]">
      <header className="flex min-w-0 flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <Sparkles className="h-4 w-4 text-siso-orange" />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs uppercase tracking-[0.3em] text-siso-text-muted">
                {levelLabel}
              </p>
              <span className="rounded-full border border-white/15 px-2 py-[2px] text-[10px] uppercase tracking-[0.25em] text-siso-text-muted">
                {course.industry}
              </span>
              {course.recommended ? (
                <span className="rounded-full bg-siso-orange/15 px-2 py-[2px] text-[10px] font-semibold uppercase tracking-[0.25em] text-siso-orange">
                  Recommended
                </span>
              ) : null}
              <span className="rounded-full bg-white/5 px-2 py-[2px] text-[10px] uppercase tracking-[0.25em] text-siso-text-muted">
                {course.status.replace("-", " ")}
              </span>
            </div>
            <h3 className="mt-1 text-xl font-semibold leading-tight text-white break-words">
              {course.title}
            </h3>
            <p className="mt-2 text-sm text-siso-text-muted break-words leading-relaxed">
              {course.overview}
            </p>
          </div>
        </div>
        <div className="text-right text-[11px] uppercase tracking-[0.3em] text-siso-text-muted">
          {course.duration}
        </div>
      </header>

      <div className="mt-4 flex flex-wrap gap-2">
        {(course.tags ?? []).slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-siso-text-muted"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-4 h-2.5 rounded-full bg-white/5">
        <div
          className={cn(
            "h-full rounded-full",
            course.progress >= 100 ? "bg-emerald-400" : "bg-siso-orange",
          )}
          style={{ width: `${course.progress}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-siso-text-muted">
        {course.progress}% complete • {course.legend}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Button
          asChild
          variant="secondary"
          size="sm"
          className="border border-white/10 px-3"
          aria-label="Start or resume"
        >
          <Link href={`/partners/academy/courses/${course.id}`} className="inline-flex items-center gap-1">
            <Play className="h-3.5 w-3.5" />
            <span className="text-xs">Start</span>
          </Link>
        </Button>
        <Button
          variant={saved ? "default" : "ghost"}
          size="icon"
          className={cn(
            "border border-white/10 h-9 w-9",
            saved ? "bg-siso-orange/20 text-white" : "",
          )}
          aria-label={saved ? "Saved" : "Save"}
          onClick={onToggleSave}
        >
          <Bookmark className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="border border-white/10 h-9 w-9"
          aria-label="Copy link"
          onClick={onCopyLink}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
        {(course.relatedAssets ?? []).map((asset) => (
          <Link
            key={asset.href}
            href={asset.href}
            className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-siso-text-muted hover:border-white/30"
          >
            <Sparkles className="h-3 w-3" />
            {asset.label}
          </Link>
        ))}
      </div>
    </article>
  );
}

function EssentialsProgramCard({
  program,
  modules,
  saved,
  onToggleSave,
  onCopyLink,
}: {
  program: DerivedCourse;
  modules: DerivedCourse[];
  saved: boolean;
  onToggleSave: () => void;
  onCopyLink: () => void;
}) {
  const levelLabel = program.level[0].toUpperCase() + program.level.slice(1);
  return (
    <article className="w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_45px_rgba(0,0,0,0.3)]">
      <header className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <Sparkles className="h-4 w-4 text-siso-orange" />
          </span>
          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-siso-orange/15 px-2 py-[2px] text-[10px] font-semibold uppercase tracking-[0.25em] text-siso-orange">
                {levelLabel}
              </span>
              {program.legend ? (
                <span className="rounded-full border border-white/15 px-2 py-[2px] text-[10px] uppercase tracking-[0.2em] text-siso-text-muted">
                  {program.legend}
                </span>
              ) : null}
            </div>
            <h3 className="text-2xl font-semibold leading-tight text-white break-words">
              {program.title}
            </h3>
            <p className="max-w-xl text-sm leading-relaxed text-siso-text-muted">
              {program.overview}
            </p>
          </div>
        </div>
      </header>

      <div className="mt-4 grid gap-2 sm:flex sm:items-center sm:gap-3">
        <Button
          variant={saved ? "default" : "secondary"}
          size="sm"
          className="border border-white/10 w-full sm:w-auto"
          onClick={onToggleSave}
        >
          {saved ? "Saved" : "Save program"}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="border border-white/10 w-full sm:w-auto"
          onClick={onCopyLink}
        >
          <ArrowRight className="h-3 w-3" />
          <span className="ml-1">Copy link</span>
        </Button>
      </div>

      <div className="mt-6 space-y-3">
        {modules.map((module) => (
          <Link
            key={module.id}
            href={`/partners/academy/courses/${module.id}`}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-siso-text-muted hover:border-white/30"
          >
            <div className="min-w-0">
              <p className="font-semibold text-white">{module.title}</p>
              <p className="text-[11px] text-siso-text-muted">{module.duration} • {module.overview}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-siso-text-muted" />
          </Link>
        ))}
      </div>
    </article>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-3xl border border-white/5 bg-white/[0.02] p-5">
      <div className="flex justify-between">
        <div className="h-4 w-32 rounded bg-white/10" />
        <div className="h-4 w-12 rounded bg-white/10" />
      </div>
      <div className="mt-3 h-5 w-56 rounded bg-white/10" />
      <div className="mt-2 h-3 w-72 rounded bg-white/10" />
      <div className="mt-4 h-2.5 rounded-full bg-white/10" />
      <div className="mt-4 flex gap-2">
        <div className="h-7 w-20 rounded-full bg-white/10" />
        <div className="h-7 w-24 rounded-full bg-white/10" />
      </div>
    </div>
  );
}

export function CourseCatalogScreen() {
  const [search, setSearch] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<(typeof levels)[number]>("all");
  const [selectedStatus, setSelectedStatus] = useState<(typeof statuses)[number]>("all");
  const [savedMap, setSavedMap] = useState<Record<string, boolean>>({});
  const [isLoading] = useState(false); // placeholder until wired to API loading

  const filteredCourses = useMemo(() => {
    return derivedCourses
      .filter((course) => {
        const matchesSearch =
          course.title.toLowerCase().includes(search.toLowerCase()) ||
          course.overview.toLowerCase().includes(search.toLowerCase()) ||
          course.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
        const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
        const matchesStatus = selectedStatus === "all" || course.status === selectedStatus;
        return matchesSearch && matchesLevel && matchesStatus;
      })
      // retain deterministic but simple ordering by title for now
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [search, selectedLevel, selectedStatus]);

  const handleCopyLink = (courseId: string) => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/partners/academy/courses/${courseId}`
        : `/partners/academy/courses/${courseId}`;
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
  };

  const handleToggleSave = (courseId: string) => {
    setSavedMap((prev) => ({ ...prev, [courseId]: !prev[courseId] }));
  };

  const essentialsProgram = filteredCourses.find((c) => c.id === "siso-essentials-program");
  const essentialsModules = filteredCourses
    .filter((c) => c.moduleOf === "siso-essentials-program")
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

  const rails: { key: CourseCategory; title: string; subtitle: string; courses: DerivedCourse[]; icon: React.ReactNode }[] = [
    {
      key: "siso-essentials",
      title: "SISO Essentials",
      subtitle: "Guided steps to learn the app fast.",
      courses: essentialsProgram ? [essentialsProgram] : [],
      icon: <Sparkles className="h-4 w-4" />,
    },
    {
      key: "sales-foundations",
      title: "Sales Foundations",
      subtitle: "Core enterprise/SaaS selling plays.",
      courses: filteredCourses
        .filter((c) => c.category === "sales-foundations")
        .sort((a, b) => (a.order ?? 99) - (b.order ?? 99)),
      icon: <Play className="h-4 w-4" />,
    },
    {
      key: "lead-gen",
      title: "Lead Gen & Pipeline",
      subtitle: "Prospecting, messaging, cadences, pipeline health.",
      courses: filteredCourses
        .filter((c) => c.category === "lead-gen")
        .sort((a, b) => (a.order ?? 99) - (b.order ?? 99)),
      icon: <ArrowRight className="h-4 w-4" />,
    },
    {
      key: "recruit-partners",
      title: "Recruit Partners",
      subtitle: "Source, vet, and activate new partners.",
      courses: filteredCourses
        .filter((c) => c.category === "recruit-partners")
        .sort((a, b) => (a.order ?? 99) - (b.order ?? 99)),
      icon: <Bookmark className="h-4 w-4" />,
    },
    {
      key: "new-trending",
      title: "New & Trending",
      subtitle: "Most-started picks this week.",
      courses: filteredCourses
        .filter((c) => c.trending)
        .sort((a, b) => (a.order ?? 99) - (b.order ?? 99)),
      icon: <Sparkles className="h-4 w-4" />,
    },
  ];

  return (
    <main className="bg-siso-bg-primary text-siso-text-primary min-h-screen overflow-x-hidden relative">
      <div className="pointer-events-none absolute inset-0 z-0">
        <FallingPattern className="h-full [mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]" />
      </div>
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 lg:py-12">
        <HighlightCard
          color="orange"
          title="Courses"
          description="Structured learning, tracked progress, and the assets you need to close faster."
          icon={<Sparkles className="h-5 w-5 text-siso-orange" />}
          hideDivider
          titleClassName="uppercase tracking-[0.35em] text-white"
          descriptionClassName="text-sm"
        />

        <SettingsGroupCallout
          icon={<Sparkles className="h-4 w-4" />}
          title="Search & filters"
          subtitle="Find a course by level, status, or keyword."
          showChevron={false}
        >
          <div className="rounded-[20px] border border-white/10 bg-white/5 p-4 space-y-4">
            <label className="block">
              <span className="sr-only">Search courses</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by keyword, tag, or lesson"
                className="w-full rounded-2xl border border-white/15 bg-black/25 px-4 py-2.5 text-sm text-white placeholder:text-siso-text-muted focus:border-siso-orange focus:outline-none"
              />
            </label>

            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              <CustomDropdown
                options={levels.map((level) => ({ value: level, label: level === "all" ? "All levels" : level }))}
                value={selectedLevel}
                onChange={(value) => setSelectedLevel(value as (typeof levels)[number])}
                className="w-full"
                placeholder="Level"
                searchable={false}
                allowCustom={false}
              />
              <CustomDropdown
                options={statuses.map((status) => ({
                  value: status,
                  label: status === "all" ? "All statuses" : status.replace("-", " "),
                }))}
                value={selectedStatus}
                onChange={(value) => setSelectedStatus(value as (typeof statuses)[number])}
                className="w-full"
                placeholder="Status"
                searchable={false}
                allowCustom={false}
              />
            </div>
          </div>
        </SettingsGroupCallout>

        <div className="space-y-8">
          {rails.map((rail) =>
            rail.courses.length ? (
              <SettingsGroupCallout
                key={rail.key}
                icon={rail.icon}
                title={rail.title}
                subtitle={rail.subtitle}
                showChevron={false}
              >
                {rail.key === "siso-essentials" && essentialsProgram ? (
                  <EssentialsProgramCard
                    program={essentialsProgram}
                    modules={essentialsModules}
                    saved={!!savedMap[essentialsProgram.id]}
                    onToggleSave={() => handleToggleSave(essentialsProgram.id)}
                    onCopyLink={() => handleCopyLink(essentialsProgram.id)}
                  />
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {rail.courses.map((course) => (
                      <CourseCard
                        key={course.id}
                        course={course}
                        saved={!!savedMap[course.id]}
                        onToggleSave={() => handleToggleSave(course.id)}
                        onCopyLink={() => handleCopyLink(course.id)}
                      />
                    ))}
                  </div>
                )}
              </SettingsGroupCallout>
            ) : null,
          )}
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.02] p-6 text-center">
            <p className="text-sm text-siso-text-muted">
              No exact match — try adjusting filters or clearing search.
            </p>
            <div className="mt-3 flex justify-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="border border-white/10"
                onClick={() => {
                  setSelectedLevel("all");
                  setSelectedStatus("all");
                  setSearch("");
                }}
              >
                Reset filters
              </Button>
              <Button asChild variant="secondary" size="sm" className="border border-white/10">
                <Link href="/partners/academy/training-spotlight">See spotlight picks</Link>
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
