import { leerArchivos } from '../solutions/index.js'
import { describe, it } from 'node:test'
import { equal } from 'node:assert/strict'

describe('4. leerArchivos', () => {
  it('4. leerArchivos', async () => {
    const msj = await leerArchivos()
    equal(msj, 'Promise all: Hola Mundo !!!!!!!!!!!!')
  })
})