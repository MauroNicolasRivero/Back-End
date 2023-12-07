//import fs from 'fs/promises'
import { dbCarrito } from '../models/carts.js'
import { randomUUID } from 'crypto'

class cartsManager { 
    constructor() {
        //this.path = path
        this.carts = []
    }

    /*getIdNewCarts() {
        if (this.carts.length > 0) {
            console.log(this.carts.length)
            return this.carts[this.carts.length - 1].id + 1
        } else {
            return 1
        }
    }

    async readCarts() {
        const json = await fs.readFile(this.path,'utf-8')
        const array = JSON.parse(json)
        this.carts = array
    }

    async writeCarts() {
        const json = JSON.stringify(this.carts,null,2)
        await fs.writeFile(this.path,json)
    }*/

    async getById(id) {
        //await this.readCarts()
        const buscado = await dbCarrito.findById(id).lean()
        if (!buscado) {
            throw new Error (`no se encontró el carrito con el id ${id}`)
        }
        return buscado
    }

    async addCarts() {
        //await this.readCarts()
        const _id = randomUUID()
        const Carrito = await dbCarrito.create({_id,products:[]})
        //this.products.push(Carrito)
        //await this.writeCarts()
        return Carrito.toObject()
    }

    async addProductCart(cid,pid) {
        //await this.readCarts()
        const cartID = await dbCarrito.findById(cid).lean() 
        if (!cartID) {
            //const cart = {_id: cid, products: [{id:pid, quantity:1}]}
            const _id = randomUUID()
            const cart = await dbCarrito.create({_id, products: [{_id:pid, quantity:1}] })
            return cart
            //this.carts.push(cart)
        } else {
            const product = cartID.products.findById(pid).lean()
            if (product) {
                product.quantity++
            } else {
                const array = {id:pid, quantity:1}
                cartID.this.carts.push(array)
                return array
            }
        } //await this.writeCarts()
    } 
    
}

export const cartManager = new cartsManager()