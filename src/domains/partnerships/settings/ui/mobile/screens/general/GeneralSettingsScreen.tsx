"use client";

import { Settings, Palette, Globe, Bell, Link2 } from "lucide-react";

export function GeneralSettingsScreen() {
  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="space-y-2 pb-6">
        <div className="flex items-center gap-3">
          <Settings className="h-6 w-6 text-siso-orange" />
          <h1 className="text-2xl font-bold text-siso-text-primary">General Settings</h1>
        </div>
        <p className="text-siso-text-muted">
          Quick access to appearance, notifications, language, and integration preferences.
          Manage your most-used settings from one central location.
        </p>
      </div>

      {/* Quick Settings Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Appearance & Accessibility Card */}
        <div className="rounded-2xl border-2 p-6 bg-siso-orange/10 border-siso-orange/60">
          <div className="flex items-start justify-between mb-4">
            <div className="h-12 w-12 rounded-xl bg-siso-orange/20 flex items-center justify-center text-siso-orange">
              <Palette className="h-8 w-8" />
            </div>
          </div>

          <h3 className="font-semibold text-siso-text-primary mb-2">
            Appearance & Accessibility
          </h3>

          <p className="text-sm text-siso-text-muted leading-relaxed">
            Theme, contrast, font size, reduced motion, haptics
          </p>

          <div className="flex items-center text-siso-orange text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity mt-4">
            <span>Configure</span>
          </div>
        </div>

        {/* Language & Region Card */}
        <div className="rounded-2xl border-2 p-6 bg-blue-500/10 border-blue-500/60">
          <div className="flex items-start justify-between mb-4">
            <div className="h-12 w-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-500">
              <Globe className="h-8 w-8" />
            </div>
          </div>

          <h3 className="font-semibold text-siso-text-primary mb-2">
            Language & Region
          </h3>

          <p className="text-sm text-siso-text-muted leading-relaxed">
            Language, timezone, number/currency formats
          </p>

          <div className="flex items-center text-siso-orange text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity mt-4">
            <span>Configure</span>
          </div>
        </div>

        {/* Notifications Card */}
        <div className="rounded-2xl border-2 p-6 bg-purple-500/10 border-purple-500/60">
          <div className="flex items-start justify-between mb-4">
            <div className="h-12 w-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-500">
              <Bell className="h-8 w-8" />
            </div>
            <span className="px-2 py-1 bg-siso-orange text-white text-xs font-medium rounded-full">
              3
            </span>
          </div>

          <h3 className="font-semibold text-siso-text-primary mb-2">
            Notifications
          </h3>

          <p className="text-sm text-siso-text-muted leading-relaxed">
            Email, push, and in-app notification preferences
          </p>

          <div className="flex items-center text-siso-orange text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity mt-4">
            <span>Configure</span>
          </div>
        </div>

        {/* App Integrations Card */}
        <div className="rounded-2xl border-2 p-6 bg-green-500/10 border-green-500/60">
          <div className="flex items-start justify-between mb-4">
            <div className="h-12 w-12 rounded-xl bg-green-500/20 flex items-center justify-center text-green-500">
              <Link2 className="h-8 w-8" />
            </div>
            <span className="px-2 py-1 bg-siso-orange text-white text-xs font-medium rounded-full">
              2 connected
            </span>
          </div>

          <h3 className="font-semibold text-siso-text-primary mb-2">
            App Integrations
          </h3>

          <p className="text-sm text-siso-text-muted leading-relaxed">
            Connect Notion, Google Drive, Calendar, and other tools
          </p>

          <div className="flex items-center text-siso-orange text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity mt-4">
            <span>Configure</span>
          </div>
        </div>
      </div>

      {/* Settings Overview */}
      <div className="mt-8 rounded-2xl border border-siso-border/60 bg-siso-bg-secondary/80 p-6">
        <h3 className="font-semibold text-siso-text-primary mb-4">Settings Overview</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-siso-text-primary">
              75%
            </div>
            <div className="text-xs text-siso-text-muted">Complete</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-siso-text-primary">
              2
            </div>
            <div className="text-xs text-siso-text-muted">Integrations</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-siso-text-primary">
              4
            </div>
            <div className="text-xs text-siso-text-muted">Notification Types</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-siso-text-primary">
              85
            </div>
            <div className="text-xs text-siso-text-muted">Security Score</div>
          </div>
        </div>
      </div>
    </div>
  );
}