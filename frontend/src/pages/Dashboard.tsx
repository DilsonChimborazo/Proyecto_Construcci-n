import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Dashboard = () => {
  const navigate = useNavigate()
  const { user, logout, isAuthenticated } = useAuth()

  // 🔒 Protección basada en localStorage
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <p className="mt-4">
        Bienvenido {user?.email}
      </p>

      <button
        onClick={handleLogout}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
      >
        Cerrar sesión
      </button>
    </div>
  )
}

export default Dashboard
