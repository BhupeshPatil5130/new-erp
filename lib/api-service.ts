// This file contains all API service functions for the ERP system with brand-specific data

// Get current institute from localStorage
const getCurrentInstitute = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("currentInstitute")
    return stored ? JSON.parse(stored) : { id: "utopia-global" }
  }
  return { id: "utopia-global" }
}

// All brands data for corporate dashboard
const allBrandsData = [
  {
    id: "unix-global",
    name: "Unix Global Preschool",
    logo: "/unix_global_pre_school_color.jpeg",
    type: "Preschool",
    location: "Mumbai, Maharashtra",
    address: "123 Andheri East, Mumbai, Maharashtra 400069",
    phone: "+91 98765 43210",
    email: "info@unixglobal.com",
    website: "https://www.unixglobal.com",
    establishedYear: 2018,
    description: "Premium preschool focusing on holistic child development",
    ownerName: "Rajesh Mehta",
    ownerPhone: "+91 98765 43210",
    ownerEmail: "rajesh.mehta@unixglobal.com",
    isActive: true,
    totalStudents: 450,
    totalStaff: 25,
    monthlyRevenue: 1250000,
    initialFee: 75000,
    monthlyFee: 8000,
    lastLogin: "2024-01-15T10:30:00Z",
    permissions: {
      enrollment: true,
      fee: true,
      staff: true,
      reports: true,
      settings: true,
      franchise: true,
    },
  },
  {
    id: "utopia-world",
    name: "Utopia World Preschool",
    logo: "/utopia_world_pre_school_color.jpeg",
    type: "Preschool",
    location: "Pune, Maharashtra",
    address: "456 Koregaon Park, Pune, Maharashtra 411001",
    phone: "+91 87654 32109",
    email: "info@utopiaworld.com",
    website: "https://www.utopiaworld.com",
    establishedYear: 2019,
    description: "International curriculum preschool with play-based learning",
    ownerName: "Priya Sharma",
    ownerPhone: "+91 87654 32109",
    ownerEmail: "priya.sharma@utopiaworld.com",
    isActive: true,
    totalStudents: 380,
    totalStaff: 22,
    monthlyRevenue: 1150000,
    initialFee: 70000,
    monthlyFee: 7500,
    lastLogin: "2024-01-14T14:20:00Z",
    permissions: {
      enrollment: true,
      fee: true,
      staff: true,
      reports: true,
      settings: false,
      franchise: false,
    },
  },
  {
    id: "utopia-global",
    name: "Utopia Global School",
    logo: "/utopia_global_school_color.jpeg",
    type: "K12 School",
    location: "Bangalore, Karnataka",
    address: "789 Whitefield, Bangalore, Karnataka 560066",
    phone: "+91 76543 21098",
    email: "info@utopiaglobal.com",
    website: "https://www.utopiaglobal.com",
    establishedYear: 2017,
    description: "CBSE affiliated school with modern infrastructure and technology",
    ownerName: "Dr. Ramesh Kumar",
    ownerPhone: "+91 76543 21098",
    ownerEmail: "ramesh.kumar@utopiaglobal.com",
    isActive: true,
    totalStudents: 1250,
    totalStaff: 85,
    monthlyRevenue: 3750000,
    initialFee: 150000,
    monthlyFee: 15000,
    lastLogin: "2024-01-15T09:15:00Z",
    permissions: {
      enrollment: true,
      fee: true,
      staff: true,
      reports: true,
      settings: true,
      franchise: true,
    },
  },
  {
    id: "suryadhi-learning",
    name: "Suryadhi Learning Center",
    logo: "/suryadhi_learning_logo.jpeg",
    type: "Training Center",
    location: "Delhi, NCR",
    address: "321 Dwarka, New Delhi 110075",
    phone: "+91 65432 10987",
    email: "info@suryadhilearning.com",
    website: "https://www.suryadhilearning.com",
    establishedYear: 2015,
    description: "Professional training center for educators and administrators",
    ownerName: "Vinit Bari",
    ownerPhone: "+91 65432 10987",
    ownerEmail: "vinit.bari@suryadhilearning.com",
    isActive: true,
    totalStudents: 850,
    totalStaff: 35,
    monthlyRevenue: 2100000,
    initialFee: 50000,
    monthlyFee: 5000,
    lastLogin: "2024-01-15T11:45:00Z",
    permissions: {
      enrollment: true,
      fee: true,
      staff: true,
      reports: true,
      settings: false,
      franchise: false,
    },
  },
]

