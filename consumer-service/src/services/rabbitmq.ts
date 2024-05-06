import amqp, { Channel, Connection } from "amqplib";

const username = process.env.MQ_USERNAME || "guest";
const password = process.env.MQ_PASSWORD || "guest";
const host = process.env.HOST || "localhost";
const port = process.env.MQ_PORT || "5672";

const connectionUrl = `amqp://${username}:${password}@${host}:${port}`;

const exchangeName = "orders";

export class Consumer {
  channel!: Channel;
  connection!: Connection;

  constructor() {
    this.connectRabbitMq();
  }

  private async connectRabbitMq() {
    try {
      this.connection = await amqp.connect(connectionUrl);
      this.channel = await this.connection.createChannel();
      await this.createExchange(exchangeName, "fanout");
      console.log("✅ Connected to RabbitMq");
    } catch (error) {
      console.log(`Error on channel creation: ${error}`);
    }
  }

  private async createExchange(exchangeName: string, exchangeType: string) {
    await this.channel.assertExchange(exchangeName, exchangeType);
  }
}
