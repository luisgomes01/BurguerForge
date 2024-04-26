import { hamburguerRouter } from "./hamburguerRouter.js";
import { Express } from "express";

export const setupRoutes = (app: Express) => {
  app.use("/hamburguer", hamburguerRouter);
};
