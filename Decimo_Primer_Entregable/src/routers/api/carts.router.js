import express  from 'express';
import { getController, postController, postControllerwithProd }  from '../../controllers/carts.controller.js'; 

export const cartsRouter = express.Router() 

cartsRouter.use(express.json()) 

cartsRouter.get('/:cid',getController) 
cartsRouter.post('/', postController)
cartsRouter.post('/:cid/products/:pid',postControllerwithProd)
