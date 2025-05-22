"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { LoadingSpinner } from "@/components/loading-spinner"

// Mock permissions data
const allPermissions = [
  { id: 1, name: "users.view", description: "View users" },
  { id: 2, name: "users.create", description: "Create users" },
  { id: 3, name: "users.edit", description: "Edit users" },
  { id: 4, name: "users.delete", description: "Delete users" },
  { id: 5, name: "roles.view", description: "View roles" },
  { id: 6, name: "roles.create", description: "Create roles" },
  { id: 7, name: "roles.edit", description: "Edit roles" },
  { id: 8, name: "roles.delete", description: "Delete roles" },
  { id: 9, name: "permissions.view", description: "View permissions" },
  { id: 10, name: "permissions.assign", description: "Assign permissions to roles" },
  { id: 11, name: "dashboard.view", description: "View dashboard" },
  { id: 12, name: "logs.view", description: "View audit logs" },
  { id: 13, name: "settings.view", description: "View settings" },
  { id: 14, name: "settings.edit", description: "Edit settings" },
]

// Group permissions by resource
const groupedPermissions = allPermissions.reduce(
  (acc, permission) => {
    const [resource] = permission.name.split(".")
    if (!acc[resource]) {
      acc[resource] = []
    }
    acc[resource].push(permission)
    return acc
  },
  {} as Record<string, typeof allPermissions>,
)

interface RolePermissionsFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (permissionIds: number[]) => Promise<void>
  roleId: number
  roleName: string
  initialPermissionIds: number[]
}

export function RolePermissionsForm({
  open,
  onOpenChange,
  onSubmit,
  roleId,
  roleName,
  initialPermissionIds,
}: RolePermissionsFormProps) {
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load initial permissions
  useEffect(() => {
    if (open) {
      setIsLoading(true)
      // Simulate API delay
      setTimeout(() => {
        setSelectedPermissions(initialPermissionIds)
        setIsLoading(false)
      }, 500)
    }
  }, [open, initialPermissionIds])

  // Toggle permission selection
  const togglePermission = (permissionId: number) => {
    setSelectedPermissions((current) =>
      current.includes(permissionId) ? current.filter((id) => id !== permissionId) : [...current, permissionId],
    )
  }

  // Toggle all permissions in a group
  const toggleGroup = (groupPermissions: typeof allPermissions) => {
    const groupIds = groupPermissions.map((p) => p.id)
    const allSelected = groupPermissions.every((p) => selectedPermissions.includes(p.id))

    if (allSelected) {
      // Remove all permissions in this group
      setSelectedPermissions((current) => current.filter((id) => !groupIds.includes(id)))
    } else {
      // Add all permissions in this group
      setSelectedPermissions((current) => {
        const newPermissions = [...current]
        groupPermissions.forEach((p) => {
          if (!newPermissions.includes(p.id)) {
            newPermissions.push(p.id)
          }
        })
        return newPermissions
      })
    }
  }

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await onSubmit(selectedPermissions)
      onOpenChange(false)
    } catch (error) {
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] rounded-2xl">
        <DialogHeader>
          <DialogTitle>Manage Permissions for {roleName}</DialogTitle>
          <DialogDescription>Select the permissions that should be assigned to this role.</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner size={8} />
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-6">
              {Object.entries(groupedPermissions).map(([resource, permissions]) => (
                <div key={resource} className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`select-all-${resource}`}
                      checked={permissions.every((p) => selectedPermissions.includes(p.id))}
                      onCheckedChange={() => toggleGroup(permissions)}
                    />
                    <label htmlFor={`select-all-${resource}`} className="text-sm font-medium capitalize cursor-pointer">
                      {resource}
                    </label>
                  </div>
                  <div className="ml-6 space-y-2">
                    {permissions.map((permission) => (
                      <div key={permission.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`permission-${permission.id}`}
                          checked={selectedPermissions.includes(permission.id)}
                          onCheckedChange={() => togglePermission(permission.id)}
                        />
                        <label
                          htmlFor={`permission-${permission.id}`}
                          className="text-sm cursor-pointer flex items-center justify-between w-full"
                        >
                          <span className="font-medium">{permission.name}</span>
                          <span className="text-gray-500 text-xs">{permission.description}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                  <Separator />
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
            className="rounded-xl"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading || isSubmitting} className="rounded-xl">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Permissions"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
