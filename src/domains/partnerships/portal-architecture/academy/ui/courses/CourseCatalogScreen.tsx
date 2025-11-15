"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Sparkles, Filter, Bookmark, ArrowRight } from "lucide-react";
import { HighlightCard } from "@/components/ui/card-5-static";
import { Button } from "@/components/ui/button";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { courses } from "./data";
import { cn } from "@/domains/shared/utils/cn";
import { useRouter } from "next/navigation";

const levels = ["all", "beginner", "intermediate", "advanced"] as const;
const industries = ["all", "SaaS", "Marketing", "Startup"] as const;
const sortOptions = [
  { value: "progress", label: "Progress" },
  { value: "duration", label: "Duration" },
  { value: "level", label: "Level" },
];

const parseDurationValue = (duration: string) => {
  const numeric = duration.replace(/[^\\d.]/g, "");
  return Number(numeric) || 0;
};

function CourseCard({ course }: { course: typeof courses[number] }) {
  const levelLabel = course.level[0].toUpperCase() + course.level.slice(1);
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 shadow-[0_20px_45px_rgba(0,0,0,0.3)]">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-siso-text-muted">{levelLabel}</p>
          <h3 className="mt-1 text-xl font-semibold text-white">{course.title}</h3>
          <p className="mt-2 text-sm text-siso-text-muted">{course.overview}</p>
        </div>
        <div className="text-right text-[11px] uppercase tracking-[0.3em] text-siso-text-muted">{course.duration}</div>
      </header>
      <div className="mt-4 flex flex-wrap gap-2">
        {course.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-siso-text-muted">
            #{tag}
          </span>
        ))}
      </div>
      <div className="mt-4 h-2.5 rounded-full bg-white/5">
        <div className="h-full rounded-full bg-siso-orange" style={{ width: `${course.progress}%` }} />
      </div>
      <p className="mt-2 text-xs text-siso-text-muted">{course.progress}% complete • {course.legend}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          asChild
          variant="secondary"
          size="sm"
          className="border border-white/10"
        >
          <Link href={`/partners/academy/courses/${course.id}`}>Start / Resume</Link>
        </Button>
        <Button variant="ghost" size="sm" className="border border-white/10">
          <Bookmark className="h-3 w-3" />
          <span className="ml-1">Save</span>
        </Button>
        <Button variant="ghost" size="sm" className="border border-white/10">
          <ArrowRight className="h-3 w-3" />
          <span className="ml-1">Copy link</span>
        </Button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
        {course.relatedAssets.map((asset) => (
          <Link
            key={asset.href}
            href={asset.href}
            className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-siso-text-muted"
          >
            <Sparkles className="h-3 w-3" />
            {asset.label}
          </Link>
        ))}
      </div>
    </article>
  );
}

export function CourseCatalogScreen() {
  const [search, setSearch] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<typeof levels[number]>("all");
  const [selectedIndustry, setSelectedIndustry] = useState<typeof industries[number]>("all");
  const [sortBy, setSortBy] = useState<string>("progress");
  const router = useRouter();

  const filteredCourses = useMemo(() => {
    return courses
      .filter((course) => {
        const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) || course.overview.toLowerCase().includes(search.toLowerCase());
        const matchesLevel = selectedLevel === "all" || course.level === selectedLevel;
        const matchesIndustry = selectedIndustry === "all" || course.industry === selectedIndustry;
        return matchesSearch && matchesLevel && matchesIndustry;
      })
      .sort((a, b) => {
        if (sortBy === "progress") {
          return b.progress - a.progress;
        }
        if (sortBy === "duration") {
          return parseDurationValue(b.duration) - parseDurationValue(a.duration);
        }
        return a.title.localeCompare(b.title);
      });
  }, [search, selectedLevel, selectedIndustry, sortBy]);

  return (
    <main className="bg-siso-bg-primary text-siso-text-primary min-h-screen">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 lg:py-12">
        <HighlightCard
          color="orange"
          title="Courses"
          description="Structured learning, tracked progress, and the assets you need to close faster."
          metricValue={`${courses.length}`}
          metricLabel="courses"
          buttonText="Resume spotlight"
          onButtonClick={() => router.push("/partners/academy/training-spotlight")}
          icon={<Sparkles className="h-5 w-5 text-siso-orange" />}
          hideDivider
          titleClassName="uppercase tracking-[0.35em] text-white"
          descriptionClassName="text-sm"
        />

        <SettingsGroupCallout
          icon={<Search className="h-4 w-4" />}
          title="Search & filters"
          subtitle="Find a course by topic, level, or industry."
          showChevron={false}
        >
          <div className="space-y-4">
            <label className="block">
              <span className="sr-only">Search courses</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by keyword, tag, or lesson"
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-2 text-sm text-white placeholder:text-siso-text-muted focus:border-siso-orange focus:outline-none"
              />
            </label>
            <div className="flex flex-wrap gap-2">
              {levels.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSelectedLevel(level)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] transition",
                    selectedLevel === level
                      ? "border-siso-orange bg-siso-orange/10 text-white"
                      : "border-white/10 text-siso-text-muted hover:border-white/30",
                  )}
                >
                  {level === "all" ? "All levels" : level}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {industries.map((industry) => (
                <button
                  key={industry}
                  type="button"
                  onClick={() => setSelectedIndustry(industry)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] transition",
                    selectedIndustry === industry
                      ? "border-siso-orange bg-siso-orange/10 text-white"
                      : "border-white/10 text-siso-text-muted hover:border-white/30",
                  )}
                >
                  {industry}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] uppercase tracking-[0.3em] text-siso-text-muted">Sort</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="rounded-2xl border border-white/10 bg-black/20 px-3 py-1 text-sm text-white focus:border-siso-orange focus:outline-none"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <Button asChild variant="ghost" size="sm" className="border border-white/10">
                <Link href="/partners/academy/training-spotlight">Need help picking?</Link>
              </Button>
            </div>
          </div>
        </SettingsGroupCallout>

        <div className="space-y-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </main>
  );
}
