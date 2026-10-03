function PageLayout({ titulo, descripcion, children, mostrarEncabezado = true, anchoCompleto = false, className = '' }) {
  return (
    <section className={`${anchoCompleto ? '' : 'py-5'} ${className}`} aria-labelledby="titulo-pagina">
      <div className={anchoCompleto ? '' : 'container'}>
        {mostrarEncabezado && (
          <header className="text-center mb-5">
            <h1 id="titulo-pagina" className="section-title d-inline-block">{titulo}</h1>
            <p className="lead text-body-secondary mb-0">{descripcion}</p>
          </header>
        )}
        {children}
      </div>
    </section>
  )
}

export default PageLayout
