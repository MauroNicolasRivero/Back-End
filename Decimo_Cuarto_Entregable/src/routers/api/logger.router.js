import { Router } from "express"; 
import { getLoggerController } from "../../controllers/logger.controller.js";

export const loggerRouter = Router()

loggerRouter.get('/', getLoggerController)