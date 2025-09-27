"use client"

import { useState } from "react"
import { ModuleShell } from "@/components/module-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { 
  Building2, 
  Users, 
  Bed, 
  Wifi, 
  Car, 
  Utensils, 
  Shield, 
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye
} from "lucide-react"

// Mock data for hostel facilities
const hostelFacilities = [
  {
    id: 1,
    name: "Suryadhi Boys Hostel",
    type: "Boys",
    capacity: 200,
    occupied: 150,
    location: "Block A, Ground Floor",
    amenities: ["WiFi", "Cafeteria", "Parking", "Security"],
    status: "Active",
    monthlyRent: 15000,
    contact: "+91 9876543210"
  },
  {
    id: 2,
    name: "Suryadhi Girls Hostel",
    type: "Girls",
    capacity: 150,
    occupied: 120,
    location: "Block B, First Floor",
    amenities: ["WiFi", "Cafeteria", "Security", "Laundry"],
    status: "Active",
    monthlyRent: 12000,
    contact: "+91 9876543211"
  },
  {
    id: 3,
    name: "Premium Hostel",
    type: "Mixed",
    capacity: 100,
    occupied: 85,
    location: "Block C, Second Floor",
    amenities: ["WiFi", "Cafeteria", "Parking", "Security", "Gym", "Study Room"],
    status: "Active",
    monthlyRent: 20000,
    contact: "+91 9876543212"
  }
]

const residents = [
  {
    id: 1,
    name: "Rajesh Kumar",
    studentId: "SL2024001",
    room: "A-101",
    hostel: "Suryadhi Boys Hostel",
    checkIn: "2024-01-15",
    status: "Active",
    phone: "+91 9876543210",
    emergencyContact: "+91 9876543211"
  },
  {
    id: 2,
    name: "Priya Sharma",
    studentId: "SL2024002",
    room: "B-201",
    hostel: "Suryadhi Girls Hostel",
    checkIn: "2024-01-20",
    status: "Active",
    phone: "+91 9876543212",
    emergencyContact: "+91 9876543213"
  }
]

