import { randomUUID } from 'crypto'
import { Schema, model } from "mongoose";

const collection = 'hamburguesas'

const productoSchema = new Schema({
    _id: { type: String, default: randomUUID },
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: Boolean, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnails: [{ type: String, required: true }]
   }, {
    strict: 'throw',
    versionKey: false,
    statics: {},
    methods: {}            
   })

   export const dbProductos = model(collection,productoSchema)
