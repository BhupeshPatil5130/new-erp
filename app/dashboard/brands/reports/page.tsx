"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  FileText,
  Download,
  CalendarIcon,
  Clock,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Search,
  BarChart3,
  TrendingUp,
  Users,
  IndianRupee,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { getAllBrands } from "@/lib/api-service"

const reportTemplates = [
  {
    id: "financial-summary",
    name: "Financial Summary Report",
    description: "Comprehensive financial overview across all brands",
    category: "Financial",
    icon: IndianRupee,
    fields: ["revenue", "expenses", "profit", "growth"],
    frequency: ["monthly", "quarterly", "yearly"],
  },
  {
    id: "student-analytics",
    name: "Student Analytics Report",
    description: "Student enrollment, retention, and performance metrics",
    category: "Academic",
    icon: Users,
    fields: ["enrollment", "retention", "performance", "demographics"],
    frequency: ["weekly", "monthly", "quarterly"],
  },
  {
    id: "brand-performance",
    name: "Brand Performance Report",
    description: "Individual brand performance and comparison analysis",
    category: "Performance",
    icon: TrendingUp,
    fields: ["revenue", "students", "satisfaction", "efficiency"],
    frequency: ["monthly", "quarterly"],
  },
  {
    id: "operational-metrics",
    name: "Operational Metrics Report",
    description: "Staff performance, resource utilization, and operational efficiency",
    category: "Operations",
    icon: BarChart3,
    fields: ["staff", "resources", "efficiency", "costs"],
    frequency: ["weekly", "monthly"],
  },
]

const scheduledReports = [
  {
    id: "RPT001",
    name: "Monthly Financial Summary",
    template: "Financial Summary Report",
    frequency: "Monthly",
    nextRun: "2024-01-01T09:00:00Z",
    recipients: ["vinit.bari@suryadhilearning.com", "finance@suryadhilearning.com"],
    status: "Active",
    lastGenerated: "2023-12-01T09:00:00Z",
  },
  {
    id: "RPT002",
    name: "Weekly Student Analytics",
    template: "Student Analytics Report",
    frequency: "Weekly",
    nextRun: "2024-01-08T10:00:00Z",
    recipients: ["academic@suryadhilearning.com"],
    status: "Active",
    lastGenerated: "2023-12-25T10:00:00Z",
  },
  {
    id: "RPT003",
    name: "Quarterly Brand Performance",
    template: "Brand Performance Report",
    frequency: "Quarterly",
    nextRun: "2024-04-01T08:00:00Z",
    recipients: ["management@suryadhilearning.com"],
    status: "Paused",
    lastGenerated: "2023-10-01T08:00:00Z",
  },
]

const generatedReports = [
  {
    id: "GEN001",
    name: "December 2023 Financial Summary",
    template: "Financial Summary Report",
    generatedDate: "2023-12-31T23:59:00Z",
    generatedBy: "System",
    size: "2.4 MB",
    format: "PDF",
    status: "Completed",
    downloadUrl: "#",
  },
  {
    id: "GEN002",
    name: "Q4 2023 Brand Performance",
    template: "Brand Performance Report",
    generatedDate: "2023-12-30T15:30:00Z",
    generatedBy: "Vinit Bari",
    size: "1.8 MB",
    format: "Excel",
    status: "Completed",
    downloadUrl: "#",
  },
  {
    id: "GEN003",
    name: "Student Analytics - Week 52",
    template: "Student Analytics Report",
    generatedDate: "2023-12-29T10:00:00Z",
    generatedBy: "System",
    size: "956 KB",
    format: "PDF",
    status: "Completed",
    downloadUrl: "#",
  },
]

