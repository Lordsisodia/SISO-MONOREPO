"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Timeline, type TimelineItem } from "@/components/ui/timeline";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Filter,
  FileText,
  PenLine,
  Pin,
  Search,
  Share2,
  Sparkles,
  Tag,
  Users,
} from "lucide-react";

const templateOptions = [
  { id: "quick", label: "Quick Notes", description: "Blank canvas" },
  { id: "meeting", label: "Meeting Notes", description: "Attendees · Agenda" },
  { id: "sales", label: "Sales Script", description: "Call outline" },
  { id: "research", label: "Industry Research", description: "Insights & trends" },
] as const;

type NoteType = (typeof templateOptions)[number]["id"];

interface ClientNote {
  id: string;
  title: string;
  type: NoteType;
  body: string;
  prospect: string;
  stage: string;
  author: string;
  sharedWithSiso: boolean;
  timestamp: string;
  tags: string[];
}

const mockNotes: ClientNote[] = [
  {
    id: "note_1",
    title: "Discovery recap – Brookstone",
    type: "meeting",
    body: "Discussed pain points around manual onboarding. Need AI quoting flow and Stripe integration.",
    prospect: "Brookstone Bikes",
    stage: "Demo Ready",
    author: "You",
    sharedWithSiso: true,
    timestamp: "2025-11-12T17:00:00Z",
    tags: ["meeting", "follow-up"],
  },
  {
    id: "note_2",
    title: "Preferences – BetaOps",
    type: "quick",
    body: "Prefers SMS updates, CTO wants SOC2 docs before next step.",
    prospect: "BetaOps Cloud",
    stage: "Qualified",
    author: "SISO Ops",
    sharedWithSiso: true,
    timestamp: "2025-11-11T14:30:00Z",
    tags: ["preferences"],
  },
  {
    id: "note_3",
    title: "Industry research – Fintech",
    type: "research",
    body: "Fintech AI compliance trends, highlight KYB automations.",
    prospect: "Prospect TBD",
    stage: "Prospecting",
    author: "You",
    sharedWithSiso: false,
    timestamp: "2025-11-09T09:10:00Z",
    tags: ["research"],
  },
];

