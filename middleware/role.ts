import { defineNuxtRouteMiddleware, navigateTo } from "#app"
import { useAuthStore } from "~/stores/auth"

export default defineNuxtRouteMiddleware((to) => {
  // Skip on server-side
  if (process.server) return

  const authStore = useAuthStore()
  const requiredRole = to.meta.requiredRole

  // If no role requirement, continue
  if (!requiredRole) return

  // If authentication is still loading, wait
  if (authStore.loading) {
    // You could show a loading state here
    return
  }

  // If user is not authenticated, redirect to login
  if (!authStore.isAuthenticated) {
    return navigateTo("/login")
  }

  const userRole = authStore.userRole

  // Check if user has the required role
  if (requiredRole === "admin" && !authStore.isAdmin) {
    return navigateTo("/dashboard/employee")
  }

  if (requiredRole === "hr" && !authStore.isHR) {
    return navigateTo("/dashboard/employee")
  }

  // For employee routes, any authenticated user can access
})
