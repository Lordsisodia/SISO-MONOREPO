"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Shield, Download, Trash2, Eye, EyeOff, Users, Database, ChevronRight, ChevronLeft, FileText, History, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { formatDateShort } from "@/domains/shared/utils/date";
import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";
import SectionHeader from "@/domains/shared/ui/settings/SectionHeader";
import { InfoButton } from "@/components/ui/info-button";
import { HighlightCard } from "@/components/ui/card-5-static";
import ScrimList from "@/domains/shared/ui/settings/ScrimList";
import ToggleRow from "@/domains/shared/ui/settings/ToggleRow";

type ProfileVisibility = "public" | "partners-only" | "private";
type ExportFormat = "json" | "csv";
type ExportStatus = "idle" | "processing" | "ready" | "downloading";

interface PrivacyAuditTrail {
  id: string;
  action: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

interface PrivacyPolicy {
  version: string;
  lastUpdated: string;
}

const initialAuditTrail: PrivacyAuditTrail[] = [
  {
    id: "1",
    action: "Profile visibility changed to Partners-only",
    date: "2024-11-10T14:30:00Z",
    status: "completed"
  },
  {
    id: "2",
    action: "Data export requested (JSON format)",
    date: "2024-11-08T09:15:00Z",
    status: "completed"
  },
  {
    id: "3",
    action: "Marketing consent updated",
    date: "2024-11-05T16:45:00Z",
    status: "completed"
  }
];

const privacyPolicyInfo: PrivacyPolicy = {
  version: "2.1.0",
  lastUpdated: "2024-11-01"
};

export function PrivacySettingsScreen() {
  // Privacy controls state
  const [profileVisibility, setProfileVisibility] = useState<ProfileVisibility>("partners-only");
  const [showEmail, setShowEmail] = useState(true);
  const [showPhone, setShowPhone] = useState(false);
  const [activityStatus, setActivityStatus] = useState(false);

  // Consent management state
  const [dataProcessingConsent, setDataProcessingConsent] = useState(true);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(true);

  // Data export state
  const [exportFormat, setExportFormat] = useState<ExportFormat>("json");
  const [exportStatus, setExportStatus] = useState<ExportStatus>("idle");
  const [exportProgress, setExportProgress] = useState(0);
  const [exportUrl, setExportUrl] = useState<string | null>(null);
  const [lastExportDate, setLastExportDate] = useState<Date | null>(new Date("2024-11-08"));

  // Privacy audit trail state
  const [auditTrail, setAuditTrail] = useState<PrivacyAuditTrail[]>(initialAuditTrail);

  // Add action to audit trail
  const addAuditAction = (action: string, status: "completed" | "pending" | "failed" = "completed") => {
    const newAction: PrivacyAuditTrail = {
      id: Date.now().toString(),
      action,
      date: new Date().toISOString(),
      status
    };
    setAuditTrail(prev => [newAction, ...prev].slice(0, 10)); // Keep last 10 actions
  };

  // Handle privacy controls changes
  const handleProfileVisibilityChange = (value: ProfileVisibility) => {
    setProfileVisibility(value);
    addAuditAction(`Profile visibility changed to ${value.charAt(0).toUpperCase() + value.slice(1).replace('-', ' ')}`);
  };

  const handleContactInfoChange = (type: "email" | "phone", value: boolean) => {
    if (type === "email") {
      setShowEmail(value);
      addAuditAction(`Email visibility ${value ? "enabled" : "disabled"}`);
    } else {
      setShowPhone(value);
      addAuditAction(`Phone visibility ${value ? "enabled" : "disabled"}`);
    }
  };

  const handleActivityStatusChange = (value: boolean) => {
    setActivityStatus(value);
    addAuditAction(`Activity status ${value ? "enabled" : "disabled"}`);
  };

  // Handle consent changes
  const handleConsentChange = (type: "dataProcessing" | "marketing" | "analytics", value: boolean) => {
    switch (type) {
      case "dataProcessing":
        setDataProcessingConsent(value);
        addAuditAction(`Data processing consent ${value ? "granted" : "revoked"}`);
        break;
      case "marketing":
        setMarketingConsent(value);
        addAuditAction(`Marketing communications ${value ? "enabled" : "disabled"}`);
        break;
      case "analytics":
        setAnalyticsConsent(value);
        addAuditAction(`Analytics and improvement ${value ? "enabled" : "disabled"}`);
        break;
    }
  };

  // Handle data export
  const handleExportRequest = async () => {
    setExportStatus("processing");
    setExportProgress(0);
    addAuditAction(`Data export requested (${exportFormat.toUpperCase()} format)`, "pending");

    // Simulate export progress
    const progressInterval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 20;
      });
    }, 500);

    // Simulate export completion
    setTimeout(() => {
      setExportStatus("ready");
      setExportUrl(`/api/export/data.${exportFormat}?timestamp=${Date.now()}`);
      setLastExportDate(new Date());
      addAuditAction(`Data export completed (${exportFormat.toUpperCase()} format)`);
    }, 3000);
  };

  const handleDownload = () => {
    if (exportUrl) {
      setExportStatus("downloading");
      addAuditAction(`Data export downloaded`);
      // Simulate download
      setTimeout(() => {
        setExportStatus("idle");
        setExportUrl(null);
      }, 1000);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    // SSR-safe: fixed locale + UTC to avoid hydration mismatches
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    }).format(new Date(dateString));
  };

  return (
    <>
      <style jsx global>{``}</style>
      <SettingsDetailLayout
        title=""
        description=""
        wrapContent={false}
        backHref={null}
        compactHeader
        hideHeader
        srTitle="Privacy Settings"
      >
        <div className="privacy-settings-scope space-y-4 pb-32 text-siso-text-primary">
        {/* Privacy Header Card - moved to top as title */}
        <div className="relative min-h-[128px]">
            <div className="pointer-events-none absolute inset-y-0 left-3 z-10 flex items-center">
              <Link
                href="/partners/settings"
                className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center text-white transition hover:text-white/80"
                aria-label="Back to settings"
              >
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </div>
          <HighlightCard
            color="orange"
            className="w-full pl-12 privacy-card"
            title="Privacy"
            description="Control your data, visibility, and communication preferences"
            hideDivider
            hideFooter
            titleClassName="uppercase tracking-[0.35em] font-semibold text-[28px] leading-[1.2]"
            descriptionClassName="text-xs"
            icon={<Shield className="h-5 w-5" />}
            metricValue=""
            metricLabel=""
            buttonText=""
            onButtonClick={() => {}}
          />
        </div>

        {/* Enhanced Privacy Controls (double callout) */}
        <section className="space-y-5">
          <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
            <div className="px-4 pt-4 flex items-start justify-between">
              <SectionHeader
                title="Privacy Controls"
                subtitle="Manage your visibility and data sharing preferences."
                icon={<Shield className="h-6 w-6" />}
              />
              <InfoButton label="About privacy controls" content="Privacy controls help you choose what others can see and how your data is shared." side="bottom" />
            </div>

            <div className="m-3 space-y-3">
              {/* Profile Visibility (inner callout) */}
              <div className="rounded-[18px] border border-white/10 bg-white/5 p-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white/5 text-siso-orange flex items-center justify-center">
                    <Users className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-siso-text-primary whitespace-normal break-words">Profile Visibility</p>
                    <p className="text-xs text-siso-text-muted whitespace-normal break-words">Control who can see your profile information</p>
                  </div>
                </div>
                <div className="ml-13 mt-3 space-y-2">
                  {[
                    { value: "public" as ProfileVisibility, label: "Public", description: "Anyone can view your profile" },
                    { value: "partners-only" as ProfileVisibility, label: "Partners Only", description: "Only verified partners can view your profile" },
                    { value: "private" as ProfileVisibility, label: "Private", description: "Your profile is hidden from everyone" }
                  ].map((option) => (
                    <label key={option.value} className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="profileVisibility"
                        value={option.value}
                        checked={profileVisibility === option.value}
                        onChange={(e) => handleProfileVisibilityChange(e.target.value as ProfileVisibility)}
                        className="mt-1 w-4 h-4 text-siso-orange bg-siso-border border-white/20 focus:ring-siso-orange/50 focus:ring-2"
                      />
                      <div>
                        <p className="text-sm text-siso-text-primary">{option.label}</p>
                        <p className="text-xs text-siso-text-muted">{option.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Contact Information (inner callout) */}
              <div className="rounded-[18px] border border-white/10 bg-white/5 p-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white/5 text-siso-orange flex items-center justify-center">
                    <Database className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-siso-text-primary whitespace-normal break-words">Contact Information</p>
                    <p className="text-xs text-siso-text-muted whitespace-normal break-words">Control who can see your contact details</p>
                  </div>
                </div>
                <div className="ml-13 mt-3 space-y-3">
                  <ToggleRow
                    id="showEmail"
                    label="Show Email Address"
                    description="Allow partners to see your email address"
                    checked={showEmail}
                    onChange={() => handleContactInfoChange("email", !showEmail)}
                  />
                  <ToggleRow
                    id="showPhone"
                    label="Show Phone Number"
                    description="Allow partners to see your phone number"
                    checked={showPhone}
                    onChange={() => handleContactInfoChange("phone", !showPhone)}
                  />
                </div>
              </div>

              {/* Activity Status (inner callout) */}
              <div className="rounded-[18px] border border-white/10 bg-white/5 p-4">
                <ToggleRow
                  id="activityStatus"
                  label="Activity Status"
                  description="Show when you're active to partners"
                  checked={activityStatus}
                  onChange={() => handleActivityStatusChange(!activityStatus)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Consent Management (double callout) */}
        <section className="space-y-5">
          <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
            <div className="px-4 pt-4 flex items-start justify-between">
              <SectionHeader
                title="Consent Management"
                subtitle="Manage your data processing and communication preferences."
                icon={<CheckCircle className="h-6 w-6" />}
              />
              <InfoButton label="About consent" content="Control consent for processing, marketing, and analytics. You can change these anytime." side="bottom" />
            </div>

            <div className="m-3 space-y-3">
              <div className="rounded-[18px] border border-white/10 bg-white/5 p-4">
                <ToggleRow
                  id="dataProcessing"
                  label="Data Processing Consent"
                  description="Required consent for processing your personal data to provide our services"
                  checked={dataProcessingConsent}
                  onChange={() => handleConsentChange("dataProcessing", !dataProcessingConsent)}
                />
                <div className="ml-13">
                  <p className="text-xs text-siso-text-muted italic">
                    This consent is required for using our platform. Revoking it may limit access to some features.
                  </p>
                </div>
              </div>

              <div className="rounded-[18px] border border-white/10 bg-white/5 p-4">
                <ToggleRow
                  id="marketingConsent"
                  label="Marketing Communications"
                  description="Receive updates about new features, opportunities, and promotional content"
                  checked={marketingConsent}
                  onChange={() => handleConsentChange("marketing", !marketingConsent)}
                />
              </div>

              <div className="rounded-[18px] border border-white/10 bg-white/5 p-4">
                <ToggleRow
                  id="analyticsConsent"
                  label="Analytics and Improvement"
                  description="Help us improve our services with anonymous usage analytics"
                  checked={analyticsConsent}
                  onChange={() => handleConsentChange("analytics", !analyticsConsent)}
                />
                <div className="ml-13">
                  <p className="text-xs text-siso-text-muted italic">
                    Analytics data is anonymized and used only for service improvement purposes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Data Export (double callout) */}
        <section className="space-y-5">
          <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
            <div className="px-4 pt-4 flex items-start justify-between">
              <SectionHeader
                title="Data Export"
                subtitle="Download a copy of your personal data and account information."
                icon={<Download className="h-6 w-6" />}
              />
              <InfoButton label="About exports" content="Create a portable copy of your account data. Processing may take a few minutes." side="bottom" />
            </div>

            <div className="m-3 space-y-3">
              <div className="rounded-[18px] border border-white/10 bg-white/5 p-4">
                {/* Format Selection */}
                <div className="space-y-3 mb-6">
                  <p className="text-sm font-medium text-siso-text-primary">Select Format:</p>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="exportFormat"
                        value="json"
                        checked={exportFormat === "json"}
                        onChange={(e) => setExportFormat(e.target.value as ExportFormat)}
                        className="w-4 h-4 text-siso-orange bg-siso-border border-white/20 focus:ring-siso-orange/50 focus:ring-2"
                      />
                      <span className="text-sm text-siso-text-primary">JSON</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="exportFormat"
                        value="csv"
                        checked={exportFormat === "csv"}
                        onChange={(e) => setExportFormat(e.target.value as ExportFormat)}
                        className="w-4 h-4 text-siso-orange bg-siso-border border-white/20 focus:ring-siso-orange/50 focus:ring-2"
                      />
                      <span className="text-sm text-siso-text-primary">CSV</span>
                    </label>
                  </div>
                </div>

                {/* Progress Indicator */}
                {exportStatus === "processing" && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-siso-text-primary">Preparing your export...</p>
                      <p className="text-sm text-siso-text-primary">{exportProgress}%</p>
                    </div>
                    <div className="w-full bg-siso-border rounded-full h-2">
                      <div className="bg-siso-orange h-2 rounded-full transition-all duration-300" style={{ width: `${exportProgress}%` }} />
                    </div>
                  </div>
                )}

                {/* Export/Download Button */}
                <div className="flex gap-3">
                  {exportStatus === "idle" && (
                    <button
                      type="button"
                      onClick={handleExportRequest}
                      className="rounded-full border border-siso-border/50 px-6 py-3 text-sm font-medium text-siso-text-muted transition hover:border-siso-orange/60 hover:text-siso-orange"
                    >
                      Request Export
                    </button>
                  )}
                  {exportStatus === "processing" && (
                    <button
                      type="button"
                      disabled
                      className="rounded-full border border-siso-border/30 px-6 py-3 text-sm font-medium text-siso-text-muted/50 cursor-not-allowed"
                    >
                      Processing...
                    </button>
                  )}
                  {exportStatus === "ready" && exportUrl && (
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="rounded-full border border-siso-orange/60 bg-siso-orange/10 px-6 py-3 text-sm font-medium text-siso-orange transition hover:bg-siso-orange/20"
                    >
                      Download Export
                    </button>
                  )}
                  {exportStatus === "downloading" && (
                    <button
                      type="button"
                      disabled
                      className="rounded-full border border-siso-border/30 px-6 py-3 text-sm font-medium text-siso-text-muted/50 cursor-not-allowed"
                    >
                      Downloading...
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Audit Trail (title inside) */}
        <section className="space-y-5">
          <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
            <div className="px-6 pt-4 flex items-start justify-between">
              <SectionHeader
                title="Privacy Audit Trail"
                subtitle="Recent changes to your privacy settings and data activities."
                icon={<History className="h-6 w-6" />}
              />
              <InfoButton label="What is the audit trail?" content="Shows a history of privacy-related actions on your account for transparency." side="bottom" />
            </div>
            <div className="p-6">
              {auditTrail.length === 0 ? (
                <div className="text-center py-8">
                  <History className="h-12 w-12 text-siso-text-muted/30 mx-auto mb-3" />
                  <p className="text-sm text-siso-text-muted">No recent privacy activity</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {auditTrail.map((action) => (
                    <div key={action.id} className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                      <div className="mt-1">
                        {action.status === "completed" && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                        {action.status === "pending" && (
                          <Clock className="h-4 w-4 text-yellow-500" />
                        )}
                        {action.status === "failed" && (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-siso-text-primary">{action.action}</p>
                        <p className="text-xs text-siso-text-muted">{formatDate(action.date)}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        action.status === "completed" ? "bg-green-500/10 text-green-500" :
                        action.status === "pending" ? "bg-yellow-500/10 text-yellow-500" :
                        "bg-red-500/10 text-red-500"
                      }`}>
                        {action.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Privacy Policy Link (title inside) */}
        <section className="space-y-5">
          <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary p-6 shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
            <div className="-mt-2 mb-2 flex items-start justify-between">
              <SectionHeader
                title="Privacy Policy"
                subtitle="View our current privacy policy and terms."
                icon={<FileText className="h-6 w-6" />}
              />
              <InfoButton label="About this policy" content="Learn how we collect, use, and protect your personal information." side="bottom" />
            </div>
            <div className="m-1">
              <div className="rounded-[18px] border border-white/10 bg-white/5 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-siso-text-muted">
                      Version: <span className="text-siso-text-primary font-medium">{privacyPolicyInfo.version}</span>
                    </span>
                    <span className="text-xs text-siso-text-muted">
                      Last updated: <span className="text-siso-text-primary font-medium">{privacyPolicyInfo.lastUpdated}</span>
                    </span>
                  </div>
                  <Link
                    href="/partners/privacy-policy"
                    className="inline-flex items-center gap-2 self-start rounded-full border border-siso-border/50 px-4 py-2 text-sm font-medium text-siso-text-muted transition hover:border-siso-orange/60 hover:text-siso-orange"
                  >
                    View Privacy Policy
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Delete Account Section (no outer title) */}
        <section className="space-y-5">
          <div className="rounded-[26px] border border-red-500/20 bg-red-500/5 p-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center">
                <Trash2 className="h-8 w-8" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-red-500">Delete Account</h3>
                <p className="text-sm text-siso-text-muted mb-4">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <button
                  type="button"
                  className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-500/20"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SettingsDetailLayout>
    </>
  );
}
