"use client"

import { useState } from "react"
import { useSidebar } from "@/components/sidebar-provider"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
import { Menu, Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import UserProfileMenu from "@/components/user-profile-menu"
import { Badge } from "@/components/ui/badge"

export function MainHeader() {
  const { isOpen, setIsOpen } = useSidebar()
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const [showSearch, setShowSearch] = useState(false)
  const [institute, setInstitute] = useState("Utopia Global School") // Default institute
  const [userName, setUserName] = useState("Rajesh Kumar")
  const [userRole, setUserRole] = useState("Principal")
  const [notificationCount, setNotificationCount] = useState(5)

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 px-4 shadow-sm">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="text-primary-700 hover:bg-primary-50 hover:text-primary-800"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-lg font-bold text-primary-900">{institute}</h1>
          <p className="text-xs text-gray-600">Education Management System</p>
        </div>
      </div>

      <div className={cn("flex items-center gap-4")}>
        {isDesktop ? (
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search students, staff..."
              className="w-full pl-10 rounded-full bg-gray-50 border-gray-200 focus-visible:ring-secondary-500 focus-visible:border-secondary-500"
            />
          </div>
        ) : (
          <>
            {showSearch ? (
              <div className="absolute inset-0 z-50 flex items-center bg-white px-4">
                <Button variant="ghost" size="icon" onClick={() => setShowSearch(false)} className="mr-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Close search</span>
                </Button>
                <Input type="search" placeholder="Search..." className="flex-1" autoFocus />
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSearch(true)}
                className="text-primary-700 hover:bg-primary-50"
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            )}
          </>
        )}

        <Button variant="ghost" size="icon" className="relative text-primary-700 hover:bg-primary-50">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
          {notificationCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-accent-500 text-white text-xs">
              {notificationCount}
            </Badge>
          )}
        </Button>

        <UserProfileMenu userName={userName} userRole={userRole} />
      </div>
    </header>
  )
}
