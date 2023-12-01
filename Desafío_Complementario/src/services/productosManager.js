
import { dbProductos } from '../models/producto.mongoose.js'
import { randomUUID } from 'crypto'

class ProductosManager {
    async consultar() {                                         
        return await dbProductos.find().lean()        
    }

    async consultarPorId(id) {
        const buscado = await dbProductos.findById(id).lean()
        if (!buscado) {
            throw new Error('id no encontrado')
        }
        return buscado
    }

    async registrar(datosProductos) {
        datosProductos._id = randomUUID()                               
        const producto = await dbProductos.create(datosProductos)
        return producto.toObject()
    }

    async actualizar(id,prodData) {
        const modificado = await dbProductos.findByIdAndUpdate(id,
        { $set: prodData},                                       
        { new: true })                                 
         .lean()

        if (!modificado) {
            throw new Error('id no encontrado')
        }
        return modificado
    }

    async eliminar(id) {
        const eliminado = await dbProductos.findByIdAndDelete(id).lean()

        if (!eliminado) {
            throw new Error('id no encontrado')
        }
        return eliminado
    }

}

export const productosManager = new ProductosManager()
