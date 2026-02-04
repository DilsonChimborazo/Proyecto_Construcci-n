export interface LoginData {
  email: string
  password: string
}

export type UserType = 'CLIENTE' | 'EMPRESA' 


export interface RegisterData {
  cedula_nit: number
  email: string
  full_name: string
  phone: string
  user_type: UserType
  password: string
}

export interface MeData{
  cedula_nit: number
  email: string
  full_name: string
  phone: string
  user_type: UserType
  password: string
}


export interface AuthResponse {
  access: string
  refresh: string
}



export interface User {
  cedula_nit: number
  user_type?: UserType
  full_name?: string
  email: string
  phone: string
  password: string
  registration_date: Date
}



export interface AuthTokens {
  access: string
  refresh: string
}

