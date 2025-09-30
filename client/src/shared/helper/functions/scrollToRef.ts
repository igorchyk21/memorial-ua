// scrollToRef.ts
export type Align = 'top' | 'center' | 'bottom' | number;

export function scrollToRef<T extends HTMLElement>(
  ref: React.RefObject<T | null> | React.MutableRefObject<T | null>,
  opts: {
    container?: HTMLElement | Window;
    align?: Align;
    offset?: number;
    behavior?: ScrollBehavior;
  } = {}
) {
  const el = ref.current;
  if (!el) return;

  const container = opts.container ?? window;
  const behavior = opts.behavior ?? 'smooth';
  const offset = opts.offset ?? 0;
  const align = opts.align ?? 'top';

  const elRect = el.getBoundingClientRect();

  const getTargetForWindow = () => {
    const cur = window.scrollY || document.documentElement.scrollTop || 0;
    const vh = window.innerHeight;
    if (typeof align === 'number') return cur + elRect.top - align - offset;
    if (align === 'center') return cur + elRect.top + elRect.height / 2 - vh / 2 - offset;
    if (align === 'bottom') return cur + elRect.bottom - vh - offset;
    return cur + elRect.top - offset; // 'top'
  };

  const getTargetForElement = (cnt: HTMLElement) => {
    const cntRect = cnt.getBoundingClientRect();
    const cur = cnt.scrollTop;
    const topWithin = elRect.top - cntRect.top + cur;
    if (typeof align === 'number') return topWithin - align - offset;
    if (align === 'center') return topWithin + elRect.height / 2 - cnt.clientHeight / 2 - offset;
    if (align === 'bottom') return topWithin + elRect.height - cnt.clientHeight - offset;
    return topWithin - offset; // 'top'
  };

  const target = container === window
    ? getTargetForWindow()
    : getTargetForElement(container as HTMLElement);

  if (container === window) {
    window.scrollTo({ top: Math.max(0, target), behavior });
  } else {
    (container as HTMLElement).scrollTo({ top: Math.max(0, target), behavior });
  }
}
