import fs from 'fs/promises'
import { Carts } from '../models/carts.js'


export class cartsManager{
    constructor(path) {
        this.path = path
        this.carts = []
    }

    getIdNewCarts() {
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
        console.log(array)
        this.carts = array
    }

    async writeCarts() {
        const json = JSON.stringify(this.carts,null,2)
        console.log(json)
        await fs.writeFile(this.path,json)
    }

    async getById(id) {
        await this.readCarts()
        const buscado = this.carts.find(p => p.id === id)
        if (!buscado) throw new Error (`no se encontró el carrito con el id ${id}`)
        return buscado
    }

    async addCarts() {
        await this.readCarts()
        const id = this.getIdNewCarts()
        const Carrito = new Carts({id,carts:[]})
        this.carts.push(Carrito)
        await this.writeCarts()
        return Carrito
    }

    async addProductCart(cid,pid) {
        await this.readCarts()
        const cartID = this.carts.find(p => p.id === cid) 
        if (!cartID) {
            const cart = {id: cid, products: [{id:pid, quantity:1}]}
            this.carts.push(cart)
        } else {
            const product = cartID.products.find(p => p.id === pid)
            if (product) {
                product.quantity++
            } else {
                const array = {id:pid, quantity:1}
                cartID.products.push(array)
            }
        } await this.writeCarts()
    } 
    
}