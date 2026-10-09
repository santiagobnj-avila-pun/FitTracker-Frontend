import { useRef, useState } from 'react'
import { Alert, Badge, Button, Card, Modal, Spinner } from 'react-bootstrap'

function EjercicioExternoCard({ ejercicio }) {
  const [detalle, setDetalle] = useState(false)
  const [demostracion, setDemostracion] = useState(false)
  const [vistaPreviaLista, setVistaPreviaLista] = useState(false)
  const [falloImagen, setFalloImagen] = useState(false)
  const vistaPrevia = useRef(null)

  function capturarVistaPrevia(evento) {
    if (vistaPreviaLista || !vistaPrevia.current) return
    const imagen = evento.currentTarget
    const lienzo = vistaPrevia.current
    const contexto = lienzo.getContext('2d')
    if (!contexto) return
    lienzo.width = imagen.naturalWidth
    lienzo.height = imagen.naturalHeight
    contexto.drawImage(imagen, 0, 0)
    setVistaPreviaLista(true)
  }

  return (
    <>
      <Card as="article" className="h-100 shadow-sm card-resaltada">
        <div className="position-relative">
          {(falloImagen || !ejercicio.imagen) && <img src="/img/mascota-demostracion-no-disponible.png" alt="Mascota de Fit Tracker buscando la demostración con una lupa" className="card-img-top imagen-ejercicio p-3 object-fit-contain" width={480} height={320} />}
          {!vistaPreviaLista && !falloImagen && ejercicio.imagen && !demostracion && <div className="card-img-top imagen-ejercicio d-flex justify-content-center align-items-center" role="status"><Spinner animation="border" variant="primary" aria-hidden="true" /><span className="visually-hidden">Cargando vista previa de {ejercicio.nombre}</span></div>}
          <canvas ref={vistaPrevia} role="img" aria-label={`Vista previa quieta de ${ejercicio.nombre}`} className={`card-img-top imagen-ejercicio p-3 object-fit-contain ${vistaPreviaLista && !demostracion && !falloImagen ? '' : 'd-none'}`} />
          {ejercicio.imagen && !falloImagen && <img src={ejercicio.imagen} alt={demostracion ? `Demostración de ${ejercicio.nombre}` : ''} aria-hidden={!demostracion} className={`card-img-top imagen-ejercicio p-3 object-fit-contain ${demostracion ? '' : 'position-absolute top-0 start-0 opacity-0 pe-none'}`} loading="lazy" width={480} height={320} onLoad={capturarVistaPrevia} onError={() => { setFalloImagen(true); setDemostracion(false) }} />}
        </div>
        <Card.Body className="d-flex flex-column">
          <Card.Title as="h3" className="h5" lang="en">{ejercicio.nombre}</Card.Title>
          <div className="d-flex flex-wrap gap-2 mb-3">
            {ejercicio.zonas.map((zona, indice) => <Badge key={`${zona}-${indice}`} bg="primary" lang="en">{zona}</Badge>)}
            {ejercicio.equipos.map((equipo, indice) => <Badge key={`${equipo}-${indice}`} bg="secondary" lang="en">{equipo}</Badge>)}
          </div>
          <p className="small text-body-secondary">Músculos principales: <span lang="en">{ejercicio.musculos.join(', ') || 'No informados'}</span></p>
          {(falloImagen || !ejercicio.imagen) && <p role="status" className="small text-body-secondary">No pudimos cargar la demostración.</p>}
          <div className="d-flex flex-wrap gap-2 mt-auto">
            <Button size="sm" variant="outline-primary" className="rounded-pill" aria-label={`Ver instrucciones de ${ejercicio.nombre}`} onClick={() => setDetalle(true)}>Ver instrucciones</Button>
            <Button size="sm" variant="outline-secondary" className="rounded-pill" disabled={!ejercicio.imagen || falloImagen} aria-pressed={demostracion} aria-label={`${demostracion ? 'Ocultar' : 'Ver'} demostración de ${ejercicio.nombre}`} onClick={() => setDemostracion((actual) => !actual)}>{demostracion ? 'Ocultar GIF' : 'Ver demostración'}</Button>
          </div>
        </Card.Body>
      </Card>
      <Modal show={detalle} onHide={() => setDetalle(false)} centered scrollable aria-labelledby={`detalle-api-${ejercicio.id}`}>
        <Modal.Header closeButton><Modal.Title as="h2" id={`detalle-api-${ejercicio.id}`} lang="en">{ejercicio.nombre}</Modal.Title></Modal.Header>
        <Modal.Body>
          <p className="small text-body-secondary">Contenido original de ExerciseDB en inglés.</p>
          <h3 className="h6">Músculos secundarios</h3>
          <p lang="en">{ejercicio.secundarios.join(', ') || 'No informados'}</p>
          <h3 className="h6">Instrucciones</h3>
          {ejercicio.instrucciones.length ? <ol lang="en">{ejercicio.instrucciones.map((texto, indice) => <li key={indice} className="mb-2">{texto}</li>)}</ol> : <p>No se proporcionaron instrucciones.</p>}
          <Alert variant="secondary" className="small mb-0">Información orientativa. No reemplaza una planificación profesional. Los ejercicios externos no se agregan automáticamente a tus rutinas.</Alert>
        </Modal.Body>
        <Modal.Footer><Button variant="outline-primary" onClick={() => setDetalle(false)}>Cerrar</Button></Modal.Footer>
      </Modal>
    </>
  )
}

export default EjercicioExternoCard
