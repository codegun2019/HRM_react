<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-6">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold">AdminPanel</h1>
        <p class="text-gray-500">Secure admin dashboard</p>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
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
              <EyeSlashIcon class="w-4 h-4 text-back text-xs" />
              </button>
            </div>
          </div>
          
          <button 
            type="submit" 
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            :disabled="loading"
          >
            <span v-if="loading">Logging in...</span>
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
        
        <div v-if="error" class="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { EyeSlashIcon } from '@heroicons/vue/24/solid'
const username = ref('admin')
const password = ref('123456')
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

const { login } = useAuth()


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
