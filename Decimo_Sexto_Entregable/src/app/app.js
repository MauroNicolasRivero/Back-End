import express from 'express'
import { engine } from 'express-handlebars'
import { apiRouter } from '../routers/api/api.router.js'
import { webRouter } from '../routers/web/web.router.js'
import { passportInitialize } from '../middlewares/authentication.js'
import { cookies } from '../middlewares/cookies.js'
import { loggerInRequest } from '../middlewares/logger.js'

export const app = express()

app.engine('handlebars', engine())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(loggerInRequest)

app.use(cookies)
app.use(passportInitialize)

app.use('/static', express.static('./static'))

app.use('/api', apiRouter)
app.use('/', webRouter)