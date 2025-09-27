"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Shield, Search, Plus, Edit, Trash2, Users, Settings, Save, Crown, Building, UserCheck } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getAllRoles, createRole, updateRole, deleteRole } from "@/lib/api-service"

const permissionCategories = [
  {
    name: "Dashboard",
    permissions: [
      { id: "dashboard_view", name: "View Dashboard", description: "Access to main dashboard" },
      { id: "dashboard_analytics", name: "View Analytics", description: "Access to analytics and reports" },
    ],
  },
  {
    name: "Brand Management",
    permissions: [
      { id: "brand_view", name: "View Brands", description: "View brand information" },
      { id: "brand_create", name: "Create Brands", description: "Add new brands" },
      { id: "brand_edit", name: "Edit Brands", description: "Modify brand details" },
      { id: "brand_delete", name: "Delete Brands", description: "Remove brands" },
    ],
  },
  {
    name: "User Management",
    permissions: [
      { id: "user_view", name: "View Users", description: "View user accounts" },
      { id: "user_create", name: "Create Users", description: "Add new users" },
      { id: "user_edit", name: "Edit Users", description: "Modify user details" },
      { id: "user_delete", name: "Delete Users", description: "Remove users" },
    ],
  },
  {
    name: "Access Control",
    permissions: [
      { id: "permission_view", name: "View Permissions", description: "View permission settings" },
      { id: "permission_edit", name: "Edit Permissions", description: "Modify permissions" },
      { id: "role_manage", name: "Manage Roles", description: "Create and edit roles" },
    ],
  },
  {
    name: "Reports",
    permissions: [
      { id: "report_view", name: "View Reports", description: "Access to reports" },
      { id: "report_export", name: "Export Reports", description: "Export report data" },
      { id: "report_create", name: "Create Reports", description: "Generate custom reports" },
    ],
  },
]

export default function RoleManagementPage() {
  const { toast } = useToast()
  const [roles, setRoles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<any>(null)
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: {} as Record<string, boolean>,
  })

  useEffect(() => {
    loadRoles()
  }, [])

  const loadRoles = async () => {
    try {
      const response = await getAllRoles()
      if (response.success) {
        setRoles(response.data)
      }
    } catch (error) {
      console.error("Error loading roles:", error)
      toast({
        title: "Error",
        description: "Failed to load roles",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateRole = async () => {
    try {
      const response = await createRole(newRole)
      if (response.success) {
        setRoles([...roles, response.data])
        setIsDialogOpen(false)
        setNewRole({ name: "", description: "", permissions: {} })
        toast({
          title: "Success",
          description: "Role created successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create role",
        variant: "destructive",
      })
    }
  }

  const handleUpdateRole = async () => {
    if (!editingRole) return
    try {
      const response = await updateRole(editingRole.id, newRole)
      if (response.success) {
        setRoles(roles.map((role) => (role.id === editingRole.id ? response.data : role)))
        setIsDialogOpen(false)
        setEditingRole(null)
        setNewRole({ name: "", description: "", permissions: {} })
        toast({
          title: "Success",
          description: "Role updated successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update role",
        variant: "destructive",
      })
    }
  }

  const handleDeleteRole = async (roleId: string) => {
    try {
      const response = await deleteRole(roleId)
      if (response.success) {
        setRoles(roles.filter((role) => role.id !== roleId))
        toast({
          title: "Success",
          description: "Role deleted successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete role",
        variant: "destructive",
      })
    }
  }

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    setNewRole((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permissionId]: checked,
      },
    }))
  }

  const openEditDialog = (role: any) => {
    setEditingRole(role)
    setNewRole({
      name: role.name,
      description: role.description,
      permissions: { ...role.permissions },
    })
    setIsDialogOpen(true)
  }

  const openCreateDialog = () => {
    setEditingRole(null)
    setNewRole({ name: "", description: "", permissions: {} })
    setIsDialogOpen(true)
  }

  const getRoleIcon = (roleName: string) => {
    if (roleName.includes("Corporate")) return Crown
    if (roleName.includes("Administrator")) return Shield
    if (roleName.includes("Manager")) return Building
    if (roleName.includes("Staff")) return Users
    return UserCheck
  }

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
            Role Management
          </h1>
          <p className="text-gray-600 mt-1">Define roles and their permissions</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog} className="bg-gradient-to-r from-primary-600 to-primary-700">
              <Plus className="mr-2 h-4 w-4" />
              Create Role
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingRole ? "Edit Role" : "Create New Role"}</DialogTitle>
              <DialogDescription>
                {editingRole ? "Modify the role and its permissions." : "Define a new role with specific permissions."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  className="col-span-3"
                  placeholder="Role name"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newRole.description}
                  onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                  className="col-span-3"
                  placeholder="Role description"
                  rows={3}
                />
              </div>
              <div className="space-y-4">
                <Label className="text-sm font-medium">Permissions</Label>
                {permissionCategories.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <h4 className="font-medium text-sm text-primary-900">{category.name}</h4>
                    <div className="grid grid-cols-1 gap-2 pl-4">
                      {category.permissions.map((permission) => (
                        <div key={permission.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={permission.id}
                            checked={newRole.permissions[permission.id] || false}
                            onCheckedChange={(checked) => handlePermissionChange(permission.id, checked as boolean)}
                          />
                          <div className="flex-1">
                            <Label htmlFor={permission.id} className="text-sm font-medium">
                              {permission.name}
                            </Label>
                            <p className="text-xs text-gray-500">{permission.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={editingRole ? handleUpdateRole : handleCreateRole}>
                <Save className="mr-2 h-4 w-4" />
                {editingRole ? "Update Role" : "Create Role"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Roles</p>
                <p className="text-2xl font-bold text-primary-900 mt-1">{roles.length}</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600">
                <Shield className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-purple-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Admin Roles</p>
                <p className="text-2xl font-bold text-primary-900 mt-1">
                  {roles.filter((r) => r.name.includes("Administrator")).length}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600">
                <Crown className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Roles</p>
                <p className="text-2xl font-bold text-primary-900 mt-1">{roles.filter((r) => r.isActive).length}</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600">
                <UserCheck className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-orange-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Custom Roles</p>
                <p className="text-2xl font-bold text-primary-900 mt-1">{roles.filter((r) => r.isCustom).length}</p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600">
                <Settings className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Roles Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Roles</CardTitle>
              <CardDescription>Manage system roles and their permissions</CardDescription>
            </div>
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoles.map((role) => {
                  const RoleIcon = getRoleIcon(role.name)
                  const permissionCount = Object.values(role.permissions).filter(Boolean).length
                  const totalPermissions = permissionCategories.reduce(
                    (sum, category) => sum + category.permissions.length,
                    0,
                  )

                  return (
                    <TableRow key={role.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg bg-primary-100">
                            <RoleIcon className="h-5 w-5 text-primary-600" />
                          </div>
                          <div>
                            <div className="font-medium text-primary-900">{role.name}</div>
                            {role.isCustom && (
                              <Badge variant="outline" className="mt-1">
                                Custom
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600 max-w-xs">
                        <p className="truncate">{role.description}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span>{role.userCount || 0}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="text-sm">
                            {permissionCount}/{totalPermissions}
                          </div>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary-600 h-2 rounded-full"
                              style={{ width: `${(permissionCount / totalPermissions) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={role.isActive ? "default" : "secondary"}>
                          {role.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => openEditDialog(role)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          {role.isCustom && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteRole(role.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
