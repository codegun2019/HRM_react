"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus, Pencil, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PermissionForm, type PermissionFormValues } from "@/components/permissions/permission-form"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { Skeleton } from "@/components/ui/skeleton"

// Mock permissions data
const initialPermissions = [
  { id: 1, name: "users.view", resource: "users", action: "view", description: "View users" },
  { id: 2, name: "users.create", resource: "users", action: "create", description: "Create users" },
  { id: 3, name: "users.edit", resource: "users", action: "edit", description: "Edit users" },
  { id: 4, name: "users.delete", resource: "users", action: "delete", description: "Delete users" },
  { id: 5, name: "roles.view", resource: "roles", action: "view", description: "View roles" },
  { id: 6, name: "roles.create", resource: "roles", action: "create", description: "Create roles" },
  { id: 7, name: "roles.edit", resource: "roles", action: "edit", description: "Edit roles" },
  { id: 8, name: "roles.delete", resource: "roles", action: "delete", description: "Delete roles" },
  { id: 9, name: "permissions.view", resource: "permissions", action: "view", description: "View permissions" },
  {
    id: 10,
    name: "permissions.assign",
    resource: "permissions",
    action: "assign",
    description: "Assign permissions to roles",
  },
  { id: 11, name: "dashboard.view", resource: "dashboard", action: "view", description: "View dashboard" },
  { id: 12, name: "logs.view", resource: "logs", action: "view", description: "View audit logs" },
  { id: 13, name: "settings.view", resource: "settings", action: "view", description: "View settings" },
  { id: 14, name: "settings.edit", resource: "settings", action: "edit", description: "Edit settings" },
]

export default function PermissionsPage() {
  const [permissions, setPermissions] = useState(initialPermissions)
  const [filteredPermissions, setFilteredPermissions] = useState(initialPermissions)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedPermission, setSelectedPermission] = useState<any>(null)

  // Simulate API call to fetch permissions
  useEffect(() => {
    const fetchPermissions = async () => {
      setIsLoading(true)
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setPermissions(initialPermissions)
      setFilteredPermissions(initialPermissions)
      setIsLoading(false)
    }

    fetchPermissions()
  }, [])

  // Filter permissions based on search term
  useEffect(() => {
    const filtered = permissions.filter(
      (permission) =>
        permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        permission.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredPermissions(filtered)
  }, [searchTerm, permissions])

  // Handle create permission
  const handleCreatePermission = async (data: PermissionFormValues) => {
    setIsProcessing(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create new permission with generated ID
      const newPermission = {
        id: permissions.length + 1,
        name: data.name,
        resource: data.resource,
        action: data.action,
        description: data.description,
      }

      setPermissions([...permissions, newPermission])
    } finally {
      setIsProcessing(false)
    }
  }

  // Handle edit permission
  const handleEditPermission = async (data: PermissionFormValues) => {
    if (!selectedPermission) return

    setIsProcessing(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update permission
      const updatedPermissions = permissions.map((permission) => {
        if (permission.id === selectedPermission.id) {
          return {
            ...permission,
            name: data.name,
            resource: data.resource,
            action: data.action,
            description: data.description,
          }
        }
        return permission
      })

      setPermissions(updatedPermissions)
    } finally {
      setIsProcessing(false)
    }
  }

  // Handle delete permission
  const handleDeletePermission = async () => {
    if (!selectedPermission) return

    setIsProcessing(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Remove permission
      const updatedPermissions = permissions.filter((permission) => permission.id !== selectedPermission.id)
      setPermissions(updatedPermissions)
    } finally {
      setIsProcessing(false)
      setDeleteDialogOpen(false)
    }
  }

  // Open edit modal with selected permission data
  const openEditModal = (permission: any) => {
    setSelectedPermission(permission)
    setEditModalOpen(true)
  }

  // Open delete dialog with selected permission
  const openDeleteDialog = (permission: any) => {
    setSelectedPermission(permission)
    setDeleteDialogOpen(true)
  }

  // Get color for resource badge
  const getResourceColor = (resource: string) => {
    const colors: Record<string, string> = {
      users: "bg-blue-50 text-blue-700 border-blue-200",
      roles: "bg-purple-50 text-purple-700 border-purple-200",
      permissions: "bg-green-50 text-green-700 border-green-200",
      dashboard: "bg-yellow-50 text-yellow-700 border-yellow-200",
      logs: "bg-orange-50 text-orange-700 border-orange-200",
      settings: "bg-gray-50 text-gray-700 border-gray-200",
    }

    return colors[resource] || "bg-gray-50 text-gray-700 border-gray-200"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Permissions</h1>
        <Button className="rounded-xl" onClick={() => setCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Permission
        </Button>
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>System Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search permissions..."
                  className="pl-8 rounded-xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-xl">
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                    <div className="flex space-x-2">
                      <Skeleton className="h-9 w-9 rounded-md" />
                      <Skeleton className="h-9 w-9 rounded-md" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Resource</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPermissions.length > 0 ? (
                      filteredPermissions.map((permission) => (
                        <TableRow key={permission.id}>
                          <TableCell>{permission.id}</TableCell>
                          <TableCell className="font-medium">{permission.name}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`rounded-full px-2 py-0.5 text-xs ${getResourceColor(permission.resource)}`}
                            >
                              {permission.resource}
                            </Badge>
                          </TableCell>
                          <TableCell>{permission.description}</TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => openEditModal(permission)}
                              >
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-600"
                                onClick={() => openDeleteDialog(permission)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          No permissions found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Create Permission Modal */}
      <PermissionForm
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSubmit={handleCreatePermission}
        isEditMode={false}
      />

      {/* Edit Permission Modal */}
      {selectedPermission && (
        <PermissionForm
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          onSubmit={handleEditPermission}
          defaultValues={{
            name: selectedPermission.name,
            resource: selectedPermission.resource,
            action: selectedPermission.action,
            description: selectedPermission.description,
          }}
          isEditMode={true}
        />
      )}

      {/* Delete Permission Confirmation */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Permission"
        description={`Are you sure you want to delete the "${selectedPermission?.name}" permission? This action cannot be undone and may affect roles that use this permission.`}
        onConfirm={handleDeletePermission}
        isLoading={isProcessing}
        confirmText="Delete"
        variant="destructive"
      />
    </div>
  )
}
