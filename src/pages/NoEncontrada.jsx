import { Link } from 'react-router-dom'

function NoEncontrada() {
  return (
    <div className="container py-5 text-center">
      <h1>Página no encontrada</h1>
      <p>La página que buscás no existe.</p>
      <Link to="/" className="btn btn-primary">
        Volver al inicio
      </Link>
    </div>
  )
}

export default NoEncontrada

