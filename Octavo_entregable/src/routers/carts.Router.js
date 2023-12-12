import { Router } from "express";
//import { carts_json } from "../config.js";
import { cartManager } from "../services/cartsManager.js";

//const cM = new cartManager()

export const cartsRouter = Router()

cartsRouter.get('/:cid', async (req,res) => {
    const cid = req.params.cid
    try {
        const carritos = await cartManager.getById(cid)
        res.json(carritos)
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message
        })
    } 
})

cartsRouter.post('/', async (req,res) => {
    const data = req.body
    console.log(data)
    try {
        const carritos = await cartManager.addCarts(data)
        res.json(carritos)    
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message
        })
    }
})

cartsRouter.post('/:cid/products/:pid', async (req,res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    try {
        const productAgregado = await cartManager.addProductCart(cid,pid)
        res.json(productAgregado)
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message
        })
    }
})
