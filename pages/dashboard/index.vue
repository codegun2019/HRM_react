<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>
    
    <!-- Stats Cards -->
    <DataLoader :loading="loading" :error="error" type="stats" class="mb-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Total Users -->
        <div class="bg-white rounded-lg shadow-md p-4">
          <div class="flex justify-between">
            <div>
              <p class="text-gray-500 text-sm">Total Users</p>
              <p class="text-2xl font-bold">{{ stats.totalUsers }}</p>
              <p class="text-green-500 text-xs">+5% from last month</p>
              
            </div>
            <div class="bg-blue-100 p-2 rounded-lg">
              <UsersIcon class="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <!-- Total Roles -->
        <div class="bg-white rounded-lg shadow-md p-4">
          <div class="flex justify-between">
            <div>
              <p class="text-gray-500 text-sm">Total Roles</p>
              <p class="text-2xl font-bold">{{ stats.totalRoles }}</p>
              <p class="text-gray-500 text-xs">System roles</p>
            </div>
            <div class="bg-blue-100 p-2 rounded-lg">
              <ShieldCheckIcon class="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <!-- Active Users -->
        <div class="bg-white rounded-lg shadow-md p-4">
          <div class="flex justify-between">
            <div>
              <p class="text-gray-500 text-sm">Active Users</p>
              <p class="text-2xl font-bold">{{ stats.activeUsers }}</p>
              <p class="text-gray-500 text-xs">{{ Math.round((stats.activeUsers / stats.totalUsers) * 100) }}% of total users</p>
            </div>
            <div class="bg-blue-100 p-2 rounded-lg">
              <UserCircleIcon class="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <!-- Recent Logins -->
        <div class="bg-white rounded-lg shadow-md p-4">
          <div class="flex justify-between">
            <div>
              <p class="text-gray-500 text-sm">Recent Logins</p>
              <p class="text-2xl font-bold">{{ stats.recentLogins }}</p>
              <p class="text-gray-500 text-xs">Last 24 hours</p>
            </div>
            <div class="bg-blue-100 p-2 rounded-lg">
              <ClockIcon class="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>
    </DataLoader>
    
    <!-- Recent Users Table -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="px-4 py-3 border-b">
        <h2 class="font-bold">Recent Users</h2>
      </div>
      <DataLoader :loading="loading" :error="error" type="table" :skeleton-props="{ rows: 5, columns: 5 }">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(user, index) in recentUsers" :key="index">
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
                    'bg-red-100 text-red-800': user.status === 'Inactive'
                  }">
                    {{ user.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ user.lastLogin }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </DataLoader>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'
import {
  UsersIcon,
  ShieldCheckIcon,
  UserCircleIcon,
  ClockIcon
} from '@heroicons/vue/24/outline'

import { useRuntimeConfig, useCookie } from '#imports'

const { getCurrentUser } = useAuth()
const user = ref(null)
const dashboardMessage = ref('')
const stats = ref({
  totalUsers: 0,
  totalRoles: 0,
  activeUsers: 0,
  recentLogins: 0
})
const recentUsers = ref([])

const loading = ref(true)
const error = ref<string | null>(null)

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard'
})

const fetchDashboardData = async () => {
  const config = useRuntimeConfig()
  const token = useCookie<string | null>('auth_token')

  if (!token.value) {
    error.value = 'Missing token'
    loading.value = false
    return
  }

  try {
    console.log('✅ Sending token:', token.value)

    const [me, dashboard] = await Promise.all([
      $fetch(`${config.public.apiBase}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      }),
      $fetch(`${config.public.apiBase}/dashboard`, {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
    ])

    user.value = me
    dashboardMessage.value = dashboard.message

    stats.value = {
      totalUsers: 10,
      totalRoles: 5,
      activeUsers: 8,
      recentLogins: 3
    }

    recentUsers.value = [
      {
        username: me.username,
        email: `${me.username}@example.com`,
        role: me.role,
        status: 'Active',
        lastLogin: new Date().toLocaleString()
      }
    ]
  } catch (err: any) {
    console.error('❌ Dashboard error:', err)
    error.value = err?.data?.message || err?.message || 'Failed to load dashboard'
  } finally {
    loading.value = false
  }
}

onMounted(fetchDashboardData)
</script>