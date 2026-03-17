"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { UserPlus, GraduationCap } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const institutes = [
  {
    id: "unix-global",
    name: "Unix Global Preschool",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unix_global_pre_school_color-7XQJ8vQJ8vQJ8vQJ8vQJ8vQJ8v.jpeg",
    location: "Mumbai, Maharashtra",
  },
  {
    id: "utopia-world",
    name: "Utopia World Preschool",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/utopia_world_pre_school_color-8YRK9wRK9wRK9wRK9wRK9wRK9w.jpeg",
    location: "Pune, Maharashtra",
  },
  {
    id: "utopia-global",
    name: "Utopia Global School",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/utopia_global_school_color-9ZSL0xSL0xSL0xSL0xSL0xSL0x.jpeg",
    location: "Bangalore, Karnataka",
  },
  {
    id: "suryadhi-learning",
    name: "Suryadhi Learning",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/suryadhi_learning_logo-0ATM1yTM1yTM1yTM1yTM1yTM1y.jpeg",
    location: "Delhi, NCR",
  },
]

export default function SignupPage() {
  const router = useRouter()
  const [institute, setInstitute] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [designation, setDesignation] = useState("")

  const selectedInstitute = institutes.find((inst) => inst.id === institute)

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would validate and create an account here
    router.push("/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accent-50 via-white to-secondary-50 px-4 py-8">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-100/20 via-transparent to-secondary-100/20"></div>
      <Card className="w-full max-w-md relative z-10 shadow-xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="h-16 w-16 bg-gradient-to-br from-accent-600 to-secondary-600 rounded-2xl flex items-center justify-center shadow-lg">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 h-6 w-6 bg-primary-600 rounded-full flex items-center justify-center">
                <UserPlus className="h-3 w-3 text-white" />
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-primary-900">Join Our Network</CardTitle>
          <CardDescription className="text-gray-600">Request access to the educational ERP system</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="institute" className="text-primary-800 font-medium">
                Select Institute
              </Label>
              <Select value={institute} onValueChange={setInstitute} required>
                <SelectTrigger
                  id="institute"
                  className="border-gray-300 focus:border-secondary-500 focus:ring-secondary-500"
                >
                  <SelectValue placeholder="Choose your institute" />
                </SelectTrigger>
                <SelectContent>
                  {institutes.map((inst) => (
                    <SelectItem key={inst.id} value={inst.id}>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={inst.logo || "/placeholder.svg"} alt={inst.name} />
                          <AvatarFallback className="text-xs">
                            {inst.name
                              .split(" ")
                              .map((word) => word[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium">{inst.name}</span>
                          <span className="text-xs text-gray-500">{inst.location}</span>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-primary-800 font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-gray-300 focus:border-secondary-500 focus:ring-secondary-500"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-primary-800 font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-gray-300 focus:border-secondary-500 focus:ring-secondary-500"
                placeholder="Enter your email address"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-primary-800 font-medium">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border-gray-300 focus:border-secondary-500 focus:ring-secondary-500"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="designation" className="text-primary-800 font-medium">
                Designation
              </Label>
              <Select value={designation} onValueChange={setDesignation} required>
                <SelectTrigger
                  id="designation"
                  className="border-gray-300 focus:border-secondary-500 focus:ring-secondary-500"
                >
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="principal">Principal</SelectItem>
                  <SelectItem value="vice-principal">Vice Principal</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="admin">Administrative Staff</SelectItem>
                  <SelectItem value="accountant">Accountant</SelectItem>
                  <SelectItem value="coordinator">Coordinator</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-accent-600 to-accent-700 hover:from-accent-700 hover:to-accent-800 text-white shadow-lg"
            >
              <UserPlus className="mr-2 h-4 w-4" /> Request Access
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-secondary-600 hover:text-secondary-700 font-medium underline">
              Sign in here
            </Link>
          </div>
          <div className="text-xs text-center text-gray-500">
            Powered by <span className="font-semibold text-primary-700">Suryadhi Learning Pvt. Ltd.</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
