import { useState } from "react";
import type { LanguageSettings } from "../domain/types";

export function useLanguageSettings() {
  const [settings, setSettings] = useState<LanguageSettings>({
    locale: "en",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
    dateFormat: "MM/dd/yyyy",
    timeFormat: "12h",
    numberFormat: "en-US",
    currencyFormat: "USD",
  });

  const updateLocale = (locale: string) => setSettings((s) => ({ ...s, locale }));
  const updateTimezone = (timezone: string) => setSettings((s) => ({ ...s, timezone }));
  const updateDateFormat = (dateFormat: string) => setSettings((s) => ({ ...s, dateFormat }));
  const updateTimeFormat = (timeFormat: "12h" | "24h") => setSettings((s) => ({ ...s, timeFormat }));
  const updateCurrencyFormat = (currencyFormat: string) => setSettings((s) => ({ ...s, currencyFormat }));

  return {
    settings,
    updateLocale,
    updateTimezone,
    updateDateFormat,
    updateTimeFormat,
    updateCurrencyFormat,
  };
}
