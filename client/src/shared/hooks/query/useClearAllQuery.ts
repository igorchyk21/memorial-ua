'use client';

import { useRouter, usePathname } from 'next/navigation';

/**
 * Хук для очищення всіх query-параметрів у URL
 */
export function useClearAllQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  if (!pathname) return null;
  return (replace = false): void => {
    if (replace) {
      router.replace(pathname);
    } else {
      router.push(pathname);
    }
  };
}
