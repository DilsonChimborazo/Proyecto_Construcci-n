import api from '../api/axios'
import type { Product } from '../types/product'

// Traer todos los productos
export const getProducts = async (): Promise<Product[]> => {
  const { data } = await api.get('/productos/')
  return data
}

// Crear producto
export const createProduct = async (product: Omit<Product, 'id'>) => {
  const { data } = await api.post('/productos/', product)
  return data
}
