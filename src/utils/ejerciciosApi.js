export function urlApiValida(valor) {
  try {
    const url = new URL(valor)
    return url.protocol === 'https:' && !url.username && !url.password
  } catch {
    return false
  }
}

function listaTextos(valor) {
  return Array.isArray(valor) && valor.every((item) => typeof item === 'string')
}

export function normalizarRespuesta(respuesta) {
  const meta = respuesta?.meta
  if (respuesta?.success !== true || !Array.isArray(respuesta.data)
    || !Number.isInteger(meta?.total) || meta.total < 0 || typeof meta.hasNextPage !== 'boolean'
    || (meta.hasNextPage && (typeof meta.nextCursor !== 'string' || !meta.nextCursor))) {
    throw new Error('RESPUESTA_INVALIDA')
  }
  const ids = new Set()
  const ejercicios = respuesta.data.map((item) => {
    if (!item || typeof item.exerciseId !== 'string' || !item.exerciseId.trim() || ids.has(item.exerciseId)
      || typeof item.name !== 'string' || !item.name.trim()
      || !['bodyParts', 'equipments', 'targetMuscles', 'secondaryMuscles', 'instructions'].every((campo) => listaTextos(item[campo]))) {
      throw new Error('RESPUESTA_INVALIDA')
    }
    ids.add(item.exerciseId)
    return {
      id: item.exerciseId,
      nombre: item.name,
      imagen: typeof item.gifUrl === 'string' && urlApiValida(item.gifUrl) ? item.gifUrl : null,
      zonas: item.bodyParts,
      equipos: item.equipments,
      musculos: item.targetMuscles,
      secundarios: item.secondaryMuscles,
      instrucciones: item.instructions.map((texto) => texto.replace(/^Step:\s*\d+\s*/i, '')),
    }
  })
  return { ejercicios, total: meta.total, siguiente: meta.hasNextPage ? meta.nextCursor : null }
}

export function mensajeErrorApi(error) {
  if (error.message === 'CONFIGURACION_INVALIDA') return 'Falta una URL HTTPS válida en VITE_API_URL. Revisá el archivo .env y reiniciá el servidor de desarrollo.'
  if (error.message === 'RESPUESTA_INVALIDA') return 'La API devolvió datos con un formato inesperado. Intentá nuevamente más tarde.'
  if (error.response?.status === 429) return 'La API alcanzó su límite de consultas. Esperá unos minutos antes de reintentar.'
  if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') return 'La consulta tardó demasiado. Revisá tu conexión y volvé a intentar.'
  if (error.response?.status === 401 || error.response?.status === 403) return 'La API rechazó el acceso. Revisá la configuración y la disponibilidad de la versión pública.'
  return 'No pudimos cargar los ejercicios externos. Revisá tu conexión o intentá nuevamente más tarde. Tus ejercicios y rutinas locales siguen disponibles.'
}