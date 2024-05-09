import amqp, { Channel, Connection } from "amqplib";
import { MongoDb } from "./mongodb.js";
import { Order as OrderModel } from "../model/orderModel.js";
import { ORDER_ACCEPTED, ORDER_DELIVERED } from "../resources/constants.js";
const username = process.env.MQ_USERNAME || "guest";
const password = process.env.MQ_PASSWORD || "guest";
const host = process.env.HOST || "localhost";
const port = process.env.MQ_PORT || "5672";

const connectionUrl = `amqp://${username}:${password}@${host}:${port}`;

const exchangeName = "orders";
const queueName = "orders_queue";
const prefetchCount = Number(process.env.PREFETCH_COUNT) || 1;

export class Consumer {
  channel!: Channel;
  connection!: Connection;
  mongoService: MongoDb;

  constructor() {
    this.mongoService = new MongoDb();
  }

  async connectRabbitMq() {
    try {
      this.connection = await amqp.connect(connectionUrl);
      this.channel = await this.connection.createChannel();
      await this.createQueue();
      await this.bindQueue();
      await this.setPrefetchCount();
      console.log("✅ Connected to RabbitMq");
    } catch (error) {
      console.log(`Error on channel creation: ${error}`);
    }
  }

  async createQueue() {
    await this.channel.assertQueue(queueName);
  }

  async bindQueue() {
    await this.channel.bindQueue(queueName, exchangeName, "");
  }

  async setPrefetchCount() {
    await this.channel.prefetch(prefetchCount);
  }

  async consume() {
    try {
      if (!this.channel) {
        await this.connectRabbitMq();
      }

      await this.channel.consume(queueName, (order) =>
        this.processOrder(order, this.channel)
      );
    } catch (err) {
      console.log(err);
    }
  }

  async processOrder(order, channel) {
    const parsedOrder = JSON.parse(order.content.toString());
    await this.changeOrderStatus(OrderModel, parsedOrder._id, ORDER_ACCEPTED);

    setTimeout(() => {
      this.changeOrderStatus(OrderModel, parsedOrder._id, ORDER_DELIVERED);
      channel.ack(order);
    }, parsedOrder.order.leadTime);
  }

  async changeOrderStatus(orderModel, orderId, newOrderStatus) {
    await this.mongoService.updateOrderStatus(
      orderModel,
      orderId,
      newOrderStatus
    );
  }

  async closeConnection() {
    if (this.channel) {
      await this.channel.close();
    }
  }
}
