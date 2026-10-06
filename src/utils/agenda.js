export const CLAVE_AGENDA = 'fit-tracker-agenda-v1'

export function fechaLocal(fecha) {
  return `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`
}

export function fechaValida(texto) {
  if (typeof texto !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(texto)) return false
  const fecha = new Date(`${texto}T12:00:00`)
  return !Number.isNaN(fecha.getTime()) && fechaLocal(fecha) === texto
}

export function fechaPlanificable(fecha, hoy = fechaLocal(new Date())) {
  return fechaValida(fecha) && fechaValida(hoy) && fecha >= hoy
}

export function agendaValida(agenda) {
  return Array.isArray(agenda)
    && agenda.every((item) => item && fechaValida(item.fecha) && typeof item.rutinaId === 'string' && item.rutinaId.trim())
    && new Set(agenda.map((item) => item.fecha)).size === agenda.length
}

export function cargarAgenda(storage) {
  try {
    const guardado = (storage || window.localStorage).getItem(CLAVE_AGENDA)
    if (!guardado) return { agenda: [], error: null }
    const agenda = JSON.parse(guardado)
    if (!agendaValida(agenda)) throw new Error('Agenda inválida')
    return { agenda, error: null }
  } catch {
    return { agenda: [], error: 'No pudimos leer tu agenda local. No sobrescribimos los datos anteriores.' }
  }
}

export function guardarAgenda(agenda, storage) {
  try {
    if (!agendaValida(agenda)) throw new Error('Agenda inválida')
    ;(storage || window.localStorage).setItem(CLAVE_AGENDA, JSON.stringify(agenda))
    return null
  } catch {
    return 'No se pudo guardar la agenda en este navegador. Los cambios siguen disponibles durante esta visita, pero podrían perderse al recargar.'
  }
}

export function asignarRutina(agenda, fecha, rutinaId) {
  if (!fechaValida(fecha) || typeof rutinaId !== 'string' || !rutinaId.trim()) return agenda
  return [...agenda.filter((item) => item.fecha !== fecha), { fecha, rutinaId }]
    .sort((a, b) => a.fecha.localeCompare(b.fecha))
}