"use client";
import { useRouter } from "@bprogress/next/app";       // <-- ВАЖЛИВО
import { useSearchParams, usePathname } from "next/navigation";
import { useMemo, useCallback, useRef } from "react";

export function useQueryState<T extends string | number>(
  key: string,
  defaultValue?: T
): [T | undefined, (value: T | undefined | null) => void] {
  const router = useRouter();                           // <-- bprogress router
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const spStr = searchParams?.toString() ?? "";

  const currentValue: T | undefined = useMemo(() => {
    const raw = searchParams?.get(key);
    if (raw === null) return defaultValue;

    if (typeof defaultValue === "number") {
      const num = Number(raw);
      return Number.isFinite(num) ? (num as T) : defaultValue;
    }
    return raw as T;
  }, [spStr, key, defaultValue, searchParams]);

  // --- коалесинг кількох replace у один ---
  const scheduledHrefRef = useRef<string | null>(null);
  const rafRef = useRef<number | null>(null);

  const flushReplace = useCallback(() => {
    if (scheduledHrefRef.current) {
      const href = scheduledHrefRef.current;
      scheduledHrefRef.current = null;
      router.replace(href, { scroll: false });          // <-- тригерить BProgress
    }
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, [router]);

  const scheduleReplace = useCallback((href: string) => {
    scheduledHrefRef.current = href;
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(flushReplace);
    }
  }, [flushReplace]);

  const setValue = useCallback(
    (value: T | undefined | null) => {
      const current = typeof window !== "undefined" ? window.location.search : "";
      const params = new URLSearchParams(current);

      if (value === undefined || value === null || (value as any) === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }

      const nextSearch = params.toString();
      const currentSearch = current.replace(/^\?/, "");
      if (nextSearch === currentSearch) return;         // нічого не робимо

      const href = nextSearch ? `${pathname}?${nextSearch}` : pathname;
      scheduleReplace(href);
    },
    [pathname, key, scheduleReplace]
  );

  return [currentValue, setValue];
}
