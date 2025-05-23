<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
      <!-- Modal Header -->
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ isEdit ? 'Edit Role' : 'Add New Role' }}
          </h3>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-500">
            <XMarkIcon class="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <!-- Modal Body -->
      <div class="px-6 py-4">
        <form @submit.prevent="handleSubmit">
          <div class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
              <input 
                id="name" 
                v-model="formData.name" 
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                id="description" 
                v-model="formData.description" 
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              ></textarea>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
              <div class="space-y-2 max-h-60 overflow-y-auto border border-gray-200 rounded-md p-3">
                <div 
                  v-for="permission in availablePermissions" 
                  :key="permission.name"
                  class="flex items-start"
                >
                  <div class="flex items-center h-5">
                    <input 
                      :id="permission.name" 
                      type="checkbox" 
                      :value="permission.name"
                      v-model="formData.permissions"
                      class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label :for="permission.name" class="font-medium text-gray-700">{{ permission.name }}</label>
                    <p class="text-gray-500">{{ permission.description }}</p>
                  </div>
                </div>
              </div>
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
              type="submit" 
              :disabled="saving"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 flex items-center"
            >
              <div v-if="saving" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              {{ saving ? 'Saving...' : 'Save' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  role: {
    type: Object,
    required: true
  },
  isEdit: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'save'])

const formData = ref({
  id: null,
  name: '',
  description: '',
  permissions: []
})

const saving = ref(false)

// Sample available permissions - in a real app, this would come from an API
const availablePermissions = ref([
  { name: 'users:manage', description: 'Full access to manage users' },
  { name: 'users:view', description: 'View user information' },
  { name: 'users:create', description: 'Create new users' },
  { name: 'roles:manage', description: 'Full access to manage roles' },
  { name: 'permissions:manage', description: 'Full access to manage permissions' },
  { name: 'settings:manage', description: 'Manage system settings' },
  { name: 'content:edit', description: 'Edit content' },
  { name: 'content:publish', description: 'Publish content' },
  { name: 'content:view', description: 'View content' },
  { name: 'reports:view', description: 'View reports' }
])

onMounted(() => {
  // Initialize form data with role data if editing
  if (props.role) {
    formData.value = { 
      ...props.role,
      permissions: [...props.role.permissions] // Create a copy of the permissions array
    }
  }
})

const handleSubmit = async () => {
  saving.value = true
  try {
    await emit('save', { ...formData.value })
  } catch (error) {
    console.error('Error saving role:', error)
  } finally {
    saving.value = false
  }
}
</script>
