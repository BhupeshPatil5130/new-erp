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
import { Building2, LogIn, GraduationCap, Crown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const institutes = [
  {
    id: "suryadhi-learning-hq",
    name: "Suryadhi Learning Pvt. Ltd",
    logo: "/suryadhi_learning_logo.jpeg",
    location: "Corporate Headquarters",
    type: "Corporate HQ",
    isHeadquarters: true,
  },
  {
    id: "unix-global",
    name: "Unix Global Preschool",
    logo: "/unix_global_pre_school_color.jpeg",
    location: "Mumbai, Maharashtra",
    type: "Preschool",
    isHeadquarters: false,
  },
  {
    id: "utopia-world",
    name: "Utopia World Preschool",
    logo: "/utopia_world_pre_school_color.jpeg",
    location: "Pune, Maharashtra",
    type: "Preschool",
    isHeadquarters: false,
  },
  {
    id: "utopia-global",
    name: "Utopia Global School",
    logo: "/utopia_global_school_color.jpeg",
    location: "Bangalore, Karnataka",
    type: "K12 School",
    isHeadquarters: false,
  },
  {
    id: "suryadhi-learning",
    name: "Suryadhi Learning Center",
    logo: "/suryadhi_learning_logo.jpeg",
    location: "Delhi, NCR",
    type: "Training Center",
    isHeadquarters: false,
  },
]

export default function LoginPage() {
  const router = useRouter()
  const [institute, setInstitute] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const selectedInstitute = institutes.find((inst) => inst.id === institute)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (username && password && institute) {
      // Store selected institute in localStorage
      localStorage.setItem("currentInstitute", JSON.stringify(selectedInstitute))
      localStorage.setItem("userToken", "mock-jwt-token")
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          id: "USR001",
          name: selectedInstitute?.isHeadquarters ? "Corporate Admin" : "Branch Admin",
          role: selectedInstitute?.isHeadquarters ? "Corporate Administrator" : "Branch Administrator",
          institute: selectedInstitute?.name,
          isHeadquarters: selectedInstitute?.isHeadquarters || false,
        }),
      )

      router.push("/dashboard")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary-50 via-white to-primary-50">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-100/20 via-transparent to-accent-100/20"></div>
      <Card className="w-full max-w-md relative z-10 shadow-xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="h-16 w-16 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center shadow-lg">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 h-6 w-6 bg-accent-500 rounded-full flex items-center justify-center">
                <Building2 className="h-3 w-3 text-white" />
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-primary-900">ERP System Login</CardTitle>
          <CardDescription className="text-gray-600">
            Select your institute and enter credentials to access the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="institute" className="text-primary-800 font-medium">
                Select Institute *
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
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{inst.name}</span>
                            {inst.isHeadquarters && <Crown className="h-3 w-3 text-yellow-600" />}
                          </div>
                          <span className="text-xs text-gray-500">{inst.location}</span>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedInstitute && (
                <div className="flex items-center gap-2 p-3 bg-secondary-50 rounded-lg border">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={selectedInstitute.logo || "/placeholder.svg"} alt={selectedInstitute.name} />
                    <AvatarFallback className="text-xs">
                      {selectedInstitute.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm flex-1">
                    <div className="flex items-center gap-2">
                      <div className="font-medium text-primary-800">{selectedInstitute.name}</div>
                      {selectedInstitute.isHeadquarters && <Crown className="h-4 w-4 text-yellow-600" />}
                    </div>
                    <div className="text-gray-600">
                      {selectedInstitute.type} • {selectedInstitute.location}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="username" className="text-primary-800 font-medium">
                Username / Employee ID *
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-gray-300 focus:border-secondary-500 focus:ring-secondary-500"
                placeholder="Enter your username or employee ID"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-primary-800 font-medium">
                Password *
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-300 focus:border-secondary-500 focus:ring-secondary-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" /> Sign In to ERP
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-gray-600">
            Need access?{" "}
            <Link href="/signup" className="text-secondary-600 hover:text-secondary-700 font-medium underline">
              Contact Administrator
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
