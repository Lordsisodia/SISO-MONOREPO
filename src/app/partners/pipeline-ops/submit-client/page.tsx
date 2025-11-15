"use client";

import { useMemo, useRef, useState, useTransition, type ReactNode } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Timeline, type TimelineItem } from "@/components/ui/timeline";
import { submitClient } from "@/domains/partnerships/portal-architecture/pipeline-ops/application/pipelineOpsService";
import { SubmitClientForm } from "@/domains/partnerships/portal-architecture/pipeline-ops/ui/SubmitClientForm";
import { cn } from "@/lib/utils";
import { HighlightCard as GradientHighlightCard } from "@/components/ui/card-5-static";
import { SettingsGroupCallout } from "@/domains/partnerships/portal-architecture/settings/menu/SettingsGroupCallout";
import { PartnersPageShell } from "@/domains/partnerships/community/ui/CommunityPageShell";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  FileText,
  ShieldCheck,
  Sparkles,
  Upload,
  Zap,
} from "lucide-react";

const steps = [
  { id: "profile", label: "Client Profile" },
  { id: "context", label: "Project Context" },
  { id: "scope", label: "Solution Scope" },
  { id: "commercials", label: "Commercials" },
  { id: "review", label: "Review & Submit" },
] as const;

const industryOptions = ["SaaS", "E-commerce", "Healthcare", "Finance", "Consumer", "Industrial", "Public Sector", "Other"];
const partnershipTypes = [
  "Direct Partnership",
  "Revenue Sharing",
  "Referral",
  "Technology Partnership",
  "Strategic Alliance",
  "Joint Venture",
];
const budgetRanges = ["<$5k", "$5k-$10k", "$10k-$25k", "$25k-$50k", "$50k+", "Unknown"];
const timelineOptions = ["ASAP", "1-2 months", "3-6 months", "6+ months"];
const serviceOptions = ["AI Builder", "Web App", "Mobile App", "Automation", "Creative Studio", "Integrations", "Growth Ops"];
const probabilityBuckets = ["0-25%", "25-50%", "50-75%", "75%+" ];

const reviewerTeam = [
  { name: "Avery Chen", role: "Technical Review", focus: "AI Systems" },
  { name: "Jordan Miles", role: "Business Review", focus: "Revenue Ops" },
  { name: "Priya Kapoor", role: "Executive Approval", focus: "Strategic Alliances" },
];

const submissionTips = [
  "Attach at least one reference asset or spec to speed up validation.",
  "Share budget + timeline to auto-route to the correct SISO pod.",
  "Use the toggle to surface notes to Partner Success for additional context.",
];

const noteTemplates = ["Quick Notes", "Meeting Notes", "Sales Script", "Industry Research"];

type FormState = {
  companyName: string;
  legalName: string;
  industry: string;
  companySize: string;
  partnershipType: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  addressLine1: string;
  city: string;
  region: string;
  country: string;
  clientGoals: string;
  challenges: string;
  objectives: string;
  servicesRequested: string[];
  timeline: string;
  budgetRange: string;
  contextNotes: string;
  commercialNotes: string;
  expectedValue: string;
  successProbability: string;
  riskNotes: string;
  specialRequirements: string;
  shareWithSiso: boolean;
  documents: string[];
};

