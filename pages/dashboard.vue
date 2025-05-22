<script setup>
definePageMeta({
  middleware: 'auth'
})

const user = ref(null)
const { getCurrentUser, logout } = useAuth()

onMounted(async () => {
  user.value = await getCurrentUser()
})
</script>

<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold">Dashboard</h1>
    <p class="mt-2">Hello, {{ user?.username || 'User' }}</p>
    <button @click="logout" class="mt-4 px-4 py-2 bg-red-500 text-white rounded">Logout</button>
  </div>
</template>
