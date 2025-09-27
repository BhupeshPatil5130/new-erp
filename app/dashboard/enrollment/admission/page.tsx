"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, FileDown, Filter, Eye, Download, UserPlus, Edit, Trash, CheckCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data for admission list
const admissionData = [
  {
    id: "ADM001",
    studentId: "STU1001",
    name: "John Smith",
    phone: "9876543210",
    email: "john@example.com",
    course: "Computer Science",
    batch: "2023-24",
    date: "2023-04-10",
    status: "Pending",
    feeStatus: "Pending",
    documents: ["ID Proof", "Previous Marksheet"],
    notes: "Waiting for fee payment",
  },
  {
    id: "ADM002",
    studentId: "STU1002",
    name: "Sarah Johnson",
    phone: "8765432109",
    email: "sarah@example.com",
    course: "Business Administration",
    batch: "2023-24",
    date: "2023-04-09",
    status: "Approved",
    feeStatus: "Paid",
    documents: ["ID Proof", "Previous Marksheet", "Address Proof", "Photographs"],
    notes: "All documents verified",
  },
  {
    id: "ADM003",
    studentId: "STU1003",
    name: "Michael Brown",
    phone: "7654321098",
    email: "michael@example.com",
    course: "Electrical Engineering",
    batch: "2023-24",
    date: "2023-04-08",
    status: "Approved",
    feeStatus: "Partially Paid",
    documents: ["ID Proof", "Previous Marksheet", "Address Proof"],
    notes: "Remaining fee to be paid by next month",
  },
  {
    id: "ADM004",
    studentId: "STU1004",
    name: "Emily Davis",
    phone: "6543210987",
    email: "emily@example.com",
    course: "Psychology",
    batch: "2023-24",
    date: "2023-04-07",
    status: "Rejected",
    feeStatus: "Refunded",
    documents: ["ID Proof"],
    notes: "Insufficient qualifications",
  },
  {
    id: "ADM005",
    studentId: "STU1005",
    name: "David Wilson",
    phone: "5432109876",
    email: "david@example.com",
    course: "Mechanical Engineering",
    batch: "2023-24",
    date: "2023-04-06",
    status: "Pending",
    feeStatus: "Pending",
    documents: ["ID Proof", "Previous Marksheet", "Address Proof"],
    notes: "Interview scheduled for next week",
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

// Required documents
const requiredDocuments = [
  "ID Proof",
  "Address Proof",
  "Previous Marksheet",
  "Transfer Certificate",
  "Character Certificate",
  "Photographs",
  "Medical Certificate",
]

export default function AdmissionPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState(admissionData)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDocumentsDialogOpen, setIsDocumentsDialogOpen] = useState(false)
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false)
  const [selectedAdmission, setSelectedAdmission] = useState<any>(null)
  const [newAdmission, setNewAdmission] = useState({
    name: "",
    phone: "",
    email: "",
    course: "",
    batch: "",
    notes: "",
    documents: [] as string[],
  })
  const [activeTab, setActiveTab] = useState("all")

  const handleSearch = () => {
    const filtered = admissionData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone.includes(searchTerm) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.course.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredData(filtered)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (value === "all") {
      setFilteredData(admissionData)
    } else {
      setFilteredData(admissionData.filter((item) => item.status.toLowerCase() === value.toLowerCase()))
    }
  }

  const handleAddAdmission = async () => {
    // API call would go here
    // Example: await fetch('/api/admissions', { method: 'POST', body: JSON.stringify(newAdmission) })

    toast({
      title: "Admission Added",
      description: `New admission for ${newAdmission.name} has been created successfully.`,
    })

    setIsAddDialogOpen(false)
    setNewAdmission({
      name: "",
      phone: "",
      email: "",
      course: "",
      batch: "",
      notes: "",
      documents: [],
    })

    // In a real app, you would refresh the data from the API
  }

  const handleEditAdmission = async () => {
    // API call would go here
    // Example: await fetch(`/api/admissions/${selectedAdmission.id}`, { method: 'PUT', body: JSON.stringify(selectedAdmission) })

    toast({
      title: "Admission Updated",
      description: `Admission for ${selectedAdmission.name} has been updated successfully.`,
    })

    setIsEditDialogOpen(false)

    // In a real app, you would refresh the data from the API
  }

  const handleDeleteAdmission = async () => {
    // API call would go here
    // Example: await fetch(`/api/admissions/${selectedAdmission.id}`, { method: 'DELETE' })

    toast({
      title: "Admission Deleted",
      description: `Admission for ${selectedAdmission.name} has been deleted successfully.`,
    })

    setIsDeleteDialogOpen(false)

    // In a real app, you would refresh the data from the API
  }

  const handleApproveAdmission = async () => {
    // API call would go here
    // Example: await fetch(`/api/admissions/${selectedAdmission.id}/approve`, { method: 'POST' })

    toast({
      title: "Admission Approved",
      description: `Admission for ${selectedAdmission.name} has been approved successfully.`,
    })

    setIsApproveDialogOpen(false)

    // In a real app, you would refresh the data from the API
  }

  const handleDocumentUpload = async () => {
    // API call would go here
    // Example: await fetch(`/api/admissions/${selectedAdmission.id}/documents`, { method: 'POST', body: JSON.stringify({ documents: selectedAdmission.documents }) })

    toast({
      title: "Documents Updated",
      description: `Documents for ${selectedAdmission.name} have been updated successfully.`,
    })

    setIsDocumentsDialogOpen(false)

    // In a real app, you would refresh the data from the API
  }

  const toggleDocument = (document: string) => {
    if (selectedAdmission) {
      const documents = [...selectedAdmission.documents]
      if (documents.includes(document)) {
        const index = documents.indexOf(document)
        documents.splice(index, 1)
      } else {
        documents.push(document)
      }
      setSelectedAdmission({ ...selectedAdmission, documents })
    }
  }

  const toggleNewDocument = (document: string) => {
    const documents = [...newAdmission.documents]
    if (documents.includes(document)) {
      const index = documents.indexOf(document)
      documents.splice(index, 1)
    } else {
      documents.push(document)
    }
    setNewAdmission({ ...newAdmission, documents })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Admission Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" /> New Admission
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Admission</DialogTitle>
              <DialogDescription>
                Enter the details of the new admission. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newAdmission.name}
                    onChange={(e) => setNewAdmission({ ...newAdmission, name: e.target.value })}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={newAdmission.phone}
                    onChange={(e) => setNewAdmission({ ...newAdmission, phone: e.target.value })}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={newAdmission.email}
                  onChange={(e) => setNewAdmission({ ...newAdmission, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Select onValueChange={(value) => setNewAdmission({ ...newAdmission, course: value })}>
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
                  <Select onValueChange={(value) => setNewAdmission({ ...newAdmission, batch: value })}>
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
              <div className="space-y-2">
                <Label>Required Documents</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {requiredDocuments.map((document) => (
                    <div key={document} className="flex items-center space-x-2">
                      <Checkbox
                        id={`document-${document}`}
                        checked={newAdmission.documents.includes(document)}
                        onCheckedChange={() => toggleNewDocument(document)}
                      />
                      <Label htmlFor={`document-${document}`}>{document}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={newAdmission.notes}
                  onChange={(e) => setNewAdmission({ ...newAdmission, notes: e.target.value })}
                  placeholder="Enter any additional information"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddAdmission}>Save Admission</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="space-y-4" onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="all">All Admissions</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 flex items-center gap-2">
            <Input
              placeholder="Search by name, ID, phone, email or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
            <Button variant="outline" onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" /> Search
            </Button>
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
          <Button variant="outline">
            <FileDown className="h-4 w-4 mr-2" /> Export
          </Button>
        </div>

        <TabsContent value={activeTab} className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>
                {activeTab === "all"
                  ? "All Admissions"
                  : activeTab === "pending"
                    ? "Pending Admissions"
                    : activeTab === "approved"
                      ? "Approved Admissions"
                      : "Rejected Admissions"}
              </CardTitle>
              <CardDescription>Manage all student admissions from this panel</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((admission) => (
                    <TableRow key={admission.id}>
                      <TableCell>{admission.id}</TableCell>
                      <TableCell>{admission.studentId}</TableCell>
                      <TableCell>{admission.name}</TableCell>
                      <TableCell>{admission.phone}</TableCell>
                      <TableCell>{admission.email}</TableCell>
                      <TableCell>{admission.course}</TableCell>
                      <TableCell>{admission.batch}</TableCell>
                      <TableCell>{admission.date}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            admission.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : admission.status === "Approved"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {admission.status}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedAdmission(admission)
                              setIsViewDialogOpen(true)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedAdmission(admission)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedAdmission(admission)
                              setIsDocumentsDialogOpen(true)
                            }}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          {admission.status === "Pending" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedAdmission(admission)
                                setIsApproveDialogOpen(true)
                              }}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedAdmission(admission)
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
        </TabsContent>
      </Tabs>

      {/* View Admission Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Admission Details</DialogTitle>
            <DialogDescription>Detailed information about the admission.</DialogDescription>
          </DialogHeader>
          {selectedAdmission && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Admission ID</h3>
                  <p>{selectedAdmission.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Student ID</h3>
                  <p>{selectedAdmission.studentId}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Name</h3>
                  <p>{selectedAdmission.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                  <p>{selectedAdmission.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p>{selectedAdmission.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Course</h3>
                  <p>{selectedAdmission.course}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Batch</h3>
                  <p>{selectedAdmission.batch}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date</h3>
                  <p>{selectedAdmission.date}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      selectedAdmission.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : selectedAdmission.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedAdmission.status}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Fee Status</h3>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      selectedAdmission.feeStatus === "Paid"
                        ? "bg-green-100 text-green-800"
                        : selectedAdmission.feeStatus === "Partially Paid"
                          ? "bg-yellow-100 text-yellow-800"
                          : selectedAdmission.feeStatus === "Refunded"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedAdmission.feeStatus}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Documents Submitted</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedAdmission.documents.map((doc: string) => (
                    <span
                      key={doc}
                      className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                    >
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                <p className="text-sm">{selectedAdmission.notes}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            {selectedAdmission && selectedAdmission.status === "Pending" && (
              <Button
                onClick={() => {
                  setIsViewDialogOpen(false)
                  setIsApproveDialogOpen(true)
                }}
              >
                Approve Admission
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Admission Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Admission</DialogTitle>
            <DialogDescription>Update the admission details. Click save when you're done.</DialogDescription>
          </DialogHeader>
          {selectedAdmission && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input
                    id="edit-name"
                    value={selectedAdmission.name}
                    onChange={(e) => setSelectedAdmission({ ...selectedAdmission, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone Number</Label>
                  <Input
                    id="edit-phone"
                    value={selectedAdmission.phone}
                    onChange={(e) => setSelectedAdmission({ ...selectedAdmission, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email Address</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={selectedAdmission.email}
                  onChange={(e) => setSelectedAdmission({ ...selectedAdmission, email: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-course">Course</Label>
                  <Select
                    defaultValue={selectedAdmission.course}
                    onValueChange={(value) => setSelectedAdmission({ ...selectedAdmission, course: value })}
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
                    defaultValue={selectedAdmission.batch}
                    onValueChange={(value) => setSelectedAdmission({ ...selectedAdmission, batch: value })}
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
                  <Label htmlFor="edit-status">Admission Status</Label>
                  <Select
                    defaultValue={selectedAdmission.status}
                    onValueChange={(value) => setSelectedAdmission({ ...selectedAdmission, status: value })}
                  >
                    <SelectTrigger id="edit-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-fee-status">Fee Status</Label>
                  <Select
                    defaultValue={selectedAdmission.feeStatus}
                    onValueChange={(value) => setSelectedAdmission({ ...selectedAdmission, feeStatus: value })}
                  >
                    <SelectTrigger id="edit-fee-status">
                      <SelectValue placeholder="Select fee status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Partially Paid">Partially Paid</SelectItem>
                      <SelectItem value="Paid">Paid</SelectItem>
                      <SelectItem value="Refunded">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-notes">Additional Notes</Label>
                <Textarea
                  id="edit-notes"
                  value={selectedAdmission.notes}
                  onChange={(e) => setSelectedAdmission({ ...selectedAdmission, notes: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditAdmission}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this admission? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAdmission}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Documents Dialog */}
      <Dialog open={isDocumentsDialogOpen} onOpenChange={setIsDocumentsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Manage Documents</DialogTitle>
            <DialogDescription>Update the documents submitted for this admission.</DialogDescription>
          </DialogHeader>
          {selectedAdmission && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Required Documents</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {requiredDocuments.map((document) => (
                    <div key={document} className="flex items-center space-x-2">
                      <Checkbox
                        id={`doc-${document}`}
                        checked={selectedAdmission.documents.includes(document)}
                        onCheckedChange={() => toggleDocument(document)}
                      />
                      <Label htmlFor={`doc-${document}`}>{document}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="doc-notes">Document Notes</Label>
                <Textarea
                  id="doc-notes"
                  value={selectedAdmission.notes}
                  onChange={(e) => setSelectedAdmission({ ...selectedAdmission, notes: e.target.value })}
                  placeholder="Enter any notes about the documents"
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDocumentsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDocumentUpload}>Save Documents</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approve Dialog */}
      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Approve Admission</DialogTitle>
            <DialogDescription>Confirm approval of this admission application.</DialogDescription>
          </DialogHeader>
          {selectedAdmission && (
            <div className="space-y-4 py-4">
              <div>
                <h3 className="text-sm font-medium">Student Information</h3>
                <p className="text-sm">
                  <span className="font-medium">Name:</span> {selectedAdmission.name}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Course:</span> {selectedAdmission.course}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Batch:</span> {selectedAdmission.batch}
                </p>
              </div>
              <div className="space-y-2">
                <Label>Document Verification</Label>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  {requiredDocuments.map((document) => (
                    <div key={document} className="flex items-center space-x-2">
                      <Checkbox
                        id={`verify-${document}`}
                        checked={selectedAdmission.documents.includes(document)}
                        disabled={!selectedAdmission.documents.includes(document)}
                      />
                      <Label
                        htmlFor={`verify-${document}`}
                        className={!selectedAdmission.documents.includes(document) ? "text-gray-400" : ""}
                      >
                        {document} {!selectedAdmission.documents.includes(document) && <span>(Not Submitted)</span>}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="approval-notes">Approval Notes</Label>
                <Textarea
                  id="approval-notes"
                  value={selectedAdmission.notes}
                  onChange={(e) => setSelectedAdmission({ ...selectedAdmission, notes: e.target.value })}
                  placeholder="Enter any notes for approval"
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApproveAdmission}>Approve Admission</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
