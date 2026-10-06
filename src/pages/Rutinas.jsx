import { useState } from 'react'
import { Alert, Badge, Button, Card, Col, Modal, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PageLayout from '../components/PageLayout'
import RutinaItem from '../components/RutinaItem'
import FormularioRutina from '../components/FormularioRutina'

function Rutinas({ rutinas, seleccionada, onSeleccionar, ejercicios, seleccionados, onGuardar, onEliminar, errorRutinas, habilitado }) {
  const [formulario, setFormulario] = useState(null)
  const [porEliminar, setPorEliminar] = useState(null)
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')
  const rutinaActual = rutinas.find((rutina) => rutina.id === seleccionada)
  const personales = rutinas.filter((rutina) => rutina.id.startsWith('personal-'))
  const plantillas = rutinas.filter((rutina) => !rutina.id.startsWith('personal-'))

  function guardar(datos) {
    const resultado = onGuardar(datos)
    if (!resultado.error) {
      setFormulario(null)
      setError('')
      setMensaje(datos.id ? 'Rutina actualizada.' : 'Rutina creada y seleccionada. Ya podés usarla en el calendario.')
    }
    return resultado
  }

  function eliminar() {
    const problema = onEliminar(porEliminar.id)
    setPorEliminar(null)
    setError(problema || '')
    setMensaje(problema ? '' : 'Rutina eliminada.')
  }

  return (
    <PageLayout titulo="Rutinas" descripcion="Creá tus propias rutinas o elegí una plantilla para organizar tu entrenamiento." className="bg-body-tertiary">
      {errorRutinas && <Alert variant="warning">{errorRutinas}</Alert>}
      {error && <Alert variant="warning" role="alert">{error}</Alert>}
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <p className="text-body-secondary mb-0">Tus rutinas propias se guardan en este navegador.</p>
        <Button disabled={!habilitado} className="rounded-pill" onClick={() => setFormulario({ rutina: null })}>Crear mi rutina</Button>
      </div>
      <p role="status" className="text-primary">{mensaje}</p>
      <Row className="g-4">
        <Col xs={12} lg={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-transparent border-0 pt-4 px-4">
              <h2 className="h5 mb-0"><i className="bi bi-collection text-primary me-2" aria-hidden="true" />Biblioteca de rutinas</h2>
            </Card.Header>
            <Card.Body className="pt-2">
              <ul className="list-group list-group-flush">
                {plantillas.map((rutina) => <RutinaItem key={rutina.id} rutina={rutina} seleccionada={seleccionada === rutina.id} onSeleccionar={onSeleccionar} />)}
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
                  {rutinaActual.ejercicios && (
                    <ol className="ps-3">
                      {rutinaActual.ejercicios.map((item) => <li key={item.ejercicioId} className="mb-2">{ejercicios.find((ejercicio) => ejercicio.id === item.ejercicioId)?.nombre || 'Ejercicio no disponible'}: {item.series} series de {item.cantidad} {item.unidad}.</li>)}
                    </ol>
                  )}
                  <Link to="/calendario" className="btn btn-primary btn-sm rounded-pill mb-3">Agendar esta rutina</Link>
                </>
              ) : <p className="text-body-secondary">Elegí una rutina de la biblioteca para verla en tu resumen.</p>}
              <Link to="/progreso" className="btn btn-outline-primary btn-sm rounded-pill mt-auto">Consultar mi resumen</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <section className="mt-4" aria-labelledby="mis-rutinas">
        <h2 id="mis-rutinas" className="h4">Mis rutinas personalizadas <Badge bg="primary">{personales.length}</Badge></h2>
        {!personales.length && <p className="text-body-secondary">Todavía no creaste rutinas. Podés empezar desde cero o con los ejercicios que seleccionaste en el catálogo.</p>}
        <Row className="g-3" xs={1} md={2}>
          {personales.map((rutina) => (
            <Col key={rutina.id}>
              <Card className="h-100 shadow-sm">
                <Card.Body className="d-flex flex-column">
                  <h3 className="h5">{rutina.nombre}</h3>
                  {rutina.descripcion && <p className="text-body-secondary">{rutina.descripcion}</p>}
                  <ol className="ps-3">
                    {rutina.ejercicios.map((item) => <li key={item.ejercicioId} className="mb-2">{ejercicios.find((ejercicio) => ejercicio.id === item.ejercicioId)?.nombre || 'Ejercicio no disponible'}: {item.series} × {item.cantidad} {item.unidad}.</li>)}
                  </ol>
                  <div className="d-flex flex-wrap gap-2 mt-auto">
                    <Button size="sm" className="rounded-pill" variant={seleccionada === rutina.id ? 'outline-primary' : 'primary'} aria-pressed={seleccionada === rutina.id} onClick={() => onSeleccionar(seleccionada === rutina.id ? null : rutina.id)}>{seleccionada === rutina.id ? 'Seleccionada' : 'Usar rutina'}</Button>
                    <Button size="sm" variant="outline-secondary" disabled={!habilitado} aria-label={`Editar ${rutina.nombre}`} onClick={() => setFormulario({ rutina })}>Editar</Button>
                    <Button size="sm" variant="outline-danger" disabled={!habilitado} aria-label={`Eliminar ${rutina.nombre}`} onClick={() => setPorEliminar(rutina)}>Eliminar</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
      <p className="small text-body-secondary mt-4 mb-0">Estas plantillas son ejemplos generales y no sustituyen una planificación profesional.</p>
      {formulario && <FormularioRutina rutina={formulario.rutina} ejercicios={ejercicios} seleccionados={seleccionados} onGuardar={guardar} onCerrar={() => setFormulario(null)} />}
      <Modal show={!!porEliminar} onHide={() => setPorEliminar(null)} centered aria-labelledby="titulo-eliminar-rutina">
        <Modal.Header closeButton><Modal.Title as="h2" id="titulo-eliminar-rutina">Eliminar rutina</Modal.Title></Modal.Header>
        <Modal.Body>¿Querés eliminar «{porEliminar?.nombre}»? No se puede deshacer. Las rutinas con asignaciones en el calendario no se pueden eliminar.</Modal.Body>
        <Modal.Footer><Button variant="outline-secondary" onClick={() => setPorEliminar(null)}>Cancelar</Button><Button variant="danger" onClick={eliminar}>Eliminar rutina</Button></Modal.Footer>
      </Modal>
    </PageLayout>
  )
}

export default Rutinas