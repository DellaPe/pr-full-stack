import fs from 'node:fs'

/*
Array => string => .join()
String => array => .split()
*/
// Ojo!!! Tiene que ser sincrono, ya que todo inicia con el dotenv.config()
export const config = ({ path = '.env'} = {}) => {
  try {
    const data = fs.readFileSync(path, 'utf8')
    const lines = data.split('\n') // Lo separo por lineas
    lines.forEach(line => {
      const [key, ...value] = line.split('=') // Lo separo por = (Puede que tenga mas de un =)
      const joinValue = value.join('=') // Vuelvo a unir por =
      const hasQuotes = (joinValue.startsWith('"') && joinValue.endsWith('"')) || 
                        (joinValue.startsWith("'") && joinValue.endsWith("'")) // Si tiene comillas
      const newValue = hasQuotes ? joinValue.slice(1, -1) : joinValue // Si tiene comillas las saco
      console.log(key, newValue)
      process.env[key] = newValue // Agrego al process.env
    })

  } catch (error) {
    // console.error(error)
  }
}


// Soporte commonjs
const dotenv = { config }
export default { dotenv }