import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import type { KnowledgeArticle } from "../data";
import { NotebookText } from "lucide-react";

interface KnowledgeBaseSectionProps {
  articles: KnowledgeArticle[];
}

export function KnowledgeBaseSection({ articles }: KnowledgeBaseSectionProps) {
  return (
    <SettingsGroupCallout
      icon={<NotebookText className="h-4 w-4" />}
      title="Knowledge base"
      subtitle="Short reads for quick wins"
      showChevron={false}
    >
      <div className="grid gap-3 rounded-[22px] border border-white/10 bg-white/5 p-4 sm:grid-cols-3">
        {articles.map((a) => (
          <article key={a.id} className="rounded-3xl border border-siso-border bg-siso-bg-secondary p-4">
            <h3 className="text-sm font-semibold text-siso-text-primary">{a.title}</h3>
            <p className="text-xs text-siso-text-muted">{a.summary}</p>
          </article>
        ))}
      </div>
    </SettingsGroupCallout>
  );
}
