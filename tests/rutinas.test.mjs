import test from 'node:test'
import assert from 'node:assert/strict'
import { ejercicios } from '../src/data/contenido.js'
import { actualizarRutina, cargarRutinas, CLAVE_RUTINAS, guardarRutinas, validarBiblioteca, validarRutina } from '../src/utils/rutinas.js'

const rutina = {
  id: 'personal-prueba', nombre: 'Mi rutina', descripcion: '',
  ejercicios: [{ ejercicioId: 'press-banca', series: 3, cantidad: 10, unidad: 'repeticiones' }],
}
function memoria(valor = null) {
  return {
    valor,
    getItem(clave) { assert.equal(clave, CLAVE_RUTINAS); return this.valor },
    setItem(clave, nuevo) { assert.equal(clave, CLAVE_RUTINAS); this.valor = nuevo },
  }
}

test('valida rutinas con repeticiones o segundos', () => {
  assert.equal(validarRutina(rutina, ejercicios), null)
  assert.equal(validarRutina({ ...rutina, ejercicios: [{ ejercicioId: 'plancha', series: 3, cantidad: 30, unidad: 'segundos' }] }, ejercicios), null)
})

test('exige nombre y ejercicios conocidos sin duplicados', () => {
  for (const datos of [null, { ...rutina, nombre: ' ' }, { ...rutina, ejercicios: [] }, { ...rutina, ejercicios: [null] },
    { ...rutina, ejercicios: [{ ...rutina.ejercicios[0], ejercicioId: 'inexistente' }] },
    { ...rutina, ejercicios: [rutina.ejercicios[0], rutina.ejercicios[0]] },
  ]) assert.ok(validarRutina(datos, ejercicios))
})

test('rechaza cantidades inválidas, decimales, unidades y límites excedidos', () => {
  for (const cambio of [{ series: 0 }, { series: 21 }, { series: 1.5 }, { cantidad: 0 }, { cantidad: 101 }, { cantidad: 10.5 }, { unidad: 'kg' }, { unidad: 'segundos', cantidad: 601 }]) {
    assert.ok(validarRutina({ ...rutina, ejercicios: [{ ...rutina.ejercicios[0], ...cambio }] }, ejercicios))
  }
})

test('crea y edita sin duplicar ni mutar la biblioteca', () => {
  const anterior = []
  const creada = actualizarRutina(anterior, rutina)
  assert.deepEqual(anterior, [])
  const editada = actualizarRutina(creada, { ...rutina, nombre: 'Nuevo nombre' })
  assert.equal(editada.length, 1)
  assert.equal(editada[0].nombre, 'Nuevo nombre')
  assert.equal(creada[0].nombre, 'Mi rutina')
})

test('guarda y recupera rutinas y su eliminación', () => {
  const storage = memoria()
  assert.deepEqual(cargarRutinas(ejercicios, storage), { rutinas: [], error: null })
  assert.equal(guardarRutinas([rutina], ejercicios, storage), null)
  assert.deepEqual(cargarRutinas(ejercicios, storage).rutinas, [rutina])
  assert.equal(guardarRutinas([], ejercicios, storage), null)
  assert.deepEqual(cargarRutinas(ejercicios, storage).rutinas, [])
})

test('rechaza IDs repetidos o de plantillas', () => {
  assert.equal(validarBiblioteca([rutina, rutina], ejercicios), false)
  assert.equal(validarBiblioteca([{ ...rutina, id: 'fuerza' }], ejercicios), false)
})

test('informa datos dañados y no los sobrescribe al leer', () => {
  const storage = memoria('JSON inválido')
  assert.ok(cargarRutinas(ejercicios, storage).error)
  assert.equal(storage.valor, 'JSON inválido')
  const invalido = memoria(JSON.stringify([{ ...rutina, ejercicios: [] }]))
  assert.ok(cargarRutinas(ejercicios, invalido).error)
})

test('informa errores de acceso y no guarda rutinas inválidas', () => {
  const bloqueado = { getItem() { throw new Error('Bloqueado') }, setItem() { throw new Error('Sin espacio') } }
  assert.ok(cargarRutinas(ejercicios, bloqueado).error)
  assert.ok(guardarRutinas([rutina], ejercicios, bloqueado))
  const storage = memoria('anterior')
  assert.ok(guardarRutinas([{ ...rutina, nombre: '' }], ejercicios, storage))
  assert.equal(storage.valor, 'anterior')
})