import { dateLocale, type Language } from "@/i18n";

// Pass the language from a component so the formatted value is recomputed on a
// language change; it falls back to the active one for non-component callers.
export function formatDatetime(dateString: string, language?: Language): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return date.toLocaleDateString(dateLocale(language), options);
}

export function formatMonthYear(dateString: string, language?: Language): string {
  return new Date(dateString).toLocaleDateString(dateLocale(language), {
    month: "long",
    year: "numeric",
  });
}
