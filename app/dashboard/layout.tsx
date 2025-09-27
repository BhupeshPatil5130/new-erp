"use client"

import type { ReactNode } from "react"
import { SidebarProvider } from "@/components/sidebar-provider"
import { MainSidebar } from "@/components/main-sidebar"
import { MainHeader } from "@/components/main-header"

/**
 Dashboard layout that renders the sidebar and header.
 Includes a simple client-side guard to redirect to /login if no token.
*/
export default function DashboardLayout({ children }: { children: ReactNode }) {
  // Auth check on the client
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("userToken")
    if (!token) {
      // Use hard redirect to ensure clean state
      window.location.href = "/login"
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-white">
        <MainSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <MainHeader />
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
