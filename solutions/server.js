import express from 'express'

const items = [
  { id: 1, content: 'Item 1' }
]

export const app = express()

app.use(express.json()) // Para parsear el body

app.get('/items', (req, res) => {
  return res.status(200).json(items)
})

app.get('/items/:id', (req, res) => {
  const { id } = req.params
  const item = items.find(item => item.id === Number(id))
  if (!item) return res.status(404).json({ error: 'No existe!' })
  return res.status(200).json(item)
})

app.delete('/items/:id', (req, res) => {
  const { id } = req.params
  const itemIndex = items.findIndex(item => item.id === Number(id))
  if (itemIndex === -1) return res.status(404).json({ error: 'No existe!' })
  items.splice(itemIndex, 1)
  return res.status(200).json({ msj: 'Eliminado!' })
})

app.post('/items', (req, res) => {
  const { content } = req.body
  if (!content) return res.status(400).json({ error: 'No cumple!' })
  const newItem = { id: items.length + 1, content }
  items.push(newItem)
  return res.json(newItem)
})

app.put('/items/:id', (req, res) => {
  const { id } = req.params
  const item = items.find(item => item.id === id)
  if (!item) return res.status(404).json({ error: 'No existe!' })
  const { content } = req.body
  if (!content) return res.status(400).json({ error: 'No cumple!' })
  item.content = content
  return res.status(200).json(item)
})

export const server = app.listen(process.env.PORT ?? 3000, () => {
  console.log('Listening on port 3000')
})
