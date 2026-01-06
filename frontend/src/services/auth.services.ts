
import api from '../api/axios'
import type { LoginData, RegisterData, AuthResponse, MeData } from '../types/auth.types'

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/login/', data)
  return response.data
}

export const register = async (data: RegisterData) => {
  const response = await api.post('/register/', data)
  return response.data
}

export const me = async (data: MeData) =>{
  const response = await api.post('/me/',data)
  return response.data
}

