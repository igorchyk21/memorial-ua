'use client';
import { useRouter } from '@bprogress/next/app';
import { useSearchParams } from 'next/navigation';

interface UpdateQueryParamOptions {
  replace?: boolean; // Використати router.replace замість router.push
}

/**
 * Хук для оновлення query-параметрів у Next.js
 * - Якщо value === null → параметр буде видалено
 * - Якщо value === string → буде записано одне значення
 * - Якщо value === string[] → буде встановлено кілька однакових ключів
 */
export function useUpdateQuery() {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!searchParams) return () => {};

  return (
    key: string,
    value: string | string[] | null,
    options?: UpdateQueryParamOptions
  ): void => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));

    // Видаляємо всі існуючі значення цього ключа
    params.delete(key);

    // Додаємо нові значення
    if (Array.isArray(value)) {
      value.forEach(val => {
        params.append(key, val);
      });
    } else if (value !== null) {
      params.set(key, value);
    }

    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;

    if (options?.replace) {
      router.replace(newUrl);
    } else {
      router.push(newUrl);
    }
  };
}
