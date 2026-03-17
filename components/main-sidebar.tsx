"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSidebar } from "@/components/sidebar-provider"
import { cn } from "@/lib/utils"
import {
  ChevronDown,
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  CreditCard,
  BookOpen,
  UserCog,
  ShoppingCart,
  BarChart3,
  Building,
  PenTool as Tool,
  LogOut,
  X,
  Crown,
  Building2,
  Shield,
  BusFront,
  Camera,
  Book,
  GraduationCap,
  UserIcon,
  Home,
  Handshake,
  Award,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useMediaQuery } from "@/hooks/use-media-query"

interface NavItem {
  title: string
  href?: string
  icon?: React.ReactNode
  submenu?: NavItem[]
}

// Corporate HQ base navigation
const baseCorporateNav: NavItem[] = [
  { title: "Corporate Dashboard", href: "/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
  {
    title: "Brand Management",
    icon: <Building2 className="h-5 w-5" />,
    submenu: [
      { title: "All Brands", href: "/dashboard/brands" },
      { title: "Add New Brand", href: "/dashboard/brands/new" },
      { title: "Brand Analytics", href: "/dashboard/brands/analytics" },
      { title: "Performance Reports", href: "/dashboard/brands/reports" },
      // "Ads Management" will be injected for Suryadhi HQ below
    ],
  },
  {
    title: "Access Control",
    icon: <Shield className="h-5 w-5" />,
    submenu: [
      { title: "Brand Permissions", href: "/dashboard/access/brands" },
      { title: "User Management", href: "/dashboard/access/users" },
      { title: "Role Management", href: "/dashboard/access/roles" },
      { title: "Audit Logs", href: "/dashboard/access/audit" },
    ],
  },
  {
    title: "Corporate Reports",
    icon: <BarChart3 className="h-5 w-5" />,
    submenu: [
      { title: "Consolidated Reports", href: "/dashboard/reports/consolidated" },
      { title: "Financial Summary", href: "/dashboard/reports/financial" },
      { title: "Brand Comparison", href: "/dashboard/reports/comparison" },
      { title: "Growth Analytics", href: "/dashboard/reports/growth" },
    ],
  },
  {
    title: "Corporate Settings",
    icon: <Settings className="h-5 w-5" />,
    submenu: [
      { title: "General Settings", href: "/dashboard/settings" },
      { title: "System Configuration", href: "/dashboard/settings/system" },
      { title: "Integration Settings", href: "/dashboard/settings/integrations" },
    ],
  },
]

// Baseline Branch Navigation Items
const baseBranchNavItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
  {
    title: "Enrollment",
    icon: <BookOpen className="h-5 w-5" />,
    submenu: [
      { title: "Enquiry", href: "/dashboard/enrollment/enquiry" },
      { title: "New Enquiry", href: "/dashboard/enrollment/enquiry/new" },
      { title: "LSQ Enquiry", href: "/dashboard/enrollment/lsq-enquiry" },
      { title: "Admission", href: "/dashboard/enrollment/admission" },
      { title: "Admission Status", href: "/dashboard/enrollment/admission-status" },
      { title: "Transfer Stage", href: "/dashboard/enrollment/transfer-stage" },
      { title: "DTP View", href: "/dashboard/enrollment/dtp-view" },
      { title: "Graduation Name Change", href: "/dashboard/enrollment/graduation-name-change" },
      { title: "Inventory", href: "/dashboard/enrollment/inventory" },
    ],
  },
  {
    title: "Fee",
    icon: <CreditCard className="h-5 w-5" />,
    submenu: [
      { title: "Payment Detail", href: "/dashboard/fee/payment-detail" },
      { title: "Convert Amount", href: "/dashboard/fee/convert-amount" },
      { title: "Deposit Amount", href: "/dashboard/fee/deposit-amount" },
      { title: "Deposit Status", href: "/dashboard/fee/deposit-status" },
      { title: "Fund Transfer", href: "/dashboard/fee/fund-transfer" },
      { title: "Structure", href: "/dashboard/fee/structure" },
      { title: "Discount Type", href: "/dashboard/fee/discount-type" },
    ],
  },
  {
    title: "Staff",
    icon: <UserCog className="h-5 w-5" />,
    submenu: [
      { title: "Attendance", href: "/dashboard/staff/attendance" },
      { title: "Details", href: "/dashboard/staff/details" },
      { title: "Teaching Subject", href: "/dashboard/staff/teaching-subject" },
      { title: "Assessment", href: "/dashboard/staff/assessment" },
    ],
  },
  {
    title: "Operation",
    icon: <ShoppingCart className="h-5 w-5" />,
    submenu: [
      { title: "Exchange Order", href: "/dashboard/operation/exchange-order" },
      { title: "Purchase Order", href: "/dashboard/operation/purchase-order" },
      { title: "Static Data", href: "/dashboard/operation/static-data" },
    ],
  },
  {
    title: "Account",
    icon: <FileText className="h-5 w-5" />,
    submenu: [
      { title: "SOA Summary", href: "/dashboard/account/soa-summary" },
      { title: "SOA Details", href: "/dashboard/account/soa-details" },
    ],
  },
  {
    title: "Reports",
    icon: <BarChart3 className="h-5 w-5" />,
    submenu: [
      { title: "Admission Details", href: "/dashboard/reports/admission-details" },
      { title: "Enquiry Details", href: "/dashboard/reports/enquiry-details" },
      { title: "LSQ Enquiry Details", href: "/dashboard/reports/lsq-enquiry-details" },
      { title: "Fee Card Details", href: "/dashboard/reports/fee-card-details" },
    ],
  },
  {
    title: "Franchise",
    icon: <Building className="h-5 w-5" />,
    submenu: [
      { title: "Dashboard", href: "/dashboard/franchise" },
      { title: "Invoice Details", href: "/dashboard/franchise/invoice-details" },
      { title: "Invoice Download", href: "/dashboard/franchise/invoice-download" },
      { title: "Receipt Dashboard", href: "/dashboard/franchise/receipt-dashboard" },
      { title: "Holder", href: "/dashboard/franchise/holder" },
      { title: "Profile", href: "/dashboard/franchise/profile" },
      { title: "Type", href: "/dashboard/franchise/type" },
    ],
  },
  {
    title: "Shortage",
    icon: <BarChart3 className="h-5 w-5" />,
    submenu: [
      { title: "Report", href: "/dashboard/shortage/report" },
      { title: "Damage", href: "/dashboard/shortage/damage" },
      { title: "Download Report", href: "/dashboard/shortage/download-report" },
    ],
  },
  {
    title: "Tools",
    icon: <Tool className="h-5 w-5" />,
    submenu: [
      { title: "Fee Calculator", href: "/dashboard/tools/fee-calculator" },
      { title: "Calendar", href: "/dashboard/tools/calendar" },
      { title: "Academic", href: "/dashboard/tools/academic" },
    ],
  },
  { title: "Administration", href: "/dashboard/administration", icon: <Users className="h-5 w-5" /> },
  { title: "Profile", href: "/dashboard/profile", icon: <Users className="h-5 w-5" /> },
  { title: "Users", href: "/dashboard/users", icon: <Users className="h-5 w-5" /> },
  {
    title: "Settings",
    icon: <Settings className="h-5 w-5" />,
    submenu: [
      { title: "General", href: "/dashboard/settings" },
      { title: "Access Control", href: "/dashboard/settings/access" },
    ],
  },
]

