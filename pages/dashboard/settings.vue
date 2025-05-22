<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Settings</h1>
      <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        Save Changes
      </button>
    </div>
    
    <!-- Settings Tabs -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
      <div class="flex border-b border-gray-200">
        <button 
          v-for="tab in tabs" 
          :key="tab.id" 
          @click="activeTab = tab.id" 
          class="px-6 py-3 text-sm font-medium focus:outline-none"
          :class="activeTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'"
        >
          {{ tab.name }}
        </button>
      </div>
    </div>
    
    <!-- General Settings -->
    <div v-if="activeTab === 'general'" class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="p-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold">General Settings</h2>
        <p class="text-sm text-gray-500">Manage your general dashboard preferences</p>
      </div>
      
      <div class="p-6 space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Language</label>
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
              <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
          <p class="text-xs text-gray-500 mb-2">Set your local time zone</p>
          <div class="relative">
            <select class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              <option>UTC</option>
              <option>UTC-12:00</option>
              <option>UTC-11:00</option>
              <option>UTC-10:00</option>
              <option>UTC-09:00</option>
              <option>UTC-08:00</option>
              <option>UTC-07:00</option>
              <option>UTC-06:00</option>
              <option>UTC-05:00</option>
              <option>UTC-04:00</option>
              <option>UTC-03:00</option>
              <option>UTC-02:00</option>
              <option>UTC-01:00</option>
              <option>UTC+01:00</option>
              <option>UTC+02:00</option>
              <option>UTC+03:00</option>
              <option>UTC+04:00</option>
              <option>UTC+05:00</option>
              <option>UTC+06:00</option>
              <option>UTC+07:00</option>
              <option>UTC+08:00</option>
              <option>UTC+09:00</option>
              <option>UTC+10:00</option>
              <option>UTC+11:00</option>
              <option>UTC+12:00</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
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
              <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Notifications Settings -->
    <div v-if="activeTab === 'notifications'" class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="p-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold">Notification Settings</h2>
        <p class="text-sm text-gray-500">Manage how you receive notifications</p>
      </div>
      
      <div class="p-6 space-y-6">
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-3">Email Notifications</h3>
          
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
            
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input id="system-updates" type="checkbox" class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded">
              </div>
              <div class="ml-3 text-sm">
                <label for="system-updates" class="font-medium text-gray-700">System Updates</label>
                <p class="text-gray-500">Receive email notifications for system updates and maintenance</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="border-t border-gray-200 pt-6">
          <h3 class="text-sm font-medium text-gray-700 mb-3">In-App Notifications</h3>
          
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
    <div v-if="activeTab === 'security'" class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="p-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold">Security Settings</h2>
        <p class="text-sm text-gray-500">Manage your account security</p>
      </div>
      
      <div class="p-6 space-y-6">
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-3">Change Password</h3>
          
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
              <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm">
                Update Password
              </button>
            </div>
          </div>
        </div>
        
        <div class="border-t border-gray-200 pt-6">
          <h3 class="text-sm font-medium text-gray-700 mb-3">Two-Factor Authentication</h3>
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
          
          <button class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Set Up Two-Factor Authentication
          </button>
        </div>
        
        <div class="border-t border-gray-200 pt-6">
          <h3 class="text-sm font-medium text-gray-700 mb-3">Session Management</h3>
          <p class="text-sm text-gray-500 mb-4">Manage your active sessions</p>
          
          <div class="bg-gray-50 p-4 rounded-md mb-4">
            <div class="flex justify-between items-center">
              <div>
                <p class="font-medium text-sm">Current Session</p>
                <p class="text-xs text-gray-500">New York, USA • Chrome on Windows • IP: 192.168.1.1</p>
              </div>
              <span class="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">Active</span>
            </div>
          </div>
          
          <button class="px-4 py-2 border border-red-300 text-red-700 rounded-md shadow-sm text-sm font-medium bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Sign Out All Other Sessions
          </button>
        </div>
      </div>
    </div>
    
    <!-- Appearance Settings -->
    <div v-if="activeTab === 'appearance'" class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="p-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold">Appearance Settings</h2>
        <p class="text-sm text-gray-500">Customize the look and feel of your dashboard</p>
      </div>
      
      <div class="p-6 space-y-6">
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-3">Theme</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="border border-gray-200 rounded-md p-4 cursor-pointer hover:border-blue-500 relative">
              <div class="h-20 bg-white border border-gray-200 rounded-md mb-2"></div>
              <p class="text-sm font-medium">Light</p>
              <div class="absolute top-2 right-2 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            
            <div class="border border-gray-200 rounded-md p-4 cursor-pointer hover:border-blue-500">
              <div class="h-20 bg-gray-900 border border-gray-700 rounded-md mb-2"></div>
              <p class="text-sm font-medium">Dark</p>
            </div>
            
            <div class="border border-gray-200 rounded-md p-4 cursor-pointer hover:border-blue-500">
              <div class="h-20 bg-gradient-to-r from-gray-100 to-gray-900 border border-gray-200 rounded-md mb-2"></div>
              <p class="text-sm font-medium">System</p>
            </div>
          </div>
        </div>
        
        <div class="border-t border-gray-200 pt-6">
          <h3 class="text-sm font-medium text-gray-700 mb-3">Layout</h3>
          
          <div class="space-y-4">
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input id="compact-layout" type="checkbox" class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded">
              </div>
              <div class="ml-3 text-sm">
                <label for="compact-layout" class="font-medium text-gray-700">Compact Layout</label>
                <p class="text-gray-500">Use a more compact layout to fit more content on the screen</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input id="sticky-header" type="checkbox" class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded">
              </div>
              <div class="ml-3 text-sm">
                <label for="sticky-header" class="font-medium text-gray-700">Sticky Header</label>
                <p class="text-gray-500">Keep the header visible when scrolling</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="border-t border-gray-200 pt-6">
          <h3 class="text-sm font-medium text-gray-700 mb-3">Font Size</h3>
          
          <div class="flex items-center space-x-2">
            <span class="text-sm">A</span>
            <input type="range" min="1" max="5" value="3" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
            <span class="text-lg">A</span>
          </div>
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

const tabs = [
  { id: 'general', name: 'General' },
  { id: 'notifications', name: 'Notifications' },
  { id: 'security', name: 'Security' },
  { id: 'appearance', name: 'Appearance' }
]

const activeTab = ref('general')
</script>
