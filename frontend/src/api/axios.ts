import axios from 'axios'

/**
 * Instancia única de Axios para toda la app
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Interceptor para agregar automáticamente el token JWT
 */
api.interceptors.request.use(
  (config) => {
    const storedTokens = localStorage.getItem('tokens')

    if (storedTokens) {
      const tokens = JSON.parse(storedTokens)
      config.headers.Authorization = `Bearer ${tokens.access}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

export default api