// Suryadhi-only extras for branches (already scaffolded routes exist)
const suryadhiBranchExtras: NavItem[] = [
  {
    title: "Academics",
    icon: <Book className="h-5 w-5" />,
    submenu: [
      { title: "Students", href: "/dashboard/academics/students" },
      { title: "Teachers", href: "/dashboard/academics/teachers" },
      { title: "Parents", href: "/dashboard/academics/parents" },
    ],
  },
  {
    title: "Exams",
    icon: <FileText className="h-5 w-5" />,
    submenu: [
      { title: "Offline", href: "/dashboard/exams/offline" },
      { title: "Online", href: "/dashboard/exams/online" },
    ],
  },
  { title: "Transport", href: "/dashboard/transport", icon: <BusFront className="h-5 w-5" /> },
  { title: "Library", href: "/dashboard/library", icon: <Book className="h-5 w-5" /> },
  { title: "CCTV Live", href: "/dashboard/cctv-live", icon: <Camera className="h-5 w-5" /> },
  { title: "Visitor Management", href: "/dashboard/visitors", icon: <UserIcon className="h-5 w-5" /> },
  { title: "LMS", href: "/dashboard/lms", icon: <GraduationCap className="h-5 w-5" /> },
  { title: "Hostel Facility", href: "/dashboard/hostel", icon: <Home className="h-5 w-5" /> },
  { title: "Franchise Partner", href: "/dashboard/franchise-partner", icon: <Handshake className="h-5 w-5" /> },
  { title: "Program & Class", href: "/dashboard/program-class", icon: <BookOpen className="h-5 w-5" /> },
  { title: "Grade System", href: "/dashboard/grade-system", icon: <Award className="h-5 w-5" /> },
]

