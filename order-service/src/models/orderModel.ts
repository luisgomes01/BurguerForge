import { Schema, model } from "mongoose";

const BurguerSchema = new Schema({
  hamburguerType: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  leadTime: {
    type: Number,
    required: false,
  },
});

const OrderSchema = new Schema({
  order: BurguerSchema,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    required: true,
  },
});

export const Order = model("Order", OrderSchema);
