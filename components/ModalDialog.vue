<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="modelValue" class="fixed inset-0 z-50 overflow-y-auto" @click.self="closeModal">
        <div class="flex min-h-screen items-center justify-center p-4">
          <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click.self="closeModal"></div>
          
          <Transition name="modal-content" appear>
            <div class="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all sm:max-w-lg">
              <!-- Header -->
              <div class="mb-4 flex items-center justify-between">
                <h3 class="text-lg font-medium leading-6 text-gray-900">
                  {{ title }}
                </h3>
                <button 
                  @click="closeModal" 
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <XMarkIcon class="h-6 w-6" />
                </button>
              </div>
              
              <!-- Content -->
              <div class="mt-2">
                <slot></slot>
              </div>
              
              <!-- Footer -->
              <div class="mt-6 flex justify-end space-x-3">
                <button 
                  v-if="showCancelButton" 
                  @click="closeModal" 
                  class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {{ cancelText }}
                </button>
                <slot name="footer-buttons"></slot>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: 'Modal Title'
  },
  showCancelButton: {
    type: Boolean,
    default: true
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  }
})

const emit = defineEmits(['update:modelValue', 'close'])

const closeModal = () => {
  emit('update:modelValue', false)
  emit('close')
}
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-content-enter-active {
  transition: all 0.3s ease-out;
}

.modal-content-leave-active {
  transition: all 0.2s ease-in;
}

.modal-content-enter-from,
.modal-content-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
