"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { SettingsDetailLayout } from "../../../../components/SettingsDetailLayout";

type PreferenceKey = "push" | "soundEffects" | "inApp";

const preferenceMap: Record<PreferenceKey, { label: string; helper: string }> = {
  push: {
    label: "Push notifications",
    helper: "Alerts when high-priority partner updates drop on any device.",
  },
  soundEffects: {
    label: "Signature sound effects",
    helper: "Play the SISO ping when milestones and shoutouts arrive.",
  },
  inApp: {
    label: "In-app alerts",
    helper: "Banner reminders while you’re inside the mobile workspace.",
  },
};

export function AccountNotificationsView() {
  const [preferences, setPreferences] = useState<Record<PreferenceKey, boolean>>({
    push: true,
    soundEffects: false,
    inApp: true,
  });

  const togglePreference = (key: PreferenceKey) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <SettingsDetailLayout
      title="Notifications"
      description="Tune the signals coming from this device."
      icon={<Bell className="h-6 w-6 text-siso-orange" />}
    >
      <ul className="space-y-4">
        {(Object.keys(preferenceMap) as PreferenceKey[]).map((key) => {
          const { label, helper } = preferenceMap[key];
          const enabled = preferences[key];
          return (
            <li key={key} className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-siso-text-primary">{label}</p>
                <p className="text-xs text-siso-text-muted">{helper}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={enabled}
                onClick={() => togglePreference(key)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition ${
                  enabled ? "bg-siso-orange/80" : "bg-siso-border/60"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                    enabled ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </SettingsDetailLayout>
  );
}
