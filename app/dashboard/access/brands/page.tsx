"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import {
  Shield,
  Search,
  Settings,
  Users,
  GraduationCap,
  CreditCard,
  FileText,
  Building2,
  RefreshCw,
} from "lucide-react"
import { getBrandPermissions, updateBrandPermission, bulkUpdateBrandPermissions } from "@/lib/api-service"

const moduleConfig = {
  enrollment: {
    name: "Enrollment",
    description: "Manage student enquiries, admissions, and transfers",
    icon: GraduationCap,
    color: "text-blue-600",
  },
  fee: {
    name: "Fee Management",
    description: "Handle fee collection, payments, and financial records",
    icon: CreditCard,
    color: "text-green-600",
  },
  staff: {
    name: "Staff Management",
    description: "Manage staff records, attendance, and assessments",
    icon: Users,
    color: "text-purple-600",
  },
  reports: {
    name: "Reports & Analytics",
    description: "Generate reports and view analytics dashboards",
    icon: FileText,
    color: "text-orange-600",
  },
  settings: {
    name: "Settings",
    description: "Configure system settings and preferences",
    icon: Settings,
    color: "text-gray-600",
  },
  franchise: {
    name: "Franchise Management",
    description: "Manage franchise operations and billing",
    icon: Building2,
    color: "text-indigo-600",
  },
}

export default function BrandPermissionsPage() {
  const [brands, setBrands] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [filterStatus, setFilterStatus] = useState("all")

  useEffect(() => {
    loadBrandPermissions()
  }, [])

  const loadBrandPermissions = async () => {
    try {
      const response = await getBrandPermissions()
      if (response.success) {
        setBrands(response.data)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load brand permissions",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePermissionToggle = async (brandId: string, module: string, enabled: boolean) => {
    try {
      const response = await updateBrandPermission(brandId, module, enabled)
      if (response.success) {
        setBrands(
          brands.map((brand) =>
            brand.id === brandId ? { ...brand, permissions: { ...brand.permissions, [module]: enabled } } : brand,
          ),
        )
        toast({
          title: "Success",
          description: `Permission ${enabled ? "granted" : "revoked"} successfully`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update permission",
        variant: "destructive",
      })
    }
  }

  const handleBulkPermissionUpdate = async (module: string, enabled: boolean) => {
    if (selectedBrands.length === 0) {
      toast({
        title: "Warning",
        description: "Please select brands to update",
        variant: "destructive",
      })
      return
    }

    setSaving(true)
    try {
      const response = await bulkUpdateBrandPermissions(selectedBrands, { [module]: enabled })
      if (response.success) {
        setBrands(
          brands.map((brand) =>
            selectedBrands.includes(brand.id)
              ? { ...brand, permissions: { ...brand.permissions, [module]: enabled } }
              : brand,
          ),
        )
        toast({
          title: "Success",
          description: `Bulk permission update completed for ${selectedBrands.length} brands`,
        })
        setSelectedBrands([])
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update permissions",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const filteredBrands = brands.filter((brand) => {
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "active" && Object.values(brand.permissions).some((p) => p)) ||
      (filterStatus === "inactive" && !Object.values(brand.permissions).some((p) => p))
    return matchesSearch && matchesFilter
  })

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedBrands(filteredBrands.map((brand) => brand.id))
    } else {
      setSelectedBrands([])
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-900 flex items-center">
            <Shield className="mr-3 h-8 w-8 text-primary-600" />
            Brand Permissions
          </h1>
          <p className="text-gray-600 mt-1">Manage module access permissions for each brand in your network</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={loadBrandPermissions} variant="outline" size="sm" disabled={loading}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Badge variant="outline" className="border-primary-200 text-primary-700">
            {brands.length} Brands
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Brands</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by brand name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Label htmlFor="filter">Filter by Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All brands" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  <SelectItem value="active">With Permissions</SelectItem>
                  <SelectItem value="inactive">No Permissions</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedBrands.length > 0 && (
        <Card className="border-primary-200 bg-primary-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{selectedBrands.length} selected</Badge>
                <span className="text-sm text-gray-600">Bulk Actions:</span>
              </div>
              <div className="flex items-center gap-2">
                {Object.entries(moduleConfig).map(([key, module]) => (
                  <div key={key} className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleBulkPermissionUpdate(key, true)}
                      disabled={saving}
                      className="text-green-600 border-green-200 hover:bg-green-50"
                    >
                      Grant {module.name}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleBulkPermissionUpdate(key, false)}
                      disabled={saving}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      Revoke {module.name}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Permissions Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="mr-2 h-5 w-5" />
            Permission Matrix
          </CardTitle>
          <CardDescription>Toggle permissions for each brand and module combination</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedBrands.length === filteredBrands.length && filteredBrands.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="min-w-[200px]">Brand</TableHead>
                  {Object.entries(moduleConfig).map(([key, module]) => (
                    <TableHead key={key} className="text-center min-w-[120px]">
                      <div className="flex flex-col items-center gap-1">
                        <module.icon className={`h-4 w-4 ${module.color}`} />
                        <span className="text-xs">{module.name}</span>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBrands.map((brand) => (
                  <TableRow key={brand.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedBrands.includes(brand.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedBrands([...selectedBrands, brand.id])
                          } else {
                            setSelectedBrands(selectedBrands.filter((id) => id !== brand.id))
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{brand.name}</div>
                        <div className="text-sm text-gray-500">{brand.id}</div>
                      </div>
                    </TableCell>
                    {Object.entries(moduleConfig).map(([key, module]) => (
                      <TableCell key={key} className="text-center">
                        <Switch
                          checked={brand.permissions[key] || false}
                          onCheckedChange={(checked) => handlePermissionToggle(brand.id, key, checked)}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Module Descriptions */}
      <Card>
        <CardHeader>
          <CardTitle>Module Descriptions</CardTitle>
          <CardDescription>Understanding what each permission module controls</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(moduleConfig).map(([key, module]) => (
              <div key={key} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <module.icon className={`h-5 w-5 ${module.color}`} />
                  <h3 className="font-semibold">{module.name}</h3>
                </div>
                <p className="text-sm text-gray-600">{module.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
