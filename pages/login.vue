<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <form @submit.prevent="handleLogin" class="bg-white p-6 rounded shadow-md w-full max-w-sm">
      <h2 class="text-xl mb-4">Login</h2>
      <input v-model="username" type="text" placeholder="Username" class="input" />
      <input v-model="password" type="password" placeholder="Password" class="input" />
      <button type="submit" class="btn">Login</button>
      <p class="text-sm mt-2">No account? <NuxtLink to="/register" class="text-blue-600">Register</NuxtLink></p>
    </form>
  </div>
</template>

<script setup>
const username = ref('')
const password = ref('')
const { login } = useAuth()

const handleLogin = async () => {
  try {
    await login(username.value, password.value)
  } catch (err) {
    alert('Login failed')
  }
}
</script>

<style scoped>
.input { @apply w-full p-2 border rounded mb-4; }
.btn { @apply w-full bg-blue-600 text-white p-2 rounded; }
</style>
