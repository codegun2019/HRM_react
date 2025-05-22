import { ref, computed } from 'vue'
import { useCookie, useRouter, useRuntimeConfig } from '#imports'
import { ofetch } from 'ofetch'

export function useAuth() {
  const config = useRuntimeConfig()
  const API_BASE_URL = config.public.apiBase

  const token = useCookie<string | null>('auth_token')
  const user = ref<any>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const router = useRouter()
  const fetcher = ofetch.create({ baseURL: API_BASE_URL })

  const login = async (username: string, password: string) => {
    loading.value = true
    error.value = null

    try {
      const res = await fetcher('/auth/login', {
        method: 'POST',
        body: { username, password },
        credentials: 'include',
      })

      token.value = res.token
      user.value = res.user

      switch (user.value?.role) {
        case 'admin':
          await router.push('/dashboard')
          break
        case 'hr':
          await router.push('/dashboard/hr')
          break
        case 'employee':
          await router.push('/dashboard/employee')
          break
        default:
          await router.push('/dashboard')
      }

      return res
    } catch (err: any) {
      const message =
        err?.data?.message ||
        err?.response?._data?.message || // บางกรณี Nuxt จับ error แบบนี้
        err?.message ||
        'เกิดข้อผิดพลาดระหว่างเข้าสู่ระบบ'
    
      error.value = message
      throw new Error(message)
    } finally {
      loading.value = false
    }
  }

  const register = async (username: string, email: string, password: string) => {
    loading.value = true
    error.value = null

    try {
      const res = await $fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        body: { username, email, password },
        credentials: 'include',
      })

      token.value = res.token
      user.value = res.user

      await router.push('/dashboard')
      return res
    } catch (err: any) {
      console.error('❌ Registration failed:', err)
      error.value = err?.data?.message || 'Registration failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  const getCurrentUser = async () => {
    if (!token.value) return null

    try {
      const userData = await $fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      user.value = userData
      return userData
    } catch (err) {
      console.error('Failed to get current user:', err)
      return null
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    router.push('/login')
  }

  return {
    login,
    register,
    logout,
    getCurrentUser,
    user,
    token,
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    isAuthenticated: computed(() => !!token.value),
    isAdmin: computed(() => user.value?.role === 'admin'),
    isHR: computed(() => user.value?.role === 'hr'),
    isEmployee: computed(() => user.value?.role === 'employee'),
  }
}
