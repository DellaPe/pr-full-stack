import { procesarArchivo } from '../solutions/index.js'
import { describe, it, afterEach } from 'node:test'
import { equal } from 'node:assert/strict'
import { unlinkSync, writeFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
// import { ifError } from 'node:assert'

describe('3. procesarArchivoPromise', () => {
  afterEach(() => {
    try {
      unlinkSync('output.txt')
    } catch {}
  })

  // it('3.1. procesarArchivo', (t, done) => {
  //   writeFileSync('input.txt', 'gogogo')
  //   procesarArchivo((err) => {
  //     ifError(err)
  //     readFile('output.txt', 'utf8')
  //       .then((contenido) => {
  //         equal(contenido, 'GOGOGO')
  //         done()
  //       })
  //   })
  // })

  it('3.2. procesarArchivo', async () => {
    writeFileSync('input.txt', 'gogogo')
    await procesarArchivo()
    const contenido = await readFile('output.txt', 'utf8')
    equal(contenido, 'GOGOGO')
  })
})
