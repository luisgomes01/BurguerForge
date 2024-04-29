import express from "express";
import { setupRoutes } from "./routes/router.js";
import { connectRabbitMq } from "./services/rabbitmq.js";
import { Channel, Connection } from "amqplib";

const app = express();
app.use(express.json());

const PORT = 3000;

let connection!: Connection, channel!: Channel

connectRabbitMq(connection, channel)

setupRoutes(app);

app.listen(PORT, () =>
  console.log(`Order Service up and running on port ${PORT}`)
);

