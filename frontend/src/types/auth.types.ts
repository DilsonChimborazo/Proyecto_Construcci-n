export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  fullname: string
  email: string
  password: string
}

export interface AuthResponse {
  access: string
  refresh: string
}

export interface User {
  email: string
  full_name?: string
  user_type?: string
}

export interface AuthTokens {
  access: string
  refresh: string
}

