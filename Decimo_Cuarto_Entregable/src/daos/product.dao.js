import { Schema, model } from "mongoose";
import { randomUUID } from "crypto";
import { NotFoundError } from "../models/errors/notFound.error.js";

const collection = "hamburguesas";

const productSchema = new Schema(
  {
    _id: { type: String, default: randomUUID },
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: Boolean, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnails: [{ type: String, required: true }],
  },
  {
    strict: "throw",
    versionKey: false,
  }
);

const productModel = model(collection, productSchema);

// -------------------------------------------------------

export class ProductDao {
  async getAll() {
    return await productModel.find().lean();
  }

  async getById(id) {
    const buscado = await productModel.findById(id).lean();
    if (!buscado) {
      throw new NotFoundError('producto');
    }
    return buscado;
  }

  async addProducts({
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  }) {
    const _id = randomUUID();
    const producto = await productModel.create({
      _id,
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    });
    return producto.toObject();
  }

  async updateProducts(id, prodData) {
    const modificado = await productModel
      .findByIdAndUpdate(id, { $set: prodData }, { new: true })
      .lean();
    if (!modificado) {
      throw new NotFoundError('producto');
    }
    return modificado;
  }

  async deleteProducts(id) {
    const eliminado = await productModel.findByIdAndDelete(id).lean();
    if (!eliminado) {
      throw new NotFoundError('producto');
    }
    return eliminado;
  }
}
