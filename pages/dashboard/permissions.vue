<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Permissions</h1>
      <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center shadow-md">
        <PlusIcon class="h-5 w-5 mr-1" />
        Add Permission
      </button>
    </div>
    
    <div class="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div class="p-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold">System Permissions</h2>
      </div>
      
      <div class="p-4">
        <div class="relative mb-4">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
          </div>
          <input type="text" placeholder="Search permissions..." class="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
        </div>
        
        <DataLoader :loading="loading" :error="error">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permission</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roles</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-if="permissions.length === 0">
                  <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                    No permissions found.
                  </td>
                </tr>
                <tr v-for="(permission, index) in permissions" :key="index">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <KeyIcon class="h-5 w-5 text-blue-600 mr-2" />
                      <div class="text-sm font-medium text-gray-900">{{ permission.name }}</div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <component :is="getResourceIcon(permission.resource)" class="h-4 w-4 text-gray-400 mr-2" />
                      <div class="text-sm text-gray-500">{{ permission.resource }}</div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-500">{{ permission.description }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex flex-wrap gap-1">
                      <span v-for="(role, i) in permission.roles" :key="i" class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 flex items-center">
                        <ShieldCheckIcon class="h-3 w-3 mr-1" />
                        {{ role }}
                      </span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button class="text-blue-600 hover:text-blue-900 mr-3">
                      <PencilIcon class="h-5 w-5 inline" />
                    </button>
                    <button class="text-red-600 hover:text-red-900">
                      <TrashIcon class="h-5 w-5 inline" />
                    </button>
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
  PlusIcon,
  MagnifyingGlassIcon,
  KeyIcon,
  ShieldCheckIcon,
  UsersIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/vue/24/outline'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard'
})

const loading = ref(true)
const error = ref(null)
const permissions = ref([])

const getResourceIcon = (resource) => {
  const iconMap = {
    'Users': UsersIcon,
    'Roles': ShieldCheckIcon,
    'Permissions': KeyIcon,
    'Settings': Cog6ToothIcon,
    'Content': DocumentTextIcon
  }
  return iconMap[resource] || DocumentTextIcon
}

onMounted(async () => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1300))
    
    // Sample data - in a real app, this would come from an API
    permissions.value = [
      {
        name: 'users:manage',
        resource: 'Users',
        description: 'Full access to manage users including create, read, update, and delete operations',
        roles: ['Administrator']
      },
      {
        name: 'users:view',
        resource: 'Users',
        description: 'View user information and profiles',
        roles: ['Administrator', 'Manager']
      },
      {
        name: 'roles:manage',
        resource: 'Roles',
        description: 'Full access to manage roles including create, read, update, and delete operations',
        roles: ['Administrator']
      },
      {
        name: 'permissions:manage',
        resource: 'Permissions',
        description: 'Full access to manage permissions including create, read, update, and delete operations',
        roles: ['Administrator']
      },
      {
        name: 'content:edit',
        resource: 'Content',
        description: 'Edit and modify content',
        roles: ['Administrator', 'Editor']
      }
    ]
  } catch (err) {
    error.value = err.message || 'Failed to load permissions'
  } finally {
    loading.value = false
  }
})
</script>
