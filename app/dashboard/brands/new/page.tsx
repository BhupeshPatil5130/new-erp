"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Building2, Upload, Save } from "lucide-react"
import Link from "next/link"
import { createBrand } from "@/lib/api-service"

export default function NewBrandPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    location: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    establishedYear: "",
    description: "",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    initialFee: "",
    monthlyFee: "",
    logo: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await createBrand(formData)
      if (response.success) {
        toast({
          title: "Success",
          description: "Brand created successfully",
        })
        router.push("/dashboard/brands")
      } else {
        throw new Error(response.error || "Failed to create brand")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create brand",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/dashboard/brands">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-primary-900">Add New Brand</h1>
          <p className="text-gray-600 mt-1">Create a new brand and configure its settings</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building2 className="mr-2 h-5 w-5" />
              Basic Information
            </CardTitle>
            <CardDescription>Enter the basic details of the new brand</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Brand Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter brand name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Brand Type *</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Preschool">Preschool</SelectItem>
                    <SelectItem value="K12 School">K12 School</SelectItem>
                    <SelectItem value="Training Center">Training Center</SelectItem>
                    <SelectItem value="Coaching Institute">Coaching Institute</SelectItem>
                    <SelectItem value="University">University</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="City, State"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="establishedYear">Established Year</Label>
                <Input
                  id="establishedYear"
                  type="number"
                  value={formData.establishedYear}
                  onChange={(e) => handleInputChange("establishedYear", e.target.value)}
                  placeholder="2024"
                  min="1900"
                  max="2024"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Full Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Enter complete address"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Brief description about the brand"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Brand contact details and website</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="info@brand.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="https://www.brand.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Owner Information */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Owner Information</CardTitle>
            <CardDescription>Details of the brand owner or primary contact</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ownerName">Owner Name</Label>
                <Input
                  id="ownerName"
                  value={formData.ownerName}
                  onChange={(e) => handleInputChange("ownerName", e.target.value)}
                  placeholder="Enter owner name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ownerPhone">Owner Phone</Label>
                <Input
                  id="ownerPhone"
                  value={formData.ownerPhone}
                  onChange={(e) => handleInputChange("ownerPhone", e.target.value)}
                  placeholder="+91 98765 43210"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ownerEmail">Owner Email</Label>
                <Input
                  id="ownerEmail"
                  type="email"
                  value={formData.ownerEmail}
                  onChange={(e) => handleInputChange("ownerEmail", e.target.value)}
                  placeholder="owner@brand.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fee Structure */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Fee Structure</CardTitle>
            <CardDescription>Initial setup and monthly fees</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="initialFee">Initial Setup Fee (₹)</Label>
                <Input
                  id="initialFee"
                  type="number"
                  value={formData.initialFee}
                  onChange={(e) => handleInputChange("initialFee", e.target.value)}
                  placeholder="50000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthlyFee">Monthly Fee (₹)</Label>
                <Input
                  id="monthlyFee"
                  type="number"
                  value={formData.monthlyFee}
                  onChange={(e) => handleInputChange("monthlyFee", e.target.value)}
                  placeholder="5000"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logo Upload */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Brand Logo</CardTitle>
            <CardDescription>Upload the brand logo (optional)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Button type="button" variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Logo
              </Button>
              <span className="text-sm text-gray-500">PNG, JPG up to 2MB</span>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Link href="/dashboard/brands">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={loading} className="bg-gradient-to-r from-primary-600 to-primary-700">
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Create Brand
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
