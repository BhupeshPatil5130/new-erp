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
import { Checkbox } from "@/components/ui/checkbox"
import { 
  BookOpen, 
  Users, 
  Clock, 
  Calendar, 
  GraduationCap, 
  Target,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Play,
  Pause,
  CheckCircle,
  AlertCircle
} from "lucide-react"

// Mock data for programs and classes
const programs = [
  {
    id: 1,
    name: "Computer Science Engineering",
    code: "CSE",
    duration: "4 Years",
    type: "Undergraduate",
    status: "Active",
    totalClasses: 48,
    completedClasses: 32,
    enrolledStudents: 120,
    fee: 150000,
    description: "Comprehensive computer science program covering programming, algorithms, and software engineering.",
    subjects: ["Programming", "Data Structures", "Algorithms", "Database Systems", "Software Engineering"],
    requirements: ["12th Grade", "Mathematics", "Physics", "Chemistry"]
  },
  {
    id: 2,
    name: "Business Administration",
    code: "MBA",
    duration: "2 Years",
    type: "Postgraduate",
    status: "Active",
    totalClasses: 24,
    completedClasses: 18,
    enrolledStudents: 80,
    fee: 200000,
    description: "Advanced business management program focusing on leadership and strategic thinking.",
    subjects: ["Management", "Marketing", "Finance", "Operations", "Strategy"],
    requirements: ["Bachelor's Degree", "Work Experience", "GMAT Score"]
  },
  {
    id: 3,
    name: "Data Science",
    code: "DS",
    duration: "1 Year",
    type: "Certificate",
    status: "Active",
    totalClasses: 12,
    completedClasses: 8,
    enrolledStudents: 45,
    fee: 75000,
    description: "Intensive data science program covering statistics, machine learning, and data analysis.",
    subjects: ["Statistics", "Python", "Machine Learning", "Data Visualization", "Big Data"],
    requirements: ["Basic Programming", "Mathematics", "Statistics"]
  }
]

const classes = [
  {
    id: 1,
    name: "Introduction to Programming",
    program: "Computer Science Engineering",
    instructor: "Dr. Rajesh Kumar",
    schedule: "Mon, Wed, Fri 10:00 AM - 11:30 AM",
    room: "Lab 101",
    status: "Ongoing",
    enrolledStudents: 30,
    maxStudents: 35,
    duration: "90 minutes",
    type: "Lecture + Lab"
  },
  {
    id: 2,
    name: "Data Structures and Algorithms",
    program: "Computer Science Engineering",
    instructor: "Prof. Priya Sharma",
    schedule: "Tue, Thu 2:00 PM - 3:30 PM",
    room: "Lab 102",
    status: "Scheduled",
    enrolledStudents: 28,
    maxStudents: 30,
    duration: "90 minutes",
    type: "Lecture + Lab"
  },
  {
    id: 3,
    name: "Business Strategy",
    program: "Business Administration",
    instructor: "Dr. Amit Patel",
    schedule: "Mon, Wed 9:00 AM - 10:30 AM",
    room: "Room 201",
    status: "Completed",
    enrolledStudents: 25,
    maxStudents: 30,
    duration: "90 minutes",
    type: "Lecture"
  }
]

