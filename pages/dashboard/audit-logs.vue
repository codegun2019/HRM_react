<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Audit Logs</h1>
      <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center shadow-md">
        <ArrowDownTrayIcon class="h-5 w-5 mr-1" />
        Export Logs
      </button>
    </div>
    
    <div class="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div class="p-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold">System Activity</h2>
      </div>
      
      <div class="p-4">
        <div class="flex flex-col md:flex-row justify-between mb-4 space-y-2 md:space-y-0 md:space-x-4">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
            </div>
            <input type="text" placeholder="Search logs..." class="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          </div>
          
          <div class="flex space-x-2">
            <div class="relative">
              <select class="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="all">All Statuses</option>
                <option value="success">Success</option>
                <option value="error">Error</option>
                <option value="warning">Warning</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDownIcon class="h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <div class="relative">
              <select class="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="all">All Resources</option>
                <option value="users">Users</option>
                <option value="roles">Roles</option>
                <option value="permissions">Permissions</option>
                <option value="authentication">Authentication</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDownIcon class="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        
        <DataLoader :loading="loading" :error="error">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(log, index) in logs" :key="index">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <UserIcon class="h-5 w-5 text-gray-400 mr-2" />
                      <div class="text-sm font-medium text-gray-900">{{ log.user }}</div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <component :is="getActionIcon(log.action)" class="h-4 w-4 text-gray-400 mr-2" />
                      <div class="text-sm text-gray-900">{{ log.action }}</div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500">{{ log.resource }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <GlobeAltIcon class="h-4 w-4 text-gray-400 mr-2" />
                      <div class="text-sm text-gray-500">{{ log.ipAddress }}</div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full items-center" :class="{
                      'bg-green-100 text-green-800': log.status === 'success',
                      'bg-red-100 text-red-800': log.status === 'error',
                      'bg-yellow-100 text-yellow-800': log.status === 'warning'
                    }">
                      <CheckCircleIcon v-if="log.status === 'success'" class="h-3 w-3 mr-1" />
                      <XCircleIcon v-else-if="log.status === 'error'" class="h-3 w-3 mr-1" />
                      <ExclamationTriangleIcon v-else class="h-3 w-3 mr-1" />
                      {{ log.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center text-sm text-gray-500">
                      <ClockIcon class="h-4 w-4 mr-1" />
                      {{ log.timestamp }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </DataLoader>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { definePageMeta } from '#imports'
import { 
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  UserIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ArrowRightOnRectangleIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/vue/24/outline'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard'
})

const loading = ref(true)
const error = ref(null)
const logs = ref([])

const getActionIcon = (action) => {
  const iconMap = {
    'User Login': ArrowRightOnRectangleIcon,
    'User Created': PlusIcon,
    'Role Updated': PencilIcon,
    'Permission Assigned': CheckCircleIcon,
    'Failed Login Attempt': XCircleIcon,
    'User Deleted': TrashIcon,
    'Settings Updated': PencilIcon,
    'Backup Created': CheckCircleIcon
  }
  return iconMap[action] || CheckCircleIcon
}

onMounted(async () => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1800))
    
    // Sample data - in a real app, this would come from an API
    logs.value = [
      {
        user: 'admin',
        action: 'User Login',
        resource: 'Authentication',
        ipAddress: '192.168.1.1',
        status: 'success',
        timestamp: 'May 22, 2025, 08:30 AM'
      },
      {
        user: 'manager',
        action: 'User Created',
        resource: 'Users',
        ipAddress: '192.168.1.2',
        status: 'success',
        timestamp: 'May 22, 2025, 09:15 AM'
      },
      {
        user: 'admin',
        action: 'Role Updated',
        resource: 'Roles',
        ipAddress: '192.168.1.1',
        status: 'success',
        timestamp: 'May 22, 2025, 10:45 AM'
      },
      {
        user: 'editor',
        action: 'Permission Assigned',
        resource: 'Permissions',
        ipAddress: '192.168.1.3',
        status: 'success',
        timestamp: 'May 22, 2025, 11:20 AM'
      },
      {
        user: 'viewer',
        action: 'Failed Login Attempt',
        resource: 'Authentication',
        ipAddress: '192.168.1.4',
        status: 'error',
        timestamp: 'May 22, 2025, 12:10 PM'
      },
      {
        user: 'admin',
        action: 'User Deleted',
        resource: 'Users',
        ipAddress: '192.168.1.1',
        status: 'success',
        timestamp: 'May 22, 2025, 01:30 PM'
      }
    ]
  } catch (err) {
    error.value = err.message || 'Failed to load audit logs'
  } finally {
    loading.value = false
  }
})
</script>
