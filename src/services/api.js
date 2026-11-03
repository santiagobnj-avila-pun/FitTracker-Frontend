import axios from 'axios'
import { cargarSesion, EVENTO_SESION_EXPIRADA, urlBackendValida } from '../utils/auth'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const api = axios.create({ baseURL: BACKEND_URL, timeout: 15000 })

api.interceptors.request.use((config) => {
  if (!urlBackendValida(BACKEND_URL)) throw new Error('CONFIGURACION_INVALIDA')
  const sesion = cargarSesion()
  if (sesion) config.headers.Authorization = `Bearer ${sesion.token}`
  return config
})

api.interceptors.response.use(undefined, (error) => {
  if (error.response?.status === 401 && error.config?.headers?.Authorization) {
    window.dispatchEvent(new Event(EVENTO_SESION_EXPIRADA))
  }
  return Promise.reject(error)
})

export default api
