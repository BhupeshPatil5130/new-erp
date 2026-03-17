"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { TrendingUp, Users, IndianRupee, Building2, Target, Award, Download, RefreshCw } from "lucide-react"
import { getBrandAnalytics, getAllBrands } from "@/lib/api-service"
import { toast } from "sonner"

const COLORS = ["#3b82f6", "#1e3a8a", "#84cc16", "#b91c1c", "#f59e0b", "#8b5cf6"]

export default function BrandAnalyticsPage() {
  const [loading, setLoading] = useState(true)
  const [selectedBrand, setSelectedBrand] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("6months")
  const [brands, setBrands] = useState<any[]>([])
  const [analyticsData, setAnalyticsData] = useState<any>(null)

  useEffect(() => {
    loadData()
  }, [selectedBrand, selectedPeriod])

  const loadData = async () => {
    setLoading(true)
    try {
      const brandsResponse = await getAllBrands()
      if (brandsResponse.success) {
        setBrands(brandsResponse.data)
      }

      // Load analytics data
      const analyticsResponse = await getBrandAnalytics(selectedBrand)
      if (analyticsResponse.success) {
        setAnalyticsData(analyticsResponse.data)
      }
    } catch (error) {
      toast.error("Failed to load analytics data")
    } finally {
      setLoading(false)
    }
  }

  const mockAnalyticsData = {
    overview: {
      totalRevenue: 8250000,
      revenueGrowth: 15.2,
      totalStudents: 2930,
      studentGrowth: 12.8,
      totalBrands: 4,
      activeBrands: 4,
      avgRevenuePerBrand: 2062500,
      customerSatisfaction: 4.7,
    },
    revenueByBrand: [
      { name: "Utopia Global", revenue: 3750000, students: 1250, growth: 18.5 },
      { name: "Unix Global", revenue: 1250000, students: 450, growth: 15.2 },
      { name: "Suryadhi Learning", revenue: 2100000, students: 850, growth: 22.1 },
      { name: "Utopia World", revenue: 1150000, students: 380, growth: 12.8 },
    ],
    monthlyTrends: [
      { month: "Jul", revenue: 7500000, students: 2800, enquiries: 450 },
      { month: "Aug", revenue: 7800000, students: 2850, enquiries: 520 },
      { month: "Sep", revenue: 8100000, students: 2900, enquiries: 480 },
      { month: "Oct", revenue: 8250000, students: 2930, enquiries: 610 },
      { month: "Nov", revenue: 8400000, students: 2950, enquiries: 580 },
      { month: "Dec", revenue: 8250000, students: 2930, enquiries: 650 },
    ],
    categoryDistribution: [
      { name: "Preschools", value: 2400000, percentage: 29.1, count: 2 },
      { name: "K12 Schools", value: 3750000, percentage: 45.5, count: 1 },
      { name: "Training Centers", value: 2100000, percentage: 25.4, count: 1 },
    ],
    performanceMetrics: [
      { metric: "Student Retention", value: 94.5, target: 95, status: "good" },
      { metric: "Revenue Growth", value: 15.2, target: 12, status: "excellent" },
      { metric: "Brand Satisfaction", value: 4.7, target: 4.5, status: "excellent" },
      { metric: "Market Share", value: 23.8, target: 25, status: "warning" },
      { metric: "Operational Efficiency", value: 87.3, target: 85, status: "good" },
      { metric: "Staff Satisfaction", value: 4.2, target: 4.0, status: "good" },
    ],
    topPerformingBrands: [
      {
        name: "Suryadhi Learning",
        growth: 22.1,
        revenue: 2100000,
        students: 850,
        satisfaction: 4.8,
        efficiency: 92.1,
      },
      {
        name: "Utopia Global",
        growth: 18.5,
        revenue: 3750000,
        students: 1250,
        satisfaction: 4.6,
        efficiency: 89.3,
      },
      {
        name: "Unix Global",
        growth: 15.2,
        revenue: 1250000,
        students: 450,
        satisfaction: 4.7,
        efficiency: 85.7,
      },
      {
        name: "Utopia World",
        growth: 12.8,
        revenue: 1150000,
        students: 380,
        satisfaction: 4.5,
        efficiency: 83.2,
      },
    ],
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-600 bg-green-100"
      case "good":
        return "text-blue-600 bg-blue-100"
      case "warning":
        return "text-yellow-600 bg-yellow-100"
      case "poor":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const exportAnalytics = async () => {
    toast.success("Analytics report exported successfully")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-primary-900">Brand Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive performance analysis across all brands</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedBrand} onValueChange={setSelectedBrand}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand.id} value={brand.id}>
                  {brand.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">1 Month</SelectItem>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={loadData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={exportAnalytics}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50">
          <CardContent className="p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-primary-900 mt-1">
                  ₹{(mockAnalyticsData.overview.totalRevenue / 100000).toFixed(1)}L
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm font-medium text-green-600">
                    +{mockAnalyticsData.overview.revenueGrowth}%
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600">
                <IndianRupee className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-purple-50">
          <CardContent className="p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-primary-900 mt-1">
                  {mockAnalyticsData.overview.totalStudents.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm font-medium text-green-600">
                    +{mockAnalyticsData.overview.studentGrowth}%
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-green-50">
          <CardContent className="p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Brands</p>
                <p className="text-2xl font-bold text-primary-900 mt-1">
                  {mockAnalyticsData.overview.activeBrands}/{mockAnalyticsData.overview.totalBrands}
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-sm font-medium text-green-600">100% Active</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600">
                <Building2 className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-orange-50">
          <CardContent className="p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Satisfaction</p>
                <p className="text-2xl font-bold text-primary-900 mt-1">
                  {mockAnalyticsData.overview.customerSatisfaction}/5.0
                </p>
                <div className="flex items-center mt-2">
                  <Award className="h-4 w-4 text-orange-600 mr-1" />
                  <span className="text-sm font-medium text-orange-600">Excellent</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600">
                <Target className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue by Brand */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Brand</CardTitle>
                <CardDescription>Monthly revenue comparison across all brands</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockAnalyticsData.revenueByBrand}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${(Number(value) / 100000).toFixed(1)}L`, "Revenue"]} />
                    <Bar dataKey="revenue" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Distribution</CardTitle>
                <CardDescription>Revenue breakdown by brand category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={mockAnalyticsData.categoryDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {mockAnalyticsData.categoryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`₹${(Number(value) / 100000).toFixed(1)}L`, "Revenue"]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Key Performance Indicators</CardTitle>
              <CardDescription>Track important metrics against targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockAnalyticsData.performanceMetrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{metric.metric}</span>
                      <Badge className={getStatusColor(metric.status)}>{metric.status}</Badge>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Current: {metric.value}%</span>
                      <span>Target: {metric.target}%</span>
                    </div>
                    <Progress value={(metric.value / metric.target) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>Monthly revenue and student growth trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={mockAnalyticsData.monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "revenue" ? `₹${(Number(value) / 100000).toFixed(1)}L` : value,
                      name === "revenue" ? "Revenue" : "Students",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="students"
                    stackId="2"
                    stroke="#84cc16"
                    fill="#84cc16"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Brand Performance Ranking</CardTitle>
              <CardDescription>Comprehensive performance analysis of all brands</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalyticsData.topPerformingBrands.map((brand, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary-900">{brand.name}</h3>
                        <p className="text-sm text-gray-600">{brand.students} students</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Growth</p>
                        <p className="font-semibold text-green-600">+{brand.growth}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Revenue</p>
                        <p className="font-semibold">₹{(brand.revenue / 100000).toFixed(1)}L</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Satisfaction</p>
                        <p className="font-semibold text-orange-600">{brand.satisfaction}/5</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Efficiency</p>
                        <p className="font-semibold text-blue-600">{brand.efficiency}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Brand Comparison</CardTitle>
              <CardDescription>Side-by-side comparison of key metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={mockAnalyticsData.revenueByBrand}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#3b82f6" name="Revenue (₹)" />
                  <Bar dataKey="students" fill="#84cc16" name="Students" />
                  <Bar dataKey="growth" fill="#f59e0b" name="Growth (%)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Growth Trends</CardTitle>
              <CardDescription>Historical growth patterns and projections</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={mockAnalyticsData.monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} name="Revenue" />
                  <Line type="monotone" dataKey="students" stroke="#84cc16" strokeWidth={2} name="Students" />
                  <Line type="monotone" dataKey="enquiries" stroke="#f59e0b" strokeWidth={2} name="Enquiries" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
