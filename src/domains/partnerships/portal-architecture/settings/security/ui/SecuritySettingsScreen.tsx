"use client";

import { useState } from "react";
import Link from "next/link";
import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";
import { HighlightCard } from "@/components/ui/card-5";
import { Lock, Key, Shield, Smartphone, ChevronLeft, ChevronRight, MessageSquare, Mail, CreditCard } from "lucide-react";
import ScrimList from "@/domains/shared/ui/settings/ScrimList";
import ToggleRow from "@/domains/shared/ui/settings/ToggleRow";
import { SettingsGroupCallout } from "../../menu/SettingsGroupCallout";
import { TwoFactorCards } from "@/domains/partnerships/portal-architecture/settings/account/ui/components/TwoFactorCards";
import { InfoButton } from "@/components/ui/info-button";

const securityFeatures = [
  {
    id: "password",
    title: "Password Management",
    description: "Change your password and set security requirements",
    icon: Key,
    currentValue: "Strong password",
    status: "Updated 2 weeks ago"
  },
  {
    id: "2fa",
    title: "Two-Factor Authentication",
    description: "Add an extra layer of security to your account",
    icon: Lock,
    currentValue: "Enabled",
    status: "Active"
  },
  {
    id: "sessions",
    title: "Active Sessions",
    description: "Manage devices and sessions logged into your account",
    icon: Smartphone,
    currentValue: "3 devices",
    status: "Review needed"
  }
];

const securityToggles = [
  {
    id: "loginAlerts",
    label: "Login Alerts",
    description: "Get notified when someone logs into your account",
    enabled: true
  },
  {
    id: "sessionTimeout",
    label: "Auto-logout",
    description: "Automatically log out after 30 minutes of inactivity",
    enabled: false
  }
];

