"use client";

import { Suspense, lazy, useEffect, useMemo, useRef, useState, useTransition, type ReactNode } from "react";
import Image from "next/image";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { submitClient } from "@/domains/partnerships/portal-architecture/pipeline-ops/application/pipelineOpsService";
import { submitPartner } from "@/domains/partnerships/recruitment/application/recruitmentIntakeService";
import { cn } from "@/lib/utils";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { useMobileNavigation } from "@/domains/partnerships/mobile/application/navigation-store";
import { ChatViewport } from "@/domains/partnerships/portal-architecture/community/messages/ui/mobile/components/ChatViewport";
import type { ThreadOverview } from "@/domains/partnerships/portal-architecture/community/messages/ui/mobile/components/DirectoryOverlay";
import { FallingPattern } from "@/domains/partnerships/portal-architecture/shared/forlinkpattern/falling-pattern";
import { FileText, Sparkles, Upload } from "lucide-react";
import { useHydrateOnView } from "@/domains/shared/hooks/useHydrateOnView";
import type { DirectoryEntry, FormState, PipelineOpsConfig, WizardPrompt } from "./types";

const LazyComposerBar = lazy(() =>
  import("@/domains/partnerships/portal-architecture/community/messages/ui/mobile/components/ComposerBar").then((mod) => ({
    default: mod.ComposerBar,
  })),
);

const LazyDirectoryOverlay = lazy(() =>
  import("@/domains/partnerships/portal-architecture/community/messages/ui/mobile/components/DirectoryOverlay").then((mod) => ({
    default: mod.DirectoryOverlay,
  })),
);

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

const formatNow = () => timeFormatter.format(new Date());

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
  helper?: string;
  author?: string;
  timestamp?: string;
};

const DEFAULT_ASSISTANT_MESSAGE =
  "Hey—I'm the SISO intake assistant. Answer a few quick questions and type NA or Skip anytime if you don't have the info.";

const DEFAULT_SERVICE_OPTIONS = ["Website", "Web App", "SEO", "Automation", "AI Builder", "Integrations"] as const;

const createPromptMessage = (prompt: WizardPrompt): ChatMessage => ({
  id: `prompt-${prompt.id}-${Date.now()}`,
  role: "assistant",
  content: prompt.prompt,
  helper: prompt.helper,
  author: "Intake Assistant",
  timestamp: formatNow(),
});
const initialFormState: FormState = {
  companyName: "",
  legalName: "",
  industry: "",
  companySize: "",
  partnershipType: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  socialLink: "",
  website: "",
  addressLine1: "",
  city: "",
  region: "",
  country: "",
  clientGoals: "",
  challenges: "",
  objectives: "",
  servicesRequested: [],
  timeline: "",
  budgetRange: "",
  contextNotes: "",
  commercialNotes: "",
  expectedValue: "50000",
  successProbability: "50-75%",
  riskNotes: "",
  specialRequirements: "",
  shareWithSiso: true,
  documents: [],
};

type SubmitIntakeExperienceOptions = {
  experienceId?: string;
  directoryVariant?: "messages" | "client-submissions";
  threadName?: string;
  threadAvatarLabel?: string;
  headerTitle?: string;
  headerSubtitle?: string;
  helperText?: string;
  submitVariant?: "client" | "partner";
  statusIdleLabel?: string;
  statusSubmittedLabel?: string;
  hideFloatingNavButton?: boolean;
};

type SubmitClientExperienceProps = {
  config: PipelineOpsConfig;
  experience?: SubmitIntakeExperienceOptions;
};

