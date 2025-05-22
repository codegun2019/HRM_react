import { defineStore } from "pinia"
import type { User, LoginCredentials, AuthResponse } from "~/types/auth"
import { useNuxtApp } from "#app"
import { navigateTo } from "#app"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
    userRole: (state) => state.user?.role || null,
    isAdmin: (state) => state.user?.role === "admin",
    isHR: (state) => state.user?.role === "hr",
    isEmployee: (state) => state.user?.role === "employee",
  },

  actions: {
    async initialize() {
      this.loading = true

      try {
        // Get token from localStorage
        const token = localStorage.getItem("auth_token")

        if (!token) {
          this.loading = false
          return
        }

        this.token = token

        // Fetch current user data
        await this.fetchCurrentUser()
      } catch (error) {
        this.error = "Failed to initialize authentication"
        console.error("Auth initialization error:", error)
      } finally {
        this.loading = false
      }
    },

    async login(credentials: LoginCredentials) {
      this.loading = true
      this.error = null

      try {
        const { $axios } = useNuxtApp()
        const response = await $axios.post<AuthResponse>("/auth/login", credentials)

        const { user, token } = response.data

        this.user = user
        this.token = token

        // Store token in localStorage
        localStorage.setItem("auth_token", token)

        return true
      } catch (error: any) {
        this.error = error.response?.data?.message || "Login failed"
        return false
      } finally {
        this.loading = false
      }
    },

    async register(registerData: any) {
      this.loading = true
      this.error = null

      try {
        const { $axios } = useNuxtApp()
        const response = await $axios.post<AuthResponse>("/auth/register", registerData)

        const { user, token } = response.data

        this.user = user
        this.token = token

        // Store token in localStorage
        localStorage.setItem("auth_token", token)

        return true
      } catch (error: any) {
        this.error = error.response?.data?.message || "Registration failed"
        return false
      } finally {
        this.loading = false
      }
    },

    async fetchCurrentUser() {
      if (!this.token) return

      try {
        const { $axios } = useNuxtApp()
        const response = await $axios.get<User>("/auth/me")

        this.user = response.data
      } catch (error) {
        // If fetching user fails, log out
        this.logout()
        throw error
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem("auth_token")
      navigateTo("/login")
    },
  },
})
