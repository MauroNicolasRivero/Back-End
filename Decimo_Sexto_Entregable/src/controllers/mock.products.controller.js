import { mockProductDao } from "../daos/index.js"

export async function getController(req,res,next) {
    try {
        const productos = await mockProductDao.getAll()
        res.json(productos)
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message
        })
    }
}