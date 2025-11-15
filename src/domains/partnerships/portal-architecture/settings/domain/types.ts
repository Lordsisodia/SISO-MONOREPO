/**
 * Settings Domain Types
 * Shared types across all settings pages
 */

export interface UserSettings {
  userId: string;
  theme: ThemeSettings;
  language: LanguageSettings;
  notifications: NotificationSettings;
  security: SecuritySettings;
  privacy: PrivacySettings;
}

export interface ThemeSettings {
  mode: "light" | "dark" | "system";
  primaryColor?: string;
  fontSize: "small" | "medium" | "large";
  reducedMotion: boolean;
  highContrast: boolean;
  hapticFeedback: boolean;
}

export interface LanguageSettings {
  locale: string;
  timezone: string;
  dateFormat: string;
  timeFormat: "12h" | "24h";
  numberFormat: string;
  currencyFormat: string;
}

export interface NotificationSettings {
  push: PushNotificationSettings;
  email: EmailNotificationSettings;
  inApp: InAppNotificationSettings;
}

export interface PushNotificationSettings {
  enabled: boolean;
  deals: boolean;
  messages: boolean;
  updates: boolean;
  tasks: boolean;
}

export interface EmailNotificationSettings {
  enabled: boolean;
  frequency: "immediate" | "daily" | "weekly";
  deals: boolean;
  messages: boolean;
  updates: boolean;
}

export interface InAppNotificationSettings {
  enabled: boolean;
  sound: boolean;
  badge: boolean;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  activeSessions: Session[];
  loginAlerts: boolean;
}

export interface Session {
  id: string;
  device: string;
  location: string;
  lastActive: Date;
  current: boolean;
}

export interface PrivacySettings {
  profileVisibility: "public" | "partners-only" | "private";
  showEmail: boolean;
  showPhone: boolean;
  dataProcessingConsent: boolean;
  marketingConsent: boolean;
}

export interface Device {
  id: string;
  name: string;
  type: "mobile" | "desktop" | "tablet";
  browser: string;
  os: string;
  lastActive: Date;
  current: boolean;
}

export interface Integration {
  id: string;
  name: string;
  type: "notion" | "google-drive" | "google-calendar" | "slack";
  connected: boolean;
  connectedAt?: Date;
  permissions: string[];
}
