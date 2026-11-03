import api from './api'
import { sesionValida } from '../utils/auth'

function normalizarSesion(respuesta) {
  const sesion = { token: respuesta?.accessToken, usuario: respuesta?.usuario }
  if (!sesionValida(sesion)) throw new Error('RESPUESTA_INVALIDA')
  return sesion
}

export async function ingresar({ email, password }) {
  const response = await api.post('/auth/login', { email: email.trim(), password })
  return normalizarSesion(response.data)
}

export async function registrar({ nombre, email, password }) {
  const response = await api.post('/auth/register', { nombre: nombre.trim(), email: email.trim(), password })
  return normalizarSesion(response.data)
}

export async function obtenerPerfil(signal) {
  const response = await api.get('/auth/perfil', { signal })
  if (typeof response.data?.email !== 'string') throw new Error('RESPUESTA_INVALIDA')
  return response.data
}