// Mock users data
const usersData = [
  {
    id: "USR001",
    name: "Vinit Bari",
    email: "vinit.bari@suryadhilearning.com",
    phone: "+91 98765 43210",
    role: "Corporate Administrator",
    brand: "Suryadhi Learning Pvt. Ltd",
    isActive: true,
    lastLogin: "2024-01-15T10:30:00Z",
    avatar: "/placeholder.svg",
  },
  {
    id: "USR002",
    name: "Rajesh Mehta",
    email: "rajesh.mehta@unixglobal.com",
    phone: "+91 98765 43211",
    role: "Branch Administrator",
    brand: "Unix Global Preschool",
    isActive: true,
    lastLogin: "2024-01-15T09:15:00Z",
    avatar: "/placeholder.svg",
  },
  {
    id: "USR003",
    name: "Priya Sharma",
    email: "priya.sharma@utopiaworld.com",
    phone: "+91 98765 43212",
    role: "Branch Administrator",
    brand: "Utopia World Preschool",
    isActive: true,
    lastLogin: "2024-01-14T16:45:00Z",
    avatar: "/placeholder.svg",
  },
  {
    id: "USR004",
    name: "Dr. Ramesh Kumar",
    email: "ramesh.kumar@utopiaglobal.com",
    phone: "+91 98765 43213",
    role: "Branch Administrator",
    brand: "Utopia Global School",
    isActive: true,
    lastLogin: "2024-01-15T08:30:00Z",
    avatar: "/placeholder.svg",
  },
  {
    id: "USR005",
    name: "Neha Agarwal",
    email: "neha.agarwal@suryadhilearning.com",
    phone: "+91 98765 43214",
    role: "Manager",
    brand: "Suryadhi Learning Center",
    isActive: true,
    lastLogin: "2024-01-15T11:20:00Z",
    avatar: "/placeholder.svg",
  },
]

// Mock roles data
const rolesData = [
  {
    id: "ROLE001",
    name: "Corporate Administrator",
    description: "Full access to all corporate functions and brand management",
    isActive: true,
    isCustom: false,
    userCount: 1,
    permissions: {
      dashboard_view: true,
      dashboard_analytics: true,
      brand_view: true,
      brand_create: true,
      brand_edit: true,
      brand_delete: true,
      user_view: true,
      user_create: true,
      user_edit: true,
      user_delete: true,
      permission_view: true,
      permission_edit: true,
      role_manage: true,
      report_view: true,
      report_export: true,
      report_create: true,
    },
  },
  {
    id: "ROLE002",
    name: "Branch Administrator",
    description: "Full access to branch operations and management",
    isActive: true,
    isCustom: false,
    userCount: 3,
    permissions: {
      dashboard_view: true,
      dashboard_analytics: true,
      brand_view: false,
      brand_create: false,
      brand_edit: false,
      brand_delete: false,
      user_view: true,
      user_create: true,
      user_edit: true,
      user_delete: false,
      permission_view: true,
      permission_edit: false,
      role_manage: false,
      report_view: true,
      report_export: true,
      report_create: true,
    },
  },
  {
    id: "ROLE003",
    name: "Manager",
    description: "Limited administrative access with operational focus",
    isActive: true,
    isCustom: false,
    userCount: 1,
    permissions: {
      dashboard_view: true,
      dashboard_analytics: true,
      brand_view: false,
      brand_create: false,
      brand_edit: false,
      brand_delete: false,
      user_view: true,
      user_create: false,
      user_edit: false,
      user_delete: false,
      permission_view: false,
      permission_edit: false,
      role_manage: false,
      report_view: true,
      report_export: false,
      report_create: false,
    },
  },
  {
    id: "ROLE004",
    name: "Staff",
    description: "Basic access for daily operations",
    isActive: true,
    isCustom: false,
    userCount: 0,
    permissions: {
      dashboard_view: true,
      dashboard_analytics: false,
      brand_view: false,
      brand_create: false,
      brand_edit: false,
      brand_delete: false,
      user_view: false,
      user_create: false,
      user_edit: false,
      user_delete: false,
      permission_view: false,
      permission_edit: false,
      role_manage: false,
      report_view: false,
      report_export: false,
      report_create: false,
    },
  },
]

