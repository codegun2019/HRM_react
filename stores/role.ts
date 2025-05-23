// stores/role.ts
import { defineStore } from 'pinia'
import { useRuntimeConfig, useCookie } from '#imports'
import { ofetch } from 'ofetch'

export const useRoleStore = defineStore('role', {
  state: () => ({
    roles: [] as any[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchRoles() {
      this.loading = true
      this.error = null
      const config = useRuntimeConfig()
      const token = useCookie('auth_token')

      try {
        this.roles = await ofetch(`${config.public.apiBase}/roles`, {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        })
      } catch (error: any) {
        this.error = error?.data?.message || error.message || 'Failed to fetch roles'
      } finally {
        this.loading = false
      }
    },

    async createRole(roleData: any) {
      this.loading = true
      this.error = null
      const config = useRuntimeConfig()
      const token = useCookie('auth_token')

      try {
        const newRole = await ofetch(`${config.public.apiBase}/roles`, {
          method: 'POST',
          body: roleData,
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        })

        this.roles.push(newRole)
        return newRole
      } catch (error: any) {
        this.error = error?.data?.message || error.message || 'Failed to create role'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateRole(roleData: any) {
      this.loading = true
      this.error = null
      const config = useRuntimeConfig()
      const token = useCookie('auth_token')

      try {
        const updated = await ofetch(`${config.public.apiBase}/roles/${roleData.id}`, {
          method: 'PUT',
          body: roleData,
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        })

        const index = this.roles.findIndex(r => r.id === roleData.id)
        if (index !== -1) this.roles[index] = updated

        return updated
      } catch (error: any) {
        this.error = error?.data?.message || error.message || 'Failed to update role'
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteRole(roleId: number) {
      this.loading = true
      this.error = null
      const config = useRuntimeConfig()
      const token = useCookie('auth_token')

      try {
        await ofetch(`${config.public.apiBase}/roles/${roleId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        })

        this.roles = this.roles.filter(r => r.id !== roleId)
        return true
      } catch (error: any) {
        this.error = error?.data?.message || error.message || 'Failed to delete role'
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
