import { startTransition, useState } from 'react'
import { Button, Container, Nav, NavDropdown, Navbar as BootstrapNavbar } from 'react-bootstrap'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { navegacion } from '../data/contenido'
import useAuth from '../hooks/useAuth'
import ImagenIlustrativa from './ImagenIlustrativa'

function Navbar() {
  const [expandida, setExpandida] = useState(false)
  const { usuario, cerrarSesion } = useAuth()
  const navigate = useNavigate()

  function salir() {
    setExpandida(false)
    navigate('/')
    // React Router navega dentro de una transición; se cierra la sesión en la misma
    // para que la página protegida actual no redirija a /login antes de llegar a Inicio.
    startTransition(cerrarSesion)
  }

  return (
    <BootstrapNavbar
      expanded={expandida}
      onToggle={setExpandida}
      expand="lg"
      sticky="top"
      className="navbar-fit py-2"
      aria-label="Navegación principal"
    >
      <Container>
        <BootstrapNavbar.Brand
          as={Link}
          to="/"
          onClick={() => setExpandida(false)}
          className="text-uppercase d-flex align-items-center gap-2 mb-0"
        >
          Fit Tracker
          <ImagenIlustrativa
            src="/img/mascota-navbar-reclinada.png"
            alt=""
            className="navbar-mascota object-fit-contain"
            loading="eager"
          />
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle
          aria-controls="menu-principal"
          aria-label="Abrir o cerrar navegación"
        />

        <BootstrapNavbar.Collapse id="menu-principal">
          <Nav className="ms-auto text-center gap-lg-3">
            {navegacion.map(({ ruta, nombre }) => (
              <Nav.Link
                key={ruta}
                as={NavLink}
                to={ruta}
                end={ruta === '/'}
                onClick={() => setExpandida(false)}
              >
                {nombre}
              </Nav.Link>
            ))}
            {usuario ? (
              <NavDropdown
                id="menu-usuario"
                align="end"
                title={<><i className="bi bi-person-circle me-1" aria-hidden="true" />{usuario.nombre || usuario.email}</>}
              >
                <NavDropdown.ItemText className="small text-body-secondary">{usuario.email}</NavDropdown.ItemText>
                <NavDropdown.Divider />
                <NavDropdown.Item as="button" onClick={salir}>Cerrar sesión</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button
                as={Link}
                to="/login"
                size="sm"
                className="rounded-pill align-self-center px-3 my-2 my-lg-0"
                onClick={() => setExpandida(false)}
              >
                Ingresar
              </Button>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  )
}

export default Navbar