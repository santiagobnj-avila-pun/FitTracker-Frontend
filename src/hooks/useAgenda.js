import { useEffect, useState } from 'react'
import { asignarRutina, cargarAgenda, fechaPlanificable, guardarAgenda } from '../utils/agenda'

function useAgenda() {
  const [inicial] = useState(() => cargarAgenda())
  const [agenda, setAgenda] = useState(inicial.agenda)
  const [habilitado, setHabilitado] = useState(!inicial.error)
  const [errorGuardado, setErrorGuardado] = useState(null)

  useEffect(() => {
    if (!habilitado) return
    let vigente = true
    const error = guardarAgenda(agenda)
    queueMicrotask(() => {
      if (vigente) setErrorGuardado(error)
    })
    return () => { vigente = false }
  }, [agenda, habilitado])

  function agendar(fecha, rutinaId) {
    if (habilitado && fechaPlanificable(fecha)) setAgenda((actual) => asignarRutina(actual, fecha, rutinaId))
  }

  function quitar(fecha) {
    if (habilitado && fechaPlanificable(fecha)) setAgenda((actual) => actual.filter((item) => item.fecha !== fecha))
  }

  function reiniciar() {
    setAgenda([])
    setHabilitado(true)
  }

  return {
    agenda,
    agendar,
    quitar,
    reiniciar,
    habilitado,
    error: habilitado ? errorGuardado : inicial.error,
  }
}

export default useAgenda