import test from 'node:test'
import assert from 'node:assert/strict'
import { mensajeErrorApi, normalizarRespuesta, urlApiValida } from '../src/utils/ejerciciosApi.js'

const item = {
  exerciseId: 'externo-1', name: 'Bench press', gifUrl: 'https://example.com/demo.gif',
  bodyParts: ['chest'], equipments: ['barbell'], targetMuscles: ['pectorals'],
  secondaryMuscles: ['triceps'], instructions: ['Step:1 First instruction.', 'Step:2 Second instruction.'],
}
const respuesta = { success: true, meta: { total: 2, hasNextPage: true, nextCursor: 'externo-1' }, data: [item] }

test('requiere URL HTTPS sin credenciales', () => {
  assert.equal(urlApiValida('https://example.com/exercises'), true)
  for (const valor of ['', undefined, 'http://example.com', 'javascript:alert(1)', 'https://usuario:clave@example.com']) assert.equal(urlApiValida(valor), false)
})

test('normaliza la respuesta y el cursor sin alterar los datos originales', () => {
  const datos = normalizarRespuesta(respuesta)
  assert.equal(datos.total, 2)
  assert.equal(datos.siguiente, 'externo-1')
  assert.equal(datos.ejercicios[0].id, 'externo-1')
  assert.deepEqual(datos.ejercicios[0].instrucciones, ['First instruction.', 'Second instruction.'])
  assert.equal(item.instructions[0], 'Step:1 First instruction.')
})

test('acepta resultados vacíos como respuesta válida', () => {
  assert.deepEqual(normalizarRespuesta({ success: true, meta: { total: 0, hasNextPage: false }, data: [] }), { ejercicios: [], total: 0, siguiente: null })
})

test('elimina URLs inseguras sin impedir mostrar el texto', () => {
  const datos = normalizarRespuesta({ ...respuesta, data: [{ ...item, gifUrl: 'javascript:alert(1)' }] })
  assert.equal(datos.ejercicios[0].imagen, null)
  assert.equal(datos.ejercicios[0].nombre, 'Bench press')
})

test('rechaza respuesta inválida o paginación incompleta', () => {
  for (const valor of [null, {}, { ...respuesta, success: false }, { ...respuesta, data: {} }, { ...respuesta, meta: {} }, { ...respuesta, meta: { total: 2, hasNextPage: true } }]) {
    assert.throws(() => normalizarRespuesta(valor), /RESPUESTA_INVALIDA/)
  }
})

test('rechaza ejercicios incompletos y IDs duplicados', () => {
  for (const data of [[null], [{ ...item, name: '' }], [{ ...item, targetMuscles: null }], [item, item]]) assert.throws(() => normalizarRespuesta({ ...respuesta, data }), /RESPUESTA_INVALIDA/)
})

test('distingue configuración, límites de consultas y timeouts', () => {
  assert.match(mensajeErrorApi(new Error('CONFIGURACION_INVALIDA')), /VITE_API_URL/)
  assert.match(mensajeErrorApi({ response: { status: 429 } }), /límite/)
  assert.match(mensajeErrorApi({ code: 'ECONNABORTED' }), /tardó demasiado/)
  assert.match(mensajeErrorApi(new Error('RESPUESTA_INVALIDA')), /formato inesperado/)
})

test('distingue acceso rechazado y caída de la red', () => {
  assert.match(mensajeErrorApi({ response: { status: 403 } }), /rechazó el acceso/)
  assert.match(mensajeErrorApi({ code: 'ERR_NETWORK' }), /locales siguen disponibles/)
})