'use client';
import { useRouter } from '@bprogress/next/app';
import {  useSearchParams, usePathname } from 'next/navigation';

interface SetQueryParamsOptions {
  replace?: boolean;
}

type QueryParamsInput = Record<string, string | null | undefined>;

/**
 * Хук для оновлення або видалення кількох query-параметрів
 */
export function useSetMultipleQuery() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  if (!searchParams) return ()=>{};
  return (newParams: QueryParamsInput, options?: SetQueryParamsOptions) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    if (!newUrl) return null;
    if (options?.replace) {
      router.replace(newUrl);
    } else {
      router.push(newUrl);
    }
  };
}
