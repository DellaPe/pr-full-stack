import net from 'node:net'
import fs from 'node:fs/promises'

/*
EJERCICIO 1
1) Primero ver parametros, antes de hacer nada. Este caso lo presentaba ya que que el callBack usaba 2 parametros.
2) Luego en vez de usar el return usamos el callBack con los parametros que necesitamos.
3) Luego tambien necesitamos usar el callBack en el error.
3
*/

// export const ping = (ip) => {
export const ping = (ip, callBack) => {
  const startTime = process.hrtime()

  const client = net.connect({ port: 80, host: ip }, () => {
    client.end()
    // return { time: process.hrtime(startTime), ip }
    callBack(null, { time: process.hrtime(startTime), ip })
  })

  client.on('error', (err) => {
    // throw err
    callBack(err)
    client.end()
  })
}

ping('midu.dev', (err, info) => {
  if (err) console.error(err)
  else console.log(info)
})

/*
EJERCICIO 2
1) Pasamos de callback a promesa.
*/

export function obtenerDatosPromise () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve({ data: 'datos importantes' })
      } catch (error) { // Para este caso no tiene sentido el try catch ya que solo es un setTimeOut
        reject(error)
      }
    }, 2000)
  })
}

obtenerDatosPromise()
  .then((data) => console.log(data))
  .catch((error) => console.error(error))

/*
EJERCICIO 3
1) Que hace? Lee un archivo, pasa a mayusculas su contenido y si exite el aerchivo output.txt lo reesctibo con el contenido modificado.
2) Errores:
  - User callback como parametro.
  - Los return. Direcamente retornamos el callback.
  - No es necesario el setTimeout
3) Pasamos a promesa.
*/
export async function procesarArchivo () {
  const contenido = await fs.readFile('input.txt', 'utf8')
    .catch((error) => {
      console.error('Error leyendo archivo:', error.message)
      throw error
    })

  const textoProcesado = contenido.toUpperCase()
  try {
    await fs.writeFile('output.txt', textoProcesado)
  } catch (error) {
    console.error('Error guardando archivo:', error.message)
    throw error
  }
  console.log('Archivo procesado y guardado con éxito')
  // Con callback (agragar como parametro)
  // const handleWrite = error => {
  //   if (error) {
  //     console.error('Error guardando archivo:', error.message)
  //     callback(error)
  //   }

  //   console.log('Archivo procesado y guardado con éxito')
  //   callback(null)
  // }

  // const handleRead = (error, contenido) => {
  //   if (error) {
  //     console.error('Error leyendo archivo:', error.message)
  //     callback(error)
  //   }
  //   const textoProcesado = contenido.toUpperCase()

  //   fs.writeFile('output.txt', textoProcesado, handleWrite)
  // }

  // fs.readFile('input.txt', 'utf8', handleRead)
}

await procesarArchivo()