export default function HostelPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [isAddHostelOpen, setIsAddHostelOpen] = useState(false)
  const [isAddResidentOpen, setIsAddResidentOpen] = useState(false)

  const filteredFacilities = hostelFacilities.filter(facility => {
    const matchesSearch = facility.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || facility.type.toLowerCase() === selectedType
    return matchesSearch && matchesType
  })

  const kpis = [
    { label: "Total Hostels", value: hostelFacilities.length },
    { label: "Total Capacity", value: hostelFacilities.reduce((sum, h) => sum + h.capacity, 0) },
    { label: "Occupied Rooms", value: hostelFacilities.reduce((sum, h) => sum + h.occupied, 0) },
    { label: "Available Rooms", value: hostelFacilities.reduce((sum, h) => sum + (h.capacity - h.occupied), 0) }
  ]

  return (
    <ModuleShell
      title="Hostel Facility Management"
      description="Manage hostel facilities, residents, and amenities"
      icon={Building2}
      kpis={kpis}
      toolbar={
        <div className="flex gap-2">
          <Dialog open={isAddHostelOpen} onOpenChange={setIsAddHostelOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Hostel
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Hostel Facility</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hostelName">Hostel Name</Label>
                    <Input id="hostelName" placeholder="Enter hostel name" />
                  </div>
                  <div>
                    <Label htmlFor="hostelType">Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="boys">Boys</SelectItem>
                        <SelectItem value="girls">Girls</SelectItem>
                        <SelectItem value="mixed">Mixed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input id="capacity" type="number" placeholder="Enter capacity" />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Enter location" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rent">Monthly Rent (₹)</Label>
                    <Input id="rent" type="number" placeholder="Enter monthly rent" />
                  </div>
                  <div>
                    <Label htmlFor="contact">Contact Number</Label>
                    <Input id="contact" placeholder="Enter contact number" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="amenities">Amenities</Label>
                  <Textarea id="amenities" placeholder="Enter amenities (comma separated)" />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddHostelOpen(false)}>
                    Cancel
                  </Button>
                  <Button>Add Hostel</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={isAddResidentOpen} onOpenChange={setIsAddResidentOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Add Resident
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Resident</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="residentName">Resident Name</Label>
                    <Input id="residentName" placeholder="Enter resident name" />
                  </div>
                  <div>
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input id="studentId" placeholder="Enter student ID" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hostel">Select Hostel</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select hostel" />
                      </SelectTrigger>
                      <SelectContent>
                        {hostelFacilities.map(hostel => (
                          <SelectItem key={hostel.id} value={hostel.id.toString()}>
                            {hostel.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="room">Room Number</Label>
                    <Input id="room" placeholder="Enter room number" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter phone number" />
                  </div>
                  <div>
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input id="emergencyContact" placeholder="Enter emergency contact" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddResidentOpen(false)}>
                    Cancel
                  </Button>
                  <Button>Add Resident</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      }
    >
      <Tabs defaultValue="facilities" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="facilities">Hostel Facilities</TabsTrigger>
          <TabsTrigger value="residents">Residents</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="facilities" className="space-y-4">
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search hostels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="boys">Boys</SelectItem>
                <SelectItem value="girls">Girls</SelectItem>
                <SelectItem value="mixed">Mixed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {filteredFacilities.map((facility) => (
              <Card key={facility.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {facility.name}
                        <Badge variant={facility.status === "Active" ? "default" : "secondary"}>
                          {facility.status}
                        </Badge>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{facility.location}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{facility.capacity}</div>
                      <div className="text-sm text-muted-foreground">Total Capacity</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{facility.occupied}</div>
                      <div className="text-sm text-muted-foreground">Occupied</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{facility.capacity - facility.occupied}</div>
                      <div className="text-sm text-muted-foreground">Available</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">₹{facility.monthlyRent.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Monthly Rent</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {facility.amenities.map((amenity, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Contact: {facility.contact}</span>
                    <span>Type: {facility.type}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="residents" className="space-y-4">
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search residents..."
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="grid gap-4">
            {residents.map((resident) => (
              <Card key={resident.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{resident.name}</h3>
                        <p className="text-sm text-muted-foreground">ID: {resident.studentId}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="flex items-center gap-1">
                            <Bed className="h-4 w-4" />
                            Room: {resident.room}
                          </span>
                          <span className="flex items-center gap-1">
                            <Building2 className="h-4 w-4" />
                            {resident.hostel}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={resident.status === "Active" ? "default" : "secondary"}>
                        {resident.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Check-in Date:</span>
                        <p className="font-medium">{resident.checkIn}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Phone:</span>
                        <p className="font-medium">{resident.phone}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Emergency Contact:</span>
                        <p className="font-medium">{resident.emergencyContact}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Hostel:</span>
                        <p className="font-medium">{resident.hostel}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Hostel Occupancy Report</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Total Capacity</span>
                    <span className="font-semibold">{hostelFacilities.reduce((sum, h) => sum + h.capacity, 0)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Occupied Rooms</span>
                    <span className="font-semibold">{hostelFacilities.reduce((sum, h) => sum + h.occupied, 0)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Available Rooms</span>
                    <span className="font-semibold">{hostelFacilities.reduce((sum, h) => sum + (h.capacity - h.occupied), 0)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Occupancy Rate</span>
                    <span className="font-semibold">
                      {Math.round((hostelFacilities.reduce((sum, h) => sum + h.occupied, 0) / 
                        hostelFacilities.reduce((sum, h) => sum + h.capacity, 0)) * 100)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Report</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Monthly Revenue</span>
                    <span className="font-semibold">
                      ₹{hostelFacilities.reduce((sum, h) => sum + (h.monthlyRent * h.occupied), 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Potential Revenue</span>
                    <span className="font-semibold">
                      ₹{hostelFacilities.reduce((sum, h) => sum + (h.monthlyRent * h.capacity), 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </ModuleShell>
  )
}
