<template>
  <div>
    <slot></slot>
    
    <div v-for="position in positions" :key="position" class="fixed z-50" :class="positionClasses[position]">
      <ToastNotification
        v-for="toast in getToastsByPosition(position)"
        :key="toast.id"
        v-bind="toast"
        @remove="removeToast"
        @close="removeToast"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, provide } from 'vue'
import ToastNotification from './ToastNotification.vue'

const toasts = ref([])
const positions = ['top-right', 'top-left', 'top-center', 'bottom-right', 'bottom-left', 'bottom-center']

const positionClasses = {
  'top-right': 'top-0 right-0 p-4 flex flex-col space-y-4 items-end',
  'top-left': 'top-0 left-0 p-4 flex flex-col space-y-4 items-start',
  'top-center': 'top-0 left-1/2 -translate-x-1/2 p-4 flex flex-col space-y-4 items-center',
  'bottom-right': 'bottom-0 right-0 p-4 flex flex-col-reverse space-y-reverse space-y-4 items-end',
  'bottom-left': 'bottom-0 left-0 p-4 flex flex-col-reverse space-y-reverse space-y-4 items-start',
  'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 p-4 flex flex-col-reverse space-y-reverse space-y-4 items-center'
}

const getToastsByPosition = (position) => {
  return toasts.value.filter(toast => toast.position === position)
}

const addToast = (toast) => {
  const id = Date.now().toString()
  const newToast = {
    id,
    position: 'top-right',
    duration: 5000,
    ...toast
  }
  
  toasts.value.push(newToast)
  return id
}

const removeToast = (id) => {
  const index = toasts.value.findIndex(toast => toast.id === id)
  if (index !== -1) {
    toasts.value.splice(index, 1)
  }
}

const clearToasts = () => {
  toasts.value = []
}

// Provide toast methods to descendants
provide('toast', {
  add: addToast,
  remove: removeToast,
  clear: clearToasts
})
</script>
