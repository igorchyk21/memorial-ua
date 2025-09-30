export function findDeepValue(obj: unknown, path: string): unknown {
  const keys = path.split('.');

  function traverse(current: unknown): unknown {
    if (typeof current !== 'object' || current === null) {
      return null;
    }

    // пробуємо знайти шлях починаючи з цього вузла
    let temp: any = current;
    for (let i = 0; i < keys.length; i++) {
      if (typeof temp !== 'object' || temp === null || !(keys[i] in temp)) {
        temp = null;
        break;
      }
      temp = temp[keys[i]];
    }

    if (temp !== null && temp !== undefined) {
      return temp;
    }

    // якщо не знайдено — йдемо вглиб рекурсивно
    for (const key in current) {
      const value = (current as Record<string, unknown>)[key];
      if (typeof value === 'object' && value !== null) {
        const result = traverse(value);
        if (result !== null) return result;
      }
    }

    return null;
  }

  return traverse(obj);
}
