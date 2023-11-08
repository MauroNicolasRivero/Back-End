import { Products } from "../models/products.js";
import { prods_json } from "../config.js";
import fs from 'fs/promises'

export class productsManager {
    static idProducto = 11 // Arranca desde el número 11 porque ya había precargado 10 artículos
    constructor(path) {
        this.path = path
        this.Products = []
    }
    static getIdNewProd() {
        return productsManager.idProducto++
    }

    async getAll(query = {}) {
        const json = await fs.readFile(this.path, 'utf-8')
        if ((query.limit) >= 1 && (query.limit) <= 10) {
            return JSON.parse(json).filter(p => p.id <= query.limit)

        } else if ((query.limit) < 0 || (query.limit) > 10) {
            throw new Error ("Por favor ingresar un numero del 1 a 10")

        }   
            return JSON.parse(json)
    }
    
    async getById(id) {
        const json = await fs.readFile(this.path,'utf-8')
        const productos = JSON.parse(json)
        const buscado = productos.find(p => p.id === id)
        if (!buscado) throw new Error (`no se encontró el producto con el id ${id}`)
        return buscado
    }

    async writeProducts() {
        const productsJson = JSON.stringify(this.Products, null, 2)
        await fs.writeFile(this.path, productsJson)
    }

    async addProducts(datos) {
        const json = await fs.readFile(this.path, 'utf-8')
        const idNvo = productsManager.getIdNewProd()
        const productoNuevo = new Products({ id: idNvo, datos })
        const codeRepeat = this.Products.find(p => p.id === productoNuevo.id)
        if (codeRepeat) {
          throw new Error(`El id ${productoNuevo.id} ya esta asignado, por favor verificar información`)
        }
        this.Products.push(productoNuevo)
        await this.writeProducts()
        return productoNuevo
    }

    async updateProducts(pid, campo) {
        const json = await fs.readFile(this.path, 'utf-8')
        const productos = JSON.parse(json)
        const index = productos.find(p => p.id === pid)
        if (index !== -1) {
          const nuevoProd = new Products({ pid, campo })
          this.Products[index] = nuevoProd
          await this.writeProducts()
          return nuevoProd
        } else {
          throw new Error('error al actualizar: usuario no encontrado')
        }
    }

    async deleteProducts(pid) {
        const json = await fs.readFile(this.path, 'utf-8')
        const productos = JSON.parse(json)
        const index = productos.find(p => p.id === pid)
        if (index !== -1) {
          const arrayWithDeletes = this.Products.splice(index, 1)
          await this.writeProducts()
          return arrayWithDeletes[0]
        } else {
          throw new Error('error al borrar: usuario no encontrado')
        }
      }
}