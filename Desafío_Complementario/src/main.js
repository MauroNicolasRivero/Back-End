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
