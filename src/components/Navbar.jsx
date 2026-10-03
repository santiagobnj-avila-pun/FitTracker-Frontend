import { useState } from 'react'
import { Container, Nav, Navbar as BootstrapNavbar } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { navegacion } from '../data/contenido'
import ImagenIlustrativa from './ImagenIlustrativa'

function Navbar() {
  const [expandida, setExpandida] = useState(false)

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
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  )
}

export default Navbar