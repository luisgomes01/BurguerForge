import amqp, { Channel, Connection } from "amqplib";

const username = process.env.MQ_USERNAME || "guest";
const password = process.env.MQ_PASSWORD || "guest";
const host = process.env.HOST || "localhost";
const port = process.env.MQ_PORT || "5672";

const connectionUrl = `amqp://${username}:${password}@${host}:${port}`;

const EXCHANGE = "orders";
const QUEUE = "orderQueue";

type TOrder = {
  hamburguerType: string;
  price: number;
  leadTime: number;
};

export class Producer {
  channel!: Channel;
  connection!: Connection;

  async createChannel() {
    try {
      this.connection = await amqp.connect(connectionUrl);
      this.channel = await this.connection.createChannel();
    } catch (error) {
      console.log(`Error on channel creation: ${error}`);
    }
  }

  async sendOrder(routingKey: string, order: TOrder, email: string) {
    try {
      if (!this.channel) {
        await this.createChannel();
      }

      await this.channel.assertExchange(EXCHANGE, "fanout");
      await this.channel.assertQueue(QUEUE, { durable: true });
      await this.channel.bindQueue(QUEUE, EXCHANGE, "");

      const orderDetails = {
        routingKey,
        order,
        email,
        dateTime: new Date(),
      };

      setTimeout(() => {
        this.channel.publish(
          EXCHANGE,
          routingKey,
          Buffer.from(JSON.stringify(orderDetails))
        );

        console.log(
          `The message ${JSON.stringify(
            order
          )} is sent to the ${EXCHANGE} exchange.`
        );
      }, order.leadTime);
    } catch (error) {
      console.log(`Error on order placement: ${error}`);
    }
  }

  async close() {
    await this.channel.close();
    await this.connection.close();
  }
}
