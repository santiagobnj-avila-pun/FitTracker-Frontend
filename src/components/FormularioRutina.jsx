import { useState } from 'react'
import { Alert, Button, Col, Form, Modal, Row } from 'react-bootstrap'

function FormularioRutina({ rutina, ejercicios, seleccionados, onGuardar, onCerrar }) {
  const [nombre, setNombre] = useState(rutina?.nombre || '')
  const [descripcion, setDescripcion] = useState(rutina?.descripcion || '')
  const [items, setItems] = useState(() => rutina?.ejercicios.map((item) => ({ ...item })) || seleccionados.map((ejercicioId) => ({ ejercicioId, series: 3, cantidad: 10, unidad: 'repeticiones' })))
  const [ejercicioId, setEjercicioId] = useState('')
  const [error, setError] = useState('')
  const disponibles = ejercicios.filter((ejercicio) => !items.some((item) => item.ejercicioId === ejercicio.id))

  function agregar() {
    if (!disponibles.some((ejercicio) => ejercicio.id === ejercicioId)) return
    setItems((actuales) => [...actuales, { ejercicioId, series: 3, cantidad: 10, unidad: 'repeticiones' }])
    setEjercicioId('')
  }

  function cambiar(id, propiedad, valor) {
    setItems((actuales) => actuales.map((item) => item.ejercicioId === id ? { ...item, [propiedad]: valor } : item))
  }

  function enviar(evento) {
    evento.preventDefault()
    const resultado = onGuardar({ id: rutina?.id, nombre, descripcion, ejercicios: items.map((item) => ({ ...item, series: Number(item.series), cantidad: Number(item.cantidad) })) })
    if (resultado.error) setError(resultado.error)
  }

  return (
    <Modal show onHide={onCerrar} size="lg" centered scrollable aria-labelledby="titulo-formulario-rutina">
      <Form onSubmit={enviar} className="d-flex flex-column overflow-hidden">
        <Modal.Header closeButton><Modal.Title as="h2" id="titulo-formulario-rutina">{rutina ? 'Editar rutina' : 'Crear mi rutina'}</Modal.Title></Modal.Header>
        <Modal.Body>
          {error && <Alert variant="warning" role="alert">{error}</Alert>}
          <Form.Group controlId="nombre-rutina" className="mb-3">
            <Form.Label>Nombre de la rutina</Form.Label>
            <Form.Control autoFocus required maxLength={80} value={nombre} onChange={(evento) => setNombre(evento.target.value)} placeholder="Por ejemplo: Mi día de piernas" />
          </Form.Group>
          <Form.Group controlId="descripcion-rutina" className="mb-3">
            <Form.Label>Descripción (opcional)</Form.Label>
            <Form.Control as="textarea" rows={2} maxLength={300} value={descripcion} onChange={(evento) => setDescripcion(evento.target.value)} />
          </Form.Group>
          <h3 className="h5">Ejercicios de la rutina</h3>
          <p className="small text-body-secondary">Indicá series y repeticiones; para ejercicios de sostén, como la plancha, podés elegir segundos.</p>
          {items.length === 0 && <p>Agregá al menos un ejercicio para guardar la rutina.</p>}
          {items.map((item) => {
            const ejercicio = ejercicios.find((opcion) => opcion.id === item.ejercicioId)
            return (
              <fieldset key={item.ejercicioId} className="border rounded p-3 mb-3">
                <legend className="float-none w-auto h6 px-1">{ejercicio?.nombre || 'Ejercicio no disponible'}</legend>
                <Row className="g-2 align-items-end">
                  <Col xs={6} sm={3}>
                    <Form.Group controlId={`series-${item.ejercicioId}`}>
                      <Form.Label>Series</Form.Label>
                      <Form.Control type="number" required min={1} max={20} step={1} value={item.series} onChange={(evento) => cambiar(item.ejercicioId, 'series', evento.target.value)} />
                    </Form.Group>
                  </Col>
                  <Col xs={6} sm={3}>
                    <Form.Group controlId={`cantidad-${item.ejercicioId}`}>
                      <Form.Label>{item.unidad === 'segundos' ? 'Segundos' : 'Repeticiones'}</Form.Label>
                      <Form.Control type="number" required min={1} max={item.unidad === 'segundos' ? 600 : 100} step={1} value={item.cantidad} onChange={(evento) => cambiar(item.ejercicioId, 'cantidad', evento.target.value)} />
                    </Form.Group>
                  </Col>
                  <Col xs={8} sm={4}>
                    <Form.Group controlId={`unidad-${item.ejercicioId}`}>
                      <Form.Label>Medida</Form.Label>
                      <Form.Select value={item.unidad} onChange={(evento) => cambiar(item.ejercicioId, 'unidad', evento.target.value)}>
                        <option value="repeticiones">Repeticiones</option><option value="segundos">Segundos</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xs={4} sm={2}><Button variant="outline-danger" className="w-100" aria-label={`Quitar ${ejercicio?.nombre}`} onClick={() => setItems((actuales) => actuales.filter((opcion) => opcion.ejercicioId !== item.ejercicioId))}>Quitar</Button></Col>
                </Row>
              </fieldset>
            )
          })}
          <Form.Group controlId="agregar-ejercicio-rutina">
            <Form.Label>Agregar ejercicio del catálogo</Form.Label>
            <div className="d-flex flex-column flex-sm-row gap-2">
              <Form.Select value={ejercicioId} onChange={(evento) => setEjercicioId(evento.target.value)} disabled={!disponibles.length}>
                <option value="">Elegí un ejercicio</option>
                {disponibles.map((ejercicio) => <option key={ejercicio.id} value={ejercicio.id}>{ejercicio.nombre} · {ejercicio.musculo}</option>)}
              </Form.Select>
              <Button variant="outline-primary" disabled={!ejercicioId} onClick={agregar}>Agregar</Button>
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onCerrar}>Cancelar</Button>
          <Button type="submit">{rutina ? 'Guardar cambios' : 'Guardar rutina'}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default FormularioRutina