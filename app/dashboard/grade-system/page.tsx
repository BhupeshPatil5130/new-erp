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
  Award, 
  Users, 
  TrendingUp, 
  Target, 
  Star,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  BookOpen,
  Calculator,
  BarChart3
} from "lucide-react"

// Mock data for grade system
const gradeScales = [
  {
    id: 1,
    name: "Standard 10-Point Scale",
    type: "Percentage",
    grades: [
      { grade: "A+", minScore: 90, maxScore: 100, points: 10, description: "Outstanding" },
      { grade: "A", minScore: 80, maxScore: 89, points: 9, description: "Excellent" },
      { grade: "B+", minScore: 70, maxScore: 79, points: 8, description: "Very Good" },
      { grade: "B", minScore: 60, maxScore: 69, points: 7, description: "Good" },
      { grade: "C+", minScore: 50, maxScore: 59, points: 6, description: "Satisfactory" },
      { grade: "C", minScore: 40, maxScore: 49, points: 5, description: "Pass" },
      { grade: "D", minScore: 30, maxScore: 39, points: 4, description: "Below Average" },
      { grade: "F", minScore: 0, maxScore: 29, points: 0, description: "Fail" }
    ],
    isDefault: true
  },
  {
    id: 2,
    name: "GPA Scale (4.0)",
    type: "GPA",
    grades: [
      { grade: "A", minScore: 90, maxScore: 100, points: 4.0, description: "Excellent" },
      { grade: "B", minScore: 80, maxScore: 89, points: 3.0, description: "Good" },
      { grade: "C", minScore: 70, maxScore: 79, points: 2.0, description: "Satisfactory" },
      { grade: "D", minScore: 60, maxScore: 69, points: 1.0, description: "Pass" },
      { grade: "F", minScore: 0, maxScore: 59, points: 0.0, description: "Fail" }
    ],
    isDefault: false
  }
]

const studentGrades = [
  {
    id: 1,
    studentName: "Rajesh Kumar",
    studentId: "SL2024001",
    program: "Computer Science Engineering",
    semester: "Semester 1",
    subjects: [
      { name: "Programming Fundamentals", grade: "A+", score: 95, points: 10 },
      { name: "Mathematics", grade: "A", score: 85, points: 9 },
      { name: "Physics", grade: "B+", score: 78, points: 8 },
      { name: "English", grade: "A", score: 88, points: 9 }
    ],
    totalCredits: 16,
    earnedCredits: 16,
    gpa: 9.0,
    cgpa: 9.0,
    rank: 1
  },
  {
    id: 2,
    studentName: "Priya Sharma",
    studentId: "SL2024002",
    program: "Computer Science Engineering",
    semester: "Semester 1",
    subjects: [
      { name: "Programming Fundamentals", grade: "A", score: 82, points: 9 },
      { name: "Mathematics", grade: "B+", score: 75, points: 8 },
      { name: "Physics", grade: "B", score: 68, points: 7 },
      { name: "English", grade: "A", score: 90, points: 9 }
    ],
    totalCredits: 16,
    earnedCredits: 16,
    gpa: 8.25,
    cgpa: 8.25,
    rank: 2
  },
  {
    id: 3,
    studentName: "Amit Patel",
    studentId: "SL2024003",
    program: "Business Administration",
    semester: "Semester 1",
    subjects: [
      { name: "Management Principles", grade: "A", score: 87, points: 9 },
      { name: "Marketing", grade: "B+", score: 76, points: 8 },
      { name: "Finance", grade: "A", score: 89, points: 9 },
      { name: "Economics", grade: "B+", score: 74, points: 8 }
    ],
    totalCredits: 16,
    earnedCredits: 16,
    gpa: 8.5,
    cgpa: 8.5,
    rank: 1
  }
]