const initialFormState: FormState = {
  companyName: "",
  legalName: "",
  industry: "",
  companySize: "",
  partnershipType: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
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

export default function PartnersPipelineOpsSubmitClientPage() {
  return (
    <PartnersPageShell initialState={{ activeDrawerSection: "pipeline" }}>
      <SubmitClientExperience />
    </PartnersPageShell>
  );
}

function SubmitClientExperience() {
  const wizardRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<(typeof steps)[number]["id"]>(steps[0].id);
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const requiredFields: (keyof FormState)[] = [
    "companyName",
    "industry",
    "contactName",
    "contactEmail",
    "clientGoals",
    "servicesRequested",
    "timeline",
    "budgetRange",
    "expectedValue",
  ];

  const completion = useMemo(() => {
    const filled = requiredFields.filter((field) => {
      if (field === "servicesRequested") {
        return formState.servicesRequested.length > 0;
      }
      const value = formState[field];
      return typeof value === "string" ? value.trim().length > 0 : Boolean(value);
    });
    return Math.round((filled.length / requiredFields.length) * 100);
  }, [formState]);

  const validationScore = useMemo(() => {
    const base = completion;
    const docsBonus = formState.documents.length ? 10 : 0;
    const servicesBonus = Math.min(15, formState.servicesRequested.length * 3);
    return Math.min(100, base + docsBonus + servicesBonus);
  }, [completion, formState.documents.length, formState.servicesRequested.length]);

  const autoApprovalChance = useMemo(() => {
    const score = Math.round(validationScore * 0.8 + (formState.shareWithSiso ? 5 : 0));
    return Math.min(99, Math.max(36, score));
  }, [validationScore, formState.shareWithSiso]);

  const timelineItems = useMemo<TimelineItem[]>(() => {
    return [
      {
        id: "draft",
        title: "Draft Submission",
        description: completion >= 80 ? "Ready for validation" : "Complete remaining required fields",
        status: completion >= 80 ? "completed" : "active",
      },
      {
        id: "validation",
        title: "Validation",
        description: `${validationScore}% quality score` ,
        status: validationScore >= 75 ? "completed" : "pending",
      },
      {
        id: "review",
        title: "Reviewer Assignment",
        description: "Technical + business reviewers auto-selected",
        status: completion >= 90 ? "active" : "pending",
      },
      {
        id: "sla",
        title: "SLA",
        description: resultMessage ? "SLA confirmed" : "8h SLA once submitted",
        status: resultMessage ? "completed" : "pending",
      },
    ];
  }, [completion, validationScore, resultMessage]);

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResultMessage(null);
    setErrorMessage(null);
    startTransition(async () => {
      try {
        const response = await submitClient({
          companyName: formState.companyName,
          contactEmail: formState.contactEmail,
          dealSizeEstimate: Number(formState.expectedValue) || 0,
          notes: [
            `Goals: ${formState.clientGoals}`,
            `Timeline: ${formState.timeline}`,
            `Budget: ${formState.budgetRange}`,
            formState.contextNotes ? `Context: ${formState.contextNotes}` : null,
            formState.commercialNotes ? `Commercials: ${formState.commercialNotes}` : null,
          ]
            .filter(Boolean)
            .join(" | "),
          vertical: formState.industry || "General",
        });
        setResultMessage(`Intake ${response.intakeId} received • SLA ${response.estimatedSlaHrs}h`);
        setActiveTab("review");
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
      }
    });
  };

  const quickStats = [
    { label: "Completion", value: `${completion}%`, helper: "Required fields" },
    { label: "Validation", value: `${validationScore}%`, helper: "Quality score" },
    { label: "Auto-Approval", value: `${autoApprovalChance}%`, helper: "Prediction" },
  ];

  const scrollToWizard = () => wizardRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="min-h-screen bg-[#03040A] text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 lg:px-8">
        <GradientHighlightCard
          color="orange"
          title="Submit Client"
          description="Structured intake, reviewer automation, and SLA tracking for every opportunity."
          metricValue={`${completion}%`}
          metricLabel="Completion"
          buttonText="Start submission"
          onButtonClick={scrollToWizard}
          icon={<Sparkles className="h-4 w-4" />}
          hideDivider
          hideFooter
          className="w-full"
        >
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {quickStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/20 bg-white/10 px-3 py-2">
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/70">{stat.label}</p>
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
                <p className="text-xs text-white/70">{stat.helper}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button variant="outline" className="rounded-2xl border-white/40 text-white" onClick={() => { setActiveTab("review"); scrollToWizard(); }}>
              <ArrowRight className="mr-2 h-4 w-4" />
              Jump to review
            </Button>
          </div>
        </GradientHighlightCard>

        <div className="mt-6">
          <SettingsGroupCallout
            icon={<Clock className="h-4 w-4 text-siso-orange" />}
            title="Submission readiness"
            subtitle="Live SLA and approval odds"
            showChevron={false}
          >
            <div className="grid gap-3 rounded-[22px] border border-white/10 bg-white/5 p-4 sm:grid-cols-2">
              <MetricTile title="Review SLA" metric="8 hours" description="Average pipeline response window" />
              <MetricTile title="Auto-approval odds" metric={`${autoApprovalChance}%`} description="Based on validation score and sharing" />
            </div>
          </SettingsGroupCallout>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">
          <SettingsGroupCallout
            icon={<PenLine className="h-4 w-4 text-siso-orange" />}
            title="Submission wizard"
            subtitle="Complete each stage and validation gate"
            showChevron={false}
          >
            <div ref={wizardRef} id="submit-client-wizard" className="rounded-[22px] border border-white/10 bg-white/5 p-4">
              <form onSubmit={handleSubmit} className="space-y-6 text-white">
                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as (typeof steps)[number]["id"])} className="space-y-6">
                  <TabsList className="flex flex-wrap gap-2 bg-white/10 p-1 text-white/70">
                  {steps.map((step) => (
                    <TabsTrigger
                      key={step.id}
                      value={step.id}
                      className="rounded-full px-4 py-1 text-xs uppercase tracking-[0.2em] text-white data-[state=active]:bg-white data-[state=active]:text-black"
                    >
                      {step.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="profile" className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Client profile</p>
                    <p className="text-xs text-white/70">Company, contacts, and basics required for validation.</p>
                    <div className="mt-4 space-y-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <Field label="Company Name" required>
                          <Input value={formState.companyName} onChange={(e) => handleFieldChange("companyName", e.target.value)} placeholder="Brookstone Labs" required />
                        </Field>
                        <Field label="Legal Name">
                          <Input value={formState.legalName} onChange={(e) => handleFieldChange("legalName", e.target.value)} placeholder="Brookstone Labs Inc." />
                        </Field>
                        <Field label="Industry" required>
                          <Select value={formState.industry} onValueChange={(value) => handleFieldChange("industry", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select industry" />
                            </SelectTrigger>
                            <SelectContent>
                              {industryOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </Field>
                        <Field label="Company Size">
                          <Input value={formState.companySize} onChange={(e) => handleFieldChange("companySize", e.target.value)} placeholder="e.g., 50-100" />
                        </Field>
                        <Field label="Partnership Type">
                          <Select value={formState.partnershipType} onValueChange={(value) => handleFieldChange("partnershipType", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose partnership" />
                            </SelectTrigger>
                            <SelectContent>
                              {partnershipTypes.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </Field>
                        <Field label="Website">
                          <Input value={formState.website} onChange={(e) => handleFieldChange("website", e.target.value)} placeholder="https://" />
                        </Field>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <Field label="Primary Contact" required>
                          <Input value={formState.contactName} onChange={(e) => handleFieldChange("contactName", e.target.value)} placeholder="Jenna Ruiz" required />
                        </Field>
                        <Field label="Contact Email" required>
                          <Input type="email" value={formState.contactEmail} onChange={(e) => handleFieldChange("contactEmail", e.target.value)} placeholder="jenna@brookstone.io" required />
                        </Field>
                        <Field label="Contact Phone">
                          <Input value={formState.contactPhone} onChange={(e) => handleFieldChange("contactPhone", e.target.value)} placeholder="+1 (555) 555-0101" />
                        </Field>
                        <Field label="Headquarters">
                          <Input value={formState.addressLine1} onChange={(e) => handleFieldChange("addressLine1", e.target.value)} placeholder="123 Market St" />
                        </Field>
                        <Field label="City">
                          <Input value={formState.city} onChange={(e) => handleFieldChange("city", e.target.value)} />
                        </Field>
                        <Field label="Region / Country">
                          <Input value={formState.region} onChange={(e) => handleFieldChange("region", e.target.value)} placeholder="CA, USA" />
                        </Field>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="context" className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Project context</p>
                    <p className="text-xs text-white/70">What the client needs and why now.</p>
                    <div className="mt-4 space-y-6">
                      <Field label="Client Goals" required>
                        <Textarea value={formState.clientGoals} onChange={(e) => handleFieldChange("clientGoals", e.target.value)} rows={4} placeholder="Launch AI powered quoting flow, reduce manual ops..." required />
                      </Field>
                      <div className="grid gap-4 md:grid-cols-2">
                        <Field label="Challenges">
                          <Textarea value={formState.challenges} onChange={(e) => handleFieldChange("challenges", e.target.value)} rows={3} placeholder="No internal engineering bandwidth, compliance blockers..." />
                        </Field>
                        <Field label="Objectives">
                          <Textarea value={formState.objectives} onChange={(e) => handleFieldChange("objectives", e.target.value)} rows={3} placeholder="Close pilot before Q2, cut onboarding time by 40%..." />
                        </Field>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <Field label="Timeline" required>
                          <Select value={formState.timeline} onValueChange={(value) => handleFieldChange("timeline", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Pick timeline" />
                            </SelectTrigger>
                            <SelectContent>
                              {timelineOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </Field>
                        <Field label="Budget Range" required>
                          <Select value={formState.budgetRange} onValueChange={(value) => handleFieldChange("budgetRange", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select range" />
                            </SelectTrigger>
                            <SelectContent>
                              {budgetRanges.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </Field>
                      </div>
                      <Field label="Additional Notes">
                        <Textarea value={formState.contextNotes} onChange={(e) => handleFieldChange("contextNotes", e.target.value)} rows={3} placeholder="Preferred tooling, stakeholders, brand requirements..." />
                      </Field>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="scope" className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Solution scope</p>
                    <p className="text-xs text-white/70">Pick services + attach context for the build.</p>
                    <div className="mt-4 space-y-6">
                      <div className="space-y-2">
                        <Label>Services Requested</Label>
                        <div className="flex flex-wrap gap-2">
                          {serviceOptions.map((service) => {
                            const selected = formState.servicesRequested.includes(service);
                            return (
                              <button
                                type="button"
                                key={service}
                                onClick={() => toggleService(service)}
                                className={cn(
                                  "rounded-full border px-4 py-1 text-sm transition",
                                  selected ? "border-siso-orange bg-siso-orange/10 text-white" : "border-white/10 text-white/60 hover:text-white",
                                )}
                              >
                                {service}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <Field label="Risk factors & blockers">
                        <Textarea value={formState.riskNotes} onChange={(e) => handleFieldChange("riskNotes", e.target.value)} rows={3} placeholder="Vendor lock-in, compliance review, missing brief..." />
                      </Field>
                      <Field label="Special requirements">
                        <Textarea
                          value={formState.specialRequirements}
                          onChange={(e) => handleFieldChange("specialRequirements", e.target.value)}
                          rows={3}
                          placeholder="HIPAA, integrations, branding kits, languages..."
                        />
                      </Field>
                      <div>
                        <Label className="mb-2 block">Supporting documents</Label>
                        <label className="flex items-center gap-2 rounded-2xl border border-dashed border-white/20 bg-white/5 px-4 py-3 text-sm text-white/70">
                          <Upload className="h-4 w-4" />
                          <span>Upload docs / decks</span>
                          <input type="file" multiple className="hidden" onChange={handleDocumentUpload} />
                        </label>
                        {formState.documents.length > 0 && (
                          <ul className="mt-3 space-y-2 text-sm text-white/80">
                            {formState.documents.map((doc) => (
                              <li key={doc} className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-siso-orange" />
                                {doc}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="commercials" className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Commercials</p>
                    <p className="text-xs text-white/70">Value, probability, and deal math.</p>
                    <div className="mt-4 space-y-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <Field label="Expected value ($)" required>
                          <Input type="number" value={formState.expectedValue} onChange={(e) => handleFieldChange("expectedValue", e.target.value)} placeholder="50000" required />
                        </Field>
                        <Field label="Success probability">
                          <Select value={formState.successProbability} onValueChange={(value) => handleFieldChange("successProbability", value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {probabilityBuckets.map((bucket) => (
                                <SelectItem key={bucket} value={bucket}>
                                  {bucket}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </Field>
                      </div>
                      <Field label="Commercial notes">
                        <Textarea value={formState.commercialNotes} onChange={(e) => handleFieldChange("commercialNotes", e.target.value)} rows={3} placeholder="Procurement constraints, commission structure, payment schedule..." />
                      </Field>
                      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
                        <div>
                          <p className="font-semibold text-white">Share notes with SISO</p>
                          <p className="text-white/70">Give Partner Success visibility into client conversations.</p>
                        </div>
                        <Switch checked={formState.shareWithSiso} onCheckedChange={(value) => handleFieldChange("shareWithSiso", value)} />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="review" className="space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Submission summary</p>
                        <p className="text-xs text-white/70">Double-check before routing to SISO.</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/80">
                        <ShieldCheck className="h-4 w-4 text-siso-orange" />
                        Validation score {validationScore}% · SLA 8h
                      </div>
                    </div>
                    <div className="mt-5 space-y-5">
                      <SummaryRow label="Company" value={formState.companyName || "–"} helper={formState.industry || ""} />
                      <SummaryRow label="Primary contact" value={formState.contactName || "–"} helper={formState.contactEmail || ""} />
                      <SummaryRow label="Timeline" value={formState.timeline || "–"} helper={formState.budgetRange ? `Budget ${formState.budgetRange}` : ""} />
                      <SummaryRow label="Services" value={formState.servicesRequested.join(", ") || "Select services"} helper={formState.partnershipType || undefined} />
                      <SummaryRow label="Value" value={`$${Number(formState.expectedValue || 0).toLocaleString()}`} helper={`Probability ${formState.successProbability}`} />
                      <SummaryRow label="Notes" value={formState.contextNotes || formState.commercialNotes || "No additional notes"} />
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
                    </div>
                    <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4 md:flex-row md:items-center md:justify-between">
                      <p className="text-sm text-white/70">Submitting routes to Pipeline Ops and updates My Prospects immediately.</p>
                      <div className="flex flex-wrap gap-3">
                        <Button type="submit" disabled={isPending} className="rounded-2xl bg-siso-orange px-6 py-3 text-black hover:bg-orange-400">
                          {isPending ? "Submitting…" : "Submit to SISO"}
                        </Button>
                        <Button type="button" variant="outline" className="rounded-2xl border-white/30 text-white" onClick={() => setActiveTab("profile")}>Edit info</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </form>
          </div>
          </SettingsGroupCallout>

          <div className="space-y-6 lg:sticky lg:top-8">
            <SettingsGroupCallout
              icon={<ShieldCheck className="h-4 w-4 text-siso-orange" />}
              title="Submission health"
              subtitle="Live scoring as you fill the intake"
              showChevron={false}
            >
              <div className="space-y-4 rounded-[22px] border border-white/10 bg-white/5 p-4">
                <div>
                  <div className="flex items-center justify-between text-sm text-white/70">
                    <span>Completion</span>
                    <span className="font-semibold text-white">{completion}%</span>
                  </div>
                  <Progress value={completion} className="mt-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm text-white/70">
                    <span>Validation Score</span>
                    <span className="font-semibold text-white">{validationScore}%</span>
                  </div>
                  <Progress value={validationScore} className="mt-2 bg-white/10" />
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">Auto-approval odds</p>
                  <p className="mt-2 text-2xl font-semibold">{autoApprovalChance}%</p>
                  <p className="text-sm text-white/70">Complete context + docs to stay above 80%.</p>
                </div>
              </div>
            </SettingsGroupCallout>

            <SettingsGroupCallout
              icon={<Users className="h-4 w-4 text-siso-orange" />}
              title="Reviewer assignment"
              subtitle="Auto-matched experts"
              showChevron={false}
            >
              <div className="space-y-4 rounded-[22px] border border-white/10 bg-white/5 p-4">
                {reviewerTeam.map((reviewer) => (
                  <div key={reviewer.name} className="flex items-center gap-3 rounded-xl border border-white/15 bg-black/20 px-3 py-2">
                    <Avatar className="h-10 w-10 border border-white/10">
                      <AvatarFallback>{reviewer.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-sm">
                      <p className="font-medium text-white">{reviewer.name}</p>
                      <p className="text-white/70">{reviewer.role}</p>
                      <p className="text-xs text-white/60">Focus: {reviewer.focus}</p>
                    </div>
                    <Badge variant="outline" className="border-emerald-400/40 text-emerald-200">
                      <CheckCircle2 className="mr-1 h-3 w-3" /> Active
                    </Badge>
                  </div>
                ))}
              </div>
            </SettingsGroupCallout>

            <SettingsGroupCallout
              icon={<Clock className="h-4 w-4 text-siso-orange" />}
              title="Timeline & SLA"
              subtitle="What happens after submission"
              showChevron={false}
            >
              <div className="rounded-[22px] border border-white/10 bg-white/5 p-4 text-sm">
                <Timeline items={timelineItems} className="text-white" showTimestamps={false} />
              </div>
            </SettingsGroupCallout>

            <SettingsGroupCallout
              icon={<BookOpen className="h-4 w-4 text-siso-orange" />}
              title="Guidance"
              subtitle="Improve approval odds"
              showChevron={false}
            >
              <div className="space-y-3 rounded-[22px] border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                {submissionTips.map((tip) => (
                  <div key={tip} className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-siso-orange" />
                    <span>{tip}</span>
                  </div>
                ))}
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">Templates</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {noteTemplates.map((tpl) => (
                      <Button key={tpl} type="button" variant="ghost" className="border border-white/20 bg-black/20 px-3 py-1 text-xs text-white">
                        <Tag className="mr-1 h-3 w-3" />
                        {tpl}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </SettingsGroupCallout>

            <SettingsGroupCallout
              icon={<Zap className="h-4 w-4 text-siso-orange" />}
              title="Need a 60-second intake?"
              subtitle="Quick Action version for fast leads"
              showChevron={false}
            >
              <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                <ScrollArea className="h-[420px] pr-2">
                  <SubmitClientForm />
                </ScrollArea>
              </div>
            </SettingsGroupCallout>
          </div>
        </div>
      </div>
    </main>

  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm text-white/80">
        {label}
        {required && <span className="ml-1 text-siso-orange">*</span>}
      </Label>
      {children}
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

function MetricTile({ title, metric, description }: { title: string; metric: string; description: string }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-black/20 px-4 py-3">
      <p className="text-xs uppercase tracking-[0.35em] text-white/60">{title}</p>
      <p className="text-2xl font-semibold text-white">{metric}</p>
      <p className="text-sm text-white/70">{description}</p>
    </div>
  );
}
