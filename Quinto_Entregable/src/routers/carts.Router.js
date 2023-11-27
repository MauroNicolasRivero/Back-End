import { Router } from "express";
import { carts_json } from "../config.js";
import { cartsManager } from "../services/cartsManager.js";

const cM = new cartsManager(carts_json)

export const cartsRouter = Router()

cartsRouter.get('/:cid', async (req,res) => {
    const cid = parseInt(req.params.cid)
    try {
        const carritos = await cM.getById(cid)
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
        const carritos = await cM.addCarts(data)
        res.json(carritos)    
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message
        })
    }
})