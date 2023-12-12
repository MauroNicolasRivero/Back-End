import mongoose from "mongoose"
import { randomUUID } from "node:crypto" // ver porque cambio esto

const collection = 'usuarios'

const schema = new mongoose.Schema({
  _id: { type: String, default: randomUUID },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
}, {
  strict: 'throw',
  versionKey: false
})

// ver esta forma de usar el modelo como Manager en los proyectos anteriores
export const usuariosManager = mongoose.model(collection, schema)