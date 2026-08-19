import { dateLocale } from "@/i18n";

export function formatDatetime(dateString: string, locale?: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return date.toLocaleDateString(locale ?? dateLocale(), options);
}

export function formatMonthYear(dateString: string, locale?: string): string {
  return new Date(dateString).toLocaleDateString(locale ?? dateLocale(), {
    month: "long",
    year: "numeric",
  });
}
