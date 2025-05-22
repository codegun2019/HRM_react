<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">HR Dashboard</h1>
    
    <div v-if="loading" class="flex justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
    
    <div v-else-if="error" class="bg-red-50 p-4 rounded-md">
      <p class="text-red-800">{{ error }}</p>
    </div>
    
    <div v-else>
      <div class="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 class="text-xl font-bold mb-4">Employee Overview</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-gray-50 p-4 rounded-md">
            <h3 class="text-lg font-medium text-gray-500">Total Employees</h3>
            <p class="mt-2 text-3xl font-semibold text-gray-900">{{ employeeStats.total }}</p>
          </div>
          <div class="bg-gray-50 p-4 rounded-md">
            <h3 class="text-lg font-medium text-gray-500">New This Month</h3>
            <p class="mt-2 text-3xl font-semibold text-gray-900">{{ employeeStats.newThisMonth }}</p>
          </div>
          <div class="bg-gray-50 p-4 rounded-md">
            <h3 class="text-lg font-medium text-gray-500">Departments</h3>
            <p class="mt-2 text-3xl font-semibold text-gray-900">{{ employeeStats.departments }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">Recent Applications</h2>
          <button class="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm">View All</button>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(application, index) in applications" :key="index">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ application.name }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500">{{ application.position }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="{
                    'bg-green-100 text-green-800': application.status === 'Approved',
                    'bg-yellow-100 text-yellow-800': application.status === 'Pending',
                    'bg-red-100 text-red-800': application.status === 'Rejected'
                  }">
                    {{ application.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ application.appliedDate }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <a href="#" class="text-indigo-600 hover:text-indigo-900 mr-3">View</a>
                  <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta, useNuxtApp, ref, onMounted } from '#imports'

definePageMeta({
  middleware: ['auth', 'role'],
  meta: {
    requiredRole: 'hr'
  },
  layout: 'dashboard'
});

const { $axios } = useNuxtApp();
const loading = ref(true);
const error = ref(null);
const employeeStats = ref({
  total: 0,
  newThisMonth: 0,
  departments: 0
});
const applications = ref([]);

// Fetch HR dashboard data
const fetchData = async () => {
  try {
    const response = await $axios.get('/dashboard/hr');
    employeeStats.value = response.data.employeeStats;
    applications.value = response.data.applications;
  } catch (err: any) {
    error.value = err.message || 'Failed to load HR dashboard data';
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await fetchData();
});
</script>
