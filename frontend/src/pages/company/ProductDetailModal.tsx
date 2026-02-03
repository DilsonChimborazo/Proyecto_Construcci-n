import { useQuery } from '@tanstack/react-query'
import { getProductsId } from '../../services/product.service'
import type { Product } from '../../types/product'

type Props = {
  productId: number
  mode: 'view' | 'edit'
  onClose: () => void
}

const ProductDetailModal = ({ productId, mode, onClose }: Props) => {
  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ['product', productId],
    queryFn: () => getProductsId(productId),
  })

  if (isLoading) return <p>Cargando...</p>
  if (!product) return null

  if (mode === 'view') {
    return (
      <div className="space-y-2">
        <h2 className="text-xl font-bold">{product.nombre}</h2>
        <p>Precio: ${product.precio}</p>
        <p>Stock: {product.stock}</p>
        <p>IVA: {product.iva}%</p>
        <p>Descuento: {product.descuento}%</p>

        <button
          onClick={onClose}
          className="w-full mt-4 bg-gray-300 hover:bg-gray-400 py-2 rounded"
        >
          Cerrar
        </button>
      </div>
    )
  }

  return (
    <form className="space-y-3">
      <input
        defaultValue={product.nombre}
        className="w-full border p-2 rounded"
      />

      <input
        type="number"
        defaultValue={product.precio}
        className="w-full border p-2 rounded"
      />

      <input
        type="number"
        defaultValue={product.stock}
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded"
      >
        Guardar cambios
      </button>
    </form>
  )
}

export default ProductDetailModal
