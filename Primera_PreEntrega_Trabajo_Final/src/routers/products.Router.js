import { Router } from "express";
import { prods_json } from "../config.js";
import { ProductsManager } from "../services/productsManager.js";

const pM = new ProductsManager(prods_json)

export const productsRouter = Router()

productsRouter.get('/', async (req,res) => {
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

productsRouter.get('/:pid', async (req,res) => {
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

productsRouter.post('/', async (req,res) => {
    const data = req.body
    console.log(data)
    try {
        const productos = await pM.addProducts(data)
        res.json(productos)
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message
        })
    }
})

productsRouter.put('/:pid', async (req,res) => {
    const pid = parseInt(req.params.pid)
    console.log(pid)
    const data = req.body
    console.log(data)
    try {
        const productos = await pM.updateProducts(pid,data)
        res.json(productos)
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message
        })
    }
})

productsRouter.delete('/:pid', async (req,res) => {
    const pid = parseInt(req.params.pid)
    console.log(pid)
    try {
        const productos = await pM.deleteProducts(pid)
        res.json(productos)
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message
        })
    }
})

