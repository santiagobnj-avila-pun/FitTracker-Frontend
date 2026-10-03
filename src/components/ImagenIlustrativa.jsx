import { useState } from 'react'

function ImagenIlustrativa({ src, alt, className = '', loading = 'lazy' }) {
  const [fallo, setFallo] = useState(false)

  return (
    <img
      src={fallo ? '/img/ejercicio-respaldo.svg' : src}
      alt={alt === '' ? '' : fallo ? 'Mancuerna ilustrativa de Fit Tracker' : alt}
      className={className}
      loading={loading}
      width="480"
      height="320"
      onError={() => setFallo(true)}
    />
  )
}

export default ImagenIlustrativa