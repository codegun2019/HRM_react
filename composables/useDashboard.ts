// composables/useDashboard.ts
import { useCookie, useRuntimeConfig } from '#imports'
import { ref } from 'vue'
import { ofetch } from 'ofetch'

export const useDashboard = () => {
  const config = useRuntimeConfig()
  const API_BASE_URL = config.public.apiBase
  const token = useCookie('auth_token')

  const message = ref<string | null>(null)
  const error = ref<string | null>(null)
  const loading = ref(false)

  const fetchDashboardMessage = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await ofetch<{ message: string }>('/dashboard', {
        baseURL: API_BASE_URL,
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      message.value = response.message
    } catch (err: any) {
      error.value = err?.data?.message || err?.message || 'โหลดข้อมูลไม่สำเร็จ'
      console.error('❌ dashboard error:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    message,
    error,
    loading,
    fetchDashboardMessage
  }
}
