import { Router, json, urlencoded } from "express";
import { productosManager } from "../services/productosManager.js";

export const apiProductoRouter = Router()

apiProductoRouter.use(json())                            
apiProductoRouter.use(urlencoded({ extended: true }))    

apiProductoRouter.get('/productos', async (req,res) => { 
    try {
        const productos = await productosManager.consultar() 
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
        const producto = await productosManager.consultarPorId(req.params.id)
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
        const datosProducto = req.body
        const producto = await productosManager.registrar(datosProducto)
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
