export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  role: "admin" | "hr" | "employee"
  createdAt: string
  updatedAt: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData extends LoginCredentials {
  firstName: string
  lastName: string
}

export interface AuthResponse {
  user: User
  token: string
}
export interface AuthUser {
  id: number
  username: string
  email: string
  role: string
  isActive: boolean
  createdAt: string
}