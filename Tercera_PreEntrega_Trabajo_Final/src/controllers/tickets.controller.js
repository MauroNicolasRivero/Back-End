import { ticketDao } from "../daos/index.js";

export async function postController (req,res,next) {
    const cid = req.params.cid
    const saleData = req.body // recibo en el body los datos para crear el ticket
    try {
        const sale = await ticketDao.sale(cid,saleData)
        res.json(sale)
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message
        })
    }
}