import { Router } from 'express';
import { getController, getControllerByPid, postController, putController, deleteController } from "../../controllers/products.controller.js";

export const productsRouter = Router()

productsRouter.get('/',getController)
productsRouter.get('/:pid', getControllerByPid)
productsRouter.post('/', postController)
productsRouter.put('/:pid', putController)
productsRouter.delete('/:pid', deleteController)

