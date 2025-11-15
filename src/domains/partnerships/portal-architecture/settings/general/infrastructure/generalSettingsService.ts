import type { GeneralSettingsData, SettingsStats } from "../domain/types";

export interface GeneralSettingsService {
  getSettings(): Promise<GeneralSettingsData>;
  updateSettings(updates: Partial<GeneralSettingsData>): Promise<GeneralSettingsData>;
  getStats(): Promise<SettingsStats>;
  resetToDefaults(): Promise<GeneralSettingsData>;
}

export class MockGeneralSettingsService implements GeneralSettingsService {
  private settings: GeneralSettingsData = {
    appearance: {
      theme: "system",
      fontSize: "medium",
      reducedMotion: false,
      highContrast: false,
      hapticsEnabled: true,
    },
    language: {
      language: "en",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      dateFormat: "MM/dd/yyyy",
      timeFormat: "12h",
      numberFormat: "en-US",
      currency: "USD",
    },
    notifications: {
      email: true,
      push: true,
      inApp: true,
      categories: {
        deals: true,
        messages: true,
        tasks: true,
        updates: false,
        announcements: true,
        reminders: true,
      },
      frequency: "immediate",
      quietHours: {
        enabled: false,
        start: "22:00",
        end: "08:00",
      },
    },
    integrations: [
      {
        id: "notion",
        name: "Notion",
        description: "Connect your Notion workspace",
        icon: "notion",
        connected: false,
        permissions: ["read", "write"],
      },
      {
        id: "google-drive",
        name: "Google Drive",
        description: "Access your Google Drive files",
        icon: "google-drive",
        connected: false,
        permissions: ["read"],
      },
      {
        id: "slack",
        name: "Slack",
        description: "Send notifications to Slack",
        icon: "slack",
        connected: false,
        permissions: ["write"],
      },
    ],
    lastUpdated: new Date(),
    version: "1.0.0",
    deviceId: "mock-device-id",
  };

  async getSettings(): Promise<GeneralSettingsData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));

    // Try to load from localStorage first
    const stored = localStorage.getItem('general-settings');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Failed to parse stored settings:', error);
      }
    }

    return this.settings;
  }

  async updateSettings(updates: Partial<GeneralSettingsData>): Promise<GeneralSettingsData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));

    this.settings = { ...this.settings, ...updates };

    // Save to localStorage
    localStorage.setItem('general-settings', JSON.stringify(this.settings));

    return this.settings;
  }

  async getStats(): Promise<SettingsStats> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 50));

    const settings = await this.getSettings();
    const activeNotificationCategories = Object.values(settings.notifications.categories)
      .filter(Boolean).length;

    return {
      completeness: this.calculateCompleteness(settings),
      securityScore: this.calculateSecurityScore(settings),
      connectedIntegrations: settings.integrations.filter(i => i.connected).length,
      activeNotificationCategories,
      lastSettingsUpdate: settings.lastUpdated,
    };
  }

  async resetToDefaults(): Promise<GeneralSettingsData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    this.settings = {
      appearance: {
        theme: "system",
        fontSize: "medium",
        reducedMotion: false,
        highContrast: false,
        hapticsEnabled: true,
      },
      language: {
        language: "en",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        dateFormat: "MM/dd/yyyy",
        timeFormat: "12h",
        numberFormat: "en-US",
        currency: "USD",
      },
      notifications: {
        email: true,
        push: true,
        inApp: true,
        categories: {
          deals: true,
          messages: true,
          tasks: true,
          updates: false,
          announcements: true,
          reminders: true,
        },
        frequency: "immediate",
        quietHours: {
          enabled: false,
          start: "22:00",
          end: "08:00",
        },
      },
      integrations: this.settings.integrations.map(i => ({ ...i, connected: false, lastSync: undefined })),
      lastUpdated: new Date(),
      version: "1.0.0",
      deviceId: "mock-device-id",
    };

    localStorage.setItem('general-settings', JSON.stringify(this.settings));
    return this.settings;
  }

  private calculateCompleteness(settings: GeneralSettingsData): number {
    let score = 0;
    let total = 0;

    // Appearance settings (20 points)
    total += 20;
    if (settings.appearance.theme !== "system") score += 5;
    if (settings.appearance.fontSize !== "medium") score += 5;
    if (settings.appearance.reducedMotion !== false) score += 5;
    if (settings.appearance.hapticsEnabled !== true) score += 5;

    // Language settings (20 points)
    total += 20;
    if (settings.language.language !== "en") score += 10;
    if (settings.language.dateFormat !== "MM/dd/yyyy") score += 5;
    if (settings.language.timeFormat !== "12h") score += 5;

    // Notification settings (30 points)
    total += 30;
    const activeCategories = Object.values(settings.notifications.categories).filter(Boolean).length;
    score += (activeCategories / 6) * 20;
    if (settings.notifications.frequency !== "immediate") score += 5;
    if (settings.notifications.quietHours?.enabled) score += 5;

    // Integrations (30 points)
    total += 30;
    const connectedIntegrations = settings.integrations.filter(i => i.connected).length;
    score += (connectedIntegrations / settings.integrations.length) * 30;

    return Math.round((score / total) * 100);
  }

  private calculateSecurityScore(settings: GeneralSettingsData): number {
    let score = 70; // Base score

    // Bonus for notification privacy
    if (!settings.notifications.email) score += 10;
    if (settings.notifications.quietHours?.enabled) score += 5;

    // Bonus for limited integrations
    const connectedIntegrations = settings.integrations.filter(i => i.connected).length;
    if (connectedIntegrations <= 1) score += 15;
    else if (connectedIntegrations <= 2) score += 10;
    else if (connectedIntegrations <= 3) score += 5;

    return Math.min(score, 100);
  }
}

// Singleton instance
export const generalSettingsService = new MockGeneralSettingsService();