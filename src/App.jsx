
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Inicio from './pages/Inicio'
import Rutinas from './pages/Rutinas'
import Ejercicios from './pages/Ejercicios'
import Calendario from './pages/Calendario'
import Progreso from './pages/Progreso'
import NoEncontrada from './pages/NoEncontrada'
import { ejercicios, rutinas } from './data/contenido'

function App() {
  const [seleccionados, setSeleccionados] = useState([])
  const [rutinaId, setRutinaId] = useState(null)

  function alternarEjercicio(id) {
    setSeleccionados((actuales) =>
      actuales.includes(id) ? actuales.filter((actual) => actual !== id) : [...actuales, id],
    )
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <a href="#contenido" className="visually-hidden-focusable p-3 bg-dark text-white">
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido" className="flex-grow-1" tabIndex={-1}>
        <Routes>
          <Route
            path="/"
            element={
              <Inicio
                cantidadEjercicios={seleccionados.length}
                rutina={rutinas.find((rutina) => rutina.id === rutinaId)}
              />
            }
          />
          <Route
            path="/rutinas"
            element={
              <Rutinas
                rutinas={rutinas}
                seleccionada={rutinaId}
                onSeleccionar={setRutinaId}
              />
            }
          />
          <Route
            path="/ejercicios"
            element={
              <Ejercicios
                ejercicios={ejercicios}
                seleccionados={seleccionados}
                onSeleccionar={alternarEjercicio}
              />
            }
          />
          <Route path="/calendario" element={<Calendario />} />
          <Route
            path="/progreso"
            element={
              <Progreso
                ejercicios={ejercicios.filter((ejercicio) =>
                  seleccionados.includes(ejercicio.id),
                )}
                rutina={rutinas.find((rutina) => rutina.id === rutinaId)}
              />
            }
          />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App