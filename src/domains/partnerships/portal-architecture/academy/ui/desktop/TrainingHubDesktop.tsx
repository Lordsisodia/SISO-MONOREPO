import {
  certificationBadges,
  courseCatalog,
  knowledgeArticles,
  progressSummaries,
  upcomingSessions,
} from "../mobile/training-hub/data";
import {
  CertificationsSection,
  CourseCatalogSection,
  KnowledgeBaseSection,
  LiveSessionsSection,
  MyProgressSection,
} from "../mobile/training-hub/sections";
import { TrainingHero } from "../mobile/training-hub/components";

export function TrainingHubDesktop() {
  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-12 gap-6 px-6 py-8">
      <div className="col-span-12">
        <TrainingHero overallProgress={68} stageLabel="Stage 3 - Enable" streakDays={5} />
      </div>
      <div className="col-span-8 space-y-6">
        <CourseCatalogSection courses={courseCatalog} />
        <KnowledgeBaseSection articles={knowledgeArticles} />
      </div>
      <div className="col-span-4 space-y-6">
        <MyProgressSection summaries={progressSummaries} />
        <CertificationsSection badges={certificationBadges} />
        <LiveSessionsSection sessions={upcomingSessions} />
      </div>
    </div>
  );
}

