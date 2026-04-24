"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FileDown, TrendingUp, Users, BookOpen, Award } from "lucide-react"

const growthData = [
  { period: "Q1 FY23-24", students: 980,  revenue: 1450000, enquiries: 320, conversions: 198, satisfaction: 86 },
  { period: "Q2 FY23-24", students: 1045, revenue: 1520000, enquiries: 345, conversions: 212, satisfaction: 87 },
  { period: "Q3 FY23-24", students: 1112, revenue: 1610000, enquiries: 372, conversions: 228, satisfaction: 88 },
  { period: "Q4 FY23-24", students: 1198, revenue: 1720000, enquiries: 410, conversions: 252, satisfaction: 89 },
  { period: "Q1 FY24-25", students: 1265, revenue: 1845000, enquiries: 448, conversions: 278, satisfaction: 90 },
  { period: "Q2 FY24-25", students: 1345, revenue: 1970000, enquiries: 492, conversions: 308, satisfaction: 91 },
  { period: "Q3 FY24-25", students: 1410, revenue: 2105000, enquiries: 530, conversions: 334, satisfaction: 92 },
  { period: "Q4 FY24-25", students: 1498, revenue: 2260000, enquiries: 578, conversions: 366, satisfaction: 93 },
]

const milestones = [
  { date: "Apr 2023", title: "Launched Suryadhi ERP Platform", impact: "Digitized all enrollment workflows" },
  { date: "Jul 2023", title: "1,000 Student Milestone", impact: "Reached 1,000 active enrolled students" },
  { date: "Oct 2023", title: "Suryadhi Preschool Network Expansion", impact: "Added 3 new preschool branches" },
  { date: "Jan 2024", title: "Online Assessment Module Launch", impact: "100% digital exam infrastructure" },
  { date: "Apr 2024", title: "₹1.8Cr Quarterly Revenue", impact: "Highest single quarter revenue" },
  { date: "Jan 2025", title: "1,400+ Student Base", impact: "Year-over-year 44% student growth" },
]

const fmtINR = (n: number) => "₹" + (n >= 100000 ? (n / 100000).toFixed(2) + "L" : n.toLocaleString())

export default function GrowthAnalyticsPage() {
  const [view, setView] = useState("quarterly")

  const latestQ = growthData[growthData.length - 1]
  const firstQ = growthData[0]
  const studentGrowth = (((latestQ.students - firstQ.students) / firstQ.students) * 100).toFixed(1)
  const revenueGrowth = (((latestQ.revenue - firstQ.revenue) / firstQ.revenue) * 100).toFixed(1)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Growth Analytics</h1>
          <p className="text-muted-foreground text-sm mt-1">Track Suryadhi's growth trends and projections</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={view} onValueChange={setView}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="annual">Annual</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {[
          { label: "Total Students", value: `${latestQ.students}+`, icon: Users, color: "from-blue-500 to-blue-600", sub: `+${studentGrowth}% since launch` },
          { label: "Monthly Revenue", value: fmtINR(latestQ.revenue / 3), icon: TrendingUp, color: "from-green-500 to-green-600", sub: `+${revenueGrowth}% since launch` },
          { label: "Enquiry Rate", value: `${latestQ.enquiries}/qtr`, icon: BookOpen, color: "from-purple-500 to-purple-600", sub: "Avg intake per quarter" },
          { label: "Satisfaction", value: `${latestQ.satisfaction}%`, icon: Award, color: "from-orange-500 to-orange-600", sub: "Parent & student CSAT" },
        ].map((kpi, i) => (
          <Card key={i} className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-3 sm:p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{kpi.label}</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-1 truncate">{kpi.value}</p>
                  <span className="text-xs text-green-600 font-medium">{kpi.sub}</span>
                </div>
                <div className={`p-2 sm:p-3 rounded-xl bg-gradient-to-r ${kpi.color} shrink-0`}>
                  <kpi.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quarterly Growth Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Quarterly Growth Metrics</CardTitle>
          <CardDescription>Students, revenue, enquiries and conversion tracking across all quarters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Period</TableHead>
                  <TableHead className="text-right">Students</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">Enquiries</TableHead>
                  <TableHead className="text-right">Admissions</TableHead>
                  <TableHead className="text-right">Conv. Rate</TableHead>
                  <TableHead>Satisfaction</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {growthData.map((row, i) => {
                  const prev = i > 0 ? growthData[i - 1] : null
                  const sGrowth = prev ? (((row.students - prev.students) / prev.students) * 100).toFixed(1) : null
                  const convRate = ((row.conversions / row.enquiries) * 100).toFixed(0)
                  return (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{row.period}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {row.students}
                          {sGrowth && (
                            <span className="text-xs text-green-600">+{sGrowth}%</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{fmtINR(row.revenue)}</TableCell>
                      <TableCell className="text-right">{row.enquiries}</TableCell>
                      <TableCell className="text-right text-green-600 font-semibold">{row.conversions}</TableCell>
                      <TableCell className="text-right">
                        <Badge className={Number(convRate) >= 60 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                          {convRate}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-1.5 w-16">
                            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${row.satisfaction}%` }} />
                          </div>
                          <span className="text-xs font-medium">{row.satisfaction}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Milestones */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Key Milestones</CardTitle>
          <CardDescription>Major achievements in Suryadhi's growth journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {milestones.map((m, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="shrink-0 w-24 text-xs font-semibold text-blue-600 pt-1">{m.date}</div>
                <div className="flex-1 border-l-2 border-blue-200 pl-4 pb-4">
                  <p className="font-semibold text-gray-900 text-sm">{m.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{m.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
