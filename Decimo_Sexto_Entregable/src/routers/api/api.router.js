import { Router,json,urlencoded } from 'express'
import { usersRouter } from './users.router.js'
import { metodosPersonalizados } from '../../middlewares/metodosPersonalizados.js'
import { sessionsRouter } from './sessions.router.js'
import { errorHandler } from '../../middlewares/errorHandler.js'
import { cartsRouter } from "./carts.router.js";
import { productsRouter } from "./products.router.js";
import { mockProductsRouter } from './mock.products.router.js' 
import { loggerRouter } from './logger.router.js'
import { docsRouter } from './documentacion.router.js'

export const apiRouter = Router()

apiRouter.use(json())
apiRouter.use(urlencoded({ extended: true })) 

apiRouter.use(metodosPersonalizados)

apiRouter.use('/users', usersRouter)
apiRouter.use('/sessions', sessionsRouter)

apiRouter.use('/carts', cartsRouter)
apiRouter.use('/products', productsRouter)

apiRouter.use('/mockingproducts', mockProductsRouter)
apiRouter.use('/loggerTest', loggerRouter)

apiRouter.use('/docs', docsRouter)

apiRouter.use(errorHandler)