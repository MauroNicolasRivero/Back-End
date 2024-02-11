import { productDao } from "../daos/index.js"

export async function getController(req,res,next) {
    const limit = req.query.limit
    req.logger.http('Entré al get de productos')
    try {
        const productos = await productDao.getAll({limit})
        res.json(productos)
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message
        })
    }    
}  

export async function getControllerByPid (req,res,next) {
    const pid = req.params.pid
    req.logger.debug('Recibí pid:' + pid)
    try {
        const productos = await productDao.getById(pid)
        res.json(productos)
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message
        })
    } 
}

export async function postController (req,res,next) {
    const data = req.body
    req.logger.info('El contenido del body del postController de product es:' + data)
    try {
        const productos = await productDao.addProducts(data)
        res.json({data:productos})
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message
        })
    }
}

export async function putController (req,res,next) {
    const pid = req.params.pid
    const data = req.body
    try {
        const productos = await productDao.updateProducts(pid,data)
        res.json(productos)
    } catch (error) {
        req.logger.error('No se pudo actualizar el producto:' + pid)
        res.json({
            status: 'error',
            message: error.message
        })
    }
}

export async function deleteController (req,res,next) {
    const pid = req.params.pid
    try {
        const productos = await productDao.deleteProducts(pid)
        req.logger.warning('Eliminé el pid:' + pid)
        res.json(productos)
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message
        })
    }
}