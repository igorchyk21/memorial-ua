import { useEffect, useRef, useState } from 'react'

interface UseStickyElementReturn<StickyElement extends HTMLElement> {
  stickyElementRef: React.RefObject<StickyElement | null>
  isStuck: boolean
}

export const useStickyElement = <StickyElement extends HTMLElement>(): UseStickyElementReturn<StickyElement> => {
  const stickyElementRef = useRef<StickyElement>(null)
  const [isStuck, setIsStuck] = useState<boolean>(false)

  useEffect(() => {
    if (!stickyElementRef.current) return

    stickyElementRef.current.style.top = '-1px'

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      setIsStuck(entries[0].intersectionRatio < 1)
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 1.0,
    })

    observer.observe(stickyElementRef.current)

    return () => observer.disconnect()
  }, [stickyElementRef, setIsStuck])

  return { stickyElementRef, isStuck }
}
