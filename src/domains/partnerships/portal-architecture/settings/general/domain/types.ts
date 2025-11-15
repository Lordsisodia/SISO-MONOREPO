export type Theme = "light" | "dark" | "system";
export type FontSize = "small" | "medium" | "large" | "extra-large";

export interface AppearanceSettings {
  theme: Theme;
  fontSize: FontSize;
  reducedMotion: boolean;
  highContrast: boolean;
  hapticsEnabled: boolean;
  customAccentColor?: string;
}

export interface LanguageSettings {
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: "12h" | "24h";
  numberFormat: string;
  currency: string;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  inApp: boolean;
  categories: {
    deals: boolean;
    messages: boolean;
    tasks: boolean;
    updates: boolean;
    announcements: boolean;
    reminders: boolean;
  };
  frequency: "immediate" | "hourly" | "daily" | "weekly";
  quietHours?: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  connected: boolean;
  lastSync?: Date;
  configuration?: Record<string, any>;
  permissions: string[];
}

export interface GeneralSettingsData {
  appearance: AppearanceSettings;
  language: LanguageSettings;
  notifications: NotificationPreferences;
  integrations: Integration[];

  // Metadata
  lastUpdated: Date;
  version: string;
  deviceId: string;
}

export interface SettingsStats {
  completeness: number;
  securityScore: number;
  connectedIntegrations: number;
  activeNotificationCategories: number;
  lastSettingsUpdate: Date;
}