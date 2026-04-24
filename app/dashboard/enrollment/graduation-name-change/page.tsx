"use client"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, FileDown, Filter, Eye, Check, X, Edit, Trash } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

// Mock data for name change requests
const nameChangeData = [
  {
    id: "NC001",
    studentId: "STU1001",
    oldName: "John Smith",
    newName: "John A. Smith",
    reason: "Adding middle initial for official documents",
    requestDate: "2023-04-10",
    status: "Pending",
    supportingDocs: ["ID Proof", "Affidavit"],
  },
  {
    id: "NC002",
    studentId: "STU1002",
    oldName: "Sarah Johnson",
    newName: "Sarah Williams",
    reason: "Changed name after marriage",
    requestDate: "2023-04-09",
    status: "Approved",
    supportingDocs: ["ID Proof", "Marriage Certificate", "Affidavit"],
  },
  {
    id: "NC003",
    studentId: "STU1003",
    oldName: "Michael Brown",
    newName: "Michael James Brown",
    reason: "Adding middle name for graduation certificate",
    requestDate: "2023-04-08",
    status: "Pending",
    supportingDocs: ["ID Proof", "Birth Certificate"],
  },
  {
    id: "NC004",
    studentId: "STU1004",
    oldName: "Emily Davis",
    newName: "Emily Rose Davis",
    reason: "Adding middle name for consistency with other documents",
    requestDate: "2023-04-07",
    status: "Rejected",
    supportingDocs: ["ID Proof"],
  },
  {
    id: "NC005",
    studentId: "STU1005",
    oldName: "David Wilson",
    newName: "David J. Wilson",
    reason: "Adding middle initial for graduation certificate",
    requestDate: "2023-04-06",
    status: "Approved",
    supportingDocs: ["ID Proof", "Birth Certificate", "Affidavit"],
  },
]

