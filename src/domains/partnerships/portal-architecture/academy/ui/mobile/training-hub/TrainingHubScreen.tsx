import {
  certificationBadges,
  courseCatalog,
  knowledgeArticles,
  progressSummaries,
  upcomingSessions,
} from "./data";
import {
  CertificationsSection,
  CourseCatalogSection,
  KnowledgeBaseSection,
  LiveSessionsSection,
  MyProgressSection,
} from "./sections";
import { TrainingHero } from "./components";

export function TrainingHubScreen() {
  return (
    <section className="flex flex-1 flex-col gap-6 px-4 py-6">
      <TrainingHero overallProgress={68} stageLabel="Stage 3 - Enable" streakDays={5} />
      <CourseCatalogSection courses={courseCatalog} />
      <MyProgressSection summaries={progressSummaries} />
      <CertificationsSection badges={certificationBadges} />
      <LiveSessionsSection sessions={upcomingSessions} />
      <KnowledgeBaseSection articles={knowledgeArticles} />
    </section>
  );
}
