import { Producer } from "../services/rabbitmq.js";
import { Request, Response } from "express";
import {
  BACON_BURGUER,
  CHEESE_BURGUER,
  VEGGIE_BURGUER,
} from "../constants/index.js";
import { makeOrderDetailsFactory } from "../factories/orderFactory.js";

const producer = new Producer();

export class OrderController {
  async placeOrder(req: Request, res: Response) {
    const {
      message: { hamburguerType, price },
      email,
    } = req.body;

    const orderDetails = makeOrderDetailsFactory(hamburguerType, price, email);

    switch (hamburguerType) {
      case CHEESE_BURGUER:
      case VEGGIE_BURGUER:
      case BACON_BURGUER:
        await producer.sendOrder(orderDetails);
        break;
      default:
        res
          .status(400)
          .send(`Invalid hamburguer type, you sent ${hamburguerType}`);
        break;
    }

    res.send(`Order for ${hamburguerType} placed!`);
  }
}
