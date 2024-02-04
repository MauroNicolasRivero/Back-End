import { Schema, model } from "mongoose";
import { randomUUID } from "crypto";

const collection = "tickets";

const ticketSchema = new Schema(
  {
    _id: { type: String, default: randomUUID },
    code: { type: String, default: randomUUID },
    purchase_datetime: { type: Date, default: Date.now },
    amount: { type: Number },
    purchaser: { type: String, ref: "users" }, // email usuario asociado al carrito
  },
  {
    strict: "throw",
    versionKey: false,
  }
);

const ticketModel = model(collection, ticketSchema);

// ---------------------------------------------------------------

export class TicketDao {
  async sale({ amount, purchaser }) {

    const _id = randomUUID();
    const code = randomUUID();
    const ticket = await ticketModel.create({
      _id,
      code,
      purchase_datetime,
      amount,
      purchaser,
    });
    return ticket.toObject();
  }
}
