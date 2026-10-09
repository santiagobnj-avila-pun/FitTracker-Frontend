import { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { obtenerEjercicios } from '../services/ejerciciosApi'
import { mensajeErrorApi } from '../utils/ejerciciosApi'

function useEjerciciosApi({ nombre, grupo, despues }) {
  const [intento, setIntento] = useState(0)
  const [resultado, setResultado] = useState({ clave: null, ejercicios: [], total: 0, siguiente: null, error: '' })
  const claveActual = JSON.stringify([nombre, grupo, despues, intento])

  useEffect(() => {
    const controller = new AbortController()
    const clave = JSON.stringify([nombre, grupo, despues, intento])
    let alertaAbierta = false

    async function cargar() {
      try {
        const datos = await obtenerEjercicios({ nombre, grupo, despues }, controller.signal)
        if (!controller.signal.aborted) setResultado({ ...datos, clave, error: '' })
      } catch (error) {
        if (controller.signal.aborted || axios.isCancel(error)) return
        const mensaje = mensajeErrorApi(error)
        setResultado({ clave, ejercicios: [], total: 0, siguiente: null, error: mensaje })
        alertaAbierta = true
        void Swal.fire({
          icon: 'error', title: 'No se pudo completar la consulta', text: mensaje,
          confirmButtonText: 'Entendido', confirmButtonColor: '#ff7a1a',
          background: '#1a1a1a', color: '#f2f2f2',
        }).then(() => { alertaAbierta = false })
      }
    }

    void cargar()
    return () => {
      controller.abort()
      if (alertaAbierta) Swal.close()
    }
  }, [nombre, grupo, despues, intento])

  return { ...resultado, cargando: resultado.clave !== claveActual, reintentar: () => setIntento((actual) => actual + 1) }
}

export default useEjerciciosApi