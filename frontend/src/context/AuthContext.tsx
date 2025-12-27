import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { User, AuthTokens } from '../types/auth.types'

/**
 * Lo que el contexto va a exponer al resto de la app
 */
interface AuthContextType {
  user: User | null
  tokens: AuthTokens | null
  isAuthenticated: boolean
  login: (tokens: AuthTokens, user?: User) => void
  logout: () => void
}

/**
 * Creamos el contexto
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * Provider que envuelve la aplicación
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [tokens, setTokens] = useState<AuthTokens | null>(null)

  /**
   * Al cargar la app:
   * - revisamos si hay tokens guardados
   * - si existen, restauramos la sesión
   */
  useEffect(() => {
    const storedTokens = localStorage.getItem('tokens')
    const storedUser = localStorage.getItem('user')

    if (storedTokens) {
      setTokens(JSON.parse(storedTokens))
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  /**
   * Función para iniciar sesión
   * Se llama después del login exitoso
   */
  const login = (tokens: AuthTokens, user?: User) => {
    setTokens(tokens)
    localStorage.setItem('tokens', JSON.stringify(tokens))

    if (user) {
      setUser(user)
      localStorage.setItem('user', JSON.stringify(user))
    }
  }

  /**
   * Función para cerrar sesión
   * Limpia todo
   */
  const logout = () => {
    setTokens(null)
    setUser(null)
    localStorage.removeItem('tokens')
    localStorage.removeItem('user')
  }
  

  return (
    <AuthContext.Provider
      value={{
        user,
        tokens,
        isAuthenticated: !!tokens,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook de acceso al contexto
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuthContext debe usarse dentro de AuthProvider')
  }

  return context
}
