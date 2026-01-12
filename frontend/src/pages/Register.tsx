import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { register as registerUser } from '../services/auth.services'
import type { RegisterData } from '../types/auth.types'
import FormField from '../components/FormsField.tsx'


const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    defaultValues: {
      user_type: 'cliente',
    },
  })
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      alert('Usuario registrado correctamente')
      window.location.reload()
    },
    onError: () => {
      alert('Error al registrar usuario')
    },
  })

  const onSubmit = (data: RegisterData) => {
    console.log(data)
    mutation.mutate(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 rounded-xl w-full"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        Registro
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          inputType="number"
          placeholder="Cédula / NIT"
          register={register('cedula_nit', {
            required: 'La cédula o NIT es obligatorio',
            valueAsNumber: true,
          })}
          error={errors.cedula_nit?.message}
        />

        <FormField
          inputType="text"
          placeholder="Nombre completo"
          register={register('full_name', {
            required: 'El nombre es obligatorio',
          })}
          error={errors.full_name?.message}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          inputType="email"
          placeholder="Correo electrónico"
          register={register('email', {
            required: 'El correo es obligatorio',
          })}
          error={errors.email?.message}
        />

        <FormField
          inputType="text"
          placeholder="Teléfono"
          register={register('phone')}
        />
      </div>

      {/* SELECT USER TYPE */}
      <select
      {...register('user_type', {
          required: 'Seleccione un tipo de usuario',
        })}
        className="w-full mb-2 p-2 border rounded"
      >
        <option value="cliente">Cliente</option>
        <option value="empresa">Empresa</option>
      </select>

      {errors.user_type && (
        <p className="text-red-500 text-xs mb-4">
          {errors.user_type.message}
        </p>
      )}


      <FormField
        inputType="password"
        placeholder="Contraseña"
        register={register('password', {
          required: 'La contraseña es obligatoria',
          minLength: {
            value: 6,
            message: 'Mínimo 6 caracteres',
          },
        })}
        error={errors.password?.message}
      />

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? 'Registrando...' : 'Registrar'}
      </button>
    </form>
  )
}

export default Register
