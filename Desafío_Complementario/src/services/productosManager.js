/*
En la carpeta servicios vamos a importar el modelo de esquema que construimos y el randomUUID
de crypto para generar los id de forma automática y única
Aqui crearemos la clase Manager que manejará los documentos a través de la lógica que vayamos
creando, mormalmente acciones del tipo CRUD
Vamos a necesitar exportar este manejador para la carpeta routes en el archivo de api... para
que los endpoints puedan consumir los métodos aqui declarados
*/

import { dbProductos } from '../models/producto.mongoose.js'
import { randomUUID } from 'crypto'

class ProductosManager {
    async consultar() {                                          // nombre el método creado por mi
        return await dbProductos.find().lean()         // nombre del documento + metodos nativo de mongoose
    }

    async consultarPorId(id) {
        const buscado = await dbProductos.findById(id).lean()
        if (!buscado) {
            throw new Error('id no encontrado')
        }
        return buscado
    }

    async registrar(datosProductos) {
        datosProductos._id = randomUUID()                               // _id creado de forma aleatoria por crypto
        const producto = await dbProductos.create(datosProductos)
        return producto.toObject()
    }

    async actualizar(id,prodData) {
        const modificado = await dbProductos.findByIdAndUpdate(id,
        { $set: prodData},                                         // $set método para manejar lo que trae el body
        { new: true })                                   // metodo para indicarle que me traiga el nuevo resultado
         .lean()

        if (!modificado) {
            throw new Error('id no encontrado')
        }
        return modificado
    }

    async eliminar(id) {
        const eliminado = await dbProductos.findByIdAndDelete(id).lean()

        if (!eliminado) {
            throw new Error('id no encontrado')
        }
        return eliminado
    }

}

export const productosManager = new ProductosManager()