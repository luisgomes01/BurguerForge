import express from "express";
import { hamburguerRouter } from "./hamburguerRouter.js";

const app = express();
app.use(express.json());

const PORT = 3000;

app.use("/hamburguer", hamburguerRouter);

app.listen(PORT, () =>
  console.log(`Order Service up and running on port ${PORT}`)
);
