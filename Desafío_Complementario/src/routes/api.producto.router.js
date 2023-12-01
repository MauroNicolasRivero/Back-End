/*
La carpeta routes albergará las rutas que vamos a ir creando para usar como endpoints en las 
tareas de CRUD que necesitemos hacer sobre nuetros productos
Necesitamos importar Router, json y urlencoded de express y el manager que manejara esas
peticiones desde aqui a los servicios donde está escrita la lógica
Necesitamos exportar el archivo para que sea usado por el middleware app del main
*/

import { Router, json, urlencoded } from "express";
import { productosManager } from "../services/productosManager.js";

export const apiProductoRouter = Router()

apiProductoRouter.use(json())                            // middleware para leer archivos json
apiProductoRouter.use(urlencoded({ extended: true }))    // middleware para leer formularios 

apiProductoRouter.get('/productos', async (req,res) => { // productos es el endpoint, recordar que tiene el prefijo "Api" 
    try {
        const productos = await productosManager.consultar() // consultar es un metodo creado por mi en services
        res.json(productos)
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
})

apiProductoRouter.get('/productos/:id', async (req,res) => {
    try {
        const producto = await productosManager.consultarPorId(req.params.id) // aca le paso directamente el params
        res.json(producto)
    } catch (error) {
        res.status(404).json({
            status: 'error',
            message: error.message
        })
    }
})

apiProductoRouter.post('/productos', async (req,res) => {
    try {
        const datosProducto = req.body // aca hice diferente, guarde el valor del body en una variable y la pase
        const producto = await productosManager.registrar(datosProducto) // como argumento aqui
        res.status(201).json(producto)
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        })
    }
})

apiProductoRouter.put('/productos/:id', async (req,res) => {
    try {
        const nuevoProducto = await productosManager.actualizar(req.params.id, req.body)
        res.json(nuevoProducto) 
    } catch (error) {
        if (error.message === 'id no encontrado') {
            res.status(404)
        } else {
            res.status(400)
        }

        res.json({
            status: 'error',
            message: error.message
        })
    }
})

apiProductoRouter.delete('/productos/:id', async (req,res) => {
    try {
        const borrado = await productosManager.eliminar(req.params.id)
        res.json(borrado) 
    } catch (error) {
        return res.status(404).json({
            status: 'error',
            message: error.message
        })
    }
})