export function ClientNotesWorkspace() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | NoteType>("all");
  const [sharedOnly, setSharedOnly] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState<string>(mockNotes[0]?.id ?? "");
  const [template, setTemplate] = useState<NoteType>("quick");
  const [noteDraft, setNoteDraft] = useState({ title: "", body: "", attendees: "", actions: "", share: true });

  const filteredNotes = useMemo(() => {
    return mockNotes
      .filter((note) => (typeFilter === "all" ? true : note.type === typeFilter))
      .filter((note) => (sharedOnly ? note.sharedWithSiso : true))
      .filter((note) =>
        search.length === 0
          ? true
          : note.title.toLowerCase().includes(search.toLowerCase()) || note.body.toLowerCase().includes(search.toLowerCase()),
      );
  }, [search, typeFilter, sharedOnly]);

  const selectedNote = filteredNotes.find((note) => note.id === selectedNoteId) ?? filteredNotes[0] ?? null;

  const stats = useMemo(() => {
    const sharedCount = mockNotes.filter((note) => note.sharedWithSiso).length;
    return {
      total: mockNotes.length,
      shared: sharedCount,
      recent: mockNotes.filter((note) => Date.now() - Date.parse(note.timestamp) < 1000 * 60 * 60 * 24 * 7).length,
    };
  }, []);

  const timelineItems: TimelineItem[] = selectedNote
    ? [
        {
          id: "time",
          title: new Date(selectedNote.timestamp).toLocaleString(),
          description: `${selectedNote.author} · ${selectedNote.stage}`,
          status: "completed",
        },
        {
          id: "share",
          title: selectedNote.sharedWithSiso ? "Shared with SISO" : "Private",
          status: selectedNote.sharedWithSiso ? "active" : "pending",
        },
      ]
    : [];

  const handleTemplateApply = (type: NoteType) => {
    setTemplate(type);
    switch (type) {
      case "meeting":
        setNoteDraft((prev) => ({ ...prev, title: "Meeting notes", body: "Agenda:\n-\nAction Items:\n-", attendees: "", actions: "" }));
        break;
      case "sales":
        setNoteDraft((prev) => ({ ...prev, title: "Sales script", body: "Hook:\nNeeds:\nNext Ask:", attendees: "", actions: "" }));
        break;
      case "research":
        setNoteDraft((prev) => ({ ...prev, title: "Industry research", body: "Trend:\nImplication:\nOpportunity:", attendees: "", actions: "" }));
        break;
      default:
        setNoteDraft((prev) => ({ ...prev, title: "", body: "", attendees: "", actions: "" }));
    }
  };

  return (
    <main className="min-h-screen bg-[#03040A] text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 lg:px-8">
        <Card className="overflow-hidden border-white/10 bg-gradient-to-r from-[#101828] via-[#0A101F] to-[#05070E] text-white">
          <CardContent className="flex flex-col gap-8 px-8 py-10 lg:flex-row lg:items-center">
            <div className="flex-1 space-y-4">
              <Badge variant="outline" className="border-white/30 bg-white/5 text-white">
                Deal Notes · Client Notes
              </Badge>
              <div>
                <h1 className="text-3xl font-semibold sm:text-4xl">Client Notes</h1>
                <p className="mt-3 text-base text-white/70">
                  Capture meeting recaps, share context with SISO, and keep every prospect’s preferences in one place.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button className="gap-2 bg-siso-orange text-black hover:bg-orange-400">
                  <PenLine className="h-4 w-4" />
                  New note
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share with SISO
                </Button>
              </div>
            </div>
            <div className="grid flex-1 gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 sm:grid-cols-3">
              <HeroStat label="Notes" value={stats.total.toString()} helper="Total captured" />
              <HeroStat label="Shared" value={stats.shared.toString()} helper="Visible to SISO" />
              <HeroStat label="This week" value={stats.recent.toString()} helper="New entries" />
            </div>
          </CardContent>
        </Card>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <section className="space-y-6">
            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-base">Filters</CardTitle>
                <CardDescription className="text-white/70">Search by prospect, template, sharing</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-4">
                <div className="md:col-span-2">
                  <Label className="text-xs uppercase tracking-[0.3em] text-white/60">Search</Label>
                  <div className="mt-2 flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-3 py-2">
                    <Search className="h-4 w-4 text-white/40" />
                    <input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search notes"
                      className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs uppercase tracking-[0.3em] text-white/60">Template</Label>
                  <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as typeof typeFilter)}>
                    <SelectTrigger className="mt-2 w-full border-white/10 bg-black/30 text-left text-white">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#070A12] text-white">
                      <SelectItem value="all">All templates</SelectItem>
                      {templateOptions.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs uppercase tracking-[0.3em] text-white/60">Shared</Label>
                  <div className="mt-2 flex items-center justify-between rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm">
                    <span>Show SISO only</span>
                    <Switch checked={sharedOnly} onCheckedChange={setSharedOnly} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5">
              <CardHeader className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base">Notes</CardTitle>
                  <CardDescription className="text-white/70">Linked to pipeline prospects</CardDescription>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <Filter className="h-4 w-4" />
                  {filteredNotes.length} matches
                </div>
              </CardHeader>
              <CardContent>
                {filteredNotes.length === 0 ? (
                  <p className="rounded-2xl border border-dashed border-white/10 px-4 py-10 text-center text-sm text-white/60">
                    No notes found.
                  </p>
                ) : (
                  <div className="grid gap-4">
                    {filteredNotes.map((note) => (
                      <button
                        key={note.id}
                        type="button"
                        onClick={() => setSelectedNoteId(note.id)}
                        className={cn(
                          "w-full rounded-2xl border px-4 py-4 text-left transition",
                          selectedNote?.id === note.id ? "border-siso-orange bg-siso-orange/10" : "border-white/10 bg-black/20 hover:border-white/30",
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-lg font-semibold text-white">{note.title}</p>
                            <p className="text-sm text-white/60">{note.prospect} · {note.stage}</p>
                          </div>
                          <Badge variant="outline" className="border-white/20 text-white/70">
                            {templateOptions.find((tpl) => tpl.id === note.type)?.label}
                          </Badge>
                        </div>
                        <p className="mt-3 line-clamp-2 text-sm text-white/70">{note.body}</p>
                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/60">
                          {note.tags.map((tag) => (
                            <span key={tag} className="rounded-full border border-white/10 px-2 py-0.5">
                              #{tag}
                            </span>
                          ))}
                          <span>{new Date(note.timestamp).toLocaleString()}</span>
                          {note.sharedWithSiso && (
                            <span className="flex items-center gap-1 text-emerald-300">
                              <Share2 className="h-3 w-3" /> SISO
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </section>

          <aside className="space-y-6 lg:sticky lg:top-8">
            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-base">Note detail</CardTitle>
                <CardDescription className="text-white/70">Prospect context & activity</CardDescription>
              </CardHeader>
              {selectedNote ? (
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50">Prospect</p>
                    <p className="text-lg font-semibold text-white">{selectedNote.prospect}</p>
                    <p className="text-sm text-white/60">Stage · {selectedNote.stage}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Author</span>
                      <Badge variant="outline" className="border-white/20 text-white/70">
                        {selectedNote.author}
                      </Badge>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span>Shared with SISO</span>
                      <span className={selectedNote.sharedWithSiso ? "text-emerald-300" : "text-white/60"}>
                        {selectedNote.sharedWithSiso ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                  <Timeline items={timelineItems} showTimestamps={false} />
                </CardContent>
              ) : (
                <CardContent>
                  <p className="text-sm text-white/60">Select a note to view details.</p>
                </CardContent>
              )}
            </Card>

            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-base">Compose note</CardTitle>
                <CardDescription className="text-white/70">Templates + sharing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-white/80">
                <div className="flex flex-wrap gap-2">
                  {templateOptions.map((option) => (
                    <Button
                      key={option.id}
                      type="button"
                      variant={template === option.id ? "default" : "outline"}
                      className={cn(
                        "gap-1 text-xs",
                        template === option.id ? "bg-siso-orange text-black" : "border-white/20 text-white",
                      )}
                      onClick={() => handleTemplateApply(option.id)}
                    >
                      <Tag className="h-3 w-3" /> {option.label}
                    </Button>
                  ))}
                </div>
                <Input
                  placeholder="Note title"
                  value={noteDraft.title}
                  onChange={(event) => setNoteDraft((prev) => ({ ...prev, title: event.target.value }))}
                  className="border-white/10 bg-black/30 text-white"
                />
                <Textarea
                  rows={4}
                  placeholder="Write your note..."
                  value={noteDraft.body}
                  onChange={(event) => setNoteDraft((prev) => ({ ...prev, body: event.target.value }))}
                  className="border-white/10 bg-black/30 text-sm"
                />
                {template === "meeting" && (
                  <Textarea
                    rows={3}
                    placeholder="Attendees, agenda, action items"
                    value={noteDraft.attendees}
                    onChange={(event) => setNoteDraft((prev) => ({ ...prev, attendees: event.target.value }))}
                    className="border-white/10 bg-black/30 text-sm"
                  />
                )}
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-3 py-2">
                  <span>Share with SISO</span>
                  <Switch checked={noteDraft.share} onCheckedChange={(value) => setNoteDraft((prev) => ({ ...prev, share: value }))} />
                </div>
                <Button className="w-full gap-2 bg-siso-orange text-black hover:bg-orange-400">
                  <Sparkles className="h-4 w-4" />
                  Save note
                </Button>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-base">Pinned notes</CardTitle>
                <CardDescription className="text-white/70">Keep critical info handy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-white/80">
                {mockNotes.slice(0, 2).map((note) => (
                  <div key={note.id} className="rounded-2xl border border-white/10 bg-black/30 px-3 py-2">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-white">{note.title}</p>
                      <Button variant="ghost" size="sm" className="text-xs text-white">
                        <Pin className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-white/60">{note.prospect}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-base">Shared feed</CardTitle>
                <CardDescription className="text-white/70">Recent SISO interactions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-white/80">
                {mockNotes
                  .filter((note) => note.sharedWithSiso)
                  .map((note) => (
                    <div key={note.id} className="rounded-2xl border border-white/10 bg-black/30 px-3 py-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">{note.title}</span>
                        <Badge variant="outline" className="border-emerald-400/40 text-emerald-200">
                          Viewed by SISO
                        </Badge>
                      </div>
                      <p className="text-xs text-white/60">{new Date(note.timestamp).toLocaleString()}</p>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}

function HeroStat({ label, value, helper }: { label: string; value: string; helper: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs uppercase tracking-[0.3em] text-white/50">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-xs text-white/60">{helper}</p>
    </div>
  );
}
