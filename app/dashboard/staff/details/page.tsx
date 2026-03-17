"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, FileDown, Filter, Eye, UserPlus, Mail, Phone } from "lucide-react"
import { Edit, Trash } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for staff details
const staffData = [
  {
    id: "STF001",
    name: "John Smith",
    department: "Computer Science",
    designation: "Professor",
    email: "john@example.com",
    phone: "9876543210",
    joiningDate: "2020-06-15",
    status: "Active",
  },
  {
    id: "STF002",
    name: "Sarah Johnson",
    department: "Business Administration",
    designation: "Associate Professor",
    email: "sarah@example.com",
    phone: "8765432109",
    joiningDate: "2019-08-10",
    status: "Active",
  },
  {
    id: "STF003",
    name: "Michael Brown",
    department: "Electrical Engineering",
    designation: "Assistant Professor",
    email: "michael@example.com",
    phone: "7654321098",
    joiningDate: "2021-02-22",
    status: "Active",
  },
  {
    id: "STF004",
    name: "Emily Davis",
    department: "Psychology",
    designation: "Lecturer",
    email: "emily@example.com",
    phone: "6543210987",
    joiningDate: "2018-11-05",
    status: "On Leave",
  },
  {
    id: "STF005",
    name: "David Wilson",
    department: "Mechanical Engineering",
    designation: "Professor",
    email: "david@example.com",
    phone: "5432109876",
    joiningDate: "2017-07-18",
    status: "Active",
  },
]

export default function StaffDetailsPage() {
  const { toast } = useToast()
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState<any>(null)

  const handleViewStaff = (staff: any) => {
    setSelectedStaff(staff)
    setIsViewDialogOpen(true)
  }

  const handleEditStaff = (staff: any) => {
    setSelectedStaff(staff)
    setIsEditDialogOpen(true)
  }

  const handleDeleteStaff = (staff: any) => {
    setSelectedStaff(staff)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // In a real app, this would call an API
    toast({
      title: "Staff Record Deleted",
      description: `Staff record for ${selectedStaff.name} has been deleted successfully.`,
    })
    setIsDeleteDialogOpen(false)
  }

  const saveEditedStaff = () => {
    // In a real app, this would call an API
    toast({
      title: "Staff Record Updated",
      description: `Staff record for ${selectedStaff.name} has been updated successfully.`,
    })
    setIsEditDialogOpen(false)
  }

  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState(staffData)

  const handleSearch = () => {
    const filtered = staffData.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone.includes(searchTerm),
    )
    setFilteredData(filtered)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Staff Details</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" /> Add New Staff
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Staff</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="on-leave">On Leave</TabsTrigger>
          <TabsTrigger value="former">Former Staff</TabsTrigger>
        </TabsList>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center mb-4">
          <div className="flex-1 flex items-center gap-2">
            <Input
              placeholder="Search by name, ID, department, designation..."
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

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>All Staff Members</CardTitle>
              <CardDescription>View and manage all staff members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Joining Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell>{staff.id}</TableCell>
                      <TableCell>{staff.name}</TableCell>
                      <TableCell>{staff.department}</TableCell>
                      <TableCell>{staff.designation}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="flex items-center text-xs">
                            <Mail className="h-3 w-3 mr-1" /> {staff.email}
                          </span>
                          <span className="flex items-center text-xs mt-1">
                            <Phone className="h-3 w-3 mr-1" /> {staff.phone}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{staff.joiningDate}</TableCell>
                      <TableCell>
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            staff.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : staff.status === "On Leave"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {staff.status}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleViewStaff(staff)}>
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditStaff(staff)}>
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600"
                          onClick={() => handleDeleteStaff(staff)}
                        >
                          <Trash className="h-4 w-4 mr-1" /> Delete
                        </Button>
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

        {/* Other tabs would follow the same pattern */}
      </Tabs>

      {/* View Staff Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Staff Details</DialogTitle>
            <DialogDescription>Detailed information about the staff member.</DialogDescription>
          </DialogHeader>
          {selectedStaff && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Staff ID</h3>
                  <p>{selectedStaff.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Name</h3>
                  <p>{selectedStaff.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Department</h3>
                  <p>{selectedStaff.department}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Designation</h3>
                  <p>{selectedStaff.designation}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p>{selectedStaff.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                  <p>{selectedStaff.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Joining Date</h3>
                  <p>{selectedStaff.joiningDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      selectedStaff.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : selectedStaff.status === "On Leave"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {selectedStaff.status}
                  </div>
                </div>
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
                handleEditStaff(selectedStaff)
              }}
            >
              Edit Staff
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Staff Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Staff</DialogTitle>
            <DialogDescription>Update the staff details. Click save when you're done.</DialogDescription>
          </DialogHeader>
          {selectedStaff && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input
                    id="edit-name"
                    value={selectedStaff.name}
                    onChange={(e) => setSelectedStaff({ ...selectedStaff, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-department">Department</Label>
                  <Input
                    id="edit-department"
                    value={selectedStaff.department}
                    onChange={(e) => setSelectedStaff({ ...selectedStaff, department: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-designation">Designation</Label>
                  <Input
                    id="edit-designation"
                    value={selectedStaff.designation}
                    onChange={(e) => setSelectedStaff({ ...selectedStaff, designation: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    defaultValue={selectedStaff.status}
                    onValueChange={(value) => setSelectedStaff({ ...selectedStaff, status: value })}
                  >
                    <SelectTrigger id="edit-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="On Leave">On Leave</SelectItem>
                      <SelectItem value="Former">Former</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={selectedStaff.email}
                    onChange={(e) => setSelectedStaff({ ...selectedStaff, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input
                    id="edit-phone"
                    value={selectedStaff.phone}
                    onChange={(e) => setSelectedStaff({ ...selectedStaff, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-joining-date">Joining Date</Label>
                <Input
                  id="edit-joining-date"
                  type="date"
                  value={selectedStaff.joiningDate}
                  onChange={(e) => setSelectedStaff({ ...selectedStaff, joiningDate: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveEditedStaff}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this staff record? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
