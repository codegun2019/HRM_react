<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-6">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white mb-4">
          <ShieldCheckIcon class="h-8 w-8" />
        </div>
        <h1 class="text-2xl font-bold">AdminPanel</h1>
        <p class="text-gray-500">Secure admin dashboard</p>
      </div>

      <div v-if="initialLoading">
        <LoginSkeleton />
      </div>
      <div v-else class="bg-white rounded-lg shadow-md border border-gray-100 p-6">
        <h2 class="text-xl font-bold mb-1">Login</h2>
        <p class="text-gray-500 text-sm mb-6">Enter your credentials to access your account</p>
        
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input 
              id="username"
              v-model="username" 
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
              required
            />
          </div>
          
          <div class="mb-6">
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div class="relative">
              <input 
                id="password"
                v-model="password" 
                :type="showPassword ? 'text' : 'password'" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                required
              />
              <button 
                type="button" 
                @click="showPassword = !showPassword" 
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
              >
                <EyeIcon v-if="showPassword" class="h-5 w-5" />
                <EyeSlashIcon v-else class="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <button 
            type="submit" 
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            :disabled="loading"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </span>
            <span v-else>Login</span>
          </button>
        </form>
        
        <div class="mt-6 pt-4 border-t border-gray-100 text-center">
          <a href="#" class="text-blue-600 hover:text-blue-800 text-sm">Forgot your password?</a>
          <div class="mt-3 text-sm text-gray-600">
            Don't have an account? 
            <NuxtLink to="/register" class="text-blue-600 hover:text-blue-800">Register</NuxtLink>
          </div>
        </div>
        
        <div v-if="error" class="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm flex items-center">
          <ExclamationCircleIcon class="h-5 w-5 mr-2 text-red-500" />
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { 
  ShieldCheckIcon, 
  EyeIcon, 
  EyeSlashIcon,
  ExclamationCircleIcon
} from '@heroicons/vue/24/outline'
import { definePageMeta } from '#imports'
import LoginSkeleton from '~/components/LoginSkeleton.vue'

const username = ref('admin')
const password = ref('123456')
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')
const initialLoading = ref(true)

const { login } = useAuth()


onMounted(async () => {
  // Simulate initial loading
  await new Promise(resolve => setTimeout(resolve, 1000))
  initialLoading.value = false
})

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  
  try {
    await login(username.value, password.value)
  } catch (err: any) {
    error.value = err?.message || 'Login failed. Please check your credentials.'
  } finally {
    loading.value = false
  }
}
</script>
