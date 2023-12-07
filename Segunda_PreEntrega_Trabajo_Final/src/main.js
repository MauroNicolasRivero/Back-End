import express from "express";
import mongoose from 'mongoose'
import { MONGODB_CNX_STR } from './config.js'
import { PORT } from "./config.js";
//import { prods_json } from "./config.js";
import { apiRouter } from "./routers/api.Router.js";
import { webRouter } from "./routers/web.Router.js"
import { engine } from "express-handlebars";
import { Server as IOServer } from "socket.io";
import { productsManager } from "./services/productsManager.js";

await mongoose.connect(MONGODB_CNX_STR)
console.log('Base de datos conectada')

const app = express()

app.use(express.json())

app.engine('handlebars', engine())       
app.set('views', './views')              
app.set('view engine', 'handlebars')     

app.use('/static', express.static('./static')) 
app.use('/', webRouter)
app.use('/api', apiRouter)

app.use((err,req,res,next) => {
    res.json({
        status: 'error',
        descr: err.message
    })
})

const server = app.listen(PORT, () => {
    console.log(`Conectado al puerto ${PORT}!`)
})

// Descomentar las siguientes líneas para probar la segunda parte de la consigna donde ya no
// queremos ver una lista de productos estática sino que se actualice en tiempo real

/*

const ioServer = new IOServer(server)  

//const pM = new ProductsManager(prods_json) Esta no hay que descomentarla!!

ioServer.on('connection', async socket => {
    console.log('Cliente conectado: ', socket.id) // Cuando un cliente se conecta nos avisa
    socket.emit('productos',              // "productos" es el id que identifica el mensaje
      await productsManager.getAll())
  
    socket.on('nuevoProducto', async producto => {
      await productsManager.addProducts(producto)
      ioServer.sockets.emit('productos',
        await productsManager.getAll())
    })
  })
  
  // inyecto el servidor de websockets en cada peticion!
  app.use((req, res, next) => {
    req['io'] = IOServer
    next()
  })
  
  */

 
  
  