// composables/useDashboard.ts
import { useRuntimeConfig, useCookie } from '#imports'
import { ofetch } from 'ofetch'

export function useDashboard() {
  const config = useRuntimeConfig()
  const token = useCookie<string | null>('auth_token')

  const fetchDashboardData = async () => {
    return await ofetch(`${config.public.apiBase}/dashboard`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
  }

  const fetchUserInfo = async () => {
    return await ofetch(`${config.public.apiBase}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })
  }

  return {
    fetchDashboardData,
    fetchUserInfo,
  }
}
