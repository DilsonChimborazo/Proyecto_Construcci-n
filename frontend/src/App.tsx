import {Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import DashboardLayout from './pages/DashboardLayout'
import ProtectedRoute from './routes/ProtectedRoute'
import DashboardHome from './pages/DashboardHome'
import DashboardSales from './pages/company/DashboardProduct'
import DashboardGetProduct from './pages/company/DashboardGetProduct'


const App = () => {
  return (
      <Routes>

        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="sales" element={<DashboardSales />} />
            <Route path="productos" element={<DashboardGetProduct/>} />
          </Route>

        </Route>
      </Routes>
  )
}

export default App
