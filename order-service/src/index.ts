import express from "express";
import { setupRoutes } from "./routes/router.js";

const app = express();
app.use(express.json());

const PORT = 3000;

setupRoutes(app);

app.listen(PORT, () =>
  console.log(`Order Service up and running on port ${PORT}`)
);
