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
import { Progress } from "@/components/ui/progress"
import { 
  Handshake, 
  Users, 
  TrendingUp, 
  DollarSign, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Star,
  Award,
  Target
} from "lucide-react"

// Mock data for franchise partners
const franchisePartners = [
  {
    id: 1,
    name: "Suryadhi Learning - Mumbai",
    partnerName: "Rajesh Kumar",
    location: "Mumbai, Maharashtra",
    status: "Active",
    tier: "Gold",
    joinDate: "2023-01-15",
    totalStudents: 450,
    monthlyRevenue: 2500000,
    commission: 15,
    performance: 95,
    contact: {
      phone: "+91 9876543210",
      email: "rajesh@suryadhi-mumbai.com"
    },
    achievements: ["Top Performer 2023", "100% Student Satisfaction", "Fastest Growing Partner"]
  },
  {
    id: 2,
    name: "Suryadhi Learning - Delhi",
    partnerName: "Priya Sharma",
    location: "Delhi, NCR",
    status: "Active",
    tier: "Silver",
    joinDate: "2023-03-20",
    totalStudents: 320,
    monthlyRevenue: 1800000,
    commission: 12,
    performance: 88,
    contact: {
      phone: "+91 9876543211",
      email: "priya@suryadhi-delhi.com"
    },
    achievements: ["Consistent Growth", "Excellent Teaching Quality"]
  },
  {
    id: 3,
    name: "Suryadhi Learning - Bangalore",
    partnerName: "Amit Patel",
    location: "Bangalore, Karnataka",
    status: "Pending",
    tier: "Bronze",
    joinDate: "2024-01-10",
    totalStudents: 150,
    monthlyRevenue: 850000,
    commission: 10,
    performance: 75,
    contact: {
      phone: "+91 9876543212",
      email: "amit@suryadhi-bangalore.com"
    },
    achievements: ["New Partner", "Rapid Expansion"]
  }
]

const partnerPerformance = [
  {
    month: "January 2024",
    revenue: 2500000,
    students: 450,
    growth: 12
  },
  {
    month: "February 2024",
    revenue: 2800000,
    students: 480,
    growth: 8
  },
  {
    month: "March 2024",
    revenue: 3200000,
    students: 520,
    growth: 15
  }
]

