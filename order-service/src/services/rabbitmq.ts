import amqp, { Channel, Connection } from "amqplib";
import { Order } from "../models/orderModel.js";

const username = process.env.MQ_USERNAME || "guest";
const password = process.env.MQ_PASSWORD || "guest";
const host = process.env.HOST || "localhost";
const port = process.env.MQ_PORT || "5672";

const connectionUrl = `amqp://${username}:${password}@${host}:${port}`;

const exchangeName = "orders";

type TOrder = {
  hamburguerType: string;
  price: number;
  leadTime?: number;
};

interface IOrderDetails {
  routingKey: string;
  order: TOrder;
  email: string;
}

export class Producer {
  channel!: Channel;
  connection!: Connection;

  async connectRabbitMq() {
    try {
      this.connection = await amqp.connect(connectionUrl);
      this.channel = await this.connection.createChannel();
      await this.createExchange(exchangeName, "fanout");
      console.log("✅ Connected to RabbitMq");
    } catch (error) {
      console.log(`Error on channel creation: ${error}`);
    }
  }

  async sendOrder(orderDetails: IOrderDetails) {
    try {
      if (!this.channel) {
        await this.connectRabbitMq();
      }

      const { routingKey, order } = orderDetails;
      const newOrder = new Order(orderDetails);

      setTimeout(() => {
        delete order.leadTime;
        this.channel.publish(
          exchangeName,
          routingKey,
          Buffer.from(JSON.stringify(orderDetails))
        );
        newOrder.save();
        console.log(
          `The message ${JSON.stringify(
            order
          )} is sent to the ${exchangeName} exchange.`
        );
      }, order.leadTime);
    } catch (error) {
      console.log(`Error on order placement: ${error}`);
    }
  }

  private async createExchange(exchangeName: string, exchangeType: string) {
    await this.channel.assertExchange(exchangeName, exchangeType);
  }
}
