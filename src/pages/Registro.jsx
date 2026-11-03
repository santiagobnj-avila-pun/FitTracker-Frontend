import { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link, Navigate, useLocation } from 'react-router-dom'
import PageLayout from '../components/PageLayout'
import FormularioAuth from '../components/FormularioAuth'
import useAuth from '../hooks/useAuth'
import { mensajeErrorAuth, validarRegistro } from '../utils/auth'

function Registro() {
  const { autenticado, registrarse } = useAuth()
  const { state } = useLocation()
  const [datos, setDatos] = useState({ nombre: '', email: '', password: '', confirmacion: '' })
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  if (autenticado) return <Navigate to={state?.desde || '/'} replace />

  function cambiar(evento) {
    setDatos((actuales) => ({ ...actuales, [evento.target.name]: evento.target.value }))
  }

  async function enviar(evento) {
    evento.preventDefault()
    const invalido = validarRegistro(datos)
    if (invalido) return setError(invalido)
    setError('')
    setEnviando(true)
    try {
      await registrarse(datos)
    } catch (fallo) {
      setError(mensajeErrorAuth(fallo))
      setEnviando(false)
    }
  }

  return (
    <PageLayout titulo="Crear cuenta" descripcion="Registrate en Fit Tracker para guardar tus rutinas y tu calendario." noIndex>
      <FormularioAuth
        titulo="Registrarse"
        error={error}
        enviando={enviando}
        textoBoton="Crear cuenta"
        onEnviar={enviar}
        pie={<>¿Ya tenés cuenta? <Link to="/login" state={state}>Iniciá sesión</Link></>}
      >
        <Form.Group controlId="registro-nombre" className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control name="nombre" autoComplete="name" autoFocus required maxLength={60} value={datos.nombre} onChange={cambiar} />
        </Form.Group>
        <Form.Group controlId="registro-email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" autoComplete="email" required value={datos.email} onChange={cambiar} />
        </Form.Group>
        <Form.Group controlId="registro-password" className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" name="password" autoComplete="new-password" required minLength={8} value={datos.password} onChange={cambiar} aria-describedby="ayuda-password" />
          <Form.Text id="ayuda-password">Mínimo 8 caracteres.</Form.Text>
        </Form.Group>
        <Form.Group controlId="registro-confirmacion" className="mb-3">
          <Form.Label>Repetir contraseña</Form.Label>
          <Form.Control type="password" name="confirmacion" autoComplete="new-password" required value={datos.confirmacion} onChange={cambiar} />
        </Form.Group>
      </FormularioAuth>
    </PageLayout>
  )
}

export default Registro
