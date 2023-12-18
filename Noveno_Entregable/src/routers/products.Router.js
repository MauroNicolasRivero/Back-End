import { Router} from "express";
import { productsManager } from "../services/productsManager.js";

export const productsRouter = Router()

productsRouter.get('/', async (req,res) => {
    const limit = req.query.limit
    try {
        const productos = await productsManager.getAll({limit})
        res.json(productos)
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message
        })
    }
})

productsRouter.get('/:pid', async (req,res) => {
    const pid = req.params.pid
    console.log("el pid en el get es:",pid)
    try {
        const productos = await productsManager.getById(pid)
        res.json(productos)
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message
        })
    } 
})

productsRouter.post('/', async (req,res) => {
    const data = req.body
    try {
        const productos = await productsManager.addProducts(data)
        res.json({data:productos}) // Agregué data:... para que funcione el socket
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message
        })
    }
})

productsRouter.put('/:pid', async (req,res) => {
    const pid = req.params.pid
    console.log("el pid en el put es:",pid)
    const data = req.body
    console.log(data)
    try {
        const productos = await productsManager.updateProducts(pid,data)
        res.json(productos)
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message
        })
    }
})

productsRouter.delete('/:pid', async (req,res) => {
    const pid = req.params.pid
    console.log("el pid en el delete es:",pid)
    try {
        const productos = await productsManager.deleteProducts(pid)
        res.json(productos)
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message
        })
    }
})
  