// Mock audit logs data
const auditLogsData = [
  {
    id: "LOG001",
    timestamp: "2024-01-15T10:30:00Z",
    user: "Vinit Bari",
    userId: "USR001",
    userRole: "Corporate Administrator",
    userAvatar: "/placeholder.svg",
    action: "login",
    description: "User logged into corporate dashboard",
    severity: "low",
    ipAddress: "192.168.1.100",
    details: { browser: "Chrome", os: "Windows" },
  },
  {
    id: "LOG002",
    timestamp: "2024-01-15T10:25:00Z",
    user: "Vinit Bari",
    userId: "USR001",
    userRole: "Corporate Administrator",
    userAvatar: "/placeholder.svg",
    action: "create",
    description: "Created new brand: Test Preschool",
    severity: "medium",
    ipAddress: "192.168.1.100",
    details: { brandId: "test-preschool", brandName: "Test Preschool" },
  },
  {
    id: "LOG003",
    timestamp: "2024-01-15T10:20:00Z",
    user: "Rajesh Mehta",
    userId: "USR002",
    userRole: "Branch Administrator",
    userAvatar: "/placeholder.svg",
    action: "permission_change",
    description: "Updated user permissions for staff member",
    severity: "high",
    ipAddress: "192.168.1.101",
    details: { targetUser: "Staff001", permissions: ["enrollment", "fee"] },
  },
  {
    id: "LOG004",
    timestamp: "2024-01-15T10:15:00Z",
    user: "Priya Sharma",
    userId: "USR003",
    userRole: "Branch Administrator",
    userAvatar: "/placeholder.svg",
    action: "update",
    description: "Updated student admission record",
    severity: "low",
    ipAddress: "192.168.1.102",
    details: { studentId: "STU001", changes: ["fee_status"] },
  },
  {
    id: "LOG005",
    timestamp: "2024-01-15T10:10:00Z",
    user: "Dr. Ramesh Kumar",
    userId: "USR004",
    userRole: "Branch Administrator",
    userAvatar: "/placeholder.svg",
    action: "delete",
    description: "Deleted expired enquiry record",
    severity: "medium",
    ipAddress: "192.168.1.103",
    details: { enquiryId: "ENQ001", reason: "expired" },
  },
  {
    id: "LOG006",
    timestamp: "2024-01-15T10:05:00Z",
    user: "Neha Agarwal",
    userId: "USR005",
    userRole: "Manager",
    userAvatar: "/placeholder.svg",
    action: "status_change",
    description: "Changed student status from pending to active",
    severity: "low",
    ipAddress: "192.168.1.104",
    details: { studentId: "STU002", oldStatus: "pending", newStatus: "active" },
  },
]

// Brand-specific data for Unix Global Preschool
const unixGlobalData = {
  enquiries: [],
  staff: [],
  admissions: [],
}

// Brand-specific data for Utopia World Preschool
const utopiaWorldData = {
  enquiries: [],
  staff: [],
  admissions: [],
}

// Brand-specific data for Utopia Global School
const utopiaGlobalData = {
  enquiries: [],
  staff: [],
  admissions: [],
}

// Brand-specific data for Suryadhi Learning
const suryadhiLearningData = {
  enquiries: [],
  staff: [],
  admissions: [],
}

// Function to get brand-specific data
const getBrandData = () => {
  const currentInstitute = getCurrentInstitute()

  switch (currentInstitute.id) {
    case "unix-global":
      return unixGlobalData
    case "utopia-world":
      return utopiaWorldData
    case "utopia-global":
      return utopiaGlobalData
    case "suryadhi-learning":
      return suryadhiLearningData
    case "suryadhi-learning-hq":
      // HQ selected: do NOT fall back to Utopia; use Suryadhi dataset
      return suryadhiLearningData
    default:
      // Generic fallback
      return utopiaGlobalData
  }
}

// Corporate Dashboard API functions
export const getAllBrands = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: allBrandsData }
}

export const getBrandById = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const brand = allBrandsData.find((b) => b.id === id)
  return { success: true, data: brand }
}

export const createBrand = async (brandData: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const newBrand = {
    id: `brand-${Date.now()}`,
    ...brandData,
    isActive: true,
    totalStudents: 0,
    totalStaff: 0,
    monthlyRevenue: 0,
    lastLogin: null,
    permissions: {
      enrollment: true,
      fee: true,
      staff: true,
      reports: false,
      settings: false,
      franchise: false,
    },
  }
  allBrandsData.push(newBrand)
  return { success: true, data: newBrand }
}

export const updateBrand = async (id: string, brandData: any) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = allBrandsData.findIndex((b) => b.id === id)
  if (index !== -1) {
    allBrandsData[index] = { ...allBrandsData[index], ...brandData }
    return { success: true, data: allBrandsData[index] }
  }
  return { success: false, error: "Brand not found" }
}

export const updateBrandStatus = async (id: string, isActive: boolean) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const index = allBrandsData.findIndex((b) => b.id === id)
  if (index !== -1) {
    allBrandsData[index].isActive = isActive
    return { success: true, data: allBrandsData[index] }
  }
  return { success: false, error: "Brand not found" }
}

export const updateBrandPermissions = async (id: string, permissions: any) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const index = allBrandsData.findIndex((b) => b.id === id)
  if (index !== -1) {
    allBrandsData[index].permissions = permissions
    return { success: true, data: allBrandsData[index] }
  }
  return { success: false, error: "Brand not found" }
}

// User Management API functions
export const getAllUsers = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: usersData }
}

export const createUser = async (userData: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const newUser = {
    id: `USR${String(usersData.length + 1).padStart(3, "0")}`,
    ...userData,
    isActive: true,
    lastLogin: null,
    avatar: "/placeholder.svg",
  }
  usersData.push(newUser)
  return { success: true, data: newUser }
}

