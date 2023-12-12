/*
Este archivo lo cree para almacenar las rutas que utilizaré para manejar
las vistas creadas con handlebars.La ruta raiz muestra la lista actual de productos
basandose en la información que le provee el archivo productos.json
La vista realTimeProducts muestra la misma lista pero esta se actualiza en tiempo real
a diferencia de la raiz donde debemos actualizarla refrescando la página
*/


import { Router,json,urlencoded } from 'express'
//import { prods_json } from '../config.js';
import { productsManager } from "../services/productsManager.js";

//const pM = new productsManager()

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