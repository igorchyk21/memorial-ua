import { useEffect, useRef, useState, useCallback } from 'react'

export const useStickyNavbar = ({ offset = 500 }: { offset?: number }) => {
  const [isStuck, setIsStuck] = useState(false)
  const navbarRef = useRef<HTMLElement | null>(null)
  const navbarHeight = useRef<number>(0)
  const lastScrollY = useRef<number>(0)
  const scrollThreshold = useRef<number>(0)

  const handleStickyNavbar = useCallback(() => {
    const navbar = navbarRef.current
    if (!navbar) return

    // Store the original height only once when the navbar is first rendered
    if (navbarHeight.current === 0) {
      navbarHeight.current = navbar.offsetHeight
    }

    const shouldStick = window.scrollY >= offset

    if (shouldStick && !isStuck) {
      setIsStuck(true)

      document.body.style.paddingTop = `${navbarHeight.current}px`
      navbar.classList.add('fixed-top', 'navbar-stuck')

      scrollThreshold.current = window.scrollY
    } else if (!shouldStick && isStuck) {
      navbar.classList.remove('fixed-top', 'navbar-stuck')
      document.body.style.paddingTop = ''
      setIsStuck(false)
    }
  }, [offset, isStuck])

  useEffect(() => {
    const navbar = navbarRef.current
    if (!navbar) return

    const onScroll = () => {
      // Use a dynamic threshold that adapts to scroll speed.
      // On fast scrolling from time to time, the calculated navbar height is not accurate.
      const scrollDelta = Math.abs(lastScrollY.current - window.scrollY)
      const dynamicThreshold = Math.max(5, scrollDelta / 10)

      if (scrollDelta > dynamicThreshold) {
        lastScrollY.current = window.scrollY
        requestAnimationFrame(handleStickyNavbar)
      }
    }

    // Capture initial height
    navbarHeight.current = navbar.offsetHeight

    window.addEventListener('scroll', onScroll)
    handleStickyNavbar() // Initial check

    return () => {
      window.removeEventListener('scroll', onScroll)
      // Clean up padding and classes when component unmounts
      if (isStuck) {
        document.body.style.paddingTop = ''
        if (navbar) {
          navbar.classList.remove('fixed-top', 'navbar-stuck')
        }
      }
    }
  }, [handleStickyNavbar])

  return { navbarRef, isStuck }
}
