<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">My Profile</h1>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Profile Card -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div class="p-6 flex flex-col items-center">
          <div class="relative mb-4">
            <div class="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 text-2xl font-semibold">
              {{ userInitials }}
            </div>
            <button class="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          
          <h2 class="text-xl font-bold">{{ userData.fullName }}</h2>
          <p class="text-gray-500 mb-2">{{ userData.email }}</p>
          <span class="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
            {{ userData.role }}
          </span>
          
          <div class="w-full mt-6 space-y-4">
            <div>
              <p class="text-sm text-gray-500">Department</p>
              <p class="font-medium">{{ userData.department }}</p>
            </div>
            
            <div>
              <p class="text-sm text-gray-500">Location</p>
              <p class="font-medium">{{ userData.location }}</p>
            </div>
            
            <div>
              <p class="text-sm text-gray-500">Member Since</p>
              <p class="font-medium">{{ userData.memberSince }}</p>
            </div>
            
            <div>
              <p class="text-sm text-gray-500">Last Login</p>
              <p class="font-medium">{{ userData.lastLogin }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Profile Details -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden lg:col-span-2">
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
        
        <!-- Information Tab -->
        <div v-if="activeTab === 'information'" class="p-6">
          <h2 class="text-lg font-semibold mb-1">Profile Details</h2>
          <p class="text-sm text-gray-500 mb-6">Manage your personal information and account security</p>
          
          <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input type="text" v-model="userData.username" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" v-model="userData.fullName" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" v-model="userData.email" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" v-model="userData.phone" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <input type="text" v-model="userData.department" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input type="text" v-model="userData.location" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea v-model="userData.bio" rows="4" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>
            
            <div class="flex justify-end">
              <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm">
                Save Changes
              </button>
            </div>
          </div>
        </div>
        
        <!-- Security Tab -->
        <div v-if="activeTab === 'security'" class="p-6">
          <h2 class="text-lg font-semibold mb-1">Security</h2>
          <p class="text-sm text-gray-500 mb-6">Manage your password and account security</p>
          
          <div class="space-y-6">
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
                  <input id="enable-2fa-profile" type="checkbox" class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded">
                </div>
                <div class="ml-3 text-sm">
                  <label for="enable-2fa-profile" class="font-medium text-gray-700">Enable Two-Factor Authentication</label>
                  <p class="text-gray-500">We'll ask for a verification code in addition to your password when you sign in</p>
                </div>
              </div>
              
              <button class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Set Up Two-Factor Authentication
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

definePageMeta({
  middleware: 'auth',
  layout: 'admin'
})

const tabs = [
  { id: 'information', name: 'Information' },
  { id: 'security', name: 'Security' }
]

const activeTab = ref('information')

// Sample user data - in a real app, this would come from an API
const userData = ref({
  username: 'admin',
  fullName: 'Admin User',
  email: 'admin@example.com',
  phone: '+1 (555) 123-4567',
  role: 'Administrator',
  department: 'IT',
  location: 'New York, USA',
  memberSince: 'January 15, 2023',
  lastLogin: 'May 22, 2025',
  bio: 'System administrator with over 5 years of experience in managing enterprise applications and infrastructure.'
})

// Compute user initials from full name
const userInitials = computed(() => {
  if (!userData.value.fullName) return 'A'
  
  const nameParts = userData.value.fullName.split(' ')
  if (nameParts.length >= 2) {
    return `${nameParts[0][0]}${nameParts[1][0]}`
  }
  
  return userData.value.fullName[0]
})
</script>
