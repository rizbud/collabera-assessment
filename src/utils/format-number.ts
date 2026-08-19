export function formatNumber(value: number, locale: string = "ms-MY"): string {
  return Intl.NumberFormat(locale).format(value);
}

export function formatCurrency(value: number, currency: string = "MYR", locale: string = "ms-MY"): string {
  return Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}