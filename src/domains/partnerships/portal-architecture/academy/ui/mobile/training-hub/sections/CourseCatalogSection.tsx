import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import type { TrainingCourse } from "../data";
import { BookOpen } from "lucide-react";

const tabs = ["All", "In Progress", "Favorites"] as const;

type CatalogTab = (typeof tabs)[number];

interface CourseCatalogSectionProps {
  courses: TrainingCourse[];
  activeTab?: CatalogTab;
}

export function CourseCatalogSection({ courses, activeTab = "All" }: CourseCatalogSectionProps) {
  return (
    <SettingsGroupCallout
      icon={<BookOpen className="h-4 w-4" />}
      title="Course catalog"
      subtitle="Curated by track with smart filters"
      showChevron={false}
    >
      <section className="space-y-4 rounded-[22px] border border-white/10 bg-white/5 p-4">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`rounded-full border px-3 py-1 text-xs ${
                activeTab === tab ? "border-siso-orange text-siso-text-primary" : "border-siso-border text-siso-text-muted"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {courses.map((course) => (
            <article key={course.id} className="rounded-3xl border border-siso-border bg-siso-bg-secondary p-4">
              <div className="flex items-center justify-between text-xs text-siso-text-muted">
                <span>{course.track}</span>
                <span>{course.duration}</span>
              </div>
              <h3 className="mt-2 text-base font-semibold text-siso-text-primary">{course.title}</h3>
              <p className="text-sm text-siso-text-muted">{course.description}</p>
              <div className="mt-3 flex items-center justify-between text-xs text-siso-text-muted">
                <span>{course.difficulty}</span>
                <span>{course.releaseStatus}</span>
              </div>
              <div className="mt-3 h-2 w-full rounded-full bg-siso-bg-hover">
                <div className="h-2 rounded-full bg-siso-orange" style={{ width: `${course.progress}%` }} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </SettingsGroupCallout>
  );
}
