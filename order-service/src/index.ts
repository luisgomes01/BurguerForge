import express from "express";
import { setupRoutes } from "./routes/router.js";
import { connectMongoDb } from "./services/mongodb.js";

const startServer = () => {
  const app = express();
  app.use(express.json());
  
  const PORT = process.env.SERVER_PORT || 3000;
  

  connectMongoDb()
  
  
  setupRoutes(app);
  
  app.listen(PORT, () =>
    console.log(`Order Service up and running on port ${PORT}`)
  );
}

const waitForIt = Number(process.env.SLEEP_TIME) || 30000

setTimeout(() => {
  startServer()
}, waitForIt)

