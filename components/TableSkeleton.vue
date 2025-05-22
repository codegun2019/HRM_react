<template>
  <div class="overflow-hidden">
    <!-- Table Header Skeleton -->
    <div class="bg-gray-50 px-6 py-3 border-b border-gray-200">
      <div class="flex space-x-4">
        <SkeletonLoader className="h-4 w-24" v-for="i in columns" :key="`header-${i}`" />
      </div>
    </div>
    
    <!-- Table Rows Skeleton -->
    <div v-for="row in rows" :key="`row-${row}`" class="border-b border-gray-200">
      <div class="px-6 py-4">
        <div class="flex items-center space-x-4">
          <SkeletonLoader 
            v-for="col in columns" 
            :key="`cell-${row}-${col}`" 
            :className="`h-4 ${col === 1 ? 'w-32' : col === columns ? 'w-16' : 'w-full max-w-[120px]'}`" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SkeletonLoader from './SkeletonLoader.vue';

defineProps({
  rows: {
    type: Number,
    default: 5
  },
  columns: {
    type: Number,
    default: 4
  }
})
</script>
