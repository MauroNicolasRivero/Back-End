import { Router } from "express";
import { cartsRouter } from "./carts.Router.js";
import { productsRouter } from "./products.Router.js";

export const apiRouter = Router()

apiRouter.use('/carts', cartsRouter)
apiRouter.use('/products', productsRouter)
