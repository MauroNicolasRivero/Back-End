import fs from 'fs/promises'
import { Products } from '../models/products.js'

export class ProductsManager {
    constructor(path) {
        this.path = path
        this.products  = []
    }

    getIdNewProd() {
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
        this.products = array.map(i => new Products(i))
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
    }
    
    async getById(id) {
        await this.readProducts()
        const buscado = this.products.find(p => p.id === id)
        if (!buscado) throw new Error (`no se encontró el producto con el id ${id}`)
        return buscado
    }

    async addProducts({title,description,code,price,status,stock,category,thumbnails}) {
        await this.readProducts()
        const id = this.getIdNewProd()
        console.log(id)
        const producto = new Products({id,title,description,code,price,status,stock,category,thumbnails})
        this.products.push(producto)
        await this.writeProducts()
        return producto
    }

    async updateProducts(id,prodData) {
        await this.readProducts()
        const index = this.products.findIndex(p => p.id === id)
        if (index !== -1) {
            const nuevoProd = new Products({id, ...this.products[index], ...prodData})
            this.products[index] = nuevoProd
            await this.writeProducts()
            return nuevoProd
        } else {
            throw new Error ('error al actualizar: producto no encontrado')
        }
    }

    async deleteProducts(id) {
        await this.readProducts()
        const index = this.products.findIndex(p => p.id === id)
        if (index !== -1) {
            const arrayDeletes = this.products.splice(index,1)
            await this.writeProducts()
            return arrayDeletes[0]
        } else {
            throw new Error ('error al borrar: producto no encontrado')
        }
    }
}

export const productsManager = new ProductsManager('./bd/productos.json')