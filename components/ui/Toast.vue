<template>
  <transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="visible" class="fixed bottom-4 right-4 z-50 w-full max-w-sm sm:max-w-md md:max-w-lg">
      <div 
        class="rounded-lg shadow-lg p-4 flex items-start"
        :class="{
          'bg-white border-l-4 border-green-500': type === 'success',
          'bg-white border-l-4 border-red-500': type === 'error',
          'bg-white border-l-4 border-blue-500': type === 'info',
          'bg-white border-l-4 border-yellow-500': type === 'warning'
        }"
      >
        <div class="flex-shrink-0">
          <CheckCircleIcon v-if="type === 'success'" class="h-5 w-5 text-green-500" />
          <ExclamationCircleIcon v-if="type === 'error'" class="h-5 w-5 text-red-500" />
          <InformationCircleIcon v-if="type === 'info'" class="h-5 w-5 text-blue-500" />
          <ExclamationTriangleIcon v-if="type === 'warning'" class="h-5 w-5 text-yellow-500" />
        </div>
        <div class="ml-3 w-0 flex-1 pt-0.5">
          <p class="text-sm font-medium text-gray-900">{{ title }}</p>
          <p class="mt-1 text-sm text-gray-500">{{ message }}</p>
        </div>
        <div class="ml-4 flex-shrink-0 flex">
          <button 
            @click="closeToast" 
            class="inline-flex text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon class="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { 
  CheckCircleIcon, 
  ExclamationCircleIcon, 
  InformationCircleIcon, 
  ExclamationTriangleIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  show: Boolean,
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error', 'info', 'warning'].includes(value)
  },
  title: String,
  message: String,
  duration: {
    type: Number,
    default: 5000
  },
  autoClose: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['close'])

const visible = ref(props.show)
let timer = null

const clearTimer = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

const closeToast = () => {
  clearTimer()
  visible.value = false
  emit('close')
}

// Watch external "show" prop
watch(() => props.show, (newVal) => {
  visible.value = newVal
  if (newVal && props.autoClose) {
    clearTimer()
    timer = setTimeout(closeToast, props.duration)
  }
})

// Cleanup timer when component unmounts
onUnmounted(clearTimer)

// Init on mount if props.show is true
onMounted(() => {
  if (props.show && props.autoClose) {
    timer = setTimeout(closeToast, props.duration)
  }
})
</script>
