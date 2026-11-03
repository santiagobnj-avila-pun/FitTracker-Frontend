import { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link, Navigate, useLocation } from 'react-router-dom'
import PageLayout from '../components/PageLayout'
import FormularioAuth from '../components/FormularioAuth'
import useAuth from '../hooks/useAuth'
import { mensajeErrorAuth, validarIngreso } from '../utils/auth'

function Login() {
  const { autenticado, ingresar } = useAuth()
  const { state } = useLocation()
  const [datos, setDatos] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  if (autenticado) return <Navigate to={state?.desde || '/'} replace />

  function cambiar(evento) {
    setDatos((actuales) => ({ ...actuales, [evento.target.name]: evento.target.value }))
  }

  async function enviar(evento) {
    evento.preventDefault()
    const invalido = validarIngreso(datos)
    if (invalido) return setError(invalido)
    setError('')
    setEnviando(true)
    try {
      await ingresar(datos)
    } catch (fallo) {
      setError(mensajeErrorAuth(fallo))
      setEnviando(false)
    }
  }

  return (
    <PageLayout titulo="Ingresar" descripcion="Iniciá sesión para guardar tus rutinas, tu calendario y tu progreso." noIndex>
      <FormularioAuth
        titulo="Iniciar sesión"
        error={error || (state?.desde && 'Iniciá sesión para acceder a esa sección.')}
        enviando={enviando}
        textoBoton="Ingresar"
        onEnviar={enviar}
        pie={<>¿No tenés cuenta? <Link to="/registro" state={state}>Registrate</Link></>}
      >
        <Form.Group controlId="login-email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" autoComplete="email" autoFocus required value={datos.email} onChange={cambiar} />
        </Form.Group>
        <Form.Group controlId="login-password" className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" name="password" autoComplete="current-password" required value={datos.password} onChange={cambiar} />
        </Form.Group>
      </FormularioAuth>
    </PageLayout>
  )
}

export default Login
