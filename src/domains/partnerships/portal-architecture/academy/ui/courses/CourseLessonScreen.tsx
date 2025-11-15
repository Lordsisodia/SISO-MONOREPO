"use client";

import Link from "next/link";
import { ArrowRight, Share2, Bookmark, Play, MessageCircle, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { courses } from "./data";
import { useRouter } from "next/navigation";

export function CourseLessonScreen({ courseId, lessonId }: { courseId: string; lessonId: string }) {
  const course = courses.find((item) => item.id === courseId);
  const router = useRouter();

  if (!course) {
    return <p className="text-siso-text-muted">Course not found.</p>;
  }

  const lessonIndex = course.lessons.findIndex((lesson) => lesson.id === lessonId);
  if (lessonIndex === -1) return <p className="text-siso-text-muted">Lesson not found.</p>;

  const lesson = course.lessons[lessonIndex];
  const prevLesson = course.lessons[lessonIndex - 1];
  const nextLesson = course.lessons[lessonIndex + 1];

  return (
    <main className="bg-siso-bg-primary text-siso-text-primary min-h-screen">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 lg:py-12">
        <SettingsGroupCallout
          icon={<Play className="h-4 w-4" />}
          title={lesson.title}
          subtitle={lesson.summary}
          showChevron={false}
        >
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-siso-text-muted">{lesson.duration}</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" className="border border-white/10">
                <div className="flex items-center gap-1">
                  <Play className="h-3 w-3" />
                  <span>Mark complete</span>
                </div>
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
            <Button variant="outline" size="sm" className="border border-white/10" onClick={() => router.push("/partners/community/messages?tab=siso")}>
              <MessageCircle className="h-3 w-3" />
              <span className="ml-1">Need help?</span>
            </Button>
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout
          icon={<Layers className="h-4 w-4" />}
          title="Supplemental assets"
          subtitle="Related proof & pitch materials"
          showChevron={false}
        >
          <div className="flex flex-wrap gap-2 text-[11px]">
            {lesson.relatedAssets.map((asset) => (
              <Link
                key={asset.href}
                href={asset.href}
                className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-siso-orange"
              >
                <ArrowRight className="h-3 w-3" />
                {asset.label}
              </Link>
            ))}
          </div>
        </SettingsGroupCallout>

        <nav className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.3em] text-siso-text-muted">
          {prevLesson ? (
            <Button asChild variant="outline" size="sm" className="border border-white/10">
              <Link href={`/partners/academy/courses/${course.id}/${prevLesson.id}`}>
                Prev: {prevLesson.title}
              </Link>
            </Button>
          ) : null}
          {nextLesson ? (
            <Button asChild variant="secondary" size="sm" className="border border-white/10">
              <Link href={`/partners/academy/courses/${course.id}/${nextLesson.id}`}>
                Next: {nextLesson.title}
              </Link>
            </Button>
          ) : null}
        </nav>
      </div>
    </main>
  );
}
