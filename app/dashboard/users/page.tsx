"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { UsersTable } from "@/components/users-table"
import { UserForm, type UserFormValues } from "@/components/users/user-form"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { UsersTableSkeleton } from "@/components/users-table-skeleton"

// Mock users data
const initialUsers = [
  {
    id: 1,
    username: "admin",
    email: "admin@example.com",
    role_id: "1",
    role_name: "Administrator",
    is_active: true,
    last_login: "2025-05-21T08:30:00",
  },
  {
    id: 2,
    username: "manager",
    email: "manager@example.com",
    role_id: "2",
    role_name: "Manager",
    is_active: true,
    last_login: "2025-05-20T14:45:00",
  },
  {
    id: 3,
    username: "editor",
    email: "editor@example.com",
    role_id: "3",
    role_name: "Editor",
    is_active: true,
    last_login: "2025-05-19T11:20:00",
  },
  {
    id: 4,
    username: "viewer",
    email: "viewer@example.com",
    role_id: "4",
    role_name: "Viewer",
    is_active: false,
    last_login: "2025-05-15T09:10:00",
  },
  {
    id: 5,
    username: "support",
    email: "support@example.com",
    role_id: "5",
    role_name: "Support",
    is_active: true,
    last_login: "2025-05-21T07:55:00",
  },
  {
    id: 6,
    username: "analyst",
    email: "analyst@example.com",
    role_id: "6",
    role_name: "Analyst",
    is_active: true,
    last_login: "2025-05-20T16:30:00",
  },
  {
    id: 7,
    username: "developer",
    email: "developer@example.com",
    role_id: "7",
    role_name: "Developer",
    is_active: false,
    last_login: "2025-05-10T13:15:00",
  },
  {
    id: 8,
    username: "tester",
    email: "tester@example.com",
    role_id: "8",
    role_name: "Tester",
    is_active: true,
    last_login: "2025-05-18T10:45:00",
  },
]

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers)
  const [isLoading, setIsLoading] = useState(true)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)

  // Simulate API call to fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true)
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setUsers(initialUsers)
      setIsLoading(false)
    }

    fetchUsers()
  }, [])

  // Handle create user
  const handleCreateUser = async (data: UserFormValues) => {
    setIsProcessing(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create new user with generated ID
      const newUser = {
        id: users.length + 1,
        username: data.username,
        email: data.email,
        role_id: data.role_id,
        role_name: getRoleName(data.role_id),
        is_active: data.is_active,
        last_login: new Date().toISOString(),
      }

      setUsers([...users, newUser])
    } finally {
      setIsProcessing(false)
    }
  }

  // Handle edit user
  const handleEditUser = async (data: UserFormValues) => {
    if (!selectedUser) return

    setIsProcessing(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update user
      const updatedUsers = users.map((user) => {
        if (user.id === selectedUser.id) {
          return {
            ...user,
            username: data.username,
            email: data.email,
            role_id: data.role_id,
            role_name: getRoleName(data.role_id),
            is_active: data.is_active,
          }
        }
        return user
      })

      setUsers(updatedUsers)
    } finally {
      setIsProcessing(false)
    }
  }

  // Handle delete user
  const handleDeleteUser = async () => {
    if (!selectedUser) return

    setIsProcessing(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Remove user
      const updatedUsers = users.filter((user) => user.id !== selectedUser.id)
      setUsers(updatedUsers)
    } finally {
      setIsProcessing(false)
      setDeleteDialogOpen(false)
    }
  }

  // Helper function to get role name by ID
  const getRoleName = (roleId: string) => {
    const roles = [
      { id: "1", name: "Administrator" },
      { id: "2", name: "Manager" },
      { id: "3", name: "Editor" },
      { id: "4", name: "Viewer" },
      { id: "5", name: "Support" },
      { id: "6", name: "Analyst" },
      { id: "7", name: "Developer" },
      { id: "8", name: "Tester" },
    ]

    const role = roles.find((r) => r.id === roleId)
    return role ? role.name : "Unknown"
  }

  // Open edit modal with selected user data
  const openEditModal = (user: any) => {
    setSelectedUser(user)
    setEditModalOpen(true)
  }

  // Open delete dialog with selected user
  const openDeleteDialog = (user: any) => {
    setSelectedUser(user)
    setDeleteDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <Button className="rounded-xl" onClick={() => setCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {isLoading ? (
        <UsersTableSkeleton />
      ) : (
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>All Users</CardTitle>
          </CardHeader>
          <CardContent>
            <UsersTable users={users} onEdit={openEditModal} onDelete={openDeleteDialog} />
          </CardContent>
        </Card>
      )}

      {/* Create User Modal */}
      <UserForm
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSubmit={handleCreateUser}
        isEditMode={false}
      />

      {/* Edit User Modal */}
      {selectedUser && (
        <UserForm
          open={editModalOpen}
          onOpenChange={setEditModalOpen}
          onSubmit={handleEditUser}
          defaultValues={{
            username: selectedUser.username,
            email: selectedUser.email,
            role_id: selectedUser.role_id,
            is_active: selectedUser.is_active,
          }}
          isEditMode={true}
        />
      )}

      {/* Delete User Confirmation */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete User"
        description={`Are you sure you want to delete ${selectedUser?.username}? This action cannot be undone.`}
        onConfirm={handleDeleteUser}
        isLoading={isProcessing}
        confirmText="Delete"
        variant="destructive"
      />
    </div>
  )
}
