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
import { ejercicios } from './data/contenido'
import useAgenda from './hooks/useAgenda'
import useRutinas from './hooks/useRutinas'

function App() {
  const { agenda, agendar, quitar, reiniciar, habilitado, error } = useAgenda()
  const biblioteca = useRutinas()
  const { rutinas } = biblioteca
  const [seleccionados, setSeleccionados] = useState([])
  const [rutinaId, setRutinaId] = useState(null)

  function guardarRutina(datos) {
    const resultado = biblioteca.guardar(datos)
    if (!resultado.error) setRutinaId(resultado.id)
    return resultado
  }

  function eliminarRutina(id) {
    if (!habilitado) return 'No se puede verificar la agenda local. Recuperá sus datos antes de eliminar rutinas.'
    if (agenda.some((item) => item.rutinaId === id)) return 'Esta rutina está en el calendario. Quitá primero sus asignaciones futuras. Si tiene fechas pasadas, se conserva para mantener el historial.'
    if (!biblioteca.habilitado) return biblioteca.error
    biblioteca.eliminar(id)
    if (rutinaId === id) setRutinaId(null)
    return null
  }

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
                ejercicios={ejercicios}
                seleccionados={seleccionados}
                onGuardar={guardarRutina}
                onEliminar={eliminarRutina}
                errorRutinas={biblioteca.error}
                habilitado={biblioteca.habilitado}
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
          <Route
            path="/calendario"
            element={<Calendario rutinas={rutinas} rutinaPreferida={rutinaId} agenda={agenda} onAgendar={agendar} onQuitar={quitar} errorAgenda={error} habilitado={habilitado} onReiniciar={reiniciar} />}
          />
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