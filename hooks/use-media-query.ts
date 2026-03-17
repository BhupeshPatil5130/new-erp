"use client"

import { useEffect, useState } from "react"

export function useMediaQuery(query: string) {
  const getMatches = () => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(getMatches)

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return

    const mql = window.matchMedia(query)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)

    // Set initial
    setMatches(mql.matches)

    // Support older browsers
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", handler)
      return () => mql.removeEventListener("change", handler)
    } else {
          mql.addListener(handler)
          return () => mql.removeListener(handler)
    }
  }, [query])

  return matches
}
