import { Link } from 'react-router-dom'
import PageLayout from '../components/PageLayout'

function NoEncontrada() {
  return (
    <PageLayout titulo="Página no encontrada" descripcion="La dirección que buscás no corresponde a una página de Fit Tracker." noIndex>
      <div className="text-center">
        <p className="display-1 text-primary fw-bold">404</p>
        <Link to="/" className="btn btn-primary rounded-pill">Volver al inicio</Link>
      </div>
    </PageLayout>
  )
}

export default NoEncontrada