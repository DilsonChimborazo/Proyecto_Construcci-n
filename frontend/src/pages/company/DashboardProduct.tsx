import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import FormField from '../../components/FormsField'
import FormButton from '../../components/FormButton'
import { createProduct } from '../../services/product.service'
import type { Product } from '../../types/product'
import toast from 'react-hot-toast'

// Tipo para el formulario
type ProductForm = Omit<Product, 'id'>

const Products = () => {
  const queryClient = useQueryClient()
  // FORMULARIO

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductForm>()


  // CREAR PRODUCTO
  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success('Producto creado')
      // Vuelve a pedir los productos
      queryClient.invalidateQueries({ queryKey: ['products'] })
      reset()
    },
    onError: () => {
      toast.error('Error al crear producto')
    },
  })

  // Cuando se envía el formulario
  const onSubmit = (data: ProductForm) => {
    mutation.mutate(data)
  }

  return (
    <div className="space-y-10">

      {/* FORMULARIO */}
      <div className=" p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">
          Crear producto
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4 text-black"
        >

          <FormField
            label="Nombre"
            register={register('nombre', { required: 'Requerido' })}
            error={errors.nombre?.message}
          />

          <FormField
            label="Descripción"
            register={register('descripcion')}
          />

          <FormField
            type="select"
            label="Unidad de medida"
            options={[
              { label: 'Gramos', value: 'gramos' },
              { label: 'Mililitros', value: 'mililitros' },
            ]}
            register={register('unidad_medida', { required: 'Requerido' })}
            error={errors.unidad_medida?.message}
          />

          <FormField
            label="Precio"
            inputType="number"
            register={register('precio', { valueAsNumber: true })}
          />

          <FormField
            label="Stock"
            inputType="number"
            register={register('stock', { valueAsNumber: true })}
          />

          <FormField
            label="IVA (%)"
            inputType="number"
            register={register('iva', { valueAsNumber: true })}
          />

          <FormField
            label="Descuento (%)"
            inputType="number"
            register={register('descuento', { valueAsNumber: true })}
          />

          {/* Botón */}
          <div className="col-span-2">
            <FormButton
              text={mutation.isPending ? 'Guardando...' : 'Guardar producto'}
              loading={mutation.isPending}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Products
