import { useState } from "react";

type Theme = "light" | "dark" | "system";
type FontSize = "small" | "medium" | "large";

export interface AppearanceSettings {
  theme: Theme;
  primaryColor: string;
  fontSize: FontSize;
  reducedMotion: boolean;
  highContrast: boolean;
  hapticFeedback: boolean;
}

export function useAppearanceSettings() {
  const [settings, setSettings] = useState<AppearanceSettings>({
    theme: "system",
    primaryColor: "#3b82f6",
    fontSize: "medium",
    reducedMotion: false,
    highContrast: false,
    hapticFeedback: true,
  });

  const updateTheme = (theme: Theme) => setSettings((prev) => ({ ...prev, theme }));
  const updateFontSize = (fontSize: FontSize) => setSettings((prev) => ({ ...prev, fontSize }));
  const toggleReducedMotion = () => setSettings((prev) => ({ ...prev, reducedMotion: !prev.reducedMotion }));
  const toggleHighContrast = () => setSettings((prev) => ({ ...prev, highContrast: !prev.highContrast }));
  const toggleHapticFeedback = () => setSettings((prev) => ({ ...prev, hapticFeedback: !prev.hapticFeedback }));

  return {
    settings,
    updateTheme,
    updateFontSize,
    toggleReducedMotion,
    toggleHighContrast,
    toggleHapticFeedback,
  };
}

