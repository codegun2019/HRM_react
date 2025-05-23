<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
      <!-- Modal Header -->
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">
            Delete Role
          </h3>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-500">
            <XMarkIcon class="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <!-- Modal Body -->
      <div class="px-6 py-4">
        <div class="flex items-center mb-4 text-red-600">
          <ExclamationTriangleIcon class="h-6 w-6 mr-2" />
          <span class="font-medium">Warning</span>
        </div>
        
        <p class="mb-4 text-gray-700">
          Are you sure you want to delete the role <span class="font-semibold">{{ role.name }}</span>? This action cannot be undone.
        </p>
        
        <div v-if="role.userCount > 0" class="p-3 bg-yellow-50 text-yellow-800 rounded-md mb-4">
          <div class="flex">
            <ExclamationTriangleIcon class="h-5 w-5 mr-2 flex-shrink-0" />
            <p>
              This role is currently assigned to <span class="font-semibold">{{ role.userCount }}</span> user(s). 
              Deleting this role will remove it from these users.
            </p>
          </div>
        </div>
        
        <div class="mt-6 flex justify-end space-x-3">
          <button 
            type="button" 
            @click="$emit('close')" 
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button 
            type="button" 
            @click="confirmDelete"
            :disabled="deleting"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 flex items-center"
          >
            <div v-if="deleting" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            <TrashIcon v-else class="h-4 w-4 mr-2" />
            {{ deleting ? 'Deleting...' : 'Delete Role' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { XMarkIcon, ExclamationTriangleIcon, TrashIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  role: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'confirm'])

const deleting = ref(false)

const confirmDelete = async () => {
  deleting.value = true
  try {
    await emit('confirm')
  } catch (error) {
    console.error('Error deleting role:', error)
  } finally {
    deleting.value = false
  }
}
</script>
