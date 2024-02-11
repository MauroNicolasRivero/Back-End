import mongoose from "mongoose";
import { CNX_STR } from "../config/config.js"

import { CartDao } from "./cart.dao.js";
import { ProductDao } from "./product.dao.js";
import { UserDao } from "./user.dao.js";
import { TicketDao } from "./ticket.dao.js";
import { MockProductDao } from "./mock.product.dao.js";

await mongoose.connect(CNX_STR)
console.log(`conectado a DB en ${CNX_STR}`)

export const cartDao = new CartDao()
export const productDao = new ProductDao()
export const userDao = new UserDao()
export const ticketDao = new TicketDao()
export const mockProductDao = new MockProductDao()
