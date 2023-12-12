
// A lo ya conocido le agregamos lo necesario para utilizar Handlebars y Socket.io

import express from "express";
import mongoose from 'mongoose'
import { MONGODB_CNX_STR } from './config.js'
import { PORT } from "./config.js";
//import { prods_json } from "./config.js";
//import { apiRouter } from "./routers/api.Router.js"; Lo comente para correr el nuevo sistema de login
//import { webRouter } from "./routers/web.Router.js"  Lo comente para correr el nuevo sistema de login
import { engine } from "express-handlebars";
import { Server as IOServer } from "socket.io";
import { productsManager } from "./services/productsManager.js";
import  cookieParser  from 'cookie-parser'
import { cookieRouter } from "./routers/cookies.Router.js";
import session from "express-session";
import { apiRouter } from './routers/api/apirest.router.js'
import { webRouter } from './routers/web/web.router.js'
import { sesiones } from './middlewares/sesiones.js'
//import { sessionRouter } from "./routers/session.Router.js"; Lo comente para correr el nuevo sistema de login
import  FileStore  from "session-file-store";
import connectMongo from 'connect-mongo'

await mongoose.connect(MONGODB_CNX_STR)
console.log('Base de datos conectada')

//const fileStorage = FileStore(session) // Conectamos sessions con FileStore
export const app = express()

app.use(sesiones)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', engine())       // Configuramos el motor de plantillas 
app.set('views', './views')              // Seteamos el folder views
app.set('view engine', 'handlebars')     // Seteamos el motor de plantillas

app.use('/static', express.static('./static')) // Indicamos el uso publico de la carpeta Static

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
  })*/

 app.use(cookieParser("Mauro123")) // "Mauro123" sería mi firma para proteger las cookies
 app.use('/', cookieRouter)

// De esta forma guardamos la persistencia de la informacion en un archivo con FileStore

 /*app.use(session({
  // Ruta donde vivirá la carpeta para almacenar las sessiones Time To Live Tiempo de veces que el servidor tratara de leer el archivo
  store:new fileStorage({path:'./src/sessions', ttl:100,retries:0}),
  secret: 'Mauro12345',
  resave:false, // Permite mantener la sesion activa en caso de que la sesion se mantenga inactiva
  saveUninitialized:false // Permite guardar cualquier sesion aun cuando el objeto de sesion no tenga nada
}))*/

//app.use('/', sessionRouter) Lo comente para correr el nuevo sistema de login

// De esta forma guardamos la persistencia de la información en la base de datos
app.use(session({
  // Ruta donde vivirá la carpeta para almacenar las sessiones Time To Live Tiempo de veces que el servidor tratara de leer el archivo
  store: connectMongo.create({
    mongoUrl:'mongodb://127.0.0.1/productos',
    //mongoOptions: {useNewUrlParser: true, useUnifiedTopology:true}, Estan deprecated
    ttl:15
  }),
  secret: 'Mauro12345',
  resave: true, // Permite mantener la sesion activa en caso de que la sesion se mantenga inactiva
  saveUninitialized: true // Permite guardar cualquier sesion aun cuando el objeto de sesion no tenga nada
}))

  
  