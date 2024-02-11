import { Router }  from 'express';
import { getController, postController, postControllerwithProd }  from '../../controllers/carts.controller.js'; 
import { errorHandler } from '../../middlewares/errorHandler.js';

export const cartsRouter = Router() 

cartsRouter.get('/:cid',getController) 
cartsRouter.post('/', postController)
cartsRouter.post('/:cid/products/:pid',postControllerwithProd)
