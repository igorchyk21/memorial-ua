
// Безпечний парсинг JSON
export function safeJSONParse<T>(str?: string | Record<string, any> | null, defaultValue: T | null = null)
    : T | null {
    if (typeof str !== 'string') return null;
    if (typeof str === 'undefined') return null;
    if (str === null) return defaultValue;
    try {
        return JSON.parse(str);
    } catch {
        return defaultValue;
    }
}

// Безпечний парсинг float
export function safeFloatParse(input: unknown, def: number | null = null): number {
  try {
    const match = String(input).match(/-?\d+(\.\d+)?/);
    return match ? parseFloat(match[0].replace(/,/g, '.')) : def || 0;
  } catch {
    return def || 0;
  }
}

// Безпечний парсинг int
export function safeIntParse(input: unknown, def: number | null = null): number  {
  try {
    const match = String(input).match(/-?\d+(\.\d+)?/);
    return match ? parseInt(match[0].replace(/,/g, '').replace(/\./g, '')) : def || 0;
  } catch {
    return def || 0;
  }
}

/**
 * Повертає кількість слів у рядку
 * @param text - вхідний рядок
 * @returns number - кількість слів
 */
export function lengthWords(text: string): number {
  if (!text) return 0;
  return text
    .trim()
    .split(/\s+/)        // розбиваємо по пробілах/табах/переносах
    .filter(Boolean)     // прибираємо порожні
    .length;
}
