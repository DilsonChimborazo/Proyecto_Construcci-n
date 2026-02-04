import api from '../api/axios'

export const rateProduct = async (productId: number, value: number) => {
  const { data } = await api.post('/calificaciones/', {
    producto: productId,
    valor: value,
  })
  return data
}
