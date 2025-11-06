import { HeroBiographyItem } from "@global/types";

export const insertHeroBiographyItem = (
  arr: HeroBiographyItem[],
  item: HeroBiographyItem
): HeroBiographyItem[] => {
  // якщо така дата вже існує — повертаємо без змін
  if (arr.some(el => el.dt === item.dt)) return arr;

  // створюємо копію, додаємо елемент і сортуємо за dt
  const newArr = [...arr, item].sort((a, b) => a.dt - b.dt);

  return newArr;
};