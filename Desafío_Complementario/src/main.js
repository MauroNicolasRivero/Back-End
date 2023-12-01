/*
En el main se deben importar expres, mongoose , engine, etc... todas las librerias, archivos y
frameworks que vamos a utlizar en nuestro proyecto
Vamos a conectarnos en primera instancia con el servidor de la base de datos y luego con el 
servidor de la aplicacion que estamos desarrollando
Tambien vamos a declarar los middlewares que vamos a consumir
*/

import express from 'express'
import mongoose from 'mongoose'
import { MONGODB_CNX_STR } from './config.js'
import { PORT } from './config.js'
import { apiProductoRouter } from './routes/api.producto.router.js'
import { engine } from 'express-handlebars'

await mongoose.connect(MONGODB_CNX_STR)
console.log('Base de datos conectada')

const app = express()

app.engine('handlebars', engine())

const server = app.listen(PORT, ()=> { console.log(`Servidor escuchando en puerto ${PORT}`) })

app.use('/static', express.static('./static'))

app.use('/api', apiProductoRouter)