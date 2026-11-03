export const CLAVE_SESION = 'fit-tracker-sesion-v1'
export const EVENTO_SESION_EXPIRADA = 'fit-tracker:sesion-expirada'

const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function urlBackendValida(valor) {
  try {
    const url = new URL(valor)
    return ['http:', 'https:'].includes(url.protocol) && !url.username && !url.password
  } catch {
    return false
  }
}

export function sesionValida(sesion) {
  return Boolean(sesion)
    && typeof sesion.token === 'string' && sesion.token.trim() !== ''
    && Boolean(sesion.usuario) && typeof sesion.usuario.email === 'string'
}

export function cargarSesion(storage) {
  try {
    const sesion = JSON.parse((storage || window.localStorage).getItem(CLAVE_SESION))
    return sesionValida(sesion) ? sesion : null
  } catch {
    return null
  }
}

export function guardarSesion(sesion, storage) {
  try {
    ;(storage || window.localStorage).setItem(CLAVE_SESION, JSON.stringify(sesion))
  } catch {
    // Sin almacenamiento disponible la sesión dura solo mientras la pestaña esté abierta.
  }
}

export function borrarSesion(storage) {
  try {
    ;(storage || window.localStorage).removeItem(CLAVE_SESION)
  } catch {
    // No hay nada que limpiar si el almacenamiento no está disponible.
  }
}

export function validarIngreso({ email, password }) {
  if (!EMAIL_VALIDO.test(email.trim())) return 'Ingresá un email válido.'
  if (!password) return 'Ingresá tu contraseña.'
  return null
}

export function validarRegistro({ nombre, email, password, confirmacion }) {
  if (nombre.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres.'
  if (!EMAIL_VALIDO.test(email.trim())) return 'Ingresá un email válido.'
  if (password.length < 8) return 'La contraseña debe tener al menos 8 caracteres.'
  if (password !== confirmacion) return 'Las contraseñas no coinciden.'
  return null
}

export function mensajeErrorAuth(error) {
  if (error?.message === 'CONFIGURACION_INVALIDA') return 'Falta configurar VITE_BACKEND_URL en el archivo .env.'
  if (error?.message === 'RESPUESTA_INVALIDA') return 'El servidor respondió con datos inesperados.'
  if (error?.code === 'ECONNABORTED') return 'El servidor tardó demasiado en responder. Intentá nuevamente.'
  if (!error?.response) return 'No se pudo conectar con el servidor. Verificá que el backend esté en ejecución.'
  const { status, data } = error.response
  if (status === 401) return 'Email o contraseña incorrectos.'
  if (status === 409) return 'Ya existe una cuenta con ese email.'
  if (status === 400 && data?.message) return [data.message].flat().join(' ')
  return 'Ocurrió un error inesperado. Intentá nuevamente.'
}
