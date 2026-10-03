import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PageLayout from '../components/PageLayout'
import RutinaItem from '../components/RutinaItem'

function Rutinas({ rutinas, seleccionada, onSeleccionar }) {
  const rutinaActual = rutinas.find((rutina) => rutina.id === seleccionada)

  return (
    <PageLayout titulo="Rutinas" descripcion="Elegí una rutina para organizar tu entrenamiento." className="bg-body-tertiary">
      <Row className="g-4">
        <Col xs={12} lg={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-transparent border-0 pt-4 px-4">
              <h2 className="h5 mb-0"><i className="bi bi-collection text-primary me-2" aria-hidden="true" />Biblioteca de rutinas</h2>
            </Card.Header>
            <Card.Body className="pt-2">
              <ul className="list-group list-group-flush">
                {rutinas.map((rutina) => <RutinaItem key={rutina.id} rutina={rutina} seleccionada={seleccionada === rutina.id} onSeleccionar={onSeleccionar} />)}
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} lg={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-transparent border-0 pt-4 px-4">
              <h2 className="h5 mb-0"><i className="bi bi-clipboard-check text-primary me-2" aria-hidden="true" />Mi rutina</h2>
            </Card.Header>
            <Card.Body className="p-4 pt-3 d-flex flex-column align-items-start">
              {rutinaActual ? (
                <>
                  <h3 className="h4">{rutinaActual.nombre}</h3>
                  <p className="text-body-secondary">{rutinaActual.descripcion}</p>
                </>
              ) : <p className="text-body-secondary">Elegí una rutina de la biblioteca para verla en tu resumen.</p>}
              <Link to="/progreso" className="btn btn-outline-primary btn-sm rounded-pill mt-auto">Consultar mi resumen</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <p className="small text-body-secondary mt-4 mb-0">Estas plantillas son ejemplos generales y no sustituyen una planificación profesional.</p>
    </PageLayout>
  )
}

export default Rutinas
