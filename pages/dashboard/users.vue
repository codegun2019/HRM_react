<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold">Users Management</h1>
    </div>
    
    <div class="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div class="p-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold">All Users</h2>
      </div>
      
      <div class="p-4">
        <div class="relative mb-4">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
          </div>
          <input type="text" placeholder="Search users..." class="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
        </div>
        
        <DataLoader :loading="loading" :error="error" type="table" :skeleton-props="{ rows: 5, columns: 6 }">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-if="users.length === 0">
                  <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
                <tr v-for="(user, index) in users" :key="index">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">{{ user.username }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500">{{ user.email }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ user.role }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="{
                      'bg-green-100 text-green-800': user.status === 'Active',
                      'bg-red-100 text-red-800': user.status === 'Inactive',
                      'bg-yellow-100 text-yellow-800': user.status === 'Pending'
                    }">
                      {{ user.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ user.lastLogin }}
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
  PencilIcon, 
  TrashIcon 
} from '@heroicons/vue/24/outline'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard'
})

const loading = ref(true)
const error = ref(null)
const users = ref([])

onMounted(async () => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Sample data - in a real app, this would come from an API
    users.value = [
      {
        username: 'admin',
        email: 'admin@example.com',
        role: 'Administrator',
        status: 'Active',
        lastLogin: 'May 22, 2025, 11:27 PM'
      },
      {
        username: 'manager',
        email: 'manager@example.com',
        role: 'Manager',
        status: 'Active',
        lastLogin: 'May 22, 2025, 10:15 AM'
      }
    ]
  } catch (err) {
    error.value = err.message || 'Failed to load users'
  } finally {
    loading.value = false
  }
})
</script>
