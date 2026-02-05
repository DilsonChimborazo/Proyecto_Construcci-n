import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import { getProductsId, updateProduct } from '../../services/product.service'
import type { Product } from '../../types/product'
import FormField from '../../components/FormsField'
import FormButton from '../../components/FormButton'

// ===== Tipos =====
type ProductForm = Omit<Product, 'id'> & {
  photo_prod?: FileList
}

type Props = {
  productId: number
  mode: 'view' | 'edit'
  onClose: () => void
}

const ProductDetailModal = ({ productId, mode, onClose }: Props) => {
  const queryClient = useQueryClient()

  // ===== Obtener producto =====
  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ['product', productId],
    queryFn: () => getProductsId(productId),
  })

  // ===== Formulario =====
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductForm>()

  // ===== Mutación EDITAR =====
  const mutation = useMutation({
    mutationFn: (formData: FormData) =>
      updateProduct(productId, formData),
    onSuccess: () => {
      toast.success('Producto actualizado')
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['product', productId] })
      onClose()
    },
    onError: () => {
      toast.error('Error al actualizar producto')
    },
  })

  // ===== Cargar datos en el formulario =====
  useEffect(() => {  if (product) {
    reset({
      nombre: product.nombre,
      descripcion: product.descripcion,
      unidad_medida: product.unidad_medida,
      precio: product.precio,
      stock: product.stock,
      iva: product.iva,
      descuento: product.descuento,
    })
  } }, [product, reset])


  // ===== Submit =====
  const onSubmit = (data: ProductForm) => {
    const formData = new FormData()

    formData.append('nombre', data.nombre)
    formData.append('descripcion', data.descripcion ?? '')
    formData.append('unidad_medida', data.unidad_medida)
    formData.append('precio', String(data.precio))
    formData.append('stock', String(data.stock))
    formData.append('iva', String(data.iva))
    formData.append('descuento', String(data.descuento))

    if (data.photo_prod && data.photo_prod[0]) {
      formData.append('photo_prod', data.photo_prod[0])
    }

    mutation.mutate(formData)
  }

  if (isLoading) return <p>Cargando...</p>
  if (!product) return null

  // ================== MODO VER ==================
  if (mode === 'view') {
    return (
      <div className="space-y-2">
        <h2 className="text-xl font-bold">{product.nombre}</h2>
        <p>Precio: ${product.precio}</p>
        <p>Stock: {product.stock}</p>
        <p>IVA: {product.iva}%</p>
        <p>Descuento: {product.descuento}%</p>

        <button
          type="button"
          onClick={onClose}
          className="w-full mt-4 bg-gray-300 hover:bg-gray-400 py-2 rounded"
        >
          Cerrar
        </button>
      </div>
    )
  }

  // ================== MODO EDITAR ==================
  return (
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

      <FormField
        label="Foto del producto"
        inputType="file"
        register={register('photo_prod')}
      />

      <div className="col-span-2 flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded"
        >
          Cancelar
        </button>

        <FormButton
          text={mutation.isPending ? 'Guardando...' : 'Guardar cambios'}
          loading={mutation.isPending}
        />
      </div>
    </form>
  )
}

export default ProductDetailModal
