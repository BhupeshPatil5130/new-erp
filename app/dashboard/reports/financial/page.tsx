"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FileDown, TrendingUp, TrendingDown, IndianRupee, Users, BookOpen, Banknote } from "lucide-react"

const monthlyData = [
  { month: "Apr 2024", revenue: 485000, expenses: 312000, profit: 173000, collections: 462000, pending: 23000 },
  { month: "May 2024", revenue: 520000, expenses: 328000, profit: 192000, collections: 498000, pending: 22000 },
  { month: "Jun 2024", revenue: 498000, expenses: 315000, profit: 183000, collections: 485000, pending: 13000 },
  { month: "Jul 2024", revenue: 512000, expenses: 320000, profit: 192000, collections: 500000, pending: 12000 },
  { month: "Aug 2024", revenue: 535000, expenses: 340000, profit: 195000, collections: 520000, pending: 15000 },
  { month: "Sep 2024", revenue: 548000, expenses: 352000, profit: 196000, collections: 530000, pending: 18000 },
  { month: "Oct 2024", revenue: 562000, expenses: 358000, profit: 204000, collections: 545000, pending: 17000 },
  { month: "Nov 2024", revenue: 578000, expenses: 370000, profit: 208000, collections: 560000, pending: 18000 },
  { month: "Dec 2024", revenue: 590000, expenses: 382000, profit: 208000, collections: 572000, pending: 18000 },
  { month: "Jan 2025", revenue: 605000, expenses: 390000, profit: 215000, collections: 588000, pending: 17000 },
  { month: "Feb 2025", revenue: 618000, expenses: 398000, profit: 220000, collections: 602000, pending: 16000 },
  { month: "Mar 2025", revenue: 632000, expenses: 405000, profit: 227000, collections: 615000, pending: 17000 },
]

const fmtINR = (n: number) =>
  "₹" + (n >= 100000 ? (n / 100000).toFixed(1) + "L" : (n / 1000).toFixed(0) + "K")

export default function FinancialSummaryPage() {
  const [year, setYear] = useState("2024-25")

  const totalRevenue = monthlyData.reduce((s, r) => s + r.revenue, 0)
  const totalExpenses = monthlyData.reduce((s, r) => s + r.expenses, 0)
  const totalProfit = monthlyData.reduce((s, r) => s + r.profit, 0)
  const totalCollections = monthlyData.reduce((s, r) => s + r.collections, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Financial Summary</h1>
          <p className="text-muted-foreground text-sm mt-1">Corporate-wide financial KPIs and P&L overview</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-25">FY 2024-25</SelectItem>
              <SelectItem value="2023-24">FY 2023-24</SelectItem>
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
          { label: "Total Revenue", value: totalRevenue, icon: IndianRupee, color: "from-blue-500 to-blue-600", trend: "+12.4%" },
          { label: "Total Expenses", value: totalExpenses, icon: Banknote, color: "from-orange-500 to-orange-600", trend: "+8.1%" },
          { label: "Net Profit", value: totalProfit, icon: TrendingUp, color: "from-green-500 to-green-600", trend: "+18.7%" },
          { label: "Collections", value: totalCollections, icon: Users, color: "from-purple-500 to-purple-600", trend: "+11.2%" },
        ].map((kpi, i) => (
          <Card key={i} className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-3 sm:p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{kpi.label}</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900 mt-1">{fmtINR(kpi.value)}</p>
                  <span className="text-xs font-medium text-green-600">{kpi.trend} YoY</span>
                </div>
                <div className={`p-2 sm:p-3 rounded-xl bg-gradient-to-r ${kpi.color} shrink-0`}>
                  <kpi.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Monthly P&L Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Monthly P&L Statement — {year}</CardTitle>
          <CardDescription>Revenue, expenses and profit breakdown per month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">Expenses</TableHead>
                  <TableHead className="text-right">Net Profit</TableHead>
                  <TableHead className="text-right">Collections</TableHead>
                  <TableHead className="text-right">Pending</TableHead>
                  <TableHead>Margin</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthlyData.map((row, i) => {
                  const margin = ((row.profit / row.revenue) * 100).toFixed(1)
                  return (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{row.month}</TableCell>
                      <TableCell className="text-right">{fmtINR(row.revenue)}</TableCell>
                      <TableCell className="text-right text-orange-600">{fmtINR(row.expenses)}</TableCell>
                      <TableCell className="text-right text-green-600 font-semibold">{fmtINR(row.profit)}</TableCell>
                      <TableCell className="text-right">{fmtINR(row.collections)}</TableCell>
                      <TableCell className="text-right text-red-500">{fmtINR(row.pending)}</TableCell>
                      <TableCell>
                        <Badge className={Number(margin) >= 35 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                          {margin}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  )
                })}
                <TableRow className="font-bold bg-gray-50">
                  <TableCell>Total</TableCell>
                  <TableCell className="text-right">{fmtINR(totalRevenue)}</TableCell>
                  <TableCell className="text-right text-orange-600">{fmtINR(totalExpenses)}</TableCell>
                  <TableCell className="text-right text-green-600">{fmtINR(totalProfit)}</TableCell>
                  <TableCell className="text-right">{fmtINR(totalCollections)}</TableCell>
                  <TableCell className="text-right text-red-500">{fmtINR(monthlyData.reduce((s,r)=>s+r.pending,0))}</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800">
                      {((totalProfit/totalRevenue)*100).toFixed(1)}%
                    </Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
