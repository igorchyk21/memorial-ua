'use client';
import { useRouter } from '@bprogress/next/app';
import { useSearchParams, usePathname } from 'next/navigation';
import { useMemo, useCallback } from 'react';

export function useQueryState<T extends string | number>(
  key: string,
  defaultValue?: T
): [T | undefined, (value: T | undefined | null) => void] {
  const searchParams = useSearchParams();
  const router = useRouter(); 
  const pathname = usePathname();

  if (!searchParams) return [undefined as unknown as T, () => {}];

  const currentValue: T | undefined = useMemo(() => {
    const raw = searchParams.get(key);

    if (raw === null) return defaultValue;

    if (typeof defaultValue === 'number') {
      const num = Number(raw);
      return isNaN(num) ? defaultValue : (num as T);
    }

    return raw as T;
  }, [searchParams, key, defaultValue]);

  const setValue = useCallback(
    (value: T | undefined | null) => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));

      if (value === undefined || value === null) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }

      const query = params.toString();
      const url = query ? `${pathname}?${query}` : pathname;
      router.replace(url||'');
    },
    [searchParams, router, pathname, key]
  );

  return [currentValue, setValue];
}