export const updateUserStatus = async (id: string, isActive: boolean) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const index = usersData.findIndex((u) => u.id === id)
  if (index !== -1) {
    usersData[index].isActive = isActive
    return { success: true, data: usersData[index] }
  }
  return { success: false, error: "User not found" }
}

export const deleteUser = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const index = usersData.findIndex((u) => u.id === id)
  if (index !== -1) {
    usersData.splice(index, 1)
    return { success: true }
  }
  return { success: false, error: "User not found" }
}

// Role Management API functions
export const getAllRoles = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: rolesData }
}

export const createRole = async (roleData: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const newRole = {
    id: `ROLE${String(rolesData.length + 1).padStart(3, "0")}`,
    ...roleData,
    isActive: true,
    isCustom: true,
    userCount: 0,
  }
  rolesData.push(newRole)
  return { success: true, data: newRole }
}

export const updateRole = async (id: string, roleData: any) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const index = rolesData.findIndex((r) => r.id === id)
  if (index !== -1) {
    rolesData[index] = { ...rolesData[index], ...roleData }
    return { success: true, data: rolesData[index] }
  }
  return { success: false, error: "Role not found" }
}

export const deleteRole = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const index = rolesData.findIndex((r) => r.id === id)
  if (index !== -1 && rolesData[index].isCustom) {
    rolesData.splice(index, 1)
    return { success: true }
  }
  return { success: false, error: "Cannot delete system role" }
}

// Audit Logs API functions
export const getAuditLogs = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: auditLogsData }
}

export const exportAuditLogs = async (filters: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  // Mock CSV data
  const csvData = `Timestamp,User,Action,Description,Severity,IP Address
${auditLogsData
  .map((log) => `${log.timestamp},${log.user},${log.action},"${log.description}",${log.severity},${log.ipAddress}`)
  .join("\n")}`
  return { success: true, data: csvData }
}

// Consolidated Reports API functions
export const getConsolidatedReports = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1200))

  const reportData = {
    summary: {
      totalRevenue: allBrandsData.reduce((sum, brand) => sum + brand.monthlyRevenue, 0),
      revenueGrowth: 15.2,
      totalStudents: allBrandsData.reduce((sum, brand) => sum + brand.totalStudents, 0),
      studentGrowth: 12.8,
      activeBrands: allBrandsData.filter((brand) => brand.isActive).length,
      totalBrands: allBrandsData.length,
      newAdmissions: 145,
    },
    charts: {
      revenueByBrand: allBrandsData.map((brand) => ({
        name: brand.name.split(" ")[0],
        revenue: brand.monthlyRevenue,
      })),
      revenueDistribution: [
        { name: "Preschools", value: 2400000 },
        { name: "K12 Schools", value: 3750000 },
        { name: "Training Centers", value: 2100000 },
      ],
      studentsByBrand: allBrandsData.map((brand) => ({
        name: brand.name.split(" ")[0],
        students: brand.totalStudents,
      })),
      enrollmentTrends: [
        { month: "Jan", enrollments: 120 },
        { month: "Feb", enrollments: 135 },
        { month: "Mar", enrollments: 145 },
        { month: "Apr", enrollments: 160 },
        { month: "May", enrollments: 175 },
        { month: "Jun", enrollments: 190 },
      ],
      growthTrends: [
        { month: "Jan", revenue: 7500000, students: 2800 },
        { month: "Feb", revenue: 7800000, students: 2850 },
        { month: "Mar", revenue: 8100000, students: 2900 },
        { month: "Apr", revenue: 8250000, students: 2930 },
        { month: "May", revenue: 8400000, students: 2950 },
        { month: "Jun", revenue: 8250000, students: 2930 },
      ],
    },
    brandPerformance: allBrandsData.map((brand, index) => ({
      id: brand.id,
      name: brand.name,
      type: brand.type,
      location: brand.location,
      students: brand.totalStudents,
      revenue: brand.monthlyRevenue,
      growth: [15.2, 12.8, 18.5, 9.3][index] || 10.0,
    })),
  }

  return { success: true, data: reportData }
}

export const exportConsolidatedReport = async (format: string) => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  // Mock export data
  const mockData = format === "pdf" ? "PDF_BINARY_DATA" : "EXCEL_BINARY_DATA"
  return { success: true, data: mockData }
}

// Existing API functions for brand-specific data
export const getEnquiries = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const brandData = getBrandData()
  return { success: true, data: brandData.enquiries }
}

export const getStaffList = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const brandData = getBrandData()
  return { success: true, data: brandData.staff }
}

export const getAdmissions = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const brandData = getBrandData()
  return { success: true, data: brandData.admissions }
}

// Payment and Fee related functions
export const getPaymentDetails = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    success: true,
    data: {
      totalCollected: 2450000,
      pendingAmount: 350000,
      overdueAmount: 125000,
      transactions: [
        {
          id: "TXN001",
          studentName: "Aadhya Sharma",
          amount: 8000,
          date: "2024-01-15",
          status: "Completed",
          method: "UPI",
        },
        {
          id: "TXN002",
          studentName: "Vihaan Patel",
          amount: 7500,
          date: "2024-01-14",
          status: "Pending",
          method: "Bank Transfer",
        },
      ],
    },
  }
}

