"use client"

import type React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"

type SidebarContextValue = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  toggle: () => void
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery("(max-width: 1024px)")

  // SSR-safe initializer, read persisted state if present, fall back to viewport
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    if (typeof window === "undefined") return true
    const stored = window.localStorage.getItem("sidebar:isOpen")
    if (stored !== null) return stored === "true"
    // default: open on desktop, closed on mobile
    return window.innerWidth >= 1024
  })

  // Persist on change
  useEffect(() => {
    try {
      window.localStorage.setItem("sidebar:isOpen", String(isOpen))
    } catch {
      // ignore
    }
  }, [isOpen])

  // If there is no saved preference yet, adapt once to viewport after mount
  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("sidebar:isOpen") : null
    if (stored === null) {
      setIsOpen(!isMobile) // set open on desktop, closed on mobile
    }
    // run only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      toggle: () => setIsOpen((o) => !o),
    }),
    [isOpen],
  )

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

export function useSidebar() {
  const ctx = useContext(SidebarContext)
  if (!ctx) {
    throw new Error("useSidebar must be used within SidebarProvider")
  }
  return ctx
}
