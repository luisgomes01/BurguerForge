import { Producer } from "../services/rabbitmq.js";
import { Request, Response } from "express";
import {
  BACON_BURGUER,
  CHEESE_BURGUER,
  LEAD_TIME_MAPPING,
  VEGGIE_BURGUER,
} from "../constants/index.js";

const producer = new Producer();

const makeOrderFactory = (hamburguerType: string, price: number) => {
  const order = {
    hamburguerType,
    price,
    leadTime:
      LEAD_TIME_MAPPING[hamburguerType as keyof typeof LEAD_TIME_MAPPING] || 0,
  };

  return order;
};

export class OrderController {
  async placeOrder(req: Request, res: Response) {
    const {
      message: { hamburguerType, price },
      email,
    } = req.body;

    const order = makeOrderFactory(hamburguerType, price);

    switch (hamburguerType) {
      case CHEESE_BURGUER:
        await producer.sendOrder("", order, email);
        break;
      case VEGGIE_BURGUER:
        await producer.sendOrder("", order, email);
        break;
      case BACON_BURGUER:
        await producer.sendOrder("", order, email);
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