export default function BrandReportsPage() {
  const [loading, setLoading] = useState(false)
  const [brands, setBrands] = useState<any[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState("financial-summary")
  const [reportName, setReportName] = useState("")
  const [reportDescription, setReportDescription] = useState("")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedFields, setSelectedFields] = useState<string[]>([])
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})
  const [reportFormat, setReportFormat] = useState("pdf")
  const [recipients, setRecipients] = useState("")
  const [scheduleFrequency, setScheduleFrequency] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    loadBrands()
  }, [])

  const loadBrands = async () => {
    try {
      const response = await getAllBrands()
      if (response.success) {
        setBrands(response.data)
      }
    } catch (error) {
      toast.error("Failed to load brands")
    }
  }

  const generateReport = async () => {
    if (!selectedTemplate || !reportName) {
      toast.error("Please select a template and enter a report name")
      return
    }

    setLoading(true)
    try {
      // Simulate report generation
      await new Promise((resolve) => setTimeout(resolve, 3000))
      toast.success("Report generated successfully")
      // Reset form
      setSelectedTemplate("")
      setReportName("")
      setReportDescription("")
      setSelectedBrands([])
      setSelectedFields([])
      setDateRange({})
    } catch (error) {
      toast.error("Failed to generate report")
    } finally {
      setLoading(false)
    }
  }

  const scheduleReport = async () => {
    if (!selectedTemplate || !reportName || !scheduleFrequency) {
      toast.error("Please fill in all required fields")
      return
    }

    setLoading(true)
    try {
      // Simulate scheduling
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success("Report scheduled successfully")
    } catch (error) {
      toast.error("Failed to schedule report")
    } finally {
      setLoading(false)
    }
  }

  const downloadReport = async (reportId: string) => {
    toast.success("Report download started")
  }

  const deleteReport = async (reportId: string) => {
    toast.success("Report deleted successfully")
  }

  const toggleReportStatus = async (reportId: string) => {
    toast.success("Report status updated")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "Paused":
        return <Badge className="bg-yellow-100 text-yellow-800">Paused</Badge>
      case "Completed":
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>
      case "Failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const selectedTemplateData = reportTemplates.find((t) => t.id === selectedTemplate)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">Brand Reports</h1>
          <p className="text-gray-600 mt-1">Generate and manage comprehensive reports across all brands</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="generate" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="generate">Generate Report</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          <TabsTrigger value="history">Report History</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Report Configuration */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Report Configuration</CardTitle>
                  <CardDescription>Configure your custom report settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="reportName">Report Name *</Label>
                      <Input
                        id="reportName"
                        value={reportName}
                        onChange={(e) => setReportName(e.target.value)}
                        placeholder="Enter report name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="template">Report Template *</Label>
                      <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                          {reportTemplates.map((template) => (
                            <SelectItem key={template.id} value={template.id}>
                              {template.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={reportDescription}
                      onChange={(e) => setReportDescription(e.target.value)}
                      placeholder="Enter report description"
                      rows={3}
                    />
                  </div>

                  {/* Brand Selection */}
                  <div className="space-y-2">
                    <Label>Select Brands</Label>
                    <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border rounded-md p-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="all-brands"
                          checked={selectedBrands.length === brands.length}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedBrands(brands.map((b) => b.id))
                            } else {
                              setSelectedBrands([])
                            }
                          }}
                        />
                        <Label htmlFor="all-brands" className="text-sm font-medium">
                          All Brands
                        </Label>
                      </div>
                      {brands.map((brand) => (
                        <div key={brand.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={brand.id}
                            checked={selectedBrands.includes(brand.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedBrands([...selectedBrands, brand.id])
                              } else {
                                setSelectedBrands(selectedBrands.filter((id) => id !== brand.id))
                              }
                            }}
                          />
                          <Label htmlFor={brand.id} className="text-sm">
                            {brand.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Field Selection */}
                  {selectedTemplateData && (
                    <div className="space-y-2">
                      <Label>Report Fields</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedTemplateData.fields.map((field) => (
                          <div key={field} className="flex items-center space-x-2">
                            <Checkbox
                              id={field}
                              checked={selectedFields.includes(field)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedFields([...selectedFields, field])
                                } else {
                                  setSelectedFields(selectedFields.filter((f) => f !== field))
                                }
                              }}
                            />
                            <Label htmlFor={field} className="text-sm capitalize">
                              {field}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Date Range */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>From Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !dateRange.from && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateRange.from ? format(dateRange.from, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={dateRange.from}
                            onSelect={(date) => setDateRange({ ...dateRange, from: date })}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>To Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !dateRange.to && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateRange.to ? format(dateRange.to, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={dateRange.to}
                            onSelect={(date) => setDateRange({ ...dateRange, to: date })}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="format">Report Format</Label>
                      <Select value={reportFormat} onValueChange={setReportFormat}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="excel">Excel</SelectItem>
                          <SelectItem value="csv">CSV</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="recipients">Email Recipients</Label>
                      <Input
                        id="recipients"
                        value={recipients}
                        onChange={(e) => setRecipients(e.target.value)}
                        placeholder="email1@example.com, email2@example.com"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Schedule Options */}
              <Card>
                <CardHeader>
                  <CardTitle>Schedule Options</CardTitle>
                  <CardDescription>Set up automated report generation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Schedule Frequency</Label>
                    <Select value={scheduleFrequency} onValueChange={setScheduleFrequency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">One-time only</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={generateReport} disabled={loading} className="flex-1">
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <FileText className="h-4 w-4 mr-2" />
                          Generate Now
                        </>
                      )}
                    </Button>
                    {scheduleFrequency && (
                      <Button onClick={scheduleReport} variant="outline" disabled={loading}>
                        <Clock className="h-4 w-4 mr-2" />
                        Schedule
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Template Preview */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Template Preview</CardTitle>
                  <CardDescription>Preview of selected report template</CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedTemplateData ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-primary-100">
                          <selectedTemplateData.icon className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{selectedTemplateData.name}</h3>
                          <p className="text-sm text-gray-600">{selectedTemplateData.category}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{selectedTemplateData.description}</p>
                      <div className="space-y-2">
                        <h4 className="font-medium">Available Fields:</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedTemplateData.fields.map((field) => (
                            <Badge key={field} variant="outline" className="text-xs">
                              {field}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Supported Frequencies:</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedTemplateData.frequency.map((freq) => (
                            <Badge key={freq} variant="secondary" className="text-xs">
                              {freq}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">Select a template to see preview</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>Manage your automated report schedules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Template</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Next Run</TableHead>
                      <TableHead>Recipients</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scheduledReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>{report.template}</TableCell>
                        <TableCell>{report.frequency}</TableCell>
                        <TableCell>{format(new Date(report.nextRun), "PPP p")}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {report.recipients.length} recipient{report.recipients.length > 1 ? "s" : ""}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(report.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => toggleReportStatus(report.id)}>
                              {report.status === "Active" ? "Pause" : "Resume"}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => deleteReport(report.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Report History</CardTitle>
              <CardDescription>View and download previously generated reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Template</TableHead>
                      <TableHead>Generated Date</TableHead>
                      <TableHead>Generated By</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Format</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {generatedReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>{report.template}</TableCell>
                        <TableCell>{format(new Date(report.generatedDate), "PPP p")}</TableCell>
                        <TableCell>{report.generatedBy}</TableCell>
                        <TableCell>{report.size}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{report.format}</Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(report.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => downloadReport(report.id)}>
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => deleteReport(report.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-primary-100">
                      <template.icon className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {template.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-sm font-medium">Fields:</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {template.fields.map((field) => (
                          <Badge key={field} variant="secondary" className="text-xs">
                            {field}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Frequencies:</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {template.frequency.map((freq) => (
                          <Badge key={freq} variant="outline" className="text-xs">
                            {freq}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-4 bg-transparent"
                    variant="outline"
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
