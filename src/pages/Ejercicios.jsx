import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import PageLayout from '../components/PageLayout'
import EjercicioCard from '../components/EjercicioCard'

function Ejercicios({ ejercicios, seleccionados, onSeleccionar }) {
  const [busqueda, setBusqueda] = useState('')
  const [mostrarTodos, setMostrarTodos] = useState(false)
  const visibles = ejercicios.filter((ejercicio) =>
    `${ejercicio.nombre} ${ejercicio.musculo} ${ejercicio.equipo}`.toLocaleLowerCase('es').includes(busqueda.trim().toLocaleLowerCase('es')),
  )

  return (
    <PageLayout titulo="Ejercicios" descripcion="Explorá ejercicios por nombre, grupo muscular o equipamiento y seleccioná tus preferidos.">
      <Form.Group className="mb-4" controlId="buscar-ejercicio">
        <Form.Label>Buscar un ejercicio</Form.Label>
        <Form.Control type="search" value={busqueda} onChange={(evento) => { setBusqueda(evento.target.value); setMostrarTodos(false) }} placeholder="Por ejemplo: pecho, barra o sentadilla" />
      </Form.Group>
      <p role="status" className="text-body-secondary">{visibles.length} ejercicios disponibles</p>
      <Row id="catalogo-ejercicios" xs={1} md={2} xl={4} className="g-4">
        {(mostrarTodos ? visibles : visibles.slice(0, 8)).map((ejercicio) => (
          <Col key={ejercicio.id}><EjercicioCard ejercicio={ejercicio} seleccionado={seleccionados.includes(ejercicio.id)} onSeleccionar={onSeleccionar} /></Col>
        ))}
      </Row>
      {visibles.length > 8 && (
        <div className="text-center mt-4">
          <Button variant="outline-primary" className="rounded-pill" aria-expanded={mostrarTodos} aria-controls="catalogo-ejercicios" onClick={() => setMostrarTodos((actual) => !actual)}>
            {mostrarTodos ? 'Ver menos ejercicios' : `Ver todos los ejercicios (${visibles.length})`}
          </Button>
        </div>
      )}
      {visibles.length === 0 && <p className="text-center py-4">No encontramos ejercicios con esa búsqueda.</p>}
    </PageLayout>
  )
}

export default Ejercicios