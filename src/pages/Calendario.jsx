import { useState } from 'react'
import { Alert, Badge, Button, Card, Form, ListGroup, Modal, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PageLayout from '../components/PageLayout'
import { fechaLocal, fechaPlanificable } from '../utils/agenda'

const diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
const fechaLegible = (fecha) => new Date(`${fecha}T12:00:00`).toLocaleDateString('es-AR', {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
})

function Calendario({ rutinas, rutinaPreferida, agenda, onAgendar, onQuitar, errorAgenda, habilitado, onReiniciar }) {
  const [fecha, setFecha] = useState(() => new Date())
  const [edicion, setEdicion] = useState(null)
  const [mensaje, setMensaje] = useState('')
  const [confirmarReinicio, setConfirmarReinicio] = useState(false)
  const mes = fecha.getMonth()
  const anio = fecha.getFullYear()
  const hoy = fechaLocal(new Date())
  const nombreMes = fecha.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' })
  const inicio = (new Date(anio, mes, 1).getDay() + 6) % 7
  const cantidad = new Date(anio, mes + 1, 0).getDate()
  const celdas = Array.from({ length: Math.ceil((inicio + cantidad) / 7) * 7 }, (_, indice) => {
    const dia = indice - inicio + 1
    return dia > 0 && dia <= cantidad ? dia : null
  })
  const semanas = Array.from({ length: celdas.length / 7 }, (_, indice) => celdas.slice(indice * 7, indice * 7 + 7))
  const prefijo = `${anio}-${String(mes + 1).padStart(2, '0')}-`
  const agendaMes = agenda.filter((item) => item.fecha.startsWith(prefijo))
    .toSorted((a, b) => a.fecha.localeCompare(b.fecha))
  const entrenamientoActual = edicion && agenda.find((item) => item.fecha === edicion.fecha)
  const rutinaDisponible = edicion && rutinas.some((rutina) => rutina.id === edicion.rutinaId)
  const fechaEditable = edicion && fechaPlanificable(edicion.fecha, hoy)

  function cambiarMes(cambio) {
    setFecha((actual) => new Date(actual.getFullYear(), actual.getMonth() + cambio, 1))
  }

  function abrirDia(fechaDia) {
    if (!fechaPlanificable(fechaDia)) return
    const entrenamiento = agenda.find((item) => item.fecha === fechaDia)
    setEdicion({ fecha: fechaDia, rutinaId: entrenamiento?.rutinaId || rutinaPreferida || '' })
    setMensaje('')
  }

  function guardar(evento) {
    evento.preventDefault()
    if (!habilitado || !rutinaDisponible) return
    if (!fechaPlanificable(edicion.fecha)) {
      setMensaje('No se pueden modificar entrenamientos en fechas pasadas.')
      setEdicion(null)
      return
    }
    onAgendar(edicion.fecha, edicion.rutinaId)
    setMensaje(`Entrenamiento ${entrenamientoActual ? 'actualizado' : 'agendado'} para el ${fechaLegible(edicion.fecha)}.`)
    setEdicion(null)
  }

  function quitar() {
    if (!edicion || !fechaPlanificable(edicion.fecha)) {
      setMensaje('Los entrenamientos de fechas pasadas se conservan como historial.')
      setEdicion(null)
      return
    }
    onQuitar(edicion.fecha)
    setMensaje(`Se quitó el entrenamiento del ${fechaLegible(edicion.fecha)}.`)
    setEdicion(null)
  }

  return (
    <PageLayout titulo="Calendario" descripcion="Elegí un día y asignale una rutina para organizar tus entrenamientos." className="bg-body-tertiary">
      <Card className="calendario-app mx-auto border-0 bg-transparent">
        <Card.Body>
          {errorAgenda && (
            <Alert variant="warning">
              {errorAgenda}
              {!habilitado && <Button variant="outline-dark" size="sm" className="d-block mt-2" onClick={() => setConfirmarReinicio(true)}>Empezar una agenda nueva</Button>}
            </Alert>
          )}
          <div className="d-flex justify-content-center align-items-center gap-3 mb-4">
            <Button size="sm" className="rounded-pill" variant="outline-primary" aria-label="Mes anterior" onClick={() => cambiarMes(-1)}>‹</Button>
            <h2 className="h4 text-capitalize text-center mb-0" aria-live="polite">{nombreMes}</h2>
            <Button size="sm" className="rounded-pill" variant="outline-primary" aria-label="Mes siguiente" onClick={() => cambiarMes(1)}>›</Button>
          </div>
          <p className="small text-body-secondary text-center">Tocá un día de hoy en adelante para agendar o modificar su rutina. Las fechas pasadas son de solo lectura.</p>
          <Table responsive borderless className="text-center align-middle mb-3 calendario">
            <caption className="visually-hidden">Calendario de {nombreMes}; semanas de lunes a domingo. Los días marcados tienen un entrenamiento.</caption>
            <thead><tr>{diasSemana.map((dia) => <th key={dia} scope="col">{dia}</th>)}</tr></thead>
            <tbody>
              {semanas.map((semana, indice) => (
                <tr key={indice}>
                  {semana.map((dia, columna) => {
                    if (!dia) return <td key={columna} className="dia-vacio" />
                    const fechaDia = fechaLocal(new Date(anio, mes, dia))
                    const esPasado = !fechaPlanificable(fechaDia, hoy)
                    const entrenamiento = agenda.find((item) => item.fecha === fechaDia)
                    const nombreRutina = rutinas.find((rutina) => rutina.id === entrenamiento?.rutinaId)?.nombre || 'Rutina no disponible'
                    return (
                      <td key={columna} className={entrenamiento ? 'con-entreno' : ''}>
                        <Button variant="link" className={`dia-boton w-100 h-100 p-1 text-decoration-none d-flex flex-column justify-content-center align-items-center ${fechaDia === hoy ? 'text-primary fw-bold' : 'text-body'}`}
                          disabled={esPasado}
                          aria-label={`${fechaLegible(fechaDia)}${entrenamiento ? `, agendado: ${nombreRutina}` : ', sin entrenamiento'}${esPasado ? ', fecha pasada, solo lectura' : ''}`}
                          aria-current={fechaDia === hoy ? 'date' : undefined} onClick={() => abrirDia(fechaDia)}>
                          {dia}
                          {entrenamiento && <span className="text-primary lh-1" aria-hidden="true">●</span>}
                        </Button>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
            <Button variant="outline-primary" size="sm" className="rounded-pill" onClick={() => setFecha(new Date())}>Volver al mes actual</Button>
            <span className="small text-body-secondary"><span className="text-primary" aria-hidden="true">●</span> Día con entrenamiento</span>
          </div>
          <p role="status" className="small text-primary mt-3 mb-0">{mensaje}</p>
          <section aria-labelledby="agenda-mes" className="mt-4">
            <h3 id="agenda-mes" className="h5">Entrenamientos del mes <Badge bg="primary">{agendaMes.length}</Badge></h3>
            {agendaMes.length === 0 ? <p className="text-body-secondary">Todavía no hay entrenamientos agendados para este mes.</p> : (
              <ListGroup>
                {agendaMes.map((item) => (
                  <ListGroup.Item key={item.fecha} className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2">
                    <div>
                      <p className="fw-semibold mb-1">{rutinas.find((rutina) => rutina.id === item.rutinaId)?.nombre || 'Rutina no disponible'}</p>
                      <p className="small text-body-secondary mb-0">{fechaLegible(item.fecha)}</p>
                    </div>
                    {fechaPlanificable(item.fecha, hoy) ? (
                      <Button variant="outline-primary" size="sm" className="rounded-pill" aria-label={`Editar entrenamiento del ${fechaLegible(item.fecha)}`} onClick={() => abrirDia(item.fecha)}>Editar</Button>
                    ) : <Badge bg="secondary">Historial · Solo lectura</Badge>}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </section>
          <p className="small text-body-secondary mt-3 mb-0">La agenda se guarda únicamente en este navegador. Agendar no significa que hayas completado el entrenamiento.</p>
        </Card.Body>
      </Card>

      <Modal show={!!edicion} onHide={() => setEdicion(null)} centered aria-labelledby="titulo-entrenamiento">
        <Form onSubmit={guardar}>
          <Modal.Header closeButton><Modal.Title as="h2" id="titulo-entrenamiento">{entrenamientoActual ? 'Modificar entrenamiento' : 'Agendar entrenamiento'}</Modal.Title></Modal.Header>
          <Modal.Body>
            {edicion && <p className="text-capitalize">{fechaLegible(edicion.fecha)}</p>}
            {edicion && !fechaEditable && <Alert variant="warning">Esta fecha ya pasó. No se puede modificar su entrenamiento.</Alert>}
            {!habilitado ? <Alert variant="warning">Antes de editar, recuperá tus datos o confirmá que querés empezar una agenda nueva.</Alert> : rutinas.length === 0 ? (
              <p>No hay rutinas disponibles. <Link to="/rutinas" onClick={() => setEdicion(null)}>Ir a Rutinas</Link></p>
            ) : (
              <Form.Group controlId="rutina-agenda">
                <Form.Label>Rutina para este día</Form.Label>
                <Form.Select value={rutinaDisponible ? edicion.rutinaId : ''} disabled={!fechaEditable} required onChange={(evento) => setEdicion((actual) => ({ ...actual, rutinaId: evento.target.value }))}>
                  <option value="">Elegí una rutina</option>
                  {rutinas.map((rutina) => <option key={rutina.id} value={rutina.id}>{rutina.nombre}</option>)}
                </Form.Select>
                <Form.Text>Se agenda una rutina por día. Guardar otra reemplaza la asignación de ese día.</Form.Text>
              </Form.Group>
            )}
          </Modal.Body>
          <Modal.Footer className="gap-2">
            {entrenamientoActual && <Button variant="outline-danger" className="me-auto rounded-pill" disabled={!habilitado || !fechaEditable} onClick={quitar}>Quitar entrenamiento</Button>}
            <Button variant="outline-secondary" className="rounded-pill" onClick={() => setEdicion(null)}>Cancelar</Button>
            <Button type="submit" className="rounded-pill" disabled={!habilitado || !rutinaDisponible || !fechaEditable}>{entrenamientoActual ? 'Guardar cambios' : 'Agendar'}</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={confirmarReinicio} onHide={() => setConfirmarReinicio(false)} centered aria-labelledby="titulo-reinicio">
        <Modal.Header closeButton><Modal.Title as="h2" id="titulo-reinicio">Empezar una agenda nueva</Modal.Title></Modal.Header>
        <Modal.Body>Esto reemplazará la agenda local que no se pudo leer. Los datos anteriores no se podrán recuperar desde la aplicación.</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setConfirmarReinicio(false)}>Cancelar</Button>
          <Button variant="danger" onClick={() => { onReiniciar(); setConfirmarReinicio(false); setMensaje('Se inició una agenda nueva.') }}>Reemplazar agenda local</Button>
        </Modal.Footer>
      </Modal>
    </PageLayout>
  )
}

export default Calendario
