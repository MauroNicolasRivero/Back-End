import express from 'express'
import { engine } from 'express-handlebars'
import { apiRouter } from './routers/api/api.router.js'
import { webRouter } from './routers/web/web.router.js'
import { passportInitialize } from './middlewares/authentication.js'
import { cookies } from './middlewares/cookies.js'

import { PORT, CNX_STR } from './config/config.js'
import mongoose from 'mongoose'

await mongoose.connect(CNX_STR)
console.log(`conectado a DB en ${CNX_STR}`)

export const app = express()

app.engine('handlebars', engine())

app.listen(PORT, () => {
  console.log(`servidor escuchando peticiones en puerto: ${PORT}`)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookies)
app.use(passportInitialize)

app.use('/static', express.static('./static'))

app.use('/api', apiRouter)
app.use('/', webRouter)


  
  