"use client";

import { useState } from "react";
import Link from "next/link";
import { HighlightCard } from "@/components/ui/card-5-static";
import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";
import { SettingsGroupCallout } from "../../menu/SettingsGroupCallout";
import { IdCard, Edit3, ChevronLeft, Mail, Phone, Shield, Users, Globe, CreditCard, Activity, AlertTriangle, Download, ArrowRight, Pause, XCircle, Settings } from "lucide-react";
import { InfoButton } from "@/components/ui/info-button";
import { useAccountSettings } from "../application/useAccountSettings";
import ScrimList from "@/domains/shared/ui/settings/ScrimList";

export function AccountSettingsView() {
  const { contactFields, twoFactorActions, hero } = useAccountSettings();
  const [infoItem, setInfoItem] = useState(null);

  const accountInfoData = {
    contactDetails: {
      title: "Contact Details",
      description: "Keep your contact information up to date for important account communications and partner interactions. These details help us verify your identity and ensure you receive important updates about your partnership activities.",
      items: [
        "Username appears in your public profile and partner communications",
        "Email verification required for security notifications and account recovery",
        "Phone number adds an extra layer of security for account access",
        "Recovery email helps you regain access if you lose your primary email"
      ]
    },
    accountHealth: {
      title: "Account Health",
      description: "Monitor your account's overall status and performance. A healthy account ensures smooth partnership operations and access to all platform features.",
      items: [
        "Health score reflects account completeness and activity level",
        "Account age affects partnership trust and access to advanced features",
        "Warnings indicate issues that may need attention",
        "Regular activity helps maintain good account standing"
      ]
    },
    accountActions: {
      title: "Account Actions",
      description: "Manage your account lifecycle and data with these important administrative functions. Each action has different implications for your partnership continuity.",
      items: [
        "Export Data: Download all your account information in standard formats",
        "Transfer Account: Move ownership to another partner (requires approval)",
        "Pause Account: Temporarily suspend without losing data",
        "Delete Account: Permanently remove account and all associated data"
      ]
    }
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
        srTitle="Account"
      >
        <div className="account-settings-scope space-y-4 pb-32 text-siso-text-primary">
          {/* Account Header Card */}
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
              className="w-full pl-12 account-card"
              title="Account"
              description="Manage your partner identity, security, and workspace identity"
              icon={<IdCard className="h-5 w-5" />}
              metricValue=""
              metricLabel=""
              buttonText=""
              onButtonClick={() => {}}
              hideDivider
              hideFooter
              titleClassName="uppercase tracking-[0.35em] font-semibold text-[28px] leading-[1.2]"
              descriptionClassName="text-xs"
            />
          </div>

          {/* Original Account Content */}
          <div className="space-y-8 pb-32 text-siso-text-primary">
        <div className="rounded-3xl border border-siso-border/60 bg-gradient-to-br from-siso-bg-secondary/80 via-siso-bg-tertiary/70 to-siso-bg-secondary px-4 py-5 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-siso-bg-tertiary text-lg font-semibold">SA</div>
              <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-siso-orange text-xs text-siso-bg-primary">
                <IdCard className="h-3 w-3" />
              </span>
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-base font-semibold">{hero.username}</p>
                <button
                  type="button"
                  className="rounded-full border border-siso-border/60 p-1 text-siso-text-muted transition hover:border-siso-orange hover:text-siso-orange"
                  aria-label="Edit profile handle"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="text-xs text-siso-text-muted">{hero.accountId}</p>
            </div>
          </div>
        </div>

        {/* Account Status Card */}
        <div className="rounded-3xl border border-siso-border/60 bg-gradient-to-br from-siso-bg-secondary/80 via-siso-bg-tertiary/70 to-siso-bg-secondary px-4 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
          <div className="space-y-3">
            {/* Account Type & Tier */}
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-siso-text-muted">Account Type</span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded-full bg-siso-orange/20 text-siso-orange text-xs font-medium">Partner</span>
                <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium">Pro</span>
              </div>
            </div>

            {/* Verification Status */}
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-siso-text-muted">Verification</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Mail className="h-3 w-3 text-emerald-400"/>
                  <span className="text-xs text-emerald-400">Email</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3 text-siso-text-muted"/>
                  <span className="text-xs text-siso-text-muted">Phone</span>
                </div>
              </div>
            </div>

            {/* Member Duration */}
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-siso-text-muted">Member Since</span>
              <span className="text-xs text-siso-text-primary">Oct 2024 • 2 months</span>
            </div>
          </div>
        </div>

        <section className="space-y-3">
          <SettingsGroupCallout
            icon={<IdCard className="h-4 w-4" />}
            title="Contact Details"
            subtitle="Keep your contact details up to date."
            showChevron={false}
            endBadge={<InfoButton label="About contact details" content={accountInfoData.contactDetails.description} side="bottom" />}
          >
            <ScrimList ariaLabel="Contact details list">
              {contactFields.map(({ id, label, value, icon: Icon, helper }) => (
              <ScrimList.Row key={id}>
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-siso-bg-tertiary/80 text-siso-orange">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-siso-text-muted">{label}</p>
                  <p className="truncate text-sm font-medium text-siso-text-primary">{value}</p>
                  {helper ? <p className="text-[11px] uppercase tracking-wide text-siso-orange/80">{helper}</p> : null}
                </div>
                <button
                  type="button"
                  className="rounded-full border border-white/10 p-2 text-siso-text-muted transition hover:border-siso-orange/60 hover:text-siso-orange"
                  aria-label={`Edit ${label.toLowerCase()}`}
                >
                  <Edit3 className="h-3.5 w-3.5" />
                </button>
              </ScrimList.Row>
              ))}
            </ScrimList>
          </SettingsGroupCallout>
        </section>

  
        {/* Account Health Section */}
        <section className="space-y-3">
          <SettingsGroupCallout
            icon={<Activity className="h-4 w-4" />}
            title="Account Health"
            subtitle="Monitor account status and activity"
            showChevron={false}
            endBadge={<InfoButton label="About account health" content={accountInfoData.accountHealth.description} side="bottom" />}
          >
            <ScrimList ariaLabel="Account health list">
              <ScrimList.Row>
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                  <Activity className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-siso-text-muted">Health Score</p>
                  <p className="truncate text-sm font-medium text-siso-text-primary">Excellent</p>
                  <p className="text-[11px] uppercase tracking-wide text-emerald-400/80">95/100</p>
                </div>
              </ScrimList.Row>

              <ScrimList.Row>
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-siso-bg-tertiary/80 text-siso-orange">
                  <Shield className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-siso-text-muted">Account Age</p>
                  <p className="truncate text-sm font-medium text-siso-text-primary">2 months</p>
                  <p className="text-[11px] uppercase tracking-wide text-siso-orange/80">Since Oct 2024</p>
                </div>
              </ScrimList.Row>

              <ScrimList.Row>
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-siso-bg-tertiary/80 text-siso-orange">
                  <AlertTriangle className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-siso-text-muted">Warnings</p>
                  <p className="truncate text-sm font-medium text-siso-text-primary">None</p>
                  <p className="text-[11px] uppercase tracking-wide text-siso-text-muted">No issues detected</p>
                </div>
              </ScrimList.Row>
            </ScrimList>
          </SettingsGroupCallout>
        </section>

        {/* Account Actions Section */}
        <section className="space-y-3">
          <SettingsGroupCallout
            icon={<Settings className="h-4 w-4" />}
            title="Account Actions"
            subtitle="Manage account lifecycle and data"
            showChevron={false}
            endBadge={<InfoButton label="About account actions" content={accountInfoData.accountActions.description} side="bottom" />}
          >
            <ScrimList ariaLabel="Account actions list">
              <ScrimList.Row>
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-siso-bg-tertiary/80 text-siso-orange">
                  <Download className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-siso-text-muted">Export Data</p>
                  <p className="truncate text-sm font-medium text-siso-text-primary">Download account data</p>
                  <p className="text-[11px] uppercase tracking-wide text-siso-text-muted">CSV, JSON</p>
                </div>
                <button className="rounded-full border border-siso-orange/60 px-3 py-1.5 text-xs text-siso-orange transition hover:bg-siso-orange/10">
                  Export
                </button>
              </ScrimList.Row>

              <ScrimList.Row>
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-siso-bg-tertiary/80 text-siso-orange">
                  <ArrowRight className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-siso-text-muted">Transfer Account</p>
                  <p className="truncate text-sm font-medium text-siso-text-primary">Transfer to another user</p>
                  <p className="text-[11px] uppercase tracking-wide text-siso-text-muted">Needs approval</p>
                </div>
                <button className="rounded-full border border-siso-orange/60 px-3 py-1.5 text-xs text-siso-orange transition hover:bg-siso-orange/10">
                  Transfer
                </button>
              </ScrimList.Row>

              <ScrimList.Row>
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-yellow-500/20 text-yellow-400">
                  <Pause className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-siso-text-muted">Pause Account</p>
                  <p className="truncate text-sm font-medium text-siso-text-primary">Temporarily suspend</p>
                  <p className="text-[11px] uppercase tracking-wide text-yellow-400/80">Reversible</p>
                </div>
                <button className="rounded-full border border-yellow-500/60 px-3 py-1.5 text-xs text-yellow-400 transition hover:bg-yellow-500/10">
                  Pause
                </button>
              </ScrimList.Row>

              <ScrimList.Row>
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-red-500/20 text-red-400">
                  <XCircle className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-siso-text-muted">Delete Account</p>
                  <p className="truncate text-sm font-medium text-siso-text-primary">Permanently delete</p>
                  <p className="text-[11px] uppercase tracking-wide text-red-400/80">Irreversible</p>
                </div>
                <button className="rounded-full border border-red-500/60 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-500/10">
                  Delete
                </button>
              </ScrimList.Row>
            </ScrimList>
          </SettingsGroupCallout>
        </section>
          </div>
        </div>

        {/* Bottom Popup for Info Content */}
        {infoItem && (
          <div className="fixed inset-0 z-[99]" role="dialog" aria-modal="true">
            <button
              className="absolute inset-0 bg-black/40"
              onClick={() => setInfoItem(null)}
              aria-label="Dismiss info overlay"
            />
            <div
              className="absolute inset-x-0 bottom-0 rounded-t-2xl border border-[rgba(255,167,38,0.32)] bg-[#0b0b0b] p-4 shadow-2xl"
              style={{ boxShadow: "0 -12px 30px rgba(0,0,0,0.6)" }}
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full" style={{ color: "var(--siso-orange)" }}>
                  <InfoIcon size={16} />
                </span>
                <h3 className="text-[15px] font-semibold text-siso-text-primary">{infoItem.title}</h3>
              </div>
              <p className="mb-3 text-[13px] text-neutral-300 leading-snug">{infoItem.description}</p>
              {infoItem.items && infoItem.items.length > 0 && (
                <div className="mb-4 space-y-2">
                  {infoItem.items.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-siso-orange mt-1 text-xs">•</span>
                      <span className="text-[13px] text-neutral-300 leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              )}
              <button
                className="w-full rounded-lg px-3 py-2 text-sm font-semibold text-white"
                style={{ background: "var(--siso-gradient-primary)" }}
                onClick={() => setInfoItem(null)}
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </SettingsDetailLayout>
    </>
  );
}
