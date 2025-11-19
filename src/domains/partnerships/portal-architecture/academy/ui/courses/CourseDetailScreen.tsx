"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeft, Bookmark, Share2, Sparkles, CheckCircle2, AlertTriangle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { courses } from "./data";
import { useRouter } from "next/navigation";
import { Waves } from "@/components/ui/wave-background";

export function CourseDetailScreen({ courseId }: { courseId: string }) {
  const course = courses.find((item) => item.id === courseId);
  const parent = courses.find((item) => item.id === course?.moduleOf);
  const router = useRouter();
  const lessons = course?.lessons ?? [];
  const relatedAssets = course?.relatedAssets ?? [];

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-siso-text-muted">Course not found.</p>
      </div>
    );
  }

  return (
    <main className="relative bg-siso-bg-primary text-siso-text-primary min-h-screen">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ filter: "blur(6px)", opacity: 0.9 }}
      >
        <Waves
          className="h-full w-full"
          strokeColor="#f8a75c"
          backgroundColor="#0b0b0f"
          pointerSize={0.35}
        />
      </div>
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 lg:py-12">
        <div className="relative min-h-[100px]">
          <div className="pointer-events-none absolute inset-y-0 left-3 z-10 flex items-center">
            <Link
              href={parent ? `/partners/academy/courses/${parent.id}` : "/partners/academy/courses"}
              className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center text-white transition hover:text-white/80"
              aria-label="Back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </div>
          {/* Hero */}
          <div className="rounded-3xl border border-white/0 bg-[#181818] p-5 shadow-[0_20px_45px_rgba(0,0,0,0.3)] space-y-4 pl-12">
            <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-siso-text-muted">
              <span className="rounded-full bg-siso-orange/15 px-2 py-[2px] text-[10px] font-semibold uppercase tracking-[0.25em] text-siso-orange">
                {course.level}
              </span>
            <span className="rounded-full border border-white/15 px-2 py-[2px]">{course.industry}</span>
            <span className="rounded-full border border-white/15 px-2 py-[2px]">{course.legend}</span>
            {course.comingSoon ? (
              <span className="rounded-full bg-siso-orange/15 px-2 py-[2px] text-[10px] font-semibold uppercase tracking-[0.25em] text-siso-orange">
                Coming soon
              </span>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold text-white leading-tight">{course.title}</h1>
            <p className="text-sm leading-relaxed text-siso-text-muted max-w-3xl">{course.overview}</p>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px] text-siso-text-muted">
            <span className="rounded-full border border-white/10 px-3 py-1">Duration: {course.duration}</span>
            <span className="rounded-full border border-white/10 px-3 py-1">
              Lessons: {lessons.length || "TBD"}
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1">Focus: {course.focus}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="border border-white/10 px-3"
            disabled={!lessons.length || course.comingSoon}
            onClick={() =>
              lessons.length
                ? router.push(`/partners/academy/courses/modules/${course.id}/${lessons[0].id}`)
                : undefined
            }
          >
            <Play className="mr-1 h-3.5 w-3.5" />
            {course.comingSoon ? "Coming soon" : "Start"}
            </Button>
            <Button variant="ghost" size="icon" className="border border-white/10 h-9 w-9">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="border border-white/10 h-9 w-9">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Video + info callouts */}
        <section className="rounded-3xl border border-white/0 bg-[#181818] p-5 shadow-[0_20px_45px_rgba(0,0,0,0.3)] space-y-4">
          <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40">
            <iframe
              src={course.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"}
              title={`${course.title} video`}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-white/5 bg-black/25 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-siso-text-muted">Summary</p>
              <p className="mt-2 text-sm leading-relaxed text-white/90">
                {course.longDescription || course.overview}
              </p>
            </div>
            <div className="rounded-2xl border border-white/5 bg-black/25 p-4 space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-siso-text-muted">Details</p>
              <p className="text-sm text-white/90">Level: {course.level}</p>
              <p className="text-sm text-white/90">Duration: {course.duration}</p>
              <p className="text-sm text-white/90">Status: {course.comingSoon ? "Coming soon" : "Available"}</p>
              <div className="flex flex-wrap gap-2 text-[11px] text-siso-text-muted">
                {(course.tags ?? []).slice(0, 4).map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 px-3 py-1">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <SettingsGroupCallout
          icon={<CheckCircle2 className="h-4 w-4" />}
          title="Syllabus"
          subtitle="Lessons that make up this course"
          showChevron={false}
        >
          {lessons.length ? (
            <div className="space-y-3">
              {lessons.map((lesson) => (
                <Link
                  href={`/partners/academy/courses/modules/${course.id}/${lesson.id}`}
                  key={lesson.id}
                  className="flex items-center justify-between rounded-2xl border border-white/5 bg-[#181818] px-4 py-3 text-sm text-siso-text-muted hover:border-white/20"
                >
                  <div>
                    <p className="font-semibold text-white">{lesson.title}</p>
                    <p className="text-[11px] text-siso-text-muted">{lesson.duration}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-siso-text-muted" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-2xl border border-dashed border-white/15 bg-[#181818] px-4 py-3 text-sm text-siso-text-muted">
              <AlertTriangle className="h-4 w-4 text-siso-orange" />
              Syllabus coming soon.
            </div>
          )}
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<Sparkles className="h-4 w-4" />}
          title="Related proof"
          subtitle="Assets that complement this course"
          showChevron={false}
        >
          {relatedAssets.length ? (
            <div className="flex flex-wrap gap-2 text-[11px]">
              {relatedAssets.map((asset) => (
                <Link key={asset.href} href={asset.href} className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-siso-orange">
                  <ArrowRight className="h-3 w-3" />
                  {asset.label}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-siso-text-muted">Proof and assets coming soon.</p>
          )}
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<Sparkles className="h-4 w-4" />}
          title="Comments"
          subtitle="Leave feedback or questions for this course."
          showChevron={false}
        >
          <div className="space-y-3">
            <div className="rounded-2xl border border-white/5 bg-[#181818] p-3">
              <p className="text-xs text-siso-text-muted">Commenting will be available soon.</p>
            </div>
            <div className="space-y-2 text-xs text-siso-text-muted">
              <p className="font-semibold text-white">Example thread</p>
              {(course.exampleComments ?? [
                { author: "Riya • Partner", body: "How do I connect this to my pipeline?", timestamp: "2h ago" },
                { author: "SISO Team", role: "Admin", body: "We’ll cover this in the next update.", timestamp: "1h ago" },
              ]).map((comment, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/5 bg-[#181818] p-3 text-siso-text-muted"
                >
                  <p className="text-white">
                    {comment.author}
                    {comment.role ? ` • ${comment.role}` : ""}
                    <span className="ml-2 text-[11px] text-siso-text-muted">{comment.timestamp}</span>
                  </p>
                  <p className="mt-1 text-sm text-white">{comment.body}</p>
                </div>
              ))}
            </div>
          </div>
        </SettingsGroupCallout>
      </div>
    </main>
  );
}
