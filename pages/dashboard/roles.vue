<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Roles Management</h1>
      <button 
        @click="openAddRoleModal" 
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center shadow-md"
      >
        <PlusIcon class="h-5 w-5 mr-1" />
        Add Role
      </button>
    </div>
    
    <div class="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div class="p-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold">All Roles</h2>
      </div>
      
      <div class="p-4">
        <div class="relative mb-4">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
          </div>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search roles..." 
            class="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
        </div>
        
        <DataLoader :loading="loading" :error="error" type="table" :skeleton-props="{ rows: 5, columns: 5 }">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-if="filteredRoles.length === 0">
                  <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                    No roles found.
                  </td>
                </tr>
                <tr v-for="(role, index) in filteredRoles" :key="index">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <ShieldCheckIcon class="h-5 w-5 text-blue-600 mr-2" />
                      <div class="text-sm font-medium text-gray-900">{{ role.name }}</div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-500">{{ role.description }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex flex-wrap gap-1">
                      <span v-for="(permission, i) in role.permissions" :key="i" class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 flex items-center">
                        <KeyIcon class="h-3 w-3 mr-1" />
                        {{ permission }}
                      </span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center text-sm text-gray-900">
                      <UsersIcon class="h-4 w-4 mr-1 text-gray-400" />
                      {{ role.userCount }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      @click="openEditRoleModal(role)" 
                      class="text-blue-600 hover:text-blue-900 mr-3"
                      title="Edit Role"
                    >
                      <PencilIcon class="h-5 w-5 inline" />
                    </button>
                    <button 
                      @click="openDeleteRoleModal(role)" 
                      class="text-red-600 hover:text-red-900"
                      title="Delete Role"
                      :disabled="role.name === 'Administrator'"
                      :class="{ 'opacity-50 cursor-not-allowed': role.name === 'Administrator' }"
                    >
                      <TrashIcon class="h-5 w-5 inline" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </DataLoader>
      </div>
    </div>

    <!-- Role Form Modal (Add/Edit) -->
    <RoleFormModal 
      v-if="showRoleFormModal" 
      :role="selectedRole" 
      :is-edit="isEditMode" 
      @close="closeRoleFormModal" 
      @save="saveRole" 
    />

    <!-- Delete Role Modal -->
    <DeleteRoleModal 
      v-if="showDeleteRoleModal" 
      :role="selectedRole" 
      @close="closeDeleteRoleModal" 
      @confirm="deleteRole" 
    />

    <Toast
      :show="toast.show"
      :type="toast.type"
      :title="toast.title"
      :message="toast.message"
      @close="closeToast"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { definePageMeta } from '#imports'
import { 
  PlusIcon, 
  MagnifyingGlassIcon, 
  ShieldCheckIcon,
  KeyIcon,
  UsersIcon,
  PencilIcon, 
  TrashIcon 
} from '@heroicons/vue/24/outline'
import RoleFormModal from '~/components/roles/RoleFormModal.vue'
import DeleteRoleModal from '~/components/roles/DeleteRoleModal.vue'
import { useRoleStore } from '~/stores/role'
import Toast from '~/components/ui/Toast.vue'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard'
})

const roleStore = useRoleStore()
const loading = ref(true)
const error = ref(null)
const searchQuery = ref('')

// Modal states
const showRoleFormModal = ref(false)
const showDeleteRoleModal = ref(false)
const selectedRole = ref(null)
const isEditMode = ref(false)

const toast = ref({
  show: false,
  type: 'success',
  title: '',
  message: '',
})

// Fetch roles on mount
onMounted(async () => {
  try {
    await roleStore.fetchRoles()
  } catch (err) {
    error.value = err.message || 'Failed to load roles'
  } finally {
    loading.value = false
  }
})

// Computed property for filtered roles
const filteredRoles = computed(() => {
  if (!searchQuery.value) return roleStore.roles
  
  const query = searchQuery.value.toLowerCase()
  return roleStore.roles.filter(role => 
    role.name.toLowerCase().includes(query) || 
    role.description.toLowerCase().includes(query) || 
    role.permissions.some(p => p.toLowerCase().includes(query))
  )
})

// Modal functions
const openAddRoleModal = () => {
  selectedRole.value = {
    name: '',
    description: '',
    permissions: []
  }
  isEditMode.value = false
  showRoleFormModal.value = true
}

const openEditRoleModal = (role) => {
  selectedRole.value = { ...role }
  isEditMode.value = true
  showRoleFormModal.value = true
}

const closeRoleFormModal = () => {
  showRoleFormModal.value = false
  selectedRole.value = null
}

const openDeleteRoleModal = (role) => {
  // Prevent deleting Administrator role
  if (role.name === 'Administrator') {
    showToast('error', 'Cannot Delete', 'The Administrator role cannot be deleted.')
    return
  }
  
  selectedRole.value = role
  showDeleteRoleModal.value = true
}

const closeDeleteRoleModal = () => {
  showDeleteRoleModal.value = false
  selectedRole.value = null
}

// CRUD operations
const saveRole = async (roleData) => {
  try {
    if (isEditMode.value) {
      await roleStore.updateRole(roleData)
      showToast('success', 'Role Updated', `Role ${roleData.name} has been updated successfully.`)
    } else {
      await roleStore.createRole(roleData)
      showToast('success', 'Role Created', `Role ${roleData.name} has been created successfully.`)
    }
    closeRoleFormModal()
  } catch (err) {
    error.value = err.message
    showToast('error', 'Error', err.message || 'An error occurred while saving the role.')
  }
}

const deleteRole = async () => {
  try {
    const roleName = selectedRole.value.name
    await roleStore.deleteRole(selectedRole.value.id)
    showToast('success', 'Role Deleted', `Role ${roleName} has been deleted successfully.`)
    closeDeleteRoleModal()
  } catch (err) {
    error.value = err.message
    showToast('error', 'Error', err.message || 'An error occurred while deleting the role.')
  }
}

const showToast = (type, title, message) => {
  toast.value = {
    show: true,
    type,
    title,
    message,
  }
}

const closeToast = () => {
  toast.value.show = false
}
</script>
