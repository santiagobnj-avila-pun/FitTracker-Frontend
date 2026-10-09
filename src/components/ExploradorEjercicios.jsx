import { useState } from 'react'
import { Alert, Button, Col, Form, Row, Spinner } from 'react-bootstrap'
import useEjerciciosApi from '../hooks/useEjerciciosApi'
import EjercicioExternoCard from './EjercicioExternoCard'

const grupos = [
  { valor: '', nombre: 'Todos los grupos' }, { valor: 'chest', nombre: 'Pecho' },
  { valor: 'back', nombre: 'Espalda' }, { valor: 'shoulders', nombre: 'Hombros' },
  { valor: 'upper arms', nombre: 'Brazos' }, { valor: 'lower arms', nombre: 'Antebrazos' },
  { valor: 'upper legs', nombre: 'Muslos y glúteos' }, { valor: 'lower legs', nombre: 'Pantorrillas' },
  { valor: 'waist', nombre: 'Abdomen' }, { valor: 'cardio', nombre: 'Cardio' },
]

function ExploradorEjercicios() {
  const [nombre, setNombre] = useState('')
  const [grupo, setGrupo] = useState('')
  const [consulta, setConsulta] = useState({ nombre: '', grupo: '', despues: '' })
  const [anteriores, setAnteriores] = useState([])
  const { ejercicios, total, siguiente, error, cargando, reintentar } = useEjerciciosApi(consulta)

  function buscar(evento) {
    evento.preventDefault()
    const nuevoNombre = nombre.trim()
    if (consulta.nombre === nuevoNombre && consulta.grupo === grupo && !consulta.despues) reintentar()
    else setConsulta({ nombre: nuevoNombre, grupo, despues: '' })
    setAnteriores([])
  }

  function limpiar() {
    setNombre('')
    setGrupo('')
    setAnteriores([])
    if (!consulta.nombre && !consulta.grupo && !consulta.despues) reintentar()
    else setConsulta({ nombre: '', grupo: '', despues: '' })
  }

  function avanzar() {
    if (cargando || !siguiente) return
    setAnteriores((actuales) => [...actuales, consulta.despues])
    setConsulta((actual) => ({ ...actual, despues: siguiente }))
  }

  function retroceder() {
    if (cargando || !anteriores.length) return
    setConsulta((actual) => ({ ...actual, despues: anteriores.at(-1) }))
    setAnteriores((actuales) => actuales.slice(0, -1))
  }

  return (
    <section aria-labelledby="explorar-api" aria-busy={cargando}>
      <h2 id="explorar-api" className="h4">Explorá más ejercicios</h2>
      <p className="text-body-secondary">Consultá el catálogo externo de ExerciseDB. Los nombres e instrucciones se muestran en inglés; nuestros ejercicios con la mascota siguen disponibles en la otra pestaña.</p>
      <Form onSubmit={buscar} className="mb-4">
        <Row className="g-3 align-items-end">
          <Col xs={12} md={6}><Form.Group controlId="nombre-ejercicio-api"><Form.Label>Nombre en inglés</Form.Label><Form.Control type="search" maxLength={100} value={nombre} onChange={(evento) => setNombre(evento.target.value)} placeholder="Por ejemplo: bench press, squat o curl" /></Form.Group></Col>
          <Col xs={12} md={6}><Form.Group controlId="grupo-ejercicio-api"><Form.Label>Grupo corporal</Form.Label><Form.Select value={grupo} onChange={(evento) => setGrupo(evento.target.value)}>{grupos.map((opcion) => <option key={opcion.valor} value={opcion.valor}>{opcion.nombre}</option>)}</Form.Select></Form.Group></Col>
          <Col xs={12} className="d-flex flex-wrap gap-2"><Button type="submit" disabled={cargando} className="rounded-pill">Buscar en la API</Button><Button variant="outline-secondary" disabled={cargando} onClick={limpiar} className="rounded-pill">Limpiar filtros</Button></Col>
        </Row>
      </Form>
      {cargando ? (
        <div role="status" className="text-center py-5"><Spinner animation="border" variant="primary" aria-hidden="true" /><p className="mt-3 mb-0">Consultando ejercicios externos…</p></div>
      ) : error ? (
        <Alert variant="warning"><p role="alert">{error}</p><div className="d-flex flex-wrap gap-2"><Button variant="outline-dark" onClick={reintentar}>Reintentar consulta</Button>{anteriores.length > 0 && <Button variant="outline-dark" onClick={retroceder}>Volver a la página anterior</Button>}</div></Alert>
      ) : (
        <>
          <p role="status" className="text-body-secondary">{ejercicios.length} ejercicios en esta página · {total} resultados · Página {anteriores.length + 1}</p>
          {ejercicios.length === 0 ? <Alert variant="secondary">No encontramos ejercicios para estos filtros. Probá otro nombre en inglés o limpiá los filtros.</Alert> : (
            <Row xs={1} md={2} xl={4} className="g-4">{ejercicios.map((ejercicio) => <Col key={ejercicio.id}><EjercicioExternoCard ejercicio={ejercicio} /></Col>)}</Row>
          )}
          <nav aria-label="Páginas del catálogo externo" className="d-flex flex-wrap justify-content-center align-items-center gap-3 mt-4">
            <Button variant="outline-primary" className="rounded-pill" disabled={!anteriores.length} onClick={retroceder}>Página anterior</Button>
            <span>Página {anteriores.length + 1}</span>
            <Button variant="outline-primary" className="rounded-pill" disabled={!siguiente} onClick={avanzar}>Página siguiente</Button>
          </nav>
        </>
      )}
      <p className="small text-body-secondary mt-4 mb-0">Datos y GIFs: <a href="https://exercisedb.dev/" target="_blank" rel="noopener noreferrer">ExerciseDB / AscendAPI</a>. Versión gratuita para uso educativo no comercial, con límites de consultas. Las tarjetas muestran una vista previa quieta; pulsá Ver demostración para ver el GIF animado.</p>
    </section>
  )
}

export default ExploradorEjercicios