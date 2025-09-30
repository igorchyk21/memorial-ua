// transliterateAndSanitize.ts

// Тип для словника транслітерації
const transliteration: Record<string, string> = {
  'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
  'е': 'e', 'є': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i',
  'і': 'i', 'ї': 'i', 'й': 'y', 'к': 'k', 'л': 'l',
  'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r',
  'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h',
  'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
  'ю': 'yu', 'я': 'ya', ' ': '-' // пробіли → дефіси
};

export function transliterateAndSanitize(input: string): string {
  // у нижній регістр
  let result = input.toLowerCase();

  // транслітерація
  result = result
    .split('')
    .map((char) => transliteration[char] ?? char)
    .join('');

  // прибирання зайвих символів (залишаємо тільки латиницю, дефіс і підкреслення)
  result = result.replace(/[^a-z_-]/g, '');

  return result;
}
