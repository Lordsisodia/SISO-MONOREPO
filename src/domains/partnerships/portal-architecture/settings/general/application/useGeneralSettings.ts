"use client";

import { useState, useEffect } from 'react';
import { generalSettingsService } from '../infrastructure/generalSettingsService';
import type { GeneralSettingsData, SettingsStats } from '../domain/types';

export interface GeneralSettingsState {
  // Appearance settings
  currentTheme: "light" | "dark" | "system";
  fontSize: string;
  reducedMotion: boolean;
  hasUnsavedAppearanceChanges: boolean;

  // Language settings
  currentLanguage: string;
  currentTimezone: string;

  // Notification settings
  unreadNotifications: number;
  enabledNotificationCategories: number;
  totalNotificationCategories: number;

  // Integration settings
  connectedIntegrations: number;
  integrations: Array<{
    name: string;
    connected: boolean;
    icon?: string;
  }>;

  // Summary data
  settingsCompleteness: number;
  lastSettingsUpdate: Date;
  securityScore: number;
}

const defaultState: GeneralSettingsState = {
  currentTheme: "system",
  fontSize: "medium",
  reducedMotion: false,
  hasUnsavedAppearanceChanges: false,

  currentLanguage: "en",
  currentTimezone: "America/New_York",

  unreadNotifications: 0,
  enabledNotificationCategories: 0,
  totalNotificationCategories: 6,

  connectedIntegrations: 0,
  integrations: [
    { name: "Notion", connected: false },
    { name: "Google Drive", connected: false },
    { name: "Slack", connected: false },
    { name: "Calendar", connected: false },
  ],

  settingsCompleteness: 15,
  lastSettingsUpdate: new Date(),
  securityScore: 72,
};

function mapToState(data: GeneralSettingsData, stats: SettingsStats): GeneralSettingsState {
  return {
    currentTheme: data.appearance.theme,
    fontSize: data.appearance.fontSize,
    reducedMotion: data.appearance.reducedMotion,
    hasUnsavedAppearanceChanges: false,

    currentLanguage: data.language.language,
    currentTimezone: data.language.timezone,

    unreadNotifications: Math.floor(Math.random() * 5), // Mock - would come from notifications service
    enabledNotificationCategories: stats.activeNotificationCategories,
    totalNotificationCategories: 6,

    connectedIntegrations: stats.connectedIntegrations,
    integrations: data.integrations.map(i => ({
      name: i.name,
      connected: i.connected,
      icon: i.icon,
    })),

    settingsCompleteness: stats.completeness,
    lastSettingsUpdate: stats.lastSettingsUpdate,
    securityScore: stats.securityScore,
  };
}

export function useGeneralSettings() {
  const [settings, setSettings] = useState<GeneralSettingsState>(defaultState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        console.log('useGeneralSettings - Starting to load settings...');
        setLoading(true);
        setError(null);

        // Temporarily use mock data to test
        console.log('useGeneralSettings - Using mock data...');
        const mockState = {
          currentTheme: "system",
          fontSize: "medium",
          reducedMotion: false,
          hasUnsavedAppearanceChanges: false,
          currentLanguage: "en",
          currentTimezone: "America/New_York",
          unreadNotifications: 3,
          enabledNotificationCategories: 4,
          totalNotificationCategories: 6,
          connectedIntegrations: 2,
          integrations: [
            { name: "Notion", connected: true, icon: "notion" },
            { name: "Google Drive", connected: false, icon: "google-drive" },
            { name: "Slack", connected: true, icon: "slack" },
            { name: "Calendar", connected: false, icon: "calendar" },
          ],
          settingsCompleteness: 75,
          lastSettingsUpdate: new Date(),
          securityScore: 85,
        };

        console.log('useGeneralSettings - Setting mock state:', mockState);
        setSettings(mockState);
        console.log('useGeneralSettings - Mock state set');
      } catch (err) {
        console.error('Failed to load settings:', err);
        setError('Failed to load settings');
      } finally {
        setLoading(false);
        console.log('useGeneralSettings - Loading complete');
      }
    };

    loadSettings();
  }, []);

  const updateSettings = async (updates: Partial<GeneralSettingsState>) => {
    try {
      // Map state updates to data structure
      const currentData = await generalSettingsService.getSettings();
      const dataUpdates: Partial<GeneralSettingsData> = {};

      if (updates.currentTheme) {
        dataUpdates.appearance = {
          ...currentData.appearance,
          theme: updates.currentTheme,
        };
      }

      if (updates.fontSize) {
        dataUpdates.appearance = {
          ...currentData.appearance,
          ...dataUpdates.appearance,
          fontSize: updates.fontSize as any,
        };
      }

      if (updates.currentLanguage) {
        dataUpdates.language = {
          ...currentData.language,
          language: updates.currentLanguage,
        };
      }

      // Apply updates
      const updatedData = await generalSettingsService.updateSettings(dataUpdates);
      const updatedStats = await generalSettingsService.getStats();

      const newState = mapToState(updatedData, updatedStats);
      setSettings(newState);
    } catch (err) {
      console.error('Failed to update settings:', err);
      setError('Failed to update settings');
    }
  };

  const resetToDefaults = async () => {
    try {
      setLoading(true);
      const defaultData = await generalSettingsService.resetToDefaults();
      const stats = await generalSettingsService.getStats();

      const state = mapToState(defaultData, stats);
      setSettings(state);
    } catch (err) {
      console.error('Failed to reset settings:', err);
      setError('Failed to reset settings');
    } finally {
      setLoading(false);
    }
  };

  const refreshSettings = async () => {
    try {
      setLoading(true);
      const [settingsData, stats] = await Promise.all([
        generalSettingsService.getSettings(),
        generalSettingsService.getStats(),
      ]);

      const state = mapToState(settingsData, stats);
      setSettings(state);
    } catch (err) {
      console.error('Failed to refresh settings:', err);
      setError('Failed to refresh settings');
    } finally {
      setLoading(false);
    }
  };

  return {
    settings,
    loading,
    error,
    updateSettings,
    resetToDefaults,
    refreshSettings,
  };
}