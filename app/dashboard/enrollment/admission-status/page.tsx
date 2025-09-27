"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, FileDown, Eye, BarChart } from "lucide-react"

// Mock data for admission status
const admissionData = [
  {
    id: "ADM001",
    studentId: "STU1001",
    name: "John Smith",
    course: "Computer Science",
    batch: "2023-24",
    admissionDate: "2023-04-10",
    feeStatus: "Paid",
    documentStatus: "Complete",
    enrollmentStatus: "Enrolled",
  },
  {
    id: "ADM002",
    studentId: "STU1002",
    name: "Sarah Johnson",
    course: "Business Administration",
    batch: "2023-24",
    admissionDate: "2023-04-09",
    feeStatus: "Partially Paid",
    documentStatus: "Incomplete",
    enrollmentStatus: "Provisional",
  },
  {
    id: "ADM003",
    studentId: "STU1003",
    name: "Michael Brown",
    course: "Electrical Engineering",
    batch: "2023-24",
    admissionDate: "2023-04-08",
    feeStatus: "Unpaid",
    documentStatus: "Complete",
    enrollmentStatus: "Pending",
  },
  {
    id: "ADM004",
    studentId: "STU1004",
    name: "Emily Davis",
    course: "Psychology",
    batch: "2023-24",
    admissionDate: "2023-04-07",
    feeStatus: "Paid",
    documentStatus: "Complete",
    enrollmentStatus: "Enrolled",
  },
  {
    id: "ADM005",
    studentId: "STU1005",
    name: "David Wilson",
    course: "Mechanical Engineering",
    batch: "2023-24",
    admissionDate: "2023-04-06",
    feeStatus: "Paid",
    documentStatus: "Complete",
    enrollmentStatus: "Enrolled",
  },
]

export default function AdmissionStatusPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState(admissionData)

  const handleSearch = () => {
    const filtered = admissionData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.course.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredData(filtered)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Admission Status</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart className="mr-2 h-4 w-4" /> View Analytics
          </Button>
          <Button>
            <FileDown className="mr-2 h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Filter Options</CardTitle>
          <CardDescription>Filter admission status by various parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="flex gap-2">
                <Input
                  id="search"
                  placeholder="Search by name, ID, course..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline" onClick={handleSearch}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="batch">Batch</Label>
              <Select>
                <SelectTrigger id="batch">
                  <SelectValue placeholder="Select batch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023-24">2023-24</SelectItem>
                  <SelectItem value="2022-23">2022-23</SelectItem>
                  <SelectItem value="2021-22">2021-22</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fee-status">Fee Status</Label>
              <Select>
                <SelectTrigger id="fee-status">
                  <SelectValue placeholder="Select fee status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="partially-paid">Partially Paid</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="enrollment-status">Enrollment Status</Label>
              <Select>
                <SelectTrigger id="enrollment-status">
                  <SelectValue placeholder="Select enrollment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="enrolled">Enrolled</SelectItem>
                  <SelectItem value="provisional">Provisional</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Admission Status Overview</CardTitle>
          <CardDescription>View and manage admission status for all students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Admissions</p>
                    <h3 className="text-2xl font-bold">125</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <BarChart className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Enrolled Students</p>
                    <h3 className="text-2xl font-bold">85</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <BarChart className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending Enrollments</p>
                    <h3 className="text-2xl font-bold">40</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                    <BarChart className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Admission ID</TableHead>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Admission Date</TableHead>
                <TableHead>Fee Status</TableHead>
                <TableHead>Document Status</TableHead>
                <TableHead>Enrollment Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((admission) => (
                <TableRow key={admission.id}>
                  <TableCell>{admission.id}</TableCell>
                  <TableCell>{admission.studentId}</TableCell>
                  <TableCell>{admission.name}</TableCell>
                  <TableCell>{admission.course}</TableCell>
                  <TableCell>{admission.batch}</TableCell>
                  <TableCell>{admission.admissionDate}</TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        admission.feeStatus === "Paid"
                          ? "bg-green-100 text-green-800"
                          : admission.feeStatus === "Partially Paid"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {admission.feeStatus}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        admission.documentStatus === "Complete"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {admission.documentStatus}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        admission.enrollmentStatus === "Enrolled"
                          ? "bg-green-100 text-green-800"
                          : admission.enrollmentStatus === "Provisional"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {admission.enrollmentStatus}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
