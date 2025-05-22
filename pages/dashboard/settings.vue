<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Settings</h1>
      <button 
        @click="saveSettings" 
        :disabled="saving"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center shadow-md disabled:opacity-50"
      >
        <CheckCircleIcon v-if="!saving" class="h-5 w-5 mr-1" />
        <div v-else class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-1"></div>
        {{ saving ? 'Saving...' : 'Save Changes' }}
      </button>
    </div>
    
    <!-- Settings Tabs -->
    <div class="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-6">
      <div class="flex border-b border-gray-200">
        <button 
          v-for="tab in tabs" 
          :key="tab.id" 
          @click="activeTab = tab.id" 
          class="px-6 py-3 text-sm font-medium focus:outline-none flex items-center"
          :class="activeTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'"
        >
          <component :is="tab.icon" class="h-5 w-5 mr-2" />
          {{ tab.name }}
        </button>
      </div>
    </div>
    
    <DataLoader :loading="loading" :error="error">
      <!-- General Settings -->
      <div v-if="activeTab === 'general'" class="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div class="p-4 border-b border-gray-200">
          <div class="flex items-center">
            <Cog6ToothIcon class="h-6 w-6 text-blue-600 mr-2" />
            <div>
              <h2 class="text-lg font-semibold">General Settings</h2>
              <p class="text-sm text-gray-500">Manage your general dashboard preferences</p>
            </div>
          </div>
        </div>
        
        <div class="p-6 space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <GlobeAltIcon class="h-4 w-4 mr-2" />
              Language
            </label>
            <p class="text-xs text-gray-500 mb-2">Select your preferred language</p>
            <div class="relative">
              <select class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
                <option>Japanese</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDownIcon class="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <ClockIcon class="h-4 w-4 mr-2" />
              Time Zone
            </label>
            <p class="text-xs text-gray-500 mb-2">Set your local time zone</p>
            <div class="relative">
              <select class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option>UTC</option>
                <option>UTC-05:00 (Eastern Time)</option>
                <option>UTC-08:00 (Pacific Time)</option>
                <option>UTC+01:00 (Central European Time)</option>
                <option>UTC+09:00 (Japan Standard Time)</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDownIcon class="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <CalendarIcon class="h-4 w-4 mr-2" />
              Date Format
            </label>
            <p class="text-xs text-gray-500 mb-2">Choose how dates are displayed</p>
            <div class="relative">
              <select class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                <option>MM/DD/YYYY</option>
                <option>DD/MM/YYYY</option>
                <option>YYYY-MM-DD</option>
                <option>YYYY/MM/DD</option>
                <option>DD-MMM-YYYY</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDownIcon class="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Notifications Settings -->
      <div v-if="activeTab === 'notifications'" class="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div class="p-4 border-b border-gray-200">
          <div class="flex items-center">
            <BellIcon class="h-6 w-6 text-blue-600 mr-2" />
            <div>
              <h2 class="text-lg font-semibold">Notification Settings</h2>
              <p class="text-sm text-gray-500">Manage how you receive notifications</p>
            </div>
          </div>
        </div>
        
        <div class="p-6 space-y-6">
          <div>
            <h3 class="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <EnvelopeIcon class="h-4 w-4 mr-2" />
              Email Notifications
            </h3>
            
            <div class="space-y-4">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input id="email-notifications" type="checkbox" class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded">
                </div>
                <div class="ml-3 text-sm">
                  <label for="email-notifications" class="font-medium text-gray-700">Email Notifications</label>
                  <p class="text-gray-500">Receive email notifications for important updates</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input id="security-alerts" type="checkbox" class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded">
                </div>
                <div class="ml-3 text-sm">
                  <label for="security-alerts" class="font-medium text-gray-700">Security Alerts</label>
                  <p class="text-gray-500">Receive email notifications for security-related events</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="border-t border-gray-200 pt-6">
            <h3 class="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <DevicePhoneMobileIcon class="h-4 w-4 mr-2" />
              In-App Notifications
            </h3>
            
            <div class="space-y-4">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input id="in-app-notifications" type="checkbox" class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded">
                </div>
                <div class="ml-3 text-sm">
                  <label for="in-app-notifications" class="font-medium text-gray-700">In-App Notifications</label>
                  <p class="text-gray-500">Receive notifications within the application</p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input id="notification-sound" type="checkbox" class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded">
                </div>
                <div class="ml-3 text-sm">
                  <label for="notification-sound" class="font-medium text-gray-700">Notification Sound</label>
                  <p class="text-gray-500">Play a sound when a notification is received</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Security Settings -->
      <div v-if="activeTab === 'security'" class="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div class="p-4 border-b border-gray-200">
          <div class="flex items-center">
            <ShieldCheckIcon class="h-6 w-6 text-blue-600 mr-2" />
            <div>
              <h2 class="text-lg font-semibold">Security Settings</h2>
              <p class="text-sm text-gray-500">Manage your account security</p>
            </div>
          </div>
        </div>
        
        <div class="p-6 space-y-6">
          <div>
            <h3 class="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <KeyIcon class="h-4 w-4 mr-2" />
              Change Password
            </h3>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input type="password" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input type="password" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <input type="password" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              </div>
              
              <div>
                <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm flex items-center">
                  <KeyIcon class="h-4 w-4 mr-2" />
                  Update Password
                </button>
              </div>
            </div>
          </div>
          
          <div class="border-t border-gray-200 pt-6">
            <h3 class="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <LockClosedIcon class="h-4 w-4 mr-2" />
              Two-Factor Authentication
            </h3>
            <p class="text-sm text-gray-500 mb-4">Add an extra layer of security to your account</p>
            
            <div class="flex items-start mb-4">
              <div class="flex items-center h-5">
                <input id="enable-2fa" type="checkbox" class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded">
              </div>
              <div class="ml-3 text-sm">
                <label for="enable-2fa" class="font-medium text-gray-700">Enable Two-Factor Authentication</label>
                <p class="text-gray-500">We'll ask for a verification code in addition to your password when you sign in</p>
              </div>
            </div>
            
            <button class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center">
              <LockClosedIcon class="h-4 w-4 mr-2" />
              Set Up Two-Factor Authentication
            </button>
          </div>
        </div>
      </div>
    </DataLoader>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { definePageMeta } from '#imports'
import { 
  CheckCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  ClockIcon,
  CalendarIcon,
  ChevronDownIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  KeyIcon,
  LockClosedIcon
} from '@heroicons/vue/24/outline'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard'
})

const loading = ref(true)
const error = ref(null)
const saving = ref(false)

const tabs = [
  { id: 'general', name: 'General', icon: Cog6ToothIcon },
  { id: 'notifications', name: 'Notifications', icon: BellIcon },
  { id: 'security', name: 'Security', icon: ShieldCheckIcon }
]

const activeTab = ref('general')

const saveSettings = async () => {
  saving.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    // Show success message or handle response
  } catch (err) {
    error.value = err.message || 'Failed to save settings'
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  try {
    // Simulate API call to load settings
    await new Promise(resolve => setTimeout(resolve, 1000))
  } catch (err) {
    error.value = err.message || 'Failed to load settings'
  } finally {
    loading.value = false
  }
})
</script>
