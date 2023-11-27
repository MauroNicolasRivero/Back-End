import express from "express";
import { engine } from "express-handlebars";
import { Server as IOServer} from "socket.io";

import { PORT } from "./config.js";

import { webRouter} from "./routers/web.Router.js";
import { apiRouter } from "./routers/api.Router.js";

import { productsManager} from "./services/productsManager.js";

const app = express()

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use((err,req,res,next) => {
    res.json({
        status: 'error',
        descr: err.message
    })
})

app.use(express.json())
app.use('/static', express.static('./static'))

app.use('/', webRouter)
app.use('/api', apiRouter)
const server = app.listen(PORT, () => {
    console.log(`Conectado al puerto ${PORT}!`)
})

// Descomentar las siguientes líneas para probar la segunda parte de la consigna donde ya no
// queremos ver una lista de productos estática sino que se actualice en tiempo real

/*
const ioServer = new IOServer(server)

ioServer.on('connection', async socket => {
    console.log('Cliente conectado: ', socket.id)
    socket.emit('productos',
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
  


 
  
  