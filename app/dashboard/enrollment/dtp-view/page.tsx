"use client"

import { Checkbox } from "@/components/ui/checkbox"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, FileDown, Eye, Download, Calendar, Edit, Trash, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

// Mock data for DTP view
const dtpData = [
  {
    id: "DTP001",
    studentId: "STU1001",
    name: "John Smith",
    course: "Computer Science",
    batch: "2023-24",
    startDate: "2023-04-10",
    endDate: "2023-08-10",
    status: "Active",
    instructor: "Dr. Robert Johnson",
    notes: "Student is performing well in practical sessions",
  },
  {
    id: "DTP002",
    studentId: "STU1002",
    name: "Sarah Johnson",
    course: "Business Administration",
    batch: "2023-24",
    startDate: "2023-04-09",
    endDate: "2023-08-09",
    status: "Active",
    instructor: "Prof. Emily Williams",
    notes: "Needs improvement in presentation skills",
  },
  {
    id: "DTP003",
    studentId: "STU1003",
    name: "Michael Brown",
    course: "Electrical Engineering",
    batch: "2023-24",
    startDate: "2023-04-08",
    endDate: "2023-08-08",
    status: "Completed",
    instructor: "Dr. James Anderson",
    notes: "Completed all modules with distinction",
  },
  {
    id: "DTP004",
    studentId: "STU1004",
    name: "Emily Davis",
    course: "Psychology",
    batch: "2023-24",
    startDate: "2023-04-07",
    endDate: "2023-08-07",
    status: "On Hold",
    instructor: "Dr. Sarah Thompson",
    notes: "On hold due to medical reasons",
  },
  {
    id: "DTP005",
    studentId: "STU1005",
    name: "David Wilson",
    course: "Mechanical Engineering",
    batch: "2023-24",
    startDate: "2023-04-06",
    endDate: "2023-08-06",
    status: "Active",
    instructor: "Prof. Michael Clark",
    notes: "Showing excellent progress in design projects",
  },
]

// Course options
const courseOptions = [
  "Computer Science",
  "Business Administration",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Psychology",
  "Civil Engineering",
  "Information Technology",
  "Data Science",
]

// Batch options
const batchOptions = ["2023-24", "2024-25", "2025-26"]

// Instructor options
const instructorOptions = [
  "Dr. Robert Johnson",
  "Prof. Emily Williams",
  "Dr. James Anderson",
  "Dr. Sarah Thompson",
  "Prof. Michael Clark",
  "Dr. Lisa Martinez",
  "Prof. David Wilson",
]

