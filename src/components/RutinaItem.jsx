
import { Button } from 'react-bootstrap'

function RutinaItem({ rutina, seleccionada, onSeleccionar }) {
  return (
    <li className="list-group-item bg-transparent d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 py-3">
      <div>
        <h3 className="h5 mb-1">{rutina.nombre}</h3>
        <p className="small text-body-secondary mb-0">
          {rutina.descripcion}
        </p>
      </div>

      <Button
        size="sm"
        variant={seleccionada ? 'outline-primary' : 'primary'}
        className="rounded-pill flex-shrink-0"
        aria-pressed={seleccionada}
        onClick={() =>
          onSeleccionar(seleccionada ? null : rutina.id)
        }
      >
        {seleccionada ? 'Seleccionada' : 'Usar rutina'}
      </Button>
    </li>
  )
}

export default RutinaItem