"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, MoreHorizontal, Pencil, Trash2, ShieldCheck } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { RoleForm, type RoleFormValues } from "@/components/roles/role-form"
import { RolePermissionsForm } from "@/components/roles/role-permissions-form"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { Skeleton } from "@/components/ui/skeleton"

// Mock roles data
const initialRoles = [
  {
    id: 1,
    name: "Administrator",
    description: "Full system access",
    permissions: [
      { id: 1, name: "users.view" },
      { id: 2, name: "users.create" },
      { id: 3, name: "users.edit" },
      { id: 4, name: "users.delete" },
      { id: 5, name: "roles.view" },
      { id: 6, name: "roles.create" },
      { id: 7, name: "roles.edit" },
      { id: 8, name: "roles.delete" },
      { id: 9, name: "permissions.view" },
      { id: 10, name: "permissions.assign" },
      { id: 11, name: "dashboard.view" },
      { id: 12, name: "logs.view" },
      { id: 13, name: "settings.view" },
      { id: 14, name: "settings.edit" },
    ],
  },
  {
    id: 2,
    name: "Manager",
    description: "Manage users and content",
    permissions: [
      { id: 1, name: "users.view" },
      { id: 2, name: "users.create" },
      { id: 3, name: "users.edit" },
      { id: 5, name: "roles.view" },
      { id: 11, name: "dashboard.view" },
    ],
  },
  {
    id: 3,
    name: "Editor",
    description: "Edit content only",
    permissions: [
      { id: 1, name: "users.view" },
      { id: 5, name: "roles.view" },
      { id: 11, name: "dashboard.view" },
    ],
  },
  {
    id: 4,
    name: "Viewer",
    description: "View-only access",
    permissions: [
      { id: 1, name: "users.view" },
      { id: 5, name: "roles.view" },
      { id: 9, name: "permissions.view" },
      { id: 11, name: "dashboard.view" },
    ],
  },
]

export default function RolesPage() {
  const [roles, setRoles] = useState(initialRoles)
  const [isLoading, setIsLoading] = useState(true)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [permissionsModalOpen, setPermissionsModalOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedRole, setSelectedRole] = useState<any>(null)

  // Simulate API call to fetch roles
  useEffect(() => {
    const fetchRoles = async () => {
      setIsLoading(true)
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setRoles(initialRoles)
      setIsLoading(false)
    }

    fetchRoles()
  }, [])

  // Handle create role
  const handleCreateRole = async (data: RoleFormValues) => {
    setIsProcessing(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create new role with generated ID
      const newRole = {
        id: roles.length + 1,
        name: data.name,
        description: data.description,
        permissions: [],
      }

      setRoles([...roles, newRole])
    } finally {
      setIsProcessing(false)
    }
  }

  // Handle edit role
  const handleEditRole = async (data: RoleFormValues) => {
    if (!selectedRole) return

    setIsProcessing(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update role
      const updatedRoles = roles.map((role) => {
        if (role.id === selectedRole.id) {
          return {
            ...role,
            name: data.name,
            description: data.description,
          }
        }
        return role
      })

      setRoles(updatedRoles)
    } finally {
      setIsProcessing(false)
    }
  }

  // Handle delete role
  const handleDeleteRole = async () => {
    if (!selectedRole) return

    setIsProcessing(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Remove role
      const updatedRoles = roles.filter((role) => role.id !== selectedRole.id)
      setRoles(updatedRoles)
    } finally {
      setIsProcessing(false)
      setDeleteDialogOpen(false)
    }
  }

  // Handle update permissions
  const handleUpdatePermissions = async (permissionIds: number[]) => {
    if (!selectedRole) return

    setIsProcessing(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Get all permissions
      const allPermissions = [
        { id: 1, name: "users.view" },
        { id: 2, name: "users.create" },
        { id: 3, name: "users.edit" },
        { id: 4, name: "users.delete" },
        { id: 5, name: "roles.view" },
        { id: 6, name: "roles.create" },
        { id: 7, name: "roles.edit" },
        { id: 8, name: "roles.delete" },
        { id: 9, name: "permissions.view" },
        { id: 10, name: "permissions.assign" },
        { id: 11, name: "dashboard.view" },
        { id: 12, name: "logs.view" },
        { id: 13, name: "settings.view" },
        { id: 14, name: "settings.edit" },
      ]

      // Filter permissions by selected IDs
      const selectedPermissions = allPermissions.filter((p) => permissionIds.includes(p.id))

      // Update role permissions
      const updatedRoles = roles.map((role) => {
        if (role.id === selectedRole.id) {
          return {
            ...role,
            permissions: selectedPermissions,
          }
        }
        return role
      })

      setRoles(updatedRoles)
    } finally {
      setIsProcessing(false)
    }
  }

  // Open edit modal with selected role data
  const openEditModal = (role: any) => {
    setSelectedRole(role)
    setEditModalOpen(true)
  }

  // Open permissions modal with selected role
  const openPermissionsModal = (role: any) => {
    setSelectedRole(role)
    setPermissionsModalOpen(true)
  }

  // Open delete dialog with selected role
  const openDeleteDialog = (role: any) => {
    setSelectedRole(role)
    setDeleteDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Roles Management</h1>
        <Button className="rounded-xl" onClick={() => setCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Role
        </Button>
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>All Roles</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
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
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead className="w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell className="font-medium">{role.name}</TableCell>
                      <TableCell>{role.description}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {role.permissions.slice(0, 3).map((permission) => (
                            <Badge
                              key={permission.id}
                              variant="outline"
                              className="rounded-full bg-blue-50 text-blue-700 border-blue-200 text-xs"
                            >
                              {permission.name}
                            </Badge>
                          ))}
                          {role.permissions.length > 3 && (
                            <Badge
                              variant="outline"
                              className="rounded-full bg-gray-50 text-gray-700 border-gray-200 text-xs"
                            >
                              +{role.permissions.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => openPermissionsModal(role)}
                          >
                            <ShieldCheck className="h-4 w-4" />
                            <span className="sr-only">Manage permissions</span>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => openEditModal(role)}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openDeleteDialog(role)} className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Role Modal */}
      <RoleForm
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSubmit={handleCreateRole}
        isEditMode={false}
      />

      {/* Edit Role Modal */}
      {selectedRole && (
        <RoleForm
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          onSubmit={handleEditRole}
          defaultValues={{
            name: selectedRole.name,
            description: selectedRole.description,
          }}
          isEditMode={true}
        />
      )}

      {/* Manage Permissions Modal */}
      {selectedRole && (
        <RolePermissionsForm
          open={permissionsModalOpen}
          onOpenChange={setPermissionsModalOpen}
          onSubmit={handleUpdatePermissions}
          roleId={selectedRole.id}
          roleName={selectedRole.name}
          initialPermissionIds={selectedRole.permissions.map((p: any) => p.id)}
        />
      )}

      {/* Delete Role Confirmation */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Role"
        description={`Are you sure you want to delete the ${selectedRole?.name} role? This action cannot be undone and may affect users with this role.`}
        onConfirm={handleDeleteRole}
        isLoading={isProcessing}
        confirmText="Delete"
        variant="destructive"
      />
    </div>
  )
}
