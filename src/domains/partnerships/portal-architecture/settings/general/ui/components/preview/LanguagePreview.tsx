"use client";

import { Globe, Clock } from "lucide-react";

interface LanguagePreviewProps {
  language: string;
  timezone: string;
}

export function LanguagePreview({ language, timezone }: LanguagePreviewProps) {
  const getLanguageDisplay = (lang: string): string => {
    const languageMap: Record<string, string> = {
      'en': 'English',
      'es': 'Español',
      'fr': 'Français',
      'de': 'Deutsch',
      'it': 'Italiano',
      'pt': 'Português',
      'ja': '日本語',
      'zh': '中文',
      'ko': '한국어'
    };
    return languageMap[lang] || lang;
  };

  const getTimezoneDisplay = (tz: string): string => {
    // Convert timezone to display format (e.g., "America/New_York" -> "EST/EDT")
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      timeZoneName: 'short'
    });
    const parts = formatter.formatToParts(now);
    const timeZoneName = parts.find(part => part.type === 'timeZoneName')?.value || tz;

    // Extract the timezone abbreviation (EST, EDT, PST, etc.)
    const match = timeZoneName.match(/\b([A-Z]{3,4})\b/);
    return match ? match[1] : timeZoneName;
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4 text-siso-text-muted" />
        <span className="text-xs text-siso-text-muted">Language:</span>
        <span className="text-xs text-siso-text-primary">
          {getLanguageDisplay(language)}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-siso-text-muted" />
        <span className="text-xs text-siso-text-muted">Timezone:</span>
        <span className="text-xs text-siso-text-primary">
          {getTimezoneDisplay(timezone)}
        </span>
      </div>
    </div>
  );
}