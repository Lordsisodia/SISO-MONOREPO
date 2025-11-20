import Link from "next/link";
import { BookOpen, Layers, Search, Bookmark, Share2, Link as LinkIcon, Filter, Film, Sparkles } from "lucide-react";
import { HighlightCard } from "@/components/ui/card-5-static";
import { Button } from "@/components/ui/button";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { cn } from "@/domains/shared/utils/cn";

type SavedItemType = "course" | "lesson" | "asset";

interface SavedItem {
  id: string;
  title: string;
  description: string;
  type: SavedItemType;
  origin: string;
  savedAgo: string;
  link: string;
  tags: string[];
  intent: string;
}

 const savedDocs: SavedItem[] = [
   {
     id: "saved-course-enterprise",
     title: "Enterprise Sales 101",
     description: "Pipeline playbook, messaging, and objection-handling scripts.",
     type: "course",
     origin: "Courses • Strategic Selling",
    savedAgo: "2h ago",
     link: "/partners/academy/courses/enterprise-sales-101",
     tags: ["sales", "enterprise", "playbook"],
     intent: "Save to share with your account team",
   },
   {
     id: "saved-lesson-discovery",
     title: "Discovery Basics",
     description: "Lesson 2 outlines the first five discovery questions with customer scripts.",
     type: "lesson",
     origin: "Courses › Enterprise Sales 101",
    savedAgo: "4h ago",
     link: "/partners/academy/courses/enterprise-sales-101/lessons/discovery-basics",
     tags: ["lesson", "discovery", "script"],
     intent: "Use when prepping for kickoff calls",
   },
   {
     id: "saved-asset-tiger",
     title: "Retail Tech Case Study",
     description: "12-slide proof deck + ROI callout for the Tiger Retail build.",
     type: "asset",
     origin: "Portfolio › Retail",
    savedAgo: "1d ago",
     link: "/partners/academy/portfolio/retail-tech-case-study",
     tags: ["portfolio", "retail", "roi"],
     intent: "Send as proof when pricing for retail buyers",
   },
   {
     id: "saved-asset-pitch",
     title: "Manufacturing Pitch Deck",
     description: "Pitch kit deck with manufacturing positioning + pricing info.",
     type: "asset",
     origin: "Pitch Kit › Decks",
    savedAgo: "2d ago",
     link: "/partners/academy/pitch-kit/decks/manufacturing",
     tags: ["pitch", "deck", "manufacturing"],
     intent: "Drop into Loom note for prospect kill-switch",
   },
 ];

 const filterChips = [
   { label: "All", active: true },
   { label: "Courses", active: false },
   { label: "Portfolio", active: false },
   { label: "Pitch Kit", active: false },
   { label: "Lessons", active: false },
 ];

 const calloutHighlights = [
   { label: "Trackable saves", value: "4", accent: "Saved items" },
   { label: "Recent activity", value: "2 items", accent: "Added in last 24h" },
 ];

 const typeMetadata: Record<SavedItemType, { label: string; icon: React.ComponentType<{ className?: string }>; accent: string }> = {
   course: { label: "Course", icon: BookOpen, accent: "bg-siso-orange/15 text-siso-orange" },
   lesson: { label: "Lesson", icon: Film, accent: "bg-siso-orange/15 text-siso-orange" },
   asset: { label: "Asset", icon: Layers, accent: "bg-siso-orange/15 text-siso-orange" },
 };

 function SavedItemCard({ item }: { item: SavedItem }) {
   const meta = typeMetadata[item.type];
   const Icon = meta.icon;

   return (
     <article className="rounded-3xl border border-white/10 bg-white/[0.03] px-5 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
       <div className="flex items-start justify-between gap-4">
         <div className="flex items-start gap-3">
           <span className={cn("inline-flex items-center justify-center gap-2 rounded-2xl border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em]", meta.accent)}>
             <Icon className="h-4 w-4" />
             {meta.label}
           </span>
           <div>
             <p className="text-lg font-semibold text-white">{item.title}</p>
             <p className="text-xs text-siso-text-muted">{item.description}</p>
             <div className="mt-1 text-[11px] uppercase tracking-[0.4em] text-siso-text-muted">{item.origin}</div>
           </div>
         </div>
        <span className="text-[11px] font-semibold text-siso-orange">{item.savedAgo}</span>
       </div>
       <div className="mt-3 flex flex-wrap gap-2">
         {item.tags.map((tag) => (
           <span key={tag} className="rounded-full border border-white/5 px-3 py-1 text-[11px] text-siso-text-muted">
             #{tag}
           </span>
         ))}
       </div>
       <p className="mt-2 text-xs text-siso-text-muted">{item.intent}</p>
       <div className="mt-4 flex flex-wrap gap-2">
         <Button asChild variant="ghost" size="sm" className="border border-white/10">
           <Link href={item.link}>Open source</Link>
         </Button>
         <Button asChild variant="outline" size="sm">
           <Link href={item.link}>
             <LinkIcon className="h-3 w-3" />
             <span className="ml-1">Open link</span>
           </Link>
         </Button>
         <Button asChild variant="ghost" size="sm" className="border border-white/10">
           <Link href={item.link}>
             <Share2 className="h-3 w-3" />
             <span className="ml-1">Share</span>
           </Link>
         </Button>
       </div>
     </article>
   );
 }

 export function SavedDocsScreen() {
   const totalSaved = savedDocs.length;
  const lastSaved = savedDocs[0]?.savedAgo ?? "Just now";

   return (
     <main className="bg-siso-bg-primary text-siso-text-primary min-h-screen">
       <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 lg:py-12">
        <HighlightCard
          color="orange"
          title="Saved docs"
          description="Bookmark courses, lessons, and proof assets for your next pitch."
          metricValue={`${totalSaved}`}
          metricLabel="items saved"
          buttonText="Browse courses"
          buttonHref="/partners/academy/courses"
          icon={<Sparkles className="h-5 w-5 text-siso-orange" />}
          hideDivider
          hideFooter={false}
          titleClassName="uppercase tracking-[0.4em] text-white"
          descriptionClassName="text-sm"
        />

         <div className="grid gap-4 lg:grid-cols-2">
           <SettingsGroupCallout icon={<Search className="h-4 w-4" />} title="Filter & search" subtitle="Focus on the type of asset you need." showChevron={false}>
             <div className="space-y-4">
               <label className="relative block">
                 <span className="sr-only">Search saved docs</span>
                 <input
                   type="search"
                   placeholder="Search by keyword, topic, or tag"
                   className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-2 text-sm text-white placeholder:text-siso-text-muted focus:border-siso-orange focus:outline-none"
                   readOnly
                 />
                 <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-siso-text-muted">
                   <Filter className="h-4 w-4" />
                 </span>
               </label>
               <div className="flex flex-wrap gap-2">
                 {filterChips.map((chip) => (
                   <span
                     key={chip.label}
                     className={cn(
                       "rounded-full border px-3 py-1 text-[11px]",
                       chip.active ? "border-siso-orange text-white" : "border-white/10 text-siso-text-muted",
                     )}
                   >
                     {chip.label}
                   </span>
                 ))}
               </div>
             </div>
           </SettingsGroupCallout>

           <SettingsGroupCallout icon={<Bookmark className="h-4 w-4" />} title="Saved shortcuts" subtitle="Keep the most-used playbooks at your fingertips." showChevron={false}>
             <div className="space-y-3">
               {calloutHighlights.map((highlight) => (
                 <div key={highlight.label} className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
                   <p className="text-[11px] uppercase tracking-[0.3em] text-siso-text-muted">{highlight.label}</p>
                   <p className="text-lg font-semibold text-white">{highlight.value}</p>
                   <p className="text-[11px] text-siso-text-muted">{highlight.accent}</p>
                 </div>
               ))}
               <p className="text-[11px] text-siso-text-muted">
                Last saved <span className="font-semibold text-white">{lastSaved}</span>
               </p>
               <Button asChild variant="outline" size="sm" className="w-full border-siso-orange text-white">
                 <Link href="/partners/academy/portfolio">Open portfolio</Link>
               </Button>
             </div>
           </SettingsGroupCallout>
         </div>

         <SettingsGroupCallout icon={<Layers className="h-4 w-4" />} title="Saved docs" subtitle="Share, copy, or remove without ever leaving this page." showChevron={false}>
           <div className="space-y-4">
             {savedDocs.map((item) => (
               <SavedItemCard key={item.id} item={item} />
             ))}
           </div>
         </SettingsGroupCallout>
       </div>
     </main>
   );
 }
