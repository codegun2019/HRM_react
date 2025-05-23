import { ref, computed } from 'vue'
import { useCookie, useRouter, useRuntimeConfig } from '#imports'
import { ofetch } from 'ofetch'
import type { AuthUser } from '~/types/auth'

const user = ref<AuthUser | null>(null)

export function useAuth() {
  // เรียกใช้งานค่า config จาก nuxt.config.ts
  const config = useRuntimeConfig()
  const API_BASE_URL = config.public.apiBase

  // สร้าง cookie สำหรับเก็บ token
  const token = useCookie<string | null>('auth_token')

  // สร้างตัวแปรสำหรับเก็บข้อมูลผู้ใช้ และสถานะต่าง ๆ
  const user = ref<any>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // ใช้ Nuxt Router สำหรับนำทาง
  const router = useRouter()

  // ตั้งค่า fetcher สำหรับเรียก API พร้อมแนบ Authorization header
  const fetcher = ofetch.create({
    baseURL: API_BASE_URL,
    headers: () => token.value ? { Authorization: `Bearer ${token.value}` } : {},
  })

  // ฟังก์ชัน login
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

      // เปลี่ยนเส้นทางตาม role
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
        err?.response?._data?.message ||
        err?.message ||
        'เกิดข้อผิดพลาดระหว่างเข้าสู่ระบบ'

      error.value = message
      throw new Error(message)
    } finally {
      loading.value = false
    }
  }

  // ฟังก์ชัน register
  const register = async (username: string, email: string, password: string) => {
    loading.value = true
    error.value = null

    try {
      const res = await fetcher('/auth/register', {
        method: 'POST',
        body: { username, email, password },
        credentials: 'include',
      })

      token.value = res.token
      user.value = res.user

      await router.push('/dashboard')
      return res
    } catch (err: any) {
      error.value = err?.data?.message || 'ไม่สามารถสมัครสมาชิกได้'
      throw err
    } finally {
      loading.value = false
    }
  }

  // ดึงข้อมูลผู้ใช้ปัจจุบันจาก token
  const getCurrentUser = async () => {
    if (!token.value) {
      logout()
      return null
    }
    try {
      const userData = await fetcher('/auth/me')
      user.value = {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        role: userData.role,
        isActive: userData.is_active,
        createdAt: userData.created_at
      }
      return user.value
    } catch (err) {
      console.error('❌ ไม่สามารถดึงข้อมูลผู้ใช้:', err)
      return null
    }
  }

  // ออกจากระบบ
  const logout = () => {
    try {
      token.value = null
      user.value = null
      router.push('/login')
    } catch (err) {
      console.error('🚫 Logout ล้มเหลว:', err)
    }
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
