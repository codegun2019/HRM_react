<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <form @submit.prevent="handleRegister" class="bg-white p-6 rounded shadow-md w-full max-w-sm">
      <h2 class="text-xl mb-4">Register</h2>
      <input v-model="username" type="text" placeholder="Username" class="input" />
      <input v-model="email" type="email" placeholder="Email" class="input" />
      <input v-model="password" type="password" placeholder="Password" class="input" />
      <button type="submit" class="btn">Register</button>
      <p class="text-sm mt-2">Have an account? <NuxtLink to="/login" class="text-blue-600">Login</NuxtLink></p>
    </form>
  </div>
</template>

<script setup>
const username = ref('')
const email = ref('')
const password = ref('')
const { register } = useAuth()

const handleRegister = async () => {
  try {
    await register(username.value, email.value, password.value)
  } catch (err) {
    alert('Register failed')
  }
}
</script>

<style scoped>
.input { @apply w-full p-2 border rounded mb-4; }
.btn { @apply w-full bg-blue-600 text-white p-2 rounded; }
</style>
