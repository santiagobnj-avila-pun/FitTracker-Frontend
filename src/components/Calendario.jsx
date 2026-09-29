import { useState } from 'react'

function Calendario() {
  const [mes, setMes] = useState(7)
  const [anio, setAnio] = useState(2026)

  const meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ]

  function mesAnterior() {
    if (mes === 0) {
      setMes(11)
      setAnio(anio - 1)
    } else {
      setMes(mes - 1)
    }
  }

  function mesSiguiente() {
    if (mes === 11) {
      setMes(0)
      setAnio(anio + 1)
    } else {
      setMes(mes + 1)
    }
  }

  const diasDelMes = new Date(anio, mes + 1, 0).getDate()

  return (
    <section id="calendario" className="py-5">
      <div className="container">

        <div className="text-center mb-4">
          <h2>Calendario</h2>

          <p className="text-body-secondary">
            Organizá tus entrenamientos.
          </p>
        </div>

        <div className="card">
          <div className="card-body">

            <div className="d-flex justify-content-between align-items-center mb-4">

              <button
                className="btn btn-outline-primary"
                onClick={mesAnterior}
              >
                ←
              </button>

              <h3 className="h4 mb-0">
                {meses[mes]} {anio}
              </h3>

              <button
                className="btn btn-outline-primary"
                onClick={mesSiguiente}
              >
                →
              </button>

            </div>

            <div className="row row-cols-7 text-center g-2">

              <div className="col">
                <strong>Lun</strong>
              </div>

              <div className="col">
                <strong>Mar</strong>
              </div>

              <div className="col">
                <strong>Mié</strong>
              </div>

              <div className="col">
                <strong>Jue</strong>
              </div>

              <div className="col">
                <strong>Vie</strong>
              </div>

              <div className="col">
                <strong>Sáb</strong>
              </div>

              <div className="col">
                <strong>Dom</strong>
              </div>

            </div>

            <div className="row row-cols-7 text-center g-2 mt-2">

              {Array.from({ length: diasDelMes }, (_, i) => (
                <div className="col" key={i}>
                  <div className="border rounded p-3">
                    {i + 1}
                  </div>
                </div>
              ))}

            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default Calendario