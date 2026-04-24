"use client"

import { useState, useEffect } from "react"
import { useSidebar } from "@/components/sidebar-provider"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
import { Menu, Bell, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import UserProfileMenu from "@/components/user-profile-menu"
import { Badge } from "@/components/ui/badge"

export function MainHeader() {
  const { isOpen, setIsOpen } = useSidebar()
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const [showSearch, setShowSearch] = useState(false)
  const [institute, setInstitute] = useState("ERP System")
  const [userName, setUserName] = useState("User")
  const [userRole, setUserRole] = useState("Administrator")
  const [notificationCount] = useState(5)

  useEffect(() => {
    const storedInstitute = localStorage.getItem("currentInstitute")
    const storedUser = localStorage.getItem("currentUser")
    if (storedInstitute) {
      const inst = JSON.parse(storedInstitute)
      setInstitute(inst.name || "ERP System")
    }
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setUserName(user.name || "User")
      setUserRole(user.role || "Administrator")
    }
  }, [])

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 px-3 sm:px-4 shadow-sm">
      {/* Mobile search overlay */}
      {showSearch && !isDesktop && (
        <div className="absolute inset-0 z-50 flex items-center bg-white px-3 gap-2">
          <Input
            type="search"
            placeholder="Search students, staff..."
            className="flex-1 h-9"
            autoFocus
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSearch(false)}
            className="shrink-0 text-gray-600"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close search</span>
          </Button>
        </div>
      )}

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

      <div className="flex-1 flex items-center justify-center px-2 min-w-0">
        <div className="text-center min-w-0">
          <h1 className="text-sm sm:text-base md:text-lg font-bold text-primary-900 truncate max-w-[160px] sm:max-w-xs md:max-w-none">{institute}</h1>
          <p className="text-xs text-gray-600 hidden sm:block">Education Management System</p>
        </div>
      </div>

      <div className={cn("flex items-center gap-2 sm:gap-3")}>
        {isDesktop ? (
          <div className="relative w-48 lg:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search students, staff..."
              className="w-full pl-10 rounded-full bg-gray-50 border-gray-200 focus-visible:ring-secondary-500 focus-visible:border-secondary-500"
            />
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
