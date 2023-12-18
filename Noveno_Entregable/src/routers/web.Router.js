import { Router,json,urlencoded } from 'express'
import { productsManager } from "../services/productsManager.js";

export const webRouter = Router()

webRouter.use(json())
webRouter.use(urlencoded({ extended: true }))

webRouter.get('/', async (req, res) => {
  const productos = await productsManager.getAll()
  res.render('Home', {
    titulo: 'Inicio',
    hayProductos: productos.length > 0,
    productos
  })
})

webRouter.get('/realTimeProducts', async (req, res) => {
  const productos = await productsManager.getAll()
  res.render('realTimeProducts', {
    titulo: 'Real Time',
    hayProductos: productos.length > 0,
    productos
  })
})