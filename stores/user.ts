// 📄 File: stores/user.ts

import { defineStore } from 'pinia'
import { useRuntimeConfig, useCookie } from '#imports'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as any[],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchUsers() {
      const config = useRuntimeConfig()
      const token = useCookie('auth_token')

      try {
        const response = await $fetch(`${config.public.apiBase}/users`, {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        })

        this.users = response.map((user: any) => ({
          id: user.id,
          username: user.username,
          email: user.email,
          role_id: user.role?.id ?? null,
          role: user.role?.name || '—',
          status: user.is_active ? 'Active' : 'Inactive',
          lastLogin: user.last_login
            ? new Date(user.last_login).toLocaleString()
            : '—',
        }))
      } catch (error: any) {
        throw new Error(error?.data?.message || 'Failed to fetch users')
      }
    },

    async createUser(userData: any) {
      const config = useRuntimeConfig()
      const token = useCookie('auth_token')

      try {
        const response = await $fetch(`${config.public.apiBase}/users`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
          body: userData,
        })

        this.users.push({
          id: response.id,
          username: response.username,
          email: response.email,
          role_id: response.role?.id ?? null,
          role: response.role?.name || '—',
          status: response.is_active ? 'Active' : 'Inactive',
          lastLogin: response.last_login
            ? new Date(response.last_login).toLocaleString()
            : '—',
        })

        return response
      } catch (error: any) {
        this.error = error?.data?.message || 'Failed to create user'
        throw error
      }
    },

    async updateUser(userData: any) {
      const config = useRuntimeConfig()
      const token = useCookie('auth_token')

      try {
        const response = await $fetch(`${config.public.apiBase}/users/${userData.id}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
          body: {
            username: userData.username,
            email: userData.email,
            password: userData.password || undefined,
            role_id: userData.role_id,
            is_active: userData.is_active,
          },
        })

        const index = this.users.findIndex(u => u.id === response.id)
        if (index !== -1) {
          this.users[index] = {
            id: response.id,
            username: response.username,
            email: response.email,
            role_id: response.role?.id ?? null,
            role: response.role?.name || '—',
            status: response.is_active ? 'Active' : 'Inactive',
            lastLogin: response.last_login
              ? new Date(response.last_login).toLocaleString()
              : '—',
          }
        }

        return response
      } catch (error: any) {
        throw new Error(error?.data?.message || 'Failed to update user')
      }
    },

    async deleteUser(userId: number) {
      const config = useRuntimeConfig()
      const token = useCookie('auth_token')

      try {
        await $fetch(`${config.public.apiBase}/users/${userId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        })

        this.users = this.users.filter(u => u.id !== userId)
      } catch (error: any) {
        this.error = error?.data?.message || 'Failed to delete user'
        throw error
      }
    },
  },
})
