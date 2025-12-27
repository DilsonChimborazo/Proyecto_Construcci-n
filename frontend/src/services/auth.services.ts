
import api from '../api/axios'
import type { LoginData, RegisterData, AuthResponse } from '../types/auth.types'

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/login/', data)
  return response.data
}

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/register/', data)
  return response.data
}
