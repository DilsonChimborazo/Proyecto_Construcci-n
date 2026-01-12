import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import logoImg from '../assets/logo.png'
import FormField from '../components/FormsField'
import { login } from '../services/auth.services'
import type { LoginData } from '../types/auth.types'
import Register from './Register'
import { FaGithub, FaFacebookF, FaGoogle } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import toast from 'react-hot-toast'
import api from '../api/axios'
import FormButton from '../components/FormButton'



const Login = () => {
  const navigate = useNavigate()

  // Estado para alternar Login / Register
  const [mode, setMode] = useState<'login' | 'register'>('login')

  // React Hook Form
  const {
    register,
    handleSubmit: handleSubmitRHF,
    formState: { errors },
  } = useForm<LoginData>()

  // Login mutation 
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      localStorage.setItem('access', data.access)
  // Datos de usuario
    const res = await api.get('/me/')
    const user = res.data
    

    toast.success(`Bienvenido, ${user.full_name}`)
      navigate('/dashboard', { replace: true })
    },
    onError: () => {
      toast.error('Credenciales incorrectas')
    },
  })

  const onSubmit = (data: LoginData) => {
    mutation.mutate(data)
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white opacity-90">
      {/* PANEL IZQUIERDO */}
      <div className="flex w-full md:w-1/3 relative overflow-hidden flex-col justify-center">
        {/* SVG */}
        <svg
          viewBox="0 0 400 800"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full transition-transform duration-700"
        >
          <defs>
            <linearGradient id="pinkGradient" x1="0" y1="1" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff8000" />
              <stop offset="100%" stopColor="#f4a020" />
            </linearGradient>
          </defs>

          <rect width="500" height="800" fill="url(#pinkGradient)" />

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
            className={`cursor-pointer text-right pr-6 py-3 ml-auto w-1/3 mb-5
              transition-all duration-500
              ${mode === 'login'
                ? 'bg-white font-semibold text-2xl rounded-l-full'
                : 'text-white font-bold opacity-70'}
            `}
          >
            LOGIN

            {mode === 'login' && (
              <>
                {/* ESQUINA SUPERIOR */}
                <div className="absolute -top-10 right-0 h-10 w-10 bg-white">
                  <div className="h-full w-full bg-[#db8b12] rounded-br-[40px]" />
                </div>
                {/* ESQUINA INFERIOR */}
                <div className="absolute bottom-7 right-0 h-10 w-10 bg-white">
                  <div className="h-full w-full bg-[#db8b12] rounded-tr-[40px]" />
                </div>
              </>
            )}
          </div>

          {/* SIGN IN */}
          <div
            onClick={() => setMode('register')}
            className={`cursor-pointer text-right pr-6 py-3 ml-auto w-1/3
              transition-all duration-500
              ${mode === 'register'
                ? 'bg-white font-bold text-2xl mt-5 rounded-l-full'
                : 'text-white opacity-70'}
            `}
          >
            SIGN IN

            {mode === 'register' && (
              <>
                {/* ESQUINA SUPERIOR */}
                <div className="absolute top-12 right-0 h-10 w-10 bg-white">
                  <div className="h-full w-full bg-[#db8b12] rounded-br-[40px]" />
                </div>
                {/* ESQUINA INFERIOR */}
                <div className="absolute -bottom-10 right-0 h-10 w-10 bg-white">
                  <div className="h-full w-full bg-[#f4981f] rounded-tr-[40px]" />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="absolute top-3 left-10 z-10 text-center text-white py-3 list-none">

            <li className="flex items-center gap-2 mb-2 hover:text-black">
              <FaGoogle className="text-3xl text-white" />
              <a href="https://github.com/DilsonChimborazo/Proyecto_Construcci-n"><span>Google</span></a>
            </li>
            <li className="flex items-center gap-2 mb-2 hover:text-black">
              <FaFacebookF className="text-3xl text-white" />
              <a href="https://github.com/DilsonChimborazo/Proyecto_Construcci-n"><span>Facebook</span></a>
            </li>
            <li className="flex items-center gap-2 hover:text-black">
              <FaGithub className="text-3xl text-white" />
              <a href="https://github.com/DilsonChimborazo/Proyecto_Construcci-n"><span>Github</span></a>
            </li>
        </div>
        {/**Derechos de autor */}
        <div className="absolute bottom-3 left-10 z-10 text-center text-white py-3">
          © {new Date().getFullYear()} Derechos reservados.
          <span className="mx-2">|</span>
          <a href="/privacy" className="hover:text-pink-500">
            Privacidad
          </a>
          <span className="mx-2">|</span>
          <a href="/terms" className="hover:text-pink-500">
            Términos
          </a>
        </div>
      </div>

      {/* CONTENIDO DERECHO */}
      <div className="flex-1 flex flex-col ">
        {/* LOGO */}
        <div className="flex justify-center pt-2">
          <img
            src={logoImg}
            alt="logo"
            className="w-70 object-contain"
          />
        </div> 
        <div className="flex-1 flex items-center justify-center px-4"> 
        {mode === 'login' && (
          <form
            onSubmit={handleSubmitRHF(onSubmit)}
            className="px-6 rounded-xl w-3/4 h-full"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">
              Iniciar sesión
            </h2>
            
            <FormField
              label='Correo'
              inputType="email"
              placeholder="example@gmail.com"
              register={register('email', {
                required: 'El correo es obligatorio',
              })}
              error={errors.email?.message}
            />

            <FormField
              label='Constraseña'
              inputType="password"
              placeholder="************"
              register={register('password', {
                required: 'La contraseña es obligatoria',
              })}
              error={errors.password?.message}
            />
            <div className='text-center'>
            <FormButton
              text={mutation.isPending ? 'Ingresando...' : 'Login'}
              loading={mutation.isPending}
            />
            </div>
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="px-3 text-sm text-gray-400">O</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div> 
            <div className="flex justify-center gap-10 mt-4">
              <li className="flex items-center gap-2 mb-2 hover:text-black">
                <FcGoogle className="text-3xl text-blue-700" />
                <a href="https://github.com/DilsonChimborazo/Proyecto_Construcci-n"><span>Google</span></a>
              </li>
              <li className="flex items-center gap-2 mb-2 hover:text-black">
                <FaFacebookF className="text-3xl text-blue-700" />
                <a href="https://github.com/DilsonChimborazo/Proyecto_Construcci-n"><span>Facebook</span></a>
              </li>
            </div>
          </form>
        )}

        {mode === 'register' && <Register />}
      </div>
      <div className='text-center shadow-inner p-5'>

      </div>
    </div>
    </div>  
  )
}

export default Login
