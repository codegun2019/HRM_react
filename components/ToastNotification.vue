<template>
  <Transition 
    name="toast" 
    @after-leave="$emit('remove', id)"
  >
    <div 
      v-if="visible"
      class="fixed z-50 flex w-full max-w-sm overflow-hidden rounded-lg shadow-lg"
      :class="[
        positionClasses,
        typeClasses.bg
      ]"
      role="alert"
    >
      <div class="flex w-12 items-center justify-center" :class="typeClasses.accentBg">
        <component :is="typeIcon" class="h-6 w-6 text-white" />
      </div>
      
      <div class="flex-1 p-4">
        <div class="flex items-start">
          <div class="flex-1">
            <p class="text-sm font-medium" :class="typeClasses.title">
              {{ title }}
            </p>
            <p v-if="message" class="mt-1 text-sm" :class="typeClasses.message">
              {{ message }}
            </p>
          </div>
          
          <button 
            @click="close" 
            class="ml-4 inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <XMarkIcon class="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <!-- Progress bar -->
      <div 
        v-if="duration > 0" 
        class="absolute bottom-0 left-0 h-1" 
        :class="typeClasses.progress"
        :style="{ width: `${progress}%`, transition: `width ${duration}ms linear` }"
      ></div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
  },
  duration: {
    type: Number,
    default: 5000 // 5 seconds
  },
  position: {
    type: String,
    default: 'top-right',
    validator: (value) => [
      'top-right', 'top-left', 'top-center',
      'bottom-right', 'bottom-left', 'bottom-center'
    ].includes(value)
  }
})

const emit = defineEmits(['remove', 'close'])

const visible = ref(true)
const progress = ref(100)
let progressTimer = null

const typeIcon = computed(() => {
  const icons = {
    success: CheckCircleIcon,
    error: XCircleIcon,
    warning: ExclamationTriangleIcon,
    info: InformationCircleIcon
  }
  return icons[props.type]
})

const typeClasses = computed(() => {
  const classes = {
    success: {
      bg: 'bg-white border-l-4 border-green-500',
      accentBg: 'bg-green-500',
      title: 'text-green-800',
      message: 'text-green-700',
      progress: 'bg-green-500'
    },
    error: {
      bg: 'bg-white border-l-4 border-red-500',
      accentBg: 'bg-red-500',
      title: 'text-red-800',
      message: 'text-red-700',
      progress: 'bg-red-500'
    },
    warning: {
      bg: 'bg-white border-l-4 border-yellow-500',
      accentBg: 'bg-yellow-500',
      title: 'text-yellow-800',
      message: 'text-yellow-700',
      progress: 'bg-yellow-500'
    },
    info: {
      bg: 'bg-white border-l-4 border-blue-500',
      accentBg: 'bg-blue-500',
      title: 'text-blue-800',
      message: 'text-blue-700',
      progress: 'bg-blue-500'
    }
  }
  return classes[props.type]
})

const positionClasses = computed(() => {
  const positions = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2'
  }
  return positions[props.position]
})

const close = () => {
  visible.value = false
  emit('close', props.id)
}

onMounted(() => {
  if (props.duration > 0) {
    // Start progress bar animation
    progress.value = 100
    setTimeout(() => {
      progress.value = 0
    }, 10)
    
    // Set timeout to close toast
    progressTimer = setTimeout(() => {
      close()
    }, props.duration)
  }
})

onBeforeUnmount(() => {
  if (progressTimer) {
    clearTimeout(progressTimer)
  }
})
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  transform: translateY(-30px);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