export default function DTPViewPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState(dtpData)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false)
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)
  const [selectedDTP, setSelectedDTP] = useState<any>(null)
  const [newDTP, setNewDTP] = useState({
    studentId: "",
    name: "",
    course: "",
    batch: "",
    startDate: "",
    endDate: "",
    instructor: "",
    notes: "",
  })

  const handleSearch = () => {
    const filtered = dtpData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.instructor.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredData(filtered)
  }

  const handleAddDTP = async () => {
    // API call would go here
    // Example: await fetch('/api/dtp', { method: 'POST', body: JSON.stringify(newDTP) })

    toast({
      title: "DTP Record Added",
      description: `New DTP record for ${newDTP.name} has been created successfully.`,
    })

    setIsAddDialogOpen(false)
    setNewDTP({
      studentId: "",
      name: "",
      course: "",
      batch: "",
      startDate: "",
      endDate: "",
      instructor: "",
      notes: "",
    })

    // In a real app, you would refresh the data from the API
  }

  const handleEditDTP = async () => {
    // API call would go here
    // Example: await fetch(`/api/dtp/${selectedDTP.id}`, { method: 'PUT', body: JSON.stringify(selectedDTP) })

    toast({
      title: "DTP Record Updated",
      description: `DTP record for ${selectedDTP.name} has been updated successfully.`,
    })

    setIsEditDialogOpen(false)

    // In a real app, you would refresh the data from the API
  }

  const handleDeleteDTP = async () => {
    // API call would go here
    // Example: await fetch(`/api/dtp/${selectedDTP.id}`, { method: 'DELETE' })

    toast({
      title: "DTP Record Deleted",
      description: `DTP record for ${selectedDTP.name} has been deleted successfully.`,
    })

    setIsDeleteDialogOpen(false)

    // In a real app, you would refresh the data from the API
  }

  const handleScheduleDTP = async () => {
    // API call would go here
    // Example: await fetch(`/api/dtp/schedule`, { method: 'POST', body: JSON.stringify(selectedDTP) })

    toast({
      title: "DTP Scheduled",
      description: `DTP for ${selectedDTP.name} has been scheduled successfully.`,
    })

    setIsScheduleDialogOpen(false)

    // In a real app, you would refresh the data from the API
  }

  const handleGenerateReport = async () => {
    // API call would go here
    // Example: await fetch(`/api/dtp/${selectedDTP.id}/report`, { method: 'GET' })

    toast({
      title: "Report Generated",
      description: `DTP report for ${selectedDTP.name} has been generated successfully.`,
    })

    setIsReportDialogOpen(false)

    // In a real app, you would download the report
  }

  const filterByBatch = (batch: string) => {
    if (batch === "all") {
      setFilteredData(dtpData)
    } else {
      setFilteredData(dtpData.filter((item) => item.batch === batch))
    }
  }

  const filterByStatus = (status: string) => {
    if (status === "all") {
      setFilteredData(dtpData)
    } else {
      setFilteredData(dtpData.filter((item) => item.status.toLowerCase() === status.toLowerCase()))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">DTP View</h1>
        <div className="flex gap-2">
          <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" /> Schedule DTP
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Schedule DTP</DialogTitle>
                <DialogDescription>Schedule a new DTP session for a student.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="schedule-student">Select Student</Label>
                    <Select>
                      <SelectTrigger id="schedule-student">
                        <SelectValue placeholder="Select student" />
                      </SelectTrigger>
                      <SelectContent>
                        {dtpData.map((student) => (
                          <SelectItem key={student.id} value={student.id}>
                            {student.name} ({student.studentId})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schedule-instructor">Select Instructor</Label>
                    <Select>
                      <SelectTrigger id="schedule-instructor">
                        <SelectValue placeholder="Select instructor" />
                      </SelectTrigger>
                      <SelectContent>
                        {instructorOptions.map((instructor) => (
                          <SelectItem key={instructor} value={instructor}>
                            {instructor}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="schedule-start-date">Start Date</Label>
                    <Input id="schedule-start-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schedule-end-date">End Date</Label>
                    <Input id="schedule-end-date" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schedule-notes">Notes</Label>
                  <Textarea id="schedule-notes" placeholder="Enter any additional notes" rows={3} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleScheduleDTP}>Schedule</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button>
            <FileDown className="mr-2 h-4 w-4" /> Export Report
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Filter Options</CardTitle>
          <CardDescription>Filter DTP records by various parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <Select onValueChange={filterByBatch}>
                <SelectTrigger id="batch">
                  <SelectValue placeholder="Select batch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Batches</SelectItem>
                  {batchOptions.map((batch) => (
                    <SelectItem key={batch} value={batch}>
                      {batch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select onValueChange={filterByStatus}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>DTP Records</CardTitle>
          <CardDescription>View and manage all DTP records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-4">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add DTP Record
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New DTP Record</DialogTitle>
                  <DialogDescription>
                    Enter the details for the new DTP record. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-id">Student ID</Label>
                      <Input
                        id="student-id"
                        value={newDTP.studentId}
                        onChange={(e) => setNewDTP({ ...newDTP, studentId: e.target.value })}
                        placeholder="Enter student ID"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Student Name</Label>
                      <Input
                        id="name"
                        value={newDTP.name}
                        onChange={(e) => setNewDTP({ ...newDTP, name: e.target.value })}
                        placeholder="Enter student name"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="course">Course</Label>
                      <Select onValueChange={(value) => setNewDTP({ ...newDTP, course: value })}>
                        <SelectTrigger id="course">
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                        <SelectContent>
                          {courseOptions.map((course) => (
                            <SelectItem key={course} value={course}>
                              {course}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="batch">Batch</Label>
                      <Select onValueChange={(value) => setNewDTP({ ...newDTP, batch: value })}>
                        <SelectTrigger id="batch">
                          <SelectValue placeholder="Select batch" />
                        </SelectTrigger>
                        <SelectContent>
                          {batchOptions.map((batch) => (
                            <SelectItem key={batch} value={batch}>
                              {batch}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input
                        id="start-date"
                        type="date"
                        value={newDTP.startDate}
                        onChange={(e) => setNewDTP({ ...newDTP, startDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-date">End Date</Label>
                      <Input
                        id="end-date"
                        type="date"
                        value={newDTP.endDate}
                        onChange={(e) => setNewDTP({ ...newDTP, endDate: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instructor">Instructor</Label>
                    <Select onValueChange={(value) => setNewDTP({ ...newDTP, instructor: value })}>
                      <SelectTrigger id="instructor">
                        <SelectValue placeholder="Select instructor" />
                      </SelectTrigger>
                      <SelectContent>
                        {instructorOptions.map((instructor) => (
                          <SelectItem key={instructor} value={instructor}>
                            {instructor}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      value={newDTP.notes}
                      onChange={(e) => setNewDTP({ ...newDTP, notes: e.target.value })}
                      placeholder="Enter any additional information"
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddDTP}>Save Record</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>DTP ID</TableHead>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((dtp) => (
                <TableRow key={dtp.id}>
                  <TableCell>{dtp.id}</TableCell>
                  <TableCell>{dtp.studentId}</TableCell>
                  <TableCell>{dtp.name}</TableCell>
                  <TableCell>{dtp.course}</TableCell>
                  <TableCell>{dtp.batch}</TableCell>
                  <TableCell>{dtp.startDate}</TableCell>
                  <TableCell>{dtp.endDate}</TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        dtp.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : dtp.status === "Completed"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {dtp.status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedDTP(dtp)
                          setIsViewDialogOpen(true)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedDTP(dtp)
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedDTP(dtp)
                          setIsReportDialogOpen(true)
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedDTP(dtp)
                          setIsDeleteDialogOpen(true)
                        }}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View DTP Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>DTP Record Details</DialogTitle>
            <DialogDescription>Detailed information about the DTP record.</DialogDescription>
          </DialogHeader>
          {selectedDTP && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">DTP ID</h3>
                  <p>{selectedDTP.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Student ID</h3>
                  <p>{selectedDTP.studentId}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Name</h3>
                  <p>{selectedDTP.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Course</h3>
                  <p>{selectedDTP.course}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Batch</h3>
                  <p>{selectedDTP.batch}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Instructor</h3>
                  <p>{selectedDTP.instructor}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Start Date</h3>
                  <p>{selectedDTP.startDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">End Date</h3>
                  <p>{selectedDTP.endDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      selectedDTP.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : selectedDTP.status === "Completed"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {selectedDTP.status}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                <p className="text-sm">{selectedDTP.notes}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setIsViewDialogOpen(false)
                setIsReportDialogOpen(true)
              }}
            >
              Generate Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit DTP Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit DTP Record</DialogTitle>
            <DialogDescription>Update the DTP record details. Click save when you're done.</DialogDescription>
          </DialogHeader>
          {selectedDTP && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-student-id">Student ID</Label>
                  <Input
                    id="edit-student-id"
                    value={selectedDTP.studentId}
                    onChange={(e) => setSelectedDTP({ ...selectedDTP, studentId: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Student Name</Label>
                  <Input
                    id="edit-name"
                    value={selectedDTP.name}
                    onChange={(e) => setSelectedDTP({ ...selectedDTP, name: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-course">Course</Label>
                  <Select
                    defaultValue={selectedDTP.course}
                    onValueChange={(value) => setSelectedDTP({ ...selectedDTP, course: value })}
                  >
                    <SelectTrigger id="edit-course">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courseOptions.map((course) => (
                        <SelectItem key={course} value={course}>
                          {course}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-batch">Batch</Label>
                  <Select
                    defaultValue={selectedDTP.batch}
                    onValueChange={(value) => setSelectedDTP({ ...selectedDTP, batch: value })}
                  >
                    <SelectTrigger id="edit-batch">
                      <SelectValue placeholder="Select batch" />
                    </SelectTrigger>
                    <SelectContent>
                      {batchOptions.map((batch) => (
                        <SelectItem key={batch} value={batch}>
                          {batch}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-start-date">Start Date</Label>
                  <Input
                    id="edit-start-date"
                    type="date"
                    value={selectedDTP.startDate}
                    onChange={(e) => setSelectedDTP({ ...selectedDTP, startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-end-date">End Date</Label>
                  <Input
                    id="edit-end-date"
                    type="date"
                    value={selectedDTP.endDate}
                    onChange={(e) => setSelectedDTP({ ...selectedDTP, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-instructor">Instructor</Label>
                <Select
                  defaultValue={selectedDTP.instructor}
                  onValueChange={(value) => setSelectedDTP({ ...selectedDTP, instructor: value })}
                >
                  <SelectTrigger id="edit-instructor">
                    <SelectValue placeholder="Select instructor" />
                  </SelectTrigger>
                  <SelectContent>
                    {instructorOptions.map((instructor) => (
                      <SelectItem key={instructor} value={instructor}>
                        {instructor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  defaultValue={selectedDTP.status}
                  onValueChange={(value) => setSelectedDTP({ ...selectedDTP, status: value })}
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-notes">Notes</Label>
                <Textarea
                  id="edit-notes"
                  value={selectedDTP.notes}
                  onChange={(e) => setSelectedDTP({ ...selectedDTP, notes: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditDTP}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this DTP record? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteDTP}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Report Dialog */}
      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Generate DTP Report</DialogTitle>
            <DialogDescription>Select the report options you want to include.</DialogDescription>
          </DialogHeader>
          {selectedDTP && (
            <div className="space-y-4 py-4">
              <div>
                <h3 className="text-sm font-medium">Student Information</h3>
                <p className="text-sm">
                  <span className="font-medium">Name:</span> {selectedDTP.name} ({selectedDTP.studentId})
                </p>
                <p className="text-sm">
                  <span className="font-medium">Course:</span> {selectedDTP.course}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Batch:</span> {selectedDTP.batch}
                </p>
              </div>
              <div className="space-y-2">
                <Label>Report Options</Label>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="report-attendance" defaultChecked />
                    <Label htmlFor="report-attendance">Include Attendance</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="report-performance" defaultChecked />
                    <Label htmlFor="report-performance">Include Performance Metrics</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="report-feedback" defaultChecked />
                    <Label htmlFor="report-feedback">Include Instructor Feedback</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="report-assignments" defaultChecked />
                    <Label htmlFor="report-assignments">Include Assignment Scores</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="report-format">Report Format</Label>
                <Select defaultValue="pdf">
                  <SelectTrigger id="report-format">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReportDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleGenerateReport}>Generate Report</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