export default function GraduationNameChangePage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState(nameChangeData)
  const [activeTab, setActiveTab] = useState("all")
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [newRequest, setNewRequest] = useState({
    studentId: "",
    oldName: "",
    newName: "",
    reason: "",
    supportingDocs: [] as File[],
  })

  const handleSearch = () => {
    const filtered = nameChangeData.filter(
      (item) =>
        item.oldName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.newName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.reason.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredData(filtered)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (value === "all") {
      setFilteredData(nameChangeData)
    } else {
      setFilteredData(nameChangeData.filter((item) => item.status.toLowerCase() === value.toLowerCase()))
    }
  }

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    // API call would go here
    // Example: await fetch('/api/name-change', { method: 'POST', body: JSON.stringify(newRequest) })

    toast({
      title: "Request Submitted",
      description: "Your name change request has been submitted successfully.",
    })

    // Reset form
    setNewRequest({
      studentId: "",
      oldName: "",
      newName: "",
      reason: "",
      supportingDocs: [],
    })

    // In a real app, you would refresh the data from the API
  }

  const handleEditRequest = async () => {
    // API call would go here
    // Example: await fetch(`/api/name-change/${selectedRequest.id}`, { method: 'PUT', body: JSON.stringify(selectedRequest) })

    toast({
      title: "Request Updated",
      description: `Name change request for ${selectedRequest.oldName} has been updated successfully.`,
    })

    setIsEditDialogOpen(false)

    // In a real app, you would refresh the data from the API
  }

  const handleDeleteRequest = async () => {
    // API call would go here
    // Example: await fetch(`/api/name-change/${selectedRequest.id}`, { method: 'DELETE' })

    toast({
      title: "Request Deleted",
      description: `Name change request for ${selectedRequest.oldName} has been deleted successfully.`,
    })

    setIsDeleteDialogOpen(false)

    // In a real app, you would refresh the data from the API
  }

  const handleApproveRequest = async () => {
    // API call would go here
    // Example: await fetch(`/api/name-change/${selectedRequest.id}/approve`, { method: 'POST' })

    toast({
      title: "Request Approved",
      description: `Name change request for ${selectedRequest.oldName} has been approved successfully.`,
    })

    setIsApproveDialogOpen(false)

    // In a real app, you would refresh the data from the API
  }

  const handleRejectRequest = async () => {
    // API call would go here
    // Example: await fetch(`/api/name-change/${selectedRequest.id}/reject`, { method: 'POST', body: JSON.stringify({ reason: selectedRequest.reason }) })

    toast({
      title: "Request Rejected",
      description: `Name change request for ${selectedRequest.oldName} has been rejected.`,
    })

    setIsRejectDialogOpen(false)

    // In a real app, you would refresh the data from the API
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Graduation Name Change Confirmation</h1>
        <Button>
          <FileDown className="mr-2 h-4 w-4" /> Export Report
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4" onValueChange={handleTabChange}>
        <div className="overflow-x-auto pb-1"><TabsList className="w-max">
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList></div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center mb-4">
          <div className="flex-1 flex items-center gap-2">
            <Input
              placeholder="Search by name, ID, reason..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 min-w-0"
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
              <CardTitle>Name Change Requests</CardTitle>
              <CardDescription>Manage graduation name change requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
              <div className="rounded-md border min-w-[700px]">
                <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Current Name</TableHead>
                    <TableHead>Requested Name</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.id}</TableCell>
                      <TableCell>{request.studentId}</TableCell>
                      <TableCell>{request.oldName}</TableCell>
                      <TableCell>{request.newName}</TableCell>
                      <TableCell className="max-w-xs truncate" title={request.reason}>
                        {request.reason}
                      </TableCell>
                      <TableCell>{request.requestDate}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            request.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : request.status === "Approved"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {request.status}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedRequest(request)
                              setIsViewDialogOpen(true)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedRequest(request)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          {request.status === "Pending" && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-green-600"
                                onClick={() => {
                                  setSelectedRequest(request)
                                  setIsApproveDialogOpen(true)
                                }}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-600"
                                onClick={() => {
                                  setSelectedRequest(request)
                                  setIsRejectDialogOpen(true)
                                }}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedRequest(request)
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
              </div>
            </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Submit New Name Change Request</CardTitle>
          <CardDescription>Fill in the details to submit a new name change request</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmitRequest}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="student-id">Student ID</Label>
                <Input
                  id="student-id"
                  placeholder="Enter student ID"
                  value={newRequest.studentId}
                  onChange={(e) => setNewRequest({ ...newRequest, studentId: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="current-name">Current Name</Label>
                <Input
                  id="current-name"
                  placeholder="Current name as per records"
                  value={newRequest.oldName}
                  onChange={(e) => setNewRequest({ ...newRequest, oldName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-name">New Name</Label>
                <Input
                  id="new-name"
                  placeholder="Requested new name"
                  value={newRequest.newName}
                  onChange={(e) => setNewRequest({ ...newRequest, newName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supporting-doc">Supporting Documents</Label>
                <Input
                  id="supporting-doc"
                  type="file"
                  multiple
                  onChange={(e) => {
                    if (e.target.files) {
                      setNewRequest({
                        ...newRequest,
                        supportingDocs: Array.from(e.target.files),
                      })
                    }
                  }}
                  required
                />
                <p className="text-xs text-gray-500">
                  Upload ID proof, affidavit, or any other supporting documents (PDF, JPG, PNG)
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Name Change</Label>
              <Textarea
                id="reason"
                placeholder="Provide detailed reason for name change request"
                rows={4}
                value={newRequest.reason}
                onChange={(e) => setNewRequest({ ...newRequest, reason: e.target.value })}
                required
              />
            </div>
            <Button type="submit">Submit Request</Button>
          </form>
        </CardContent>
      </Card>

      {/* View Request Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Name Change Request Details</DialogTitle>
            <DialogDescription>Detailed information about the name change request.</DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Request ID</h3>
                  <p>{selectedRequest.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Request Date</h3>
                  <p>{selectedRequest.requestDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Student ID</h3>
                  <p>{selectedRequest.studentId}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      selectedRequest.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : selectedRequest.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedRequest.status}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Current Name</h3>
                  <p>{selectedRequest.oldName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Requested Name</h3>
                  <p>{selectedRequest.newName}</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Reason</h3>
                <p className="text-sm">{selectedRequest.reason}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Supporting Documents</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedRequest.supportingDocs.map((doc: string) => (
                    <span
                      key={doc}
                      className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                    >
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            {selectedRequest && selectedRequest.status === "Pending" && (
              <Button
                onClick={() => {
                  setIsViewDialogOpen(false)
                  setIsApproveDialogOpen(true)
                }}
              >
                Approve Request
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Request Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Name Change Request</DialogTitle>
            <DialogDescription>Update the name change request details. Click save when you're done.</DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-student-id">Student ID</Label>
                  <Input
                    id="edit-student-id"
                    value={selectedRequest.studentId}
                    onChange={(e) => setSelectedRequest({ ...selectedRequest, studentId: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    defaultValue={selectedRequest.status}
                    onValueChange={(value) => setSelectedRequest({ ...selectedRequest, status: value })}
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
                  <Label htmlFor="edit-old-name">Current Name</Label>
                  <Input
                    id="edit-old-name"
                    value={selectedRequest.oldName}
                    onChange={(e) => setSelectedRequest({ ...selectedRequest, oldName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-new-name">Requested Name</Label>
                  <Input
                    id="edit-new-name"
                    value={selectedRequest.newName}
                    onChange={(e) => setSelectedRequest({ ...selectedRequest, newName: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-reason">Reason</Label>
                <Textarea
                  id="edit-reason"
                  value={selectedRequest.reason}
                  onChange={(e) => setSelectedRequest({ ...selectedRequest, reason: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditRequest}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this name change request? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteRequest}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approve Dialog */}
      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Approve Name Change Request</DialogTitle>
            <DialogDescription>Confirm approval of this name change request.</DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4 py-4">
              <div>
                <h3 className="text-sm font-medium">Request Information</h3>
                <p className="text-sm">
                  <span className="font-medium">Student ID:</span> {selectedRequest.studentId}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Current Name:</span> {selectedRequest.oldName}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Requested Name:</span> {selectedRequest.newName}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="approval-notes">Approval Notes</Label>
                <Textarea id="approval-notes" placeholder="Enter any notes for approval" rows={3} />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApproveRequest}>Approve Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Reject Name Change Request</DialogTitle>
            <DialogDescription>Provide a reason for rejecting this name change request.</DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4 py-4">
              <div>
                <h3 className="text-sm font-medium">Request Information</h3>
                <p className="text-sm">
                  <span className="font-medium">Student ID:</span> {selectedRequest.studentId}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Current Name:</span> {selectedRequest.oldName}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Requested Name:</span> {selectedRequest.newName}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rejection-reason">Rejection Reason</Label>
                <Textarea id="rejection-reason" placeholder="Enter reason for rejection" rows={3} required />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRejectRequest}>
              Reject Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
