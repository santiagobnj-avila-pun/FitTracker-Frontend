import { Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PageLayout from '../components/PageLayout'
import ImagenIlustrativa from '../components/ImagenIlustrativa'

function Inicio({ cantidadEjercicios, rutina }) {
  const resumen = [
    { icono: 'collection', titulo: 'Rutina seleccionada', valor: rutina?.nombre || 'Elegí tu rutina', ruta: '/rutinas' },
    { icono: 'check2-circle', titulo: 'Ejercicios elegidos', valor: `${cantidadEjercicios} ejercicios`, ruta: '/progreso' },
    { icono: 'calendar-event', titulo: 'Calendario', valor: 'Organizá tu semana', ruta: '/calendario' },
    { icono: 'activity', titulo: 'Catálogo de ejercicios', valor: '48 opciones para vos', ruta: '/ejercicios' },
  ]

  return (
    <PageLayout titulo="Organizá tu entrenamiento" descripcion="Consultá ejercicios, elegí rutinas y organizá tu semana con Fit Tracker." mostrarEncabezado={false} anchoCompleto>
      <header className="hero-fit position-relative overflow-hidden d-flex align-items-center border-bottom py-5">
        <Container>
          <Row className="align-items-center g-4 g-lg-5">
            <Col xs={12} lg={6} className="text-center text-lg-start">
              <span className="hero-etiqueta">ENTRENÁ CON UN PLAN</span>
              <h1 id="titulo-pagina" className="hero-titulo mt-3 mb-3">Organizá tu entrenamiento y <span>superá tus marcas</span></h1>
              <p className="hero-descripcion lead text-body-secondary mb-4">Consultá ejercicios, elegí tu rutina y organizá tu entrenamiento desde un solo lugar.</p>
            </Col>
            <Col xs={12} lg={6} className="text-center">
              <div className="hero-mascota-contenedor mx-auto">
                <ImagenIlustrativa src="/img/mascota-fit-tracker.png" alt="Mascota de Fit Tracker con forma de mancuerna" className="hero-mascota d-block w-100 object-fit-contain" loading="eager" />
              </div>
            </Col>
          </Row>
        </Container>
      </header>
      <section className="py-5" aria-labelledby="resumen">
        <Container>
          <div className="text-center mb-5">
            <h2 id="resumen" className="section-title d-inline-block">Resumen</h2>
            <p className="lead text-body-secondary mt-2">Tu entrenamiento, de un vistazo.</p>
          </div>
          <Row xs={1} sm={2} lg={4} className="g-4">
            {resumen.map(({ icono, titulo, valor, ruta }) => (
              <Col key={ruta}>
                <Card className="h-100 text-center shadow-sm card-resaltada">
                  <Card.Body>
                    <i className={`bi bi-${icono} display-6 text-primary`} aria-hidden="true" />
                    <h3 className="h6 text-body-secondary mt-3 mb-1">{titulo}</h3>
                    <Link to={ruta} className="stretched-link fw-semibold fs-5 text-body text-decoration-none">{valor}</Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </PageLayout>
  )
}

export default Inicio
