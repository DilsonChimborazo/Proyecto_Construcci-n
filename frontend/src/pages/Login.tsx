import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { login } from '../services/auth.services'
import type { LoginData } from '../types/auth.types'
import Register from './Register'

const Login = () => {
  const navigate = useNavigate()

  // Estado para alternar Login / Register
  const [mode, setMode] = useState<'login' | 'register'>('login')

  const [form, setForm] = useState<LoginData>({
    email: '',
    password: '',
  })

  // Login mutation
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      // Guardar token
      localStorage.setItem('access', data.access)
      navigate('/dashboard', { replace: true })
    },
    onError: () => {
      alert('Credenciales incorrectas')
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate(form)
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Panel izquierdo */}
      <div className="flex w-full md:w-1/3 relative overflow-hidden flex-col justify-center">
        {/* SVG animado */}
        <svg
          viewBox="0 0 400 800"
          preserveAspectRatio="xMidYMid slice"
          className={`absolute inset-0 w-full h-full transition-transform duration-700
            ${mode === 'register' ? 'translate-y-0' : 'translate-y-0'}
          `}
        >
          <defs>
            <linearGradient id="pinkGradient" x1="0" y1="1" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff8000" />
              <stop offset="100%" stopColor="#f4a020" />
            </linearGradient>
          </defs>

          {/* Fondo base */}
          <rect width="500" height="800" fill="url(#pinkGradient)" />

          {/* Banda diagonal 1 */}
          <rect
            x="-400"
            y="170"
            width="700"
            height="160"
            transform="rotate(-45)"
            fill="rgba(255,255,255,0.25)"
            className={`transition-all duration-700
              ${mode === 'register' ? 'translate-x-10' : 'translate-x-0'}
            `}
          />

          {/* Banda diagonal 2 */}
          <rect
            x="-150"
            y="420"
            width="700"
            height="160"
            transform="rotate(-45)"
            fill="rgba(0,0,0,0.10)"
            className={`transition-all duration-700
              ${mode === 'register' ? '-translate-x-10' : 'translate-x-0'}
            `}
          />
          {/* Banda diagonal 3 */}
          <rect
            x="-570"
            y="420"
            width="400"
            height="160"
            transform="rotate(-45)"
            fill="rgba(0,0,0,0.10)"
            className={`transition-all duration-700
              ${mode === 'register' ? '-translate-x-10' : 'translate-x-0'}
            `}
          />
        </svg>

        {/* CONTENIDO */}
        <div className="relative z-10 flex flex-col justify-center mb-10">

          {/* LOGIN */}
          <div
            onClick={() => setMode('login')}
            className={`cursor-pointer text-right pr-6 py-6 ml-auto w-1/3 mb-5
              transition-all duration-500
              ${mode === 'login'
                ? 'bg-gray-100 font-semibold text-2xl rounded-l-full'
                : 'text-white font-bold opacity-70'}
            `}
          >
            LOGIN
          {/* CONDICIÓN: Solo renderiza si mode es 'login' */}
          {mode === 'login' && (
            <>
              {/* ESQUINA SUPERIOR */}
              <div className="absolute -top-10 right-0 h-10 w-10 bg-gray-100">
                <div className="h-full w-full bg-[#db8b12] rounded-br-[40px]"></div>
              </div>
              {/* ESQUINA INFERIOR */}
              <div className="absolute bottom-13 right-0 h-10 w-10 bg-gray-100">
                <div className="h-full w-full bg-[#db8b12] rounded-tr-[40px]"></div>
              </div>
            </>
          )}
          </div>

          {/* SIGN IN */}
          <div
            onClick={() => setMode('register')}
            className={`cursor-pointer text-right pr-6 py-6 ml-auto w-1/3
              transition-all duration-500
              ${mode === 'register'
                ? 'bg-gray-100 font-bold text-2xl mt-5 rounded-l-full'
                : 'text-white opacity-70'}
            `}
          >
            SIGN IN
                    {mode === 'register' && (
            <>
              {/* ESQUINA SUPERIOR */}
              <div className="absolute top-18 right-0 h-10 w-10 bg-gray-100">
                <div className="h-full w-full bg-[#db8b12] rounded-br-[40px]"></div>
              </div>
              {/* ESQUINA INFERIOR */}
              <div className="absolute -bottom-10 right-0 h-10 w-10 bg-gray-100">
                <div className="h-full w-full bg-[#f4981f] rounded-tr-[40px]"></div>
              </div>
            </>
          )}
          </div>

        </div>
      </div>

      {/* Contenido derecho */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        {mode === 'login' && (
          <form
            onSubmit={handleSubmit}
            className="p-6 rounded-xl shadow-md w-80"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">
              Iniciar sesión
            </h2>

            <input
              type="email"
              name="email"
              placeholder="Correo"
              className="w-full mb-3 p-2 border rounded"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="w-full mb-4 p-2 border rounded"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Ingresando...' : 'Login'}
            </button>
          </form>
        )}

        {mode === 'register' && <Register />}
      </div>
    </div>
  )
}

export default Login