export const getFeeStructure = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return {
    success: true,
    data: [
      {
        id: "FEE001",
        course: "Play Group",
        admissionFee: 15000,
        monthlyFee: 8000,
        annualFee: 96000,
        extraCharges: {
          transport: 2000,
          meals: 1500,
          activities: 1000,
        },
      },
      {
        id: "FEE002",
        course: "Nursery",
        admissionFee: 18000,
        monthlyFee: 9000,
        annualFee: 108000,
        extraCharges: {
          transport: 2000,
          meals: 1500,
          activities: 1200,
        },
      },
    ],
  }
}

// Reports functions
export const getAdmissionDetails = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const brandData = getBrandData()
  return {
    success: true,
    data: {
      totalAdmissions: brandData.admissions.length,
      monthlyAdmissions: brandData.admissions.filter(
        (admission) => new Date(admission.admissionDate).getMonth() === new Date().getMonth(),
      ).length,
      admissionsByMonth: [
        { month: "Jan", count: 45 },
        { month: "Feb", count: 52 },
        { month: "Mar", count: 38 },
        { month: "Apr", count: 65 },
        { month: "May", count: 48 },
        { month: "Jun", count: 55 },
      ],
      admissions: brandData.admissions,
    },
  }
}

// Dashboard stats
export const getDashboardStats = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const brandData = getBrandData()
  const currentInstitute = getCurrentInstitute()

  // Corporate dashboard stats
  if (currentInstitute.id === "suryadhi-corporate") {
    return {
      success: true,
      data: {
        totalBrands: allBrandsData.length,
        activeBrands: allBrandsData.filter((b) => b.isActive).length,
        totalStudents: allBrandsData.reduce((sum, brand) => sum + brand.totalStudents, 0),
        totalRevenue: allBrandsData.reduce((sum, brand) => sum + brand.monthlyRevenue, 0),
        totalStaff: allBrandsData.reduce((sum, brand) => sum + brand.totalStaff, 0),
        recentActivities: [
          {
            id: 1,
            type: "brand_added",
            message: "New brand 'Test Preschool' added to the system",
            timestamp: "2024-01-15T10:30:00Z",
            user: "Vinit Bari",
          },
          {
            id: 2,
            type: "permission_updated",
            message: "Permissions updated for Unix Global Preschool",
            timestamp: "2024-01-15T09:15:00Z",
            user: "Vinit Bari",
          },
          {
            id: 3,
            type: "user_created",
            message: "New user account created for Rajesh Mehta",
            timestamp: "2024-01-14T16:45:00Z",
            user: "Vinit Bari",
          },
        ],
        brandPerformance: allBrandsData.map((brand) => ({
          name: brand.name,
          students: brand.totalStudents,
          revenue: brand.monthlyRevenue,
          growth: Math.floor(Math.random() * 20) + 5, // Random growth percentage
        })),
      },
    }
  }

  // Brand-specific dashboard stats
  return {
    success: true,
    data: {
      totalStudents: brandData.admissions.length,
      totalEnquiries: brandData.enquiries.length,
      totalStaff: brandData.staff.length,
      monthlyRevenue: 450000,
      newEnquiries: brandData.enquiries.filter((e) => e.status === "New").length,
      pendingAdmissions: brandData.enquiries.filter((e) => e.status === "Interested").length,
      recentActivities: [
        {
          id: 1,
          type: "enquiry",
          message: `New enquiry from ${brandData.enquiries[0]?.name || "Student"}`,
          timestamp: "2024-01-15T10:30:00Z",
        },
        {
          id: 2,
          type: "admission",
          message: `Admission confirmed for ${brandData.admissions[0]?.name || "Student"}`,
          timestamp: "2024-01-15T09:15:00Z",
        },
        {
          id: 3,
          type: "payment",
          message: "Fee payment received from parent",
          timestamp: "2024-01-14T16:45:00Z",
        },
      ],
    },
  }
}

// Generic functions for other modules
export const createEnquiry = async (enquiryData: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return { success: true, data: { id: `ENQ${Date.now()}`, ...enquiryData } }
}

export const updateEnquiry = async (id: string, enquiryData: any) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: { id, ...enquiryData } }
}

export const deleteEnquiry = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return { success: true }
}

export const createAdmission = async (admissionData: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1200))
  return { success: true, data: { id: `ADM${Date.now()}`, ...admissionData } }
}

export const updateAdmission = async (id: string, admissionData: any) => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { success: true, data: { id, ...admissionData } }
}

export const processPayment = async (paymentData: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return { success: true, data: { transactionId: `TXN${Date.now()}`, ...paymentData } }
}

