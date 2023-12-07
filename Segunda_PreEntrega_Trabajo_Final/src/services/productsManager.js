//import fs from 'fs/promises'
import { dbProductos } from '../models/products.js'
import { randomUUID } from 'crypto'

class ProductsManager {

    /*getIdNewProd() {
        if (this.products.length > 0) {
            console.log(this.products.length)
            return this.products[this.products.length - 1].id + 1
        } else {
            return 1
        }           
    }

    async readProducts() {
        const json = await fs.readFile(this.path,'utf-8')
        const array = JSON.parse(json)
        this.products = array
    }

    async writeProducts() {
        const json = JSON.stringify(this.products,null,2)
        await fs.writeFile(this.path,json)
    }

    async getAll(query = {}) {
        await this.readProducts()
        if ((query.limit) >= 1 && (query.limit) <= 10) {
            return this.products.filter(p => p.id <= query.limit)

        } else if ((query.limit) < 0 || (query.limit) > 10) {
            throw new Error ("Por favor ingresar un numero del 1 a 10")

        }   
            return this.products
    }*/

    async getAll() {
        return await dbProductos.find().lean()
    }
    
    async getById(id) {
        //await this.readProducts()
        const buscado = await dbProductos.findById(id).lean()
        if (!buscado) {
            throw new Error (`no se encontró el producto con el id ${id}`)
        }
        return buscado
    }

    async addProducts({title,description,code,price,status,stock,category,thumbnails}) {
        //await this.readProducts()
        const _id = randomUUID()
        const producto = await dbProductos.create({_id,title,description,code,price,status,stock,category,thumbnails})
        //this.products.push(producto)
        //await this.writeProducts()
        return producto.toObject()
    }

    async updateProducts(id,prodData) {
        //await this.readProducts()
        //const index = this.products.findIndex(p => p.id === id)
        const modificado = await dbProductos.findByIdAndUpdate(id,
            { $set: prodData},
            { new: true })
            .lean()
        if (!modificado) {
            //const nuevoProd = new Products({id, ...this.products[index], ...prodData})
            //this.products[index] = nuevoProd
            //await this.writeProducts()
            throw new Error('Error al actualizar: id no encontrado')
        }
        return modificado
    }

    async deleteProducts(id) {
        //await this.readProducts()
        const eliminado = await dbProductos.findByIdAndDelete(id).lean()
        if (!eliminado) {
            //const arrayDeletes = this.products.splice(index,1)
            //await this.writeProducts()
            //return arrayDeletes[0]
            throw new Error ('error al borrar: producto no encontrado')
        } 
        return eliminado
            
    }
}
 
export const productsManager = new ProductsManager()