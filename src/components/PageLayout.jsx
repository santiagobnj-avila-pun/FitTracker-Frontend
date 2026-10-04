import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function PageLayout({ titulo, descripcion, children, mostrarEncabezado = true, noIndex = false, anchoCompleto = false, className = '' }) {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = `${titulo} | Fit Tracker`
    document.querySelector('meta[name="description"]').setAttribute('content', descripcion)
    document.querySelector('meta[name="robots"]').setAttribute('content', noIndex ? 'noindex, follow' : 'index, follow')
    document.querySelector('meta[property="og:title"]').setAttribute('content', `${titulo} | Fit Tracker`)
    document.querySelector('meta[property="og:description"]').setAttribute('content', descripcion)
    window.scrollTo(0, 0)
  }, [titulo, descripcion, noIndex, pathname])

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