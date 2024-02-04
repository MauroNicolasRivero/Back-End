import { Router }  from 'express';
import { getController, postController, postControllerwithProd, postSaleController }  from '../../controllers/carts.controller.js'; 

export const cartsRouter = Router() 

cartsRouter.get('/:cid',getController) 
cartsRouter.post('/', postController)
cartsRouter.post('/:cid/products/:pid',postControllerwithProd)
cartsRouter.post('/:cid/sale',postSaleController)
