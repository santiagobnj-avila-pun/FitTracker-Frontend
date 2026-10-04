import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PageLayout from '../components/PageLayout'

function Progreso({ ejercicios, rutina }) {
  return (
    <PageLayout titulo="Progreso" descripcion="Consultá tu selección actual de ejercicios y rutinas.">
      <Row className="g-4">
        <Col md={6}>
          <Card className="h-100 card-resaltada shadow-sm"><Card.Body className="p-4">
            <h2 className="h4"><i className="bi bi-collection text-primary me-2" aria-hidden="true" />Rutina seleccionada</h2>
            <p>{rutina ? rutina.nombre : 'Todavía no elegiste una rutina.'}</p>
            <Link to="/rutinas" className="btn btn-outline-primary rounded-pill">Elegir rutina</Link>
          </Card.Body></Card>
        </Col>
        <Col md={6}>
          <Card className="h-100 card-resaltada shadow-sm"><Card.Body className="p-4">
            <h2 className="h4"><i className="bi bi-activity text-primary me-2" aria-hidden="true" />Ejercicios seleccionados</h2>
            {ejercicios.length > 0 ? <ul>{ejercicios.map((ejercicio) => <li key={ejercicio.id}>{ejercicio.nombre}</li>)}</ul> : <p>Todavía no seleccionaste ejercicios.</p>}
            <Link to="/ejercicios" className="btn btn-outline-primary rounded-pill">Explorar ejercicios</Link>
          </Card.Body></Card>
        </Col>
      </Row>
      <p className="text-body-secondary mt-4">Este resumen muestra tus elecciones durante esta visita. El registro de sesiones y las métricas de entrenamiento todavía no están disponibles.</p>
    </PageLayout>
  )
}

export default Progreso