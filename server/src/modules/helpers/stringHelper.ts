const transliteration: Record<string, string> = {
  'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
  'е': 'e', 'є': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i',
  'і': 'i', 'ї': 'i', 'й': 'y', 'к': 'k', 'л': 'l',
  'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r',
  'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h',
  'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
  'ю': 'yu', 'я': 'ya', ' ': '-' // пробіл → дефіс
};

export function transliterateAndSanitize(input: string, collapseSpaces = false): string {
  // у нижній регістр
  let result = input.toLowerCase();

  // транслітерація
  result = result
    .split('')
    .map((char) => transliteration[char] ?? char)
    .join('');

  // прибирання зайвих символів (латиниця, дефіс, підкреслення)
  result = result.replace(/[^a-z_-]/g, '');

  // якщо потрібно, згорнути подвійні дефіси (колишні пробіли)
  if (collapseSpaces) {
    result = result.replace(/-+/g, '-');
  }

  return result;
}


export function sanitizeNameInput(value: string): string {
  return value
    .toLowerCase()          // у нижній регістр
    .replace(/[^a-z0-9_-]/g, ""); // тільки латиниця, цифри та _
}


export function normalizeSpaces(str: string): string {
  return str.replace(/\s+/g, " ").trim();
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
