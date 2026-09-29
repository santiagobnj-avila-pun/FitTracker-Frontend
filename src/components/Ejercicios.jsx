import { useState } from 'react'

function EjercicioCard({ imagen, nombre, musculo, equipo, descripcion }) {
  const [seleccionado, setSeleccionado] = useState(false)

  function manejarSeleccion() {
    setSeleccionado(!seleccionado)
  }

  return (
    <div className="col-12 col-md-6 col-lg-3">
      <div className="card h-100">

        <img
          src={imagen}
          className="card-img-top"
          alt={nombre}
        />

        <div className="card-body">
          <h3 className="h5">{nombre}</h3>

          <p className="mb-1">
            <strong>Músculo:</strong> {musculo}
          </p>

          <p className="mb-2">
            <strong>Equipo:</strong> {equipo}
          </p>

          <p className="text-body-secondary">
            {descripcion}
          </p>

          <button
            className={`btn ${seleccionado ? 'btn-success' : 'btn-primary'}`}
            onClick={manejarSeleccion}
          >
            {seleccionado ? 'Seleccionado' : 'Seleccionar'}
          </button>

        </div>
      </div>
    </div>
  )
}

function Ejercicios() {
  const ejercicios = [
    {
      imagen: "/img/ejercicio-sentadilla-v2.png",
      nombre: "Sentadilla",
      musculo: "Piernas",
      equipo: "Barra",
      descripcion: "Ejercicio para trabajar principalmente las piernas."
    },
    {
      imagen: "/img/ejercicio-press-banca-v2.png",
      nombre: "Press de banca",
      musculo: "Pecho",
      equipo: "Barra",
      descripcion: "Ejercicio para trabajar principalmente el pecho."
    },
    {
      imagen: "/img/ejercicio-remo-v2.png",
      nombre: "Remo con mancuerna",
      musculo: "Espalda",
      equipo: "Mancuerna",
      descripcion: "Ejercicio para trabajar principalmente la espalda."
    },
    {
      imagen: "/img/ejercicio-peso-muerto-v2.png",
      nombre: "Peso muerto",
      musculo: "Espalda",
      equipo: "Barra",
      descripcion: "Ejercicio que trabaja diferentes grupos musculares."
    }
  ]

  return (
    <section id="ejercicios" className="py-5">
      <div className="container">

        <div className="text-center mb-4">
          <h2>Ejercicios</h2>
          <p className="text-body-secondary">
            Consultá los ejercicios disponibles.
          </p>
        </div>

        <div className="row g-4">
          {ejercicios.map((ejercicio) => (
            <EjercicioCard
              key={ejercicio.nombre}
              imagen={ejercicio.imagen}
              nombre={ejercicio.nombre}
              musculo={ejercicio.musculo}
              equipo={ejercicio.equipo}
              descripcion={ejercicio.descripcion}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default Ejercicios