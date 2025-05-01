"use client"

import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { AddUserDialog } from "./add-user-dialog"
import { EditUserDialog } from "./edit-user-dialog"
import { DataTable } from "@/components/ui/data-table"

interface User {
  id: string
  name: string
  email: string
  role: string
  contactNumber: string
  status: string
  createdAt: string
}

export function UserManagementContent() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "19a470c1-9196-48e6-a010-7de7e6318587",
      name: "Fayshal",
      email: "fayshal@gmail.com",
      role: "ADMIN",
      contactNumber: "9823893274",
      status: "ACTIVE",
      createdAt: "2025-05-01T11:48:59.751Z",
    }
  ])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <Badge variant="secondary">{row.original.role}</Badge>
      ),
    },
    {
      accessorKey: "contactNumber",
      header: "Contact",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.status === "ACTIVE" ? "success" : "destructive"}>
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleEditUser(row.original)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDeleteUser(row.original)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  const handleUserAdded = () => {
    // TODO: Refresh user list after adding a new user
    console.log("User added, refresh list")
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setIsEditDialogOpen(true)
  }

  const handleDeleteUser = (user: User) => {
    // TODO: Implement delete user functionality
    console.log("Delete user:", user)
  }

  const handleUserUpdated = () => {
    // TODO: Refresh user list after updating a user
    console.log("User updated, refresh list")
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold">User Management</h1>
        <AddUserDialog onUserAdded={handleUserAdded} />
      </div>

      {/* Table Section */}
      <DataTable<User, unknown>
        columns={columns}
        data={users}
        searchKey="name"
        pageSize={10}
      />

      {/* Edit Dialog */}
      <EditUserDialog
        user={selectedUser}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onUserUpdated={handleUserUpdated}
      />
    </div>
  )
} 