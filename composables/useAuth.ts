import { useCookie } from '#imports'

const API_BASE_URL = 'http://localhost:3000' // เปลี่ยนตาม backend ของคุณ

export const useAuth = () => {
  const token = useCookie('auth_token')

  const login = async (username: string, password: string) => {
    const res = await $fetch<{ token: string }>(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      body: { username, password },
    })
    token.value = res.token
    await navigateTo('/dashboard')
  }

  const register = async (username: string, email: string, password: string) => {
    const res = await $fetch<{ token: string }>(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      body: { username, email, password },
    })
    token.value = res.token
    await navigateTo('/dashboard')
  }

  const getCurrentUser = async () => {
    if (!token.value) return null
    try {
      return await $fetch(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token.value}` },
      })
    } catch {
      return null
    }
  }

  const logout = () => {
    token.value = null
    navigateTo('/login')
  }

  return { login, register, getCurrentUser, logout, isAuthenticated: computed(() => !!token.value) }
}