export const generateReport = async (reportType: string, filters: any) => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return { success: true, data: { reportId: `RPT${Date.now()}`, type: reportType, ...filters } }
}

export const exportData = async (dataType: string, format: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return { success: true, data: `${dataType}_export.${format}` }
}

// Mock data for dashboard
type DashboardData = {
  success: boolean
  data: {
    metrics: {
      totalBrands: number
      activeBrands: number
      totalStudents: number
      totalRevenue: number
      avgRevenuePerBrand: number
      grossAdmission: number
      collection: number
      enquiry: number
    }
    brandPerformance: Array<{ id: string; name: string; students: number; revenue: number; growth: number }>
    recentActivities: Array<{ id: string; type: string; title: string; description: string; time: string }>
  }
}

/**
 Mock API returning consistent dashboard data to prevent runtime errors.
*/
export async function getDashboardData(): Promise<DashboardData> {
  await new Promise((r) => setTimeout(r, 300)) // simulate latency
  return {
    success: true,
    data: {
      metrics: {
        totalBrands: 4,
        activeBrands: 3,
        totalStudents: 4825,
        totalRevenue: 125000000, // ₹12.5Cr
        avgRevenuePerBrand: 31250000,
        grossAdmission: 1345,
        collection: 48500000,
        enquiry: 126,
      },
      brandPerformance: [
        { id: "b1", name: "Unix Global Preschool", students: 1450, revenue: 18500000, growth: 12 },
        { id: "b2", name: "Utopia World Preschool", students: 1100, revenue: 16000000, growth: 9 },
        { id: "b3", name: "Utopia Global School", students: 1900, revenue: 25500000, growth: 15 },
        { id: "b4", name: "Suryadhi Learning Center", students: 375, revenue: 5500000, growth: 7 },
      ],
      recentActivities: [
        {
          id: "a1",
          type: "brand_added",
          title: "New Brand Onboarded",
          description: "Utopia World Preschool added",
          time: "1h ago",
        },
        {
          id: "a2",
          type: "permission_updated",
          title: "Permissions Updated",
          description: "Access policy changed for teachers",
          time: "3h ago",
        },
        {
          id: "a3",
          type: "report_generated",
          title: "Monthly Report Generated",
          description: "Consolidated report ready",
          time: "5h ago",
        },
      ],
    },
  }
}

export const getCorporateDashboardData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const totalStudents = allBrandsData.reduce((sum, brand) => sum + brand.totalStudents, 0)
  const totalStaff = allBrandsData.reduce((sum, brand) => sum + brand.totalStaff, 0)
  const totalRevenue = allBrandsData.reduce((sum, brand) => sum + brand.monthlyRevenue, 0)
  const activeBrands = allBrandsData.filter((brand) => brand.isActive).length

  return {
    success: true,
    data: {
      metrics: {
        totalBrands: allBrandsData.length,
        activeBrands,
        totalStudents,
        totalStaff,
        totalRevenue,
        avgRevenuePerBrand: totalRevenue / allBrandsData.length,
      },
      brandPerformance: allBrandsData.map((brand) => ({
        id: brand.id,
        name: brand.name,
        students: brand.totalStudents,
        revenue: brand.monthlyRevenue,
        growth: Math.floor(Math.random() * 20) + 5, // Mock growth percentage
      })),
      recentActivities: [
        {
          id: 1,
          type: "brand_added",
          title: "New Brand Added",
          description: "Unix Global Preschool - Malad branch added",
          time: "2 hours ago",
          brandId: "unix-global",
        },
        {
          id: 2,
          type: "permission_updated",
          title: "Permissions Updated",
          description: "Utopia World Preschool permissions modified",
          time: "4 hours ago",
          brandId: "utopia-world",
        },
        {
          id: 3,
          type: "status_changed",
          title: "Brand Status Changed",
          description: "Suryadhi Learning Center activated",
          time: "6 hours ago",
          brandId: "suryadhi-learning",
        },
      ],
    },
  }
}

// Access Control API functions
export const getBrandPermissions = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return {
    success: true,
    data: allBrandsData.map((brand) => ({
      id: brand.id,
      name: brand.name,
      permissions: brand.permissions,
    })),
  }
}

export const updateBrandPermission = async (brandId: string, module: string, enabled: boolean) => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const brand = allBrandsData.find((b) => b.id === brandId)
  if (brand) {
    brand.permissions[module] = enabled
    return { success: true, data: brand.permissions }
  }
  return { success: false, error: "Brand not found" }
}

export const bulkUpdateBrandPermissions = async (brandIds: string[], permissions: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  brandIds.forEach((brandId) => {
    const brand = allBrandsData.find((b) => b.id === brandId)
    if (brand) {
      brand.permissions = { ...brand.permissions, ...permissions }
    }
  })
  return { success: true }
}

