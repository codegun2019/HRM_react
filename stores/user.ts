import { defineStore } from "pinia"
import { useNuxtApp } from "#app"

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchUsers() {
      this.loading = true
      this.error = null
      const { $axios } = useNuxtApp()

      try {
        // In a real app, this would be an API call
        // For demo purposes, we'll simulate a delay and return mock data
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data
        this.users = [
          {
            id: 1,
            username: "admin",
            email: "admin@example.com",
            role: "Administrator",
            status: "Active",
            lastLogin: "May 22, 2025, 11:27 PM",
          },
          {
            id: 2,
            username: "manager",
            email: "manager@example.com",
            role: "Manager",
            status: "Active",
            lastLogin: "May 22, 2025, 10:15 AM",
          },
          {
            id: 3,
            username: "employee1",
            email: "employee1@example.com",
            role: "Employee",
            status: "Active",
            lastLogin: "May 21, 2025, 09:30 AM",
          },
          {
            id: 4,
            username: "employee2",
            email: "employee2@example.com",
            role: "Employee",
            status: "Inactive",
            lastLogin: "May 15, 2025, 02:45 PM",
          },
        ]
      } catch (error) {
        this.error = error.message || "Failed to fetch users"
        throw error
      } finally {
        this.loading = false
      }
    },

    async createUser(userData) {
      this.loading = true
      this.error = null
      const { $axios } = useNuxtApp()

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Generate a new ID (in a real app, the server would do this)
        const newId = Math.max(0, ...this.users.map((u) => u.id)) + 1

        // Create new user with current timestamp
        const newUser = {
          id: newId,
          username: userData.username,
          email: userData.email,
          role: userData.role,
          status: userData.status,
          lastLogin: "Never",
        }

        // Add to users array
        this.users.push(newUser)

        return newUser
      } catch (error) {
        this.error = error.message || "Failed to create user"
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateUser(userData) {
      this.loading = true
      this.error = null
      const { $axios } = useNuxtApp()

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Find and update user
        const index = this.users.findIndex((u) => u.id === userData.id)
        if (index !== -1) {
          this.users[index] = { ...this.users[index], ...userData }
        } else {
          throw new Error("User not found")
        }

        return this.users[index]
      } catch (error) {
        this.error = error.message || "Failed to update user"
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteUser(userId) {
      this.loading = true
      this.error = null
      const { $axios } = useNuxtApp()

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Remove user from array
        const index = this.users.findIndex((u) => u.id === userId)
        if (index !== -1) {
          this.users.splice(index, 1)
        } else {
          throw new Error("User not found")
        }

        return true
      } catch (error) {
        this.error = error.message || "Failed to delete user"
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
