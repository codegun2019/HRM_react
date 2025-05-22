<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div v-for="i in count" :key="`stat-${i}`" class="bg-white rounded-lg shadow-md p-4">
      <div class="flex justify-between">
        <div class="space-y-2">
          <SkeletonLoader className="h-4 w-24 mb-1" />
          <SkeletonLoader className="h-8 w-16" />
          <SkeletonLoader className="h-3 w-20" />
        </div>
        <SkeletonLoader className="h-12 w-12 rounded-lg" />
      </div>
    </div>
  </div>
</template>

<script setup>
import SkeletonLoader from './SkeletonLoader.vue';

defineProps({
  count: {
    type: Number,
    default: 4
  }
})
</script>
