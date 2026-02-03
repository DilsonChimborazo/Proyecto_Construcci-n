import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../../services/product.service'
import FormButton from '../../components/FormButton'
import Modal from '../../components/Modal'
import DashboardProduct from './DashboardProduct'
import { Plus } from 'lucide-react'
import type { Product } from '../../types/product'

const ProductsGet = () => {
  const [openModal, setOpenModal] = useState(false)

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  return (
    <div className="bg-white p-6 rounded shadow">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Productos</h2>

        <FormButton
          type="button"
          onClick={() => setOpenModal(true)}
          text={
            <span className="flex items-center gap-2">
              <Plus size={20} strokeWidth={4} />
              Nuevo producto
            </span>
          }
        />
      </div>

      {/* MODAL */}
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title="Crear producto"
      >
        <DashboardProduct />
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
              <h3 className="font-semibold text-lg">
                {product.nombre}
              </h3>

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

              {/* ACCIONES */}
              <div className="mt-4 flex gap-2">
                <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-sm py-2 rounded">
                  Editar
                </button>

                <button className="flex-1 bg-orange-400 hover:bg-orange-500 text-white text-sm py-2 rounded">
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
