// Types
export interface User {
  id: number
  username: string
  email: string
  role: string
  isActive: boolean
  lastLogin: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  username: string
  email: string
  password: string
}

// Token management
export const getToken = (): string | null => {
  if (typeof window === "undefined") return null
  return localStorage.getItem("adminToken") || null
}

export const setToken = (token: string): void => {
  if (typeof window === "undefined") return
  localStorage.setItem("adminToken", token)
}

export const removeToken = (): void => {
  if (typeof window === "undefined") return
  localStorage.removeItem("adminToken")
}

// Auth methods
export const login = async (credentials: LoginCredentials): Promise<string> => {
  // In a real app, you would make an API call here
  // const response = await fetch('/api/auth/login', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(credentials),
  // })

  // if (!response.ok) throw new Error('Login failed')
  // const data = await response.json()

  // Simulate successful login
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock token
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IkFkbWluIFVzZXIiLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6IkFkbWluaXN0cmF0b3IiLCJpYXQiOjE2MTYyMzkwMjJ9.7M1xp_5-ES-4JFvOLQCH7yfZD5bVQ6Qh5yGFPRiYF0Y"

  setToken(token)
  return token
}

export const register = async (credentials: RegisterCredentials): Promise<void> => {
  // In a real app, you would make an API call here
  // const response = await fetch('/api/auth/register', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(credentials),
  // })

  // if (!response.ok) throw new Error('Registration failed')

  // Simulate successful registration
  await new Promise((resolve) => setTimeout(resolve, 1000))
}

export const logout = (): void => {
  removeToken()
  // In a real app, you might also want to make an API call to invalidate the token on the server
}

export const getCurrentUser = async (): Promise<User | null> => {
  const token = getToken()
  if (!token) return null

  // In a real app, you would make an API call here
  // const response = await fetch('/api/auth/me', {
  //   headers: { Authorization: `Bearer ${token}` },
  // })

  // if (!response.ok) {
  //   if (response.status === 401) {
  //     removeToken()
  //     return null
  //   }
  //   throw new Error('Failed to get current user')
  // }

  // return await response.json()

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock user data
  return {
    id: 1,
    username: "admin",
    email: "admin@example.com",
    role: "Administrator",
    isActive: true,
    lastLogin: new Date().toISOString(),
  }
}

export const isAuthenticated = async (): Promise<boolean> => {
  const user = await getCurrentUser()
  return !!user
}
