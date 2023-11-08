import { Router } from "express";
import { cartsManager } from "../services/cartsManager.js";
import { carts_json } from "../config.js";

const cM = new cartsManager(carts_json)

export const cartsRouter = Router()

cartsRouter.post('/', async (req,res) => {
    const datos = req.body.datos
    try {
        const carts = await cM.addCarts({datos})
        res.json(carts)
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message
        })
    }
})
