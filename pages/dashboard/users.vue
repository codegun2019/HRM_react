<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Users Management</h1>
      <button 
        @click="openAddUserModal" 
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center shadow-md"
      >
        <PlusIcon class="h-5 w-5 mr-1" />
        Add User
      </button>
    </div>
    
    <div class="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div class="p-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold">All Users</h2>
      </div>
      
      <div class="p-4">
        <div class="relative mb-4">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
          </div>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search users..." 
            class="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
        </div>
        
        <DataLoader :loading="loading" :error="error" type="table" :skeleton-props="{ rows: 5, columns: 6 }">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-if="filteredUsers.length === 0">
                  <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
                <tr v-for="(user, index) in filteredUsers" :key="index">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">{{ user.username }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500">{{ user.email }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ user.role }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="{
                      'bg-green-100 text-green-800': user.status === 'Active',
                      'bg-red-100 text-red-800': user.status === 'Inactive',
                      'bg-yellow-100 text-yellow-800': user.status === 'Pending'
                    }">
                      {{ user.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ user.lastLogin }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      @click="openEditUserModal(user)" 
                      class="text-blue-600 hover:text-blue-900 mr-3"
                      title="Edit User"
                    >
                      <PencilIcon class="h-5 w-5 inline" />
                    </button>
                    <button 
                      @click="openDeleteUserModal(user)" 
                      class="text-red-600 hover:text-red-900"
                      title="Delete User"
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

    <!-- User Form Modal (Add/Edit) -->
    <UserFormModal 
      v-if="showUserFormModal" 
      :user="selectedUser" 
      :is-edit="isEditMode" 
      @close="closeUserFormModal" 
      @save="saveUser" 
    />

    <!-- Delete User Modal -->
    <DeleteUserModal 
      v-if="showDeleteUserModal" 
      :user="selectedUser" 
      @close="closeDeleteUserModal" 
      @confirm="deleteUser" 
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
  PencilIcon, 
  TrashIcon 
} from '@heroicons/vue/24/outline'
import UserFormModal from '~/components/users/UserFormModal.vue'
import DeleteUserModal from '~/components/users/DeleteUserModal.vue'
import { useUserStore } from '~/stores/user'
import Toast from '~/components/ui/Toast.vue'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard'
})

const userStore = useUserStore()
const loading = ref(true)
const error = ref(null)
const searchQuery = ref('')

// Modal states
const showUserFormModal = ref(false)
const showDeleteUserModal = ref(false)
const selectedUser = ref(null)
const isEditMode = ref(false)

const toast = ref({
  show: false,
  type: 'success',
  title: '',
  message: '',
})

// Fetch users on mount
onMounted(async () => {
  try {
    await userStore.fetchUsers()
  } catch (err) {
    error.value = err.message || 'Failed to load users'
  } finally {
    loading.value = false
  }
})

// Computed property for filtered users
const filteredUsers = computed(() => {
  if (!searchQuery.value) return userStore.users
  
  const query = searchQuery.value.toLowerCase()
  return userStore.users.filter(user => 
    user.username.toLowerCase().includes(query) || 
    user.email.toLowerCase().includes(query) || 
    user.role.toLowerCase().includes(query)
  )
})

// Modal functions
const openAddUserModal = () => {
  selectedUser.value = {
    username: '',
    email: '',
    role: 'Employee',
    status: 'Active',
    password: ''
  }
  isEditMode.value = false
  showUserFormModal.value = true
}

const openEditUserModal = (user) => {
  selectedUser.value = { ...user }
  isEditMode.value = true
  showUserFormModal.value = true
}

const closeUserFormModal = () => {
  showUserFormModal.value = false
  selectedUser.value = null
}

const openDeleteUserModal = (user) => {
  selectedUser.value = user
  showDeleteUserModal.value = true
}

const closeDeleteUserModal = () => {
  showDeleteUserModal.value = false
  selectedUser.value = null
}

// CRUD operations
const saveUser = async (userData) => {
  try {
    if (isEditMode.value) {
      await userStore.updateUser(userData)
      showToast('success', 'User Updated', `User ${userData.username} has been updated successfully.`)
    } else {
      await userStore.createUser(userData)
      showToast('success', 'User Created', `User ${userData.username} has been created successfully.`)
    }
    closeUserFormModal()
  } catch (err) {
    error.value = err.message
    showToast('error', 'Error', err.message || 'An error occurred while saving the user.')
  }
}

const deleteUser = async () => {
  try {
    const username = selectedUser.value.username
    await userStore.deleteUser(selectedUser.value.id)
    showToast('success', 'User Deleted', `User ${username} has been deleted successfully.`)
    closeDeleteUserModal()
  } catch (err) {
    error.value = err.message
    showToast('error', 'Error', err.message || 'An error occurred while deleting the user.')
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
