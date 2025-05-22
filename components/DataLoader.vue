<template>
  <div>
    <div v-if="loading">
      <component 
        :is="getSkeletonComponent()" 
        v-bind="skeletonProps"
      />
    </div>
    <div v-else-if="error" class="bg-red-50 p-4 rounded-md">
      <div class="flex">
        <ExclamationCircleIcon class="h-5 w-5 text-red-500 mr-2" />
        <p class="text-red-800">{{ error }}</p>
      </div>
    </div>
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline'
import TableSkeleton from './TableSkeleton.vue'
import CardSkeleton from './CardSkeleton.vue'
import FormSkeleton from './FormSkeleton.vue'
import StatsCardSkeleton from './StatsCardSkeleton.vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: [String, null],
    default: null
  },
  type: {
    type: String,
    default: 'table',
    validator: (value) => ['table', 'card', 'form', 'stats'].includes(value)
  },
  skeletonProps: {
    type: Object,
    default: () => ({})
  }
})

const getSkeletonComponent = () => {
  const componentMap = {
    'table': TableSkeleton,
    'card': CardSkeleton,
    'form': FormSkeleton,
    'stats': StatsCardSkeleton
  }
  
  return componentMap[props.type] || TableSkeleton
}
</script>
