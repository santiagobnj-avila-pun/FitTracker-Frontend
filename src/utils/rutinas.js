export const CLAVE_RUTINAS = 'fit-tracker-rutinas-v1'

export function validarRutina(rutina, catalogo) {
  if (!rutina || typeof rutina.nombre !== 'string' || !rutina.nombre.trim() || rutina.nombre.trim().length > 80) return 'Ingresá un nombre de hasta 80 caracteres.'
  if (typeof rutina.descripcion !== 'string' || rutina.descripcion.length > 300) return 'La descripción puede tener hasta 300 caracteres.'
  if (!Array.isArray(rutina.ejercicios) || rutina.ejercicios.length === 0) return 'Agregá al menos un ejercicio.'
  const ids = new Set()
  for (const item of rutina.ejercicios) {
    if (!item || !catalogo.some((ejercicio) => ejercicio.id === item.ejercicioId)) return 'Elegí ejercicios disponibles en el catálogo.'
    if (ids.has(item.ejercicioId)) return 'No repitas el mismo ejercicio en la rutina.'
    ids.add(item.ejercicioId)
    if (!Number.isInteger(item.series) || item.series < 1 || item.series > 20) return 'Las series deben ser un número entero entre 1 y 20.'
    if (!['repeticiones', 'segundos'].includes(item.unidad)) return 'Elegí repeticiones o segundos.'
    const limite = item.unidad === 'segundos' ? 600 : 100
    if (!Number.isInteger(item.cantidad) || item.cantidad < 1 || item.cantidad > limite) return `La cantidad debe ser un número entero entre 1 y ${limite}.`
  }
  return null
}

export function validarBiblioteca(rutinas, catalogo) {
  return Array.isArray(rutinas)
    && rutinas.every((rutina) => rutina && typeof rutina.id === 'string' && rutina.id.startsWith('personal-') && !validarRutina(rutina, catalogo))
    && new Set(rutinas.map((rutina) => rutina.id)).size === rutinas.length
}

export function cargarRutinas(catalogo, storage) {
  try {
    const texto = (storage || window.localStorage).getItem(CLAVE_RUTINAS)
    if (!texto) return { rutinas: [], error: null }
    const rutinas = JSON.parse(texto)
    if (!validarBiblioteca(rutinas, catalogo)) throw new Error('Biblioteca inválida')
    return { rutinas, error: null }
  } catch {
    return { rutinas: [], error: 'No pudimos leer tus rutinas guardadas. No se sobrescribieron: recuperá los datos locales antes de crear o editar rutinas.' }
  }
}

export function guardarRutinas(rutinas, catalogo, storage) {
  try {
    if (!validarBiblioteca(rutinas, catalogo)) throw new Error('Biblioteca inválida')
    ;(storage || window.localStorage).setItem(CLAVE_RUTINAS, JSON.stringify(rutinas))
    return null
  } catch {
    return 'No se pudieron guardar tus rutinas en este navegador. Los cambios están disponibles durante esta visita, pero podrían perderse al recargar.'
  }
}

export function actualizarRutina(rutinas, rutina) {
  return rutinas.some((item) => item.id === rutina.id)
    ? rutinas.map((item) => item.id === rutina.id ? rutina : item)
    : [...rutinas, rutina]
}