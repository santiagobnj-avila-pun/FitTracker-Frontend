function BarraProgreso({ dia, porcentaje }) {
  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between mb-1">
        <span>{dia}</span>
        <span>{porcentaje}%</span>
      </div>

      <div className="progress">
        <div
          className="progress-bar"
          style={{ width: `${porcentaje}%` }}
        >
          {porcentaje}%
        </div>
      </div>
    </div>
  )
}

function Progreso() {
  const progresoSemanal = [
    {
      dia: 'Lunes',
      porcentaje: 80
    },
    {
      dia: 'Miércoles',
      porcentaje: 60
    },
    {
      dia: 'Viernes',
      porcentaje: 90
    }
  ]

  return (
    <section id="progreso" className="py-5">
      <div className="container">

        <div className="text-center mb-4">
          <h2>Progreso</h2>

          <p className="text-body-secondary">
            Seguimiento de tu progreso semanal.
          </p>
        </div>

        <div className="card mb-4">
          <div className="card-body">

            <h3 className="h4 mb-4">
              Progreso semanal
            </h3>

            {progresoSemanal.map((progreso) => (
              <BarraProgreso
                key={progreso.dia}
                dia={progreso.dia}
                porcentaje={progreso.porcentaje}
              />
            ))}

          </div>
        </div>

        <div className="row g-4">

          <div className="col-12 col-md-4">
            <div className="card text-center h-100">
              <div className="card-body">
                <h3 className="h5">Entrenamientos</h3>
                <p className="display-6 mb-0">12</p>
                <p className="text-body-secondary">
                  Esta semana
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="card text-center h-100">
              <div className="card-body">
                <h3 className="h5">Tiempo total</h3>
                <p className="display-6 mb-0">8h</p>
                <p className="text-body-secondary">
                  Esta semana
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="card text-center h-100">
              <div className="card-body">
                <h3 className="h5">Racha actual</h3>
                <p className="display-6 mb-0">5</p>
                <p className="text-body-secondary">
                  Días consecutivos
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default Progreso