<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Loading Bar -->
    <LoadingBar />

    <!-- Mobile Header -->
    <div class="md:hidden bg-white border-b px-4 py-3 flex items-center justify-between">
      <div class="flex items-center">
        <button @click="sidebarOpen = !sidebarOpen" class="mr-2">
          <Bars3Icon class="h-6 w-6 text-gray-700" />
        </button>
        <div class="flex items-center">
          <div class="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
            <ShieldCheckIcon class="h-5 w-5" />
          </div>
          
            <span v-if="loading">กำลังโหลด...</span>
            <span v-else-if="error" class="text-red-500 font-bold text-lg">{{ error }}</span>
            <span v-else class="mt-4 text-gray-700 text-lg font-bold text-lg">{{ message }}</span>
        </div>
      </div>
    </div>

    <div class="flex flex-1">
      <!-- Sidebar -->
      <div :class="[
        'fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-xl transition-transform duration-300 ease-in-out md:relative md:translate-x-0 -translate-x-full flex-shrink-0 flex flex-col',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0 md:static'
      ]">
        <!-- Logo and Brand -->
        <div class="h-16 flex items-center px-4 border-b">
          <div class="flex items-center">
            <div class="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
              <ShieldCheckIcon class="h-5 w-5" />
            </div>
            <!-- <span class="font-bold text-lg">AdminPanel</span> -->
            <span v-if="loading">กำลังโหลด...</span>
            <span v-else-if="error" class="text-red-500 font-bold text-lg">{{ error }}</span>
            <span v-else class="mt-4 text-gray-700 text-lg font-bold text-lg">{{ message }}</span>
          </div>
          <button @click="sidebarOpen = false" class="ml-auto md:hidden">
            <XMarkIcon class="h-6 w-6" />
          </button>
        </div>

        <!-- Sidebar Navigation -->
        <nav class="flex-1 overflow-y-auto py-4">
          <ul class="space-y-1 px-2">
            <li v-for="item in menuItems" :key="item.path">
              <NuxtLink
                :to="item.path"
                class="flex items-center space-x-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all hover:bg-gray-100 text-gray-700"
                :class="{ 'bg-blue-50 text-blue-600': $route.path === item.path }"
              >
                <component :is="item.icon" class="h-5 w-5 mr-3" />
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Logout Button -->
        <div class="p-4 border-t">
          <button @click="handleLogout" class="flex items-center space-x-3 rounded-2xl px-4 py-3 w-full text-sm text-gray-700 hover:bg-gray-100">
            <ArrowRightOnRectangleIcon class="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex-1 overflow-x-hidden">
        <!-- Desktop Header -->
        <header class="bg-white border-b h-16 hidden md:flex items-center justify-between px-6">
          <div></div>
          <div class="flex items-center space-x-4">
            <button class="relative">
              <BellIcon class="h-6 w-6 text-gray-700" />
              <span class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">1</span>
            </button>
            <div class="relative" ref="desktopUserMenuRef">
              <button @click="desktopUserMenuOpen = !desktopUserMenuOpen" class="flex items-center">
                <!-- <span class="mr-1">{{ user?.username || 'Admin User' }}</span> -->
                  <span v-if="loading">กำลังโหลด...</span>
                  <span v-else-if="error" class="mr-1">{{ error }}</span>
                  <span v-else class="mr-1">{{ user?.username || message }}</span>
                <ChevronDownIcon class="h-5 w-5" />
              </button>
              <div v-if="desktopUserMenuOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <NuxtLink to="/dashboard/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</NuxtLink>
                <NuxtLink to="/dashboard/settings" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</NuxtLink>
                <button @click.prevent="handleLogout" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
              </div>
            </div>
          </div>
        </header>

        <!-- Page Content -->
        <main class="p-6">
          <slot />
        </main>
      </div>
    </div>

    <!-- Toast Notification -->
    <Transition name="fade">
      <div
        v-if="showToast"
        class="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm z-50 border-l-4 border-green-500"
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <CheckCircleIcon class="h-5 w-5 text-green-500" />
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-900">Login Successful</p>
            <p class="mt-1 text-sm text-gray-500">You have been logged in successfully.</p>
          </div>
          <div class="ml-auto pl-3">
            <div class="-mx-1.5 -my-1.5">
              <button
                @click="showToast = false"
                class="inline-flex rounded-md p-1.5 text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                <span class="sr-only">Dismiss</span>
                <XMarkIcon class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useDashboard } from '~/composables/useDashboard'
import { useAuth } from '~/composables/useAuth'
import {
  Bars3Icon,
  XMarkIcon,
  ShieldCheckIcon,
  BellIcon,
  ChevronDownIcon,
  Squares2X2Icon,
  UsersIcon,
  KeyIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline'

const { logout, user } = useAuth()
const { message, fetchDashboardMessage, loading, error } = useDashboard()
const sidebarOpen = ref(false)
const desktopUserMenuOpen = ref(false)
const showToast = ref(true)

const desktopUserMenuRef = ref(null)

const handleLogout = () => {
  logout()
}

// Close menus when clicking outside
const handleClickOutside = (event) => {
  if (desktopUserMenuRef.value && !desktopUserMenuRef.value.contains(event.target)) {
    desktopUserMenuOpen.value = false
  }
}
const {
  loading: authLoading,
  error: authError
} = useAuth()

onMounted(() => {
  document.addEventListener('click', handleClickOutside)

  fetchDashboardMessage()

  // ✅ แสดง toast ครั้งเดียวหลัง login
  if (sessionStorage.getItem('toastShown') !== 'true') {
    showToast.value = true
    sessionStorage.setItem('toastShown', 'true')
  }

  setTimeout(() => {
    showToast.value = false
  }, 5000)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const menuItems = [
  { name: 'Dashboard', icon: Squares2X2Icon, path: '/dashboard' },
  { name: 'Users', icon: UsersIcon, path: '/dashboard/users' },
  { name: 'Roles', icon: ShieldCheckIcon, path: '/dashboard/roles' },
  { name: 'Permissions', icon: KeyIcon, path: '/dashboard/permissions' },
  { name: 'Audit Logs', icon: ClipboardDocumentListIcon, path: '/dashboard/audit-logs' },
  { name: 'Settings', icon: Cog6ToothIcon, path: '/dashboard/settings' },
  { name: 'Profile', icon: UserIcon, path: '/dashboard/profile' },
]
</script>
