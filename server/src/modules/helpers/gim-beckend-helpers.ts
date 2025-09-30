// Допоміжні функції для BACK-END
// by Igor Gryb

// Перетворює масив значення на умову для SQL у форматі: field in ('a', 'b', ...)
export function arrya2sqlStr(field: string, aValue?: string[] | string): string {
    if (!aValue || aValue === '') return '';
    const values = Array.isArray(aValue) ? aValue : [aValue];
    const res = values
        .map(v =>
            `'${v.replace(/'/g, "\\'")
                .replace(/\\/g, "\\\\")
                .replace(/;/g, "\\;")}'`)
        .join(', ');
    return res ? ` ${field} in (${res})` : '';
}

// Перетворює масив значення на умову для SQL (числа)
export function arrya2sqlInt(field: string, aValue?: any): string {
    if (aValue === undefined || !aValue || aValue === '') return '';
    if (!Array.isArray(aValue)) aValue = Object.values(aValue);
    const filteredValues = aValue.filter((value: any) => !isNaN(value) && isFinite(value));
    return filteredValues.length > 0
        ? ` ${field} in (${filteredValues.join(',').replace(/['"]/g, '')}) `
        : '';
}

// Перевірка FIND_IN_SET(value, field)
export function array2sqlSet(field: string, aValue?: any[]): string {
    if (!aValue) return '';
    const filteredValues = aValue.filter(value => !isNaN(value) && isFinite(value));
    const result = filteredValues
        .map(value => `FIND_IN_SET('${value}', ${field})`)
        .join(' OR ');
    return result ? ` (${result}) ` : '';
}

// Формування простого діапазону SQL: field > value або field < value
export function range2sql(field: string, value: any, sign: '>' | '<' | '=' = '='): string {
    if (value === undefined || value === '' || value === null) value = 0;
    return ` ${field} ${sign} ${parseFloat(value)} `;
}

// Нормалізує boolean (зі стрічки в тому числі)
export function boolNormal(value: unknown): boolean {
    return (typeof value === 'boolean' && value) ||
        (typeof value === 'string' && value.toLowerCase() === 'true');
}

// Екранування імені поля для SQL
export function escapeFieldName(fieldName: string): string {
    if (typeof fieldName !== 'string') {
        throw new Error('Field name must be a string');
    }
    return fieldName.replace(/[^a-zA-Z0-9_.]/g, '');
}

// Безпечний JSON.parse
export function safeJSONParse<T = any>(str: string, defaultValue?: T): T|null {
    try {
        return JSON.parse(str);
    } catch {
        return defaultValue||null;
    }
}

// Безпечний парсинг float
export function safeFloatParse(input: any, def: number | null = null): number | null {
    try {
        const match = `${input}`.match(/-?\d+(\.\d+)?/);
        return match ? parseFloat(match[0].replace(/,/g, '.')) : def;
    } catch {
        return def;
    }
}

// Безпечний парсинг int
export function safeIntParse(input: any, def: number | null = null): number | null {
    try {
        const match = `${input}`.match(/-?\d+(\.\d+)?/);
        return match ? parseInt(match[0].replace(/[,\.]/g, '')) : def;
    } catch {
        return def;
    }
}

// Повертає діапазон між двома підрядками в рядку
export function strRange(input: string, start: string, end: string): string | null {
    const startIndex = input.indexOf(start);
    const endIndex = input.indexOf(end, startIndex + start.length);
    if (startIndex === -1 || endIndex === -1) return null;
    return input.substring(startIndex, endIndex + end.length);
}

// Перша літера велика, решта — малі
export function strCapitalize(str: string): string {
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Те саме що вище, просто інша назва
export function capiFirstLetter(word: string): string {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
