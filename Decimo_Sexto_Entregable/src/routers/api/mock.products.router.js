import { Router } from "express"; 
import { getController } from "../../controllers/mock.products.controller.js";

export const mockProductsRouter = Router()

mockProductsRouter.get('/', getController)