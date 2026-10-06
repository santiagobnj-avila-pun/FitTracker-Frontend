import { useEffect, useState } from 'react'
import { ejercicios, rutinas as plantillas } from '../data/contenido'
import { actualizarRutina, cargarRutinas, guardarRutinas, validarRutina } from '../utils/rutinas'

function useRutinas() {
  const [inicial] = useState(() => cargarRutinas(ejercicios))
  const [personales, setPersonales] = useState(inicial.rutinas)
  const [errorGuardado, setErrorGuardado] = useState(null)
  const habilitado = !inicial.error

  useEffect(() => {
    if (!habilitado) return
    let vigente = true
    const error = guardarRutinas(personales, ejercicios)
    queueMicrotask(() => {
      if (vigente) setErrorGuardado(error)
    })
    return () => { vigente = false }
  }, [personales, habilitado])

  function guardar(datos) {
    if (!habilitado) return { error: inicial.error }
    const error = validarRutina(datos, ejercicios)
    if (error) return { error }
    if (datos.id && !personales.some((rutina) => rutina.id === datos.id)) return { error: 'Esta rutina ya no está disponible.' }
    if ([...plantillas, ...personales].some((rutina) => rutina.id !== datos.id && rutina.nombre.trim().toLocaleLowerCase('es') === datos.nombre.trim().toLocaleLowerCase('es'))) {
      return { error: 'Ya existe una rutina con ese nombre.' }
    }
    const rutina = {
      id: datos.id || `personal-${crypto.randomUUID()}`,
      nombre: datos.nombre.trim(),
      descripcion: datos.descripcion.trim(),
      ejercicios: datos.ejercicios.map((item) => ({ ...item })),
    }
    setPersonales((actuales) => actualizarRutina(actuales, rutina))
    return { id: rutina.id, error: null }
  }

  function eliminar(id) {
    if (habilitado) setPersonales((actuales) => actuales.filter((rutina) => rutina.id !== id))
  }

  return { rutinas: [...plantillas, ...personales], personales, guardar, eliminar, habilitado, error: inicial.error || errorGuardado }
}

export default useRutinas