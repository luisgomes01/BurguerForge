import amqp, { Channel, Connection } from "amqplib";

const username = process.env.MQ_USERNAME || 'guest'
const password = process.env.MQ_PASSWORD || 'guest'
const host = process.env.HOST || 'localhost'
const port = process.env.MQ_PORT || '5672'

const connectionUrl = `amqp://${username}:${password}@${host}:${port}`

export const connectRabbitMq = async (connection: Connection, channel: Channel) => {
    try {
        connection = await amqp.connect(connectionUrl)
        channel = await connection.createChannel()
        console.log('✅ Connected to RabbitMq')
    }
    catch (error) {
        console.error(`Failed to connect to Rabbitmq: ${error}`)
    }
}