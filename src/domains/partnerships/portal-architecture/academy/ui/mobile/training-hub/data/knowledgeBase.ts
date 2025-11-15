export interface KnowledgeArticle {
  id: string;
  title: string;
  summary: string;
}

export const knowledgeArticles: KnowledgeArticle[] = [
  { id: "kb-1", title: "How to submit a client", summary: "Quick steps to log an opportunity." },
  { id: "kb-2", title: "Referral payout schedule", summary: "When and how payouts happen." },
  { id: "kb-3", title: "Portfolio: choosing the right case study", summary: "Map proof to prospect needs." },
];
