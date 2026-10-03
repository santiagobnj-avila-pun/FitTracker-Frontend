import { useState } from 'react'

function RutinaItem({ nombre, descripcion }) {
  const [seleccionada, setSeleccionada] = useState(false)

  function manejarSeleccion() {
    setSeleccionada(!seleccionada)
  }

  return (
    <div className="d-flex justify-content-between align-items-center border-bottom py-3">
      <div>
        <h4 className="h6 mb-1">{nombre}</h4>

        <p className="text-body-secondary mb-0">
          {descripcion}
        </p>
      </div>

      <button
        className={`btn ${seleccionada ? 'btn-success' : 'btn-primary'}`}
        onClick={manejarSeleccion}
      >
        {seleccionada ? 'Seleccionada' : 'Usar rutina'}
      </button>
    </div>
  )
}

function Rutinas() {
  const rutinas = [
    {
      nombre: 'Rutina de fuerza',
      descripcion: 'Entrenamiento completo de fuerza.'
    },
    {
      nombre: 'Rutina de hipertrofia',
      descripcion: 'Rutina enfocada en el desarrollo muscular.'
    },
    {
      nombre: 'Rutina de cuerpo completo',
      descripcion: 'Entrenamiento para todo el cuerpo.'
    }
  ]

  return (
    <section id="rutinas" className="py-5">
      <div className="container">

        <div className="text-center mb-4">
          <h2>Rutinas</h2>

          <p className="text-body-secondary">
            Organizá y gestioná tus rutinas de entrenamiento.
          </p>
        </div>

        <div className="row g-4">

          <div className="col-12 col-lg-6">
            <div className="card h-100">
              <div className="card-body">

                <h3 className="h4">
                  Biblioteca de rutinas
                </h3>

                <div className="lista-rutinas">
                  {rutinas.map((rutina) => (
                    <RutinaItem
                      key={rutina.nombre}
                      nombre={rutina.nombre}
                      descripcion={rutina.descripcion}
                    />
                  ))}
                </div>

              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="card h-100">
              <div className="card-body">

                <h3 className="h4">
                  Gestor de rutinas
                </h3>

                <div className="d-flex justify-content-between align-items-center py-3">

                  <div>
                    <h4 className="h6 mb-1">
                      Mi rutina de fuerza
                    </h4>

                    <p className="text-body-secondary mb-0">
                      Tu rutina personalizada.
                    </p>
                  </div>

                  <button className="btn btn-outline-primary">
                    Editar
                  </button>

                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default Rutinas