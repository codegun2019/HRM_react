<template>
  <div class="bg-white rounded-lg shadow-md border border-gray-100 p-6">
    <SkeletonLoader className="h-6 w-1/3 mb-1" />
    <SkeletonLoader className="h-4 w-2/3 mb-6" />
    
    <div class="space-y-4">
      <div>
        <SkeletonLoader className="h-4 w-20 mb-1" />
        <SkeletonLoader className="h-10 w-full rounded-md" />
      </div>
      
      <div>
        <SkeletonLoader className="h-4 w-20 mb-1" />
        <SkeletonLoader className="h-10 w-full rounded-md" />
      </div>
      
      <SkeletonLoader className="h-10 w-full rounded-md mt-2" />
    </div>
    
    <div class="mt-6 pt-4 border-t border-gray-100">
      <SkeletonLoader className="h-4 w-40 mx-auto" />
    </div>
  </div>
</template>

<script setup>
import SkeletonLoader from './SkeletonLoader.vue';
</script>
