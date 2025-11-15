"use client";

import { Palette, Sun, Moon, Monitor } from "lucide-react";

interface AppearancePreviewProps {
  theme: "light" | "dark" | "system";
  fontSize: string;
  reducedMotion: boolean;
}

export function AppearancePreview({ theme, fontSize, reducedMotion }: AppearancePreviewProps) {
  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4" />;
      case "dark":
        return <Moon className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const getThemeDisplay = () => {
    switch (theme) {
      case "light":
        return "Light";
      case "dark":
        return "Dark";
      default:
        return "System";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Palette className="h-4 w-4 text-siso-text-muted" />
        <span className="text-xs text-siso-text-muted">Theme:</span>
        <div className="flex items-center gap-1">
          <div className={`h-4 w-4 rounded-full flex items-center justify-center ${
            theme === 'light' ? 'bg-white border-2 border-gray-300' :
            theme === 'dark' ? 'bg-gray-900' :
            'bg-gradient-to-r from-white to-gray-900'
          }`}>
            {getThemeIcon()}
          </div>
          <span className="text-xs text-siso-text-primary capitalize">{getThemeDisplay()}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-siso-text-muted">Font:</span>
        <span className="text-xs text-siso-text-primary">{fontSize}</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-siso-text-muted">Motion:</span>
        <span className={`text-xs font-medium ${
          reducedMotion ? 'text-green-500' : 'text-siso-text-muted'
        }`}>
          {reducedMotion ? 'Reduced' : 'Normal'}
        </span>
      </div>
    </div>
  );
}