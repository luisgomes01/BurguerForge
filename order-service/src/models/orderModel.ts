import { Schema, model } from "mongoose";

const BurguerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const OrderSchema = new Schema({
  order: {
    type: BurguerSchema,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    price: {
      type: Number,
      default: 0,
    },
    email: {
      type: String,
      required: true,
    },
  },
});

export const Order = model("Order", OrderSchema);
