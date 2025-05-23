export function formatCurrency(value: number | string, currency: string = "INR", locale: string = "en-IN"): string {
  if (typeof value === "string") {
    value = parseFloat(value);
  }
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}