// System Configuration API functions
export const getSystemConfig = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return {
    success: true,
    data: {
      general: {
        systemName: "Suryadhi ERP",
        version: "2.1.0",
        timezone: "Asia/Kolkata",
        dateFormat: "DD/MM/YYYY",
        currency: "INR",
        language: "en",
      },
      security: {
        sessionTimeout: 30,
        passwordPolicy: {
          minLength: 8,
          requireUppercase: true,
          requireLowercase: true,
          requireNumbers: true,
          requireSpecialChars: true,
        },
        twoFactorAuth: false,
        loginAttempts: 5,
      },
      notifications: {
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        dailyReports: true,
        weeklyReports: true,
      },
      backup: {
        autoBackup: true,
        backupFrequency: "daily",
        retentionPeriod: 30,
        lastBackup: "2024-01-15T02:00:00Z",
      },
    },
  }
}

export const updateSystemConfig = async (config: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return { success: true, data: config }
}

// Integration API functions
export const getIntegrations = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return {
    success: true,
    data: [
      {
        id: "payment-gateway",
        name: "Payment Gateway",
        description: "Razorpay integration for online payments",
        status: "connected",
        lastSync: "2024-01-15T10:30:00Z",
        config: {
          apiKey: "rzp_test_****",
          webhookUrl: "https://api.suryadhi.com/webhook/razorpay",
        },
      },
      {
        id: "sms-service",
        name: "SMS Service",
        description: "SMS notifications for parents and staff",
        status: "connected",
        lastSync: "2024-01-15T09:15:00Z",
        config: {
          provider: "Twilio",
          senderId: "SURYADHI",
        },
      },
      {
        id: "email-service",
        name: "Email Service",
        description: "Email notifications and reports",
        status: "connected",
        lastSync: "2024-01-15T08:45:00Z",
        config: {
          provider: "SendGrid",
          fromEmail: "noreply@suryadhi.com",
        },
      },
      {
        id: "google-workspace",
        name: "Google Workspace",
        description: "Google Drive integration for document storage",
        status: "disconnected",
        lastSync: null,
        config: {},
      },
    ],
  }
}

export const updateIntegration = async (id: string, config: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return { success: true, data: { id, ...config } }
}

export const testIntegration = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return { success: true, data: { status: "connected", message: "Integration test successful" } }
}

// Analytics API functions
export const getBrandAnalytics = async (brandId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1200))
  const brand = allBrandsData.find((b) => b.id === brandId)
  if (!brand) {
    return { success: false, error: "Brand not found" }
  }

  return {
    success: true,
    data: {
      overview: {
        totalStudents: brand.totalStudents,
        totalStaff: brand.totalStaff,
        monthlyRevenue: brand.monthlyRevenue,
        growthRate: Math.floor(Math.random() * 20) + 5,
      },
      charts: {
        enrollmentTrends: [
          { month: "Jan", students: brand.totalStudents - 50 },
          { month: "Feb", students: brand.totalStudents - 40 },
          { month: "Mar", students: brand.totalStudents - 30 },
          { month: "Apr", students: brand.totalStudents - 20 },
          { month: "May", students: brand.totalStudents - 10 },
          { month: "Jun", students: brand.totalStudents },
        ],
        revenueTrends: [
          { month: "Jan", revenue: brand.monthlyRevenue * 0.8 },
          { month: "Feb", revenue: brand.monthlyRevenue * 0.85 },
          { month: "Mar", revenue: brand.monthlyRevenue * 0.9 },
          { month: "Apr", revenue: brand.monthlyRevenue * 0.95 },
          { month: "May", revenue: brand.monthlyRevenue * 0.98 },
          { month: "Jun", revenue: brand.monthlyRevenue },
        ],
        courseDistribution: [
          { name: "Play Group", value: 40, fill: "#3b82f6" },
          { name: "Nursery", value: 30, fill: "#1e3a8a" },
          { name: "LKG", value: 20, fill: "#84cc16" },
          { name: "UKG", value: 10, fill: "#b91c1c" },
        ],
      },
    },
  }
}

// Notification API functions
export const getNotifications = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return {
    success: true,
    data: [
      {
        id: "NOTIF001",
        title: "New Admission",
        message: "Aadhya Sharma has been admitted to Play Group",
        type: "admission",
        priority: "medium",
        isRead: false,
        timestamp: "2024-01-15T10:30:00Z",
        brandId: "unix-global",
      },
      {
        id: "NOTIF002",
        title: "Payment Received",
        message: "Fee payment of ₹8,000 received from Vihaan Patel",
        type: "payment",
        priority: "low",
        isRead: false,
        timestamp: "2024-01-15T09:15:00Z",
        brandId: "utopia-world",
      },
      {
        id: "NOTIF003",
        title: "Staff Update",
        message: "Priya Mehta marked attendance for today",
        type: "staff",
        priority: "low",
        isRead: true,
        timestamp: "2024-01-15T08:45:00Z",
        brandId: "unix-global",
      },
    ],
  }
}

