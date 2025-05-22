<template>
  <Teleport to="body">
    <Transition name="confirm-fade">
      <div v-if="modelValue" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex min-h-screen items-center justify-center p-4">
          <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
          
          <Transition name="confirm-content" appear>
            <div class="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all">
              <!-- Icon -->
              <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full" :class="iconBgClass">
                <component :is="icon" class="h-6 w-6" :class="iconColorClass" />
              </div>
              
              <!-- Title -->
              <div class="mt-3 text-center sm:mt-5">
                <h3 class="text-lg font-medium leading-6 text-gray-900">
                  {{ title }}
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    {{ message }}
                  </p>
                </div>
              </div>
              
              <!-- Buttons -->
              <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button 
                  @click="confirm" 
                  class="inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                  :class="confirmButtonClass"
                >
                  {{ confirmText }}
                </button>
                <button 
                  @click="cancel" 
                  class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                >
                  {{ cancelText }}
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'
import { 
  ExclamationTriangleIcon, 
  QuestionMarkCircleIcon, 
  InformationCircleIcon,
  XCircleIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: 'Confirm Action'
  },
  message: {
    type: String,
    default: 'Are you sure you want to perform this action?'
  },
  type: {
    type: String,
    default: 'warning',
    validator: (value) => ['warning', 'danger', 'info', 'question'].includes(value)
  },
  confirmText: {
    type: String,
    default: 'Confirm'
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  }
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const icon = computed(() => {
  const icons = {
    warning: ExclamationTriangleIcon,
    danger: XCircleIcon,
    info: InformationCircleIcon,
    question: QuestionMarkCircleIcon
  }
  return icons[props.type]
})

const iconBgClass = computed(() => {
  const classes = {
    warning: 'bg-yellow-100',
    danger: 'bg-red-100',
    info: 'bg-blue-100',
    question: 'bg-gray-100'
  }
  return classes[props.type]
})

const iconColorClass = computed(() => {
  const classes = {
    warning: 'text-yellow-600',
    danger: 'text-red-600',
    info: 'text-blue-600',
    question: 'text-gray-600'
  }
  return classes[props.type]
})

const confirmButtonClass = computed(() => {
  const classes = {
    warning: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
    danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    info: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    question: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500'
  }
  return classes[props.type]
})

const confirm = () => {
  emit('update:modelValue', false)
  emit('confirm')
}

const cancel = () => {
  emit('update:modelValue', false)
  emit('cancel')
}
</script>

<style scoped>
.confirm-fade-enter-active,
.confirm-fade-leave-active {
  transition: opacity 0.3s ease;
}

.confirm-fade-enter-from,
.confirm-fade-leave-to {
  opacity: 0;
}

.confirm-content-enter-active {
  transition: all 0.3s ease-out;
}

.confirm-content-leave-active {
  transition: all 0.2s ease-in;
}

.confirm-content-enter-from,
.confirm-content-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
