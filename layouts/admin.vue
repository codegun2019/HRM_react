<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar - Desktop -->
    <div class="hidden md:flex md:flex-col md:w-64 md:bg-white md:border-r">
      <div class="flex items-center justify-between p-4 border-b">
        <div class="flex items-center">
          <div class="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
            <ShieldCheckIcon class="h-5 w-5 text-white" />
          </div>
          <span class="font-bold text-lg">AdminPanel</span>
        </div>
        <button class="text-gray-500">
          <XMarkIcon class="h-4 w-4 text-gray-500" />
        </button>
      </div>
      <nav class="flex-1 overflow-y-auto py-4">
        <NuxtLink to="/dashboard" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100" :class="{ 'bg-blue-50 text-blue-600': $route.path === '/dashboard' }">
          <Squares2X2Icon class="h-5 w-5 mr-3" />
          Dashboard
        </NuxtLink>

        <NuxtLink to="/dashboard/users" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100" :class="{ 'bg-blue-50 text-blue-600': $route.path.includes('/users') }">
          <UsersIcon class="h-5 w-5 mr-3" />
          Users
        </NuxtLink>

        <NuxtLink to="/dashboard/roles" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100" :class="{ 'bg-blue-50 text-blue-600': $route.path.includes('/roles') }">
          <KeyIcon class="h-5 w-5 mr-3" />
          Roles
        </NuxtLink>

        <NuxtLink to="/dashboard/permissions" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100" :class="{ 'bg-blue-50 text-blue-600': $route.path.includes('/permissions') }">
          <KeyIcon class="h-5 w-5 mr-3" />
          Permissions
        </NuxtLink>

        <NuxtLink to="/dashboard/audit-logs" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100" :class="{ 'bg-blue-50 text-blue-600': $route.path.includes('/audit-logs') }">
          <DocumentMagnifyingGlassIcon class="h-5 w-5 mr-3" />
          Audit Logs
        </NuxtLink>

        <NuxtLink to="/dashboard/settings" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100" :class="{ 'bg-blue-50 text-blue-600': $route.path.includes('/settings') }">
          <Cog6ToothIcon class="h-5 w-5 mr-3" />
          Settings
        </NuxtLink>

        <NuxtLink to="/dashboard/profile" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100" :class="{ 'bg-blue-50 text-blue-600': $route.path.includes('/profile') }">
          <UserCircleIcon class="h-5 w-5 mr-3" />
          Profile
        </NuxtLink>

        <button @click="logout" class="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
          <ArrowRightOnRectangleIcon class="h-5 w-5 mr-3" />
          Logout
        </button>

      </nav>
      <div class="p-4 border-t">
        <button @click="logout" class="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </div>

    <!-- Mobile Sidebar -->
    <div v-if="sidebarOpen" class="fixed inset-0 z-40 md:hidden">
      <div class="fixed inset-0 bg-gray-600 bg-opacity-75" @click="sidebarOpen = false"></div>
      <div class="relative flex flex-col w-full max-w-xs bg-white h-full">
        <div class="flex items-center justify-between p-4 border-b">
          <div class="flex items-center">
            <div class="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
              <Bars3Icon class="h-4 w-4" />
            </div>
            <span class="font-bold text-lg">AdminPanel</span>
          </div>
          <button @click="sidebarOpen = false" class="text-gray-500">
            <XMarkIcon class="h-5 w-5 text-gray-500" />

          </button>
        </div>
        <nav class="flex-1 overflow-y-auto py-4">
          <NuxtLink to="/dashboard" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100" :class="{ 'bg-blue-50 text-blue-600': $route.path === '/dashboard' }">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Dashboard
          </NuxtLink>
          <!-- Repeat other links -->
        </nav>
        <div class="p-4 border-t">
          <button @click="logout" class="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            <ArrowRightOnRectangleIcon class="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-h-0"> 
      <!-- Top Header -->
      <header class="bg-white border-b h-16 flex items-center justify-between px-4 shrink-0">
        <button @click="sidebarOpen = !sidebarOpen" class="md:hidden">
          <Bars3Icon class="h-6 w-6" />

        </button>
        <div class="flex items-center">
          <div class="relative user-menu">
            <button @click="userMenuOpen = !userMenuOpen" class="flex items-center">
              <span class="mr-1">Admin User</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
            <div v-if="userMenuOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
              <a @click.prevent="logout" href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 overflow-auto bg-gray-100">
        <div class="container mx-auto px-4 py-6">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
// 🔁 import heroicons (outline + solid)
import {
  XMarkIcon,
  Bars3Icon,
  ShieldCheckIcon,
  Squares2X2Icon,
  UsersIcon,
  KeyIcon,
  Cog6ToothIcon,
  DocumentMagnifyingGlassIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
} from '@heroicons/vue/24/outline'
const { logout } = useAuth()
const sidebarOpen = ref(false)
const userMenuOpen = ref(false)

// Close user menu when clicking outside
if (process.client) {
  window.addEventListener('click', (e) => {
    if (!e.target.closest('.user-menu')) {
      userMenuOpen.value = false
    }
  })
}
</script>
