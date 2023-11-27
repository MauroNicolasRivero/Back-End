import fs from 'fs/promises'
import { Carts } from '../models/carts.js'

export class cartsManager{
    constructor(path) {
        this.path = path
        this.products = []
    }

    getIdNewCarts() {
        if (this.products.length > 0) {
            console.log(this.products.length)
            return this.products[this.products.length - 1].id + 1
        } else {
            return 1
        }
    }

    async readCarts() {
        const json = await fs.readFile(this.path,'utf-8')
        const array = JSON.parse(json)
        this.products = array.map(i => new Carts(i))
    }

    async writeCarts() {
        const json = JSON.stringify(this.products,null,2)
        await fs.writeFile(this.path,json)
    }

    async getById(id) {
        await this.readCarts()
        const buscado = this.products.find(p => p.id === id)
        if (!buscado) throw new Error (`no se encontró el carrito con el id ${id}`)
        return buscado
    }

    async addCarts({products}) {
        await this.readCarts()
        const id = this.getIdNewCarts()
        console.log(id)
        const Carrito = new Carts({id,products })
        this.products.push(Carrito)
        await this.writeCarts()
        return Carrito
    }

}