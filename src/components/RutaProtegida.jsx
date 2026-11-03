import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function RutaProtegida({ children }) {
  const { autenticado } = useAuth()
  const { pathname } = useLocation()

  if (!autenticado) return <Navigate to="/login" replace state={{ desde: pathname }} />
  return children
}

export default RutaProtegida
