/**
 * Форматує число у вигляді вартості
 * @param value - число (вартість)
 * @param currency - код валюти (USD, EUR, UAH тощо)
 * @param locale - локаль для відображення (наприклад: 'uk-UA', 'en-US')
 * @param minimumFractionDigits - мінімальна кількість знаків після коми
 * @param maximumFractionDigits - максимальна кількість знаків після коми
 */
export function formatPrice(
  value: number,
  currency: string = "USD",
  locale: string = "uk-UA",
  minimumFractionDigits: number = 2,
  maximumFractionDigits: number = 2
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits
  }).format(value);
}

 