export default function SubmitClientExperience({ config, experience }: SubmitClientExperienceProps) {
  const {
    wizardPrompts,
    savedDraftThreads = [],
    outgoingRequests = [],
    blockedContacts = [],
    initialAssistantMessage,
  } = config;
  const experienceSettings = {
    experienceId: "submit-client",
    directoryVariant: "client-submissions" as const,
    threadName: "Submit Client",
    threadAvatarLabel: "SC",
    headerTitle: "Submit Client Intake",
    headerSubtitle: "Chat-first submission with Instant review SLA",
    helperText: "Share whatever you know—company name, WhatsApp, needs, and optional budget. We'll keep score as you go.",
    submitVariant: "client" as const,
    statusIdleLabel: "Instant review SLA",
    statusSubmittedLabel: "Submitted · Instant review",
    hideFloatingNavButton: true,
    ...(experience ?? {}),
  } satisfies Required<SubmitIntakeExperienceOptions>;
  const submitHandler = experienceSettings.submitVariant === "partner" ? submitPartner : submitClient;
  const assistantGreeting = initialAssistantMessage ?? DEFAULT_ASSISTANT_MESSAGE;
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleFieldChange = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const toggleService = (service: string) => {
    setFormState((prev) => {
      const exists = prev.servicesRequested.includes(service);
      return {
        ...prev,
        servicesRequested: exists ? prev.servicesRequested.filter((item) => item !== service) : [...prev.servicesRequested, service],
      };
    });
  };

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    handleFieldChange(
      "documents",
      files.map((file) => file.name),
    );
  };

  const handleSubmit = () => {
    setResultMessage(null);
    setErrorMessage(null);
    startTransition(async () => {
      try {
        const response = await submitHandler({
          companyName: formState.companyName,
          contactEmail: formState.contactEmail,
          contactPhone: formState.contactPhone,
          website: formState.website,
          socialLink: formState.socialLink,
          dealSizeEstimate: Number(formState.expectedValue) || 0,
          notes: [
            formState.clientGoals ? `Business: ${formState.clientGoals}` : null,
            formState.budgetRange ? `Budget: ${formState.budgetRange}` : null,
            formState.contextNotes ? `Context: ${formState.contextNotes}` : null,
            formState.commercialNotes ? `Commercials: ${formState.commercialNotes}` : null,
            formState.specialRequirements ? `Requirements: ${formState.specialRequirements}` : null,
          ]
            .filter(Boolean)
            .join(" | "),
          vertical: formState.industry || "General",
        });
        const successCopy =
          experienceSettings.submitVariant === "partner"
            ? `Partner intake ${response.intakeId} received • Recruitment review`
            : `Intake ${response.intakeId} received • Instant review`;
        setResultMessage(successCopy);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
      }
    });
  };

  useEffect(() => {
    if (!experienceSettings.hideFloatingNavButton) return undefined;
    const root = document.documentElement;
    const previous = root.dataset.hideFloatingNavButton;
    root.dataset.hideFloatingNavButton = "true";
    return () => {
      if (previous) {
        root.dataset.hideFloatingNavButton = previous;
      } else {
        delete root.dataset.hideFloatingNavButton;
      }
    };
  }, [experienceSettings.hideFloatingNavButton]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-siso-bg-primary text-siso-text-primary">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ filter: "blur(5px)", opacity: 0.7 }}
      >
        <FallingPattern className="h-full w-full [mask-image:radial-gradient(circle_at_top,#ffffff40,#000000)]" />
      </div>
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col px-2 pb-24 pt-4">
        <SubmitClientChat
          wizardPrompts={wizardPrompts}
          savedDraftThreads={savedDraftThreads}
          outgoingRequests={outgoingRequests}
          blockedContacts={blockedContacts}
          assistantGreeting={assistantGreeting}
          formState={formState}
          onFieldChange={handleFieldChange}
          toggleService={toggleService}
          onDocumentUpload={handleDocumentUpload}
          onSubmit={handleSubmit}
          isPending={isPending}
          resultMessage={resultMessage}
        errorMessage={errorMessage}
        experienceSettings={experienceSettings}
      />
      </div>
    </main>
  );
}

