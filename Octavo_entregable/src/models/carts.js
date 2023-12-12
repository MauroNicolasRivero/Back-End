import { randomUUID } from 'crypto'
import { Schema, model } from "mongoose";

const collection = 'carritos'

const carritoSchema = new Schema({
    _id: { type:String, default: randomUUID },
    products: [{ }]
   },{
    strict: 'throw',
    versionKey: false,
    statics: {},
    methods: {},
})

export const dbCarrito = model(collection,carritoSchema)






