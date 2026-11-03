import { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import * as authApi from '../services/authApi'
import { borrarSesion, cargarSesion, EVENTO_SESION_EXPIRADA, guardarSesion } from '../utils/auth'

function AuthProvider({ children }) {
  const [inicial] = useState(() => cargarSesion())
  const [sesion, setSesion] = useState(inicial)

  function cerrarSesion() {
    borrarSesion()
    setSesion(null)
  }

  function abrirSesion(nueva) {
    guardarSesion(nueva)
    setSesion(nueva)
  }

  useEffect(() => {
    function expirar() {
      borrarSesion()
      setSesion(null)
    }
    window.addEventListener(EVENTO_SESION_EXPIRADA, expirar)
    return () => window.removeEventListener(EVENTO_SESION_EXPIRADA, expirar)
  }, [])

  // Al abrir la aplicación se confirma con el backend que el token guardado sigue vigente.
  // Si el servidor no responde se conserva la sesión local; un 401 la cierra mediante el interceptor.
  useEffect(() => {
    if (!inicial) return
    const controller = new AbortController()
    authApi.obtenerPerfil(controller.signal)
      .then((usuario) => {
        const actual = cargarSesion()
        if (controller.signal.aborted || !actual) return
        const actualizada = { ...actual, usuario }
        guardarSesion(actualizada)
        setSesion(actualizada)
      })
      .catch(() => {})
    return () => controller.abort()
  }, [inicial])

  async function ingresar(datos) {
    abrirSesion(await authApi.ingresar(datos))
  }

  async function registrarse(datos) {
    abrirSesion(await authApi.registrar(datos))
  }

  return (
    <AuthContext.Provider value={{ usuario: sesion?.usuario || null, autenticado: Boolean(sesion), ingresar, registrarse, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
