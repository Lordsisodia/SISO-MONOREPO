"use client";

import Link from "next/link";
import { ArrowRight, Bookmark, Share2, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { courses } from "./data";
import { useRouter } from "next/navigation";

export function CourseDetailScreen({ courseId }: { courseId: string }) {
  const course = courses.find((item) => item.id === courseId);
  const router = useRouter();

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-siso-text-muted">Course not found.</p>
      </div>
    );
  }

  return (
    <main className="bg-siso-bg-primary text-siso-text-primary min-h-screen">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 lg:py-12">
        <SettingsGroupCallout
          icon={<Sparkles className="h-4 w-4" />}
          title={course.title}
          subtitle={course.overview}
          showChevron={false}
        >
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-siso-text-muted">{course.focus}</p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-siso-text-muted">{course.industry}</span>
              <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-siso-text-muted">{course.legend}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" className="border border-white/10" onClick={() => router.push(`/partners/academy/courses/${course.id}/lessons/${course.lessons[0].id}`)}>
                Start / Resume
              </Button>
              <Button variant="ghost" size="sm" className="border border-white/10">
                <Bookmark className="h-3 w-3" />
                <span className="ml-1">Save to Saved Docs</span>
              </Button>
              <Button variant="ghost" size="sm" className="border border-white/10">
                <Share2 className="h-3 w-3" />
                <span className="ml-1">Copy link</span>
              </Button>
            </div>
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<CheckCircle2 className="h-4 w-4" />}
          title="Syllabus"
          subtitle="Lessons that make up this course"
          showChevron={false}
        >
          <div className="space-y-3">
            {course.lessons.map((lesson) => (
              <Link href={`/partners/academy/courses/${course.id}/${lesson.id}`} key={lesson.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-siso-text-muted hover:border-white/30">
                <div>
                  <p className="font-semibold text-white">{lesson.title}</p>
                  <p className="text-[11px] text-siso-text-muted">{lesson.duration}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-siso-text-muted" />
              </Link>
            ))}
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<Sparkles className="h-4 w-4" />}
          title="Related proof"
          subtitle="Assets that complement this course"
          showChevron={false}
        >
          <div className="flex flex-wrap gap-2 text-[11px]">
            {course.relatedAssets.map((asset) => (
              <Link key={asset.href} href={asset.href} className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-siso-orange">
                <ArrowRight className="h-3 w-3" />
                {asset.label}
              </Link>
            ))}
          </div>
        </SettingsGroupCallout>
      </div>
    </main>
  );
}
