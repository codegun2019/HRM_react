"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import * as authService from "@/lib/auth-service"

interface AuthContextType {
  user: authService.User | null
  isLoading: boolean
  login: (credentials: authService.LoginCredentials) => Promise<void>
  register: (credentials: authService.RegisterCredentials) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<authService.User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated on mount
    const checkAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error("Auth check error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (credentials: authService.LoginCredentials) => {
    setIsLoading(true)
    try {
      await authService.login(credentials)
      const user = await authService.getCurrentUser()
      setUser(user)
      router.push("/dashboard")
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (credentials: authService.RegisterCredentials) => {
    setIsLoading(true)
    try {
      await authService.register(credentials)
      router.push("/auth/login?registered=true")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    authService.logout()
    setUser(null)
    router.push("/auth/login")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
