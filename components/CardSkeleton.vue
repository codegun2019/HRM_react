<template>
  <div class="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden p-6">
    <!-- Card Header -->
    <div class="mb-4">
      <SkeletonLoader className="h-6 w-1/3 mb-2" />
      <SkeletonLoader className="h-4 w-2/3" />
    </div>
    
    <!-- Card Content -->
    <div class="space-y-4">
      <div v-for="i in rows" :key="`row-${i}`">
        <SkeletonLoader className="h-4 w-full mb-1" />
        <SkeletonLoader className="h-4 w-5/6" />
      </div>
    </div>
    
    <!-- Card Footer -->
    <div class="mt-6 pt-4 border-t border-gray-200 flex justify-end">
      <SkeletonLoader className="h-10 w-32 rounded-md" />
    </div>
  </div>
</template>

<script setup>
import SkeletonLoader from './SkeletonLoader.vue';

defineProps({
  rows: {
    type: Number,
    default: 3
  }
})
</script>
