import axios from 'axios'
import { normalizarRespuesta, urlApiValida } from '../utils/ejerciciosApi'

const API_URL = import.meta.env.VITE_API_URL

export async function obtenerEjercicios({ nombre, grupo, despues }, signal) {
  if (!urlApiValida(API_URL)) throw new Error('CONFIGURACION_INVALIDA')
  const response = await axios.get(API_URL, {
    params: { limit: 8, name: nombre || undefined, bodyParts: grupo || undefined, after: despues || undefined },
    signal,
    timeout: 15000,
  })
  return normalizarRespuesta(response.data)
}