export const markNotificationAsRead = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return { success: true }
}

export const markAllNotificationsAsRead = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return { success: true }
}

// Staff Assessment API functions
export const getStaffAssessments = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return {
    success: true,
    data: [
      {
        id: "ASS001",
        staffId: "STAFF001",
        staffName: "Priya Mehta",
        assessmentType: "Performance Review",
        assessmentDate: "2024-01-15",
        score: 85,
        maxScore: 100,
        status: "Completed",
        evaluator: "Dr. Ramesh Kumar",
        comments: "Excellent performance in classroom management and student engagement",
        areas: ["Communication", "Leadership", "Innovation"],
        recommendations: ["Continue mentoring junior staff", "Lead professional development sessions"],
      },
      {
        id: "ASS002",
        staffId: "STAFF002",
        staffName: "Rajesh Singh",
        assessmentType: "Skills Assessment",
        assessmentDate: "2024-01-14",
        score: 78,
        maxScore: 100,
        status: "Completed",
        evaluator: "Dr. Ramesh Kumar",
        comments: "Good technical skills, needs improvement in student interaction",
        areas: ["Technical Skills", "Student Engagement", "Communication"],
        recommendations: ["Attend communication workshops", "Practice active listening"],
      },
      {
        id: "ASS003",
        staffId: "STAFF003",
        staffName: "Anita Desai",
        assessmentType: "Annual Review",
        assessmentDate: "2024-01-13",
        score: 92,
        maxScore: 100,
        status: "Completed",
        evaluator: "Dr. Ramesh Kumar",
        comments: "Outstanding performance across all areas, exemplary leadership",
        areas: ["Leadership", "Innovation", "Student Success", "Team Collaboration"],
        recommendations: ["Consider promotion opportunities", "Share best practices with team"],
      },
    ],
  }
}

export const getStaffAssessmentById = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 600))
  const assessments = [
    {
      id: "ASS001",
      staffId: "STAFF001",
      staffName: "Priya Mehta",
      assessmentType: "Performance Review",
      assessmentDate: "2024-01-15",
      score: 85,
      maxScore: 100,
      status: "Completed",
      evaluator: "Dr. Ramesh Kumar",
      comments: "Excellent performance in classroom management and student engagement",
      areas: ["Communication", "Leadership", "Innovation"],
      recommendations: ["Continue mentoring junior staff", "Lead professional development sessions"],
      detailedScores: {
        communication: 90,
        leadership: 85,
        innovation: 80,
        teamwork: 85,
        problemSolving: 85,
      },
      previousAssessments: [
        {
          date: "2023-07-15",
          score: 82,
          type: "Mid-Year Review",
        },
        {
          date: "2023-01-15",
          score: 78,
          type: "Annual Review",
        },
      ],
    },
    {
      id: "ASS002",
      staffId: "STAFF002",
      staffName: "Rajesh Singh",
      assessmentType: "Skills Assessment",
      assessmentDate: "2024-01-14",
      score: 78,
      maxScore: 100,
      status: "Completed",
      evaluator: "Dr. Ramesh Kumar",
      comments: "Good technical skills, needs improvement in student interaction",
      areas: ["Technical Skills", "Student Engagement", "Communication"],
      recommendations: ["Attend communication workshops", "Practice active listening"],
      detailedScores: {
        technicalSkills: 85,
        studentEngagement: 70,
        communication: 75,
        lessonPlanning: 80,
        assessmentDesign: 78,
      },
      previousAssessments: [
        {
          date: "2023-07-14",
          score: 75,
          type: "Mid-Year Review",
        },
        {
          date: "2023-01-14",
          score: 72,
          type: "Annual Review",
        },
      ],
    },
    {
      id: "ASS003",
      staffId: "STAFF003",
      staffName: "Anita Desai",
      assessmentType: "Annual Review",
      assessmentDate: "2024-01-13",
      score: 92,
      maxScore: 100,
      status: "Completed",
      evaluator: "Dr. Ramesh Kumar",
      comments: "Outstanding performance across all areas, exemplary leadership",
      areas: ["Leadership", "Innovation", "Student Success", "Team Collaboration"],
      recommendations: ["Consider promotion opportunities", "Share best practices with team"],
      detailedScores: {
        leadership: 95,
        innovation: 90,
        studentSuccess: 95,
        teamCollaboration: 90,
        professionalDevelopment: 90,
      },
      previousAssessments: [
        {
          date: "2023-07-13",
          score: 89,
          type: "Mid-Year Review",
        },
        {
          date: "2023-01-13",
          score: 87,
          type: "Annual Review",
        },
      ],
    },
  ]
  
  const assessment = assessments.find(a => a.id === id)
  if (!assessment) {
    return { success: false, error: "Assessment not found" }
  }
  
  return { success: true, data: assessment }
}