type SubmitClientChatProps = {
  wizardPrompts: WizardPrompt[];
  savedDraftThreads: ThreadOverview[];
  outgoingRequests: DirectoryEntry[];
  blockedContacts: DirectoryEntry[];
  assistantGreeting: string;
  formState: FormState;
  onFieldChange: <K extends keyof FormState>(field: K, value: FormState[K]) => void;
  toggleService: (service: string) => void;
  onDocumentUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  isPending: boolean;
  resultMessage: string | null;
  errorMessage: string | null;
  experienceSettings: Required<SubmitIntakeExperienceOptions>;
};

function SubmitClientChat({
  wizardPrompts,
  savedDraftThreads,
  outgoingRequests,
  blockedContacts,
  assistantGreeting,
  formState,
  onFieldChange,
  toggleService,
  onDocumentUpload,
  onSubmit,
  isPending,
  resultMessage,
  errorMessage,
  experienceSettings,
}: SubmitClientChatProps) {
  const transcriptRef = useRef<HTMLDivElement>(null);
  const { openDrawer } = useMobileNavigation();
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const intro: ChatMessage = {
      id: "intro",
      role: "assistant",
      content: assistantGreeting,
      author: "Intake Assistant",
      timestamp: formatNow(),
    };
    const firstPrompt = wizardPrompts[0];
    return firstPrompt ? [intro, createPromptMessage(firstPrompt)] : [intro];
  });
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isDirectoryOpen, setDirectoryOpen] = useState(false);
  const [composerHeight, setComposerHeight] = useState(0);
  const [activeThreadId, setActiveThreadId] = useState(experienceSettings.experienceId);
  const { ref: composerHydrateRef, hydrated: composerInView } = useHydrateOnView<HTMLDivElement>({ rootMargin: "240px 0px" });
  const [composerRequested, setComposerRequested] = useState(false);
  const shouldRenderComposer = composerInView || composerRequested;

  useEffect(() => {
    if (!transcriptRef.current) return;
    transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
  }, [messages]);

  const currentPrompt = wizardPrompts[currentPromptIndex];
  const quickReplies = currentPrompt?.quickReplies ?? [];

  const pushMessage = (message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  const goToNextPrompt = () => {
    if (currentPromptIndex >= wizardPrompts.length - 1) return;
    const nextIndex = currentPromptIndex + 1;
    setCurrentPromptIndex(nextIndex);
    pushMessage(createPromptMessage(wizardPrompts[nextIndex]));
  };

  const persistPromptValue = (prompt: WizardPrompt, value: string) => {
    if (!prompt.field) return;
    if (prompt.field === "servicesRequested" || prompt.field === "documents") return;
    if (prompt.field === "shareWithSiso") {
      onFieldChange("shareWithSiso", value !== "Keep private");
      return;
    }
    onFieldChange(prompt.field, value as FormState[typeof prompt.field]);
  };

  const completePrompt = (value: string, { skip = false, display }: { skip?: boolean; display?: string } = {}) => {
    const prompt = wizardPrompts[currentPromptIndex];
    if (!prompt) return;
    const trimmed = value.trim();
    const isSkippableType = prompt.type === "multi-select" || prompt.type === "upload";
    if (!skip && prompt.required && !trimmed && !isSkippableType) {
      return;
    }
    const content = display ?? (skip ? "Skip for now" : trimmed || "Not sure");
    pushMessage({ id: `user-${prompt.id}-${Date.now()}`, role: "user", content, author: "You", timestamp: formatNow() });
    if (!skip && !isSkippableType) {
      persistPromptValue(prompt, trimmed);
    } else if (skip && prompt.field && prompt.field !== "servicesRequested" && prompt.field !== "documents") {
      persistPromptValue(prompt, "");
    }
    setInputValue("");
    goToNextPrompt();
  };

  const handleMultiSelectConfirm = () => {
    const hasSelection = formState.servicesRequested.length > 0;
    completePrompt(formState.servicesRequested.join(", "), {
      skip: !hasSelection,
      display: hasSelection ? `Selected: ${formState.servicesRequested.join(", ")}` : "Skip for now",
    });
  };

  const handleUploadContinue = () => {
    const hasDocs = formState.documents.length > 0;
    completePrompt(hasDocs ? `${formState.documents.length} docs uploaded` : "No docs", {
      skip: !hasDocs,
      display: hasDocs ? `${formState.documents.length} docs uploaded` : "Skip for now",
    });
  };

  const isTextPrompt = currentPrompt?.type === "text" || currentPrompt?.type === "textarea";
  const composerInputDisabled = !currentPrompt || !isTextPrompt;
  const composerPlaceholder = currentPrompt?.placeholder ?? currentPrompt?.prompt ?? "Type an update";

  const handleComposerSend = () => {
    if (composerInputDisabled || !currentPrompt || inputValue.trim().length === 0) {
      return;
    }
    completePrompt(inputValue);
  };

  const renderInlineActions = () => {
    if (!currentPrompt) return null;

    const header = (
      <div className="space-y-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/80">{currentPrompt.prompt}</p>
        {currentPrompt.helper ? <p className="text-xs text-white/60">{currentPrompt.helper}</p> : null}
      </div>
    );

    const container = (children: ReactNode) => (
      <div className="mt-4 space-y-3 rounded-[22px] border border-white/15 bg-black/25 p-4 text-sm text-white/80">{children}</div>
    );

    if (currentPrompt.type === "multi-select") {
      const hasSelection = formState.servicesRequested.length > 0;
      const services = currentPrompt.options ?? DEFAULT_SERVICE_OPTIONS;
      return container(
        <>
          {header}
          <div className="flex flex-wrap gap-2">
            {services.map((service) => {
              const selected = formState.servicesRequested.includes(service);
              return (
                <button
                  type="button"
                  key={service}
                  onClick={() => toggleService(service)}
                  className={cn(
                    "rounded-full border px-4 py-1 text-sm transition",
                    selected ? "border-siso-orange bg-siso-orange/15 text-white" : "border-white/15 text-white/70 hover:text-white",
                  )}
                >
                  {service}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" disabled={!hasSelection && currentPrompt.required} onClick={handleMultiSelectConfirm}>
              {hasSelection ? "Confirm selection" : "Skip"}
            </Button>
          </div>
        </>
      );
    }

    if (currentPrompt.type === "chips") {
      return container(
        <>
          {header}
          <div className="flex flex-wrap gap-2">
            {(currentPrompt.options ?? []).map((option) => (
              <button
                type="button"
                key={option}
                onClick={() => completePrompt(option, { display: option })}
                className="rounded-full border border-white/15 px-4 py-1 text-sm text-white/80 hover:border-white hover:text-white"
              >
                {option}
              </button>
            ))}
          </div>
          {!currentPrompt.required && (
            <Button type="button" variant="ghost" className="text-white/70" onClick={() => completePrompt("", { skip: true })}>
              Skip
            </Button>
          )}
        </>
      );
    }

    if ((currentPrompt.quickReplies ?? []).length > 0 && isTextPrompt) {
      return container(
        <>
          {header}
          <div className="flex flex-wrap gap-2">
            {(currentPrompt.quickReplies ?? []).map((reply) => (
              <button
                key={reply}
                type="button"
                onClick={() => completePrompt(reply, { display: reply })}
                className="rounded-full border border-white/15 px-4 py-1 text-sm text-white/80 hover:border-white hover:text-white"
              >
                {reply}
              </button>
            ))}
          </div>
        </>
      );
    }

    return null;
  };

  const renderPromptPanel = () => {
    if (!currentPrompt) return null;

    const wrap = (node: ReactNode) => (
      <div className="mx-auto mt-4 w-full max-w-5xl px-4">
        <div className="space-y-3 rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm text-white/85">{node}</div>
      </div>
    );

    if (currentPrompt.type === "multi-select" || currentPrompt.type === "chips" || ((currentPrompt.quickReplies ?? []).length > 0 && isTextPrompt)) {
      return null;
    }

    if (currentPrompt.type === "summary") {
      return wrap(
        <>
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/80">{currentPrompt.prompt}</p>
          <p className="text-xs text-white/60">Review the intake before submitting.</p>
          <div className="space-y-3 rounded-2xl border border-white/10 bg-black/20 p-3">
            <SummaryRow label="Company" value={formState.companyName || "—"} helper={formState.companySize || "Size unknown"} />
            <SummaryRow label="Primary contact" value={formState.contactName || "—"} helper={formState.contactEmail || formState.contactPhone || ""} />
            <SummaryRow label="Services" value={formState.servicesRequested.join(", ") || "No services selected"} helper={formState.website || formState.socialLink || ""} />
            <SummaryRow label="Value" value={formState.expectedValue ? `$${Number(formState.expectedValue).toLocaleString()}` : "Unknown"} helper={formState.budgetRange ? `Budget ${formState.budgetRange}` : "Budget Unknown"} />
            <SummaryRow label="Notes" value={formState.contextNotes || formState.clientGoals || "No additional notes"} />
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white">
            <div>
              <p className="font-semibold">Share notes with SISO</p>
              <p className="text-white/70">Gives Partner Success visibility.</p>
            </div>
            <Switch checked={formState.shareWithSiso} onCheckedChange={(value) => onFieldChange("shareWithSiso", value)} />
          </div>
          {formState.documents.length > 0 && (
            <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-3">
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">Docs</p>
              {formState.documents.map((doc) => (
                <div key={doc} className="flex items-center gap-2 text-sm text-white/80">
                  <FileText className="h-4 w-4 text-siso-orange" />
                  {doc}
                </div>
              ))}
            </div>
          )}
          {resultMessage && (
            <Alert className="border-emerald-500/60 bg-emerald-500/10 text-emerald-100">
              <AlertDescription>{resultMessage}</AlertDescription>
            </Alert>
          )}
          {errorMessage && (
            <Alert className="border-rose-500/60 bg-rose-500/10 text-rose-100">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          <Button type="button" disabled={isPending} className="w-full rounded-2xl bg-siso-orange py-3 text-black hover:bg-orange-400" onClick={onSubmit}>
            {isPending ? "Submitting…" : "Submit to SISO"}
          </Button>
        </>
      );
    }

    if (currentPrompt.type === "upload") {
      const hasDocs = formState.documents.length > 0;
      return wrap(
        <>
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/80">{currentPrompt.prompt}</p>
          <p className="text-xs text-white/60">{currentPrompt.helper}</p>
          <label className="flex cursor-pointer items-center gap-2 rounded-2xl border border-dashed border-white/20 bg-white/5 px-4 py-3 text-sm text-white/80">
            <Upload className="h-4 w-4" />
            <span>Upload docs / decks</span>
            <input type="file" multiple className="hidden" onChange={onDocumentUpload} />
          </label>
          {hasDocs ? (
            <ul className="space-y-2 text-sm text-white/80">
              {formState.documents.map((doc) => (
                <li key={doc} className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-siso-orange" />
                  {doc}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-white/60">{currentPrompt.helper}</p>
          )}
          <div className="flex gap-2">
            <Button type="button" onClick={handleUploadContinue}>
              Continue
            </Button>
            {!hasDocs && (
              <Button type="button" variant="ghost" className="text-white/70" onClick={() => completePrompt("", { skip: true })}>
                Skip
              </Button>
            )}
          </div>
        </>
      );
    }

    return null;
  };

  const totalStages = Math.max(wizardPrompts.length - 1, 1);
  const progressStages = Math.min(currentPromptIndex, totalStages);
  const progressPercent = Math.min(100, Math.round((progressStages / totalStages) * 100));

  const threads = useMemo<ThreadOverview[]>(() => {
    const currentPreview = resultMessage ? "Submitted • Instant review" : `Draft in progress • ${progressPercent}%`;
    return [
      {
        id: experienceSettings.experienceId,
        name: experienceSettings.threadName,
        preview: currentPreview,
        unreadCount: 0,
        badge: resultMessage ? "Submitted" : "Active",
        category: "Active Intake",
        status: resultMessage ? "submitted" : "active",
      },
      ...savedDraftThreads,
    ];
  }, [experienceSettings.experienceId, experienceSettings.threadName, progressPercent, resultMessage, savedDraftThreads]);

  const threadStatus = resultMessage ? experienceSettings.statusSubmittedLabel : experienceSettings.statusIdleLabel;
  const directoryFallback = isDirectoryOpen ? (
    <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/80 text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
      Loading saved drafts…
    </div>
  ) : null;
  const composerFallback = (
    <div className="mx-auto w-full max-w-5xl px-4 pb-6">
      <div className="space-y-2 rounded-[22px] border border-white/10 bg-white/5 p-4 text-xs uppercase tracking-[0.35em] text-white/60 animate-pulse">
        <div className="flex items-center justify-between font-semibold text-white/80">
          <span>Completion</span>
          <span>{progressPercent}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-white/15">
          <div className="h-full rounded-full bg-gradient-to-r from-siso-orange/60 to-orange-300/60" style={{ width: `${progressPercent}%` }} />
        </div>
        <div className="h-10 w-full rounded-full bg-white/10" />
      </div>
    </div>
  );

  return (
    <>
      <Suspense fallback={directoryFallback}>
        <LazyDirectoryOverlay
          variant={experienceSettings.directoryVariant}
          isOpen={isDirectoryOpen}
          threads={threads}
          activeThreadId={activeThreadId}
          onClose={() => setDirectoryOpen(false)}
          onSelectThread={(threadId) => {
            setActiveThreadId(threadId);
            setDirectoryOpen(false);
          }}
          outgoingRequests={outgoingRequests}
          blockedUsers={blockedContacts}
        />
      </Suspense>
      <section className="relative flex min-h-screen flex-col bg-transparent">
        <ChatViewport
          isDirectoryOpen={isDirectoryOpen}
          onOpenDirectory={() => setDirectoryOpen(true)}
          threadName={experienceSettings.threadName}
          threadStatus={threadStatus}
          avatarLabel={experienceSettings.threadAvatarLabel}
          contentOffset={composerHeight + 32}
          maxWidthClassName="max-w-5xl w-full px-4"
          showAppDrawerButton
          onOpenAppDrawer={openDrawer}
        >
          <div className="space-y-5">
            <SettingsGroupCallout icon={<Sparkles className="h-4 w-4 text-siso-orange" />} title={experienceSettings.headerTitle} subtitle={experienceSettings.headerSubtitle} showChevron={false}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-left text-xs text-white/70">{experienceSettings.helperText}</div>
            </SettingsGroupCallout>
            <div ref={transcriptRef} className="space-y-3 pb-4">
              {messages.map((message) => (
                <ChatBubble key={message.id} message={message} />
              ))}
            </div>
            {renderInlineActions()}
          </div>
        </ChatViewport>

        {!isDirectoryOpen ? renderPromptPanel() : null}
        {!isDirectoryOpen ? (
          <div ref={composerHydrateRef}>
            {shouldRenderComposer ? (
              <Suspense fallback={composerFallback}>
                <LazyComposerBar
                  onHeightChange={setComposerHeight}
                  bottomOffset={0}
                  maxWidthClassName="max-w-5xl w-full px-4"
                  showAttachmentButton={false}
                  showEmojiButton={false}
                  inputPlaceholder={composerPlaceholder}
                  inputValue={inputValue}
                  onInputChange={setInputValue}
                  onSend={handleComposerSend}
                  sendDisabled={composerInputDisabled || (currentPrompt?.required && inputValue.trim().length === 0)}
                  inputDisabled={composerInputDisabled}
                  topSlot={
                    <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-white/70">
                      <div className="flex items-center justify-between uppercase tracking-[0.35em]">
                        <span>Completion</span>
                        <span>{progressPercent}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-white/15">
                        <div className="h-full rounded-full bg-gradient-to-r from-siso-orange to-orange-300" style={{ width: `${progressPercent}%` }} />
                      </div>
                    </div>
                  }
                  rightSlot={(() => {
                    const showSkipButton = Boolean(currentPrompt && !currentPrompt.required && quickReplies.length === 0 && !composerInputDisabled);
                    if (!showSkipButton) return null;
                    return (
                      <button
                        type="button"
                        className="rounded-full border border-white/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white/60"
                        onClick={() => completePrompt("", { skip: true })}
                      >
                        Skip
                      </button>
                    );
                  })()}
                />
              </Suspense>
            ) : (
              <AdaptiveComposerPlaceholder
                progressPercent={progressPercent}
                onReveal={() => setComposerRequested(true)}
                composerInputDisabled={composerInputDisabled}
              />
            )}
          </div>
        ) : null}
      </section>
    </>
  );
}

type AdaptiveComposerPlaceholderProps = {
  progressPercent: number;
  onReveal: () => void;
  composerInputDisabled: boolean;
};

function AdaptiveComposerPlaceholder({ progressPercent, onReveal, composerInputDisabled }: AdaptiveComposerPlaceholderProps) {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-6">
      <div className="space-y-3 rounded-[22px] border border-white/10 bg-white/5 p-4 text-center text-xs text-white/70">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/60">Composer sleeping</p>
        <p className="text-white/70">
          {composerInputDisabled
            ? "Complete the current step above before the composer unlocks."
            : "Scroll here or tap below to wake the intake composer when you're ready to type."}
        </p>
        <div className="h-2 w-full rounded-full bg-white/15">
          <div className="h-full rounded-full bg-gradient-to-r from-siso-orange to-orange-300" style={{ width: `${progressPercent}%` }} />
        </div>
        <button
          type="button"
          className="w-full rounded-full border border-white/30 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-white transition hover:border-white/60"
          onClick={onReveal}
        >
          Start typing
        </button>
      </div>
    </div>
  );
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <div className={cn("flex items-start gap-2", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border",
          isUser ? "order-2 border-siso-orange/40 bg-siso-orange/20" : "order-1 border-siso-orange/20 bg-siso-orange/15",
        )}
      >
        {isUser ? (
          <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-siso-text-primary">YOU</span>
        ) : (
          <Image src="/branding/siso-logo.svg" alt="SISO" width={20} height={20} className="h-5 w-5" priority={false} />
        )}
      </div>
      <div className={cn("flex max-w-[80%] flex-col gap-1", isUser ? "order-1 items-end text-right" : "order-2 items-start text-left")}>
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
          <span className="text-white">{message.author ?? (isUser ? "You" : "Intake Assistant")}</span>
          {message.timestamp ? <span>{message.timestamp}</span> : null}
        </div>
        <div
          className={cn(
            "rounded-3xl px-4 py-2 text-sm shadow-[0_6px_20px_rgba(0,0,0,0.35)]",
            isUser
              ? "rounded-br border border-siso-orange/40 bg-siso-orange text-[#120600]"
              : "rounded-bl border border-white/12 bg-siso-bg-tertiary text-white",
          )}
        >
          {message.content}
        </div>
        {!isUser && message.helper ? <p className="text-xs text-white/60">{message.helper}</p> : null}
      </div>
    </div>
  );
}

function SummaryRow({ label, value, helper }: { label: string; value: string; helper?: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-white/15 bg-black/20 px-4 py-3">
      <span className="text-xs uppercase tracking-[0.3em] text-white/60">{label}</span>
      <span className="text-base font-semibold text-white">{value}</span>
      {helper && <span className="text-sm text-white/70">{helper}</span>}
    </div>
  );
}
