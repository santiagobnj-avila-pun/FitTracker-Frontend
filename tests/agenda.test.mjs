import test from 'node:test'
import assert from 'node:assert/strict'
import { CLAVE_AGENDA, agendaValida, asignarRutina, cargarAgenda, fechaLocal, fechaPlanificable, fechaValida, guardarAgenda } from '../src/utils/agenda.js'

function memoria(valor = null) {
  return {
    valor,
    getItem(clave) { assert.equal(clave, CLAVE_AGENDA); return this.valor },
    setItem(clave, nuevo) { assert.equal(clave, CLAVE_AGENDA); this.valor = nuevo },
  }
}

test('solo permite planificar hoy y fechas futuras, incluso al cambiar de año', () => {
  assert.equal(fechaPlanificable('2026-10-05', '2026-10-06'), false)
  assert.equal(fechaPlanificable('2026-10-06', '2026-10-06'), true)
  assert.equal(fechaPlanificable('2026-10-07', '2026-10-06'), true)
  assert.equal(fechaPlanificable('2026-12-31', '2027-01-01'), false)
  assert.equal(fechaPlanificable('2027-01-01', '2026-12-31'), true)
  assert.equal(fechaPlanificable('2026-02-30', '2026-10-06'), false)
})

test('conserva las fechas pasadas guardadas para mostrarlas como historial', () => {
  const agenda = [{ fecha: '2020-01-01', rutinaId: 'fuerza' }]
  const storage = memoria(JSON.stringify(agenda))
  assert.deepEqual(cargarAgenda(storage), { agenda, error: null })
  assert.equal(guardarAgenda(agenda, storage), null)
  assert.deepEqual(cargarAgenda(storage).agenda, agenda)
})

test('usa fechas locales y valida años bisiestos', () => {
  assert.equal(fechaLocal(new Date(2026, 9, 6)), '2026-10-06')
  assert.equal(fechaValida('2024-02-29'), true)
  for (const fecha of ['2026-02-29', '2026-04-31', '2026-13-01', '2026-00-01', '2026-1-01', null]) {
    assert.equal(fechaValida(fecha), false)
  }
})

test('la primera visita empieza sin entrenamientos', () => {
  assert.deepEqual(cargarAgenda(memoria()), { agenda: [], error: null })
})

test('agenda una rutina sin modificar el array anterior', () => {
  const anterior = []
  const siguiente = asignarRutina(anterior, '2026-10-08', 'fuerza')
  assert.deepEqual(anterior, [])
  assert.deepEqual(siguiente, [{ fecha: '2026-10-08', rutinaId: 'fuerza' }])
})

test('reemplaza la rutina del mismo día sin duplicarla y ordena las fechas', () => {
  const agenda = asignarRutina(asignarRutina([], '2026-11-01', 'fuerza'), '2026-10-08', 'hipertrofia')
  const actualizada = asignarRutina(agenda, '2026-10-08', 'cuerpo-completo')
  assert.equal(actualizada.length, 2)
  assert.deepEqual(actualizada[0], { fecha: '2026-10-08', rutinaId: 'cuerpo-completo' })
  assert.equal(agenda[0].rutinaId, 'hipertrofia')
})

test('no admite asignaciones con fecha o rutina vacía', () => {
  const agenda = []
  assert.equal(asignarRutina(agenda, '2026-02-30', 'fuerza'), agenda)
  assert.equal(asignarRutina(agenda, '2026-10-08', ''), agenda)
})

test('rechaza formatos y fechas duplicadas en los datos guardados', () => {
  for (const datos of [{}, [null], [{ fecha: '2026-10-08', rutinaId: '' }], [
    { fecha: '2026-10-08', rutinaId: 'fuerza' },
    { fecha: '2026-10-08', rutinaId: 'hipertrofia' },
  ]]) assert.equal(agendaValida(datos), false)
})

test('guarda y recupera la agenda, incluido quitar un entrenamiento', () => {
  const storage = memoria()
  const agenda = [{ fecha: '2026-10-08', rutinaId: 'fuerza' }]
  assert.equal(guardarAgenda(agenda, storage), null)
  assert.deepEqual(cargarAgenda(storage).agenda, agenda)
  assert.equal(guardarAgenda([], storage), null)
  assert.deepEqual(cargarAgenda(storage).agenda, [])
})

test('informa datos dañados sin sobrescribirlos', () => {
  const storage = memoria('JSON dañado')
  assert.ok(cargarAgenda(storage).error)
  assert.equal(storage.valor, 'JSON dañado')
})

test('informa cuando el navegador bloquea el almacenamiento', () => {
  const bloqueado = { getItem() { throw new Error('Bloqueado') }, setItem() { throw new Error('Sin espacio') } }
  assert.ok(cargarAgenda(bloqueado).error)
  assert.ok(guardarAgenda([], bloqueado))
})