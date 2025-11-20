import Link from "next/link";
import { ArrowLeft, Bookmark, Clock, NotebookText } from "lucide-react";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { Button } from "@/components/ui/button";

const lesson = {
  title: "Discovery Basics",
  duration: "12 min",
  summary: "Lesson 2 outlines the first five discovery questions with scripts.",
  steps: [
    "Watch the framing video",
    "Practice the five questions",
    "Send proof asset to your mentor",
  ],
  resources: [
    { label: "Discovery checklist", href: "/partners/academy/tools/discovery-checklist" },
    { label: "Prospect notes template", href: "/partners/academy/tools/prospect-notes" },
  ],
};

export function CourseLessonScreen({ courseId, lessonId }: { courseId?: string; lessonId?: string }) {
  return (
    <main className="min-h-screen bg-siso-bg-primary text-siso-text-primary">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-10 lg:py-12">
        <Link href="/partners/academy/courses" className="inline-flex items-center gap-2 text-sm text-white hover:text-white/80">
          <ArrowLeft className="h-4 w-4" /> Back to courses
        </Link>

        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.35em] text-siso-text-muted">
            {courseId ? `Course ${courseId}` : "Lesson"}
          </p>
          <h1 className="text-3xl font-semibold text-white">{lesson.title}</h1>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs text-siso-text-muted">
            <Clock className="h-3.5 w-3.5" /> {lesson.duration}
          </div>
          <p className="text-sm text-siso-text-muted">{lesson.summary}</p>
        </header>

        <SettingsGroupCallout icon={<NotebookText className="h-4 w-4" />} title="Lesson steps" subtitle="Complete in order" showChevron={false}>
          <ol className="space-y-3 text-sm text-white">
            {lesson.steps.map((step, idx) => (
              <li key={step} className="flex items-start gap-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/10 text-xs text-white">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </SettingsGroupCallout>

        <SettingsGroupCallout icon={<Bookmark className="h-4 w-4" />} title="Resources" subtitle="Use these while you learn" showChevron={false}>
          <div className="flex flex-wrap gap-2">
            {lesson.resources.map((resource) => (
              <Button key={resource.href} asChild variant="ghost" size="sm" className="border border-white/10">
                <Link href={resource.href}>{resource.label}</Link>
              </Button>
            ))}
          </div>
        </SettingsGroupCallout>
      </div>
    </main>
  );
}
