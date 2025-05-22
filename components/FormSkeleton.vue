<template>
  <div class="space-y-6">
    <div v-for="i in fields" :key="`field-${i}`" class="space-y-1">
      <SkeletonLoader className="h-4 w-24 mb-1" />
      <SkeletonLoader className="h-10 w-full rounded-md" />
    </div>
    
    <div class="flex justify-end">
      <SkeletonLoader className="h-10 w-32 rounded-md" />
    </div>
  </div>
</template>

<script setup>
import SkeletonLoader from './SkeletonLoader.vue';

defineProps({
  fields: {
    type: Number,
    default: 4
  }
})
</script>
