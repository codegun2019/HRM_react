<template>
  <div v-if="loading" class="fixed top-0 left-0 right-0 z-50">
    <div 
      class="h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 transition-all duration-300 ease-out"
      :style="{ width: `${progress}%` }"
    ></div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const loading = ref(false)
const progress = ref(0)
const router = useRouter()

// Simulate progress
function startLoading() {
  loading.value = true
  progress.value = 0
  
  // Quick initial progress
  setTimeout(() => {
    progress.value = 30
  }, 100)
  
  // Slower middle progress
  setTimeout(() => {
    progress.value = 60
  }, 300)
  
  // Slower end progress
  setTimeout(() => {
    progress.value = 80
  }, 600)
}

function completeLoading() {
  progress.value = 100
  
  // Hide after completion animation
  setTimeout(() => {
    loading.value = false
  }, 300)
}

// Watch for route changes
// Call startLoading initially to avoid conditional hook call
startLoading();

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    loading.value = true; // Ensure loading is set to true before startLoading
    startLoading()
  }
  next()
})

router.afterEach(() => {
  completeLoading()
})
</script>