export function MainSidebar() {
  const pathname = usePathname()
  const { isOpen, setIsOpen } = useSidebar()
  const isMobile = useMediaQuery("(max-width: 1024px)")
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})

  // From login localStorage context
  const [currentInstitute] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("currentInstitute")
      return stored ? JSON.parse(stored) : null
    }
    return null
  })
  const [currentUser] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("currentUser")
      return stored ? JSON.parse(stored) : null
    }
    return null
  })

  // Explicitly detect Suryadhi Corporate HQ
  const isSuryadhiHQ =
    !!currentInstitute?.isHeadquarters &&
    ((currentInstitute?.id && /suryadhi/i.test(currentInstitute.id)) ||
      (currentInstitute?.name && /suryadhi\s*learning/i.test(currentInstitute.name)))

  const buildCorporateNav = (): NavItem[] => {
    // Deep copy
    const items: NavItem[] = baseCorporateNav.map((i) => ({
      ...i,
      submenu: i.submenu ? i.submenu.map((s) => ({ ...s })) : undefined,
    } as NavItem))

    // Ensure "Account" section exists with "Tally Bridge"
    let account = items.find((i) => i.title === "Account")
    if (!account) {
      account = {
        title: "Account",
        icon: <FileText className="h-5 w-5" />,
        submenu: [
          { title: "SOA Summary", href: "/dashboard/account/soa-summary" },
          { title: "SOA Details", href: "/dashboard/account/soa-details" },
        ],
      }
      // Insert after "Corporate Reports" if found, else push
      const idx = items.findIndex((i) => i.title === "Corporate Reports")
      if (idx >= 0) items.splice(idx + 1, 0, account)
      else items.push(account)
    }
    account.submenu = account.submenu || []
    if (!account.submenu.some((s) => s.title === "Tally Bridge")) {
      account.submenu.push({ title: "Tally Bridge", href: "/dashboard/account/tally-bridge" })
    }

    // Suryadhi HQ specific extras
    if (isSuryadhiHQ) {
      // 1) "Ads Management" under Brand Management (mother company -> brand ads)
      const brandMgmt = items.find((i) => i.title === "Brand Management")
      if (brandMgmt) {
        brandMgmt.submenu = brandMgmt.submenu || []
        if (!brandMgmt.submenu.some((s) => s.title === "Ads Management")) {
          brandMgmt.submenu.push({ title: "Ads Management", href: "/dashboard/brands/ads" })
        }
      }

      // 2) Admin Modules (Academics, Exams, Transport, Library, CCTV Live, Visitor, LMS, Hostel, Franchise Partner, Program & Class, Grade System)
      const adminModules: NavItem[] = [
        {
          title: "Academics",
          icon: <Book className="h-5 w-5" />,
          submenu: [
            { title: "Students", href: "/dashboard/academics/students" },
            { title: "Teachers", href: "/dashboard/academics/teachers" },
            { title: "Parents", href: "/dashboard/academics/parents" },
          ],
        },
        {
          title: "Exams",
          icon: <FileText className="h-5 w-5" />,
          submenu: [
            { title: "Offline", href: "/dashboard/exams/offline" },
            { title: "Online", href: "/dashboard/exams/online" },
          ],
        },
        { title: "Transport", href: "/dashboard/transport", icon: <BusFront className="h-5 w-5" /> },
        { title: "Library", href: "/dashboard/library", icon: <Book className="h-5 w-5" /> },
        { title: "CCTV Live", href: "/dashboard/cctv-live", icon: <Camera className="h-5 w-5" /> },
        { title: "Visitor Management", href: "/dashboard/visitors", icon: <UserIcon className="h-5 w-5" /> },
        { title: "LMS", href: "/dashboard/lms", icon: <GraduationCap className="h-5 w-5" /> },
        { title: "Hostel Facility", href: "/dashboard/hostel", icon: <Home className="h-5 w-5" /> },
        { title: "Franchise Partner", href: "/dashboard/franchise-partner", icon: <Handshake className="h-5 w-5" /> },
        { title: "Program & Class", href: "/dashboard/program-class", icon: <BookOpen className="h-5 w-5" /> },
        { title: "Grade System", href: "/dashboard/grade-system", icon: <Award className="h-5 w-5" /> },
      ]
      const afterReportsIdx = items.findIndex((i) => i.title === "Corporate Reports")
      if (afterReportsIdx >= 0) items.splice(afterReportsIdx + 1, 0, ...adminModules)
      else items.push(...adminModules)

      // 3) Franchise Purchase
      if (!items.some((i) => i.title === "Franchise")) {
        items.push({
          title: "Franchise",
          icon: <Building className="h-5 w-5" />,
          submenu: [{ title: "Purchase", href: "/dashboard/franchise/purchase" }],
        })
      } else {
        const franchise = items.find((i) => i.title === "Franchise")
        if (franchise) {
          franchise.submenu = franchise.submenu || []
          if (!franchise.submenu.some((s) => s.title === "Purchase")) {
            franchise.submenu.push({ title: "Purchase", href: "/dashboard/franchise/purchase" })
          }
        }
      }
    }

    return items
  }

  const buildBranchNav = (): NavItem[] => {
    const items: NavItem[] = baseBranchNavItems.map((i) => ({
      ...i,
      submenu: i.submenu ? i.submenu.map((s) => ({ ...s })) : undefined,
    } as NavItem))

    // Suryadhi Learning Private (branch) extras
    if (currentInstitute?.id === "suryadhi-learning") {
      const idx = items.findIndex((i) => i.title === "Enrollment")
      if (idx >= 0) items.splice(idx + 1, 0, ...suryadhiBranchExtras)
      else items.unshift(...suryadhiBranchExtras)

      // Tally Bridge to Account
      const account = items.find((i) => i.title === "Account")
      if (account) {
        account.submenu = account.submenu || []
        if (!account.submenu.some((s) => s.title === "Tally Bridge")) {
          account.submenu.push({ title: "Tally Bridge", href: "/dashboard/account/tally-bridge" })
        }
      }

      // Franchise Purchase
      const franchise = items.find((i) => i.title === "Franchise")
      if (franchise) {
        franchise.submenu = franchise.submenu || []
        if (!franchise.submenu.some((s) => s.title === "Purchase")) {
          franchise.submenu.push({ title: "Purchase", href: "/dashboard/franchise/purchase" })
        }
      }
    }

    return items
  }

  const navItems = useMemo(
    () => (currentInstitute?.isHeadquarters ? buildCorporateNav() : buildBranchNav()),
    // Recompute only when institute changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentInstitute?.id, currentInstitute?.isHeadquarters, currentInstitute?.name],
  )

  // Expand groups for current route
  useEffect(() => {
    const computed: Record<string, boolean> = {}
    navItems.forEach((item) => {
      if (item.submenu) {
        const isActive = item.submenu.some((s) => s.href && pathname.startsWith(s.href))
        if (isActive) computed[item.title] = true
      }
    })
    setExpandedItems((prev) => {
      const prevKeys = Object.keys(prev)
      const nextKeys = Object.keys(computed)
      if (prevKeys.length !== nextKeys.length) return computed
      for (const k of nextKeys) if (prev[k] !== computed[k]) return computed
      return prev
    })
  }, [pathname, navItems])

  const toggleSubmenu = (title: string) => {
    setExpandedItems((prev) => {
      const nextOpen = !prev[title]
      return nextOpen ? { [title]: true } : {}
    })
  }

  const handleLogout = () => {
    localStorage.removeItem("currentInstitute")
    localStorage.removeItem("userToken")
    localStorage.removeItem("currentUser")
    window.location.href = "/login"
  }

  if (!currentInstitute) return null

  const sidebar = (
    <>
      <div className="flex flex-col h-16 border-b border-gray-200 px-4 bg-gradient-to-r from-primary-900 to-primary-800">
        <div className="flex items-center gap-3 py-2">
          <Avatar className="h-10 w-10 border-2 border-white/20">
            <AvatarImage
              src={currentInstitute.logo || "/placeholder.svg?height=64&width=64&query=institute-logo"}
              alt={currentInstitute.name}
            />
            <AvatarFallback className="bg-secondary-500 text-white text-xs">
              {currentInstitute.name
                .split(" ")
                .map((word: string) => word[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className={cn("flex flex-col flex-1", !isOpen && "hidden")}>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-white truncate">{currentInstitute.name}</span>
              {currentInstitute.isHeadquarters && <Crown className="h-4 w-4 text-yellow-400" />}
            </div>
            <span className="text-xs text-white/70">
              {currentInstitute.type} • {currentInstitute.location}
            </span>
          </div>
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1 bg-white">
        <nav className="px-3 py-4">
          <ul className="space-y-1">
            {navItems.map((item, index) => (
              <li key={index}>
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.title)}
                      className={cn(
                        "flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-lg group transition-all duration-200",
                        expandedItems[item.title]
                          ? "bg-gradient-to-r from-secondary-50 to-secondary-100 text-primary-900 shadow-sm"
                          : "text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:text-primary-800",
                      )}
                    >
                      <span className="text-secondary-600">{item.icon}</span>
                      <span className={cn("ml-3 flex-1 text-left", !isOpen && "hidden")}>{item.title}</span>
                      <span
                        className={cn(
                          !isOpen && "hidden",
                          "transition-transform duration-200",
                          expandedItems[item.title] && "rotate-180",
                        )}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    </button>
                    {expandedItems[item.title] && (
                      <ul className={cn("mt-1 space-y-1 pl-10", !isOpen && "hidden")}>
                        {item.submenu.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              href={subItem.href || "#"}
                              className={cn(
                                "block px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                                pathname === subItem.href
                                  ? "bg-gradient-to-r from-accent-50 to-accent-100 text-accent-700 border-l-3 border-accent-500"
                                  : "text-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:text-primary-700",
                              )}
                            >
                              {subItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className={cn(
                      "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                      pathname === item.href
                        ? "bg-gradient-to-r from-primary-50 to-primary-100 text-primary-900 shadow-sm border-l-3 border-primary-500"
                        : "text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:text-primary-800",
                    )}
                  >
                    <span className="text-secondary-600">{item.icon}</span>
                    <span className={cn("ml-3", !isOpen && "hidden")}>{item.title}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </ScrollArea>

      <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
        {currentUser && (
          <div className={cn("mb-3 px-3 py-2", !isOpen && "hidden")}>
            <div className="text-xs text-gray-500">Logged in as</div>
            <div className="text-sm font-medium text-primary-900">{currentUser.name}</div>
            <div className="text-xs text-gray-600">{currentUser.role}</div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-all duration-200"
        >
          <LogOut className="h-5 w-5" />
          <span className={cn("ml-3", !isOpen && "hidden")}>Logout</span>
        </button>
      </div>
    </>
  )

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="p-0 w-72">
          <div className="flex flex-col h-full">{sidebar}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      className={cn(
        "flex flex-col border-r border-gray-200 bg-white h-screen sticky top-0 shadow-lg",
        isOpen ? "w-64" : "w-16",
        "transition-all duration-300 ease-in-out",
      )}
    >
      {sidebar}
    </div>
  )
}
