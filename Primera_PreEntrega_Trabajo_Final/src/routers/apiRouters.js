import { Router } from "express";
import { cartsRouter } from "./carts.Router.js";
import { productsRouter } from "./productsRouter.js";

export const apiRouter = Router()

apiRouter.use('/carts', cartsRouter)
apiRouter.use('/products', productsRouter)