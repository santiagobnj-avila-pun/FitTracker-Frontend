import { Badge, Button, Card } from 'react-bootstrap'
import ImagenIlustrativa from './ImagenIlustrativa'

function EjercicioCard({ ejercicio, seleccionado, onSeleccionar }) {
  return (
    <Card as="article" className="h-100 shadow-sm card-resaltada">
      <ImagenIlustrativa src={ejercicio.imagen} alt={`Mascota de Fit Tracker realizando ${ejercicio.nombre}`} className="card-img-top imagen-ejercicio p-3 object-fit-contain" />
      <Card.Body className="d-flex flex-column">
        <Card.Title as="h2" className="h5 mb-2">{ejercicio.nombre}</Card.Title>
        <div className="d-flex flex-wrap gap-2 mb-3">
          <Badge bg="primary">{ejercicio.musculo}</Badge>
          <Badge bg="secondary">{ejercicio.equipo}</Badge>
        </div>
        <Card.Text className="small text-body-secondary">{ejercicio.descripcion}</Card.Text>
        <Button size="sm" className="mt-auto rounded-pill align-self-start" variant={seleccionado ? 'primary' : 'outline-primary'} aria-pressed={seleccionado} onClick={() => onSeleccionar(ejercicio.id)}>{seleccionado ? '✓ Elegido · Quitar de mi selección' : '+ Elegir para mi rutina'}</Button>
      </Card.Body>
    </Card>
  )
}

export default EjercicioCard