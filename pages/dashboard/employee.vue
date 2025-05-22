<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Employee Dashboard</h1>
    
    <div v-if="loading" class="flex justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
    
    <div v-else-if="error" class="bg-red-50 p-4 rounded-md">
      <p class="text-red-800">{{ error }}</p>
    </div>
    
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Profile Summary -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex flex-col items-center">
          <div class="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <span class="text-2xl font-bold text-indigo-600">{{ userInitials }}</span>
          </div>
          <h2 class="text-xl font-bold">{{ user?.firstName }} {{ user?.lastName }}</h2>
          <p class="text-gray-500">{{ profile.position }}</p>
          <div class="mt-4 w-full">
            <div class="flex justify-between text-sm mb-1">
              <span>Profile Completion</span>
              <span>{{ profile.completionPercentage }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-indigo-600 h-2 rounded-full" :style="{ width: `${profile.completionPercentage}%` }"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Upcoming Events -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-bold mb-4">Upcoming Events</h2>
        <div v-if="events.length === 0" class="text-gray-500">
          No upcoming events
        </div>
        <ul v-else class="divide-y divide-gray-200">
          <li v-for="(event, index) in events" :key="index" class="py-3">
            <div class="flex items-center">
              <div class="bg-indigo-100 text-indigo-800 p-2 rounded-md mr-4">
                <span class="text-xs font-bold">{{ event.date }}</span>
              </div>
              <div>
                <p class="font-medium">{{ event.title }}</p>
                <p class="text-sm text-gray-500">{{ event.description }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      
      <!-- Tasks -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-bold mb-4">My Tasks</h2>
        <div v-if="tasks.length === 0" class="text-gray-500">
          No pending tasks
        </div>
        <ul v-else class="space-y-2">
          <li v-for="(task, index) in tasks" :key="index" class="flex items-center">
            <input 
              type="checkbox" 
              :id="`task-${index}`" 
              :checked="task.completed"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label :for="`task-${index}`" class="ml-3 text-sm" :class="{ 'line-through text-gray-400': task.completed }">
              {{ task.title }}
            </label>
          </li>
        </ul>
      </div>
      
      <!-- Time Off -->
      <div class="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-bold mb-4">Time Off</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="bg-gray-50 p-4 rounded-md">
            <h3 class="text-sm font-medium text-gray-500">Vacation Days</h3>
            <p class="mt-2 text-2xl font-semibold text-gray-900">{{ timeOff.vacation.used }} / {{ timeOff.vacation.total }}</p>
            <p class="text-sm text-gray-500">Days Used</p>
          </div>
          <div class="bg-gray-50 p-4 rounded-md">
            <h3 class="text-sm font-medium text-gray-500">Sick Days</h3>
            <p class="mt-2 text-2xl font-semibold text-gray-900">{{ timeOff.sick.used }} / {{ timeOff.sick.total }}</p>
            <p class="text-sm text-gray-500">Days Used</p>
          </div>
          <div class="bg-gray-50 p-4 rounded-md">
            <h3 class="text-sm font-medium text-gray-500">Personal Days</h3>
            <p class="mt-2 text-2xl font-semibold text-gray-900">{{ timeOff.personal.used }} / {{ timeOff.personal.total }}</p>
            <p class="text-sm text-gray-500">Days Used</p>
          </div>
        </div>
        <button class="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm">Request Time Off</button>
      </div>
      
      <!-- Recent Payslips -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-bold mb-4">Recent Payslips</h2>
        <div v-if="payslips.length === 0" class="text-gray-500">
          No recent payslips
        </div>
        <ul v-else class="divide-y divide-gray-200">
          <li v-for="(payslip, index) in payslips" :key="index" class="py-3">
            <div class="flex justify-between items-center">
              <div>
                <p class="font-medium">{{ payslip.period }}</p>
                <p class="text-sm text-gray-500">{{ payslip.date }}</p>
              </div>
              <button class="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                Download
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta, useNuxtApp, useAuth } from '#app'
import { computed, onMounted, ref } from 'vue';

definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard'
});

const { $axios } = useNuxtApp();
const { user } = useAuth();
const loading = ref(true);
const error = ref(null);
const profile = ref({
  position: '',
  completionPercentage: 0
});
const events = ref([]);
const tasks = ref([]);
const timeOff = ref({
  vacation: { used: 0, total: 0 },
  sick: { used: 0, total: 0 },
  personal: { used: 0, total: 0 }
});
const payslips = ref([]);

// Compute user initials
const userInitials = computed(() => {
  if (!user.value) return '';
  return `${user.value.firstName.charAt(0)}${user.value.lastName.charAt(0)}`;
});

// Fetch employee dashboard data
onMounted(async () => {
  try {
    const response = await $axios.get('/dashboard/employee');
    profile.value = response.data.profile;
    events.value = response.data.events;
    tasks.value = response.data.tasks;
    timeOff.value = response.data.timeOff;
    payslips.value = response.data.payslips;
  } catch (err: any) {
    error.value = err.message || 'Failed to load employee dashboard data';
  } finally {
    loading.value = false;
  }
});
</script>
