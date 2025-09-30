export function insertAfter<T>(array: T[], index: number, element: T): T[] {
  if (index < -1 || index >= array.length) {
    return array;
  }

  // робимо копію, щоб не мутувати оригінал
  const result = [...array];
  result.splice(index + 1, 0, element);
  return result;
}
