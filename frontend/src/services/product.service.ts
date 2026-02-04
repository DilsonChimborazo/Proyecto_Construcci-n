import api from '../api/axios'

export const getProducts = async () => {
  const { data } = await api.get('/productos/')
  return data
}

export const createProduct = async (formData: FormData) => {
  const { data } = await api.post('/productos/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return data
}

export const getProductsId = async (id: number) => {
  const { data } = await api.get(`/productos/${id}/`)
  return data
} 

export const updateProduct = async (
  id: number,
  data: { nombre: string; precio: number; stock: number }
) => {
  const response = await api.patch(`/productos/${id}/`, data)
  return response.data
}
