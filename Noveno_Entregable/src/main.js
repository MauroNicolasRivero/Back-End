import express from "express";
import mongoose from 'mongoose'
import { MONGODB_CNX_STR, PORT } from './config.js'
import { engine } from "express-handlebars";
import session from "express-session";
import { apiRouter } from './routers/api/apirest.router.js'
import { webRouter } from './routers/web/web.router.js'
import { sesiones } from './middlewares/sesiones.js'
import connectMongo from 'connect-mongo'
import { autenticacion } from './middlewares/passport.js'

await mongoose.connect(MONGODB_CNX_STR)
console.log('Base de datos conectada')

export const app = express()

app.use(sesiones)

app.use(autenticacion)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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

app.use(session({
  store: connectMongo.create({
    mongoUrl:'mongodb://127.0.0.1/productos',
    ttl:15
  }),
  secret: 'Mauro12345',
  resave: true, 
  saveUninitialized: true 
}))

  
  