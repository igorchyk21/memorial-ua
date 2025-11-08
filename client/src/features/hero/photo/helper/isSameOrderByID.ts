export function isSameOrderByID<T extends { ID: number }>(a: T[], b: T[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((item, i) => item.ID === b[i].ID);
}
