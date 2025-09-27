"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, FileDown, Filter, Edit, Trash, Eye, CheckCircle, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { getEnquiries, updateEnquiry, deleteEnquiry } from "@/lib/api-service"

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

// Source options
const sourceOptions = [
  "Website",
  "Referral",
  "Social Media",
  "Education Fair",
  "Google Ad",
  "Newspaper",
  "TV Ad",
  "Direct Walk-in",
]

export default function EnquiryPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [enquiries, setEnquiries] = useState<any[]>([])
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isFollowUpDialogOpen, setIsFollowUpDialogOpen] = useState(false)
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await getEnquiries()
        if (response.success) {
          setEnquiries(response.data)
          setFilteredData(response.data)
        } else {
          toast({
            title: "Error",
            description: "Failed to load enquiries",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error fetching enquiries:", error)
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchEnquiries()
  }, [toast])

  const handleSearch = () => {
    const filtered = enquiries.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone.includes(searchTerm) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredData(filtered)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)

    if (value === "all") {
      setFilteredData(enquiries)
    } else {
      const status =
        value === "new"
          ? "New"
          : value === "contacted"
            ? "Contacted"
            : value === "interested"
              ? "Interested"
              : "Enrolled"

      const filtered = enquiries.filter((item) => item.status === status)
      setFilteredData(filtered)
    }
  }

  const handleEditEnquiry = async () => {
    setLoading(true)
    try {
      const response = await updateEnquiry(selectedEnquiry.id, selectedEnquiry)

      if (response.success) {
        toast({
          title: "Enquiry Updated",
          description: `Enquiry for ${selectedEnquiry.name} has been updated successfully.`,
        })

        // Update the local state
        const updatedEnquiries = enquiries.map((item) => (item.id === selectedEnquiry.id ? selectedEnquiry : item))
        setEnquiries(updatedEnquiries)
        setFilteredData(updatedEnquiries)
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to update enquiry",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating enquiry:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
      setIsEditDialogOpen(false)
    }
  }

  const handleDeleteEnquiry = async () => {
    setLoading(true)
    try {
      const response = await deleteEnquiry(selectedEnquiry.id)

      if (response.success) {
        toast({
          title: "Enquiry Deleted",
          description: `Enquiry for ${selectedEnquiry.name} has been deleted successfully.`,
        })

        // Update the local state
        const updatedEnquiries = enquiries.filter((item) => item.id !== selectedEnquiry.id)
        setEnquiries(updatedEnquiries)
        setFilteredData(updatedEnquiries)
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to delete enquiry",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting enquiry:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
      setIsDeleteDialogOpen(false)
    }
  }

  const handleFollowUp = async () => {
    setLoading(true)
    try {
      const response = await updateEnquiry(selectedEnquiry.id, selectedEnquiry)

      if (response.success) {
        toast({
          title: "Follow-up Recorded",
          description: `Follow-up for ${selectedEnquiry.name} has been recorded successfully.`,
        })

        // Update the local state
        const updatedEnquiries = enquiries.map((item) => (item.id === selectedEnquiry.id ? selectedEnquiry : item))
        setEnquiries(updatedEnquiries)
        setFilteredData(updatedEnquiries)
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to record follow-up",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error recording follow-up:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
      setIsFollowUpDialogOpen(false)
    }
  }

  const handleConvertToAdmission = async (enquiry: any) => {
    toast({
      title: "Converting to Admission",
      description: `Enquiry for ${enquiry.name} is being converted to admission.`,
    })

    // In a real app, this would make an API call to convert the enquiry
    router.push(`/dashboard/enrollment/admission?enquiryId=${enquiry.id}`)
  }

  const handleNewEnquiry = () => {
    router.push("/dashboard/enrollment/enquiry/new")
  }

  if (loading && enquiries.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading enquiries...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Enquiry Management</h1>
        <Button onClick={handleNewEnquiry}>
          <Plus className="mr-2 h-4 w-4" /> New Enquiry
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4" onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="all">All Enquiries</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="contacted">Contacted</TabsTrigger>
          <TabsTrigger value="interested">Interested</TabsTrigger>
          <TabsTrigger value="enrolled">Enrolled</TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 flex items-center gap-2">
            <Input
              placeholder="Search by name, ID, phone or email..."
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
                  ? "All Enquiries"
                  : activeTab === "new"
                    ? "New Enquiries"
                    : activeTab === "contacted"
                      ? "Contacted Enquiries"
                      : activeTab === "interested"
                        ? "Interested Enquiries"
                        : "Enrolled Enquiries"}
              </CardTitle>
              <CardDescription>Manage all student enquiries from this panel</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-4 text-muted-foreground">
                        No enquiries found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredData.map((enquiry) => (
                      <TableRow key={enquiry.id}>
                        <TableCell>{enquiry.id}</TableCell>
                        <TableCell>{enquiry.name}</TableCell>
                        <TableCell>{enquiry.phone}</TableCell>
                        <TableCell>{enquiry.email}</TableCell>
                        <TableCell>{enquiry.course}</TableCell>
                        <TableCell>{enquiry.source}</TableCell>
                        <TableCell>{enquiry.date}</TableCell>
                        <TableCell>
                          <div
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              enquiry.status === "New"
                                ? "bg-blue-100 text-blue-800"
                                : enquiry.status === "Contacted"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : enquiry.status === "Interested"
                                    ? "bg-green-100 text-green-800"
                                    : enquiry.status === "Not Interested"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {enquiry.status}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedEnquiry(enquiry)
                                setIsViewDialogOpen(true)
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedEnquiry(enquiry)
                                setIsEditDialogOpen(true)
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedEnquiry(enquiry)
                                setIsFollowUpDialogOpen(true)
                              }}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedEnquiry(enquiry)
                                setIsDeleteDialogOpen(true)
                              }}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Enquiry Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Enquiry Details</DialogTitle>
            <DialogDescription>Detailed information about the enquiry.</DialogDescription>
          </DialogHeader>
          {selectedEnquiry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Enquiry ID</h3>
                  <p>{selectedEnquiry.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date</h3>
                  <p>{selectedEnquiry.date}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Name</h3>
                  <p>{selectedEnquiry.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                  <p>{selectedEnquiry.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p>{selectedEnquiry.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      selectedEnquiry.status === "New"
                        ? "bg-blue-100 text-blue-800"
                        : selectedEnquiry.status === "Contacted"
                          ? "bg-yellow-100 text-yellow-800"
                          : selectedEnquiry.status === "Interested"
                            ? "bg-green-100 text-green-800"
                            : selectedEnquiry.status === "Not Interested"
                              ? "bg-red-100 text-red-800"
                              : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {selectedEnquiry.status}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Course</h3>
                  <p>{selectedEnquiry.course}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Source</h3>
                  <p>{selectedEnquiry.source}</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                <p className="text-sm">{selectedEnquiry.notes}</p>
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
                handleConvertToAdmission(selectedEnquiry)
              }}
            >
              Convert to Admission
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Enquiry Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Enquiry</DialogTitle>
            <DialogDescription>Update the enquiry details. Click save when you're done.</DialogDescription>
          </DialogHeader>
          {selectedEnquiry && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input
                    id="edit-name"
                    value={selectedEnquiry.name}
                    onChange={(e) => setSelectedEnquiry({ ...selectedEnquiry, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone Number</Label>
                  <Input
                    id="edit-phone"
                    value={selectedEnquiry.phone}
                    onChange={(e) => setSelectedEnquiry({ ...selectedEnquiry, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email Address</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={selectedEnquiry.email}
                  onChange={(e) => setSelectedEnquiry({ ...selectedEnquiry, email: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-course">Interested Course</Label>
                  <Select
                    defaultValue={selectedEnquiry.course}
                    onValueChange={(value) => setSelectedEnquiry({ ...selectedEnquiry, course: value })}
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
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    defaultValue={selectedEnquiry.status}
                    onValueChange={(value) => setSelectedEnquiry({ ...selectedEnquiry, status: value })}
                  >
                    <SelectTrigger id="edit-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Contacted">Contacted</SelectItem>
                      <SelectItem value="Interested">Interested</SelectItem>
                      <SelectItem value="Not Interested">Not Interested</SelectItem>
                      <SelectItem value="Enrolled">Enrolled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-notes">Additional Notes</Label>
                <Textarea
                  id="edit-notes"
                  value={selectedEnquiry.notes}
                  onChange={(e) => setSelectedEnquiry({ ...selectedEnquiry, notes: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditEnquiry} disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this enquiry? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteEnquiry} disabled={loading}>
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Follow-up Dialog */}
      <Dialog open={isFollowUpDialogOpen} onOpenChange={setIsFollowUpDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Record Follow-up</DialogTitle>
            <DialogDescription>Record details of your follow-up with this enquiry.</DialogDescription>
          </DialogHeader>
          {selectedEnquiry && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="followup-status">Update Status</Label>
                <Select
                  defaultValue={selectedEnquiry.status}
                  onValueChange={(value) => setSelectedEnquiry({ ...selectedEnquiry, status: value })}
                >
                  <SelectTrigger id="followup-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Contacted">Contacted</SelectItem>
                    <SelectItem value="Interested">Interested</SelectItem>
                    <SelectItem value="Not Interested">Not Interested</SelectItem>
                    <SelectItem value="Enrolled">Enrolled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="followup-notes">Follow-up Notes</Label>
                <Textarea
                  id="followup-notes"
                  value={selectedEnquiry.notes}
                  onChange={(e) => setSelectedEnquiry({ ...selectedEnquiry, notes: e.target.value })}
                  placeholder="Enter details of your conversation"
                  rows={4}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFollowUpDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleFollowUp} disabled={loading}>
              {loading ? "Saving..." : "Save Follow-up"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
