import amqp, { Channel, Connection } from "amqplib";

const username = process.env.MQ_USERNAME || 'guest'
const password = process.env.MQ_PASSWORD || 'guest'
const host = process.env.HOST || 'localhost'
const port = process.env.MQ_PORT || '5672'

const connectionUrl = `amqp://${username}:${password}@${host}:${port}`

const EXCHANGE = "orders"

export class Producer {
    channel!:Channel
    connection!:Connection

    async createChannel() {
        this.connection = await amqp.connect(connectionUrl)
        this.channel = await this.connection.createChannel()
    }

    async publishMessage(routingKey: string, orderMessage: Object, email: string) {
        if(!this.channel) {
            await this.createChannel();
        }

        await this.channel.assertExchange(EXCHANGE, 'fanout')

        const orderDetails = {
            routingKey,
            orderMessage,
            email,
            dateTime: new Date(),
        }

        this.channel.publish(EXCHANGE, '', Buffer.from(JSON.stringify(orderDetails)))

        console.log(`The message ${JSON.stringify(orderMessage)} is sent to the ${EXCHANGE} exchange.`)
        this.close()
    }

    async close() {
        await this.channel.close();
        await this.connection.close()
    }
}
