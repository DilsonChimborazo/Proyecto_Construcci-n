import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { register } from '../services/auth.services'
import type { RegisterData } from '../types/auth.types'

const Register = () => {
  const [form, setForm] = useState<RegisterData>({
    fullname: '',
    email: '',
    password: '',
  })

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      alert('Usuario registrado correctamente')
    },
    onError: () => {
      alert('Error al registrar usuario')
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate(form)
  }

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-xl shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Registro</h2>

        <input
          type="text"
          name="username"
          placeholder="Usuario"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Correo"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="w-full mb-4 p-2 border rounded"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
    </div>
  )
}

export default Register
