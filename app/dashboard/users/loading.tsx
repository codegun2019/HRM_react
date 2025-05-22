import { UsersTableSkeleton } from "@/components/users-table-skeleton"

export default function UsersLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <div className="h-10 w-28 rounded-xl bg-gray-200 animate-pulse" />
      </div>

      <UsersTableSkeleton />
    </div>
  )
}
