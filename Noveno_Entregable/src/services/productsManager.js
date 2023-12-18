import { dbProductos } from '../models/products.js'
import { randomUUID } from 'crypto'

class ProductsManager {

    async getAll() {
        return await dbProductos.find().lean()
    }
    
    async getById(id) {
        const buscado = await dbProductos.findById(id).lean()
        if (!buscado) {
            throw new Error (`no se encontró el producto con el id ${id}`)
        }
        return buscado
    }

    async addProducts({title,description,code,price,status,stock,category,thumbnails}) {
        const _id = randomUUID()
        const producto = await dbProductos.create({_id,title,description,code,price,status,stock,category,thumbnails})
        return producto.toObject()
    }

    async updateProducts(id,prodData) {
        const modificado = await dbProductos.findByIdAndUpdate(id,
            { $set: prodData},
            { new: true })
            .lean()
        if (!modificado) {
            throw new Error('Error al actualizar: id no encontrado')
        }
        return modificado
    }

    async deleteProducts(id) {
        const eliminado = await dbProductos.findByIdAndDelete(id).lean()
        if (!eliminado) {
            throw new Error ('error al borrar: producto no encontrado')
        } 
        return eliminado
            
    }
}
 
export const productsManager = new ProductsManager()