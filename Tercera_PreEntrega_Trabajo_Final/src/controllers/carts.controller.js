import { cartDao } from '../daos/index.js'

export async function getController(req,res,next) { 
    const cid = req.params.cid
    try {
        const carritos = await cartDao.getById(cid)
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
        const carritos = await cartDao.addCarts(data)
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
        const productAgregado = await cartDao.addProductCart(cid,pid)
        res.json(productAgregado)
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message
        })
    } 
}

export async function postSaleController(req,res,next) {
    const cid = req.params.cid
    try {
        const cartElegido = await cartDao.sale(cid)
        res.json(cartElegido)
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message
        })
    }
}
