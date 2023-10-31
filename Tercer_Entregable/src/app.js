// Importamos los archivos y el framework Express
import { ProductManager } from './ProductManager.js'
import { productos_json, PORT } from "./config.js"
import express from 'express'

// Creamos una nueva instancia de la clase ProductManager
const pM = new ProductManager (productos_json)

// Iniciamos el servidor
const app = express()

// Esta consulta devolverá todos los productos almacenados en products.json
// Si recibe un valor en el argumento limit, devolverá esa cantidad de productos 
app.get('/products', async (req, res) => {
    const limit = parseInt(req.query.limit)
    try {
        const productos = await pM.getAll({limit})
        res.json(productos)
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message
        })
    }
})


// Esta consulta devolverá el producto cuyo id coincida con el id pasado como argumento,
// sino encuenta coincidencia devolverá un error
app.get('/products/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid)
    try {
        const productos = await pM.getById(pid)
        res.json(productos)
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message
        })
    } 
})

// Seteamos el servidor en el puerto 8080
app.listen(PORT, () => {
    console.log(`conectado y escuchando en puerto ${PORT}`)
})