import { useState } from 'react'

export const useAuth = () => {
  const [user, setUser] = useState<any>(null)

  const isAuthenticated = !!localStorage.getItem('access')

  const logout = async () => {
    localStorage.removeItem('access')
    setUser(null)
  }

  return {
    user,
    setUser,
    isAuthenticated,
    logout,
  }
}
