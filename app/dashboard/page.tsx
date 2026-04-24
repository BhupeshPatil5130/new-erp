"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  GraduationCap,
  CreditCard,
  Bell,
  FileText,
  UserCheck,
  IndianRupee,
  Building2,
  TrendingUp,
  Crown,
  BusFront,
  Book,
  Camera,
  ShoppingCart,
  UserIcon,
} from "lucide-react"
import Link from "next/link"
import { getDashboardData } from "@/lib/api-service"

export default function DashboardPage() {
  const [currentInstitute, setCurrentInstitute] = useState<any>(null)
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const adminModules = [
    { title: "Transport", href: "/dashboard/transport", icon: BusFront, color: "from-blue-500 to-blue-600" },
    {
      title: "Exams (Offline)",
      href: "/dashboard/exams/offline",
      icon: FileText,
      color: "from-slate-500 to-slate-600",
    },
    {
      title: "Exams (Online)",
      href: "/dashboard/exams/online",
      icon: FileText,
      color: "from-indigo-500 to-indigo-600",
    },
    { title: "Library", href: "/dashboard/library", icon: Book, color: "from-emerald-500 to-emerald-600" },
    { title: "CCTV Live", href: "/dashboard/cctv-live", icon: Camera, color: "from-rose-500 to-rose-600" },
    { title: "Visitor Mgmt", href: "/dashboard/visitors", icon: UserIcon, color: "from-amber-500 to-amber-600" },
    { title: "LMS", href: "/dashboard/lms", icon: GraduationCap, color: "from-teal-500 to-teal-600" },
    {
      title: "Students",
      href: "/dashboard/academics/students",
      icon: GraduationCap,
      color: "from-gray-500 to-gray-600",
    },
    {
      title: "Teachers",
      href: "/dashboard/academics/teachers",
      icon: UserCheck,
      color: "from-purple-500 to-purple-600",
    },
    { title: "Parents", href: "/dashboard/academics/parents", icon: Users, color: "from-pink-500 to-pink-600" },
    {
      title: "Tally Bridge",
      href: "/dashboard/account/tally-bridge",
      icon: IndianRupee,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Franchise Purchase",
      href: "/dashboard/franchise/purchase",
      icon: ShoppingCart,
      color: "from-orange-500 to-orange-600",
    },
  ]

  useEffect(() => {
    // Get current institute from localStorage
    const stored = localStorage.getItem("currentInstitute")
    if (stored) {
      setCurrentInstitute(JSON.parse(stored))
    }
    // Load dashboard data
    const loadData = async () => {
      try {
        const response = await getDashboardData()
        if (response.success) setDashboardData(response.data)
      } catch (error) {
        console.error("Error loading dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px] sm:min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  // Corporate Dashboard for Headquarters
  if (currentInstitute?.isHeadquarters && dashboardData?.metrics) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Crown className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600 shrink-0" />
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-900">Corporate Dashboard</h1>
              <p className="text-gray-600 mt-1 text-xs sm:text-sm">Manage all brands and monitor performance across the network</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="border-yellow-200 text-yellow-700 bg-yellow-50">
              <Crown className="mr-1 h-3 w-3" />
              Corporate HQ
            </Badge>
            <Badge variant="outline" className="border-accent-200 text-accent-700">
              {dashboardData.metrics.totalBrands} Brands
            </Badge>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Brands</p>
                <p className="text-2xl font-bold text-primary-900 mt-1">{dashboardData.metrics.totalBrands}</p>
                <p className="text-sm text-green-600 mt-2">{dashboardData.metrics.activeBrands} Active</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600">
                <Building2 className="h-6 w-6 text-white" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-purple-50">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-primary-900 mt-1">
                  {dashboardData.metrics.totalStudents.toLocaleString()}
                </p>
                <p className="text-sm text-green-600 mt-2">+12% from last month</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600">
                <Users className="h-6 w-6 text-white" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-green-50">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-primary-900 mt-1">
                  ₹{(dashboardData.metrics.totalRevenue / 100000).toFixed(1)}L
                </p>
                <p className="text-sm text-green-600 mt-2">+18% from last month</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600">
                <IndianRupee className="h-6 w-6 text-white" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-orange-50">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Revenue/Brand</p>
                <p className="text-2xl font-bold text-primary-900 mt-1">
                  ₹{(dashboardData.metrics.avgRevenuePerBrand / 100000).toFixed(1)}L
                </p>
                <p className="text-sm text-green-600 mt-2">+8% from last month</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Modules - HQ intentionally not showing Suryadhi-only tiles */}

        {/* Recent Activities */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-accent-50 to-accent-100 rounded-t-lg">
            <CardTitle className="text-primary-900 flex items-center">
              <Bell className="h-5 w-5 mr-2 text-accent-600" />
              Recent Activities
            </CardTitle>
            <CardDescription>Latest updates across all brands</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {dashboardData.recentActivities?.map((activity: any) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-primary-900">{activity.title}</p>
                    <p className="text-xs text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-4 border-accent-200 text-accent-700 hover:bg-accent-50 bg-transparent"
            >
              View All Activities
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Regular Branch Dashboard (with Suryadhi-only Admin Modules)
  const getDashboardStats = () => {
    if (!dashboardData) return []
    const baseStats = [
      {
        title: "Total Students",
        value: dashboardData.metrics.grossAdmission.toLocaleString(),
        change: "+12%",
        changeType: "positive" as const,
        icon: Users,
        color: "from-secondary-500 to-secondary-600",
      },
      {
        title: "Active Staff",
        value: "89",
        change: "+3%",
        changeType: "positive" as const,
        icon: UserCheck,
        color: "from-primary-500 to-primary-600",
      },
      {
        title: "Monthly Revenue",
        value: `₹${(dashboardData.metrics.collection / 100000).toFixed(1)}L`,
        change: "+8%",
        changeType: "positive" as const,
        icon: IndianRupee,
        color: "from-accent-500 to-accent-600",
      },
      {
        title: "Pending Enquiries",
        value: dashboardData.metrics.enquiry.toLocaleString(),
        change: "-5%",
        changeType: "negative" as const,
        icon: GraduationCap,
        color: "from-gray-500 to-gray-600",
      },
    ]
    if (currentInstitute?.id === "suryadhi-learning") {
      baseStats[0] = {
        title: "Total Trainees",
        value: dashboardData.metrics.grossAdmission.toLocaleString(),
        change: "+15%",
        changeType: "positive",
        icon: Users,
        color: "from-secondary-500 to-secondary-600",
      }
      baseStats[3] = {
        title: "Course Enquiries",
        value: dashboardData.metrics.enquiry.toLocaleString(),
        change: "+10%",
        changeType: "positive",
        icon: GraduationCap,
        color: "from-gray-500 to-gray-600",
      }
    }
    return baseStats
  }

  const recentActivities = [
    {
      id: 1,
      type: "admission",
      title: currentInstitute?.id === "suryadhi-learning" ? "New Enrollment" : "New Admission",
      description:
        currentInstitute?.id === "suryadhi-learning"
          ? "Rahul Verma enrolled in Teacher Training Program"
          : "Aadhya Sharma admitted to Play Group",
      time: "2 hours ago",
      icon: GraduationCap,
      color: "bg-secondary-100 text-secondary-700",
    },
    {
      id: 2,
      type: "payment",
      title: "Fee Payment",
      description:
        currentInstitute?.id === "suryadhi-learning"
          ? "Pooja Sharma paid ₹25,000 for ERP Training"
          : "Vihaan Patel paid ₹15,000 for Q2 fees",
      time: "4 hours ago",
      icon: CreditCard,
      color: "bg-accent-100 text-accent-700",
    },
    {
      id: 3,
      type: "staff",
      title: "Staff Update",
      description:
        currentInstitute?.id === "suryadhi-learning"
          ? "Vinit Bari updated training schedule"
          : "Priya Mehta marked attendance",
      time: "6 hours ago",
      icon: Users,
      color: "bg-primary-100 text-primary-700",
    },
    {
      id: 4,
      type: "enquiry",
      title: "New Enquiry",
      description:
        currentInstitute?.id === "suryadhi-learning"
          ? "Amit Singh enquired about Digital Learning Workshop"
          : "Saanvi Gupta enquired about admission",
      time: "8 hours ago",
      icon: Bell,
      color: "bg-gray-100 text-gray-700",
    },
  ]

  const dashboardStats = getDashboardStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-900">Dashboard</h1>
          <p className="text-gray-600 mt-1 text-xs sm:text-sm">
            Welcome back! Here's what's happening at {currentInstitute?.name || "your institute"} today.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className="border-secondary-200 text-secondary-700">
            Academic Year 2024-25
          </Badge>
          <Badge variant="outline" className="border-accent-200 text-accent-700">
            {currentInstitute?.type || "Institute"}
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {dashboardStats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-3 sm:p-5 md:p-6">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{stat.title}</p>
                  <p className="text-lg sm:text-2xl font-bold text-primary-900 mt-1 truncate">{stat.value}</p>
                  <div className="flex flex-wrap items-center mt-1 gap-x-1">
                    <span
                      className={`text-xs sm:text-sm font-medium ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-500 hidden sm:inline">from last month</span>
                  </div>
                </div>
                <div className={`p-2 sm:p-3 rounded-xl bg-gradient-to-r ${stat.color} shrink-0`}>
                  <stat.icon className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Admin Modules only for Suryadhi */}
      {currentInstitute?.id === "suryadhi-learning" && (
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
            <CardTitle className="text-primary-900">Admin Modules</CardTitle>
            <CardDescription>Quick access to core operational modules</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {adminModules.map((m, idx) => (
                <Link key={idx} href={m.href}>
                  <Card className="border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer group">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-3 rounded-lg bg-gradient-to-r ${m.color} group-hover:scale-110 transition-transform`}
                        >
                          <m.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary-900 group-hover:text-primary-700">{m.title}</h3>
                          <p className="text-xs text-gray-600">Open module</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Activities */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-lg">
          <CardTitle className="text-primary-900 flex items-center">
            <Bell className="h-5 w-5 mr-2 text-gray-600" />
            Recent Activities
          </CardTitle>
          <CardDescription>Latest updates and activities in your institute</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-4 rounded-lg border hover:shadow-sm">
                <div className={`p-2 rounded-lg ${activity.color}`}>
                  <activity.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-primary-900">{activity.title}</p>
                  <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
