import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'
import { useState } from 'react'
import api from '../api/axios'
import ClientMenu from '../components/menu/client/ClientMenu'
import CompanyMenu from '../components/menu/company/CompanyMenu'



const Dashboard = () => {
  const navigate = useNavigate()
  const { user, logout, isAuthenticated } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [me, setMe] = useState<any>(null)
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleLogout = () => {
    if (!user) {
      toast.success('Te esperamos pronto')
      logout()
      navigate('/', { replace: true })
      return
    }
  }
  useEffect(() => {
  const fetchMe = async () => {
    try {
      const { data } = await api.get('/me/')
      setMe(data)
      console.log('DATOS /me:', data)
    } catch (error) {
      console.error('Error al obtener /me', error)
    }
  }

  if (isAuthenticated) {
    fetchMe()
  }
}, [isAuthenticated])


const toggleSidebar = () => {
  setIsSidebarOpen(prev => !prev)
}


return (
  <div className="flex min-h-screen bg-amber-700">

    {/* SIDEBAR */}
    <aside
      className={`
        bg-red-500 text-white transition-all duration-300
        ${isSidebarOpen ? 'w-64' : 'w-0 overflow-hidden'}
      `}
    >
    <div className="p-4">
      <h2 className="font-bold text-lg mb-4">Menú</h2>
        {me?.user_type === 'cliente' && <ClientMenu />}
        {me?.user_type === 'empresa' && <CompanyMenu />}
    </div>

    </aside>

    {/* CONTENIDO PRINCIPAL */}
    <main
      className={`
        flex-1 bg-green-500 transition-all duration-300
        ${isSidebarOpen ? 'ml-0' : 'ml-0'}
      `}
    >
      {/* HEADER */}
      <header className="flex items-center justify-between p-4 bg-green-600 text-white">
        <button
          onClick={toggleSidebar}
          className="bg-black px-3 py-2 rounded"
        >
          ☰
        </button>

        <p className="font-bold">
          Bienvenido {me?.full_name}
        </p>

        <button
          onClick={handleLogout}
          className="bg-red-600 px-3 py-2 rounded"
        >
          Cerrar sesión
        </button>
      </header>

      {/* BODY */}
      <div className="p-6">
        <Outlet />

      </div>
    </main>
  </div>
)

}

export default Dashboard
