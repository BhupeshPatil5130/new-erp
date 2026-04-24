"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FileDown } from "lucide-react"

type MetricKey = "students" | "revenue" | "enquiries" | "conversions" | "satisfaction"

const brands = [
  {
    id: "hq",
    name: "Suryadhi Learning Pvt. Ltd",
    type: "Corporate HQ",
    students: 0,
    revenue: 6820000,
    enquiries: 0,
    conversions: 0,
    satisfaction: 96,
    growth: 22.4,
    status: "Active",
  },
  {
    id: "preschool",
    name: "Suryadhi Preschool",
    type: "Preschool",
    students: 380,
    revenue: 2850000,
    enquiries: 480,
    conversions: 340,
    satisfaction: 91,
    growth: 18.2,
    status: "Active",
  },
  {
    id: "world",
    name: "Suryadhi World Preschool",
    type: "Preschool",
    students: 420,
    revenue: 3120000,
    enquiries: 520,
    conversions: 378,
    satisfaction: 89,
    growth: 14.8,
    status: "Active",
  },
  {
    id: "global",
    name: "Suryadhi Global School",
    type: "K12 School",
    students: 698,
    revenue: 5250000,
    enquiries: 650,
    conversions: 520,
    satisfaction: 93,
    growth: 21.6,
    status: "Active",
  },
]

const metricLabels: Record<MetricKey, string> = {
  students: "Students",
  revenue: "Revenue (₹)",
  enquiries: "Enquiries",
  conversions: "Admissions",
  satisfaction: "Satisfaction %",
}

const fmtVal = (key: MetricKey, val: number) => {
  if (key === "revenue") return "₹" + (val >= 100000 ? (val / 100000).toFixed(2) + "L" : val.toLocaleString())
  if (key === "satisfaction") return val + "%"
  return val.toString()
}

export default function BrandComparisonPage() {
  const [metric, setMetric] = useState<MetricKey>("students")
  const [view, setView] = useState("table")

  const sorted = [...brands].sort((a, b) => b[metric] - a[metric])
  const maxVal = Math.max(...brands.map((b) => b[metric]))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Brand Comparison</h1>
          <p className="text-muted-foreground text-sm mt-1">Compare performance metrics across Suryadhi brands</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={metric} onValueChange={(v) => setMetric(v as MetricKey)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select metric" />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(metricLabels) as MetricKey[]).map((k) => (
                <SelectItem key={k} value={k}>{metricLabels[k]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      {/* Bar Chart Visual */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>{metricLabels[metric]} — Brand Comparison</CardTitle>
          <CardDescription>Visual comparison across all Suryadhi institutions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sorted.map((brand, i) => {
              const pct = maxVal > 0 ? (brand[metric] / maxVal) * 100 : 0
              const colors = ["bg-blue-500", "bg-purple-500", "bg-green-500", "bg-orange-500"]
              return (
                <div key={brand.id} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium truncate max-w-[60%]">{brand.name}</span>
                    <span className="font-bold text-gray-700">{fmtVal(metric, brand[metric])}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div
                      className={`${colors[i % colors.length]} h-3 rounded-full transition-all duration-700`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Full Comparison Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Full Metrics Breakdown</CardTitle>
          <CardDescription>All KPIs side-by-side for each brand</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Brand</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Students</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">Enquiries</TableHead>
                  <TableHead className="text-right">Admissions</TableHead>
                  <TableHead className="text-right">Conv. %</TableHead>
                  <TableHead className="text-right">CSAT</TableHead>
                  <TableHead className="text-right">Growth</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {brands.map((b) => {
                  const conv = b.enquiries > 0 ? ((b.conversions / b.enquiries) * 100).toFixed(0) : "—"
                  return (
                    <TableRow key={b.id}>
                      <TableCell className="font-semibold">{b.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">{b.type}</Badge>
                      </TableCell>
                      <TableCell className="text-right">{b.students || "—"}</TableCell>
                      <TableCell className="text-right text-green-700 font-medium">
                        {"₹" + (b.revenue / 100000).toFixed(2) + "L"}
                      </TableCell>
                      <TableCell className="text-right">{b.enquiries || "—"}</TableCell>
                      <TableCell className="text-right">{b.conversions || "—"}</TableCell>
                      <TableCell className="text-right">
                        {b.enquiries > 0 ? (
                          <Badge className={Number(conv) >= 70 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                            {conv}%
                          </Badge>
                        ) : "—"}
                      </TableCell>
                      <TableCell className="text-right font-medium">{b.satisfaction}%</TableCell>
                      <TableCell className="text-right text-blue-600 font-semibold">+{b.growth}%</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">{b.status}</Badge>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Winner Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {([
          { label: "Most Students", brand: brands.reduce((a,b) => b.students > a.students ? b : a) },
          { label: "Highest Revenue", brand: brands.reduce((a,b) => b.revenue > a.revenue ? b : a) },
          { label: "Best CSAT", brand: brands.reduce((a,b) => b.satisfaction > a.satisfaction ? b : a) },
          { label: "Fastest Growth", brand: brands.reduce((a,b) => b.growth > a.growth ? b : a) },
        ] as Array<{label: string; brand: typeof brands[0]}>).map((item, i) => (
          <Card key={i} className="border-0 shadow text-center">
            <CardContent className="pt-5 pb-4">
              <div className="text-2xl mb-1">🏆</div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{item.label}</p>
              <p className="text-sm font-bold text-gray-900 mt-1 leading-tight">{item.brand.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