const gradeStatistics = {
  totalStudents: 120,
  averageGPA: 8.2,
  passRate: 95,
  topPerformers: 15,
  gradeDistribution: [
    { grade: "A+", count: 25, percentage: 20.8 },
    { grade: "A", count: 35, percentage: 29.2 },
    { grade: "B+", count: 30, percentage: 25.0 },
    { grade: "B", count: 20, percentage: 16.7 },
    { grade: "C+", count: 8, percentage: 6.7 },
    { grade: "C", count: 2, percentage: 1.7 },
    { grade: "D", count: 0, percentage: 0 },
    { grade: "F", count: 0, percentage: 0 }
  ]
}

export default function GradeSystemPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProgram, setSelectedProgram] = useState("all")
  const [selectedSemester, setSelectedSemester] = useState("all")
  const [isAddGradeScaleOpen, setIsAddGradeScaleOpen] = useState(false)
  const [isAddGradeOpen, setIsAddGradeOpen] = useState(false)

  const filteredStudents = studentGrades.filter(student => {
    const matchesSearch = student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesProgram = selectedProgram === "all" || student.program.toLowerCase().includes(selectedProgram.toLowerCase())
    const matchesSemester = selectedSemester === "all" || student.semester.toLowerCase().includes(selectedSemester.toLowerCase())
    return matchesSearch && matchesProgram && matchesSemester
  })

  const kpis = [
    { 
      label: "Total Students", 
      value: gradeStatistics.totalStudents,
      hint: "Enrolled in programs"
    },
    { 
      label: "Average GPA", 
      value: gradeStatistics.averageGPA.toFixed(2),
      hint: "Overall performance"
    },
    { 
      label: "Pass Rate", 
      value: `${gradeStatistics.passRate}%`,
      hint: "Students passing"
    },
    { 
      label: "Top Performers", 
      value: gradeStatistics.topPerformers,
      hint: "A+ grade students"
    }
  ]

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A+": return "bg-green-100 text-green-800"
      case "A": return "bg-blue-100 text-blue-800"
      case "B+": return "bg-yellow-100 text-yellow-800"
      case "B": return "bg-orange-100 text-orange-800"
      case "C+": return "bg-purple-100 text-purple-800"
      case "C": return "bg-gray-100 text-gray-800"
      case "D": return "bg-red-100 text-red-800"
      case "F": return "bg-red-200 text-red-900"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <ModuleShell
      title="Grade System Management"
      description="Manage grading scales, student grades, and academic performance"
      icon={Award}
      kpis={kpis}
      toolbar={
        <div className="flex gap-2">
          <Dialog open={isAddGradeScaleOpen} onOpenChange={setIsAddGradeScaleOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Grade Scale
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Grade Scale</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="scaleName">Scale Name</Label>
                    <Input id="scaleName" placeholder="Enter scale name" />
                  </div>
                  <div>
                    <Label htmlFor="scaleType">Scale Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="gpa">GPA</SelectItem>
                        <SelectItem value="letter">Letter Grade</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Grade Configuration</Label>
                  <div className="space-y-2 mt-2">
                    {["A+", "A", "B+", "B", "C+", "C", "D", "F"].map((grade, index) => (
                      <div key={grade} className="grid grid-cols-4 gap-2">
                        <Input placeholder={grade} disabled />
                        <Input placeholder="Min Score" type="number" />
                        <Input placeholder="Max Score" type="number" />
                        <Input placeholder="Points" type="number" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddGradeScaleOpen(false)}>
                    Cancel
                  </Button>
                  <Button>Add Grade Scale</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={isAddGradeOpen} onOpenChange={setIsAddGradeOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Grade
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Student Grade</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="student">Select Student</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select student" />
                      </SelectTrigger>
                      <SelectContent>
                        {studentGrades.map(student => (
                          <SelectItem key={student.id} value={student.id.toString()}>
                            {student.studentName} ({student.studentId})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Enter subject name" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="score">Score</Label>
                    <Input id="score" type="number" placeholder="Enter score" />
                  </div>
                  <div>
                    <Label htmlFor="grade">Grade</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A">A</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B">B</SelectItem>
                        <SelectItem value="C+">C+</SelectItem>
                        <SelectItem value="C">C</SelectItem>
                        <SelectItem value="D">D</SelectItem>
                        <SelectItem value="F">F</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddGradeOpen(false)}>
                    Cancel
                  </Button>
                  <Button>Add Grade</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      }
    >
      <Tabs defaultValue="grades" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="grades">Student Grades</TabsTrigger>
          <TabsTrigger value="scales">Grade Scales</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="grades" className="space-y-4">
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedProgram} onValueChange={setSelectedProgram}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Programs</SelectItem>
                <SelectItem value="computer science">Computer Science</SelectItem>
                <SelectItem value="business">Business Administration</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Semesters</SelectItem>
                <SelectItem value="semester 1">Semester 1</SelectItem>
                <SelectItem value="semester 2">Semester 2</SelectItem>
                <SelectItem value="semester 3">Semester 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {filteredStudents.map((student) => (
              <Card key={student.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {student.studentName}
                        <Badge variant="outline">{student.studentId}</Badge>
                        <Badge className="bg-blue-100 text-blue-800">Rank #{student.rank}</Badge>
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {student.program} • {student.semester}
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
                      <div className="text-2xl font-bold text-primary">{student.gpa}</div>
                      <div className="text-sm text-muted-foreground">GPA</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{student.cgpa}</div>
                      <div className="text-sm text-muted-foreground">CGPA</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{student.earnedCredits}</div>
                      <div className="text-sm text-muted-foreground">Credits Earned</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{student.totalCredits}</div>
                      <div className="text-sm text-muted-foreground">Total Credits</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold">Subject Grades</h4>
                    <div className="grid gap-2">
                      {student.subjects.map((subject, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <span className="font-medium">{subject.name}</span>
                            <span className="text-sm text-muted-foreground ml-2">({subject.score}%)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getGradeColor(subject.grade)}>
                              {subject.grade}
                            </Badge>
                            <span className="text-sm font-medium">{subject.points} pts</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scales" className="space-y-4">
          <div className="grid gap-4">
            {gradeScales.map((scale) => (
              <Card key={scale.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {scale.name}
                        {scale.isDefault && <Badge className="bg-green-100 text-green-800">Default</Badge>}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">Type: {scale.type}</p>
                    </div>
                    <div className="flex items-center gap-2">
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
                  <div className="space-y-2">
                    <h4 className="font-semibold">Grade Configuration</h4>
                    <div className="grid gap-2">
                      {scale.grades.map((grade, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <Badge className={getGradeColor(grade.grade)}>
                              {grade.grade}
                            </Badge>
                            <span className="font-medium">{grade.minScore}-{grade.maxScore}%</span>
                            <span className="text-sm text-muted-foreground">{grade.description}</span>
                          </div>
                          <span className="font-semibold">{grade.points} pts</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="statistics" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Grade Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {gradeStatistics.gradeDistribution.map((distribution, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge className={getGradeColor(distribution.grade)}>
                          {distribution.grade}
                        </Badge>
                        <span className="font-medium">{distribution.count} students</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${distribution.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-12 text-right">{distribution.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{gradeStatistics.totalStudents}</div>
                    <div className="text-sm text-muted-foreground">Total Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{gradeStatistics.averageGPA}</div>
                    <div className="text-sm text-muted-foreground">Average GPA</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{gradeStatistics.passRate}%</div>
                    <div className="text-sm text-muted-foreground">Pass Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{gradeStatistics.topPerformers}</div>
                    <div className="text-sm text-muted-foreground">Top Performers</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Academic Performance Report
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Total Students Evaluated</span>
                    <span className="font-semibold">{gradeStatistics.totalStudents}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average GPA</span>
                    <span className="font-semibold">{gradeStatistics.averageGPA}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Pass Rate</span>
                    <span className="font-semibold">{gradeStatistics.passRate}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Students with A+ Grade</span>
                    <span className="font-semibold">{gradeStatistics.topPerformers}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredStudents.slice(0, 5).map((student, index) => (
                    <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-primary">#{index + 1}</span>
                        </div>
                        <div>
                          <div className="font-medium">{student.studentName}</div>
                          <div className="text-sm text-muted-foreground">{student.studentId}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">GPA: {student.gpa}</div>
                        <div className="text-sm text-muted-foreground">Rank #{student.rank}</div>
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