export default function FranchisePartnerPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedTier, setSelectedTier] = useState("all")
  const [isAddPartnerOpen, setIsAddPartnerOpen] = useState(false)

  const filteredPartners = franchisePartners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.partnerName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || partner.status.toLowerCase() === selectedStatus
    const matchesTier = selectedTier === "all" || partner.tier.toLowerCase() === selectedTier
    return matchesSearch && matchesStatus && matchesTier
  })

  const kpis = [
    { 
      label: "Total Partners", 
      value: franchisePartners.length,
      hint: `${franchisePartners.filter(p => p.status === "Active").length} active`
    },
    { 
      label: "Total Students", 
      value: franchisePartners.reduce((sum, p) => sum + p.totalStudents, 0).toLocaleString(),
      hint: "Across all partners"
    },
    { 
      label: "Monthly Revenue", 
      value: `₹${franchisePartners.reduce((sum, p) => sum + p.monthlyRevenue, 0).toLocaleString()}`,
      hint: "Combined revenue"
    },
    { 
      label: "Avg Performance", 
      value: `${Math.round(franchisePartners.reduce((sum, p) => sum + p.performance, 0) / franchisePartners.length)}%`,
      hint: "Average performance score"
    }
  ]

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Gold": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Silver": return "bg-gray-100 text-gray-800 border-gray-200"
      case "Bronze": return "bg-orange-100 text-orange-800 border-orange-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800"
      case "Pending": return "bg-yellow-100 text-yellow-800"
      case "Inactive": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <ModuleShell
      title="Franchise Partner Dashboard"
      description="Manage franchise partners, performance, and partnerships"
      icon={Handshake}
      kpis={kpis}
      toolbar={
        <div className="flex gap-2">
          <Dialog open={isAddPartnerOpen} onOpenChange={setIsAddPartnerOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Partner
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Franchise Partner</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="partnerName">Partner Name</Label>
                    <Input id="partnerName" placeholder="Enter partner name" />
                  </div>
                  <div>
                    <Label htmlFor="franchiseName">Franchise Name</Label>
                    <Input id="franchiseName" placeholder="Enter franchise name" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Enter location" />
                  </div>
                  <div>
                    <Label htmlFor="tier">Tier</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bronze">Bronze</SelectItem>
                        <SelectItem value="silver">Silver</SelectItem>
                        <SelectItem value="gold">Gold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter phone number" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter email" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="commission">Commission (%)</Label>
                    <Input id="commission" type="number" placeholder="Enter commission percentage" />
                  </div>
                  <div>
                    <Label htmlFor="joinDate">Join Date</Label>
                    <Input id="joinDate" type="date" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddPartnerOpen(false)}>
                    Cancel
                  </Button>
                  <Button>Add Partner</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      }
    >
      <Tabs defaultValue="partners" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="partners">Partners</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="partners" className="space-y-4">
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search partners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedTier} onValueChange={setSelectedTier}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="gold">Gold</SelectItem>
                <SelectItem value="silver">Silver</SelectItem>
                <SelectItem value="bronze">Bronze</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {filteredPartners.map((partner) => (
              <Card key={partner.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {partner.name}
                        <Badge className={getStatusColor(partner.status)}>
                          {partner.status}
                        </Badge>
                        <Badge className={getTierColor(partner.tier)}>
                          {partner.tier}
                        </Badge>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Partner: {partner.partnerName} • {partner.location}
                      </p>
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
                      <div className="text-2xl font-bold text-primary">{partner.totalStudents}</div>
                      <div className="text-sm text-muted-foreground">Total Students</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        ₹{(partner.monthlyRevenue / 100000).toFixed(1)}L
                      </div>
                      <div className="text-sm text-muted-foreground">Monthly Revenue</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{partner.commission}%</div>
                      <div className="text-sm text-muted-foreground">Commission</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{partner.performance}%</div>
                      <div className="text-sm text-muted-foreground">Performance</div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Performance Score</span>
                      <span className="text-sm text-muted-foreground">{partner.performance}%</span>
                    </div>
                    <Progress value={partner.performance} className="h-2" />
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {partner.achievements.map((achievement, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <Award className="h-3 w-3 mr-1" />
                        {achievement}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {partner.contact.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {partner.contact.email}
                      </span>
                    </div>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Joined: {partner.joinDate}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4">
            {partnerPerformance.map((performance, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    {performance.month}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        ₹{(performance.revenue / 100000).toFixed(1)}L
                      </div>
                      <div className="text-sm text-muted-foreground">Revenue</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{performance.students}</div>
                      <div className="text-sm text-muted-foreground">Students</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">+{performance.growth}%</div>
                      <div className="text-sm text-muted-foreground">Growth</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Revenue Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Total Monthly Revenue</span>
                    <span className="font-semibold text-lg">
                      ₹{franchisePartners.reduce((sum, p) => sum + p.monthlyRevenue, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average Revenue per Partner</span>
                    <span className="font-semibold">
                      ₹{Math.round(franchisePartners.reduce((sum, p) => sum + p.monthlyRevenue, 0) / franchisePartners.length).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Total Commission Paid</span>
                    <span className="font-semibold">
                      ₹{franchisePartners.reduce((sum, p) => sum + (p.monthlyRevenue * p.commission / 100), 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              {franchisePartners.map((partner) => (
                <Card key={partner.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{partner.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Monthly Revenue:</span>
                        <span className="font-semibold">₹{partner.monthlyRevenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Commission ({partner.commission}%):</span>
                        <span className="font-semibold">
                          ₹{(partner.monthlyRevenue * partner.commission / 100).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Net Revenue:</span>
                        <span className="font-semibold">
                          ₹{(partner.monthlyRevenue - (partner.monthlyRevenue * partner.commission / 100)).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Partner Performance Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Total Active Partners</span>
                    <span className="font-semibold">{franchisePartners.filter(p => p.status === "Active").length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average Performance Score</span>
                    <span className="font-semibold">
                      {Math.round(franchisePartners.reduce((sum, p) => sum + p.performance, 0) / franchisePartners.length)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Total Students Enrolled</span>
                    <span className="font-semibold">{franchisePartners.reduce((sum, p) => sum + p.totalStudents, 0)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Top Performing Partner</span>
                    <span className="font-semibold">
                      {franchisePartners.reduce((top, p) => p.performance > top.performance ? p : top).name}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Tier Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                      Gold Partners
                    </span>
                    <span className="font-semibold">
                      {franchisePartners.filter(p => p.tier === "Gold").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-400 rounded"></div>
                      Silver Partners
                    </span>
                    <span className="font-semibold">
                      {franchisePartners.filter(p => p.tier === "Silver").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded"></div>
                      Bronze Partners
                    </span>
                    <span className="font-semibold">
                      {franchisePartners.filter(p => p.tier === "Bronze").length}
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
