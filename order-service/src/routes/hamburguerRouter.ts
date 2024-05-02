import express from "express";
import { OrderController } from "../controllers/orderController.js";

export const hamburguerRouter = express.Router();

hamburguerRouter.route("/burguer").post(new OrderController().placeOrder);