export default function ProgramClassPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAddProgramOpen, setIsAddProgramOpen] = useState(false)
  const [isAddClassOpen, setIsAddClassOpen] = useState(false)

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || program.type.toLowerCase() === selectedType
    return matchesSearch && matchesType
  })

  const filteredClasses = classes.filter(classItem => {
    const matchesSearch = classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classItem.program.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || classItem.status.toLowerCase() === selectedStatus
    return matchesSearch && matchesStatus
  })

  const kpis = [
    { 
      label: "Total Programs", 
      value: programs.length,
      hint: `${programs.filter(p => p.status === "Active").length} active`
    },
    { 
      label: "Total Classes", 
      value: classes.length,
      hint: `${classes.filter(c => c.status === "Ongoing").length} ongoing`
    },
    { 
      label: "Total Students", 
      value: programs.reduce((sum, p) => sum + p.enrolledStudents, 0),
      hint: "Across all programs"
    },
    { 
      label: "Completion Rate", 
      value: `${Math.round(programs.reduce((sum, p) => sum + (p.completedClasses / p.totalClasses), 0) / programs.length * 100)}%`,
      hint: "Average completion rate"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800"
      case "Ongoing": return "bg-blue-100 text-blue-800"
      case "Scheduled": return "bg-yellow-100 text-yellow-800"
      case "Completed": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Undergraduate": return "bg-blue-100 text-blue-800"
      case "Postgraduate": return "bg-purple-100 text-purple-800"
      case "Certificate": return "bg-orange-100 text-orange-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <ModuleShell
      title="Program & Class Management"
      description="Manage academic programs, classes, and course schedules"
      icon={BookOpen}
      kpis={kpis}
      toolbar={
        <div className="flex gap-2">
          <Dialog open={isAddProgramOpen} onOpenChange={setIsAddProgramOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Program
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Program</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="programName">Program Name</Label>
                    <Input id="programName" placeholder="Enter program name" />
                  </div>
                  <div>
                    <Label htmlFor="programCode">Program Code</Label>
                    <Input id="programCode" placeholder="Enter program code" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input id="duration" placeholder="e.g., 4 Years" />
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="undergraduate">Undergraduate</SelectItem>
                        <SelectItem value="postgraduate">Postgraduate</SelectItem>
                        <SelectItem value="certificate">Certificate</SelectItem>
                        <SelectItem value="diploma">Diploma</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fee">Program Fee (₹)</Label>
                    <Input id="fee" type="number" placeholder="Enter program fee" />
                  </div>
                  <div>
                    <Label htmlFor="totalClasses">Total Classes</Label>
                    <Input id="totalClasses" type="number" placeholder="Enter total classes" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter program description" />
                </div>
                <div>
                  <Label>Subjects</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {["Programming", "Mathematics", "Science", "English", "History", "Geography"].map((subject) => (
                      <div key={subject} className="flex items-center space-x-2">
                        <Checkbox id={subject} />
                        <Label htmlFor={subject} className="text-sm">{subject}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddProgramOpen(false)}>
                    Cancel
                  </Button>
                  <Button>Add Program</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={isAddClassOpen} onOpenChange={setIsAddClassOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Class
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Class</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="className">Class Name</Label>
                    <Input id="className" placeholder="Enter class name" />
                  </div>
                  <div>
                    <Label htmlFor="program">Select Program</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select program" />
                      </SelectTrigger>
                      <SelectContent>
                        {programs.map(program => (
                          <SelectItem key={program.id} value={program.id.toString()}>
                            {program.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="instructor">Instructor</Label>
                    <Input id="instructor" placeholder="Enter instructor name" />
                  </div>
                  <div>
                    <Label htmlFor="room">Room</Label>
                    <Input id="room" placeholder="Enter room number" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="schedule">Schedule</Label>
                    <Input id="schedule" placeholder="e.g., Mon, Wed, Fri 10:00 AM" />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input id="duration" type="number" placeholder="90" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="maxStudents">Max Students</Label>
                    <Input id="maxStudents" type="number" placeholder="30" />
                  </div>
                  <div>
                    <Label htmlFor="type">Class Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lecture">Lecture</SelectItem>
                        <SelectItem value="lab">Lab</SelectItem>
                        <SelectItem value="lecture+lab">Lecture + Lab</SelectItem>
                        <SelectItem value="seminar">Seminar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddClassOpen(false)}>
                    Cancel
                  </Button>
                  <Button>Add Class</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      }
    >
      <Tabs defaultValue="programs" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="programs" className="space-y-4">
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search programs..."
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
                <SelectItem value="undergraduate">Undergraduate</SelectItem>
                <SelectItem value="postgraduate">Postgraduate</SelectItem>
                <SelectItem value="certificate">Certificate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {filteredPrograms.map((program) => (
              <Card key={program.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {program.name}
                        <Badge className={getStatusColor(program.status)}>
                          {program.status}
                        </Badge>
                        <Badge className={getTypeColor(program.type)}>
                          {program.type}
                        </Badge>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Code: {program.code} • Duration: {program.duration}
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
                  <p className="text-sm text-muted-foreground mb-4">{program.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{program.enrolledStudents}</div>
                      <div className="text-sm text-muted-foreground">Enrolled Students</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{program.completedClasses}</div>
                      <div className="text-sm text-muted-foreground">Completed Classes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{program.totalClasses}</div>
                      <div className="text-sm text-muted-foreground">Total Classes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">₹{program.fee.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Program Fee</div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-muted-foreground">
                        {program.completedClasses}/{program.totalClasses} classes
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(program.completedClasses / program.totalClasses) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {program.subjects.map((subject, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <strong>Requirements:</strong> {program.requirements.join(", ")}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="classes" className="space-y-4">
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search classes..."
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
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {filteredClasses.map((classItem) => (
              <Card key={classItem.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{classItem.name}</h3>
                        <p className="text-sm text-muted-foreground">{classItem.program}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {classItem.instructor}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {classItem.schedule}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(classItem.status)}>
                        {classItem.status}
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
                        <span className="text-muted-foreground">Room:</span>
                        <p className="font-medium">{classItem.room}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <p className="font-medium">{classItem.duration}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Enrolled:</span>
                        <p className="font-medium">{classItem.enrolledStudents}/{classItem.maxStudents}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Type:</span>
                        <p className="font-medium">{classItem.type}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Weekly Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {classes.map((classItem) => (
                    <div key={classItem.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{classItem.name}</h4>
                          <p className="text-sm text-muted-foreground">{classItem.program}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{classItem.schedule}</p>
                        <p className="text-sm text-muted-foreground">{classItem.room}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(classItem.status)}>
                          {classItem.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Program Progress Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {programs.map((program) => (
                    <div key={program.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{program.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {program.completedClasses}/{program.totalClasses} classes completed
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {Math.round((program.completedClasses / program.totalClasses) * 100)}%
                        </div>
                        <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${(program.completedClasses / program.totalClasses) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </ModuleShell>
  )
}
