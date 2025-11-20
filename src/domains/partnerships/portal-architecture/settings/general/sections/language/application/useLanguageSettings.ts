import { useState } from "react";
import type { LanguageSettings } from "../../../domain/types";

export function useLanguageSettings() {
  const [settings, setSettings] = useState<LanguageSettings>({
    language: "en",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
    dateFormat: "MM/dd/yyyy",
    timeFormat: "12h",
    numberFormat: "en-US",
    currency: "USD",
  });

  const updateLocale = (locale: string) => setSettings((s) => ({ ...s, language: locale }));
  const updateTimezone = (timezone: string) => setSettings((s) => ({ ...s, timezone }));
  const updateDateFormat = (dateFormat: string) => setSettings((s) => ({ ...s, dateFormat }));
  const updateTimeFormat = (timeFormat: "12h" | "24h") => setSettings((s) => ({ ...s, timeFormat }));
  const updateCurrencyFormat = (currencyValue: string) => setSettings((s) => ({ ...s, currency: currencyValue }));

  return {
    settings,
    updateLocale,
    updateTimezone,
    updateDateFormat,
    updateTimeFormat,
    updateCurrencyFormat,
  };
}
