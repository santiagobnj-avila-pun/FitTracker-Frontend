
import { useState } from 'react'
import { Button, Card, Table } from 'react-bootstrap'
import PageLayout from '../components/PageLayout'

const diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

function Calendario() {
  const [fecha, setFecha] = useState(() => new Date())
  const mes = fecha.getMonth()
  const anio = fecha.getFullYear()
  const hoy = new Date()
  const nombreMes = fecha.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' })
  const inicio = (new Date(anio, mes, 1).getDay() + 6) % 7
  const cantidad = new Date(anio, mes + 1, 0).getDate()
  const celdas = Array.from({ length: Math.ceil((inicio + cantidad) / 7) * 7 }, (_, indice) => {
    const dia = indice - inicio + 1
    return dia > 0 && dia <= cantidad ? dia : null
  })
  const semanas = Array.from({ length: celdas.length / 7 }, (_, indice) => celdas.slice(indice * 7, indice * 7 + 7))

  function cambiarMes(cambio) {
    setFecha((actual) => new Date(actual.getFullYear(), actual.getMonth() + cambio, 1))
  }

  return (
    <PageLayout titulo="Calendario" descripcion="Tus entrenamientos, día por día." className="bg-body-tertiary">
      <Card className="calendario-app mx-auto border-0 bg-transparent">
        <Card.Body>
          <div className="d-flex justify-content-center align-items-center gap-3 mb-4">
            <Button size="sm" className="rounded-pill" variant="outline-primary" aria-label="Mes anterior" onClick={() => cambiarMes(-1)}>‹</Button>
            <h2 className="h4 text-capitalize text-center mb-0" aria-live="polite">{nombreMes}</h2>
            <Button size="sm" className="rounded-pill" variant="outline-primary" aria-label="Mes siguiente" onClick={() => cambiarMes(1)}>›</Button>
          </div>
          <Table responsive borderless className="text-center align-middle mb-3 calendario">
            <caption className="visually-hidden">Calendario de {nombreMes}; semanas de lunes a domingo</caption>
            <thead><tr>{diasSemana.map((dia) => <th key={dia} scope="col">{dia}</th>)}</tr></thead>
            <tbody>
              {semanas.map((semana, indice) => (
                <tr key={indice}>
                  {semana.map((dia, columna) => {
                    const esHoy = dia === hoy.getDate() && mes === hoy.getMonth() && anio === hoy.getFullYear()
                    return <td key={columna} className={esHoy ? 'dia-actual' : ''} aria-current={esHoy ? 'date' : undefined}>{dia}</td>
                  })}
                </tr>
              ))}
            </tbody>
          </Table>
          <Button variant="outline-primary" className="rounded-pill" onClick={() => setFecha(new Date())}>Volver al mes actual</Button>
        </Card.Body>
      </Card>
    </PageLayout>
  )
}

export default Calendario
