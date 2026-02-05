import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { Plus } from 'lucide-react'
import { rateProduct } from '../../services/rating.service'
import Rating from '../Rating'
import { getProducts } from '../../services/product.service'
import FormButton from '../../components/FormButton'
import Modal from '../../components/Modal'
import DashboardProduct from './DashboardProduct'
import ProductDetailModal from './ProductDetailModal'
import type { Product } from '../../types/product'

const ProductsGet = () => {
  const [openModal, setOpenModal] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null)
  const [mode, setMode] = useState<'create' | 'view' | 'edit'>('create')

  const queryClient = useQueryClient()

  // ================== QUERY PRODUCTOS ==================
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  // ================== MUTATION CALIFICAR ==================
  const rateMutation = useMutation({
    mutationFn: ({
      productId,
      value,
    }: {
      productId: number
      value: number
    }) => rateProduct(productId, value),
    onSuccess: () => {
      toast.success('Calificación guardada')
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
    onError: () => {
      toast.error('Error al guardar calificación')
    },
  })

  // ================== CONTROL MODAL ==================
  const closeModal = () => {
    setOpenModal(false)
    setSelectedProductId(null)
  }

  const openCreateModal = () => {
    setMode('create')
    setSelectedProductId(null)
    setOpenModal(true)
  }

  const openEditModal = (id: number) => {
    setMode('edit')
    setSelectedProductId(id)
    setOpenModal(true)
  }

  const openViewModal = (id: number) => {
    setMode('view')
    setSelectedProductId(id)
    setOpenModal(true)
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Productos</h2>

        <FormButton
          type="button"
          onClick={openCreateModal}
          text={
            <span className="flex items-center gap-2">
              <Plus size={20} strokeWidth={4} />
              Nuevo producto
            </span>
          }
        />
      </div>

      {/* MODAL GLOBAL */}
      <Modal
        isOpen={openModal}
        onClose={closeModal}
        title={
          mode === 'create'
            ? 'Crear producto'
            : mode === 'edit'
            ? 'Editar producto'
            : 'Detalle del producto'
        }
      >
        {mode === 'create' && <DashboardProduct />}

        {mode !== 'create' && selectedProductId && (
          <ProductDetailModal
            productId={selectedProductId}
            mode={mode}
            onClose={closeModal}
          />
        )}
      </Modal>

      {/* ESTADOS */}
      {isLoading && <p>Cargando...</p>}
      {!isLoading && products?.length === 0 && <p>No hay productos</p>}

      {/* GRID */}
      {!isLoading && products && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg shadow-sm p-4"
            >
              {/* IMAGEN */}
              <div className="mb-3">
                {product.photo_prod ? (
                  <img
                    src={product.photo_prod}
                    alt={product.nombre}
                    loading="lazy"
                    className="w-full h-40 object-cover rounded"
                  />
                ) : (
                  <div className="h-40 flex items-center justify-center bg-gray-100 rounded">
                    <span className="text-gray-400 text-sm">
                      Sin imagen
                    </span>
                  </div>
                )}
              </div>

              {/* INFO */}
              <h3 className="font-semibold text-lg">{product.nombre}</h3>

              <p className="text-orange-500 font-bold text-xl">
                ${product.precio}
              </p>

              <p
                className={`text-sm font-medium ${
                  product.stock <= 100
                    ? 'text-red-600'
                    : product.stock <= 140
                    ? 'text-yellow-600'
                    : 'text-green-600'
                }`}
              >
                Stock: {product.stock}
              </p>

              <div className="text-xs text-gray-400 mt-1">
                IVA {product.iva}% · Desc {product.descuento}%
              </div>

              {/* CALIFICACIÓN */}
              <div className="mt-2">
                <Rating
                  value={product.calificacion_promedio ?? 0}
                  readonly={product.calificacion_promedio !== null}
                  onChange={(value) =>
                    rateMutation.mutate({
                      productId: product.id,
                      value,
                    })
                  }
                />

                <p className="text-xs text-gray-400 mt-1">
                  {product.calificacion_promedio
                    ? `Calificación: ${product.calificacion_promedio} / 5`
                    : 'Califica este producto'}
                </p>
              </div>

              {/* ACCIONES */}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => openEditModal(product.id)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-sm py-2 rounded"
                >
                  Editar
                </button>

                <button
                  onClick={() => openViewModal(product.id)}
                  className="flex-1 bg-orange-400 hover:bg-orange-500 text-white text-sm py-2 rounded"
                >
                  Ver
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductsGet
