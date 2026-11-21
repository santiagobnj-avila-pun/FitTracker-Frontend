import { Button } from 'react-bootstrap'

function RutinaItem({ rutina, ejercicios, seleccionada, onSeleccionar }) {
  return (
    <li className="list-group-item bg-transparent d-flex flex-column flex-sm-row justify-content-between align-items-sm-start gap-3 py-3">
      <div>
        <h3 className="h5 mb-1">{rutina.nombre}</h3>
        <p className="small text-body-secondary mb-2">{rutina.descripcion}</p>
        <ol className="small ps-3 mb-0">
          {rutina.ejercicios.map((item) => <li key={item.ejercicioId}>{ejercicios.find((ejercicio) => ejercicio.id === item.ejercicioId)?.nombre || 'Ejercicio no disponible'}: {item.series} × {item.cantidad} {item.unidad}</li>)}
        </ol>
      </div>
      <Button size="sm" variant={seleccionada ? 'outline-primary' : 'primary'} className="rounded-pill flex-shrink-0" aria-pressed={seleccionada} onClick={() => onSeleccionar(seleccionada ? null : rutina.id)}>{seleccionada ? 'Seleccionada' : 'Usar rutina'}</Button>
    </li>
  )
}

export default RutinaItem
