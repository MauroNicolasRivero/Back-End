import { productDao } from "../daos/index.js"

export async function getController(req,res,next) {
    const limit = req.query.limit
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
    console.log("el pid en el get es:",pid)
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
    console.log("el pid en el put es:",pid)
    const data = req.body
    console.log(data)
    try {
        const productos = await productDao.updateProducts(pid,data)
        res.json(productos)
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message
        })
    }
}

export async function deleteController (req,res,next) {
    const pid = req.params.pid
    console.log("el pid en el delete es:",pid)
    try {
        const productos = await productDao.deleteProducts(pid)
        res.json(productos)
    } catch (error) {
        res.json({
            status: 'error',
            message: error.message
        })
    }
}