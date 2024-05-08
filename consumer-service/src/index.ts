import express from "express";
import { MongoDb } from "./services/mongodb.js";
import { Consumer } from "./services/rabbitmq.js";

const mongoDb = new MongoDb();
const consumer = new Consumer();

const startServer = async () => {
  const app = express();
  app.use(express.json());

  const PORT = process.env.SERVER_PORT || 3001;

  await mongoDb.connect();

  await consumer.connectRabbitMq();

  app.listen(PORT, () =>
    console.log(`Consumer Service up and running on port ${PORT}`)
  );

  process.on("SIGINT", () => {
    console.log("Closing connections...");
    consumer.closeConnection();
    mongoDb.disconnect();
    process.exit();
  });
};

const waitForIt = Number(process.env.SLEEP_TIME) || 0;

setTimeout(() => {
  startServer();
}, waitForIt);
