import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft, ArrowRight, Bookmark, Sparkles } from "lucide-react";
import { HighlightCard } from "@/components/ui/card-5-static";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { cn } from "@/domains/shared/utils/cn";

const course = {
  id: "enterprise-sales-101",
  title: "Enterprise Sales 101",
  summary: "Pipeline playbook, messaging, and objection-handling scripts.",
  durationWeeks: 4,
  lessons: [
    { id: "overview", title: "Overview", duration: "8 min" },
    { id: "discovery", title: "Discovery Basics", duration: "12 min" },
    { id: "objections", title: "Objection handling", duration: "18 min" },
  ],
  authors: [
    { name: "Jordan Wu", role: "Partner Enablement" },
    { name: "Ivy Morales", role: "Selling Excellence" },
  ],
};

export function CourseDetailScreen() {
  return (
    <main className="min-h-screen bg-siso-bg-primary text-siso-text-primary">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 lg:py-12">
        <div className="flex items-center gap-3 text-sm text-siso-text-muted">
          <Link href="/partners/academy/courses" className="inline-flex items-center gap-2 text-white hover:text-white/80">
            <ArrowLeft className="h-4 w-4" /> Back to courses
          </Link>
          <span className="text-white/30">/</span>
          <span>{course.title}</span>
        </div>

        <HighlightCard
          color="orange"
          title={course.title}
          description={course.summary}
          metricValue="4 weeks"
          metricLabel="Duration"
          buttonText="Start lesson"
          buttonHref={`/partners/academy/courses/${course.id}/${course.lessons[0].id}`}
          icon={<Sparkles className="h-5 w-5 text-siso-orange" />}
          hideDivider
          hideFooter={false}
          titleClassName="uppercase tracking-[0.4em] text-white"
          descriptionClassName="text-sm"
          fullWidth
        />

        <SettingsGroupCallout icon={<Bookmark className="h-4 w-4" />} title="Lessons" subtitle="Complete in order" showChevron={false}>
          <div className="space-y-3">
            {course.lessons.map((lesson, idx) => (
              <Link
                key={lesson.id}
                href={`/partners/academy/courses/${course.id}/${lesson.id}`}
                className={cn(
                  "flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white",
                  idx === 0 ? "border-siso-orange/50" : "",
                )}
              >
                <div>
                  <p className="font-semibold">{lesson.title}</p>
                  <p className="text-xs text-siso-text-muted">{lesson.duration}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-siso-text-muted" />
              </Link>
            ))}
          </div>
        </SettingsGroupCallout>

        <SettingsGroupCallout icon={<Sparkles className="h-4 w-4" />} title="Authors" subtitle="Experts behind the course" showChevron={false}>
          <div className="grid gap-3 md:grid-cols-2">
            {course.authors.map((author) => (
              <div key={author.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm font-semibold text-white">{author.name}</p>
                <p className="text-xs text-siso-text-muted">{author.role}</p>
              </div>
            ))}
          </div>
        </SettingsGroupCallout>
      </div>
    </main>
  );
}
