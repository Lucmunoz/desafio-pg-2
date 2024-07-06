import express from 'express'
import cors from 'cors'
import { findAll, create, updateLikesById, deleteById, findById } from './models/likeme.models.js'

const app = express()

const PORT = process.env.PORT ?? 3000

app.use(cors())
app.use(express.json())

app.get('/posts', async (req, res) => {
  try {
    const result = await findAll()
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error.message)
  }
})

app.get('/posts/:id', async (req, res) => {
  try {
    const result = await findById(req.params.id)
    if (result.length === 0) {
      // Al no trabajar con rutas, podemos gatillar este error por medio de ThunderClient para cumplir con lo exigido en el desafío.
      // console.log(`¡No se han encontrado datos asociados al id: ${req.params.id}!`)
      throw new Error(`¡No se han encontrado datos asociados al id: ${req.params.id}!`)
    }
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({ status: false, message: `Error. ${error.message}` })
  }
})

app.post('/posts', async (req, res) => {
  try {
    const { titulo, url, descripcion } = req.body
    if (titulo === '' || url === '' || descripcion === '') {
      throw new Error('¡Debes completar todos los campos!')
    }
    await create(titulo, url, descripcion)
    return res.status(201).json({ message: 'Post creado con exito' })
  } catch (error) {
    res.status(400).json({ status: false, message: `No hemos podido ingresar los datos. ${error.message}` })
  }
})

app.put('/posts/like/:id', async (req, res) => {
  try {
    const { id } = req.params
    await updateLikesById(id)
    return res.status(201).json({ status: true, message: `Agregaste un like al post ${id}!` })
  } catch (error) {
    res.status(500).json({ status: false, message: `No hemos podido actualizar los datos. ${error}` })
  }
})

app.delete('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params
    await deleteById(id)
    return res.status(201).json({ status: true, message: `Post ${id} Eliminado exitosamente!` })
  } catch (error) {
    res.status(500).json({ status: false, message: `No hemos podido eliminar el post. ${error}` })
  }
})

app.all('/health', (_, res) => {
  res.status(200).json({ status: false, message: 'El servicio esta activo.' })
})

app.all('*', (_, res) => {
  res.status(404).json({ status: false, message: 'NOT FOUND' })
})

app.listen(PORT, () => { console.log('Servidor Escuchando...') })

export default app