export function SecuritySettingsScreen() {
  const [toggles, setToggles] = useState(
    Object.fromEntries(securityToggles.map(toggle => [toggle.id, toggle.enabled]))
  );

  const [securityScore, setSecurityScore] = useState(85);

  const securityChecks = [
    { id: "password", label: "Strong password", status: "good" },
    { id: "2fa", label: "2-factor authentication", status: "good" },
    { id: "sessions", label: "Session monitoring", status: "warning" },
    { id: "breach", label: "Breach monitoring", status: "neutral" }
  ];

  const toggleSetting = (id: string) => {
    setToggles(prev => ({ ...prev, [id]: !prev[id] }));
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
        srTitle="Security Settings"
      >
        <div className="security-settings-scope space-y-4 pb-32 text-siso-text-primary">
          {/* Security Header Card */}
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
              className="w-full pl-12 security-card"
              title="Security"
              description="Password, 2FA, and session management"
              hideDivider
              hideFooter
              titleClassName="uppercase tracking-[0.35em] font-semibold text-[28px] leading-[1.2]"
              descriptionClassName="text-xs"
              icon={<Lock className="h-5 w-5" />}
              metricValue=""
              metricLabel=""
              buttonText=""
              onButtonClick={() => {}}
            />
          </div>

          {/* Security Overview */}
          <section className="space-y-5">
            <SettingsGroupCallout
              icon={<Shield className="h-4 w-4" />}
              title="Security Overview"
              subtitle="Your account security score and recommendations"
              showChevron={false}
              endBadge={<InfoButton label="What is security score?" content="We combine password strength, 2FA status, session hygiene, and breach checks into a single percentage." side="bottom" />}
            >
              <div className="rounded-3xl border border-siso-border/60 bg-gradient-to-br from-siso-bg-secondary/80 via-siso-bg-tertiary/70 to-siso-bg-secondary px-4 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-siso-text-muted">Security Score</p>
                      <p className="text-2xl font-bold text-siso-text-primary">{securityScore}%</p>
                    </div>
                    <div className="h-12 w-12 rounded-full border-4 border-siso-orange/20 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-siso-orange" />
                    </div>
                  </div>
                  <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-500 via-yellow-500 to-emerald-500 rounded-full transition-all duration-500" style={{ width: `${securityScore}%` }} />
                  </div>
                  <div className="space-y-2">
                    {securityChecks.map((check) => (
                      <div key={check.id} className="flex items-center justify-between py-1">
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${check.status === 'good' ? 'bg-emerald-400' : check.status === 'warning' ? 'bg-yellow-400' : 'bg-gray-400'}`} />
                          <span className="text-xs text-siso-text-primary">{check.label}</span>
                        </div>
                        <span className={`text-xs ${check.status === 'good' ? 'text-emerald-400' : check.status === 'warning' ? 'text-yellow-400' : 'text-gray-400'}`}>
                          {check.status === 'good' ? 'Good' : check.status === 'warning' ? 'Review' : 'Setup'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SettingsGroupCallout>
          </section>

          {/* Password Management */}
          <section className="space-y-5">
            <SettingsGroupCallout
              icon={<Key className="h-4 w-4" />}
              title="Password Management"
              subtitle="Change your password and enforce requirements"
              showChevron={false}
              endBadge={<InfoButton label="Password policy" content="Use 12+ characters, mix of letters, numbers, and symbols. Consider a manager; avoid reuse." side="bottom" />}
            >
              <ScrimList className="m-3" ariaLabel="Password management">
                <ScrimList.Row>
                  <div className="h-10 w-10 rounded-xl bg-white/5 text-siso-orange flex items-center justify-center">
                    <Key className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-siso-text-primary">Change password</p>
                    <p className="text-xs text-siso-text-muted">Create a new password for your account</p>
                  </div>
                  <button className="rounded-full border border-white/10 px-3 py-1 text-xs text-siso-text-muted transition hover:border-siso-orange/70 hover:text-siso-orange">Change</button>
                </ScrimList.Row>
                <ScrimList.Row>
                  <div className="h-10 w-10 rounded-xl bg-white/5 text-siso-orange flex items-center justify-center">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-siso-text-primary">Password requirements</p>
                    <p className="text-xs text-siso-text-muted">Set minimum length, complexity, and rotation</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-siso-text-muted" aria-hidden="true" />
                </ScrimList.Row>
              </ScrimList>
            </SettingsGroupCallout>
          </section>

          {/* Advanced Authentication */}
          <section className="space-y-5">
            <SettingsGroupCallout
              icon={<Lock className="h-4 w-4" />}
              title="Advanced Authentication"
              subtitle="Two‑factor authentication and recovery"
              showChevron={false}
              endBadge={<InfoButton label="About 2FA" content="Add a second factor (app or SMS). Store backup codes securely to avoid lockouts." side="bottom" />}
            >
              <div className="pt-1">
                <TwoFactorCards showBackup={true} />
              </div>
            </SettingsGroupCallout>
          </section>

          {/* Security Preferences */}
          <section className="space-y-5">
            <SettingsGroupCallout
              icon={<Shield className="h-4 w-4" />}
              title="Security Preferences"
              subtitle="Configure security alerts and behaviors"
              showChevron={false}
              endBadge={<InfoButton label="What are preferences?" content="Choose which security notifications you receive and how long sessions stay active." side="bottom" />}
            >
              <ScrimList className="m-3" ariaLabel="Security preferences list">
                {securityToggles.map((toggle) => (
                  <ToggleRow
                    key={toggle.id}
                    id={toggle.id}
                    label={toggle.label}
                    description={toggle.description}
                    checked={toggles[toggle.id]}
                    onChange={toggleSetting}
                  />
                ))}
              </ScrimList>
            </SettingsGroupCallout>
          </section>

          {/* Emergency Actions */}
          <section className="space-y-5">
            <SettingsGroupCallout
              icon={<Shield className="h-4 w-4" />}
              title="Emergency Actions"
              subtitle="Freeze account or sign out of all sessions"
              showChevron={false}
              endBadge={<InfoButton label="Emergency actions" content="Freeze stops all activity immediately. You can unfreeze later from a verified device." side="bottom" />}
            >
              <ScrimList ariaLabel="Emergency actions">
                <ScrimList.Row>
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-red-500/20 text-red-400">
                    <Shield className="h-4.5 w-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-siso-text-muted">Freeze Account</p>
                    <p className="truncate text-sm font-medium text-siso-text-primary">Temporarily lock your account</p>
                  </div>
                  <button className="rounded-full border border-red-500/60 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-500/10">Freeze</button>
                </ScrimList.Row>
              </ScrimList>
            </SettingsGroupCallout>
          </section>
        </div>
      </SettingsDetailLayout>
    </>
  );
}
