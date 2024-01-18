import { cartManager } from "../services/cartsManager.js";

export async function getController(req,res,next) { 
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
}

export async function postController(req,res,next) {
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
}

export async function postControllerwithProd(req,res,next) {
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
}