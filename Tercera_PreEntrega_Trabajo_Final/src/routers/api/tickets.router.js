import { Router } from "express";
import { postController } from "../../controllers/tickets.controller.js";

export const ticketsRouter = Router()

ticketsRouter.post('/:cid/sale', postController)