import { dbCarrito } from '../models/carts.js'
import { randomUUID } from 'crypto'

class cartsManager { 
    constructor() {
        this.carts = []
    }

    async addCarts() {
        const _id = randomUUID()
        const Carrito = await dbCarrito.create({_id,products:[]})
        return Carrito.toObject()
    }

    async addProductCart(cid,pid) {
        const cartID = await dbCarrito.findById(cid).lean() 
        if (!cartID) {
            const _id = randomUUID()
            const cart = await dbCarrito.create({_id, products: [{_id:pid, quantity:1}] })
            return cart
        } else {
            const product = cartID.products.find(p => p._id === pid)
            if (product) {
                product.quantity++
                console.log("Encontro el carrito y el producto, sumo uno?",product)
                const optionTwo = await dbCarrito.findByIdAndUpdate(cartID,{$set: {products:product}})
                // esta sobreescribiendo el articulo cuando tiene que sumar sobre uno que ya existe
                return optionTwo
            } else {
                const array = {_id:pid, quantity:1}
                const optionThree = await dbCarrito.findByIdAndUpdate(cartID,{$push: {products:array}})
                return optionThree
            }
        } 
    } 
    
}

export const cartManager = new cartsManager()