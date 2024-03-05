import { Schema, model } from "mongoose";
import { randomUUID } from "crypto";
import { NotFoundError } from '../models/errors/notFound.error.js'

const collection = "carritos";

const cartSchema = new Schema(
  {
    _id: { type: String, default: randomUUID },
    products: {
      type: [
        {
          _id: { type: String, ref: 'hamburguesas'},
          quantity: { type: Number, min: 1, default: 1}
        }
      ]
    }
  },
  {
    strict: "throw",
    versionKey: false,
  });

cartSchema.pre('find', function (next) {
  this.populate('hamburguesas._id')
  next()
})

const cartModel = model(collection, cartSchema);

// -------------------------------------------------------------------------

export class CartDao {
  async getById(id) {
    const buscado = await cartModel.findById(id).lean();
    if (!buscado) {
      throw new NotFoundError('carrito')
    }
    return buscado;
  }

  async addCarts() {
    const _id = randomUUID();
    const Carrito = await cartModel.create({ _id, products: [] });
    return Carrito.toObject();
  }

  async addProductCart(cid, pid) {
    const cartID = await cartModel.findById(cid).lean();
    if (!cartID) {
      const _id = randomUUID();
      const cart = await cartModel.create({
        _id,
        products: [{ _id: pid, quantity: 1 }],
      });
      return cart;
    } else {
      const product = cartID.products.find((p) => p._id === pid);
      if (product) {
        product.quantity++;
        console.log("Encontro el carrito y el producto, sumo uno?", product);
        const optionTwo = await cartModel.findByIdAndUpdate(cartID, {
          $set: { products: product },
        });
        // esta sobreescribiendo el articulo cuando tiene que sumar sobre uno que ya existe
        return optionTwo;
      } else {
        const array = { _id: pid, quantity: 1 };
        const optionThree = await cartModel.findByIdAndUpdate(cartID, {
          $push: { products: array },
        });
        return optionThree;
      }
    }
  }
}
