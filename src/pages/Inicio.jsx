function Inicio({ mensaje }) {
  return (
    <section
      id="inicio"
      className="hero-fit position-relative overflow-hidden d-flex align-items-center border-bottom py-5"
    >
      <div className="container">
        <div className="row align-items-center g-4 g-lg-5">

          <div className="col-12 col-lg-6 text-center text-lg-start">
            <span className="hero-etiqueta">
              ENTRENÁ CON UN PLAN
            </span>

            <h1 className="hero-titulo mt-3 mb-3">
              Organizá tu entrenamiento y <span>superá tus marcas</span>
            </h1>

            <p className="hero-descripcion lead text-body-secondary mb-4">
              {mensaje}
            </p>
          </div>

          <div className="col-12 col-lg-6 text-center">
            <div className="hero-mascota-contenedor mx-auto">
              <img
                src="/img/mascota-fit-tracker.png"
                className="hero-mascota d-block w-100 object-fit-contain"
                alt="Mascota de Fit Tracker con forma de mancuerna"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Inicio