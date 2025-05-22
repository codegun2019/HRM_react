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
        <h2 class="text-xl font-bold mb-1">Create an account</h2>
        <p class="text-gray-500 text-sm mb-6">Enter your details to create your account</p>
        
        <form @submit.prevent="handleRegister">
          <div class="mb-4">
            <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input 
              id="username"
              v-model="username" 
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
              placeholder="johndoe"
              required
            />
          </div>
          
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              id="email"
              v-model="email" 
              type="email" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
              placeholder="your.email@example.com"
              required
            />
          </div>
          
          <div class="mb-4">
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
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path v-if="showPassword" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle v-if="showPassword" cx="12" cy="12" r="3"></circle>
                  <path v-if="!showPassword" d="M2 2l20 20"></path>
                  <path v-if="!showPassword" d="M6.71 6.7C3.93 8.24 2 12 2 12s1.93 3.76 4.71 5.3a8.96 8.96 0 0 0 10.58 0c2.78-1.54 4.71-5.3 4.71-5.3s-1.93-3.76-4.71-5.3a8.96 8.96 0 0 0-10.58 0z"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div class="mb-6">
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <div class="relative">
              <input 
                id="confirmPassword"
                v-model="confirmPassword" 
                :type="showConfirmPassword ? 'text' : 'password'" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                required
              />
              <button 
                type="button" 
                @click="showConfirmPassword = !showConfirmPassword" 
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path v-if="showConfirmPassword" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle v-if="showConfirmPassword" cx="12" cy="12" r="3"></circle>
                  <path v-if="!showConfirmPassword" d="M2 2l20 20"></path>
                  <path v-if="!showConfirmPassword" d="M6.71 6.7C3.93 8.24 2 12 2 12s1.93 3.76 4.71 5.3a8.96 8.96 0 0 0 10.58 0c2.78-1.54 4.71-5.3 4.71-5.3s-1.93-3.76-4.71-5.3a8.96 8.96 0 0 0-10.58 0z"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <button 
            type="submit" 
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            :disabled="loading"
          >
            <span v-if="loading">Creating account...</span>
            <span v-else>Register</span>
          </button>
        </form>
        
        <div class="mt-6 pt-4 border-t border-gray-100 text-center">
          <p class="text-sm text-gray-600">
            Already have an account? 
            <NuxtLink to="/login" class="text-blue-600 hover:text-blue-800">Login</NuxtLink>
          </p>
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
const { register } = useAuth()
const { $swal } = useNuxtApp()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')

const handleRegister = async () => {
  error.value = ''
  loading.value = true

  if (password.value !== confirmPassword.value) {
    error.value = 'รหัสผ่านไม่ตรงกัน'
    loading.value = false
    return
  }

  try {
    await register(username.value, email.value, password.value)

    await $swal.fire({
      icon: 'success',
      title: 'สมัครสำเร็จ!',
      text: 'กำลังนำไปยังหน้าล็อกอิน...',
      timer: 2000,
      showConfirmButton: false,
    })
  } catch (err: any) {
    error.value = err?.data?.message || 'เกิดข้อผิดพลาด'
    $swal.fire('ไม่สำเร็จ', error.value, 'error')
  } finally {
    loading.value = false
  }
}
</script>


<style scoped>
.input { @apply w-full p-2 border rounded mb-4; }
.btn { @apply w-full bg-blue-600 text-white p-2 rounded; }
</style>
