import { hamburguerRouter } from "./hamburguerRouter.js";

export const setupRoutes = (app) => {
  app.use("/hamburguer", hamburguerRouter);
};
