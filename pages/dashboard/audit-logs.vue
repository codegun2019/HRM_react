<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Audit Logs</h1>
      <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
        Export Logs
      </button>
    </div>
    
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="p-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold">System Activity</h2>
      </div>
      
      <div class="p-4">
        <div class="flex flex-col md:flex-row justify-between mb-4 space-y-2 md:space-y-0">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
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
                <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
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
                <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
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
                  <div class="text-sm font-medium text-gray-900">{{ log.user }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ log.action }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500">{{ log.resource }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500">{{ log.ipAddress }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="{
                    'bg-green-100 text-green-800': log.status === 'success',
                    'bg-red-100 text-red-800': log.status === 'error',
                    'bg-yellow-100 text-yellow-800': log.status === 'warning'
                  }">
                    {{ log.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ log.timestamp }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { definePageMeta } from '#imports'

definePageMeta({
  middleware: 'auth',
  layout: 'admin'
})

// Sample data - in a real app, this would come from an API
const logs = ref([
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
  },
  {
    user: 'manager',
    action: 'Settings Updated',
    resource: 'Settings',
    ipAddress: '192.168.1.2',
    status: 'success',
    timestamp: 'May 22, 2025, 02:45 PM'
  },
  {
    user: 'admin',
    action: 'Backup Created',
    resource: 'System',
    ipAddress: '192.168.1.1',
    status: 'success',
    timestamp: 'May 22, 2025, 03:20 PM'
  }
])
</script>
