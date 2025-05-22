"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect } from "react"
import { LoadingSpinner } from "@/components/loading-spinner"

// Mock audit log data
const auditLogs = [
  {
    id: 1,
    user: "admin",
    action: "User Login",
    resource: "Authentication",
    ip: "192.168.1.1",
    timestamp: "2025-05-22T08:30:00",
    status: "success",
  },
  {
    id: 2,
    user: "manager",
    action: "User Created",
    resource: "Users",
    ip: "192.168.1.2",
    timestamp: "2025-05-22T09:15:00",
    status: "success",
  },
  {
    id: 3,
    user: "admin",
    action: "Role Updated",
    resource: "Roles",
    ip: "192.168.1.1",
    timestamp: "2025-05-22T10:45:00",
    status: "success",
  },
  {
    id: 4,
    user: "editor",
    action: "Permission Assigned",
    resource: "Permissions",
    ip: "192.168.1.3",
    timestamp: "2025-05-22T11:20:00",
    status: "success",
  },
  {
    id: 5,
    user: "viewer",
    action: "Failed Login Attempt",
    resource: "Authentication",
    ip: "192.168.1.4",
    timestamp: "2025-05-22T12:10:00",
    status: "error",
  },
  {
    id: 6,
    user: "admin",
    action: "User Deleted",
    resource: "Users",
    ip: "192.168.1.1",
    timestamp: "2025-05-22T13:30:00",
    status: "success",
  },
  {
    id: 7,
    user: "manager",
    action: "Settings Updated",
    resource: "Settings",
    ip: "192.168.1.2",
    timestamp: "2025-05-22T14:45:00",
    status: "success",
  },
  {
    id: 8,
    user: "admin",
    action: "Backup Created",
    resource: "System",
    ip: "192.168.1.1",
    timestamp: "2025-05-22T15:20:00",
    status: "success",
  },
  {
    id: 9,
    user: "support",
    action: "Failed Permission Assignment",
    resource: "Permissions",
    ip: "192.168.1.5",
    timestamp: "2025-05-22T16:10:00",
    status: "error",
  },
  {
    id: 10,
    user: "admin",
    action: "System Maintenance",
    resource: "System",
    ip: "192.168.1.1",
    timestamp: "2025-05-22T17:30:00",
    status: "warning",
  },
]

export default function AuditLogsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [resourceFilter, setResourceFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [logs, setLogs] = useState<typeof auditLogs>([])

  // Simulate API call to fetch logs
  useEffect(() => {
    const fetchLogs = async () => {
      setIsLoading(true)
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setLogs(auditLogs)
      setIsLoading(false)
    }

    fetchLogs()
  }, [])

  // Filter logs based on search term and filters
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || log.status === statusFilter
    const matchesResource = resourceFilter === "all" || log.resource === resourceFilter

    return matchesSearch && matchesStatus && matchesResource
  })

  // Get unique resources for filter
  const resources = Array.from(new Set(logs.map((log) => log.resource)))

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Audit Logs</h1>
        <Button className="rounded-xl">
          <Download className="mr-2 h-4 w-4" />
          Export Logs
        </Button>
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>System Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search logs..."
                  className="pl-8 rounded-xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Filter:</span>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[130px] rounded-xl">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={resourceFilter} onValueChange={setResourceFilter}>
                  <SelectTrigger className="w-[150px] rounded-xl">
                    <SelectValue placeholder="Resource" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Resources</SelectItem>
                    {resources.map((resource) => (
                      <SelectItem key={resource} value={resource}>
                        {resource}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner size={8} />
              </div>
            ) : (
              <div className="rounded-2xl border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Resource</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.length > 0 ? (
                      filteredLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="font-medium">{log.user}</TableCell>
                          <TableCell>{log.action}</TableCell>
                          <TableCell>{log.resource}</TableCell>
                          <TableCell className="font-mono text-xs">{log.ip}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`rounded-full px-2 py-0.5 text-xs ${
                                log.status === "success"
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : log.status === "error"
                                    ? "bg-red-100 text-red-800 border-red-200"
                                    : "bg-yellow-100 text-yellow-800 border-yellow-200"
                              }`}
                            >
                              {log.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-gray-500">{formatDate(log.timestamp)}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No logs found.
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
    </div>
  )
}
